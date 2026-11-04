# Azjargal Hospital - Frontend

React 19 + Vite + Tailwind CSS frontend for the Azjargal Hospital appointment system.
It talks to the Spring Boot API in `backendHospital`.

## Run it

1. Start the backend first (IntelliJ: run `Application.java`, API on http://localhost:9090).
2. Copy `.env.example` to `.env` (sets `VITE_REMOTE_API=http://localhost:9090`).
3. Install and start:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000. Keep port 3000 - the backend only allows CORS from 3000 and 5173.

Demo accounts (password `password`): `patient`, `drsmith`, `drlee`, `admin`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
src/
├── config/site.js        Hospital name, phone, address, hours (edit here)
├── context/              Auth state (login, register, logout, session restore via /me)
├── services/             API calls - api.js is the shared axios client (adds the JWT)
├── utils/format.js       Date/time formatting
└── components/
    ├── layout/           Navbar, Footer, Logo, Icon, PageLayout
    ├── HomePage.jsx      Public landing page
    ├── LoginPage.jsx / RegisterPage.jsx
    ├── Dashboard.jsx     Picks the dashboard for the user's role
    ├── PatientDashboard.jsx, BookAppointment.jsx
    ├── DoctorDashboard.jsx
    └── DoctorList.jsx    Admin view
```
