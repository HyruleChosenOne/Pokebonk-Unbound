<p align="center">
  <img src="docs/assets/logo.png" alt="PokéBonk Unbound" width="460" />
</p>

<p align="center">
  Cross-platform client for <a href="https://pokebonk.com/">PokéBonk</a> (Windows, Linux / SteamOS, and Android) with isolated Online Mode, self-contained Offline Mode, global 11-language translation synced across modes, multi-profile saves, dynamic mod settings, in-app updates, and an offline modding engine.
</p>

---

## Features

- **Cross-Platform Client (Windows, Linux / SteamOS & Android)**
  - **Windows & Linux (SteamOS / Steam Deck)**: Full Electron desktop client with native toolbar, dynamic status icons, `1280x800` Steam Deck support, and Wayland/X11 auto-detection (`--ozone-platform-hint=auto`).
  - **Android (`minSdk 24` — Android 7.0 through Android 17+)**: Universal APK (`arm64-v8a`, `armeabi-v7a`, `x86_64`) with 16 KB page-size aligned Node.js runtime, streamlined 3-panel **Unbound Settings** (`Settings` | `Mods` with built-in Installed / Mod Configs / Mod Browser | `Versions`), and a redesigned edge-docking **Unbound** button that automatically hides during active gameplay sessions and reappears on menus.

- **Global 11-Language Translation (Online & Offline Synced)**
  - Supports all 11 languages from base PokéBonk: English, Español, Português, Français, Deutsch, Italiano, 日本語, 한국어, Русский, 简体中文, and 繁體中文.
  - Defaults automatically to your in-game PokéBonk language (`pokebonk.lang`) and persists seamlessly between Online Mode and Offline Mode across all menus, settings, and mod browsers.

- **Isolated Online Mode**
  - Runs `https://pokebonk.com/` in a dedicated, sandboxed browser session (`persist:pokebonk-unbound-online`) with no request interception and no injected scripts.
  - Online Mode stays 100% vanilla and never loads mods or touches online saves (only your chosen language preference stays synced with Offline Mode).
  - Non-cheat Offline mod settings can be configured in advance from **Unbound Settings** while in Online Mode; all gameplay-altering cheats (Run Speed, God Mode, Overdrive, Difficulty Unlocks) and save unlock tools remain strictly locked until you switch to Offline Mode.
  - Includes one-click Online savefile export and one-way sync to Offline Mode.

- **1:1 Vanilla Offline Mode**
  - Serves PokéBonk locally from `127.0.0.1` with same-origin local API emulation across Windows, Linux, and Android, a local-only multi-profile leaderboard, fresh **PokéBonk Unbound** release notes, and direct **GitHub** + **Creator X (`@ImCharcher`)** links on the menu.
  - Releases ship clean without bundled mods — Offline Mode runs pure 1:1 vanilla out of the box.

- **Multi-Profile Local Save System**
  - Create, switch, rename, import, export, and delete independent offline trainer profiles.
  - Logging out opens the profile chooser; if no offline profiles exist yet, you are prompted to enter a trainer name before starting.

- **Local Build Version History & Client Updates**
  - Maintain, switch, **Rebuild Current Version**, or **Delete Past Versions** between the bundled Preserved Build (`v0.10.31`) and synced Live Updates from `pokebonk.com` inside **Unbound Settings**.
  - Built-in **Check for Updates** queries `HyruleChosenOne/Pokebonk-Unbound` GitHub Releases and downloads/installs newer client versions right from the app.

- **Core Offline Modding Engine (`./mods/`) & Co-op Mod Parity**
  - Built-in core API support for **Custom Attacks**, **Custom Visual Effects (VFX)**, **Additive Custom Music & SFX** (without replacing vanilla songs), **Custom Playable Characters** (8-direction animated spritesheets, shiny variants, portraits, icons, cries, and custom Ultimates), **Custom Stages & Regions**, **Custom Pokéball Items**, declarative **Mod Settings**, asset overrides, JSON data patches, bundle patches, scripts, and CSS.
  - **Co-op Gameplay Mod Parity**: Direct IP:Port P2P Co-op automatically verifies that Host and joining players have matching **Gameplay** mods (custom characters, attacks, levels, items) on the same version, while allowing **Client** mods (music packs, UI, themes) to differ freely.
  - See [docs/MODDING.md](docs/MODDING.md) for the complete modding reference.

