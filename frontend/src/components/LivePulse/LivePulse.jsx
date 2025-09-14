import React from 'react';
import './LivePulse.css';

const LivePulse = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return '#4ade80'; // Green
    if (score >= 70) return '#fbbf24'; // Amber
    return '#f87171'; // Red
  };

  return (
    <div className="live-pulse" style={{ '--pulse-color': getScoreColor(score) }}>
      <div className="pulse-ring"></div>
      <div className="score-circle">
        <span className="score-text">{score}</span>
      </div>
    </div>
  );
};

export default LivePulse;