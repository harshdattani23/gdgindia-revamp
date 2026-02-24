import React from 'react';
import { Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <nav className="navbar glass">
            <div className="container nav-container">
                <div className="nav-logo">
                    <img src="/gdg-logo.png" alt="GDG Logo" className="nav-logo-img" />
                    <div className="nav-logo-text">
                        <span className="nav-logo-title">Google Developer Groups</span>
                        <span className="nav-logo-subtitle">India</span>
                    </div>
                </div>
                <div className="nav-actions">
                    <button
                        onClick={toggleDarkMode}
                        className="theme-toggle"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    <a href="https://gdg.community.dev/" target="_blank" rel="noopener noreferrer" className="nav-join-btn">
                        Join a community today
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
