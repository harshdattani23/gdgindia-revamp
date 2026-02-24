import React from 'react';
import './EcosystemLinks.css';
import { Users, GraduationCap, Building2, Rocket, ArrowRight } from 'lucide-react';

const EcosystemLinks = () => {
    const links = [
        {
            title: 'Developer Experts',
            description: 'Network of highly experienced technology experts',
            icon: <GraduationCap className="icon" size={32} />,
            color: 'var(--google-blue)',
            href: 'https://developers.google.com/community/experts'
        },
        {
            title: 'Women Techmakers',
            description: 'Google’s program that provides visibility, community, and resources',
            icon: <Users className="icon" size={32} />,
            color: 'var(--google-red)',
            href: 'https://developers.google.com/womentechmakers'
        },
        {
            title: 'Google For Startups',
            description: 'The best of Google to startups all over the world',
            icon: <Building2 className="icon" size={32} />,
            color: 'var(--google-yellow)',
            href: 'https://grow.google/intl/en_in/startups/'
        },
        {
            title: 'Grow with Google',
            description: 'Free training and tools to grow your skills, career, or business',
            icon: <Rocket className="icon" size={32} />,
            color: 'var(--google-green)',
            href: 'https://grow.google/intl/en_in/'
        }
    ];

    return (
        <section className="ecosystem-section container fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="section-title">Explore the Ecosystem</h3>
            <div className="ecosystem-grid">
                {links.map((link, index) => (
                    <a a href={link.href} target="_blank" rel="noopener noreferrer" key={index} className="ecosystem-card glass" style={{ '--card-color': link.color }}>
                        <div className="card-icon-wrapper" style={{ color: link.color }}>
                            {link.icon}
                        </div>
                        <div className="card-content">
                            <h4>{link.title}</h4>
                            <p>{link.description}</p>
                        </div>
                        <div className="card-arrow" style={{ color: link.color }}>
                            <ArrowRight size={24} />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default EcosystemLinks;
