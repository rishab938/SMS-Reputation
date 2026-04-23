from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.session import get_db
from app.services.sender_service import update_sender
from app.api.deps import get_current_user

# Mock model or real import if available
# from app.ml.model import predict_sms

router = APIRouter()

class PredictRequest(BaseModel):
    sender_id: str
    message: str

# PREDICTION ROUTES
@router.post("/predict")
def predict(request: PredictRequest, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    """
    Analyze a message and update sender reputation.
    """
    # ANALYZE MESSAGE CONTENT
    is_spam = "win money" in request.message.lower() or "http" in request.message.lower()
    
    # UPDATE SENDER TELEMETRY
    sender = update_sender(db, request.sender_id, request.message, is_spam)
    
    return {
        "sender_id": sender.sender_id,
        "prediction": "spam" if is_spam else "ham",
        "score": sender.score,
        "status": sender.status
    }