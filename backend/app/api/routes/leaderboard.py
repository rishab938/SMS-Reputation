from fastapi import APIRouter
from backend.app.services.leaderboard_service import get_leaderboard

router = APIRouter()

@router.get("/leaderboard")
def leaderboard():
    return get_leaderboard()