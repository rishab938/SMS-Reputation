import json
import os
import sys

# Add root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.getcwd())))

from backend.app.db.session import SessionLocal, engine, Base
from backend.app.models.db_models import Sender, Message

def migrate():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if senders.json exists
    senders_path = "backend/data/senders.json"
    dataset_path = "backend/data/dataset_senders.json"
    
    if os.path.exists(senders_path):
        with open(senders_path, "r") as f:
            live_data = json.load(f)
            for s_id, stats in live_data.items():
                # Check if already exists
                existing = db.query(Sender).filter(Sender.sender_id == s_id).first()
                if not existing:
                    total = stats.get("total", 0)
                    spam = stats.get("spam_count", 0)
                    rate = spam / total if total > 0 else 0
                    score = (1 - rate) * 100
                    
                    sender = Sender(
                        sender_id=s_id,
                        total_messages=total,
                        spam_count=spam,
                        score=score,
                        status="Safe" if score > 70 else ("Suspicious" if score > 40 else "Malicious")
                    )
                    db.add(sender)
                    db.flush()  # Force sender ID to be recognized for foreign keys
                    
                    # Add messages
                    for msg in stats.get("messages", []):
                        db.add(Message(sender_id=s_id, message_text=msg, is_spam="money" in msg.lower()))
    
    if os.path.exists(dataset_path):
        with open(dataset_path, "r") as f:
            dataset = json.load(f)
            for s in dataset:
                s_id = s.get("sender_id")
                existing = db.query(Sender).filter(Sender.sender_id == s_id).first()
                if not existing:
                    sender = Sender(
                        sender_id=s_id,
                        total_messages=s.get("total", 0),
                        spam_count=int(s.get("spam_rate", 0) * s.get("total", 0)),
                        score=s.get("score", 0),
                        status=s.get("status", "Unknown")
                    )
                    db.add(sender)
    
    db.commit()
    db.close()
    print("Migration complete.")

if __name__ == "__main__":
    migrate()
