// src/components/DisplayOptions/DisplayOptions.jsx
import React from 'react';
import './DisplayOptions.css';

const DisplayOptions = ({ viewMode, onViewModeChange, sortBy, onSortChange }) => {
  return (
    <div className="display-options">
      {/* View mode toggle */}
      <div className="view-mode-toggle">
        <button
          className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => onViewModeChange('grid')}
          aria-label="Grid view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" rx="1" />
            <rect x="9" y="1" width="6" height="6" rx="1" />
            <rect x="1" y="9" width="6" height="6" rx="1" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
        </button>

        <button
          className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => onViewModeChange('list')}
          aria-label="List view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="14" height="2" rx="1" />
            <rect x="1" y="7" width="14" height="2" rx="1" />
            <rect x="1" y="13" width="14" height="2" rx="1" />
          </svg>
        </button>
      </div>

      {/* Sort options */}
      <div className="sort-options">
        <span className="sort-label">Sort by:</span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="release-date">Release Date</option>
          <option value="popularity">Popularity</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="hype-score">Hype Score</option>
        </select>
      </div>
    </div>
  );
};

export default DisplayOptions;