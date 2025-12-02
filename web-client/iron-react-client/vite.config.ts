import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],
  resolve: {
    alias: {
      // Alias for importing the RDP backend module directly from dist folder
      // This avoids Vite's restriction on importing JS from /public
      'iron-remote-desktop-rdp': path.resolve(__dirname, '../iron-remote-desktop-rdp/dist/iron-remote-desktop-rdp.js'),
    }
  },
  optimizeDeps: {
    exclude: ['@devolutions/iron-remote-desktop-rdp', 'iron-remote-desktop-rdp']
  },
  server: {
    fs: {
      // Allow serving files from parent directories (for iron-remote-desktop-rdp)
      allow: ['..']
    }
  }
})
