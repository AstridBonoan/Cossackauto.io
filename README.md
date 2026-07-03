# COSSACK AUTO — Frontend (React + Vite + Tailwind)

This repository contains the frontend for the COSSACK AUTO site (React + Vite + Tailwind). The reservation form is implemented and there's a small Express backend planned for secure Supabase/Resend integration (not included).

**Quick Start**

1. Install dependencies and run the dev server (from the `frontend` folder):

```bash
cd frontend
npm install
npm run dev
```

2. Open the app in your browser (Vite will print the local URL).

**Build**

```bash
cd frontend
npm run build
```

**Important files & configuration**

- `frontend/src/config/contact.js` — configure `phone`, `sms`, `email`, and `stickyColor` used by the sticky contact bar.
- `frontend/src/styles/index.css` — global style overrides (sticky bar styling lives here).
- `frontend/src/components/StickyContact.jsx` — sticky contact UI component.
- `frontend/src/utils/stickyFooter.js` — logic that pins the sticky bar below the footer when you reach the page bottom.

**Backend / production notes**

- Do NOT put Supabase or Resend secrets in the frontend. Use a server (Express) endpoint to handle submissions and email sending.
- Environment variables you will likely need on the server:
  - `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
  - `RESEND_API_KEY` (server-side only)

**Repository
**
- I updated this repository with the current workspace snapshot. If you want me to add a deploy pipeline or a README extension (badges, license, CI), tell me which provider and I will add it.

If you want any adjustments to the README content or additional setup steps (Docker, GitHub Actions), tell me which and I'll add them.
# Cossack Auto — Local Dev

Folders:
- `frontend` — Vite + React + Tailwind app
- `backend` — Express API that stores reservations to Supabase and sends notifications via Resend

Quick start:

1. Create a Supabase project and run the SQL in `schema.sql` to create a `reservations` table.
2. Set env vars in `backend/.env` (see `.env.example`).
3. Install dependencies and run dev servers:

```powershell
cd frontend
npm install
npm run dev

cd ../backend
npm install
npm start
```

The frontend posts reservations to `http://localhost:4000/api/reservations`.
