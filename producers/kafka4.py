from kafka import KafkaProducer
import json
import requests

# Kafka setup
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',  # your Kafka server
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# X API setup
bearer_token = "YOUR_BEARER_TOKEN"
headers = {"Authorization": f"Bearer {bearer_token}"}

query = "counter strike 2 lang:en -is:retweet"
url = f"https://api.x.com/2/tweets/search/recent?query={query}&max_results=15"

response = requests.get(url, headers=headers).json()
tweets = response.get("data", [])

for tweet in tweets:
    # send original tweet to Kafka
    producer.send('x-posts', tweet)

# fetch replies
    conv_id = tweet.get("conversation_id", tweet["id"])
    replies_url = f"https://api.x.com/2/tweets/search/recent?query=conversation_id:{conv_id}&max_results=5"
    replies_response = requests.get(replies_url, headers=headers).json()
    replies = replies_response.get("data", [])

    for reply in replies:
        if reply["id"] != tweet["id"]:
            # send reply to Kafka
            producer.send('x-posts', reply)

# flush messages
producer.flush()