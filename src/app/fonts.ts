import localFont from "next/font/local";

// Brand typography (see "Typography" in CLAUDE.md): Roboto is the primary face and
// IBM Plex Mono the secondary one (labels, micro-copy, Tailwind's font-mono).
// Exposed as CSS variables; globals.css and tailwind.config.ts read them.
//
// The files are vendored in ./fonts (latin subset, from @fontsource 5.3.0, SIL OFL 1.1)
// so the build never downloads them. With next/font/google the build fetched them from
// Google at build time, and on 25 Nov 2026 the Vercel build failed inside that fetch
// ("Cannot read properties of null (reading '1')" in next/font's Google loader).
export const roboto = localFont({
  src: [
    { path: "./fonts/roboto-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/roboto-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/roboto-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/roboto-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-roboto",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

// Plex Mono loads 400 and 500 only: nothing on the site sets it bolder (checked
// page by page on 28 Nov 2026), and every weight listed here is preloaded on
// every page. The 700 file stays in ./fonts in case a label ever needs it.
export const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});
