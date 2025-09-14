import requests
import json
import time
from datetime import datetime
from typing import Dict, List, Optional, Union
import asyncio
import aiohttp
import json
from typing import List, Dict, Optional

class SteamPlayerCount:
    """Class to interact with Steam's GetNumberOfCurrentPlayers API"""
    def __init__(self):
        self.BASE_URL = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/"
    
    def get_current_player_count(self,app_id: int) -> Dict:
        """
        Get current player count for a specific game
        
        Args:
            app_id (int): Steam app ID of the game
            
        Returns:
            dict: Response containing success status, player count, and metadata
        """
        url = f"{self.BASE_URL}?appid={app_id}"
        
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if data.get('response', {}).get('result') == 1:
                return {
                    'success': True,
                    'app_id': app_id,
                    'player_count': data['response']['player_count'],
                    'timestamp': datetime.now().isoformat()
                }
            else:
                return {
                    'success': False,
                    'error': 'Invalid app ID or no data available',
                    'app_id': app_id
                }
                
        except requests.RequestException as e:
            return {
                'success': False,
                'error': str(e),
                'app_id': app_id
            }
    def search_with_store_api(self, game_name: str, limit: int = 10) -> List[Dict]:
        """
        Search using Steam Store API (alternative method)
        
        Args:
            game_name (str): Name of the game to search for
            limit (int): Maximum number of results
            
        Returns:
            List[Dict]: List of matching games from store search
        """
        store_url = f"https://store.steampowered.com/api/storesearch/"
        params = {
            'term': game_name,
            'l': 'english',
            'cc': 'US'
        }
        
        try:
            response = requests.get(store_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            results = []
            for item in data.get('items', [])[:limit]:
                results.append({
                    'appid': item['id'],
                    'name': item['name'],
                    'type': item.get('type', 'unknown'),
                    'price': item.get('price', {}).get('final', 0) / 100 if item.get('price') else None
                })
            
            return results
            
        except requests.RequestException as e:
            print(f"Error searching store: {e}")
            return []
    def get_all_apps(self, force_refresh: bool = False) -> List[Dict]:
        self.apps_cache=[]
        if self.apps_cache is None or force_refresh:
            try:
                response = requests.get(self.apps_url, timeout=30)
                response.raise_for_status()
                self.apps_cache = response.json()['applist']['apps']
            except requests.RequestException as e:
                print(f"Error fetching Steam app list: {e}")
                return []
        return self.apps_cache


    def search_game_by_name(self, game_name: str, exact_match: bool = False) -> List[Dict]:
        """
        Search for games by name
        
        Args:
            game_name (str): Name of the game to search for
            exact_match (bool): If True, only return exact matches
            
        Returns:
            List[Dict]: List of matching games with appid and name
        """
        apps = self.get_all_apps()
        if not apps:
            return []
        
        game_name_lower = game_name.lower().strip()
        matches = []
        
        for app in apps:
            app_name = app['name'].lower()
            
            if exact_match:
                if app_name == game_name_lower:
                    matches.append(app)
            else:
                if game_name_lower in app_name:
                    matches.append(app)
        
        # Sort by name length (shorter names first, likely more relevant)
        matches.sort(key=lambda x: len(x['name']))
        return matches
  
    def quick_app_id_search(self,game_name: str) -> Optional[int]: #IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDdd
        """
        Quick function to get the most likely App ID for a game
        
        Args:
            game_name (str): Name of the game
            
        Returns:
            Optional[int]: Most likely App ID
        """
        
        # Try store search first (usually more accurate for popular games)
        store_results = self.search_with_store_api(game_name, 1)
        if store_results:
            return store_results[0]['appid']
        
        # Fall back to app list search
        results = self.search_game_by_name(game_name)
        if results:
            return results[0]['appid']
        
        return None


fetcher=SteamPlayerCount()
id=(fetcher.quick_app_id_search('Marvel Rivals'))
t=fetcher.get_current_player_count(id)
print(t)