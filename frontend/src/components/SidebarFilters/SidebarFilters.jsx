import React, { useState } from 'react';
import './SidebarFilters.css';

const SidebarFilters = ({ activeFilter, setActiveFilter }) => {
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);

  const mainNavigation = [
    { id: 'home', label: 'Home' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'new-releases', label: 'New Releases' },
    { id: 'top', label: 'Top' },
  ];

  const newReleasesItems = [
    { id: 'last30', label: 'Last 30 days', icon: '⭐' },
    { id: 'thisWeek', label: 'This week', icon: '🔥' },
    { id: 'nextWeek', label: 'Next week', icon: '⏭️' },
    { id: 'calendar', label: 'Release calendar', icon: '31' },
  ];

  const topItems = [
    { id: 'bestYear', label: 'Best of the year', icon: '🏆' },
    { id: 'popular2024', label: 'Popular in 2024', icon: '📊' },
    { id: 'allTime', label: 'All time top 250', icon: '👑' },
  ];

  const browseItems = [
    { id: 'platforms', label: 'Platforms', icon: '🎮' },
    { id: 'stores', label: 'Stores', icon: '⬇️' },
    { id: 'collections', label: 'Collections', icon: '📁' },
  ];

  const platforms = [
    { id: 'pc', label: 'PC', icon: '🖥️' },
    { id: 'ps4', label: 'PlayStation 4', icon: '🎮' },
    { id: 'xbox-one', label: 'Xbox One', icon: '🎮' },
    // Hidden platforms (shown when "Show all" is clicked)
    ...(showAllPlatforms ? [
      { id: 'switch', label: 'Nintendo Switch', icon: '🎮' },
      { id: 'ps5', label: 'PlayStation 5', icon: '🎮' },
      { id: 'xbox-series', label: 'Xbox Series X/S', icon: '🎮' },
    ] : [])
  ];

  const genres = [
    { id: 'free-games', label: 'Free Online Games', icon: '🎯' },
    { id: 'action', label: 'Action', icon: '⚔️' },
    { id: 'strategy', label: 'Strategy', icon: '🏛️' },
    // Hidden genres (shown when "Show all" is clicked)
    ...(showAllGenres ? [
      { id: 'rpg', label: 'RPG', icon: '🗡️' },
      { id: 'sports', label: 'Sports', icon: '⚽' },
      { id: 'racing', label: 'Racing', icon: '🏎️' },
    ] : [])
  ];

  return (
    <div className="sidebar-filters">
      {/* All Games */}
      <div className="filter-section">
        <h3 className="filter-title">All Games</h3>
      </div>

      {/* Main Navigation */}
      <div className="filter-section">
        {mainNavigation.map(item => (
          <button
            key={item.id}
            className={`filter-item ${activeFilter === item.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* New Releases Subitems */}
      {activeFilter === 'new-releases' && (
        <div className="filter-subsection">
          {newReleasesItems.map(item => (
            <button
              key={item.id}
              className="filter-subitem"
            >
              <span className="filter-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Top Subitems */}
      {activeFilter === 'top' && (
        <div className="filter-subsection">
          {topItems.map(item => (
            <button
              key={item.id}
              className="filter-subitem"
            >
              <span className="filter-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Browse */}
      <div className="filter-section">
        <h3 className="filter-title">Browse</h3>
        {browseItems.map(item => (
          <button
            key={item.id}
            className={`filter-item ${activeFilter === item.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(item.id)}
          >
            <span className="filter-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
        <button
          className="show-all-button"
          onClick={() => setShowAllPlatforms(!showAllPlatforms)}
        >
          <span className="chevron">⌄</span> Show all
        </button>
      </div>

      {/* Platforms */}
      <div className="filter-section">
        <h3 className="filter-title">Platforms</h3>
        {platforms.map(platform => (
          <button
            key={platform.id}
            className={`filter-item ${activeFilter === platform.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(platform.id)}
          >
            <span className="filter-icon">{platform.icon}</span>
            {platform.label}
          </button>
        ))}
        <button
          className="show-all-button"
          onClick={() => setShowAllPlatforms(!showAllPlatforms)}
        >
          <span className="chevron">⌄</span> Show all
        </button>
      </div>

      {/* Genres */}
      <div className="filter-section">
        <h3 className="filter-title">Genres</h3>
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`filter-item ${activeFilter === genre.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(genre.id)}
          >
            <span className="filter-icon">{genre.icon}</span>
            {genre.label}
          </button>
        ))}
        <button
          className="show-all-button"
          onClick={() => setShowAllGenres(!showAllGenres)}
        >
          <span className="chevron">⌄</span> Show all
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;