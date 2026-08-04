# This folder = the CURRENT (unreleased) version

Right now this holds v2's content, tracking `main_development`. This folder is always "whatever's being drafted next" — when v2 is frozen, `npx docusaurus docs:version 2.0` copies this folder's contents into `versioned_docs/version-2.0/` automatically, and you keep writing the next draft (v3) right here in `docs/`. No renaming needed.

Files here are excluded from the built site (underscore-prefixed files are ignored by Docusaurus). This is a note for anyone browsing the repo, not a doc page.

See `/VERSIONING.md` at the repo root for the full folder map and how to cut a new version.
