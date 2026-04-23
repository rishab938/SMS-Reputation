from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.sender_service import get_sender_data
from app.api.deps import get_current_user

router = APIRouter()

# SENDER ROUTES
@router.get("/sender/{sender_id}")
def get_sender(sender_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    data = get_sender_data(db, sender_id)
    if not data:
        raise HTTPException(status_code=404, detail="Sender not found")
    return data