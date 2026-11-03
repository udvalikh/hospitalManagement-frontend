import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// The API is called directly at VITE_REMOTE_API (see .env); the backend allows
// http://localhost:3000 through CORS, so no dev proxy is needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
});
