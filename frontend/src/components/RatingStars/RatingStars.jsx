import React from "react";
import "./RatingStars.css";

// RatingStars.jsx
const RatingStars = ({ rating }) => {
  const stars = Array(5).fill(0).map((_, i) => i < rating ? '★' : '☆');
  return <span>{stars.join(' ')}</span>;
};

export default RatingStars;