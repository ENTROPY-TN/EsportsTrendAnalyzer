// src/components/GameCardList/GameCardList.jsx
import React, { useState, useRef } from 'react';
import LivePulse from '../LivePulse/LivePulse';
import MetricBadge from '../MetricBadge/MetricBadge';
import GenreTags from '../GenreTags/GenreTags';
import './GameCardList.css';

const GameCardList = ({ game, rank }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && game.videoUrl) {
      videoRef.current.play().catch(e => console.log("Video play failed:", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && game.videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="game-card-list glass-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ranking badge */}
      <div className="rank-badge">
        #{rank}
      </div>

      {/* Game media - image or video */}
      <div className="card-media">
        {isHovered && game.videoUrl ? (
          <video
            ref={videoRef}
            className="game-video"
            src={game.videoUrl}
            muted
            loop
            playsInline
          />
        ) : (
          <img src={game.coverImage} alt={game.name} className="game-image" />
        )}

        <div className="media-overlay" />
        <LivePulse score={game.hypeScore} />
      </div>

      {/* Content */}
      <div className="card-content">
        <div className="card-header">
          <h3 className="game-title">{game.name}</h3>

          {/* Platform icons */}
          <div className="platform-icons">
            {game.platforms?.map(platform => (
              <span key={platform} className="platform-icon">
                {platform === 'pc' && '💻'}
                {platform === 'playstation' && '🎮'}
                {platform === 'xbox' && '🎯'}
                {platform === 'switch' && '🔴'}
              </span>
            ))}
          </div>
        </div>

        {/* Genre tags */}
        {game.genres && <GenreTags genres={game.genres} />}

        <p className="game-description">{game.description}</p>

        <div className="metrics">
          <MetricBadge
            icon="🔥"
            value={game.hypeScore}
            label="Hype"
            color="orange"
          />
          <MetricBadge
            icon="⭐"
            value={game.predictedRating}
            label="Rating"
            color="blue"
          />
          <MetricBadge
            icon="👥"
            value={game.playerCount}
            label="Players"
            color="green"
          />
        </div>

        {/* Release info and trend indicator */}
        <div className="card-footer">
          <span className="release-info">
            {game.releaseStatus === 'released' ?
              `Released ${game.releaseDate}` :
              game.releaseStatus === 'early_access' ?
              'Early Access' :
              `Coming ${game.releaseDate}`
            }
          </span>

          <span className={`trend-indicator trend-${game.trend}`}>
            {game.trend === 'up' ? '↗' : game.trend === 'down' ? '↘' : '→'}
            {game.change}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameCardList;