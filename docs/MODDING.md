# PokéBonk Unbound — Modding Documentation

PokéBonk Unbound includes an offline-only mod engine located in `./mods/`. Mods never execute or inject in Online Mode and never touch online accounts or online save files.

**Core Modding API features** built directly into the mod engine (always available whenever the Offline Mod Engine is enabled, without requiring any extra enabler mod):
- **Custom Attacks** (`customMoves` / `movesDir`)
- **Custom Visual Effects (VFX)** (`customVfx` / `vfxDir`, inline move `vfx`, and `customUlt.vfx`)
- **Additive Custom Music & SFX** (`customMusic` / `musicDir` & `customSfx` / `sfxDir`)
- **Custom Pokéball Pickup Items** (`customItems` / `itemsDir`)
- **Custom Characters, Regions, Assets, Data Patches, Bundle Patches, Scripts & CSS**

All mod toggles, configuration, and per-mod actions are managed inside **Unbound Settings**. Non-cheat Offline build mod settings can also be pre-configured from **Unbound Settings** while in Online Mode, while Online Mode itself stays 100% vanilla and all gameplay-altering cheats remain locked until Offline Mode.

---

## 1. Folder Structure

The mod engine scans:
1. `%APPDATA%\pokebonk-unbound\mods` (or `<POKEBONK_UNBOUND_DATA_DIR>/mods`)
2. `./mods/` beside the executable (if present)

Each structured mod is a directory containing a `mod.json` manifest:

```text
mods/
  my-mod-id/
    mod.json
    characters/
      hero.json
      hero-pmd.png
      hero-shiny.png
      hero-front.png
      hero-portrait.png
      hero-icon.png
    audio/
      music/
        my-theme.ogg
      sfx/
        my-hit.ogg
    assets/
    style.css
    script.js
```

Standalone drop-in files placed directly in `./mods/` (`.css`, `.js`, `.patch.json`, `.png`, `.ogg`, `.glb`) are also detected and toggleable individually.

---

## 2. `mod.json` Manifest Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique mod identifier (defaults to folder name). |
| `name` | `string` | Display name shown in menus and Unbound Settings. |
| `version` | `string` | Semver version string (e.g. `"1.0.0"`). |
| `author` | `string` | Author name. |
| `description` | `string` | Short summary of what the mod adds. |
| `tags` | `string[]` | Searchable tags for the Mod Browser. |
| `maxDex` | `number` | Raises the Pokédex cap (vanilla is `251`, max standard is `1025`). |
| `regions` | `object[]` | Adds selectable region tabs in Character Select and Pokédex. |
| `characters` | `object[]` | Inline custom character definitions. |
| `charactersDir` | `string` | Relative directory containing `.json` character files (e.g. `"characters"`). |
| `customMoves` | `object[]` | Core API: inline custom attack definitions. |
| `movesDir` | `string` | Core API: relative directory containing `.json` attack files. |
| `customVfx` | `object[]` | Core API: reusable declarative GPU visual effect presets. |
| `vfxDir` | `string` | Core API: relative directory containing `.json` VFX preset files. |
| `customItems` | `object[]` | Inline custom Pokéball pickup item definitions. |
| `itemsDir` | `string` | Relative directory containing `.json` item files. |
| `customMusic` | `object[]` | Core API: additive custom music tracks (`.ogg`, `.mp3`, `.wav`, `.m4a`, `.webm`, `.flac`). |
| `musicDir` | `string` | Core API: relative directory of custom music `.json` descriptors or drop-in audio files. |
| `customSfx` | `object[]` | Core API: additive custom SFX clips routed through the native SFX bus. |
| `sfxDir` | `string` | Core API: relative directory of custom SFX `.json` descriptors or drop-in audio files. |
| `toolbarActions` | `object[]` | Action buttons displayed inside the mod's card in **Unbound Settings -> Installed Mods**. |
| `styles` | `string[]` | Relative CSS files injected into the game document. |
| `scripts` | `string[]` | Relative JS files executed in Offline Mode with `window.pokebonkModAPI`. |
| `assetsDir` | `string` | Directory whose files override matching game asset paths. |
| `assetAliases` | `object` | Map of `fromPath -> toPath` aliases (supports trailing `/` prefixes). |
| `dataPatches` | `string[]` | Relative JSON files patching `data/pokemon.json` stats or fields. |
| `bundlePatches` | `object[]` | Targeted exact or regex text replacements applied in memory to JS/CSS chunks. |
| `profilePatch` | `string` | Relative JSON file granting non-destructive species or biome unlocks. |
| `enableAllEvents` | `boolean` | Enables the seasonal events hub if true. |

