# Frontend (Vite + React)

This is a minimal Vite + React scaffold for the auth demo.

Quick start:

1. cd frontend
2. npm install
3. npm run dev

The dev server runs at http://localhost:5173 by default. The React app sends requests to the backend at `/api/*` (same host). Ensure your backend is running at http://localhost:3000.

Files:

- `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/pages/Welcome.jsx` - minimal pages.
- `vite.config.js` - Vite config with React plugin.

Notes:

- CORS: This setup expects the API to be on the same host (served from backend). If you run frontend separately (port 5173), you may need to enable CORS on the backend or configure a proxy.
