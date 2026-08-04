# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Documentation Structure & Versioning

This site documents multiple releases of [moil-fisheye-calisys](https://github.com/perseverance-tech-tw/moil-fisheye-calisys) side by side, using Docusaurus's built-in versioning. A version dropdown in the navbar lets readers switch between them.

| Folder | Version | Tracks branch | Status |
|---|---|---|---|
| `docs/` | current (v2) | `main_development` | In progress — edit freely |
| `versioned_docs/version-1.0/` | v1.0 | `Feature-AutoLoadCaliResult` | Released — only edit to fix mistakes |

**To edit content:**
- Writing/updating docs for the in-progress version → edit files under `docs/`, and update `sidebars.js` if you add or remove a page.
- Fixing something in an already-released version → edit files under `versioned_docs/version-1.0/` (and `versioned_sidebars/version-1.0-sidebars.json` if the sidebar changes).

**To add a new version** (e.g. once `main_development` is ready to become v2.0), see [VERSIONING.md](./VERSIONING.md) for the full step-by-step, including the `docusaurus docs:version` command and the `docusaurus.config.js` changes it requires.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
