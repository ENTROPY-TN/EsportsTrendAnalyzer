import requests
import json
import time
from typing import Dict, List, Optional, Union
from datetime import datetime
import praw  # Reddit A

class RedditFetcher:
    """Class to fetch Reddit posts and comments using both API methods"""
    
    def __init__(self, client_id: str = "9YFCgx8dnW01OdO_aIy5uw", client_secret: str = "ZD6AP8tXMRiGN8t7v3LvLm5ScG4J6A", user_agent: str = "gamepref/0.1 by u/sinen2004"):
        """
        Initialize Reddit API client
        
        Args:
            client_id: Reddit app client ID
            client_secret: Reddit app client secret  
            user_agent: User agent string for requests
        """
       
        # For authenticated requests (higher rate limits)
        if client_id and client_secret and user_agent:
            self.reddit = praw.Reddit(
                client_id=client_id,
                client_secret=client_secret,
                user_agent=user_agent
            )
            print(self.reddit)
            self.authenticated = True
        else:
            self.reddit = None
            self.authenticated = False
        
        # For unauthenticated requests
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': user_agent or 'Reddit Post Fetcher 1.0'
        })
    
    def get_top_posts_json(self, subreddit: str, time_filter: str = 'day', limit: int = 25) -> List[Dict]:
        """
        Get top posts using JSON endpoint (no authentication required)
        
        Args:
            subreddit: Name of the subreddit (without r/)
            time_filter: 'hour', 'day', 'week', 'month', 'year', 'all'
            limit: Number of posts to fetch (max 100)
            
        Returns:
            List of post dictionaries
        """
        url = f"https://www.reddit.com/r/{subreddit}/top.json"
        params = {
            't': time_filter,
            'limit': min(limit, 100),
            'raw_json': 1
        }
        
        try:
            response = self.session.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            posts = []
            for post_data in data['data']['children']:
                post = post_data['data']
                posts.append(self._format_post_data(post))
            
            return posts
            
        except requests.RequestException as e:
            print(f"Error fetching posts: {e}")
            return []
    
    def get_post_comments_json(self, subreddit: str, post_id: str, limit: int = 100) -> List[Dict]:
        """
        Get comments for a specific post using JSON endpoint
        
        Args:
            subreddit: Name of the subreddit
            post_id: Reddit post ID
            limit: Number of comments to fetch
            
        Returns:
            List of comment dictionaries
        """
        url = f"https://www.reddit.com/r/{subreddit}/comments/{post_id}.json"
        params = {
            'limit': limit,
            'raw_json': 1
        }
        
        try:
            response = self.session.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            # Comments are in the second element of the response
            if len(data) > 1:
                comments = []
                for comment_data in data[1]['data']['children']:
                    if comment_data['kind'] == 't1':  # Comment type
                        comment = comment_data['data']
                        comments.append(self._format_comment_data(comment))
                return comments
            
            return []
            
        except requests.RequestException as e:
            print(f"Error fetching comments: {e}")
            return []
    
    def get_top_posts_praw(self, subreddit: str, time_filter: str = 'day', limit: int = 25) -> List[Dict]:
        """
        Get top posts using PRAW (requires authentication)
        
        Args:
            subreddit: Name of the subreddit
            time_filter: 'hour', 'day', 'week', 'month', 'year', 'all'
            limit: Number of posts to fetch
            
        Returns:
            List of post dictionaries
        """
        if not self.authenticated:
            print("Authentication required for PRAW method")
            return []
        
        try:
            subreddit_obj = self.reddit.subreddit(subreddit)
            posts = []
            
            for post in subreddit_obj.top(time_filter=time_filter, limit=limit):
                posts.append(self._format_post_data_praw(post))
            
            return posts
            
        except Exception as e:
            print(f"Error fetching posts with PRAW: {e}")
            return []
    
    def get_post_comments_praw(self, post_id: str, limit: int = 100) -> List[Dict]:
        """
        Get comments using PRAW (requires authentication)
        
        Args:
            post_id: Reddit post ID
            limit: Number of comments to fetch
            
        Returns:
            List of comment dictionaries
        """
        if not self.authenticated:
            print("Authentication required for PRAW method")
            return []
        
        try:
            submission = self.reddit.submission(id=post_id)
            submission.comments.replace_more(limit=0)  # Remove "more comments" objects
            
            comments = []
            for comment in submission.comments.list()[:limit]:
                comments.append(self._format_comment_data_praw(comment))
            
            return comments
            
        except Exception as e:
            print(f"Error fetching comments with PRAW: {e}")
            return []
    
    def get_trending_posts_with_comments(self, subreddit: str, time_filter: str = 'day', 
                                       post_limit: int = 10, comment_limit: int = 20) -> List[Dict]:
        """
        Get top posts with their comments
        
        Args:
            subreddit: Name of the subreddit
            time_filter: Time filter for top posts
            post_limit: Number of posts to fetch
            comment_limit: Number of comments per post
            
        Returns:
            List of posts with embedded comments
        """
        # Get top posts
        if self.authenticated:
            posts = self.get_top_posts_praw(subreddit, time_filter, post_limit)
        else:
            posts = self.get_top_posts_json(subreddit, time_filter, post_limit)
        
        # Get comments for each post
        for post in posts:
            post_id = post['id']
            
            if self.authenticated:
                comments = self.get_post_comments_praw(post_id, comment_limit)
            else:
                comments = self.get_post_comments_json(subreddit, post_id, comment_limit)
            
            post['comments'] = comments
            post['comment_count'] = len(comments)
            
            # Rate limiting
            time.sleep(0.5)
        
        return posts
    
    def _format_post_data(self, post: Dict) -> Dict:
        """Format post data from JSON API"""
        return {
            'title': post.get('title'),
            'subreddit': post.get('subreddit'),
            'score': post.get('score', 0),
            'upvote_ratio': post.get('upvote_ratio', 0),
            'num_comments': post.get('num_comments', 0),
            'created_datetime': datetime.fromtimestamp(post.get('created_utc', 0)).isoformat() if post.get('created_utc') else None,
            'url': post.get('url'),
            'permalink': f"https://reddit.com{post.get('permalink', '')}",
            'selftext': post.get('selftext', ''),
            'post_hint': post.get('post_hint'),
            'domain': post.get('domain')
        }
    
    def _format_post_data_praw(self, post) -> Dict:
        """Format post data from PRAW"""
        return {
            'title': post.title,
            'subreddit': str(post.subreddit),
            'score': post.score,
            'upvote_ratio': post.upvote_ratio,
            'num_comments': post.num_comments,
            'created_utc': post.created_utc,
            'created_datetime': datetime.fromtimestamp(post.created_utc).isoformat(),
            'url': post.url,
            'permalink': f"https://reddit.com{post.permalink}",
            'selftext': post.selftext,
            'post_hint': getattr(post, 'post_hint', None),
            'domain': post.domain
        }
    
    def _format_comment_data(self, comment: Dict) -> Dict:
        """Format comment data from JSON API"""
        return {
            'body': comment.get('body', ''),
            'score': comment.get('score', 0),
            'created_datetime': datetime.fromtimestamp(comment.get('created_utc', 0)).isoformat() if comment.get('created_utc') else None,
            'depth': comment.get('depth', 0),
            'permalink': f"https://reddit.com{comment.get('permalink', '')}"
        }
    
    def _format_comment_data_praw(self, comment) -> Dict:
        """Format comment data from PRAW"""
        return {
            'body': comment.body,
            'score': comment.score,
            'created_datetime': datetime.fromtimestamp(comment.created_utc).isoformat(),
            'depth': getattr(comment, 'depth', 0),
            'is_submitter': comment.is_submitter,
            'permalink': f"https://reddit.com{comment.permalink}"
        }

