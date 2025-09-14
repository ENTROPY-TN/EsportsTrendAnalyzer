import React from 'react';
import { Link } from 'react-router-dom'; // ✅ import Link
import LivePulse from '../LivePulse/LivePulse';
import MetricBadge from '../MetricBadge/MetricBadge';
import './GameCard.css';

const GameCard = ({ game, rank }) => {
  return (
    <Link to={`/game/${encodeURIComponent(game.id || game.name)}`} className="game-card-link">
      <div className="game-card glass-card">
        {/* Ranking badge */}
        <div className="rank-badge">#{rank}</div>

        {/* Game image */}
        <div className="card-image">
          <img src={game.coverImage} alt={game.name} />
          <div className="image-overlay" />
          <LivePulse score={game.hypeScore} />
        </div>

        {/* Content */}
        <div className="card-content">
          <h3 className="game-title">{game.name}</h3>
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
          </div>

          {/* Trend indicator */}
          <div className="trend-indicator">
            <span className={`trend-${game.trend}`}>
              {game.trend === 'up' ? '↗' : game.trend === 'down' ? '↘' : '→'}
              {game.change}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
