import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: ['um350', 'um350.tail8b0118.ts.net'],
      },
      plugins: [tailwindcss(), react()],
      // react-helmet-async is CommonJS and fails on named imports from Node during prerender, so bundle it
      ssr: {
        noExternal: ['react-helmet-async'],
      },
      // SECURITY: API keys should NOT be exposed to the frontend bundle.
      // Use VITE_ prefix only for public, non-sensitive values.
      // GEMINI_API_KEY should be used server-side only (e.g., Netlify Functions / Vercel API Routes).
      envPrefix: 'VITE_',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
