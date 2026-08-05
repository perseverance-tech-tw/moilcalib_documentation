# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

Then open **http://localhost:3000/moilcalib_documentation/** — the `/moilcalib_documentation/` part comes from `baseUrl` and the site 404s without it.

Markdown edits reload live. **Changes to `docusaurus.config.js` or `sidebars.js` need a restart.**

| Command | What it does |
|---|---|
| `npm start` | Dev server on port 3000, hot reload — use this while writing |
| `npm run build` | Production build into `build/`; fails on broken links, so run it before pushing |
| `npm run serve` | Serves the built `build/` folder |
| `npm run clear` | Wipes the `.docusaurus` cache when a change won't show up |

> The CI builds with `npm ci` and Node 22, so `package-lock.json` is the lockfile that matters. A `yarn.lock` is also present, but yarn is not used by the pipeline.

## Documentation Structure & Versioning

This site documents multiple releases of [moil-fisheye-calisys](https://github.com/perseverance-tech-tw/moil-fisheye-calisys) side by side, using Docusaurus's built-in versioning. A version dropdown in the navbar lets readers switch between them.

| Folder | Version | URL | Tracks | Status |
|---|---|---|---|---|
| `docs/` | current — **v2.0 (ROS C++)** | `/docs/v2.0/…` | ROS port | In progress — page tree in place, all pages empty |
| `versioned_docs/version-1.1/` | **v1.1 (HTTP C++)** | `/docs/v1.1/…` | `main_development` | **Latest release** (`lastVersion`) — the complete C++/Qt6 client docs |
| `versioned_docs/version-1.0/` | **v1.0 (HTTP PYTHON)** | `/docs/1.0/…` | `Feature-AutoLoadCaliResult` | Frozen — only edit to fix mistakes |

Note that **no version is served at the bare `/docs/` root**, because v1.1 pins its own URL path. The footer link and the homepage "Get Started" button therefore point at `/docs/v1.1/intro` explicitly.

**To edit content:**
- Writing the **v2.0** docs → edit files under `docs/`, and update `sidebars.js` if you add or remove a page.
- Fixing or extending **v1.1** → edit files under `versioned_docs/version-1.1/` (and `versioned_sidebars/version-1.1-sidebars.json` if the sidebar changes). It is frozen, so changes there do **not** affect `docs/`.
- Fixing **v1.0** → same, under `versioned_docs/version-1.0/`.

**To add a new version** (e.g. once the ROS port is ready to become v2.0), see [VERSIONING.md](./VERSIONING.md) for the full step-by-step, including the `docusaurus docs:version` command, the `docusaurus.config.js` changes it requires, and the `path` pitfall that breaks cross-links when a version is frozen.

## Build

```bash
npm run build
```

Generates static content into the `build` directory. The build **fails on broken links** (`onBrokenLinks: 'throw'`), so run it before pushing — it is the main safety net against a bad cross-link or a version path change.

## Deployment

Deployment is automatic. Pushing to `main` triggers [`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml), which:

1. Installs with `npm ci` on Node 22
2. Runs `npm run build`
3. Uploads `build/` as a GitHub Pages artifact and deploys it

No manual deploy step is needed — don't run `yarn deploy`, and don't push to a `gh-pages` branch by hand. The workflow also runs on `master` and `Feature-AutoLoadCaliResult`, and can be started manually from the Actions tab (`workflow_dispatch`).

Live site: **https://perseverance-tech-tw.github.io/moilcalib_documentation/**