---

## 3. Custom Characters

### ID Ranges

- **`252`–`1025`**: Official National Dex species. Loaded whenever the owning mod is enabled.
- **`2000`–`9999`**: Non-standard / custom characters. Automatically placed in the **Custom** region tab and gated by **Hyrule's Mods -> Custom Characters Enabler** (automatically enabled when a `2000+` character pack is turned on).

Characters start **locked by default** (`"unlock": false`) for standard progression. Set `"unlock": true` to unlock automatically, or provide a `toolbarActions` unlock button.

### Example Character Definition

```json
{
  "id": 2050,
  "key": "my-hero",
  "name": "My Hero",
  "gen": 99,
  "types": ["grass", "steel"],
  "stats": {
    "hp": 90,
    "atk": 115,
    "def": 90,
    "spa": 95,
    "spd": 90,
    "spe": 118
  },
  "role": "Striker",
  "passive": "sniper",
  "rank": "legendary",
  "color": "green",
  "start": true,
  "unlock": false,
  "cryFrom": 251,
  "kit": ["my-slash", "quick-attack", "razor-leaf", "hyper-beam"],
  "overrideLearnset": true,
  "customUlt": {
    "name": "Emerald Nova",
    "type": "grass",
    "cls": "physical",
    "desc": "Unleashes an expanding emerald shockwave around the fighter.",
    "tint": 3403130,
    "radius": 15,
    "dmgMul": 5.0,
    "dur": 1.8,
    "knock": 9
  },
  "flavor": "Custom fighter description.",
  "sprite": "characters/my-hero-front.png",
  "pmdSheet": "characters/my-hero-pmd.png",
  "pmdShinySheet": "characters/my-hero-shiny.png",
  "portrait": "characters/my-hero-portrait.png",
  "icon": "characters/my-hero-icon.png",
  "overrideSprite": true,
  "spriteMeta": {
    "w": 256,
    "h": 1024,
    "anims": {
      "walk":   { "y": 0,   "fw": 32, "fh": 32, "n": 8, "rows": 8, "d": [4, 4, 4, 4, 4, 4, 4, 4] },
      "idle":   { "y": 256, "fw": 32, "fh": 32, "n": 2, "rows": 8, "d": [18, 18] },
      "attack": { "y": 512, "fw": 32, "fh": 32, "n": 6, "rows": 8, "d": [3, 3, 3, 4, 4, 4] },
      "hurt":   { "y": 768, "fw": 32, "fh": 32, "n": 2, "rows": 8, "d": [8, 8] }
    }
  }
}
```

### Sprite Notes

- **Animated 8-direction PMD sheet (`pmdSheet` + `spriteMeta`)**:
  - Animation keys must be lowercase: `walk`, `idle`, `attack`, `hurt`.
  - Each animation specifies `y` (pixel Y offset in the sheet), `fw`/`fh` (frame width/height), `n` (frame count), `rows` (`8` directions: S, SE, E, NE, N, NW, W, SW), and `d` (array of frame durations in ticks).
  - Legacy `dirs` and `dur` keys are automatically normalized to `rows` and `d`.
- **Single-image fallback**: Omit `spriteMeta` and provide only `sprite` (a single PNG) or `pokeApiId` (an official PokéAPI sprite ID, optionally with `"pokeApiShiny": true`).
- **Portraits & Icons**: `portrait` is a 40x40 PNG; `icon` should have a transparent background so locked silhouettes render cleanly.
- **Audio & Ultimates**: Use `cry` (custom `.ogg`) or `cryFrom` (existing Pokédex ID). Use `customUlt` for a custom GPU shockwave Ultimate or `ultFrom` to inherit an existing Pokémon's Ultimate.
- **Quick Drop-In**: Place standalone character `.json` + `.png` files inside `./mods/custom-characters-pack/characters/` without creating a new mod folder.

