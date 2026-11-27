# Compositor-Only Scroll Motion

Status: accepted

BetterConnect's scroll reveals, staggered entrances, and hero scroll-depth effects use `motion` (`motion/react`) restricted strictly to GPU-composited properties (`transform` and `opacity`), avoiding animated `filter: blur()` or heavy multi-layer backdrop-filter repaints during scroll.

## Considered Options

- **Compositor-only `motion` animations (`transform` + `opacity`)**: Maintains smooth 60fps scrolling on budget laptops and mobile devices while keeping `prefers-reduced-motion` automatic via `MotionConfig`.
- **Animated `filter: blur()` + multi-element parallax**: Creates softer optical entrances on flagship hardware, at the cost of frequent rasterization jank and dropped frames on entry-level GPUs.

## Consequences

- Scroll animations must only animate `transform` (`x`, `y`, `scale`) and `opacity`, with `viewport={{ once: true }}` so sections never flicker on scroll-up.
- High-saturation `backdrop-filter` Liquid Glass refraction is reserved for the fixed floating navbar and compact floating pills rather than large scrolling card grids.
