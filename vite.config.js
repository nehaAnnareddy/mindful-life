import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'; // Correct way to import

export default defineConfig({
  plugins: [svelte()],
});