- **Streamlined Unbound Settings, Deferred Refresh & Reworked Mod Browser**
  - Clean desktop top toolbar (`Mode | Saves | Unbound Settings`) and streamlined Android 3-panel layout (`Settings | Mods | Versions`) with built-in **Mod Browser** and **Mod Configs** inside the **Mods** panel.
  - Toggling mods or settings displays an unobtrusive **Refresh Required** button so you can make multiple changes and refresh the game once when ready.
  - Reworked **Mod Browser** with **Hyrule's Collection** pinned as **Essential**, auto-enabled downloads by default, **Installed Mods** grouped at the bottom, **Gameplay** / **Client** Co-op scope badges, **Featured** star highlights & filter (highlighting **Hyrule's Collection** and **Gen 3-9** packs), live **Total Downloads** counters, exact **Mod Size**, full-sized thumbnail previews with click-to-expand lightbox, and fast 1-click installs from `HyruleChosenOne/Pokebonk-Unbound` or any custom GitHub `owner/repo`.

---

## Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <a href="docs/assets/screenshots/modding-gen3-9.png">
        <img src="docs/assets/screenshots/modding-gen3-9.png" alt="Modding — Gen 3-9 National Dex" width="420" />
      </a>
      <br />
      <strong>Modding (Gen 3–9 National Dex)</strong>
      <br />
      <sub>Playable Hoenn–Paldea roster, custom Gen 3–9 attacks, and signature Ultimates.</sub>
    </td>
    <td align="center" width="50%">
      <a href="docs/assets/screenshots/custom-levels.png">
        <img src="docs/assets/screenshots/custom-levels.png" alt="Modding — Gen 3-9 Custom Levels" width="420" />
      </a>
      <br />
      <strong>Modding (Gen 3–9 Regions &amp; Levels)</strong>
      <br />
      <sub>14 playable maps across 7 regions with unique terrain, sanctuaries, and 3D landmarks.</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="docs/assets/screenshots/p2p-coop.png">
        <img src="docs/assets/screenshots/p2p-coop.png" alt="P2P Online Co-op" width="420" />
      </a>
      <br />
      <strong>P2P Online (Direct IP:Port Co-op)</strong>
      <br />
      <sub>Functional peer-to-peer co-op hosting and joining via IP:Port.</sub>
    </td>
    <td align="center" width="50%">
      <a href="docs/assets/screenshots/profiles.png">
        <img src="docs/assets/screenshots/profiles.png" alt="Offline Profiles" width="420" />
      </a>
      <br />
      <strong>Offline Profiles</strong>
      <br />
      <sub>Compact multi-profile local save chooser right on the Offline start screen.</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="docs/assets/screenshots/offline-menu.png">
        <img src="docs/assets/screenshots/offline-menu.png" alt="Offline Main Menu & Local Leaderboard" width="420" />
      </a>
      <br />
      <strong>Offline Main Menu &amp; Local Leaderboard</strong>
      <br />
      <sub>Local multi-profile leaderboard, restored Seasonal Events hub, and P2P Co-op.</sub>
    </td>
    <td align="center" width="50%">
      <a href="docs/assets/screenshots/unbound-mod-browser.png">
        <img src="docs/assets/screenshots/unbound-mod-browser.png" alt="Unbound Settings & Mod Browser" width="420" />
      </a>
      <br />
      <strong>Unbound Settings &amp; Mod Browser</strong>
      <br />
      <sub>1-click GitHub mod installs, version history, and per-mod configuration.</sub>
    </td>
  </tr>
</table>

---

## Release Editions (v1.0.2)

Clean builds for **Windows**, **Linux / SteamOS**, and **Android** are provided on the [Releases](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases) page. Neither Portable nor Complete comes bundled with mods — install any optional mod with 1 click through **Unbound Settings -> Mod Browser** (downloaded mods are enabled automatically by default).

| Platform | Edition | Output File | Bundled PokéBonk Version | Notes |
| --- | --- | --- | --- | --- |
| **Windows (x64)** | **Portable** | `PokeBonk-Unbound-Portable-1.0.2.exe` | Downloaded on demand | Lightweight shell + Online Mode; switching to Offline Mode downloads the latest live build into `./build-data/`. |
| **Windows (x64)** | **Complete** | `PokeBonk-Unbound-Complete-1.0.2.exe` | **PokéBonk `v0.10.31`** (build `mwv6wzyo`) | Self-contained executable bundling the complete `v0.10.31` offline build, all 74 3D models, and sprites out of the box (updatable anytime). |
| **Linux / SteamOS (x64)** | **Portable** | `PokeBonk-Unbound-Portable-1.0.2-linux-x64.tar.gz` | Downloaded on demand | Extract and run `./Pokebonk-Unbound.sh` (or add to Steam as a Non-Steam Game on Steam Deck). Includes `./install-desktop-shortcut.sh`. |
| **Linux / SteamOS (x64)** | **Complete** | `PokeBonk-Unbound-Complete-1.0.2-linux-x64.tar.gz` | **PokéBonk `v0.10.31`** (build `mwv6wzyo`) | Self-contained Linux/SteamOS archive bundling the complete `v0.10.31` offline build, all 74 3D models, and sprites (zero bundled mods). |
| **Android (7.0–17+ Universal)** | **Portable** | `PokeBonk-Unbound-Portable-1.0.2.apk` | Downloaded on demand | Universal 16 KB-aligned APK (`arm64-v8a`, `armeabi-v7a`, `x86_64`) with auto-hiding floating **Unbound** button and 3-panel mobile **Unbound Settings**. |
| **Android (7.0–17+ Universal)** | **Complete** | `PokeBonk-Unbound-Complete-1.0.2.apk` | **PokéBonk `v0.10.31`** (build `mwv6wzyo`) | Self-contained universal 16 KB-aligned APK bundling the complete `v0.10.31` offline build, all 74 3D models, and sprites (zero bundled mods). |

