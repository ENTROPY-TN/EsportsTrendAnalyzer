export const mockGames = [
  {
    id: 1,
    name: "Cyberpunk 2077: Phantom Liberty",
    description: "The acclaimed open-world action RPG expansion with stunning visuals and immersive gameplay.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6c2a.jpg",
    videoUrl: "https://cdn.akamai.steamstatic.com/steam/apps/256983135/movie480_vp9.webm",
    hypeScore: 92,
    predictedRating: 4.8,
    trend: "up",
    change: "+15.2",
    platforms: ["pc", "playstation", "xbox"],
    playerCount: "2.4M",
    releaseStatus: "released",
    releaseDate: "Sep 26, 2023",
    genres: ["RPG", "Action", "Open World"]
  },
  {
    id: 2,
    name: "Valorant",
    description: "Free-to-play tactical hero shooter developed and published by Riot Games.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4sqr.jpg",
    videoUrl: "https://cdn.akamai.steamstatic.com/steam/apps/256983135/movie480_vp9.webm",
    hypeScore: 88,
    predictedRating: 4.5,
    trend: "stable",
    change: "+2.1",
    platforms: ["pc"],
    playerCount: "15.2M",
    releaseStatus: "released",
    releaseDate: "Jun 2, 2020",
    genres: ["FPS", "Tactical", "Multiplayer"]
  },
  {
    id: 3,
    name: "Baldur's Gate 3",
    description: "Next-generation RPG set in the world of Dungeons & Dragons.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4k0g.jpg",
    videoUrl: "https://cdn.akamai.steamstatic.com/steam/apps/256983135/movie480_vp9.webm",
    hypeScore: 95,
    predictedRating: 4.9,
    trend: "up",
    change: "+22.7",
    platforms: ["pc", "playstation", "xbox"],
    playerCount: "1.8M",
    releaseStatus: "released",
    releaseDate: "Aug 3, 2023",
    genres: ["RPG", "Fantasy", "Turn-Based"]
  },
  {
    id: 4,
    name: "Counter-Strike 2",
    description: "The largest technical leap forward in Counter-Strike's history.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6xr0.jpg",
    videoUrl: "https://cdn.akamai.steamstatic.com/steam/apps/256983135/movie480_vp9.webm",
    hypeScore: 90,
    predictedRating: 4.6,
    trend: "down",
    change: "-3.4",
    platforms: ["pc"],
    playerCount: "1.2M",
    releaseStatus: "released",
    releaseDate: "Sep 27, 2023",
    genres: ["FPS", "Multiplayer", "Competitive"]
  },
  {
    id: 5,
    name: "Starfield",
    description: "Next-generation role-playing game set in space from Bethesda Game Studios.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4h8k.jpg",
    videoUrl: "https://cdn.akamai.steamstatic.com/steam/apps/256983135/movie480_vp9.webm",
    hypeScore: 87,
    predictedRating: 4.4,
    trend: "up",
    change: "+8.9",
    platforms: ["pc", "xbox"],
    playerCount: "980K",
    releaseStatus: "released",
    releaseDate: "Sep 6, 2023",
    genres: ["RPG", "Sci-Fi", "Open World"]
  },
  {
    id: 6,
    name: "League of Legends",
    description: "Team-based strategy game where two teams of five champions battle to destroy the enemy's nexus.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4sqs.jpg",
    videoUrl: "https://cdn.akamai.steamstatic.com/steam/apps/256983135/movie480_vp9.webm",
    hypeScore: 85,
    predictedRating: 4.3,
    trend: "stable",
    change: "+1.2",
    platforms: ["pc"],
    playerCount: "8.7M",
    releaseStatus: "released",
    releaseDate: "Oct 27, 2009",
    genres: ["MOBA", "Multiplayer", "Strategy"]
  }
];



