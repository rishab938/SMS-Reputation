from sqlalchemy.orm import Session
from app.models.db_models import Sender, Message
from app.services.scoring_service import compute_score, get_status

def update_sender(db: Session, sender_id: str, message_text: str, is_spam: bool):
    """
    Update sender statistics and record the new message.
    """
    # FIND OR CREATE SENDER
    sender = db.query(Sender).filter(Sender.sender_id == sender_id).first()
    
    if not sender:
        sender = Sender(
            sender_id=sender_id, 
            total_messages=0, 
            spam_count=0, 
            score=100.0, 
            status="Safe"
        )
        db.add(sender)
        db.flush() # Ensure sender exists before adding message (FK constraint)
    
    # RECORD MESSAGE
    new_message = Message(
        sender_id=sender_id,
        message_text=message_text,
        is_spam=is_spam
    )
    db.add(new_message)
    
    # UPDATE ANALYTICS
    sender.total_messages += 1
    if is_spam:
        sender.spam_count += 1
    
    spam_rate = sender.spam_count / sender.total_messages if sender.total_messages > 0 else 0
    sender.score = compute_score(spam_rate)
    sender.status = get_status(sender.score)
    
    db.commit()
    db.refresh(sender)
    return sender

def get_sender_data(db: Session, sender_id: str):
    sender = db.query(Sender).filter(Sender.sender_id == sender_id).first()
    
    if not sender:
        return {
            "sender_id": sender_id,
            "spam_rate": 0,
            "link_density": 0,
            "avg_length": 0,
            "volume": 0,
            "score": 100,
            "status": "Safe"
        }
    
    # Get messages for additional metrics
    messages = db.query(Message).filter(Message.sender_id == sender_id).all()
    
    total = sender.total_messages
    spam_rate = sender.spam_count / total if total > 0 else 0
    avg_length = sum(len(m.message_text) for m in messages) / total if total > 0 else 0
    link_count = sum(1 for m in messages if "http" in m.message_text)
    link_density = link_count / total if total > 0 else 0
    
    return {
        "sender_id": sender_id,
        "spam_rate": spam_rate,
        "link_density": link_density,
        "avg_length": avg_length,
        "volume": total,
        "score": sender.score,
        "status": sender.status,
        "history": [m.is_spam for m in messages]
    }