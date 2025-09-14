import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import GameDetailPage from "./pages/GameDetailPage/GameDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route -> LandingPage */}
          <Route path="/" element={<LandingPage />} />

          {/* Other routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/game/:gameName" element={<GameDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
