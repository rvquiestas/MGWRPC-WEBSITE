import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {port: 5174},
  define: {
    "process.env": {
      REACT_APP_VITE_BACKEND_URL: "localhost:4000",
    },
  },
})
