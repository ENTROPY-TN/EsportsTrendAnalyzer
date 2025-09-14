# HypeHunter: Real-Time Esports Analytics & Trend Prediction  

<p align="center">
  <img src="logo111.png" alt="HypeHunter" width="400"/>
</p>

**Motto:** *"Catch the Trends, Grow Your Audience"*  

HypeHunter is a cutting-edge, subscription-based analytics platform that empowers streamers, game developers, and marketing agencies with real-time insights into the gaming landscape. We transform the chaotic firehose of social media and community discussions into structured, predictive data, helping you discover the next big thing before it goes viral.  

---
## LIVE DEMO:
URL: https://www.canva.com/design/DAGy8jRaY3c/nxivgw3UMGnrJPOOjYlc4w/watch?utm_content=DAGy8jRaY3c&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h74df25eef2



## Table of Contents
- [Features](#-features)  
- [High-Level Architecture](#-high-level-architecture)  
- [Tech Stack](#️-tech-stack)  
- [Project Structure](#-project-structure)  
- [Installation & Setup](#️-installation--setup)  
- [Usage](#-usage)  
- [API Endpoints](#-api-endpoints)  
- [Non-Functional Requirements (NFRs)](#-non-functional-requirements-nfrs)
- [License](#-license)  
- [Contact](#-contact)  

---

## HypeHunter Features 

## Features
### 1. Predict Future Trends
Get data-driven insights into which games are likely to trend next. Stay ahead of the curve and discover upcoming hits before everyone else.

### 2. Objective Community Review Scores
See unbiased "HypeScores" based on real player discussions, not just critic reviews. Make decisions based on authentic community feedback.

### 3. Real-Time Community Insights
Instantly understand what people are thinking and how they are behaving towards games online. Monitor trends and gauge community sentiment in real time.

---

## 🏢 High-Level Architecture
HypeHunter is built on a robust, event-driven architecture designed for scalability and real-time data processing.  

**Data Flow:**  
1. **Ingestion:** PRAW agents pull external data → Kafka topics.  
2. **Stream Processing:** Clean & detect language → Kafka.  
3. **AI Analysis:** LangChain + Google Generative AI summarize & score sentiment.  
4. **Scoring & Storage:** Proprietary HypeScore → MongoDB persistence.  
5. **Client Delivery:** FastAPI serves REST & WebSocket → React frontend.  
![img.png](img.png)

---![img_2.png](img_2.png)

## 🛠️ Tech Stack
| Layer            | Technology |
|------------------|------------|
| **Data Ingestion** | praw, requests, aiohttp, faust |
| **Message Broker** | confluent-kafka / kafka-python, Apache Kafka |
| **AI & Processing** | google-generativeai, langchain, langchain-google-genai, langchain-core, langdetect |
| **Backend (API)** | fastapi, uvicorn[standard], pydantic, python-multipart, websockets |
| **Database** | pymongo, MongoDB |
| **Frontend** | React, WebSocket Client |
| **Deployment** | Docker, Kubernetes, dotenv |

---

![img_1.png](img_1.png)

## 📦 Project Structure
```text
hypehunter/
├── backend/                 # FastAPI Application
│   ├── agents/             # Kafka Faust Agents (Ingestion, AI, Scoring)
│   ├── api/                # FastAPI routers and endpoints
│   ├── core/               # Config, security, database models
│   ├── models/             # MongoDB data models
│   ├── services/           # Business logic
│   └── main.py             # FastAPI entry point
├── frontend/               # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── Dockerfile
├── infrastructure/         # Docker, Kubernetes, Terraform
├── scripts/                # Utility scripts
├── .env.example            # Environment variables template
└── README.md

```
## ⚙️ Installation & Setup

### Prerequisites
- Python **3.10+**
- Node.js **16+**
- Docker & Docker Compose
- MongoDB Atlas URI
- Google Gemini API Key
- Reddit API Credentials

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/hypehunter.git
cd hypehunter

## 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
# On macOS/Linux
source venv/bin/activate
# On Windows
# .\venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
```

### Run Kafka locally (if not using Confluent Cloud)
```bash
docker-compose -f ../infrastructure/kafka-compose.yml up -d
```

### Start Backend Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```



### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Copy and configure API URL
cp .env.example .env.local
npm start
```

## 🚦 Usage

- **Landing Page:** Learn about features & pricing.  
- **Sign Up/In:** Create an account and choose a subscription plan.  
- **Dashboard:** View real-time trending games.  
- **Game Detail:** See AI-generated community summaries and the daily *HypeScore*.  
- **Live Updates:** Dashboard auto-refreshes via WebSocket for real-time data.


## 🧭 Frontend Routes

The application uses **React Router** to handle navigation between pages.

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `LandingPage` | Default landing page showing features & pricing. |
| `/auth` | `AuthPage` | User authentication page for sign up / login. |
| `/feed` | `FeedPage` | Main dashboard showing trending games. |
| `/game/:gameName` | `GameDetailPage` | Detailed view for a specific game, including AI summaries and HypeScore. |




## 📄 License

This project is **proprietary** and the intellectual property of **HypeHunter Inc.**  
See [LICENSE](LICENSE) for details.

---

## 📞 Contact

**HypeHunter Inc.**  
- 🌐 Website: [https://hypehunter.com](https://hypehunter.com)  
- 📧 Email: info@hypehunter.com  
- 🐦 Twitter: [@HypeHunterApp](https://twitter.com/HypeHunterApp)
