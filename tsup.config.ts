import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom'],
  outExtension: ({ format }) =>
    format === 'esm' ? { js: '.esm.js' } : { js: '.cjs' },
})
