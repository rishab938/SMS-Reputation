def compute_score(spam_rate: float) -> float:
    return (1 - spam_rate) * 100


def get_status(score: float) -> str:
    if score > 70:
        return "Safe"
    elif score > 40:
        return "Suspicious"
    return "Malicious"