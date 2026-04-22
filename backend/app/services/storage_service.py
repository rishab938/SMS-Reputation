import json
import os

# 🔹 Absolute path to data file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "../../data/senders.json")


def load_data():
    """
    Load sender data safely.
    Handles:
    - Missing file
    - Empty file
    - Corrupt JSON
    """
    if not os.path.exists(DATA_PATH):
        return {}

    try:
        with open(DATA_PATH, "r") as f:
            content = f.read().strip()

            # Handle empty file
            if not content:
                return {}

            return json.loads(content)

    except Exception:
        # Handle corrupted JSON
        return {}


def save_data(data):
    """
    Save sender data safely.
    Ensures proper JSON formatting.
    """
    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)

    with open(DATA_PATH, "w") as f:
        json.dump(data, f, indent=4)