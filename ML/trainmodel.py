import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
import joblib

# Load dataset (absolute path - reliable)
file_path = r"C:\Users\Rishab\OneDrive\Desktop\SMS\ML\data\SMSSpamCollection"

df = pd.read_csv(file_path, sep='\t', names=["label", "message"])

# Clean
df = df[['label', 'message']]
df['label'] = df['label'].map({'ham': 0, 'spam': 1})

# Split
X_train, X_test, y_train, y_test = train_test_split(
    df['message'], df['label'], test_size=0.2, random_state=42
)

# TF-IDF
tfidf = TfidfVectorizer(max_features=3000)
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

# Model
model = MultinomialNB()
model.fit(X_train_tfidf, y_train)

# Evaluate
y_pred = model.predict(X_test_tfidf)
print("Accuracy:", accuracy_score(y_test, y_pred))

# Ensure models folder exists
os.makedirs("models", exist_ok=True)

# Save model
joblib.dump(model, "models/spam_model.pkl")
joblib.dump(tfidf, "models/tfidf_vectorizer.pkl")