# GitHub Pages SPA Deployment

Status: accepted

SideQuest's static React + Vite SPA deploys automatically to GitHub Pages (`https://salman5900.github.io/Agency-Website/`) via GitHub Actions (`.github/workflows/deploy.yml`) with clean route URLs supported through a `public/404.html` SPA redirect, rather than using `HashRouter` or manual `gh-pages` branch pushes.

## Considered Options

- **GitHub Actions + `/Agency-Website/` base path + `404.html` redirect**: Keeps clean URLs (`/services`, `/work/malabar-fresh-commerce`) with automated CI builds on every push to `main` and no `dist/` artifacts committed to Git.
- **`HashRouter` (`/#/services`)**: Avoids `404.html` redirects, at the cost of hash-prefixed URLs across links and shares.
- **Manual `gh-pages` CLI branch deploys**: Simpler workflow file omission, at the cost of requiring manual terminal deploys after every change.

## Consequences

- Production builds use `base: '/Agency-Website/'` (overridable via `VITE_BASE_PATH` if a custom domain is later attached) and `<BrowserRouter basename={import.meta.env.BASE_URL}>`.
- All local fonts live under `src/assets/fonts/` for Vite bundling, and `public/` assets are resolved via `import.meta.env.BASE_URL`.
- `node_modules/` and `dist/` are untracked from Git and ignored via `.gitignore`.
