from kafka import KafkaProducer
import json
import time
from reddit import RedditFetcher  
from steam import SteamPlayerCount  
from x_fetccher import TwitterPostsFetcher  
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.messages import HumanMessage,SystemMessage,AIMessage
from twitch import TwitchFetcher
from prompts import DeveloperToolsPrompts
from dotenv import load_dotenv
from gameslist import most_famous_games

# Main loop to fetch and send data
# ----------------------------
def run_pipelines(poll_interval=3600):
    """
    Runs all fetchers periodically and sends data to Kafka.
    poll_interval: seconds between fetches
    """
    producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    security_protocol='PLAINTEXT'
    )
    load_dotenv()
    prompts=DeveloperToolsPrompts()
    # ----------------------------
    # Initialize your fetchers
    # ----------------------------
    reddit_fetcher = RedditFetcher()       
    steam_fetcher = SteamPlayerCount()    
    twitter_fetcher = TwitterPostsFetcher() 
    Twitch=TwitchFetcher()
    llm=GoogleGenerativeAI(model="gemini-2.0-flash",temperature=0.4)
    print('llm initializedd')
    # ----------------------------
    while True:
        try:
            data=[]
            # --- Reddit ---
            subreddits = ['Games', 'IndieGames','esports','GamerPals']
            for subreddit in subreddits:
                posts = reddit_fetcher.get_trending_posts_with_comments(
                subreddit=subreddit,
                time_filter='day',
                post_limit=5,
                comment_limit=10
            )
                summary = llm.invoke(f"Summarize these Reddit posts in 3-5 sentences keep games names:\n\n{posts}")
                data.append(summary)
            with open("file.txt",'w') as f:
                f.write(str(data))
            producer.send("reddit-posts", data)
           
            messages = [
            SystemMessage(content=prompts.parse_reddit),
            HumanMessage(content=prompts.parse_reddit_prompt(data)),
            ]

            response = llm.invoke(messages)
            print(response)
            if response.strip().startswith("```python") or response.strip().startswith("python"):
                response = response.strip().split('\n', 1)[1]
            game_list = response.strip('`')  # Remove backticks
            game_list = eval(game_list)        
            filtered_games_list = [game for game in game_list if game not in most_famous_games]
    
            print(game_list)

            # --- Steam ---
            player_counts={}
            streamers={}
            for game in filtered_games_list:
                id_game = steam_fetcher.quick_app_id_search(game)
                player_counts[game]=steam_fetcher.get_current_player_count(id_game)
                tweets = twitter_fetcher.fetch_tweets(game)
                if tweets:
                    for tweet in tweets:
                        producer.send("twitter-posts", tweet)
                else:
                    producer.send("twitter-posts", game)
                    print(f"✅ Sent {len(tweets)} Twitter posts to Kafka")
                twitch=Twitch.get_streams(game)
                streamers[game]=twitch
                print(streamers)
            producer.send("twitch-top-streamers",twitch)

            producer.send("steam-player-counts", player_counts)
            print(f"✅ Sent {len(player_counts)} Steam counts to Kafka")



            # Flush messages to ensure all are sent
            producer.flush()

            # Wait before next fetch
            print(f"⏱ Sleeping for {poll_interval} seconds...\n")
            time.sleep(poll_interval)

        except Exception as e:
            print("❌ Error in pipeline:", e)
            time.sleep(poll_interval)  # wait before retrying


if __name__ == "__main__":
     run_pipelines(poll_interval=60)  # fetch every 60 seconds
