import React from 'react';
import './MetricBadge.css';

const MetricBadge = ({ icon, value, label, color = 'blue' }) => {
  const colorClasses = {
    orange: 'badge-orange',
    blue: 'badge-blue',
    green: 'badge-green',
    red: 'badge-red'
  };

  return (
    <div className={`metric-badge ${colorClasses[color]}`}>
      <span className="badge-icon">{icon}</span>
      <div className="badge-content">
        <span className="badge-value">{value}</span>
        <span className="badge-label">{label}</span>
      </div>
    </div>
  );
};

export default MetricBadge;