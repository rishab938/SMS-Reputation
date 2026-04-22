from pydantic import BaseModel

class PredictRequest(BaseModel):
    message: str
    sender_id: str