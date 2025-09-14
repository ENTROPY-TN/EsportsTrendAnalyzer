
import threading
import time
from dataFetching import run_pipelines
from dataLoading import fetch_data_from_topic
import json
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.messages import HumanMessage,SystemMessage,AIMessage
from games import get_game_details_by_name
from prompts import DeveloperToolsPrompts
import traceback
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
prompts=DeveloperToolsPrompts()
llm=GoogleGenerativeAI(model="gemini-2.0-flash",temperature=0.4)
client = MongoClient('mongodb://localhost:27017/')  # Assuming you're running MongoDB locally
db = client['your_database']  # Replace with your database name
collection = db['your_collection']  # Replace with your collection name

def process_and_generate_output():
    try:
    # Fetch data from different topics
        reddit = fetch_data_from_topic('reddit-posts')
        twitter = fetch_data_from_topic('twitter-posts')
        twitch = fetch_data_from_topic('twitch-top-streamers')
        steam = fetch_data_from_topic('steam-player-counts')
        print("*"*50)
        game_data = []
        games = list(steam[0].keys())  # Assuming steam data contains game names as keys
        print(games)
        for game in games:
            game_data.append(get_game_details_by_name(game))
        
        # Prepare messages to be sent to LLM
        messages = [
            SystemMessage(content=prompts.output_trend_sys),
            HumanMessage(content=prompts.output_trend_prompt(reddit, twitter, twitch, steam, game_data)),
        ]
        
        # Invoke LLM to process the messages
        response = llm.invoke(messages)

        if response.strip().startswith("```json") or response.strip().startswith("json"):
                response = response.strip().split('\n', 1)[1]
        trend_data = response.strip("`")
        messages = [
            SystemMessage(content=prompts.review),
            HumanMessage(content=prompts.review_prompt(trend_data)),
        ]
        review=llm.invoke(messages)
        if response.strip().startswith("```json") or response.strip().startswith("json"):
                response = response.strip().split('\n', 1)[1]
    
        review_data = response.strip("`")
        review_parsed=json.loads(review_data)
        trend_parsed=json.loads(trend_data)


        # Step 2: Read JSON file
        with open("trend.json", 'w', encoding='utf-8') as f:
            
            json.dump(trend_parsed, f, indent=4)  # Using json.dump() to write data with indentation

        # Writing review_data to "review.json"
        with open("review.json", 'w', encoding='utf-8') as f:
            json.dump(review_parsed, f, indent=4)  # Using json.dump() to write data with indentation

        # Merging both JSON data into a list and writing it to "merged.json"
        merged_data = [trend_data, review_data]



# Convert the merged dictionary back to JSON
        merged_json = json.dumps(merged_data)
        with open("merged.json", 'w', encoding='utf-8') as f:
            json.dump(merged_data, f, indent=4)
             
        # Step 3: Insert data into MongoDB
        # You can use insert_many if you have multiple documents
        try:
            collection.insert_many(merged_json)  # Insert multiple documents from the JSON
            print("Data inserted successfully!")
        except Exception as e:
            print(f"An error occurred: {e}")

        print(response) 
    except Exception as e:
        print(f"Error in process_and_generate_output: {e}")
        traceback.print_exc()
# Consumer 
        print(response) 
    except Exception as e:
        print(f"Error in process_and_generate_output: {e}")
        traceback.print_exc()
# Consumer and Producer combined in a pipeline
def run_pipeline():
    try:
        # Create separate threads for the producer and consumer
        producer_thread = threading.Thread(target=run_pipelines,daemon=True)
        #consumer_thread = threading.Thread(target=fetch_data_from_topic, args=('your-topic', 'localhost:9092', 'your-consumer-group'))
        producer_thread.start()
        time.sleep(150) 
        consumer_thread = threading.Thread(target=process_and_generate_output,daemon=True)
        consumer_thread.start()
        
        # Start both threads
        #consumer_thread.start()
    
        # Wait for the threads to finish (this will run forever for your case)
        producer_thread.join()
        consumer_thread.join()
        #consumer_thread.join()
    except Exception as e:
        print(f"Error in run_pipeline: {e}")




# Main function to run the pipeline and process data with LLM
def main():
    # Run producer and consumer threads
    run_pipeline()

    # Fetch data from Kafka for processing (you may want to fetch once, or periodically)
    
if __name__ == "__main__":
    main()
