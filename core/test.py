import praw

reddit = praw.Reddit(
    client_id="9YFCgx8dnW01OdO_aIy5uw",
    client_secret="ZD6AP8tXMRiGN8t7v3LvLm5ScG4J6A",
    user_agent="gamepref/0.1 by u/sinen2004"
)

try:
    subreddit = reddit.subreddit("gaming")
    for post in subreddit.hot(limit=3):
        print("✅", post.title)
except Exception as e:
    print("⚠️ Error:", e)