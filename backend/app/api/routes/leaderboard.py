from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.leaderboard_service import get_leaderboard
from app.api.deps import get_current_user

router = APIRouter()

# LEADERBOARD ROUTES
@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return get_leaderboard(db)