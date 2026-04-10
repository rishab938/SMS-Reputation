import sys
import joblib
import os

# Get base directory
base_dir = os.path.dirname(__file__)

# Load model and vectorizer
model = joblib.load(os.path.join(base_dir, "models", "spam_model.pkl"))
tfidf = joblib.load(os.path.join(base_dir, "models", "tfidf_vectorizer.pkl"))

# Input message
message = sys.argv[1]

# Transform
X = tfidf.transform([message])

# Predict
prediction = model.predict(X)[0]
prob = max(model.predict_proba(X)[0])

# Convert label
label = "spam" if prediction == 1 else "ham"

# Output
print(f"{label}|{prob}")