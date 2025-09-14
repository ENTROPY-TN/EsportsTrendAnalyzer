from kafka import KafkaConsumer
import json



def fetch_data_from_topic(topic_name, kafka_broker='localhost:9092', group_id='your_consumer_group'):
    """
    Fetches data from a specified Kafka topic.
    
    Parameters:
    - topic_name (str): The name of the Kafka topic to consume from.
    - kafka_broker (str): Kafka broker address (default is 'your_kafka_broker').
    - group_id (str): Consumer group ID (default is 'your_consumer_group').
    
    Returns:
    - List of messages consumed from the topic.
    """
    # Initialize the Kafka consumer for the specified topic
    consumer = KafkaConsumer(
        topic_name,
        bootstrap_servers=[kafka_broker],
        group_id=group_id,
        auto_offset_reset='earliest',  # Start from the beginning of the topic (optional)
        enable_auto_commit=True,
        value_deserializer=lambda m: json.loads(m.decode('utf-8'))  # Assuming JSON data
    )
    

    messages = []  # List to store the consumed messages

    # Poll for a set amount of time (e.g., 1 second) to get data
    for message in consumer:
        print(f"Consumed message: {message.value}")
        messages.append(message.value)  
        if len(messages) >= 0:
            break


    consumer.close()  
    return messages


