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
  - Online Mode stays 100% vanilla and never loads mods or touches online saves.
  - Non-cheat Offline mod settings can be configured in advance from **Unbound Settings** while in Online Mode; all gameplay-altering cheats (Run Speed, God Mode, Overdrive, Difficulty Unlocks) and save unlock tools remain strictly locked until you switch to Offline Mode.
  - Includes one-click Online savefile export and one-way sync to Offline Mode.

- **1:1 Vanilla Offline Mode**
  - Serves PokéBonk locally from `127.0.0.1` with local API emulation and a local-only multi-profile leaderboard.
  - Releases ship clean without bundled mods — Offline Mode runs pure 1:1 vanilla out of the box.

- **Multi-Profile Local Save System**
  - Create, switch, rename, import, export, and delete independent offline trainer profiles.
  - Logging out opens the profile chooser; if no offline profiles exist yet, you are prompted to enter a trainer name before starting.

- **Local Build Version History**
  - Maintain and switch between the bundled Preserved Build and synced Live Updates from `pokebonk.com` inside **Unbound Settings**.

- **Core Offline Modding Engine (`./mods/`)**
  - Built-in core API support for **Custom Attacks**, **Custom Visual Effects (VFX)**, **Additive Custom Music & SFX** (without replacing vanilla songs), **Custom Playable Characters** (8-direction animated spritesheets, shiny variants, portraits, icons, cries, and custom Ultimates), **Custom Pokéball Items**, asset overrides, JSON data patches, bundle patches, scripts, and CSS.
  - See [docs/MODDING.md](docs/MODDING.md) for the complete modding reference.

- **Streamlined Toolbar, Unbound Settings & Mod Browser**
  - Clean top toolbar (`Mode | Saves | Unbound Settings`) with dynamic status indicator icons.
  - All mod toggles, per-mod actions, version history, local profiles, and the in-app **Mod Browser** (pulling directly from `mods-database/` in `HyruleChosenOne/Pokebonk-Unbound` or any custom GitHub `owner/repo`) live inside **Unbound Settings**.

---

## Release Editions (v1.0.0)

Two Windows portable executables are provided on the [Releases](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases) page. Neither release comes bundled with mods — install any optional mod with 1 click through **Unbound Settings -> Mod Browser**.

| Edition | Output File | Contents |
| --- | --- | --- |
| **Portable** | `PokeBonk-Unbound-Portable-1.0.0.exe` | Lightweight client shell and Online Mode. Switching to Offline Mode automatically downloads the full offline build into `./build-data/` alongside the executable. |
| **Complete** | `PokeBonk-Unbound-Complete-1.0.0.exe` | Self-contained release bundling the complete offline game build and sprites out of the box (no bundled mods). |

---

## Available Mods

Mods are not bundled in the executables and are installed on demand through **Unbound Settings -> Mod Browser**.

For the full catalog of official available mods, descriptions, preview images, and highlights, see **[mods-datas.md](mods-datas.md)**.

---

## Shortcuts

- `F1` — Show / hide the top native toolbar
- `F11` — Toggle fullscreen
- `Alt+Left` / `Alt+Right` — Browser back / forward

---

## Data Storage

- **Offline Build Data (`versions/`, `pokeapi/`, `pokeapi-sprites/`)**: Stored in `./build-data/` alongside the `.exe` folder (falls back to `%APPDATA%\pokebonk-unbound\build-data` if the executable directory is read-only). Override with `POKEBONK_UNBOUND_BUILD_DIR`.
- **Savefiles, Profiles & Session Data (`saves/`, preferences, browser sessions)**: Stored in `%APPDATA%\pokebonk-unbound` on Windows so saves and sessions stay consistent across editions. Override with `POKEBONK_UNBOUND_DATA_DIR`.
- **Mods**: Downloaded by the Mod Browser into `%APPDATA%\pokebonk-unbound\mods` (also reads `./mods/` beside the executable if created manually).

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

### Bundle the Complete Offline Build (Required for Complete Edition)

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
# Portable edition (lightweight, downloads offline build on demand)
npm run build:portable

# Complete edition (includes bundled-build/, zero bundled mods)
npm run build:complete
```

---

## Modding Documentation

For mod creation, `mod.json` and `info.json` showcase schemas, core custom attacks, custom visual effects (VFX), additive custom music & SFX, custom characters, custom Pokéball items, and GitHub Mod Browser publishing, see **[docs/MODDING.md](docs/MODDING.md)**.

---

## Credits

- **PokéBonk** — Created by Charcher ([pokebonk.com](https://pokebonk.com/))
- **PMD Sprite Assets** — PMD SpriteCollab and community contributors
- **PokéBonk Unbound** — Built by HyruleChosenOne
