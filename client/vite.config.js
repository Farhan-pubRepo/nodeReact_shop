import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Babel for Fast Refresh

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Use Babel for Fast Refresh
  ],
});
