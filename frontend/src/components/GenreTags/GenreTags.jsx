// src/components/GenreTags/GenreTags.jsx
import React from 'react';
import './GenreTags.css';

const GenreTags = ({ genres }) => {
  return (
    <div className="genre-tags">
      {genres.map((genre, index) => (
        <span key={index} className="genre-tag">
          {genre}
        </span>
      ))}
    </div>
  );
};

export default GenreTags;