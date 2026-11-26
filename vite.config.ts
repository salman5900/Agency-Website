import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  base:
    process.env.VITE_BASE_PATH ??
    (mode === 'production' ? '/Agency-Website/' : '/'),
  plugins: [react(), tailwindcss()],
}));
