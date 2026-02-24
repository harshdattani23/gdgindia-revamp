import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import HeroSection from './components/HeroSection';
import AnimatedStatsGrid from './components/AnimatedStatsGrid';
import EcosystemLinks from './components/EcosystemLinks';
import Navbar from './components/Navbar';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <div className="app-container">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Area */}
      <main>
        <HeroSection />
        <AnimatedStatsGrid />
        <EcosystemLinks />
      </main>

      {/* Footer Placeholder */}
      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>© {new Date().getFullYear()} Google Developer Groups India</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
