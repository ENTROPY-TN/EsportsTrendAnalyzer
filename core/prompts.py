class DeveloperToolsPrompts:
    parse_reddit="""You are an intelligent assistant that identifies and extracts the names of games mentioned in Reddit posts."""
    
    @staticmethod
    def parse_reddit_prompt(data: str):
        return f"""Reddit data: {data}

    Task:
    - Identify and extract a list of the most relevant games that appear promising and have the potential to be trendy.

    Rules:
    - Only return the game names as a list.
    - Do not include any additional text or commentary.
    - return a pythton List
    Example:
        output: ["Fortnite", "Rust"]"""

    output_trend_sys="""You are an advanced data analyst specializing in identifying emerging trends in the gaming industry. Your task is to process large volumes of data, extract insights, and generate well-structured reports that highlight games with high potential for growth and popularity """
    
    @staticmethod
    def output_trend_prompt(reddit_posts, twitter_posts_comms, twitch, steam, games):
        """
        Generate a structured output based on the provided data sources.

        Parameters:
        - reddit_posts (list): List of Reddit posts and top comments from the video game subreddit.
        - twitter_posts_comms (list): List of Twitter posts with game names as queries.
        - twitch (dict): Dictionary of game names and the number of viewers for the top 5 streamers of that game.
        - steam (dict): Dictionary with game names and their current player counts on Steam.
        - games (dict): Dictionary with game names and general information such as price, publisher, number of users, rating, etc.

        Returns:
        - (dict): A well-structured JSON output with insights and trend analysis.
        """

        return f"""
        You are an advanced data analyst who processes and analyzes data related to video games. You have access to data from multiple sources, including Reddit, Twitter, Twitch, Steam, and game metadata. Your task is to analyze this data and generate a well-structured JSON output that highlights the trending games and provides key insights.

        Data:

        - Reddit Posts and Comments: {reddit_posts}
        - Twitter Posts: {twitter_posts_comms}
        - Twitch Viewers: {twitch}
        - Steam Player Counts: {steam}
        - Game Metadata (Price, Publisher, Rating, etc.): {games}

        Instructions:
        - Identify trending games based on popularity, user engagement, and player base growth.
        - For each game, generate a structured report that includes:
            - Trending Score (based on Reddit, Twitter, Twitch, Steam data)
            - Key Insights (e.g., growth in players, high social media engagement, etc.)
            - General Info (e.g., Price, Publisher, Rating, Playtime, YouTube views)
            - Top 3 influencers/streamers (if relevant) and their viewer counts
            - Popularity trends over time (if applicable)

        The output should be a JSON structure like this you can not remove fields and the same fields should be present in all games this is obligatory.

        Example Output Template json:

        {{
            "game_name": {{
                "trending_score": 85,
                "key_insights": [
                    "Game is seeing significant growth on Twitch with a 50% increase in viewership.",
                    "Reddit discussions are highly positive, showing increased player engagement."
                ],
                "general_info": {{
                    "price": "$39.99",
                    "publisher": "Game Publisher XYZ",
                    "released":"2012/4/4"
                    "rating": 4.5,
                    "playtime": "20-50 hours",
                    "youtube_views": 5000000,
                    "number_of_users": 1000000

                }},
                "twitch_top_streamers": [
                    {{
                        "viewer_count": 100000
                    }},
                    {{
                        "viewer_count": 90000
                    }},
                    {{
                        "viewer_count": 80000
                    }}
                ],
                "steam_player_count": 200000,
                "metacritic_score":2154,
                "achievement_count": 44
            }}
        }}

        Please process the data and return the structured JSON with detailed insights.
        """
        
    review="""You are a reviewer tasked with ranking games based on the provided information. Rate each game on a scale of 0 to 5, where 5 represents the potential for the game to become a trendsetter."""
    @staticmethod
    def review_prompt(trend_data):
        return f"""
    Context data for the reviewed games: {trend_data}
    
    For each game:
    1. **Rating**: 
        - If rating > 4: Score 5
        - If 2 < rating ≤ 4: Score 3
        - If rating ≤ 2: Score 1

    2. **Playtime**: 
        - If playtime > 100 hours: Score 5
        - If 50 < playtime ≤ 100 hours: Score 3
        - If playtime ≤ 50 hours: Score 1

    3. **YouTube Views**: 
        - If YouTube views > 1 million: Score 5
        - If 100k < YouTube views ≤ 1 million: Score 3
        - If YouTube views ≤ 100k: Score 1

    4. **Twitch Viewer Count**: 
        - If Twitch viewers > 1000: Score 5
        - If 100 < Twitch viewers ≤ 999: Score 3
        - If Twitch viewers ≤ 100: Score 1

    5. **Metacritic Score**: 
        - If Metacritic score > 80: Score 5
        - If 60 < Metacritic score ≤ 80: Score 3
        - If Metacritic score ≤ 60: Score 1

    After evaluating each criterion, **average the total scores** to give a final ranking for each game (from 0 to 5).
    output example json file:
    {{"Valorant":4.2,"Fortnite":2.8}}
    """

