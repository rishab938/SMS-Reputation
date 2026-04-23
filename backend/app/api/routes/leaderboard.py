from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.services.leaderboard_service import get_leaderboard
from backend.app.api.deps import get_current_user

router = APIRouter()

# LEADERBOARD ROUTES
@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return get_leaderboard(db)