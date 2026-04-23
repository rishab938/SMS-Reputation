import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes import leaderboard, predict, sender, dashboard, auth
from backend.app.db.session import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)


app = FastAPI()

# CORS Configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(leaderboard.router, prefix="/api")
app.include_router(predict.router, prefix="/api")
app.include_router(sender.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(auth.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "SMS Reputation System API (Postgres Ready)"}