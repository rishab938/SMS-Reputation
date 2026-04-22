# Abyssal Intel - SMS Reputation System

A futuristic, high-performance SMS reputation and forensics dashboard. Analyze sender integrity, detect sophisticated spam patterns, and visualize global telemetry in real-time.

## 🚀 Features

- **Neural Scan**: Real-time SMS sentiment and reputation analysis using NLP.
- **Global Leaderboard**: Track the most frequent and high-risk senders globally.
- **Sender Intelligence**: Deep-dive forensics into specific sender IDs and their message history.
- **Adaptive UI**: Premium futuristic dashboard with Dark/Light mode support.
- **Secure Access**: JWT-based authentication for authorized personnel.
- **Serverless Backend**: Powered by FastAPI and Neon Serverless PostgreSQL.

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, Vite, Chart.js.
- **Backend**: FastAPI (Python), SQLAlchemy, PostgreSQL (Neon).
- **Styling**: Vanilla CSS with futuristic glassmorphic design.

## 📦 Installation & Setup

### Backend (Python)
1. Navigate to the `backend` folder.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your `.env` file with PostgreSQL connection string.
5. Start the API:
   ```bash
   python -m uvicorn backend.app.main:app --reload
   ```

### Frontend (React)
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 License
© 2026 Abyssal Intel. All rights reserved.
