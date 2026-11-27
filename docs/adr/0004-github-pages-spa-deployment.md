# GitHub Pages SPA Deployment

Status: accepted

BetterConnect's static React + Vite SPA deploys to GitHub Pages (`https://salman5900.github.io/Agency-Website/`) via the `gh-pages` package (`npm run deploy` pushing `dist/` to the `gh-pages` branch) with clean route URLs supported through `public/404.html`, rather than `HashRouter` or GitHub Actions Pages workflows.

## Considered Options

- **`gh-pages` branch deploy + `/Agency-Website/` base path + `404.html` redirect**: Works directly from `npm run deploy` (`predeploy` builds `dist/` and pushes to `gh-pages`), preserves clean URLs (`/services`, `/work/malabar-fresh-commerce`), and requires no separate CI workflow setup.
- **GitHub Actions Pages workflow**: Automates builds on `main` pushes, at the cost of requiring repository-level Pages-via-Actions enablement before the first deploy succeeds.
- **`HashRouter` (`/#/services`)**: Avoids `404.html` redirects, at the cost of hash-prefixed URLs across links and shares.

## Consequences

- Production builds use `base: '/Agency-Website/'` (overridable via `VITE_BASE_PATH` if a custom domain is later attached) and `<BrowserRouter basename={import.meta.env.BASE_URL}>`.
- All local fonts live under `src/assets/fonts/` for Vite bundling, and `public/` assets are resolved via `import.meta.env.BASE_URL`.
- `node_modules/` and `dist/` are untracked from Git and ignored via `.gitignore`; `npm run deploy` pushes only the built `dist/` output to the `gh-pages` branch.
