import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import StatTile from "../../components/StatTile/StatTile";
import RatingStars from "../../components/RatingStars/RatingStars";
import RecentMentions from "../../components/RecentMentions/RecentMentions";
import "./GameDetailPage.css";

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const GameDetailPage = () => {
  const { gameName } = useParams();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchRes = await fetch(
          `https://api.rawg.io/api/games?search=${encodeURIComponent(gameName)}&key=${RAWG_API_KEY}`
        );
        if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`);
        const searchData = await searchRes.json();
        if (!searchData.results?.length) {
          setGameData(null);
          return;
        }

        const gameId = searchData.results[0].id;
        const detailRes = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`);
        if (!detailRes.ok) throw new Error(`Details fetch failed: ${detailRes.status}`);
        const data = await detailRes.json();

        // Fetch additional screenshots
        const screenshotsRes = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${RAWG_API_KEY}`);
        const screenshotsData = screenshotsRes.ok ? await screenshotsRes.json() : { results: [] };

        // Fetch creator info for insights
        const creatorsData = await Promise.all(
          (data.developers || []).map(async (dev) => {
            try {
              const res = await fetch(`https://api.rawg.io/api/creators/${dev.id}?key=${RAWG_API_KEY}`);
              if (!res.ok) return null;
              return await res.json();
            } catch {
              return null;
            }
          })
        );

        const redditRes = await fetch(`https://api.rawg.io/api/games/${gameId}/reddit?key=${RAWG_API_KEY}`).catch(() => ({ results: [] }));
        const redditData = await redditRes.json?.() || { results: [] };

        // Fetch Twitch data for streamer info (mock data as this requires Twitch API)
        const twitchData = {
          viewers: Math.floor(Math.random() * 10000),
          streams: Math.floor(Math.random() * 500),
          topStreamers: [
            { name: "xQc", viewers: 25000 },
            { name: "shroud", viewers: 18000 },
            { name: "pokimane", viewers: 22000 }
          ].slice(0, 3)
        };

        const mappedData = {
          id: data.id,
          name: data.name,
          description: data.description_raw,
          coverImage: data.background_image,
          genre: data.genres?.map((g) => g.name).join(", ") || "N/A",
          platform: data.platforms?.map((p) => p.platform.name).join(", ") || "N/A",
          rating: data.rating,
          metacritic: data.metacritic || "N/A",
          playtime: data.playtime || 0,
          ratingsCount: data.ratings_count || 0,
          achievementsCount: data.achievements_count || 0,
          additionsCount: data.additions_count || 0,
          esrb: data.esrb_rating?.name || "Not Rated",
          releaseDate: data.released,
          website: data.website,
          screenshots: screenshotsData.results.slice(0, 5),
          insights: creatorsData.filter(Boolean).map((c) => ({
            name: c.name,
            description: c.description,
            updated: c.updated,
          })),
          recentMentions: redditData.results?.map((r) => ({
            user: r.username,
            text: r.name,
            time: new Date(r.created).toLocaleDateString(),
            url: r.url,
          })) || [],
          twitchData: twitchData
        };

        setGameData(mappedData);
      } catch (err) {
        setError(err);
        setGameData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameName]);

  if (loading)
    return (
      <div className="game-detail-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading game data...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="game-detail-page">
        <Header />
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Error loading game data</h2>
          <p>{error.message}</p>
          <Link to="/" className="back-button">← Back to trending</Link>
        </div>
      </div>
    );

  if (!gameData)
    return (
      <div className="game-detail-page">
        <Header />
        <div className="not-found-container">
          <h2>Game not found</h2>
          <p>We couldn't find the game you're looking for.</p>
          <Link to="/" className="back-button">← Back to trending</Link>
        </div>
      </div>
    );

  const details = gameData;

  return (
    <div className="game-detail-page">
      <Header />

      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <span className="breadcrumb-icon">🏠</span> Trending Games
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{details.name}</span>
      </div>

      <div className="hero-section">
        <div className="hero-image">
          <img src={details.coverImage} alt={details.name} />
          <div className="image-overlay" />
        </div>
        <div className="hero-content">
          <div className="game-badge">POPULAR</div>
          <h1 className="game-title">{details.name}</h1>
          <div className="game-meta">
            <span className="meta-item">{details.genre}</span>
            <span className="meta-separator">•</span>
            <span className="meta-item">{details.platform}</span>
            {details.releaseDate && (
              <>
                <span className="meta-separator">•</span>
                <span className="meta-item">{new Date(details.releaseDate).getFullYear()}</span>
              </>
            )}
          </div>
          <div className="rating-row">
            <RatingStars value={details.rating} max={5} />
            {details.metacritic !== "N/A" && (
              <div className={`metacritic-score ${details.metacritic >= 75 ? 'high' : details.metacritic >= 50 ? 'medium' : 'low'}`}>
                {details.metacritic}
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button className="btn-primary">
              <span className="btn-icon">🎮</span> Play Now
            </button>
            <button className="btn-secondary">
              <span className="btn-icon">📺</span> Watch Streams
            </button>
            <button className="btn-icon-only">
              <span className="btn-icon">❤️</span>
            </button>
          </div>
        </div>
      </div>

      <div className="tab-group">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="tab-icon">📊</span> Overview
        </button>

        <button
          className={`tab ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          <span className="tab-icon">🎬</span> Media
        </button>

        <button
          className={`tab ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => setActiveTab('community')}
        >
          <span className="tab-icon">👥</span> Community
        </button>
      </div>



          <div className="content-section">
            {activeTab === 'overview' && (
              <>
                <div className="content-section">
      <div className="game-description">
        <h2>About</h2>
        <p>{details.description}</p>
      </div>

      <div className="stats-section">
        <h2>Game Stats</h2>
        <div className="stats-grid">
          <StatTile title="Metacritic Score" value={details.metacritic} icon="Ⓜ" />
          <StatTile title="Avg. Playtime" value={`${details.playtime} hrs`} icon="⏳" />
          <StatTile title="User Ratings" value={details.ratingsCount.toLocaleString()} icon="👍" />

          <StatTile title="Achievements" value={details.achievementsCount} icon="🏆" />
          <StatTile title="DLCs & Additions" value={details.additionsCount} icon="📦" />
          <StatTile title="ESRB Rating" value={details.esrb} icon="🔞" />
        </div>
      </div>
    </div>


      <div className="streamer-section">
        <h2>Live Streams</h2>

        <div className="stream-stats">
          <div className="stream-stat">
            <div className="stat-value">{details.twitchData.viewers.toLocaleString()}</div>
            <div className="stat-label">Current Viewers</div>
          </div>
          <div className="stream-stat">
            <div className="stat-value">{details.twitchData.streams}</div>
            <div className="stat-label">Live Streams</div>
          </div>
        </div>

        <div className="top-streamers">
          <h3>Top Streamers</h3>
          <div className="streamer-list">
            {details.twitchData.topStreamers.map((streamer, index) => (
              <div key={index} className="streamer-card">
                <div className="streamer-avatar"></div>
                <div className="streamer-info">
                  <div className="streamer-name">{streamer.name}</div>
                  <div className="streamer-viewers">{streamer.viewers.toLocaleString()} viewers</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

          </>
        )}

        {activeTab === 'media' && details.screenshots.length > 0 && (
          <div className="screenshots-section">
            <h2>Screenshots</h2>
            <div className="screenshots-grid">
              {details.screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot-item">
                  <img src={screenshot.image} alt={`${details.name} screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="community-content">
            <div className="community-grid">
              <div className="community-section">
                <h2>Developers</h2>
                {details.insights.length > 0 ? (
                  <div className="developers-list">
                    {details.insights.map((insight, i) => (
                      <div key={i} className="developer-card">
                        <h3>{insight.name}</h3>
                        {insight.description && (
                            <div
                              className="developer-description"
                              dangerouslySetInnerHTML={{ __html: insight.description }}
                            />
                          )}

                        {insight.updated && <p className="update-date">Last updated: {new Date(insight.updated).toLocaleDateString()}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No developer information available.</p>
                )}
              </div>

              <div className="community-section">
                <h2>Recent Community Mentions</h2>
                <RecentMentions mentions={details.recentMentions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;