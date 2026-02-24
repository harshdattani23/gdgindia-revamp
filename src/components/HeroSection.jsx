import React from 'react';
import './HeroSection.css';
import AutocompleteMap from './AutocompleteMap';


const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="container" style={{ width: '100%', maxWidth: '900px', position: 'relative', zIndex: 10 }}>
                <AutocompleteMap />
            </div>

            {/* Abstract background elements for dynamic feel */}
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
            <div className="bg-shape shape-3"></div>
        </section>
    );
};

export default HeroSection;
