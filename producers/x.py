import requests
class TwitterPostsFetcher:
    def init(self):
        bearer_token = "AAAAAAAAAAAAAAAAAAAAAJyf4AEAAAAAf3fG0fPYqelWNWQ%2FV7hiDDe%2FkoY%3Dmgupsyg9274cXSEVkShRWuwJKCH4figM1xXMIDk9Tmoi6rD5kE"
        self.headers = {"Authorization": f"Bearer {bearer_token}"}

        # Step 1: Fetch original tweets
    def fetch_tweets(self,game):
        self.query = f"{game} 2 lang:en -is:retweet"
        self.url = f"https://api.x.com/2/tweets/search/recent?query={self.query}&max_results=15"

        full_data=[]
        response = requests.get(self.url, headers=self.headers).json()
        print(response)
        tweets = response.get("data", [])
        print(tweets)

        for tweet in tweets:
            tweeta={}
            print("🔹 Original Tweet:", tweet["text"])
            tweeta["text"]=tweet["text"]
            # Step 2: Fetch replies using conversation_id
            conv_id = tweet["conversation_id"] if "conversation_id" in tweet else tweet["id"]
            replies_url = f"https://api.x.com/2/tweets/search/recent?query=conversation_id:{conv_id}&max_results=5"
            replies_response = requests.get(replies_url, headers=self.headers).json()

            replies = replies_response.get("data", [])
            tweeta["responses"]=replies
            full_data.append(tweeta)
        return full_data