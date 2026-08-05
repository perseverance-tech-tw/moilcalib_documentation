# This folder = the CURRENT (unreleased) version

Right now this holds **v2.0 (ROS C++)** content, tracking the ROS port. The page tree mirrors v1.1 exactly, but every page is an empty placeholder waiting to be written.

This folder is always "whatever's being drafted next" — when v2.0 is frozen, `npx docusaurus docs:version 2.0` copies this folder's contents into `versioned_docs/version-2.0/` automatically, and you keep writing the next draft right here in `docs/`. No renaming needed.

**v1.1 is frozen.** Its finished content lives in `versioned_docs/version-1.1/` — edit it there, not here. Same for v1.0 in `versioned_docs/version-1.0/`.

Files here are excluded from the built site (underscore-prefixed files are ignored by Docusaurus). This is a note for anyone browsing the repo, not a doc page.

See `/VERSIONING.md` at the repo root for the full folder map and how to cut a new version.
