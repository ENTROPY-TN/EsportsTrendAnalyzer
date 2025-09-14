import requests

class TwitchFetcher:
    def __init__(self, ):
        self.client_id = "m7fa2rg7ffexmtp0wwnbkn24aavcak"
        self.client_secret = "268jkdrt62m4lr1dqv929zx8f3shck"
        self.access_token = self.get_access_token()

    def get_access_token(self) -> str:
        """Authenticate with Twitch and return access token."""
        auth_url = "https://id.twitch.tv/oauth2/token"
        auth_params = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "client_credentials"
        }
        response = requests.post(auth_url, params=auth_params)
        response.raise_for_status()
        token = response.json()["access_token"]
        print("✅ Access token acquired")
        return token

    def get_game_id(self, game_name: str) -> str | None:
        """Fetch Twitch game_id for a given game name."""
        url = "https://api.twitch.tv/helix/games"
        headers = {
            "Client-ID": self.client_id,
            "Authorization": f"Bearer {self.access_token}"
        }
        params = {"name": game_name}
        response = requests.get(url, headers=headers, params=params).json()
        if response.get("data"):
            return response["data"][0]["id"]
        return None

    def get_streams(self, game_name: str, limit: int = 5):
        """Fetch streams for a given game and return top viewer counts."""
        game_id = self.get_game_id(game_name)
        if not game_id:
            print(f"❌ Game '{game_name}' not found on Twitch")
            return []

        url = "https://api.twitch.tv/helix/streams"
        headers = {
            "Client-ID": self.client_id,
            "Authorization": f"Bearer {self.access_token}"
        }
        params = {"game_id": game_id}
        response = requests.get(url, headers=headers, params=params).json()

        if "data" in response:
            streams = response["data"]
            top_viewers = [s["viewer_count"] for s in streams[:limit]]
            return top_viewers
        return []



