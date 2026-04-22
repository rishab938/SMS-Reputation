from pydantic import BaseModel

class PredictResponse(BaseModel):
    prediction: str
    probability: float
    score: float
    status: str