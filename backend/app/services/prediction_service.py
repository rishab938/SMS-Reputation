from ml.predict import predict_message


def run_prediction(message: str):
    result = predict_message(message)

    prob = float(result["probability"])

    # 🔥 BETTER THRESHOLD LOGIC
    if prob >= 0.75:
        prediction = "spam"
    else:
        prediction = "ham"

    return {
        "prediction": prediction,
        "probability": prob
    }