---

## 4. Custom Attacks & Custom Visual Effects (Core API)

Custom attacks (`customMoves` / `movesDir`) and custom visual effects (`customVfx` / `vfxDir` or inline `vfx`) are first-class **Core Modding API** features active whenever the Offline Mod Engine is enabled. They run directly on PokéBonk's native GPU particle/beam/ring VFX and WebAudio SFX engine with no external texture files required.

### Valid Archetypes

The engine supports 23 native movement/hitbox archetypes:

`random`, `cone`, `wave`, `nova`, `smite`, `barrage`, `orbit`, `strike`, `spin`, `homing`, `dash`, `vortex`, `trap`, `meteor`, `lob`, `chain`, `bolt`, `boomerang`, `orb`, `beam`, `aura`, `trail`, `drain`

Aliases are normalized automatically: `slash`/`cleave` -> `strike`, `burst`/`blast` -> `nova`, `slam` -> `smite`, `spread` -> `barrage`, `shot` -> `bolt`.

### Extended `params` Tuning

Any custom move can tune gameplay behavior via `params`:
- `count` (projectile/strike count), `spread` (radians between projectiles), `pulses` (nova/burst pulse count)
- `dmgMul`, `cdMul` / `cd`, `areaMul` / `r`, `speedMul` / `speed`, `durMul` / `dur`, `pierce`
- `status` (`"burn"`, `"freeze"`, `"paralysis"`, `"poison"`, `"stun"`, `"root"`, `"wet"`, `"charm"`), `statusChance` (`0`–`1`)

### Declarative Custom Visual Effects (`customVfx` / inline `vfx`)

Define reusable VFX presets in `"customVfx"` (or `"vfxDir"`) and link them to moves via `"vfxId"`, or attach an inline `"vfx": { ... }` object directly to any move:

```json
"customVfx": [
  {
    "id": "link-picori-slash",
    "preset": "slash",
    "shape": "PixSlash",
    "color": "#4aff80",
    "color2": "#ffe866",
    "size": 1.35,
    "strikeArc": true,
    "strikeSparks": 9,
    "hitShape": "Twinkle",
    "hitColor": "#ffe866",
    "hitCount": 7
  }
],
"customMoves": [
  {
    "key": "picori-blade",
    "name": "Picori Blade",
    "type": "steel",
    "cls": "physical",
    "power": 78,
    "accuracy": 100,
    "pp": 25,
    "crit": 1,
    "flavor": "Link strikes swiftly with the sacred Picori Blade in twin emerald-gold sword arcs.",
    "archetype": "strike",
    "params": { "count": 2, "dmgMul": 1.15, "areaMul": 1.2, "cdMul": 0.85 },
    "vfxId": "link-picori-slash",
    "vfxPreset": "slash",
    "sfxPreset": "slash"
  }
]
```

#### Custom VFX Spec Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Preset identifier (when declared in `customVfx` / `vfxDir`). |
| `preset` | `string` | Optional vanilla `QT` move key to inherit base behavior from (e.g. `slash`, `razor-leaf`, `gust`, `psybeam`, `flamethrower`, `thunderbolt`, `shadow-ball`, `dragon-claw`). |
| `shape` | `string` | Native GPU particle shape from `O.*` (e.g. `Soft`, `Star`, `Spark`, `Ring`, `Leaf`, `Flame`, `Bubble`, `Flake`, `Bolt`, `Rock`, `Swirl`, `Crescent`, `Cross`, `Feather`, `Twinkle`, `Shard`, `Wisp`, `Gem`, `PixSlash`, `PixFlame`, `PixBolt`, `PixWave`, `PixTornado`, `PixLeaf`, `PixStar`, `PixSparkle`, `PixGem`). |
| `color` / `color2` | `string \| number` | Primary and secondary accent colors as hex strings (`"#4aff80"`) or 24-bit RGB integers (`4915072`). |
| `size` / `glow` | `number` | Particle scale multiplier and additive glow intensity (`0`–`1`). |
| `trailShape` / `trailColor` / `trailSize` / `trailRate` | mixed | Projectile trail particles (`trailRate`: `0`–`1`). |
| `hitShape` / `hitColor` / `hitCount` / `hitSize` / `hitSpeed` | mixed | Impact burst flash and particles. |
| `strikeArc` / `strikeSparks` | `boolean \| number` | Dual-color slash arc ribbons and spark burst for `strike` moves. |
| `beamWidth` / `beamCoreColor` | `number \| string` | Custom dual-layer beam width multiplier and inner core color for `beam` moves. |
| `ringStyle` / `ringColor` / `boomRing` / `boomCount` | mixed | Ground shockwave ring style from `k.*` (`Plain`, `Dashed`, `Ripple`, `Runes`, `Petals`, `Jagged`, `Flames`) and explosion burst count. |

