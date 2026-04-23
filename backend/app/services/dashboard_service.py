from app.services.storage_service import load_data
from app.services.sender_service import get_sender_data

def get_dashboard_data():
    data = load_data()

    if not data:
        return {
            "total_senders": 0,
            "average_score": 0,
            "alerts": []
        }

    results = [get_sender_data(s) for s in data.keys()]

    total = len(results)
    avg_score = sum(r["score"] for r in results) / total

    alerts = [r for r in results if r["status"] != "Safe"]

    return {
        "total_senders": total,
        "average_score": avg_score,
        "alerts": alerts
    }