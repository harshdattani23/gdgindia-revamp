const fs = require('fs');

const csvData = fs.readFileSync('/Users/haina/Documents/antigravity/GDG Members Count - Sheet2.csv', 'utf8');
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

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length >= 4) {
        const program = values[0].trim();
        // ONLY Professional GDG as requested
        if (program === 'GDG') {
            let name = values[2].trim();
            if (name.startsWith('"') && name.endsWith('"')) {
                name = name.slice(1, -1);
            }

            chapters.push({
                type: name.toLowerCase().includes('cloud') ? 'GDG Cloud' : 'GDG',
                city: values[1].trim(),
                name: name,
                url: values[3].trim()
            });
        }
    }
}

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/chapters.json', JSON.stringify(chapters, null, 2));
console.log(`Successfully extracted ${chapters.length} Professional GDG chapters.`);