#### Custom Ultimate VFX (`customUlt.vfx`)

Any character's `customUlt` can customize its shockwave rings and particle burst:

```json
"customUlt": {
  "name": "Four Sword Hurricane Spin",
  "type": "grass",
  "cls": "physical",
  "tint": 3403130,
  "radius": 15,
  "dmgMul": 5.2,
  "dur": 1.9,
  "knock": 9,
  "vfx": {
    "ringStyle": "Runes",
    "secondaryRingStyle": "Petals",
    "color2": "#ffe866",
    "particleShape": "PixSlash",
    "particleCount": 30
  }
}
```

- At runtime, `window.pokebonkVfx` lists available `shapes`, `rings`, and active custom `presets`, and `GET /local-api/mod-api/moves` / `GET /local-api/mod-api/vfx` return active definitions.
- Reference any attack's `key` inside any character's `kit` array.

---

## 5. Custom Pokéball Items (`customItems` / `itemsDir`)

Custom items enter PokéBonk's in-run Pokéball item pickup pool and reuse vanilla item icons (`items/<name>.png`).

```json
{
  "key": "gold-kinstone",
  "name": "Gold Kinstone",
  "desc": "+14% Crit Chance and +15% Luck.",
  "icon": "items/star-piece.png",
  "rarity": 2,
  "max": 3,
  "mods": [
    { "stat": "critChance", "add": 0.14 },
    { "stat": "luck", "add": 0.15 }
  ]
}
```

- `rarity`: `0` (Common), `1` (Uncommon), `2` (Rare), `3` (Epic).
- `mods`: Array of stat modifiers using either `add` (flat addition) or `mul` (multiplier). Common stats: `damage`, `moveSpeed`, `attackSpeed`, `critChance`, `critDamage`, `luck`, `maxHp`, `armor`, `area`, `pickup`, `xp`, `evasion`.

---

## 6. Custom Audio (Additive Music & SFX)

PokéBonk Unbound supports adding new music tracks and sound effects **without replacing any vanilla songs or SFX**. Supported audio formats: `.ogg`, `.mp3`, `.wav`, `.m4a`, `.webm`, and `.flac`.

### Custom Music (`customMusic` / `musicDir`)

Custom music tracks are registered additively alongside vanilla tracks. Built-in vanilla IDs (`menu`, `halloween-menu`, `johto-menu`, `dynamax-menu`, `ingame1`–`ingame5`, `boss`) are protected automatically; if a mod uses a colliding ID, it is namespaced as `<mod-id>-<id>`.

```json
"customMusic": [
  {
    "id": "forest-battle",
    "name": "Forest Battle",
    "desc": "Custom battle theme",
    "file": "audio/music/forest-battle.ogg",
    "pool": "ingame",
    "loop": 12.5,
    "volume": 0.9,
    "weight": 1
  },
  {
    "id": "boss-encounter",
    "name": "Boss Encounter",
    "desc": "Custom legendary boss theme",
    "file": "audio/music/boss-encounter.ogg",
    "pool": "boss",
    "loop": 4.2,
    "volume": 1.0
  }
]
```

| Field | Default | Description |
| --- | --- | --- |
| `id` | filename stem | Unique track ID. Served at `/assets/music/custom/<id>.<ext>`. |
| `name` | `id` | Display name in **Settings -> Audio -> Main Menu Music** and Unbound Settings. |
| `desc` | pool summary | Short subtitle shown in the in-game music list. |
| `file` | required | Relative path to the audio file inside the mod folder. |
| `pool` | `"custom"` | `"ingame"` adds the track to the random in-game BGM playlist alongside `ingame1`–`ingame5`; `"boss"` adds it to the boss music pool alongside `boss`; `"menu"` / `"custom"` make it selectable in Settings and playable via scripts. |
| `loop` | `0` | Loop start point in seconds (skips intro when repeating). |
| `volume` | `1.0` | Relative volume multiplier (`0.05`–`2.5`). |
| `weight` | `1` | Selection weight (`1`–`10`) when `pool` is `"ingame"` or `"boss"`. |

