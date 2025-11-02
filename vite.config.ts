import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import paths from 'vite-tsconfig-paths'

export default defineConfig({
    server: {
        port: 3000,
        host: 'localhost',
        open: true,
    },
    plugins: [solid(), paths(), tailwind()],
    preview: {
        port: 3000,
        host: 'localhost',
        open: true,
    },
})
