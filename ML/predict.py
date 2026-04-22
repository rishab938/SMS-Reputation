import sys
import joblib
import os
import pandas as pd
import numpy as np
import re

# Paths
base_dir = os.path.dirname(__file__)

try:
    model = joblib.load(os.path.join(base_dir, "models", "spam_model.pkl"))
    tfidf = joblib.load(os.path.join(base_dir, "models", "tfidf_vectorizer.pkl"))
except FileNotFoundError:
    print("Warning: Model files not found. Returning mock predictions.")
    model = None
    tfidf = None


# Prediction function
def predict_message(message):
    if model is None or tfidf is None:
        import random
        return {
            "prediction": random.choice(["spam", "ham"]),
            "probability": round(random.uniform(0.1, 0.9), 2)
        }

    msg_df = pd.DataFrame([message], columns=['message'])

    # Feature Engineering (same as training)
    msg_df['message_length'] = msg_df['message'].apply(len)
    msg_df['word_count'] = msg_df['message'].apply(lambda x: len(x.split()))

    def uppercase_ratio(text):
        total = len(text)
        upper = sum(1 for c in text if c.isupper())
        return upper / total if total > 0 else 0

    msg_df['uppercase_ratio'] = msg_df['message'].apply(uppercase_ratio)

    msg_df['has_link'] = msg_df['message'].apply(
        lambda x: 1 if "http" in x or "www" in x else 0
    )

    msg_df['digit_count'] = msg_df['message'].apply(
        lambda x: sum(c.isdigit() for c in x)
    )

    msg_df['special_char_count'] = msg_df['message'].apply(
        lambda x: len(re.findall(r'[^a-zA-Z0-9\s]', x))
    )

    spam_keywords = ['free', 'win', 'offer', 'click', 'buy', 'urgent', 'prize']

    msg_df['keyword_flag'] = msg_df['message'].apply(
        lambda x: 1 if any(word in x.lower() for word in spam_keywords) else 0
    )

    # TF-IDF vectorization
    text_features = tfidf.transform(msg_df['message']).toarray()

    numeric_features = msg_df[['message_length', 'word_count', 'uppercase_ratio',
                              'has_link', 'digit_count', 'special_char_count', 'keyword_flag']].values

    final_input = np.hstack((text_features, numeric_features))

    # Model Prediction
    prob = model.predict_proba(final_input)[0][1]
    pred = model.predict(final_input)[0]

    label = "spam" if pred == 1 else "ham"

    # Return predictions
    return {
        "prediction": label,
        "probability": float(prob)
    }


# CLI testing
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Provide message. Example: python predict.py 'Your message'")
        sys.exit()

    message = sys.argv[1]
    result = predict_message(message)
    print(f"Prediction: {result['prediction']}, Probability: {result['probability']:.2f}")