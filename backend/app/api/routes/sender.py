from fastapi import APIRouter, HTTPException
import json
import os

from backend.app.services.sender_service import get_sender_data

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "../../../data/dataset_senders.json")


def load_dataset():
    if not os.path.exists(DATASET_PATH):
        return []

    try:
        with open(DATASET_PATH, "r") as f:
            return json.load(f)
    except:
        return []


@router.get("/sender/{sender_id}")
def get_sender(sender_id: str):

    # 🔹 1. Check demo data
    dataset = load_dataset()
    for sender in dataset:
        if sender.get("sender_id") == sender_id:
            sender["source"] = "demo"
            return sender

    # 🔹 2. Check live data
    sender = get_sender_data(sender_id)

    if sender and sender.get("volume", 0) > 0:
        sender["source"] = "live"
        return sender

    # 🔹 3. Not found
    raise HTTPException(status_code=404, detail="Sender not found")