# Task 4+7+8 — Mobile Performance Optimization

## Summary
Optimized two files for mobile performance: `layout.tsx` and `globals.css`.

### layout.tsx Changes
1. **Replaced Google Fonts `<link>` with `next/font/google` self-hosting**: Added `Playfair_Display` (variable `--font-display`, weights 400/700/800/900, swap, preload), `JetBrains_Mono` (variable `--font-mono-cosmic`, weights 400/500/700, swap, preload), `Inter` (variable `--font-body`, weights 300-700, swap, preload: false). Kept existing `Geist` and `Geist_Mono`.
2. **Removed render-blocking `<link>` tag** for Google Fonts (the media="print" onLoad trick).
3. **Removed preconnect** to fonts.googleapis.com and fonts.gstatic.com (no longer needed with self-hosted fonts).
4. **Added preconnect/dns-prefetch** for `go.hotmart.com`, `connect.facebook.net`, `wa.link`.
5. **Optimized Meta Pixel**: Changed from `window.addEventListener('load',...)` to `requestIdleCallback(...)` for sooner firing.
6. **Added meta tags**: `<meta name="theme-color" content="#050505" />` and `<meta name="color-scheme" content="dark" />`.
7. **Applied all font CSS variables** to body className.

### globals.css Changes
1. **Added `sparkleFloat` keyframes** (replaces framer-motion MagicSparkles).
2. **Added `popIn` keyframes** (WhatsApp button delayed entrance).
3. **Added `fadeInUp` keyframes** (scroll-reveal).
4. **Added `fadeInScale` keyframes** (hero elements).
5. **Disabled grain animation on mobile**: Added `.grain-overlay { display: none; }` and `.scan-sweep { animation-duration: 20s; }` inside `@media (max-width: 768px)`.
6. **Removed `scroll-behavior: smooth`** from html (causes jank).
7. **Added CTA button hover/active CSS**: `.cta-btn` with transform and box-shadow transitions.
8. **Updated font-family references** to use CSS variables (`var(--font-display)`, `var(--font-mono-cosmic)`, `var(--font-body)`) instead of hard-coded font names.

### Verification
- Lint: Passed with zero errors
- Dev server: Running, all GET / requests returning 200