def display_posts_with_comments(posts: List[Dict], max_comments: int = 5):
    """Display posts with comments in a readable format"""
    for i, post in enumerate(posts, 1):
        print(f"\n{'='*80}")
        print(f"POST #{i}: {post['title']}")
        print(f"{'='*80}")
        print(f"Author: u/{post['author']}")
        print(f"Subreddit: r/{post['subreddit']}")
        print(f"Score: {post['score']} (↑{post.get('upvote_ratio', 0)*100:.1f}%)")
        print(f"Comments: {post['num_comments']}")
        print(f"Created: {post.get('created_datetime', 'Unknown')}")
        print(f"URL: {post['permalink']}")
        
        if post.get('selftext'):
            print(f"\nContent: {post['selftext'][:200]}{'...' if len(post['selftext']) > 200 else ''}")
        
        # Display comments
        comments = post.get('comments', [])
        if comments:
            print(f"\n--- TOP {min(len(comments), max_comments)} COMMENTS ---")
            for j, comment in enumerate(comments[:max_comments], 1):
                print(f"\n{j}. u/{comment['author']} (Score: {comment['score']})")
                comment_body = comment['body'][:300]
                if len(comment['body']) > 300:
                    comment_body += "..."
                print(f"   {comment_body}")
        else:
            print("\n--- NO COMMENTS FETCHED ---")

def main():
    """Example usage"""
    print("=== Reddit API Fetcher Examples ===\n")
    
    # Initialize without authentication (uses JSON endpoints)
    fetcher = RedditFetcher()
    
    # Example subreddits to test
    test_subreddits = ['Games', 'IndieGames','esports','GamerPals']

    for subreddit in test_subreddits:
        print(f"Fetching top posts from r/{subreddit}...")
        
        # Get top posts with comments
        posts = fetcher.get_trending_posts_with_comments(
            subreddit=subreddit,
            time_filter='day',
            post_limit=3,
            comment_limit=10
        )
        # print(f"Top posts from r/{subreddit}:\n")
        print(posts)
        
        # print(f"\n{'='*100}\n")

if __name__ == "__main__":
    main()
