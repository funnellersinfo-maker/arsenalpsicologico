# Task 5+3+6: Performance Optimizations for page.tsx

## Summary
Applied all 10 performance optimization changes to `/home/z/my-project/src/app/page.tsx` (~1032 lines → ~820 lines).

## Changes Applied

### 1. Removed `useTransform` from framer-motion import
- Changed import to: `import { motion, useScroll, AnimatePresence } from "framer-motion";`

### 2. Replaced MagicSparkles with CSS animations
- Added `useMemo` to React import
- Replaced `motion.div` with regular `div` using CSS `sparkleFloat` keyframe
- Added `children` prop support (fixed original bug where children weren't rendered)
- Wrapped children in `relative` container with sparkle overlay

### 3. Replaced CtaButton motion.a/motion.button with regular HTML + CSS
- Replaced `motion.button` and `motion.a` with `<button>` and `<a>`
- Added `cta-btn` CSS class for hover/active transitions (defined in globals.css)
- Kept `breatheGlow` animation and `holo-shimmer` overlay

### 4. Replaced FaqItem motion.span/motion.div with CSS
- Replaced `motion.span` rotate with CSS `transition-transform duration-300` + conditional `rotate-45` class
- Replaced `AnimatePresence` + `motion.div` expand with CSS grid `grid-rows-[1fr]/[0fr]` transition

### 5. Replaced StickyBar motion.div with CSS transitions
- Replaced `AnimatePresence` conditional rendering with always-rendered `div` using CSS `translate-y-full/translate-y-0` + `opacity` transitions
- Replaced `motion.a` CTA with regular `<a>` + `cta-btn` class

### 6. Replaced WhatsAppButton motion.a with CSS animation
- Replaced `motion.a` with regular `<a>`
- Used CSS `popIn` keyframe for initial appearance (0.4s ease-out 6s both)
- Added `hover:scale-110 active:scale-95` CSS transitions

### 7. Replaced scroll-reveal motion.divs with CSS
- Added `useReveal()` hook using IntersectionObserver
- Added `RevealItem` component for whileInView replacements (supports custom animation, duration, delay)
- Replaced all `motion.div whileInView` with `RevealItem` components
- Hero section: replaced `motion.div/motion.p initial/animate` with CSS `fadeInScale`, `fadeInUp`, `cosmicFadeIn` keyframes with appropriate delays
- PackPage hero/back button: replaced with CSS animations

### 8. Removed duplicate CosmicCanvas from PackPage, lifted overlays to ElUmbral
- Moved `CosmicCanvas`, scanlines, grain-overlay, scan-sweep, vignette to `ElUmbral` root component
- Removed these from both `MainPage` and `PackPage`
- Kept `StickyBar` and `WhatsAppButton` in ElUmbral (they were already there)

### 9. Added width/height to all images
- `portadas.webp`: width={400} height={400}
- `pack-sabio.webp`: width={400} height={500}
- `pack-domador.webp`: width={400} height={500}
- `pack-jaque-mate.webp`: width={400} height={500}

### 10. Kept motion.div for Breach sequence and Loader
- Loader: `AnimatePresence` + `motion.div` with exit animation — UNCHANGED
- Breach: All `motion.div`, `motion.h1` elements with state-driven animations — UNCHANGED
- Page transitions: `AnimatePresence mode="wait"` + `motion.div` — UNCHANGED

## Verification
- ESLint: Passed with no errors
- Dev server: Compiled successfully, no runtime errors
- All text, links, and visual structure preserved
