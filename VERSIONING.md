# Documentation Versioning

This site documents multiple releases of [moil-fisheye-calisys](https://github.com/perseverance-tech-tw/moil-fisheye-calisys) side by side, using Docusaurus's built-in versioning. Readers switch between them with the version dropdown in the navbar.

## Folder map

| Folder | What it is | Tracks branch | Edit it when... |
|---|---|---|---|
| `docs/` | The **current** (in-progress, unreleased) version. Always mutable, always named `docs/` no matter which version is being drafted (right now: v2). | `main_development` | You're writing docs for the next release. |
| `sidebars.js` | Sidebar for `docs/` (current version). | — | You add/remove/reorder a page in `docs/`. |
| `versioned_docs/version-1.0/` | **Frozen** snapshot of a released version. | `Feature-AutoLoadCaliResult` | You're patching a mistake in an already-released version's docs. Rare. |
| `versioned_sidebars/version-1.0-sidebars.json` | Sidebar for `version-1.0`, frozen alongside it. | — | Same as above. |
| `versions.json` | List of released (frozen) version numbers. | — | Auto-updated by the CLI command below — don't hand-edit. |
| `docusaurus.config.js` (`docs.versions`) | Labels each version shows in the dropdown, and which one is the default (`lastVersion`). | — | You add a new frozen version, or rename a label. |

`docs/` is never renamed. It always means "whatever's being drafted right now" — after a freeze, it keeps being used for the *next* draft.

## Adding a new version (e.g. cutting v2.0 once `main_development` is ready to publish)

1. Make sure everything in `docs/` reflects the version you want to freeze.
2. Run, from the repo root:
   ```bash
   npx docusaurus docs:version 2.0
   ```
   This automatically:
   - Copies `docs/` → `versioned_docs/version-2.0/`
   - Copies `sidebars.js` → `versioned_sidebars/version-2.0-sidebars.json`
   - Appends `"2.0"` to `versions.json`
   - `docs/` and `sidebars.js` are left in place, now representing the *next* draft (e.g. v3) — no manual renaming needed.
3. In `docusaurus.config.js`, update the `docs.versions` block:
   - Add a `'2.0'` entry with a `label` (e.g. `'v2.0 (main_development)'`).
   - If v2.0 is now the latest **released** version, update `lastVersion: '2.0'`.
   - Update the `current` entry's `label` to whatever branch the *next* in-progress docs will track (e.g. `'v3 (next-dev-branch)'`).
4. Clear out / rewrite `docs/` for the next in-progress version (same as was done for v2's placeholder pages).
5. Run `npm run build` locally to confirm the site builds, then commit and push — the GitHub Action rebuilds and redeploys automatically.

**Naming convention:** version numbers are `major.0` (`1.0`, `2.0`, ...) matching a released branch cut. Keep the branch name in the dropdown label (e.g. `v2.0 (main_development)`) so it's traceable to the source branch — Docusaurus itself has no concept of git branches.
