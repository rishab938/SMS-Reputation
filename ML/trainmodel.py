import pandas as pd
import numpy as np
import os
import re
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


# Load dataset
df = pd.read_csv("data/enron1.csv")


# Basic cleaning
df = df.drop_duplicates()
df['message'] = df['message'].astype(str).str.strip()

# Label encoding
df['label_num'] = df['label'].map({'ham': 0, 'spam': 1})


# Feature Engineering
df['message_length'] = df['message'].apply(len)
df['word_count'] = df['message'].apply(lambda x: len(x.split()))

def uppercase_ratio(text):
    total = len(text)
    upper = sum(1 for c in text if c.isupper())
    return upper / total if total > 0 else 0

df['uppercase_ratio'] = df['message'].apply(uppercase_ratio)

df['has_link'] = df['message'].apply(
    lambda x: 1 if "http" in x or "www" in x else 0
)

df['digit_count'] = df['message'].apply(
    lambda x: sum(c.isdigit() for c in x)
)

df['special_char_count'] = df['message'].apply(
    lambda x: len(re.findall(r'[^a-zA-Z0-9\s]', x))
)

spam_keywords = ['free', 'win', 'offer', 'click', 'buy', 'urgent', 'prize']

df['keyword_flag'] = df['message'].apply(
    lambda x: 1 if any(word in x.lower() for word in spam_keywords) else 0
)


# TF-IDF vectorization
tfidf = TfidfVectorizer(max_features=3000)
X_text = tfidf.fit_transform(df['message'])


# Combine features
X_numeric = df[['message_length', 'word_count', 'uppercase_ratio',
                'has_link', 'digit_count', 'special_char_count', 'keyword_flag']]

X = np.hstack((X_text.toarray(), X_numeric.values))
y = df['label_num']


# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


# Evaluate model
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))


# Save model
os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/spam_model.pkl")
joblib.dump(tfidf, "models/tfidf_vectorizer.pkl")