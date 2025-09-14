import React from "react";
import "./RecentMentions.css";

const RecentMentions = ({ mentions = [] }) => {
  return (
    <div className="recent-mentions glass-card">
      <h3 className="mentions-title">Recent Mentions</h3>
      <ul>
        {mentions.length > 0 ? (
          mentions.map((m, idx) => (
            <li key={idx}>
              <span className="mention-user">@{m.user}</span>: {m.text}
            </li>
          ))
        ) : (
          <li>No mentions yet</li>
        )}
      </ul>
    </div>
  );
};

export default RecentMentions;