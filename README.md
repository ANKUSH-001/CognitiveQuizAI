
# Cognitive Quiz AI

Cognitive Quiz AI is an AI-powered web application designed to enhance learning outcomes through intelligent, personalized quizzes and performance analytics. Unlike traditional systems that restrict users to predefined topics, this platform allows learners to attempt quizzes on any subject, with real-time feedback and adaptive AI analysis.

## Key Features

### 1. **Open-Topic Quiz System**
Users can generate and attempt quizzes on any topic of their choice—removing limitations of static course-based platforms.

### 2. **AI Feedback System**
- **Per-Quiz AI Review:** After each quiz, users receive AI-generated feedback tailored to their answers, strengths, and weaknesses.
- **Overall Performance Review:** Personalized analytics summarizing learning progress over time.

### 3. **Topic-Wise Strength and Weakness Mapping**
After multiple quizzes, the platform intelligently identifies and highlights:
- Strong topics (where users consistently perform well)
- Weak areas (where improvement is needed)

### 4. **Adaptive Learning AI Implementation**
Using OpenAI LLM powered intelligence, the system adapts quiz difficulty based on prior performance and ensures concept reinforcement through:
- Smart question generation
- AI-generated feedback
- Visual analytics via a performance dashboard

## Tech Stack

| Area       | Technology               |
|------------|--------------------------|
| Frontend   | React.js, Tailwind CSS   |
| Backend    | Node.js, Express.js      |
| Database   | MongoDB                  |
| Charts     | Recharts (for analytics) |
| AI Engine  | OpenAI API               |
| Auth       | JWT, bcrypt              |

---

## Installation & Setup Guide

### Prerequisites
- Node.js (v16+)
- MongoDB installed and running
- OpenAI API key 
- Git installed

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/cognitive-quiz-ai.git
cd cognitive-quiz-ai
```

---

### Step 2: Backend Setup
```bash
cd backend
npm install
```

#### Create a `.env` file in `/backend` and add:
```
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
PORT=5000
```

#### Start the backend server:
```bash
npm start
```

---

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

This will start the React app on `http://localhost:3000`

---

## API Overview

### Key Endpoints:
- `POST /api/register` – User registration
- `POST /api/login` – User authentication
- `POST /api/generate-quiz` – Generate quiz from user topic
- `POST /api/submit-quiz` – Submit answers for review
- `GET /api/performance/:userId` – Fetch performance data
- `GET /api/feedback/:quizId` – Get AI feedback

---

## Future Enhancements
- Mobile App (React Native)
- Smarter dashboards with AI-generated study plans
- user's uploading study material to give quiz on

---

## Contributors
- Ritesh (https://github.com/riteshkoranga)- Frontend & Backend & API Integration
- Ankush (https://github.com/ANKUSH-001)- Frontend & Adaptive AI Logic

---

## License
This project is for educational and academic purposes.

