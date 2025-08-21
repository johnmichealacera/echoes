import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="title-section">
          <h1 className="app-title">
            <span className="title-main">Echoes</span>
            <span className="title-subtitle">Awakening Through Songs</span>
          </h1>
          <p className="header-description">
            A personal resonance map, told through music. This is not a playlist. 
            It's a mirror of my awakening journey — expressed through the songs 
            that vibrate with my soul at different stages of the path.
          </p>
        </div>
        <div className="header-decoration">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
