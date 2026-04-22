from backend.app.services.storage_service import load_data, save_data
from backend.app.services.scoring_service import compute_score, get_status


def update_sender(sender_id: str, message: str, is_spam: bool):
    data = load_data()

    if sender_id not in data:
        data[sender_id] = {
            "messages": [],
            "spam_count": 0,
            "total": 0
        }

    sender = data[sender_id]

    # Update stats
    sender["messages"].append(message)
    sender["total"] += 1

    if is_spam:
        sender["spam_count"] += 1

    save_data(data)


def get_sender_data(sender_id: str):
    data = load_data()

    if sender_id not in data:
        return {
            "sender_id": sender_id,
            "spam_rate": 0,
            "link_density": 0,
            "avg_length": 0,
            "volume": 0,
            "score": 100,
            "status": "Safe"
        }

    sender = data[sender_id]

    total = sender["total"]
    spam_count = sender["spam_count"]

    spam_rate = spam_count / total if total > 0 else 0

    # Compute avg length
    messages = sender["messages"]
    avg_length = sum(len(m) for m in messages) / total if total > 0 else 0

    # Simple link density
    link_count = sum(1 for m in messages if "http" in m)
    link_density = link_count / total if total > 0 else 0

    score = compute_score(spam_rate)
    status = get_status(score)

    return {
        "sender_id": sender_id,
        "spam_rate": spam_rate,
        "link_density": link_density,
        "avg_length": avg_length,
        "volume": total,
        "score": score,
        "status": status
    }