# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev             # Start development server on localhost:3000
npm run build           # Build for production (runs prebuild → image manifest first)
npm run lint            # Run ESLint
npm run image-manifest  # Regen src/lib/image-dimensions.json (needed when new assets are added to public/img/, including .mp4/.webm — those require ffprobe / ffmpeg installed)
```

No test suite is configured.

> ⚠️ **`ffprobe` must be on PATH before running `npm run build`.** The `prebuild` hook regenerates `src/lib/image-dimensions.json`, and without `ffprobe` it **silently drops every `.mp4` / `.webm` / `.mov` entry** instead of failing. The build still succeeds, so it is easy to commit the stripped manifest by accident and lose the CLS-free sizing on every video. After any build, check `git diff src/lib/image-dimensions.json`; if video entries disappeared, `git checkout --` that file and install ffmpeg before rebuilding.

---

## Branch flow

**Always work on `beta` first, then promote to `main`.** The `beta` branch maps to a beta deployment environment used for preview/validation; `main` is production.

1. Start every change on `beta`. If `beta` is behind `main`, fast-forward it first: `git checkout beta && git merge main --ff-only`.
2. Commit and push to `beta` so the beta deploy picks the changes up.
3. Once the change is validated (build green + beta deploy looks right), promote: `git checkout main && git merge beta --ff-only && git push origin main`. Keep history linear — no merge commits.
4. Return to `beta` so the next iteration starts in the right place.

Non-trivial changes ship as a sequence of small commits (one per logical phase), each pushed to `beta` individually. Commit messages include a `Co-Authored-By` trailer in the project's established style.

---

## Architecture

**Next.js 15.3.9 App Router** portfolio site for MOLLY YLLOM, a graphic design studio. Deployed on Vercel. Fully bilingual (ES/EN) — site-wide language toggle via `LanguageContext`, CV section has its own `CVLangToggle`.

### Two-layer component pattern
- `src/app/` — Thin Next.js route files. Each `page.tsx` imports and renders from `pageComponents/`.
- `src/pageComponents/` — Full page implementations. Each folder has an `index.ts` barrel export.
- `src/components/` — Shared UI components (`Header`, `Footer`, `AppDrawer`, `PortfolioGrid`, etc.).

### Data files
- `src/projects.tsx` — All portfolio projects as static data. Exports `activeProjects` (ordered array) and `projectsBySlug` (lookup map).
- `src/i18n/translations.ts` — All UI strings for the site-wide ES/EN toggle.
- `src/context/LanguageContext.tsx` — `useLanguage()` hook providing `lang`, `t` (translations), and `toggleLanguage`.
- `src/pageComponents/DownloadsPage/downloadData.ts` — Downloads page data.

### Routes

| Route | Page Component | Notes |
|-------|---------------|-------|
| `/` | `HomePage` | |
| `/conoceme` | `ConocemePage` | |
| `/proyectos` | `ProjectsPage` | Grid via `PortfolioGrid` |
| `/proyectos/[slug]` | `ProjectPage` | Data from `projectsBySlug` |
| `/contacto` | `ContactPage` | |
| `/descargas` | `DownloadsPage` | |
| `/cv` | `NormieCV` | Brand CV, English |
| `/cv/es` | `NormieCV` | Brand CV, Spanish |
| `/cv/web3` | `Web3CV` | Web3 CV, English |
| `/cv/es/web3` | `Web3CV` | Web3 CV, Spanish |

The Mollyverse nav item is an **external** link (`https://www.mollyverse.art/welcome`) rendered as a small icon in Header / AppDrawer / Footer (`public/img/logo/mollyverse-icon.png`), not as text. The site previously had an internal `/nfts` page; it was removed.

### SEO metadata

Per-route metadata lives on the **server-component `page.tsx`** wrappers in `src/app/...` — not on the client `pageComponents/...` implementations:

