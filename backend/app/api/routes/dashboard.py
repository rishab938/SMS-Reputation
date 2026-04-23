from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.db.session import get_db
from app.models.db_models import Sender
from app.api.deps import get_current_user

router = APIRouter()

# DASHBOARD ROUTES
@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    total_senders = db.query(Sender).count()
    
    if total_senders == 0:
        return {
            "total_senders": 0,
            "average_score": 0,
            "alerts": 0
        }
        
    avg_score = db.query(func.avg(Sender.score)).scalar()
    alerts = db.query(Sender).filter(Sender.status == "Malicious").count()
    
    return {
        "total_senders": total_senders,
        "average_score": round(avg_score, 2) if avg_score else 0,
        "alerts": alerts
    }