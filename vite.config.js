// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

const port = 5173; // Standard Vite-port

export default defineConfig({
  // Definer inngangspunktet for applikasjonen din
  build: {
    // Mappen hvor de kompilerte filene skal havne. MÅ være 'assets'.
    outDir: 'assets',
    // Viktig: Ikke slett eksisterende filer i assets-mappen
    emptyOutDir: false,
    // Konfigurasjon for Rollup (som Vite bruker)
    rollupOptions: {
      input: {
        // Definerer din hoved-JS-fil som inngangspunkt
        main: 'frontend/main.js' 
      },
      output: {
        // Sørger for statiske filnavn, som er enklere å håndtere manuelt
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },

  // Konfigurasjon for utviklingsserveren
  server: {
    // Gjør serveren tilgjengelig over nettverket. Nødvendig for Shopify CLI.
    host: true,
    port: port,
    // Aktiver Hot Module Replacement (HMR)
    hmr: {
      host: 'localhost',
    },
  },

  // Stialiaser fra din jsconfig.json
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend'),
      '~': path.resolve(__dirname, 'frontend'),
    },
  },
});
