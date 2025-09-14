// src/pages/FeedPage/FeedPage.jsx
import React, { useState } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import GameCardList from '../../components/GameCardList/GameCardList'; // We'll create this
import Header from '../../components/Header/Header';
import SidebarFilters from '../../components/SidebarFilters/SidebarFilters';
import DisplayOptions from '../../components/DisplayOptions/DisplayOptions';
import { useLiveGames } from '../../hooks/useLiveGames';
import './FeedPage.css';

const FeedPage = () => {
  const { games, loading } = useLiveGames();
  const [activeFilter, setActiveFilter] = useState('trending');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');

  if (loading) {
    return (
      <div className="feed-page">
        <Header />
        <div className="loading-container">
          <div className="pulse-animation">🔥</div>
          <p>Loading trending games...</p>
        </div>
      </div>
    );
  }

  // Sort games based on selected option
  const sortedGames = [...games].sort((a, b) => {
    switch (sortBy) {
      case 'release-date':
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      case 'popularity':
        return b.playerCount.localeCompare(a.playerCount);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'hype-score':
        return b.hypeScore - a.hypeScore;
      default:
        return 0; // Relevance - keep original order
    }
  });

  return (
    <div className="feed-page">
      <Header />

      <div className="feed-container">
        {/* Sidebar with filters */}
        <SidebarFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Main content */}
        <div className="main-content">
          <div className="content-header">
            <h2 className="section-title">
              {activeFilter === 'trending' ? 'Trending Games' :
               activeFilter === 'new' ? 'New Releases' :
               activeFilter === 'top' ? 'Top Games' : 'All Games'}
            </h2>

            <DisplayOptions
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Games display - grid or list */}
          <div className={`games-container ${viewMode === 'grid' ? 'games-grid' : 'games-list'}`}>
            {sortedGames.map((game, index) => (
              viewMode === 'grid' ? (
                <GameCard
                  key={game.id}
                  game={game}
                  rank={index + 1}
                />
              ) : (
                <GameCardList
                  key={game.id}
                  game={game}
                  rank={index + 1}
                />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