### Platform Quick Start

- **SteamOS / Steam Deck**: Extract the `.tar.gz` in Desktop Mode, run `./Pokebonk-Unbound.sh` (or `./install-desktop-shortcut.sh`), or right-click `Pokebonk-Unbound.sh` -> **Add to Steam** to launch from Gaming Mode (`1280x800` supported natively).
- **Android**: Install either the **Portable** or **Complete** `.apk` (`minSdk 24`, compatible with Android 7.0 through Android 17+ including 16 KB page-size devices like Pixel 9/10/11 series). Tap the floating **Unbound** emblem on any menu to switch modes, manage profiles, change language, or browse/install mods — it automatically tucks to the screen edge and hides cleanly during active runs.

---

## Available Mods

Mods are not bundled in the releases and are installed on demand through **Unbound Settings -> Mod Browser**.

For the full catalog of official available mods, descriptions, preview images, and highlights, see **[mods-datas.md](mods-datas.md)**.

---

## Shortcuts

- `F1` — Show / hide the top native toolbar
- `F11` — Toggle fullscreen
- `Alt+Left` / `Alt+Right` — Browser back / forward

---

## Data Storage

- **Windows**:
  - Offline Build Data (`versions/`, `pokeapi/`, `pokeapi-sprites/`): `./build-data/` beside the `.exe` (fallback `%APPDATA%\pokebonk-unbound\build-data`). Override with `POKEBONK_UNBOUND_BUILD_DIR`.
  - Saves, Profiles, Mods & Sessions: `%APPDATA%\pokebonk-unbound` (also reads `./mods/` beside the `.exe` if present). Override with `POKEBONK_UNBOUND_DATA_DIR`.
- **Linux / SteamOS**:
  - Offline Build Data: `./build-data/` beside the extracted folder or AppImage (fallback `~/.config/pokebonk-unbound/build-data`).
  - Saves, Profiles, Mods & Sessions: `~/.config/pokebonk-unbound` (also reads `./mods/` beside the folder if present).
- **Android**:
  - Offline Build Data, Saves, Profiles & Installed Mods: stored in the app's private data directory (`/data/data/com.hyrulechosenone.pokebonkunbound/files/pokebonk-data`), with in-app JSON save export/import and 1-click Mod Browser installation.

---

## Building from Source

Requires Node.js 20+ and npm (plus Android SDK & NDK for Android APKs).

```bash
npm install
```

### Run in Development

```bash
npm start
```

### Bundle the Complete Offline Build (Required for Complete Editions)

The repository excludes the upstream PokéBonk build files (`bundled-build/`). To download and package a local copy from `pokebonk.com`:

```bash
npm run bundle:offline
```

### Run Verification Tests

```bash
npm test
```

### Build Platform Releases

```bash
# Windows Portable & Complete (.exe)
npm run build:portable
npm run build:complete

# Linux / SteamOS Portable & Complete (.tar.gz / .AppImage on Linux)
npm run build:linux:portable
npm run build:linux:complete

# Android Universal 16 KB-aligned Portable & Complete (.apk)
npm run build:android:all
```

---

## Modding Documentation

For mod creation, `mod.json` and `info.json` showcase schemas, core custom attacks, custom visual effects (VFX), additive custom music & SFX, custom characters, custom Pokéball items, and GitHub Mod Browser publishing, see **[docs/MODDING.md](docs/MODDING.md)**.

---

## Credits

- **PokéBonk** — Created by Charcher ([pokebonk.com](https://pokebonk.com/))
- **PMD Sprite Assets** — PMD SpriteCollab and community contributors
- **PokéBonk Unbound** — Built by HyruleChosenOne
