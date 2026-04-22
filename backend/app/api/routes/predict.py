from fastapi import APIRouter
from backend.app.models.request_models import PredictRequest
from backend.app.services.prediction_service import run_prediction
from backend.app.services.sender_service import get_sender_data, update_sender

router = APIRouter()

@router.post("/predict")
def predict(data: PredictRequest):
    pred = run_prediction(data.message)

    is_spam = pred["prediction"] == "spam"

    update_sender(data.sender_id, data.message, is_spam)
    sender = get_sender_data(data.sender_id)

    return {
        "prediction": pred["prediction"],
        "probability": round(pred["probability"], 2),
        "score": sender["score"],
        "status": sender["status"]
    }