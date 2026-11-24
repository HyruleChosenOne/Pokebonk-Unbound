<p align="center">
  <img src="docs/assets/logo.png" alt="PokéBonk Unbound" width="460" />
</p>

<p align="center">
  Desktop client for <a href="https://pokebonk.com/">PokéBonk</a> with isolated Online Mode, self-contained Offline Mode, local build versioning, multi-profile saves, and an offline modding engine.
</p>

---

## Features

- **Isolated Online Mode**
  - Runs `https://pokebonk.com/` in a dedicated, sandboxed browser session (`persist:pokebonk-unbound-online`) with no request interception and no injected scripts.
  - Mods and trainer tools are strictly locked to Offline Mode and never touch Online Mode or online saves.
  - Includes one-click Online savefile export and one-way sync to Offline Mode.

- **1:1 Vanilla Offline Mode**
  - Serves PokéBonk locally from `127.0.0.1` with local API emulation.
  - When **Enable Mods** is turned off, Offline Mode runs vanilla PokéBonk without gameplay alterations.

- **Multi-Profile Local Save System**
  - Create, switch, rename, import, export, and delete independent offline trainer profiles.
  - Logging out opens the profile chooser; if no offline profiles exist yet, you are prompted to enter a trainer name before starting.

- **Local Build Version History**
  - Maintain and switch between the bundled Preserved Build and synced Live Updates from `pokebonk.com` inside the Control Center.

- **Offline Mod Engine (`./mods/`)**
  - Supports custom playable characters (animated 8-direction spritesheets, shiny variants, portraits, icons, cries, and custom Ultimates), custom attacks using the native GPU VFX and WebAudio SFX engine, custom Pokéball pickup items, custom procedural and 3D `.glb` levels (with automatic triangle-mesh height/wall collision baking and procedural POI spawning), asset overrides, JSON data patches, bundle patches, scripts, and CSS.
  - See [docs/MODDING.md](docs/MODDING.md) for the complete modding reference.

- **Control Center & GitHub Mod Browser**
  - Manage game builds, toggle mods, configure Hyrule's Mods options, manage local profiles, and browse/install mods directly from a GitHub repository (`HyruleChosenOne/pokebonk-mods` by default, or any custom `owner/repo`).

---

## Release Editions

Two Windows portable executables are provided:

| Edition | Output File | Contents |
| --- | --- | --- |
| **Portable Web** | `PokeBonk-Unbound-Portable-Web-2.0.0.exe` | Lightweight client shell and Online Mode. Switching to Offline Mode automatically downloads the full live build on first launch. |
| **Complete Live** | `PokeBonk-Unbound-Complete-Live-2.0.0.exe` | Self-contained release bundling the complete offline game build, sprites, and optional mods out of the box. |

---

## Included Optional Mods

All shipped mods start **disabled by default** and operate exclusively in Offline Mode:

| Mod ID | Description |
| --- | --- |
| `hyrules-mods` | Quality-of-life, enablers, and trainer cheats collection: Custom Characters Enabler, Events Enabler (Choose-Mode hub preserving wallpaper/music), P2P `IP:Port` Multiplayer, Main Menu 3D Background & Music selector, Run Speed (`1×`/`1.5×`/`2×`), Unlock All Difficulties, Clean Main Menu, God Mode, Overdrive, and profile/unlock tools. |
| `minish-cap-link` | Playable Link (*The Minish Cap*) with 8-direction animated sprites, Four Sword Red shiny variant, 5 custom attacks, Four Sword Hurricane Spin Ultimate, 2 custom Hyrule Pokéball items, and the Minish Woods procedural level. |
| `custom-characters-pack` | 5 custom forms (Mega Rayquaza, Primal Groudon, Primal Kyogre, Mega Mewtwo X, Ash-Greninja), 10 custom attacks, 5 signature Ultimates, and 3 custom Pokéball items. Also supports drop-in character JSONs in `characters/`. |
| `national-dex-gen3-9` | Gen 3–9 National Dex expansion covering 7 regions, 419 base families, 72 custom attacks, and 24 signature Ultimates. |

---

## Shortcuts

- `F1` — Show / hide the top native toolbar
- `F11` — Toggle fullscreen
- `Alt+Left` / `Alt+Right` — Browser back / forward

---

## Data Storage

- **Offline Build Data (`versions/`, `pokeapi/`, `pokeapi-sprites/`)**: Stored in `./build-data/` alongside the `.exe` folder (falls back to `%APPDATA%\pokebonk-unbound\build-data` if the executable directory is read-only). Override with `POKEBONK_UNBOUND_BUILD_DIR`.
- **Savefiles, Profiles & Session Data (`saves/`, preferences, browser sessions)**: Stored in `%APPDATA%\pokebonk-unbound` on Windows so saves and sessions stay consistent across editions. Override with `POKEBONK_UNBOUND_DATA_DIR`.
- **Mods**: Loaded from `%APPDATA%\pokebonk-unbound\mods` and `./mods/` beside the executable.

---

## Building from Source

Requires Node.js 20+ and npm.

```bash
npm install
```

### Run in Development

```bash
npm start
```

### Bundle the Complete Offline Build (Required for Complete Live Edition)

The repository excludes the upstream PokéBonk build files (`bundled-build/`). To download and package a local copy from `pokebonk.com`:

```bash
npm run bundle:offline
```

### Run Verification Tests

```bash
npm test
```

### Build Windows Executables

```bash
# Portable Web edition (lightweight, downloads offline build on demand)
npm run build:portable-web

# Complete Live edition (includes bundled-build/ and default mods)
npm run build:complete
```

---

## Modding Documentation

For mod creation, `mod.json` schemas, custom characters, custom attacks, custom Pokéball items, procedural and 3D `.glb` levels, and GitHub Mod Browser publishing, see **[docs/MODDING.md](docs/MODDING.md)**.

---

## Credits

- **PokéBonk** — Created by Charcher ([pokebonk.com](https://pokebonk.com/))
- **PMD Sprite Assets** — PMD SpriteCollab and community contributors
- **PokéBonk Unbound** — Built by HyruleChosenOne