- **Zero-JSON drop-in**: Any audio file placed inside `musicDir` is auto-registered with `pool: "ingame"`.

### Custom SFX (`customSfx` / `sfxDir`)

Custom SFX clips decode once via Web Audio API and play through PokéBonk's native `sfxBus`, automatically respecting the in-game Master and SFX volume sliders without replacing vanilla sounds.

```json
"customSfx": [
  {
    "id": "picori-slash",
    "file": "audio/sfx/picori-slash.ogg",
    "volume": 0.95,
    "pitch": 1.0,
    "pitchVar": 0.08,
    "cooldown": 0.04
  }
]
```

| Field | Default | Description |
| --- | --- | --- |
| `id` | filename stem | Unique SFX ID. Served at `/assets/sfx/custom/<id>.<ext>`. |
| `file` | required | Relative path to the audio file inside the mod folder. |
| `volume` | `1.0` | Gain multiplier (`0.05`–`3.0`). |
| `pitch` | `1.0` | Base playback rate (`0.25`–`4.0`). |
| `pitchVar` | `0.05` | Random pitch jitter (`0`–`0.5`) to keep repeated hits organic. |
| `cooldown` | `0.03` | Minimum seconds between plays (`0`–`2.0`). |

### Binding Custom SFX to Attacks & Ultimates

- **On `customMoves`**: Set `"customSfx": "picori-slash"`, `"customImpactSfx": "hit-id"`, or `"customChargeSfx": "charge-id"` (or point directly to an audio file with `"sfx": "audio/sfx/slash.ogg"`, `"impactSfx"`, `"chargeSfx"`). Add `"layerSfx": true` to play both the custom sample and the vanilla `sfxPreset` together.
- **On `customUlt`**: Set `"customSfx": "ult-id"` inside a character's `customUlt` object.
- **Runtime Audio SDK (`window.pokebonkAudio`)**: Custom mod scripts can trigger audio directly at any time:
  - `window.pokebonkAudio.playMusic(id, offsetSec)`
  - `window.pokebonkAudio.stopMusic()`
  - `window.pokebonkAudio.playSfx(id, { volume, pitch, pitchVar })`
  - `window.pokebonkAudio.listMusic()` / `window.pokebonkAudio.listSfx()`
  - `GET /local-api/mod-api/audio` returns the active custom music and SFX catalog.

---

## 7. Mod Actions (`toolbarActions` in Unbound Settings)

Mods can declare action buttons that appear inside the mod's card in **Unbound Settings -> Installed Mods** when the mod is enabled. Non-cheat actions (such as opening a mod subfolder) work in any mode; profile-mutating unlock/cheat actions remain locked until Offline Mode.

Supported item shapes:

```json
"toolbarActions": [
  {
    "id": "unlock-my-hero",
    "label": "Unlock My Hero",
    "type": "profile-mutate",
    "mutation": { "unlockSpecies": [2050] },
    "reload": true
  },
  { "type": "separator" },
  {
    "label": "More Options",
    "submenu": [
      {
        "label": "Open Characters Folder",
        "type": "open-mod-subdir",
        "subdir": "characters"
      }
    ]
  }
]
```

### Supported `profile-mutate` Keys

- `addStardust` (`number`) / `addBonk` (`number`)
- `unlockSpecies` (`number[]`) / `unlockSpeciesRange` (`[fromId, toId]`) with optional `rangeIncludeLeague` (`boolean`) and `researchLevel` (`number`)
- `unlockShinies` (`number[]`) / `unlockShiniesRange` (`[fromId, toId]`)
- `unlockAllVanillaBiomes` (`boolean`) / `unlockBiomes` (`{ [biomeId]: tier }`)
- `setBag` (`{ [itemId]: qty }`)
- `maxAllLab` (`boolean`)
- `expedition` (`{ addCoins, addSeals, addMats }`)
- `setLastSpecies` (`number`)
- `resetProfile` (`boolean`) — pair with `"confirm": "Confirmation message..."`

