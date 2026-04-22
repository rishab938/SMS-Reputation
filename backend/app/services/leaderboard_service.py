import json
import os

from backend.app.services.storage_service import load_data
from backend.app.services.sender_service import get_sender_data

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "../../data/dataset_senders.json")


# 🔹 Load demo senders
def load_dataset_senders():
    if not os.path.exists(DATASET_PATH):
        return []

    with open(DATASET_PATH, "r") as f:
        return json.load(f)


# 🔹 Main leaderboard
def get_leaderboard():
    # Demo senders
    dataset_senders = load_dataset_senders()

    # Live senders
    real_data = load_data()
    real_senders = []

    for sender_id in real_data:
        sender = get_sender_data(sender_id)
        real_senders.append(sender)

    # Combine both
    all_senders = dataset_senders + real_senders

    # Sort by score (descending)
    all_senders.sort(key=lambda x: x["score"], reverse=True)

    # Add rank
    for i, sender in enumerate(all_senders):
        sender["rank"] = i + 1

    return all_senders