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

    Example:
        output: ["Fortnite", "Rust"]"""