---

## 8. Scripts, Styles, Assets & Patches

### Runtime Mod SDK (`scripts`)

Scripts listed in `"scripts"` execute in Offline Mode with access to `window.pokebonkModAPI`:
- `GET /local-api/mod-api/profile` — active offline profile (with non-destructive mod patches)
- `GET /local-api/mod-api/characters` — active custom characters, regions, and `maxDex`
- `GET /local-api/mod-api/moves` — active custom attacks
- `GET /local-api/mod-api/vfx` — active custom VFX presets
- `GET /local-api/mod-api/audio` — active additive custom music and SFX catalog
- `POST /local-api/mod-api/mutate` — apply a profile mutation (Offline Mode + Mods ON only)

### Asset Overrides & Aliases

- `assetsDir`: Files matching a game asset path (e.g. `assets/ui/maps/forest.webp` or `ui/maps/forest.webp`) replace the vanilla file in Offline Mode.
- `assetAliases`: Redirects an asset path or folder prefix to another game asset path (useful for reusing vanilla biome environment packs or cries).

### Bundle Patches (`bundlePatches`)

Apply in-memory replacements to served JS/CSS chunks without modifying files on disk:

```json
"bundlePatches": [
  {
    "matchFile": "^assets/assets-.*\\.js$",
    "patches": [
      { "mode": "exact", "find": "oldText", "replace": "newText", "all": false },
      { "mode": "regex", "find": "pattern", "flags": "g", "replace": "replacement" }
    ]
  }
]
```

---

## 9. Mod Showcase File (`info.json`) & GitHub Mod Browser

Unbound Settings' **Mod Browser** reads from `HyruleChosenOne/Pokebonk-Unbound` (`mods-database/` on `main`) by default and supports any public GitHub `owner/repo`.

### Mod Info Showcase File (`info.json`)

Every mod folder can include an `info.json` alongside `mod.json` to showcase its description, highlights, category, requirements, and banner image in both the in-app **Mod Browser** and `mods-datas.md`:

```json
{
  "id": "my-mod-id",
  "name": "My Mod Name",
  "version": "1.0.0",
  "author": "AuthorName",
  "category": "Characters",
  "tagline": "Short summary shown on the Mod Browser card.",
  "description": "Full showcase description shown when expanding Details in the Mod Browser.",
  "highlights": [
    "Playable fighter with 8-direction animations",
    "Custom attacks and GPU VFX presets"
  ],
  "image": "preview.png",
  "requirements": "Offline Mode (Mod Engine ON)"
}
```

- **`image`**: Relative path inside the mod folder (e.g. `"preview.png"`, recommended `16:9` aspect ratio such as `640x360` or `960x540`) or an external `https://` image URL. If the image file is not added yet, the Mod Browser automatically renders a clean placeholder banner.

### Option A: Curated `mods-database/mods-index.json` (Recommended)

Add a `mods-database/mods-index.json` file (generated automatically via `node scripts/sync-mods-database.js`) listing each mod's metadata, `info.json` showcase fields, preview image path, folder path, and explicit file list:

```json
{
  "schemaVersion": 2,
  "mods": [
    {
      "id": "my-mod-id",
      "name": "My Mod Name",
      "version": "1.0.0",
      "author": "AuthorName",
      "category": "Characters",
      "tagline": "Short summary.",
      "fullDescription": "Full showcase description.",
      "highlights": ["Feature 1", "Feature 2"],
      "infoFile": "info.json",
      "image": "preview.png",
      "hasImage": true,
      "tags": ["character", "audio"],
      "path": "mods-database/my-mod-id"
    }
  ]
}
```

### Option B: Automatic Folder Discovery

Place each mod in its own folder under `mods-database/` or `mods/` containing `mod.json` (and optionally `info.json` + `preview.png`):

```text
repo/
  mods-database/
    my-mod-id/
      mod.json
      info.json
      preview.png
      characters/
        ...
```

The Mod Browser scans the repository via GitHub's API, reads `mod.json` and `info.json`, and downloads all files recursively into `<dataRoot>/mods/<id>/` when the user clicks **Install**.
