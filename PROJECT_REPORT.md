# Interovo AI Project Report

## Project Summary

Interovo AI is an AI-powered interview skill evaluation platform built with a MERN-style stack:

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Recharts
- Backend: Node.js, Express, MongoDB, Mongoose, JWT auth
- AI layer: Google Gemini for question generation, answer evaluation, resume-based interviews, and roadmap generation

The product idea is strong for placement portfolios because it solves a clear student problem: mock interview practice with feedback, analytics, and personalized improvement plans.

## Current Feature Set

- User registration and login with JWT authentication
- Protected dashboard and interview routes
- Role and difficulty based interview generation
- Custom interview generation by domain, topics, question count, difficulty, and instructions
- Resume-based interview flow intended through PDF upload
- Answer evaluation with score, strengths, weaknesses, and improved answer
- Analytics dashboard with overview, score trend, weakness breakdown, and strength breakdown
- Personalized roadmap generation based on weak areas
- Voice input support through browser speech recognition

## Strengths

- The project has a good real-world use case and is easy to explain in interviews.
- Backend and frontend are separated cleanly.
- Authentication, protected routes, database models, AI prompts, and charts show full-stack thinking.
- The AI features are more meaningful than a basic CRUD app.
- The domain coverage is broad: MERN, CS, AI/ML, core engineering branches, robotics, and management.
- The dashboard and roadmap ideas make the app feel outcome-oriented, not just question-answer based.

## Major Issues To Fix

1. Resume interview will fail.
   - `server/controller/interviewController.js` calls `extractJson(rawText)` but no `extractJson` function exists.
   - `ai_engine/services/resume_parse.js` imports `pdf-parse`, but `pdf-parse` is not listed in `server/package.json`.
   - `server/routes/interview_route.js` imports `multer`, but `multer` is not listed in `server/package.json`.

2. Roadmap dashboard API does not match the server.
   - Frontend calls `GET /roadmap/:sessionId` from `client/IntrovoAI/src/services/roadmap_api.js`.
   - Backend only defines `POST /roadmap/:sessionId` in `server/routes/roadmap_route.js`.
   - Result: dashboard roadmap loading will fail unless this is changed.

3. Interview status is not stored correctly.
   - `completeInterview` updates `status: "completed"`.
   - `getMyInterviewSessions` selects `status`.
   - But `server/models/interview_model.js` has no `status` field.

4. Environment configuration is incomplete.
   - Backend uses env variables, but there is no `.env.example`.
   - Frontend API URL is hardcoded as `http://localhost:5000/api`.
   - This makes deployment and review harder.

5. Input validation is weak.
   - Register/login do not validate required fields, email format, or password length.
   - Interview creation accepts raw role, topics, question count, and instructions without strict validation.
   - Resume upload has no file size/type validation beyond frontend accept hint.

6. Security needs polish.
   - JWT is stored in localStorage, which is common for student projects but less secure than httpOnly cookies.
   - CORS allows all origins.
   - Logs expose tokens in the browser console.
   - AI responses are logged in the backend.

7. Project documentation is missing.
   - Root `Readme.md` is empty.
   - There are no screenshots, setup instructions, architecture notes, demo flow, API docs, or deployment notes.

8. Tests are missing.
   - Backend `test` script is a placeholder.
   - There are no API tests, component tests, or integration tests.

## Code Quality Observations

- There are naming and spelling mistakes such as `anaytics_controller.js`, `analyticalContoller`, `strenght-breakdown`, `VoiceRecoder.jsx`, and `Serever`.
- Some imports are unused, for example duplicate React imports in `main.jsx` and unused imports in auth pages.
- Error messages are mostly generic, which makes debugging and user experience weaker.
- AI JSON parsing is fragile. The app assumes Gemini will always return valid JSON in the expected shape.
- `roadmap_model.js` uses `require: true` instead of `required: true` for `userId`.
- `question_model.js` and `resume_model.js` exist but are not meaningfully integrated into the current flow.

## Placement Readiness Rating

Current rating: 6.5/10

This is above a basic project because it has full-stack architecture, authentication, AI integration, charts, resume upload intent, and personalized roadmap logic. For campus placements or fresher interviews, it is a good project idea and can become a strong resume project.

However, it is not yet fully demo-ready. A recruiter or interviewer may ask you to run it, explain the API flow, upload a resume, generate a roadmap, or discuss deployment. The current bugs, missing env example, empty README, and missing tests will reduce confidence.

After fixing the major issues and adding documentation, deployment, and screenshots, this can become a 8/10 to 8.5/10 placement project.

## What To Improve First

Priority 1:
- Add missing dependencies: `multer` and `pdf-parse`.
- Fix `extractJson` in resume interview flow.
- Add `status` to the interview schema.
- Align roadmap API method between frontend and backend.
- Move frontend API base URL into `VITE_API_BASE_URL`.
- Create `.env.example`.

Priority 2:
- Add backend validation with a library like Zod or Joi.
- Add auth middleware ownership checks so users cannot access another user's sessions by ID.
- Add better error states in the frontend instead of only alerts.
- Improve AI response parsing and fallback handling.
- Add loading states for interview start, resume upload, and custom interview generation.

Priority 3:
- Write a strong README with screenshots, setup, architecture, API routes, and demo credentials.
- Add backend API tests for auth, interview, analytics, and roadmap endpoints.
- Deploy frontend and backend.
- Add a short demo video or GIF.

## Recommended `.env` Files

### Backend `.env`

Create this in:

`server/.env`

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database-name>

JWT_SECRET=<long-random-secret>
JWT_EXPIRE=7d

GEMINI_API_KEY=<your-gemini-api-key>

CORS_ORIGIN=http://localhost:5173
```

Optional backend variables:

```env
GEMINI_MODEL=gemini-2.5-flash
MAX_RESUME_FILE_SIZE_MB=5
LOG_LEVEL=debug
```

Only add this if you actually use OpenAI later:

```env
OPENAI_API_KEY=<your-openai-api-key>
```

### Frontend `.env`

Create this in:

`client/IntrovoAI/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For deployment, change it to your deployed backend URL:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

Important: never put secret keys such as `JWT_SECRET`, `GEMINI_API_KEY`, `MONGO_URI`, or `OPENAI_API_KEY` in the frontend `.env`. Any `VITE_` variable is exposed to the browser.

## Suggested README Sections

- Project name and one-line summary
- Problem statement
- Features
- Tech stack
- Architecture diagram
- Screenshots
- Local setup instructions
- Environment variable setup
- API route list
- Database models overview
- AI prompt flow
- Known limitations
- Future improvements
- Deployment links

## Final Verdict

This is a strong project idea with a good technical foundation. It is not just another CRUD app, and the AI plus analytics angle can make it stand out in placements. To make it placement-ready, focus less on adding new features and more on making the existing flows reliable, documented, secure, and easy to demo.
