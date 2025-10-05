import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const base = process.env.NODE_ENV === "production" ? "/tgtasker/" : "/"

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