- Static routes export a `metadata: Metadata` constant (`/conoceme`, `/proyectos`, `/contacto`, `/descargas`).
- `/proyectos/[slug]` uses `generateMetadata` to derive title + OG image from the project's `heroImage` and first paragraph, and `generateStaticParams` so each project pre-renders as static HTML at build time.
- Root-level metadata + OG image live in `src/app/layout.tsx`.
- `src/app/sitemap.ts` and `src/app/robots.ts` produce `/sitemap.xml` and `/robots.txt` automatically — `sitemap.ts` enumerates static routes plus every entry in `activeProjects`.

### Navigation & page transitions
The site uses the native **View Transitions API** for all internal navigation, enabled via `experimental: { viewTransition: true }` in `next.config.ts`. The crossfade keyframes (`cv-fade-out` / `cv-fade-in`, 350ms ease-in-out) live in `src/app/globals.css` and respect `prefers-reduced-motion`.

**Always use `<TransitionLink>` from `@/components/TransitionLink` for internal links** — never plain `<a>` or `next/link` `<Link>`. `TransitionLink` wraps `next/link` and intercepts the click to call `React.startTransition(() => router.push(href))`, which Next.js hooks into the View Transitions API. It correctly delegates modifier-key clicks (cmd/ctrl/shift), `target="_blank"`, and `mailto:` / `tel:` / `http(s)://` URLs to the browser.

For programmatic navigation from buttons (e.g. the CV toggles in `CVVersionToggle` / `CVLangToggle`), call `React.startTransition(() => router.push(href))` directly — same effect.

External links (Calendly, social) stay as plain `<a target="_blank">`.

### Analytics

**RULE — analytics only ever run in production.** Every third-party tracker is keyed off an env var that exists on the Vercel **Production** environment *only*, never on Preview, Development, or local `.env.local`. The absence of the id is the switch, so dev and beta traffic can't pollute the live data. When adding any new tracker, follow the same pattern: read its id from a `NEXT_PUBLIC_*` env var, render/init nothing when it's missing, and set the var on Production only.

| Tracker | Env var | Guard |
|---|---|---|
| Google Analytics | `NEXT_PUBLIC_GA_ID` (`G-Q3TSX67D2J`) | `{gaId && <GoogleAnalytics gaId={gaId} />}` in `src/app/layout.tsx` |
| Amplitude | `NEXT_PUBLIC_AMPLITUDE_API_KEY` | `initAll` skipped in `src/amplitude.ts`; `track()` no-ops via `isAmplitudeEnabled` |
| Apollo website visitor tracker | `NEXT_PUBLIC_APOLLO_APP_ID` | `{apolloAppId && <Script … />}` in `src/app/layout.tsx` |

**Apollo** identifies which *companies* visit the site (B2B visitor de-anonymization), feeding outreach — it is not event analytics. The snippet is embedded with `<Script>` from `next/script` (the standard Next.js mechanism for third-party scripts) using `strategy="beforeInteractive"`, because Apollo requires it to load in the head as early as possible on every page; `next/script` dedupes by `id` so it runs exactly once per page load. Get the snippet from Apollo's MCP `apollo_website_visitor_domain_tracker_install_script` tool rather than hand-assembling it. Note that the script alone does nothing until the domain is registered in Apollo's tracker settings.

Google Analytics uses `<GoogleAnalytics>` from `@next/third-parties/google` — the official Next.js integration. The GA property has a single web stream (`mollyyllom.com`, stream id 8220526592) with Enhanced Measurement on, so page views, scrolls and outbound clicks are captured without extra code.

Vercel Analytics (`<Analytics />`) and Vercel Speed Insights (`<SpeedInsights />`) are **not** gated — they are Vercel-native, report into Vercel's own dashboard rather than GA/Amplitude, and distinguish production from preview there.

