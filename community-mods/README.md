# PokéBonk Unbound — Community Mods

This directory hosts **community-created mods** that have been manually tested and approved by **HyruleChosenOne** for PokéBonk Unbound.

Every approved mod inside `community-mods/` is automatically detected by the in-app **Mod Browser** alongside official mods from `mods-database/` and displays a **Community** badge so players can discover, filter, install, update, and uninstall community creations with 1 click.

---

## How to Submit Your Mod

All community mods go through a manual review & playtest before being merged here to guarantee safety, clean Offline Mode compatibility, and Co-op parity labeling.

### Option 1 — Submit via GitHub Issue Form (Recommended)
Open a new **[Community Mod Submission](https://github.com/HyruleChosenOne/Pokebonk-Unbound/issues/new?template=submit-community-mod.yml)** (also reachable directly from **Unbound Settings -> Mod Browser -> Submit Mod**) and provide:
- Mod Name, Mod ID (lowercase letters/numbers/hyphens, e.g. `my-cool-pack`), Version (`1.0.0`), and Author name
- Category (`Characters`, `Levels`, `Audio`, `Quality of Life`, or `General`)
- Co-op Scope:
  - `gameplay` — adds/modifies characters, attacks, items, levels, regions, or gameplay data (requires all Co-op players to match version)
  - `client` — audio, UI, themes, or cosmetic overrides only (optional in Co-op)
- Link to your mod's GitHub repository or direct `.zip` archive containing `mod.json`, `info.json`, and a 16:9 `preview.png` / `preview.jpg`

### Option 2 — Submit via Pull Request
1. Fork `HyruleChosenOne/Pokebonk-Unbound`.
2. Add your mod folder under `community-mods/<mod-id>/` containing:
   - `mod.json` (see [docs/MODDING.md](../docs/MODDING.md) for full schema)
   - `info.json` (name, version, author, category, scope, tagline, description, highlights, image)
   - `preview.png` or `preview.jpg` (16:9 showcase thumbnail)
3. Open a Pull Request targeting `main` using the **Community Mod Submission** checklist.

---

## Review Guidelines
- Mods must target **Offline Mode only** — never attempt to bypass Online Mode isolation or tamper with `pokebonk.com`.
- Do not include compiled executables, obfuscated binaries, or network-exfiltration scripts.
- Use unique character IDs in the `#2000-#9999` custom range (or coordinate with official packs) to avoid ID collisions.
- Never set `pinned: true` or `essential: true` in community manifests (reserved for core official packs).
- After testing and approving a submission, the maintainer regenerates `community-mods/community-index.json` via `node scripts/sync-mods-database.js` and publishes the release archive.
