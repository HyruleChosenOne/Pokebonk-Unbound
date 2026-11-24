# PokéBonk Unbound — Modding Documentation

PokéBonk Unbound includes an offline-only mod engine located in `./mods/`. Mods never load in Online Mode and do not touch online accounts or save files.

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
| `customMoves` | `object[]` | Inline custom attack definitions. |
| `movesDir` | `string` | Relative directory containing `.json` attack files. |
| `customItems` | `object[]` | Inline custom Pokéball pickup item definitions. |
| `itemsDir` | `string` | Relative directory containing `.json` item files. |
| `customMusic` | `object[]` | Additive custom music tracks (`.ogg`, `.mp3`, `.wav`, `.m4a`, `.webm`, `.flac`). |
| `musicDir` | `string` | Relative directory of custom music `.json` descriptors or drop-in audio files. |
| `customSfx` | `object[]` | Additive custom SFX clips routed through the native SFX bus. |
| `sfxDir` | `string` | Relative directory of custom SFX `.json` descriptors or drop-in audio files. |
| `toolbarActions` | `object[]` | Adds entries to Offline Mode's **Mod Options** toolbar menu. |
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

## 4. Custom Attacks (`customMoves` / `movesDir`)

Custom attacks use PokéBonk's native GPU particle VFX and procedural WebAudio SFX engine — no external VFX textures or sound files are required.

### Valid Archetypes

The engine supports 23 native movement/hitbox archetypes:

`random`, `cone`, `wave`, `nova`, `smite`, `barrage`, `orbit`, `strike`, `spin`, `homing`, `dash`, `vortex`, `trap`, `meteor`, `lob`, `chain`, `bolt`, `boomerang`, `orb`, `beam`, `aura`, `trail`, `drain`

Aliases are normalized automatically: `slash`/`cleave` -> `strike`, `burst`/`blast` -> `nova`, `slam` -> `smite`, `spread` -> `barrage`, `shot` -> `bolt`.

### Example Custom Attack

```json
{
  "key": "emerald-slash",
  "name": "Emerald Slash",
  "type": "steel",
  "cls": "physical",
  "power": 78,
  "accuracy": 100,
  "pp": 20,
  "crit": 1,
  "ailment": null,
  "ailmentChance": 0,
  "flinch": 0,
  "drain": 0,
  "healing": 0,
  "flavor": "Cuts enemies in a wide emerald arc.",
  "archetype": "strike",
  "params": { "r": 3.1, "arc": 2.35, "cd": 0.78 },
  "vfxPreset": "slash",
  "sfxPreset": "slash",
  "vfxColor": 4915072,
  "vfxSize": 1.25
}
```

- `vfxPreset` / `sfxPreset`: Any existing vanilla move key (e.g. `slash`, `flamethrower`, `psybeam`, `razor-leaf`, `thunderbolt`, `gust`, `ember`, `shadow-ball`, `quick-attack`, `hyper-beam`).
- `vfxColor`: 24-bit decimal RGB integer (e.g. `0x4AFF80` = `4915072`).
- `vfxShape` (optional): Native particle shape key (defaults to `Soft`).
- Reference the attack's `key` inside any character's `kit` array.

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

## 7. Dynamic Toolbar Actions (`toolbarActions`)

Mods can declare entries that appear under Offline Mode's **Mod Options** menu when the mod is enabled.

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

## 9. Publishing Mods to the GitHub Mod Browser

Unbound Settings' **Mod Browser** reads from `HyruleChosenOne/Pokebonk-Unbound` (`mods-database/` on `main`) by default and supports any public GitHub `owner/repo`.

### Option A: Curated `mods-database/mods-index.json` (Recommended)

Add a `mods-database/mods-index.json` file (or root `mods-index.json`) listing each mod's metadata, folder path, and optional explicit file list:

```json
{
  "mods": [
    {
      "id": "my-mod-id",
      "name": "My Mod Name",
      "version": "1.0.0",
      "author": "AuthorName",
      "description": "Short description.",
      "tags": ["character", "audio"],
      "path": "mods-database/my-mod-id"
    }
  ]
}
```

### Option B: Automatic Folder Discovery

Place each mod in its own folder under `mods-database/` or `mods/` containing a `mod.json`:

```text
repo/
  mods-database/
    my-mod-id/
      mod.json
      characters/
        ...
```

The Mod Browser scans the repository via GitHub's API, reads each `mod.json`, and downloads all files recursively into `<dataRoot>/mods/<id>/` when the user clicks **Install**.
