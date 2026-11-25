import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Local preview only: npm run dev. Publishing uses vite.pages.config.ts.
export default defineConfig({ plugins: [react()] });