**Amplitude** (Analytics + Session Replay) follows [Amplitude's official Next.js installation guide](https://amplitude.com/docs/sdks/frameworks/nextjs-installation-guide) — do not hand-roll an alternative setup:
- `src/amplitude.ts` is the single initialization module (`'use client'`, `@amplitude/unified`, `initAll` guarded by `typeof window !== 'undefined'` so it only ever runs client-side and only once). It exports a no-op `<Amplitude />` component and the `amplitude` instance as default.
- `<Amplitude />` is rendered in the root layout; the API key comes from `NEXT_PUBLIC_AMPLITUDE_API_KEY`.
- **Production only**, per the rule above. `src/amplitude.ts` skips `initAll` when the key is missing, and `track()` in `src/lib/analytics.ts` becomes a no-op via the exported `isAmplitudeEnabled` flag (so calls don't pile up in the SDK's pre-init queue). Never add the key to another environment to "test in preview" — verify locally instead, per the debugging recipe below.
- `autocapture: true` covers page views, clicks, form interactions and file downloads, so most tracking needs no code.
- Session Replay runs at `sampleRate: 1`.

#### Named conversion events

Autocapture records every click as a generic `[Amplitude] Element Clicked` identified by CSS selector — which breaks the moment the markup changes. High-intent actions therefore get a **named** event, defined as a typed helper in `src/lib/analytics.ts` and called from the component's `onClick` (or a mount `useEffect` for views).

| Event | Fires when | Properties | Call sites |
|-------|-----------|------------|-----------|
| `Booking CTA Clicked` | Any Calendly button is clicked — the strongest buying signal on the site | `location`, `lang` | `HomePage/components/MediaSection`, `ConocemePage`, `ContactPage` |
| `Email CTA Clicked` | The `hola@mollyyllom.com` mailto link is clicked | `location`, `lang` | `ContactPage` |
| `Newsletter CTA Clicked` | The newsletter signup link in the footer is clicked | `location`, `lang` | `Footer` |
| `Asset Downloaded` | A downloadable asset on `/descargas` is opened | `assetTitle`, `assetUrl`, `lang` | `DownloadsPage` |
| `Project Viewed` | A case study page mounts (once per slug; the language toggle does not re-fire it) | `projectSlug`, `projectTitle`, `lang` | `ProjectPage` |

**RULE — whenever you add, remove, or change a user-facing conversion point, update Amplitude tracking and this table in the same commit.** Concretely:
- A new CTA, download, contact route, external booking link, or funnel step gets a named event via a new helper in `src/lib/analytics.ts` — never a bare `amplitude.track('...')` string literal inline in a component.
- Every event carries `lang` so ES/EN performance stays comparable, and a `location` (or entity id such as `projectSlug`) so the same event fired from different surfaces can be told apart.
- **Event names are permanent.** Renaming one in code splits its history into two series in Amplitude and silently breaks any saved chart or funnel. If a name is genuinely wrong, rename it in the Amplitude UI, not in code.
- Removing a tracked CTA means removing its row from this table too, so the catalogue never drifts from the code.
- Use Title Case for event names and camelCase for property names, matching the table above.

To verify events locally: uncomment `NEXT_PUBLIC_AMPLITUDE_API_KEY` in `.env.local` (tracking is off locally by default), temporarily add `logLevel: amplitude.Types.LogLevel.Debug` to the `analytics` config in `src/amplitude.ts`, restart `npm run dev`, trigger the interaction, and look for `"name": "track"` in the browser console — it logs the event name, properties, and the exact call site. Re-comment the key and revert the `logLevel` line when done; note that events fired this way do land in the live Amplitude project.

---

## Design System

### Color palette
| Token | Value | Usage |
|-------|-------|-------|
| `bg-indigo-950` | #1e1b4b | Dark backgrounds, hero sections, alternating dark sections |
| `bg-stone-200` | #e7e5e4 | Light backgrounds, alternating light sections |
| `bg-white` | #ffffff | Cards inside light sections |
| `text-violet-400` | accent | Dark section headings, kickers, accents |
| `text-violet-500` | accent | Light section headings, kickers, accents |
| `bg-violet-500` | primary CTA | Buttons, active toggle states |
| `hover:bg-violet-400` | hover | Button hover state |
| `text-slate-300/400` | body text on dark | Paragraphs and secondary text on dark backgrounds |
| `text-indigo-950/70` | body text on light | Paragraphs on light backgrounds |

### Typography
- **H1 (hero):** `text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight`
- **H2 (section):** `text-4xl sm:text-5xl font-black leading-tight` — always two lines, second line in violet accent
- **Kicker (above h2):** `text-xs font-bold tracking-[0.3em] uppercase` in violet
- **Body:** `text-lg leading-relaxed`
- **Tags/pills:** `text-xs px-3 py-1 rounded-full`
- Font family: Arial / Helvetica (system sans-serif)

### Section pattern
Every section follows: **violet kicker → big two-line h2 → content**. The h2 always has a plain first line and a colored second line:
```jsx
<p className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Kicker</p>
<h2 className="text-4xl sm:text-5xl font-black leading-tight mb-16">
  First line<br />
  <span className="text-violet-400">Second line</span>
</h2>
```

### Layout
- **Horizontal padding:** `px-6 md:px-16 lg:px-24` (used consistently everywhere)
- **Section vertical padding:** `py-20`
- **Max width (content):** `max-w-4xl mx-auto` for text-heavy sections, `max-w-6xl mx-auto` for grids
- **Alternating sections:** Dark (`bg-indigo-950`) → Light (`bg-stone-200`) → Dark → Light...
- **Cards on light:** `bg-white rounded-2xl border border-stone-200 p-6 md:p-8`
- **Cards on dark:** `border border-stone-200/10 rounded-2xl p-6 md:p-8` with hover `hover:border-violet-500/40`

### Animations (Framer Motion)
Two helpers used throughout:
```ts
// Hero entrance (uses animate, not whileInView)
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
})

// Scroll-triggered sections
const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
})
```
Hero elements stagger: 0, 0.1, 0.2, 0.25, 0.35. Section items stagger: `i * 0.04` to `i * 0.1`.

### Buttons
- **Primary CTA:** `bg-violet-500 text-stone-200 font-bold px-8 py-4 rounded-full hover:bg-violet-400`
- **Secondary (on dark):** `border border-stone-200/20 text-slate-300 font-semibold px-8 py-4 rounded-full hover:border-violet-400 hover:text-violet-400`
- **Secondary (on light):** `border border-indigo-950/20 text-indigo-950/70 font-semibold px-8 py-4 rounded-full hover:border-violet-500 hover:text-violet-500`

### Image / video protection (ALWAYS apply this)

**Never use plain `<img>`, `<video>`, or Next.js `<Image>` directly for content media.** All visible content images and short looping videos go through `<ProtectedImage>` from `@/components/ProtectedImage`, which wraps `next/image` (or `<video>` for video sources) and blocks drag-and-drop, right-click, and drag-ghost preview.

`ProtectedImage` auto-selects between `fill` and intrinsic mode:

1. If you pass `fill` explicitly → fill mode (parent must be sized; ProtectedImage adds its own `position: relative` wrapper).
2. If you pass explicit `width` + `height` → intrinsic mode.
3. If neither, the `src` is looked up in the build-time manifest at `src/lib/image-dimensions.json` (generated by `npm run image-manifest` and via the `prebuild` hook) → intrinsic mode using those dims.
4. Otherwise → fill mode.

GIFs are auto-passed `unoptimized` so animation is preserved.

**Video sources (.mp4 / .webm / .mov)** — when `src` matches one of these extensions, ProtectedImage renders a `<video autoplay loop muted playsInline>` instead of `<Image>`, inside the same protected wrapper. The `priority` prop switches the video's `preload` from `"metadata"` → `"auto"` so above-the-fold videos start loading immediately. Image-only props (`quality`, `sizes`, `unoptimized`) are silently dropped for the video branch — they don't apply. Video dimensions are populated by `ffprobe` in the manifest script, so the same intrinsic vs fill logic and CLS-free sizing applies to videos.

**When to convert a GIF to MP4:** any animated thumbnail or in-body GIF over ~500 KB should be converted (`ffmpeg -i in.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 23 -preset slower -an out.mp4`; bump `-crf` to 28 with `-preset veryslow` if the result isn't meaningfully smaller). The GIF is deleted, `projects.tsx` is repointed at the `.mp4`, and the manifest is regenerated. Smaller GIFs stay as GIFs.

**Quality convention:** `quality={90}` is opted into per call site for every visible content image (hero/body images on `/proyectos/[slug]`, both Molly portraits, PortfolioGrid thumbs, Downloads thumbs, both CV profile photos). Decorative/UI images use the default 75. `next.config.ts` allows both via `qualities: [75, 90]`; only those two values are valid.

```tsx
// Fill mode — parent is sized, image fills it
<figure className="w-full md:w-1/2 h-56 md:h-auto overflow-hidden">
  <ProtectedImage
    src="/img/molly/molly1.webp"
    alt="Molly Yllom"
    fill
    sizes="(min-width: 768px) 50vw, 100vw"
    className="object-cover"
  />
</figure>

// Intrinsic via manifest — works for any image in /public/img/
// (no width/height props needed; dims resolved at build time)
<div className="w-full overflow-hidden">
  <ProtectedImage
    src={image}
    alt={...}
    sizes="100vw"
    className="w-full h-auto"
  />
</div>

// Round avatar — fill mode with wrapperClassName carrying size/shape/border
<ProtectedImage
  wrapperClassName="w-64 h-64 rounded-full overflow-hidden border-2 border-violet-500/50"
  src="/img/photo.jpg"
  alt="..."
  fill
  sizes="256px"
  className="object-cover"
  priority
/>
```

Always pass a `sizes` prop on fill-mode images so next/image can pick the right srcset variant. For intrinsic-mode images that span the viewport, pass `sizes="100vw"`.

`priority` should be set only on the LCP image of a page (typically the hero).

The image-dimensions manifest is regenerated automatically before every build (via the `prebuild` npm script) and can be run manually with `npm run image-manifest` whenever you add new assets to `public/img/`.

Logo images in the `<Header>` and `<Footer>` are exempt from protection (they are decorative/brand assets served publicly anyway) — they use `next/image` directly with explicit `width`/`height`.

---

### Toggle pills (Brand/Web3, EN/ES)
```jsx
<div className="inline-flex items-center rounded-full border p-1 gap-1 border-stone-200/20">
  <button className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase
    bg-violet-500 text-stone-200 cursor-pointer">Active</button>
  <button className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase
    text-slate-400 hover:text-stone-200 cursor-pointer">Inactive</button>
</div>
```
Toggles use `<button>` (not `<Link>`) with `React.startTransition(() => router.push(href))` for View Transitions integration. Use `variant="light"` prop on `CVVersionToggle` / `CVLangToggle` when placed on a `bg-stone-200` background — switches border and inactive text to dark-on-light variants.

---

## CV Section (`src/cv/`)

Self-contained namespace. All CV code lives under `src/cv/` with `@/cv/` import paths.

### Structure
```
src/cv/
  components/          # Shared CV UI (CVVersionToggle, CVLangToggle)
  data/
    constants.ts       # BASE_URL, URLS (Aerosol, BurnAndClaim, etc.)
    resumeData/
      common/          # education.ts, education.es.ts, skills.ts
      web2/            # Brand CV data (EN + ES)
      web3/            # Web3 CV data (EN + ES)
  icons/               # MdiLinkedin, MdiX, MdiGithub, MdiNinjaStar
  pageComponents/
    normie/NormieCV.tsx   # Brand CV component
    web3/Web3CV.tsx       # Web3 CV component
  types.ts
  utils/experience.ts
```

### CV design decisions
- **No site Header/Footer** on CV pages — CVs are standalone documents. A discreet `← mollyyllom.com` link sits inside the hero section (top-left), aligned with content padding.
- **Brand CV** (`/cv`, `/cv/es`): alternating dark/light sections matching the main site pattern.
- **Web3 CV** (`/cv/web3`, `/cv/es/web3`): fully dark (`bg-indigo-950` throughout), violet accents, darker atmosphere.
- **Page transition:** Uses the same site-wide View Transitions setup (see "Navigation & page transitions" above). The CV's `← mollyyllom.com` back link uses `<TransitionLink>`; `CVVersionToggle` / `CVLangToggle` use `<button>` + `React.startTransition(() => router.push(href))` because they need the active-state styling on a button.
- **Language toggle** (`CVLangToggle`) and **version toggle** (`CVVersionToggle`) are cross-aware: switching language keeps the current mode, switching mode keeps the current language.
- **Skills stay in English** in both language versions — standard for design/tech CVs.
- **Profile photos:** `molly_pfp.jpg` (brand), `molly_pfp_web3.jpg` (web3) — both in `public/img/molly/`. Size: `w-64 h-64 md:w-80 md:h-80`, circular with violet glow shadow.
- **Social links** (LinkedIn, X) — icon-only, no text labels.

### CV i18n pattern
Each page component receives `lang: 'en' | 'es'` prop. A `copy` object inside the component holds all UI strings for both languages. Resume data is separate: `web2Resume` / `web2ResumeES`, `web3Resume` / `web3ResumeES`.

### CV content rules (from audits)
- `featureHighlight` must be different from the first bullet point — no duplication.
- Every section h2 uses the two-line violet accent pattern (no exceptions).
- Kicker labels and badge text ("Current"/"Actual") must match the page language.
- Hero photo uses `md:items-start` (not `md:items-center`) to avoid floating when text is taller than photo.

### Adding/editing CV content
- Job experience: `src/cv/data/resumeData/web2/experience.tsx` (EN) and `experience.es.tsx` (ES)
- Selected projects: `contractWork.tsx` / `contractWork.es.tsx`
- Skills: `src/cv/data/resumeData/common/skills.ts` (shared EN), `web3/skills.ts` (web3 reordered)
- Education: `common/education.ts` (EN), `common/education.es.ts` (ES)
- Social/contact: `web2/contact.tsx` and `web3/contact.tsx`

---

## Adding a New Project

1. Place images (and any animated MP4 thumbnails) in `public/img/projects/[slug]/`.
2. Define a `Project` object in `src/projects.tsx` with `slug`, `title`, `portfolioImage`, `heroImage`, `paragraphs`, `paragraphsEn`, `images`.
   - `portfolioImage` is shown in the PortfolioGrid (square thumb, fill mode, animated MP4 or static image both work).
   - `heroImage` is shown full-bleed at `h-[50vh] md:h-[70vh]` with `object-cover` — pick a high-resolution mockup (≥3840px wide ideal, ≥2400px minimum). Thin "logo usage sheet" images (~625px tall) will pixelate as heroes; use a real product mockup instead.
   - `heroImage` should not also appear in `images[]` (would render the same asset twice on the page).
3. Add it to `activeProjects` (order = grid position).
4. The `prebuild` hook will pick up the new media on the next `npm run build`. To get the image-dimensions manifest updated immediately (e.g. for `npm run dev`), run `npm run image-manifest`.

`/proyectos/[slug]` uses `generateStaticParams`, so the new project will get its own pre-rendered HTML page automatically. Sitemap entries are also generated automatically from `activeProjects`.
