const fs = require('fs');

async function scrapeEvents() {
    const csvData = fs.readFileSync('./chapters.csv', 'utf8');
    const lines = csvData.trim().split('\n');

    const chapters = [];

    const parseCSVLine = (text) => {
        let ret = [''], i = 0, p = '', s = true;
        for (let l in text) {
            l = text[l];
            if ('"' === l) {
                s = !s;
                if ('"' === p) {
                    ret[i] += '"';
                    l = '-';
                } else if ('' === p) {
                    l = '-';
                }
            } else if (s && ',' === l) {
                l = ret[++i] = '';
            } else {
                ret[i] += l;
            }
            p = l;
        }
        return ret;
    };

    console.log("Parsing CSV and filtering GDG chapters...");
    const gdgChapters = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        const values = parseCSVLine(line);
        if (values.length >= 4) {
            const program = values[0].trim();
            if (program === 'GDG') {
                let name = values[2].trim();
                if (name.startsWith('"') && name.endsWith('"')) {
                    name = name.slice(1, -1);
                }
                gdgChapters.push({
                    type: name.toLowerCase().includes('cloud') ? 'GDG Cloud' : 'GDG',
                    city: values[1].trim(),
                    name: name,
                    url: values[3].trim(),
                    events: []
                });
            }
        }
    }

    console.log(`Found ${gdgChapters.length} chapters. Fetching IDs and Events...`);

    for (const chapter of gdgChapters) {
        try {
            console.log(`Scraping ${chapter.name}...`);
            const response = await fetch(chapter.url);
            const html = await response.text();

            // Extract chapter ID
            const idMatch = html.match(/Globals\.chapter_id\s*=\s*['"](\d+)['"]/);
            if (idMatch && idMatch[1]) {
                const chapterId = idMatch[1];

                // Fetch events
                const eventsUrl = `https://gdg.community.dev/api/event_slim/for_chapter/${chapterId}/?page_size=10&status=Live`;
                const eventsRes = await fetch(eventsUrl);
                const eventsData = await eventsRes.json();

                if (eventsData && eventsData.results) {
                    chapter.events = eventsData.results.map(e => ({
                        title: e.title,
                        start_date: e.start_date,
                        url: e.static_url || `https://gdg.community.dev${e.url || ''}`,
                        type: e.event_type_title
                    }));
                }
            }
        } catch (err) {
            console.error(`Error scraping ${chapter.name}: ${err.message}`);
        }
    }

    fs.mkdirSync('src/data', { recursive: true });
    fs.writeFileSync('src/data/chapters.json', JSON.stringify(gdgChapters, null, 2));
    console.log(`Successfully updated src/data/chapters.json with events.`);
}

scrapeEvents();
