from fastapi import APIRouter
import json
import os

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

LIVE_PATH = os.path.join(BASE_DIR, "../../../data/senders.json")
DATASET_PATH = os.path.join(BASE_DIR, "../../../data/dataset_senders.json")


def load_json(path):
    if not os.path.exists(path):
        return {}

    try:
        with open(path, "r") as f:
            return json.load(f)
    except:
        return {}


@router.get("/dashboard")
def get_dashboard():

    live_data = load_json(LIVE_PATH)
    dataset = load_json(DATASET_PATH)

    all_senders = []

    # 🔹 dataset (list)
    if isinstance(dataset, list):
        all_senders.extend(dataset)

    # 🔹 live (dict)
    if isinstance(live_data, dict):
        all_senders.extend(live_data.values())

    total_senders = len(all_senders)

    if total_senders == 0:
        return {
            "total_senders": 0,
            "average_score": 0,
            "alerts": 0
        }

    total_score = sum(sender.get("score", 0) for sender in all_senders)
    avg_score = round(total_score / total_senders, 2)

    alerts = sum(1 for sender in all_senders if sender.get("status") == "Malicious")

    return {
        "total_senders": total_senders,
        "average_score": avg_score,
        "alerts": alerts
    }