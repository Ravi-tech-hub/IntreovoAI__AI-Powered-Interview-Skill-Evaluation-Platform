# IntervoAI

IntervoAI is an AI-powered interview skill evaluation platform for placement preparation. It helps candidates generate mock interviews, submit answers, receive AI feedback, track performance analytics, and create a personalized learning roadmap from weak areas.

## Features

- JWT-based user registration and login
- Protected dashboard and interview workspace
- Role-based interview generation
- Resume-based interview generation from PDF resumes
- Custom interview generation by domain, topics, difficulty, and question count
- AI answer evaluation with score, strengths, weaknesses, and improved answer
- Voice input support through browser speech recognition
- Analytics dashboard for score trend, strengths, and weaknesses
- Personalized roadmap generation from evaluated weak areas

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Recharts
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- AI: Google Gemini

## Project Structure

```text
ai_engine/
  prompts/       AI prompt builders
  services/      AI generation, evaluation, PDF parsing

server/
  controller/    Express route controllers
  middleware/    Auth middleware
  models/        Mongoose models
  routes/        API routes
  src/config/    DB, JWT, Gemini config

client/IntrovoAI/
  src/           React app source
```

## Environment Setup

Backend environment file:

```text
server/.env
```

Use `server/.env.example` as reference.

Frontend environment file:

```text
client/IntrovoAI/.env
```

Use `client/IntrovoAI/.env.example` as reference.

Never put backend secrets such as `JWT_SECRET`, `MONGO_URL`, or `GEMINI_API_KEY` in the frontend `.env`.

## Local Development

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client/IntrovoAI
npm install
npm run dev
```

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/interview/start`
- `POST /api/interview/resume`
- `POST /api/interview/custom`
- `GET /api/interview/my-sessions`
- `GET /api/interview/:id`
- `POST /api/interview/:id/answer`
- `POST /api/interview/:id/complete`
- `GET /api/analytics/overview`
- `GET /api/analytics/score-trend`
- `GET /api/analytics/weakness-breakdown`
- `GET /api/analytics/strength-breakdown`
- `GET /api/roadmap/:sessionId`
- `POST /api/roadmap/:sessionId`

## Notes

This project is designed as a placement-level full-stack AI project. The strongest demo flow is: register, start a custom interview, answer questions, review feedback, open dashboard analytics, then generate a roadmap.
