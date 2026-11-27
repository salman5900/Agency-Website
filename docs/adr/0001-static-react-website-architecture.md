# Static React Website Architecture

Status: accepted

BetterConnect's marketing site is built as a client-side React, TypeScript, and Vite single-page application using React Router and a zero-backend email form endpoint, rather than a server-rendered framework or a custom backend.

## Considered Options

- **Client-side React + Vite SPA with zero-backend form submission**: Fast iteration, pure frontend ownership, and simple static deployment with no server or database maintenance.
- **Next.js or Astro (SSR / SSG)**: Stronger out-of-the-box per-page SEO metadata and server actions, at the cost of heavier framework overhead during initial brand and layout prototyping.

## Consequences

- Prospective Client inquiries are delivered to the agency email via a third-party static form endpoint alongside Direct Channel links (WhatsApp, Instagram, `mailto:`).
- If organic search SEO later demands pre-rendered HTML per route, static pre-rendering or an SSG migration can be introduced without changing the domain data model.
