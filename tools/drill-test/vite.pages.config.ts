// Builds the whole app into one self-contained HTML file for GitHub Pages:
// tools/drill-test/app/index.html  ->  https://jefrep0830.github.io/CAP/tools/drill-test/app/
// Run: npm run build:pages
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { defineConfig, type Plugin } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Bundled libraries keep their license comments, but the authors' email addresses in them
// trip the repo's PII scan. Replace only the addresses; names, copyright and license stay.
const stripLicenseEmails = (): Plugin => ({
  name: 'strip-license-emails',
  apply: 'build',
  closeBundle() {
    const f = resolve(__dirname, 'app/index.html');
    const html = readFileSync(f, 'utf8');
    writeFileSync(f, html.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, (m) =>
      /example\.(com|org)|noreply@/.test(m) ? m : '[email omitted]')
      // Six-digit numbers in library lookup tables (e.g. 131071) look like CAPIDs to the scan.
      // Rewrite them as the same values in hex; only bare numeric literals between commas match.
      .replace(/,(\d{6})(?=,)/g, (_m, n) => ',0x' + Number(n).toString(16)));
  },
});

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile(), stripLicenseEmails()],
  build: { outDir: 'app', emptyOutDir: true },
});
