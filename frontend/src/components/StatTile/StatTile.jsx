import React from "react";
import "./StatTile.css";

const StatTile = ({ title, value, icon }) => {
  return (
    <div className="stat-tile glass-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <span className="stat-value">{value}</span>
        <span className="stat-title">{title}</span>
      </div>
    </div>
  );
};

export default StatTile;