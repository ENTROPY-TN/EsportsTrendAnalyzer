import requests

def get_game_details_by_name(game_name, api_key="310cbdba43a64ffb9f93c5bbd483a7d7"):
    # Define the search endpoint with the game name and API key
    search_url = f"https://api.rawg.io/api/games?key={api_key}&page_size=1&search={game_name}"

    # Send GET request to search for the game
    response = requests.get(search_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        data = response.json()

        # If the game was found, extract the game ID
        if data['count'] > 0:
            game_id = data['results'][0]['id']

            # Fetch detailed game information using the game ID
            details_url = f"https://api.rawg.io/api/games/{game_id}?key={api_key}"
            details_response = requests.get(details_url)

            if details_response.status_code == 200:
                game_details = details_response.json()
                formatted_details = {
                    "name": game_details.get("name", "N/A"),
                    "released": game_details.get("released", "N/A"),
                    "rating": game_details.get("rating", "N/A"),
                    "rating_count": game_details.get("ratings_count", "N/A"),
                    "metacritic_score": game_details.get("metacritic", "N/A"),
                    "metacritic_url": game_details.get("metacritic_url", "N/A"),
                    "background_image": game_details.get("background_image", "N/A"),
                    "platforms": [platform['platform']['name'] for platform in game_details.get("platforms", [])],
                    "release_at": game_details.get("platforms", [{}])[0].get("released_at", "N/A"),
                    "youtube_count": game_details.get("youtube_count", "N/A"),
                    "twitch_count": game_details.get("twitch_count", "N/A"),
                    "reddit_count": game_details.get("reddit_count", "N/A"),
                    "achievement_count": game_details.get("achievements_count", "N/A"),
                    "play_time": game_details.get("playtime","N/A")
                }

                return formatted_details
            else:
                print(f"Error fetching game details: {details_response.status_code}")
        else:
            print("Game not found.")
    else:
        print(f"Error searching for the game: {response.status_code}")

print(get_game_details_by_name("Marvel Rivals"))