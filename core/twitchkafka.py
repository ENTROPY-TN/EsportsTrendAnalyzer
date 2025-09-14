import requests
from kafka import KafkaProducer
import json

# ----------------------------
# Twitch API setup
# ----------------------------
client_id = "m7fa2rg7ffexmtp0wwnbkn24aavcak"
client_secret = "268jkdrt62m4lr1dqv929zx8f3shck"

# Step 1: Get OAuth token
auth_url = "https://id.twitch.tv/oauth2/token"
auth_params = {
    "client_id": client_id,
    "client_secret": client_secret,
    "grant_type": "client_credentials"
}

auth_response = requests.post(auth_url, params=auth_params)
auth_response.raise_for_status()
access_token = auth_response.json()["access_token"]
print("✅ Access token:", access_token)

# Step 2: Function to get Twitch game_id
def get_game_id(game_name):
    url = "https://api.twitch.tv/helix/games"
    headers = {
        "Client-ID": client_id,
        "Authorization": f"Bearer {access_token}"
    }
    params = {"name": game_name}
    response = requests.get(url, headers=headers, params=params).json()
    if response["data"]:
        return response["data"][0]["id"]
    return None

# ----------------------------
# Kafka setup
# ----------------------------
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',  # change if needed
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# ----------------------------
# Fetch Twitch streams and send to Kafka
# ----------------------------
game_name = "Fortnite"
game_id = get_game_id(game_name)
if not game_id:
    print(f"❌ Game {game_name} not found on Twitch")
    exit()

url = "https://api.twitch.tv/helix/streams"
parameters = {"game_id": game_id}
headers = {
    "Client-ID": client_id,
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, params=parameters, headers=headers).json()
streams = response.get("data", [])

if streams:
    print(f"✅ Fetched {len(streams)} streams for {game_name}")
    
    # Send each stream to Kafka topic "twitch-streams"
    
    for stream in streams:
        producer.send("twitch-streams", stream)
    
    # Flush to ensure all messages are sent
    producer.flush()
    
    # Optional: Extract top 5 viewer counts
    top5 = [s["viewer_count"] for s in streams[:5]]
    print("Top 5 viewer counts:", top5)
else:
    print("No streams found or invalid request")
