from sqlalchemy.orm import Session
from app.models.db_models import Sender

def get_leaderboard(db: Session):
    # Fetch all senders ordered by score descending
    senders = db.query(Sender).order_by(Sender.score.desc()).all()
    
    leaderboard_data = []
    for i, s in enumerate(senders):
        leaderboard_data.append({
            "rank": i + 1,
            "sender_id": s.sender_id,
            "score": s.score,
            "status": s.status,
            "total_messages": s.total_messages
        })
        
    return leaderboard_data