# Task 9 — Component Optimization

## Summary

Optimized two cosmic component files to reduce framer-motion dependencies and improve LCP performance.

### File 1: `CosmicEntity.tsx`

| Change | Details |
|--------|---------|
| Image source | `sabio-figure.png` → `sabio-figure.webp` (602KB → 196KB) |
| Image loading | `loading="lazy"` → `loading="eager"` (hero image, LCP) |
| Fetch priority | Added `fetchPriority="high"` |
| Image dimensions | Added `width={200}` `height={270}` attributes + `style` width/height from `size` prop |
| Orbital ring 1 | `motion.div` → `div` (already had CSS animation `singularitySpin`) |
| Internal energy flow | `motion.div` → `div` with `animation: singularitySpin 25s linear infinite` |
| Orbiting particles | Kept as `motion.div` (dynamic cos/sin offsets can't be expressed in pure CSS) |
| framer-motion import | **Kept** (still needed for orbiting particles) |

### File 2: `GoldenSingularity.tsx`

| Change | Details |
|--------|---------|
| Internal light | `motion.div` → `div` with `animation: pulseGlow 4s ease-in-out infinite` |
| framer-motion import | **Removed** (no longer needed) |

### File 3: `globals.css`

| Change | Details |
|--------|---------|
| New keyframe | Added `@keyframes pulseGlow` (opacity + scale pulse) |

### Lint

`bun run lint` — clean, no errors.
