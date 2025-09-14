import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🎮</span>
          <h1 style={{ marginLeft: "200px" }}>HypeHunter</h1>
          <span className="alpha-tag" style={{ color: "white" }}>ALPHA</span>
        </div>

        <div className="search-container">
          <div className={`search-bar ${isSearchFocused ? 'focused' : ''}`}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search Today's trending games"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="search-input"
            />
            <div className="keyboard-shortcut">
              <span className="shortcut-key">alt</span>
              <span className="shortcut-plus">+</span>
              <span className="shortcut-key">enter</span>
            </div>
          </div>
        </div>

        <nav className="nav">
          <a href="#trending" className="nav-link">Trending</a>
          <a href="#new" className="nav-link">New</a>
          <a href="#genres" className="nav-link">Genres</a>
        </nav>

        <div className="header-actions">
          <button className="user-btn">
            <span className="user-icon">👤</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;