export const mockGameDetails = {
  1: {
    genre: "RPG",
    platform: "PC/Console",
    dailyMentions: 1450,
    sentiment: 82,
    engagement: "High",
    uniqueUsers: 1200,
    trendData: [20, 35, 50, 70, 95, 110, 130],
    sources: [
      { name: "Twitter", value: 55 },
      { name: "Reddit", value: 25 },
      { name: "YouTube", value: 20 }
    ],
    insights: ["Player sentiment is improving after recent patches.", "Expansion content driving renewed hype."],
    sentimentDistribution: { positive: 70, neutral: 20, negative: 10 },
    recentMentions: [
      { user: "@player1", text: "Phantom Liberty is the redemption arc 🎮", time: "2m ago" },
      { user: "@streamer2", text: "Streaming Night City all weekend!", time: "15m ago" }
    ]
  },
  2: {
    genre: "FPS",
    platform: "PC",
    dailyMentions: 980,
    sentiment: 76,
    engagement: "High",
    uniqueUsers: 880,
    trendData: [40, 50, 55, 52, 57, 60, 63],
    sources: [
      { name: "Twitter", value: 45 },
      { name: "Reddit", value: 30 },
      { name: "Twitch", value: 25 }
    ],
    insights: ["New agent reveal driving discussion.", "Esports scene boosting popularity."],
    sentimentDistribution: { positive: 65, neutral: 25, negative: 10 },
    recentMentions: [
      { user: "@valorantPro", text: "Patch changes are meta-shifting 🔥", time: "5m ago" },
      { user: "@fpsFan", text: "Ranked grind never stops.", time: "1h ago" }
    ]
  },
  3: {
    genre: "RPG",
    platform: "PC",
    dailyMentions: 2100,
    sentiment: 90,
    engagement: "Very High",
    uniqueUsers: 1750,
    trendData: [100, 120, 150, 180, 200, 220, 240],
    sources: [
      { name: "Reddit", value: 40 },
      { name: "Twitter", value: 35 },
      { name: "YouTube", value: 25 }
    ],
    insights: ["Massive community praise for storytelling.", "Critical acclaim sustaining engagement."],
    sentimentDistribution: { positive: 85, neutral: 10, negative: 5 },
    recentMentions: [
      { user: "@dndlover", text: "Best RPG ever made?", time: "10m ago" },
      { user: "@loreMaster", text: "The choices are insane!", time: "30m ago" }
    ]
  },
  4: {
    genre: "FPS",
    platform: "PC",
    dailyMentions: 1600,
    sentiment: 70,
    engagement: "Medium",
    uniqueUsers: 1250,
    trendData: [90, 85, 82, 80, 78, 75, 73],
    sources: [
      { name: "Twitch", value: 50 },
      { name: "YouTube", value: 30 },
      { name: "Twitter", value: 20 }
    ],
    insights: ["Mixed reception on recent updates.", "Esports tournaments keeping interest alive."],
    sentimentDistribution: { positive: 55, neutral: 30, negative: 15 },
    recentMentions: [
      { user: "@csLegend", text: "CS2 feels smoother after the patch.", time: "20m ago" },
      { user: "@shooterFan", text: "Not sure about the weapon balance…", time: "1h ago" }
    ]
  },
  5: {
    genre: "RPG",
    platform: "PC/Xbox",
    dailyMentions: 1300,
    sentiment: 75,
    engagement: "Medium",
    uniqueUsers: 1100,
    trendData: [60, 65, 70, 72, 78, 83, 85],
    sources: [
      { name: "Reddit", value: 35 },
      { name: "Twitter", value: 40 },
      { name: "YouTube", value: 25 }
    ],
    insights: ["Exploration is highly praised.", "Performance issues still concern some players."],
    sentimentDistribution: { positive: 60, neutral: 25, negative: 15 },
    recentMentions: [
      { user: "@spaceGamer", text: "Starfield is massive 🚀", time: "3m ago" },
      { user: "@rpgFan", text: "Too many loading screens tho 😅", time: "45m ago" }
    ]
  },
  6: {
    genre: "MOBA",
    platform: "PC",
    dailyMentions: 2500,
    sentiment: 68,
    engagement: "Very High",
    uniqueUsers: 2200,
    trendData: [200, 210, 205, 215, 225, 220, 230],
    sources: [
      { name: "Twitter", value: 30 },
      { name: "Reddit", value: 40 },
      { name: "YouTube", value: 30 }
    ],
    insights: ["Competitive season in full swing.", "Community split on latest patch."],
    sentimentDistribution: { positive: 55, neutral: 30, negative: 15 },
    recentMentions: [
      { user: "@lolCaster", text: "Worlds hype is unreal 🔥", time: "25m ago" },
      { user: "@casualGamer", text: "Patch 14.2 nerfed my champ 😭", time: "50m ago" }
    ]
  }
};