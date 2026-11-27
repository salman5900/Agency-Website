# Isolated Mobile Navigation and Layout

Status: accepted

Below `1024px`, BetterConnect replaces the wide desktop header and multi-column desktop grids with an isolated mobile shell (`lg:hidden`) featuring a slim top brand bar, an icon-only floating Liquid Glass bottom dock (`Home`, `Services`, `Work`), and a separate animated floating keyword Search pill.

## Considered Options

- **Isolated `< 1024px` mobile shell + `lg:` desktop lock**: Preserves desktop layouts and interactions untouched while tailoring thumb-zone navigation, inline Service Pillar accordions, and a `1.3`-card curved hero carousel specifically for phones.
- **Collapsing the desktop top bar into a hamburger drawer**: Simpler single-tree markup, at the cost of forcing mobile visitors to reach the top corner and risk desktop CSS regressions during mobile tuning.

## Consequences

- Desktop (`>= 1024px`) and mobile (`< 1024px`) navigation, hero carousels, and Home Service Pillars live in separate conditional views (`hidden lg:...` vs `lg:hidden`), preventing mobile edits from leaking into desktop.
- Mobile routes include bottom safe-area clearance (`pb-28 lg:pb-0`) so content and form actions stay unobstructed above the floating bottom dock.
