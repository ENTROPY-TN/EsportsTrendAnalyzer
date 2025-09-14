import { useState, useEffect } from 'react';
import { mockGames } from '../data/mockData';

export const useLiveGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setGames(mockGames);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { games, loading };
};