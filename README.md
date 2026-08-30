# Resume Analyzer

A local full-stack web app where a user uploads a resume and a job description, and an LLM returns a fitment score and recommendations. See [AGENTS.md](./AGENTS.md) for tech stack and conventions.

This initial version wires up the full stack end-to-end with a single smoke-test endpoint (`/api/ping-gemini`) that confirms frontend → backend → Gemini API connectivity, before any real feature work begins.

## Local Development

### Backend

```bash
cd backend
python -m venv venv
./venv/Scripts/activate   # Windows; use `source venv/bin/activate` on macOS/Linux
pip install -r requirements.txt
cp .env.example .env      # then fill in GEMINI_API_KEY
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`. Click "Ping Gemini" to confirm the full stack is wired correctly.
