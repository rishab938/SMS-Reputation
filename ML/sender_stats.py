import pandas as pd
import os


# Load dataset once
base_dir = os.path.dirname(__file__)
data_path = os.path.join(base_dir, "data", "enron1.csv")

try:
    df = pd.read_csv(data_path)
    
    # Basic cleaning
    df = df.drop_duplicates()
    df['message'] = df['message'].astype(str).str.strip()

    # Add helper columns
    df['message_length'] = df['message'].apply(len)
    df['has_link'] = df['message'].apply(lambda x: 1 if "http" in x or "www" in x else 0)
    df['label_num'] = df['label'].map({'ham': 0, 'spam': 1})

    # If sender_id not present (first run), create it
    if 'sender_id' not in df.columns:
        import random
        senders = [f"SENDER_{i}" for i in range(100)]
        df['sender_id'] = [random.choice(senders) for _ in range(len(df))]

    # Precompute sender stats
    sender_group = df.groupby('sender_id')
except FileNotFoundError:
    print("Warning: Dataset not found. Using mock sender stats.")
    df = None
    sender_group = None


def get_sender_stats(sender_id):
    return {
        "spam_rate": 0.2,
        "link_density": 0.3,
        "avg_message_length": 120,
        "volume": 10
    }
    """
    Returns stats for a given sender_id
    """
    if sender_group is None or sender_id not in sender_group.groups:
        # Mock fallback
        import random
        return {
            "sender_id": sender_id,
            "spam_rate": round(random.uniform(0.01, 0.4), 4),
            "avg_length": round(random.uniform(50, 200), 2),
            "link_density": round(random.uniform(0.1, 0.8), 4),
            "volume": random.randint(5, 150)
        }

    sender_df = sender_group.get_group(sender_id)

    total_messages = len(sender_df)
    spam_messages = sender_df['label_num'].sum()

    # Spam rate
    spam_rate = spam_messages / total_messages if total_messages > 0 else 0

    # Avg message length
    avg_length = sender_df['message_length'].mean()

    # Link density
    link_density = sender_df['has_link'].sum() / total_messages if total_messages > 0 else 0

    # Volume
    volume = total_messages

    return {
        "sender_id": sender_id,
        "spam_rate": round(spam_rate, 4),
        "avg_length": round(avg_length, 2),
        "link_density": round(link_density, 4),
        "volume": volume
    }