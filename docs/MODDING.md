# PokéBonk Unbound — Modding Documentation

PokéBonk Unbound runs an offline-only mod engine out of `./mods/`. Mods never load or inject in Online Mode, and they never touch online accounts or online save files.

Everything below is part of the core Modding API and works out of the box whenever the Offline Mod Engine is enabled (no helper or enabler mod required):
- **Custom Playable Characters** (`characters` / `charactersDir`), including **Playable 3D `.glb`/`.gltf` Models** and **Custom Wardrobe / Dual Shiny** sheets & portraits
- **Custom Unplayable Enemies** (`customEnemies` / `enemiesDir`) with strict opt-in spawning (never playable, never shiny, never catchable, never leaking into vanilla maps)
- **Custom Attacks** (`customMoves` / `movesDir`) and **Custom GPU Visual Effects (VFX)** (`customVfx` / `vfxDir`, inline move `vfx`, and `customUlt.vfx`)
- **Custom Pokéball Pickup Items** (`customItems` / `itemsDir`)
- **Custom Levels, Procedural Terrain & 3D `.glb` Stages** (`customLevels` / `levelsDir`): vanilla-like terrain co-existing with layered `proceduralGen`, `prefabScatters`, and 3D `.glb` arenas
- **Custom Map Mechanics & Prefabs** (`customPrefabs` / `prefabsDir`, `customMechanics` / `mechanicsDir`, `customLevels[].mechanics`): bounce pads, jackpot machines, shops, dojos, blessing pillars, portals, hazards, and script-driven interactables with `.glb`/`.gltf` models, 2D billboard sprites, custom textures, and composite `parts`
- **Additive Custom Music & SFX** (`customMusic` / `musicDir`, `customSfx` / `sfxDir`)
- **Custom Treasure Wheels** (`customTreasures` / `treasuresDir`)
- **Custom Mod Config UI Modules** (`configModule`), declarative `settings`, `toolbarActions`, `regions`, `assetsDir`, `assetAliases`, `dataPatches`, `bundlePatches`, `profilePatch`, `scripts`, and `styles`

All mod toggles, config panels, and mod actions live inside **Unbound Settings**. Non-cheat Offline mod preferences can also be adjusted from **Unbound Settings** while you are in Online Mode; Online Mode itself stays 100% vanilla and gameplay-altering cheats stay locked until you switch to Offline Mode.

---

## Table of Contents

1. [Folder Structure & Discovery](#1-folder-structure--discovery)
2. [`mod.json` Manifest Reference](#2-modjson-manifest-reference)
3. [Custom Playable Characters](#3-custom-playable-characters)
4. [Playable 3D Character Models (`.glb` / `.gltf`)](#4-playable-3d-character-models-glb--gltf)
5. [Custom Wardrobe Skins & Dual Shiny](#5-custom-wardrobe-skins--dual-shiny)
6. [Custom Enemies (Unplayable & Opt-In Only)](#6-custom-enemies-unplayable--opt-in-only)
7. [Custom Attacks & Custom GPU VFX](#7-custom-attacks--custom-gpu-vfx)
8. [Custom Pokéball Items](#8-custom-pokéball-items)
9. [Custom Levels, Procedural Generation & 3D Stages](#9-custom-levels-procedural-generation--3d-stages)
10. [Custom Map Mechanics & Prefabs](#10-custom-map-mechanics--prefabs)
11. [Additive Custom Music & SFX](#11-additive-custom-music--sfx)
12. [Custom Treasures](#12-custom-treasures)
13. [Custom Mod Config Modules, Declarative Settings & Actions](#13-custom-mod-config-modules-declarative-settings--actions)
14. [Scripts, Styles, Assets, Patches & Compatibility](#14-scripts-styles-assets-patches--compatibility)
15. [Mod Showcase (`info.json`), Experimental Mods & GitHub Mod Browser](#15-mod-showcase-infojson-experimental-mods--github-mod-browser)
16. [Complete Example Mods](#16-complete-example-mods)

---

## 1. Folder Structure & Discovery

The mod engine scans these directories in order:
1. `%APPDATA%\pokebonk-unbound\mods` (or `<POKEBONK_UNBOUND_DATA_DIR>/mods`)
2. `./mods/` beside the executable (if present)

Each structured mod is a folder containing a `mod.json` file:

```text
mods/
  my-mod-id/
    mod.json
    info.json
    preview.png
    config/
      panel.js
      panel.css
    characters/
      hero.json
      hero-pmd.png
      hero-shiny.png
      hero-alt-shiny.png
      hero-front.png
      hero-portrait.png
      hero-portrait-shiny.png
      hero-icon.png
    models/
      hero.glb
      spring-pad.glb
    enemies/
      slime.json
      slime-pmd.png
    levels/
      ruins.json
      ruins.glb
    mechanics/
      shrine.json
    audio/
      music/
        my-theme.ogg
      sfx/
        my-hit.ogg
    assets/
    style.css
    script.js
```

Standalone drop-in files placed directly in `./mods/` (`.css`, `.js`, `.patch.json`, `.png`, `.ogg`, `.glb`) are also picked up and can be toggled on or off individually.

---

## 2. `mod.json` Manifest Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique mod identifier (defaults to the folder name). |
| `name` | `string` | Display name shown in menus and Unbound Settings. |
| `version` | `string` | Semver version string (e.g. `"1.0.0"`). |
| `author` | `string` | Author name. |
| `description` | `string` | Short summary of what the mod adds. |
| `category` | `string` | Category label (`Characters`, `Levels`, `Audio`, `Gameplay`, `Quality of Life`, etc.). |
| `scope` | `"gameplay" \| "client"` | Co-op parity scope. Auto-detected if omitted (`gameplay` mods must match version across all Co-op peers; `client` mods like audio/UI can differ freely). |
| `experimental` | `boolean` | When `true`, the mod is isolated strictly to the **Experimental** tab in the Mod Browser (never shown in All/Featured/category tabs). |
| `tags` | `string[]` | Searchable tags for the Mod Browser. |
| `gameVersions` | `string[]` | Tested PokéBonk build versions (e.g. `["0.10.31", "0.10.36"]`). |
| `minGameVersion` / `maxGameVersion` | `string` | Optional inclusive game version range. |
| `minClientVersion` / `maxClientVersion` | `string` | Optional PokéBonk Unbound client version range. |
| `maxDex` | `number` | Raises the Pokédex cap (vanilla is `251`, max standard National Dex is `1025`). |
| `regions` | `object[]` | Adds selectable region tabs in Character Select, Map Picker, and Pokédex. |
| `characters` | `object[]` | Inline custom playable character definitions. |
| `charactersDir` | `string` | Relative directory containing `.json` character files (e.g. `"characters"`). |
| `customWardrobe` / `customSkins` | `object[]` | Inline custom wardrobe skins for vanilla or custom characters. |
| `wardrobeDir` | `string` | Relative directory containing `.json` wardrobe skin files. |
| `customEnemies` | `object[]` | Inline unplayable custom enemy definitions (IDs `5000`-`8999`). |
| `enemiesDir` | `string` | Relative directory containing `.json` enemy files or `<subFolder>/enemy.json`. |
| `enemySpawns` | `object[]` | Explicit opt-in spawn rules binding custom enemies to specific biome IDs. |
| `enableCustomEnemies` | `(string \| number \| object)[]` | Activates `optInBiomes` declared on custom enemies by key/ID (or overrides biomes per entry). |
| `customMoves` | `object[]` | Inline custom attack definitions. |
| `movesDir` | `string` | Relative directory containing `.json` attack files. |
| `customVfx` | `object[]` | Reusable declarative GPU visual effect presets. |
| `vfxDir` | `string` | Relative directory containing `.json` VFX preset files. |
| `customItems` | `object[]` | Inline custom Pokéball pickup item definitions. |
| `itemsDir` | `string` | Relative directory containing `.json` item files. |
| `customLevels` | `object[]` | Inline procedural (`proceduralGen`, `prefabScatters`) or 3D `.glb` custom stage definitions. |
| `levelsDir` | `string` | Relative directory containing `.json` level files. |
| `customPrefabs` | `object[]` | Reusable 3D/2D prefab assets (`.glb`/`.gltf`, billboard sprites, textures, composite `parts`) shared by map mechanics and `prefabScatters`. |
| `prefabsDir` | `string` | Relative directory containing `.json` prefab files. |
| `customMechanics` | `object[]` | Inline custom map mechanics (`bounce`, `jackpot`, `shop`, `dojo`, `pillar`, `portal`, `hazard`, `custom`). Strictly opt-in per biome. |
| `mechanicsDir` | `string` | Relative directory containing `.json` map mechanic files. |
| `customMusic` | `object[]` | Additive custom music tracks (`.ogg`, `.mp3`, `.wav`, `.m4a`, `.webm`, `.flac`). |
| `musicDir` | `string` | Relative directory of custom music `.json` descriptors or drop-in audio files. |
| `customSfx` | `object[]` | Additive custom SFX clips routed through the native SFX bus. |
| `sfxDir` | `string` | Relative directory of custom SFX `.json` descriptors or drop-in audio files. |
| `customTreasures` | `object[]` | Inline custom Treasure roulette wheels. |
| `treasuresDir` | `string` | Relative directory containing `.json` treasure wheel files. |
| `configModule` | `object` | Custom UI module `{ script, style, title, subtitle }` mounted inside **Unbound Settings -> Mods Config** when the mod is enabled. |
| `configPanel` | `string` | Shorthand for `{ "script": "<path>" }`. |
| `configSections` | `object[]` | Optional grouped section metadata for declarative settings. |
| `settings` | `object[]` | Declarative mod settings (`toggle` / `select`) rendered automatically in **Unbound Settings -> Mods Config**. |
| `toolbarActions` | `object[]` | Action buttons displayed inside **Unbound Settings -> Manage Mods** and **Mods Config**. |
| `styles` | `string[]` | Relative CSS files injected into the game document. |
| `scripts` | `string[]` | Relative JS files executed in Offline Mode with `window.pokebonkModAPI`. |
| `assetsDir` | `string` | Directory whose files override matching game asset paths. |
| `assetAliases` | `object` | Map of `fromPath -> toPath` aliases (supports trailing `/` prefixes). |
| `dataPatches` | `string[]` | Relative JSON files patching `data/pokemon.json` stats or fields. |
| `bundlePatches` | `object[]` | Targeted exact or regex replacements applied in memory to served JS/CSS chunks. |
| `profilePatch` | `string` | Relative JSON file granting non-destructive species or biome unlocks. |
| `enableAllEvents` | `boolean` | Enables the seasonal events hub if `true`. |

---

## 3. Custom Playable Characters

### ID Ranges

- **`252`-`1025`**: Official National Dex species. Loaded whenever the owning mod is enabled.
- **`2000`-`4999` and `9000`-`9999`**: Non-dexed / custom playable characters. Automatically placed under the **Custom** region tab whenever the Offline Mod Engine is ON.
- **`5000`-`8999`**: Reserved strictly for **unplayable Custom Enemies** (see Section 6). Do not assign playable character IDs inside `5000`-`8999`.

Characters start **locked by default** (`"unlock": false`) to preserve progression. Set `"unlock": true` to unlock them immediately, or add an unlock button under `toolbarActions`.

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
  - Legacy `dirs` and `dur` keys are normalized automatically to `rows` and `d`.
- **Single-image fallback**: Omit `spriteMeta` and provide only `sprite` (a single PNG) or `pokeApiId` (an official PokéAPI sprite ID, optionally with `"pokeApiShiny": true`).
- **Portraits & Icons**: `portrait` is a 40x40 PNG; `icon` should use a transparent background so locked silhouettes render cleanly.
- **Audio & Ultimates**: Use `cry` (custom `.ogg`) or `cryFrom` (existing Pokédex ID). Use `customUlt` for a custom GPU shockwave Ultimate or `ultFrom` to inherit an existing Pokémon's Ultimate.
- **Quick Drop-In**: Place standalone character `.json` + `.png` files inside `./mods/custom-characters-pack/characters/` without creating a new mod folder.

---

## 4. Playable 3D Character Models (`.glb` / `.gltf`)

Playable characters can render as real 3D meshes in-run instead of 2D billboard sprites. Add `model3d` (or `model`) to any character definition in `characters` or `charactersDir`:

```json
{
  "id": 2120,
  "key": "voxel-knight",
  "name": "Voxel Knight",
  "types": ["steel", "fighting"],
  "unlock": true,
  "portrait": "characters/knight-portrait.png",
  "icon": "characters/knight-icon.png",
  "sprite": "characters/knight-front.png",
  "model3d": "models/voxel-knight.glb",
  "modelScale": 1.15,
  "modelOffsetY": 0.0,
  "modelYawOffset": 0,
  "modelShadow": true,
  "modelAnimations": {
    "idle": "Idle",
    "walk": "Run",
    "attack": "Slash",
    "hurt": "Hit"
  }
}
```

| Field | Default | Description |
| --- | --- | --- |
| `model3d` / `model` | `null` | Relative path inside the mod folder to a `.glb` or `.gltf` file. Served at `/assets/models/custom_char_<id>.glb`. |
| `modelScale` | `1.0` | Height multiplier after auto-normalizing the mesh to PokéBonk's hero height (~1.85 world units). Clamped to `0.15`-`8.0`. |
| `modelOffsetY` | `0` | Vertical ground offset in world units after aligning the mesh bounding box bottom to `y = 0`. |
| `modelYawOffset` | `0` | Facing rotation offset in radians (adjust if your exported model faces `+X` or `-Z` instead of `+Z`). |
| `modelShadow` | `true` | Enables shadow casting and receiving on child meshes. |
| `modelAnimations` | `null` | Optional clip name map (`idle`, `walk`, `attack`, `hurt`). If omitted, embedded glTF clips matching those keywords are bound automatically. |

How rendering works in-game:
- The engine loads the model through PokéBonk's toon shader pipeline, aligns the bottom of the bounding box to ground height, and skips the 2D billboard once the mesh is ready.
- While the `.glb` finishes loading on the first frame (and inside 2D menus like Character Select), `portrait`, `icon`, and `sprite` are used, so always provide at least a portrait and fallback sprite.
- If the `.glb` has no embedded skeletal animations, the engine drives smooth procedural walk bobbing, facing yaw, squash-and-stretch, attack forward tilt, invulnerability flicker, and faint tipping automatically.
- Temporary transformations (Mega/Dynamax forms) cleanly defer to the form visual and restore the 3D mesh afterward.

---

## 5. Custom Wardrobe Skins & Dual Shiny

Mods can add custom Wardrobe looks, custom shader palettes, full replacement sprite sheets per skin, and **two distinct shiny variants** (primary `shiny` + secondary `classic` / alt-shiny) for both custom characters and vanilla Pokémon.

### Dual Shiny Fields (on any character)

| Field | Served Path | Description |
| --- | --- | --- |
| `pmdShinySheet` (alias `shinySheet`) | `/assets/pmd-shiny/<id>.png` | Custom animated PMD sheet used for the primary `shiny` look. |
| `portraitShiny` (alias `shinyPortrait`) | `/assets/portraits-shiny/<id>.png` | Custom 40x40 portrait for the primary `shiny` look. |
| `pmdAltShinySheet` (aliases `altShinySheet`, `classicSheet`) | `/assets/pmd-alt-shiny/<id>.png` | Second distinct shiny PMD sheet used when `classic` (Classic Shiny) is equipped. |
| `portraitAltShiny` (aliases `altShinyPortrait`, `classicPortrait`) | `/assets/portraits-alt-shiny/<id>.png` | Custom 40x40 portrait for the second shiny look. |
| `hasAltShiny` | `boolean` | Automatically `true` whenever `pmdAltShinySheet` or `portraitAltShiny` is set. |
| `unlockSkins` | `boolean \| string[]` | Set `true` to unlock `shiny`, `classic`, and `m1`/`m2`/`t1`/`t2` immediately, or pass specific look keys like `["shiny", "classic", "m1"]`. |

### Wardrobe Entries (`character.wardrobe` or top-level `customWardrobe` / `wardrobeDir`)

Attach skins inline on a character via `"wardrobe": [...]` (or `"skins": [...]`), or target any species (including vanilla IDs `1`-`251`) at the root of `mod.json` via `"customWardrobe": [...]` / `"wardrobeDir": "wardrobe"`:

```json
"customWardrobe": [
  {
    "member": 25,
    "slot": "m1",
    "name": "Cyber Pikachu",
    "style": "circuit",
    "pal": "#06111e #0e3a5c #38bdf8 #e0f2fe",
    "desc": "Neon circuit wardrobe variant for Pikachu.",
    "unlocked": true
  },
  {
    "member": 2050,
    "slot": "m2",
    "name": "Shadow Tunic",
    "style": "shadow",
    "pal": "#0b0714 #2c1654 #a855f7 #f5d0fe",
    "desc": "Full replacement sprite sheet and portrait.",
    "unlocked": true,
    "sheet": "characters/my-hero-shadow-pmd.png",
    "portrait": "characters/my-hero-shadow-portrait.png"
  }
]
```

| Field | Type | Description |
| --- | --- | --- |
| `member` (aliases `speciesId`, `characterId`) | `number` | Target species ID (not required when declared inside a character's `wardrobe` array). Cannot target unplayable enemy IDs `5000`-`8999`. |
| `slot` / `n` | `"m1" \| "m2" \| "t1" \| "t2"` or `1`-`4` | Wardrobe slot (`m1`=`1`, `m2`=`2`, `t1`=`3`, `t2`=`4`). |
| `name` | `string` | Skin display name shown in Wardrobe. |
| `style` | `string` | Any built-in shader style (`metal`, `crystal`, `holo`, `galaxy`, `shadow`, `neon`, `stone`, `aurora`, `gb`, `magma`, `ember`, `verdant`, `tidal`, `psionic`, `spectre`, `storm`, `geode`, `candy`, `frost`, `gothic`, `circuit`, `toxic`, `ukiyo`, `glitch`, `calavera`, `synth`). |
| `pal` | `string` | Space-separated 4-color hex ramp (darkest to brightest). |
| `desc` | `string` | Description shown in the Wardrobe detail panel. |
| `unlocked` | `boolean` | Defaults to `true` for custom skins so players can equip them right away. Set `false` to gate behind progression/scripts. |
| `sheet` (alias `pmdSheet`) | `string` | Optional full replacement PMD sheet PNG. Served at `/assets/pmd-custom-skin/<member>-<slot>.png`. |
| `portrait` | `string` | Optional replacement 40x40 portrait PNG. Served at `/assets/portraits-custom-skin/<member>-<slot>.png`. |

At runtime, `GET /local-api/mod-api/wardrobe` (or `await window.pokebonkModAPI.getWardrobe()`) lists every active custom wardrobe skin.

---

## 6. Custom Enemies (Unplayable & Opt-In Only)

Custom Enemies let mods add hostile mobs, elites, guardians, totems, summoners, and bosses without polluting the playable character roster or vanilla maps.

### Hard Engine Guarantees

Every enemy defined under `customEnemies` / `enemiesDir` is assigned an ID in **`5000`-`8999`** (explicit or auto-allocated) and is enforced across the server, save layer, and game chunks:
- **Completely unplayable**: stripped from `this.pokemon`, Character Select, Starter Picker, League, and active team.
- **Never shiny**: `Shiny` (`2048`) and `Classic` (`131072`) flags are stripped on spawn; `shinyBoss`, `spawnShiny`, `spawnClassic`, and `classicPool` reject them unconditionally.
- **Never catchable & never logged in Pokédex**: `Capture` (`128`) flag is stripped; `interceptBoss`, `takeOver`, `spawnEncounter`, and `markSeen` reject `5000`-`8999` and any `enemyOnly` species. Profile patching also scrubs `5000`-`8999` from `unlocked`, `league`, `seen`, `shinies`, `classics`, and `team`.
- **Never spawns randomly in normal maps**: simply defining an enemy in `customEnemies` registers its stats and sprites, **not** its spawns. It will only appear in a biome when explicitly opted in by:
  1. A Custom Level (`customLevels[].customEnemies` or referencing its key/ID in `residents`, `bosses`, `legendaries`, `guardians`, `totems`, `summoners`), OR
  2. An active mod's `"enemySpawns"` or `"enableCustomEnemies"` manifest field, OR
  3. An active Modpack's spawn activation (`modpack-enemy-spawns.json`).
  - Wildcards like `"*"` or `"all"` are explicitly rejected.

### Defining Custom Enemies

```json
"customEnemies": [
  {
    "id": 5001,
    "key": "dark-keese",
    "name": "Dark Keese",
    "types": ["dark", "flying"],
    "stats": { "hp": 55, "atk": 72, "def": 45, "spa": 60, "spd": 50, "spe": 95 },
    "role": "mob",
    "stages": [1, 2, 3],
    "spawnWeight": 2,
    "exclusive": false,
    "optInBiomes": ["dark_world"],
    "sprite": "enemies/dark-keese-front.png",
    "pmdSheet": "enemies/dark-keese-pmd.png",
    "cryFrom": 41,
    "spriteMeta": {
      "w": 128,
      "h": 512,
      "anims": {
        "walk": { "y": 0, "fw": 32, "fh": 32, "n": 4, "rows": 8, "d": [5, 5, 5, 5] },
        "idle": { "y": 256, "fw": 32, "fh": 32, "n": 2, "rows": 8, "d": [12, 12] }
      }
    }
  }
]
```

### Opting Enemies Into Specific Biomes

```json
"enemySpawns": [
  {
    "enemy": "dark-keese",
    "biomes": ["cave", "dark_world"],
    "role": "mob",
    "stages": [1, 2, 3],
    "weight": 3,
    "exclusive": false
  }
],
"enableCustomEnemies": [
  "dark-keese",
  { "enemy": 5002, "biomes": ["dark_world"], "role": "boss" }
]
```

- Valid `role` values: `"mob"` (default), `"resident"`, `"boss"`, `"legendary"`, `"guardian"`, `"totem"`, `"summoner"`.
- Set `"exclusive": true` on a mob binding if that biome should spawn **only** your custom enemy pool instead of mixing with vanilla residents.
- Query active custom enemies and biome spawn bindings at runtime via `GET /local-api/mod-api/enemies` or `await window.pokebonkModAPI.getEnemies()`.

---

## 7. Custom Attacks & Custom GPU VFX

Custom attacks (`customMoves` / `movesDir`) and custom VFX (`customVfx` / `vfxDir` or inline `vfx`) run directly on PokéBonk's native GPU particle/beam/ring renderer and WebAudio SFX engine with no external texture files required.

### Valid Archetypes

The engine supports 23 native movement/hitbox archetypes:

`random`, `cone`, `wave`, `nova`, `smite`, `barrage`, `orbit`, `strike`, `spin`, `homing`, `dash`, `vortex`, `trap`, `meteor`, `lob`, `chain`, `bolt`, `boomerang`, `orb`, `beam`, `aura`, `trail`, `drain`

Aliases are normalized automatically: `slash`/`cleave` -> `strike`, `burst`/`blast` -> `nova`, `slam` -> `smite`, `spread` -> `barrage`, `shot` -> `bolt`.

### Extended `params` Tuning

Any custom move can tune gameplay behavior via `params`:
- `count` (projectile/strike count), `spread` (radians between projectiles), `pulses` (nova/burst pulse count)
- `dmgMul`, `cdMul` / `cd`, `areaMul` / `r`, `speedMul` / `speed`, `durMul` / `dur`, `pierce`
- `status` (`"burn"`, `"freeze"`, `"paralysis"`, `"poison"`, `"stun"`, `"root"`, `"wet"`, `"charm"`), `statusChance` (`0`-`1`)

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
| `preset` | `string` | Optional vanilla move key to inherit base behavior from (e.g. `slash`, `razor-leaf`, `gust`, `psybeam`, `flamethrower`, `thunderbolt`, `shadow-ball`, `dragon-claw`). |
| `shape` | `string` | Native GPU particle shape from `O.*` (`Soft`, `Star`, `Spark`, `Ring`, `Leaf`, `Flame`, `Bubble`, `Flake`, `Bolt`, `Rock`, `Swirl`, `Crescent`, `Cross`, `Feather`, `Twinkle`, `Shard`, `Wisp`, `Gem`, `PixSlash`, `PixFlame`, `PixBolt`, `PixWave`, `PixTornado`, `PixLeaf`, `PixStar`, `PixSparkle`, `PixGem`). |
| `color` / `color2` | `string \| number` | Primary and secondary accent colors as hex strings (`"#4aff80"`) or 24-bit RGB integers (`4915072`). |
| `size` / `glow` | `number` | Particle scale multiplier and additive glow intensity (`0`-`1`). |
| `trailShape` / `trailColor` / `trailSize` / `trailRate` | mixed | Projectile trail particles (`trailRate`: `0`-`1`). |
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

At runtime, `window.pokebonkVfx` lists available `shapes`, `rings`, and active custom `presets`, and `GET /local-api/mod-api/moves` / `GET /local-api/mod-api/vfx` return active definitions. Reference any attack's `key` inside any character's `kit` array.

---

## 8. Custom Pokéball Items

Custom items (`customItems` / `itemsDir`) enter PokéBonk's in-run Pokéball pickup pool and reuse vanilla item icons (`items/<name>.png`) or overridden icons via `assetsDir`.

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
- `mods`: Array of stat modifiers using `add` (flat addition) or `mul` (multiplier). Common stats: `damage`, `moveSpeed`, `attackSpeed`, `critChance`, `critDamage`, `luck`, `maxHp`, `armor`, `area`, `pickup`, `xp`, `evasion`.

---

## 9. Custom Levels, Procedural Generation & 3D Stages

Add playable stages via `"customLevels"` or `"levelsDir"` in `mod.json`. Vanilla-like terrain, enhanced procedural generation (`proceduralGen`), and 3D `.glb` mesh stages (with automatic slope-based collision baking) all co-exist cleanly.

### Level Fields

| Field | Default | Description |
| --- | --- | --- |
| `id` | required | Unique biome ID (`a-z0-9_`). |
| `name` / `desc` | required | Stage title and description in Map Picker. |
| `region` | `"custom"` | Target region tab ID (`kanto`, `johto`, `hoenn`, `custom`, or a custom `regions` ID). |
| `mode` | `"procedural"` | `"procedural"` (heightmap terrain) or `"model"` (loads `.glb` from `model` and bakes collision). |
| `model` / `modelScale` / `modelOffset` / `maxSlope` / `hideBaseTerrain` / `walkableRadius` | model mode | Configures a `.glb` arena mesh. Served at `/assets/models/custom_<id>.glb`. |
| `envDir` / `envFrom` | `"forest"` | Custom terrain textures directory (`ground.png`, `cliff.png`, `path.png`, `props.png`, `props.json`) or vanilla biome fallback. |
| `thumbnail` / `thumbnailFrom` | `envFrom` | Map Picker preview image (`.png`/`.webp`) or vanilla fallback. |
| `size`, `sky`, `fog`, `fogNear`, `fogFar`, `light`, `sun`, `hemiGround`, `ground`, `path`, `cliff`, `water`, `waterColor`, `props`, `propDensity`, `relief`, `weather`, `zones`, `sanctuary`, `tex`, `openSea`, `shape` | defaults | Visual palette, lighting, weather, day/twilight zones, and vanilla terrain parameters. |
| `proceduralGen` (alias `terrainGen`) | `null` | Optional enhanced procedural generator config (see below). Omit to keep pure vanilla PokéBonk generation. |
| `prefabScatters` | `[]` | Scatters reusable `customPrefabs` across walkable terrain (see below). |
| `residents`, `specials`, `bosses`, `legendaries`, `guardians`, `totems`, `summoners` | defaults | Enemy pools (vanilla IDs, custom playable IDs, or Custom Enemy keys/IDs). |
| `customEnemies` | `[]` | Explicit Custom Enemy spawn bindings scoped to this level. |
| `mechanics` | `[]` | Custom Map Mechanics scoped directly to this level (see Section 10). |
| `landmark` | `null` | Built-in landmark (`hyrule_castle`, `pyramid_of_power`, `moss_shrine`, `volcano_caldera`, `spear_pillar`, `old_chateau`, `sand_pyramid`, `dragon_tower`, `sea_arch`, `prism_crystals`, `tapu_totem`, `fire_altar`, `dynamax_den`, `crown_temple`, `titan_mesa`, `terastal_spire`) plus optional `glbProps: [{ model, dx, dy, dz, scale, rotY }]`. |
| `musicTrack` / `bossMusicTrack` | `null` | Custom music track IDs from `customMusic`. |
| `unlockedByDefault` | `true` | Automatically unlocks the level in offline profiles when enabled. |

### Enhanced Procedural Terrain (`proceduralGen`)

Vanilla generation stays untouched whenever `proceduralGen` is omitted. When provided, `base` chooses whether to layer features on top of a vanilla generator or build terrain from scratch:

| Field | Values / Subfields | Description |
| --- | --- | --- |
| `base` | `"vanilla"` (default), `"island"`, `"cave"`, `"ancient"`, `"valley"`, `"lake"`, `"summit"`, `"wilds"`, `"custom"` | Runs the selected PokéBonk generator first and overlays `proceduralGen` on top, or generates purely from `proceduralGen` when `"custom"`. |
| `preset` | `"archipelago"`, `"canyon"`, `"caldera"`, `"terraces"`, `"arena_rings"`, `"mesa"`, `"twin_peaks"`, `"river_basin"` | Optional macro elevation silhouette. |
| `presetBlend` | `0`-`1` (default `0.85` if `preset` set, `1` for `base: "custom"`) | Mix ratio between the underlying vanilla heightmap and the `preset` / `noise` pass. |
| `noise` | `{ scale, octaves, amplitude, ridgeWeight, terraceSteps, terraceSharpness, warpStrength, warpScale, heightOffset }` | Multi-octave fBm + ridged noise, domain warping, and terraced steps. |
| `plateaus` | `{ count, minRadius, maxRadius, height, rampCount, flatTop }` | Raises flat-topped plateaus with walkable ramps and painted path access. |
| `craters` | `{ count, minRadius, maxRadius, depth, rimHeight }` | Carves circular basins with raised crater rims. |
| `rivers` | `{ count, width, depth, meander, paintPath }` | Carves meandering riverbeds across the map (optionally painting riverside trails). |
| `paths` | `{ radialCount, ringRadius, width, flatten }` | Paints and gently flattens radial spokes and/or a concentric road ring. |
| `border` | `"cliffs"`, `"ocean"`, `"wall"` | Map perimeter shape (defaults to `"cliffs"` when `base: "custom"`). |
| `spawnClearingRadius` | `number` (default `14`) | Flattens a safe elevated clearing around `(0, 0)` above `waterLevel`. |
| `smoothing` | `0`-`4` (default `1` for `"custom"`, `0` otherwise) | Gaussian heightmap smoothing passes. |
| `waterLevel` | `number` | Enables water plane and sets water height. |
| `generatorHook` | `string` | Name of a custom JS heightmap callback registered via `window.pokebonkTerrainGen.register(id, fn)`. |

Script hook signature (`window.pokebonkTerrainGen`):
```js
window.pokebonkTerrainGen?.register('spiral-ridge', ({ heights, pathMask, res, world, cell, idx, noise, rng, play }) => {
  const half = world / 2;
  for (let gz = 0; gz <= res; gz++) {
    for (let gx = 0; gx <= res; gx++) {
      const x = gx * cell - half, z = gz * cell - half;
      const r = Math.hypot(x, z), a = Math.atan2(z, x);
      heights[idx(gx, gz)] += Math.sin(r * 0.12 - a * 2) * 1.4;
    }
  }
});
```

### Scattering Custom Prefabs (`prefabScatters`)

Place decorative or solid `customPrefabs` across walkable, above-water terrain:

```json
"prefabScatters": [
  { "prefabId": "rune_obelisk", "count": 12, "minDist": 18, "maxDist": 115, "scaleRange": [0.85, 1.35], "randomRotY": true, "colliderRadius": 1.1 }
]
```

---

## 10. Custom Map Mechanics & Prefabs

Custom Map Mechanics (`customMechanics`, `mechanicsDir`, or `customLevels[].mechanics`) place interactive world objects directly on maps — matching vanilla PokéBonk features like bouncy mushrooms, jackpot slot machines, Meowth's shop, the Karate Dojo, and Unown power pillars.

Like Custom Enemies, **Custom Map Mechanics are strictly opt-in per biome**: a mechanic will never spawn on vanilla maps unless you list those biome IDs in `"biomes": ["forest", ...]` or declare it inside a custom level's `"mechanics"` array.

### Supported Mechanic Kinds

| `kind` | Vanilla Equivalent | Behavior |
| --- | --- | --- |
| `"bounce"` (alias `"shroom"`) | Bouncy Mushroom | Auto-launches the player in a parabolic arc on touch (`bounceDistance`, `bounceHeight`, `bounceDuration`, `cooldown`). |
| `"jackpot"` (aliases `"slot"`, `"slots"`) | Slot Machine | Costs `cost` Pokédollars (scaling by `costScale` per spin) and rolls weighted `outcomes` (gold, Super Ball chest, heal, XP, buffs, or ambush). |
| `"shop"` | Meowth Shop | Opens an in-run shop modal with custom `stock` entries (`heal`, `chest`, `stat`, `xp`, `candy`) and purchase limits. |
| `"dojo"` | Karate Dojo | Spawns a tracked challenger wave (`waveCount`, `waveEliteCount`, `waveSpecies` — supports Custom Enemies) and awards `reward` on clear. |
| `"pillar"` (alias `"altar"`) | Unown / Blessing Pillar | Stand inside `radius` for `chargeTime` seconds to trigger VFX and grant `buffs`, `healPct`, `grantGold`, `grantXp`, `grantUlt`, and/or `spawnChest`. |
| `"portal"` | Map Teleporter | Warps the player to a safe spot with brief invulnerability frames (`cooldown`). |
| `"hazard"` | Periodic Trap / Geyser | Pulses every `pulseInterval` seconds, dealing `damage` to nearby enemies (and the player if `hitsPlayer: true`). |
| `"custom"` | Script-Driven | Runs a JS handler registered via `window.pokebonkMapMechanics.registerHandler(id, { onInteract, onTick, getLabel })`. |

### Reusable Custom Prefabs & Assets (`customPrefabs` / `prefabsDir`)

Define reusable visuals once in `"customPrefabs"` (or `"prefabsDir"`) and reference them from any mechanic via `"prefabId": "<id>"` or from any level's `"prefabScatters"`. You can also pass an inline `"prefab": { ... }` or set visual fields (`model`, `sprite`, `texture`, `icon`, `parts`) directly on a mechanic.

```json
"customPrefabs": [
  {
    "id": "rune_obelisk",
    "name": "Rune Obelisk",
    "scale": 1.2,
    "height": 3.8,
    "colliderRadius": 1.1,
    "parts": [
      { "shape": "cylinder", "size": [1.0, 1.2, 0.6], "pos": [0, 0.3, 0], "color": "#475569", "texture": "assets/stone.png" },
      { "shape": "crystal", "size": [0.75], "pos": [0, 2.2, 0], "color": "#a855f7", "emissive": "#7e22ce", "spin": 1.4, "bob": 0.22 }
    ]
  },
  {
    "id": "trader_stand",
    "sprite": "assets/trader.png",
    "spriteSize": 2.8,
    "spriteBob": 0.12,
    "icon": "assets/trader-icon.png"
  }
]
```

| Prefab / Visual Field | Served Path | Description |
| --- | --- | --- |
| `model` / `model3d` | `/assets/models/custom_prefab_<id>.glb` (or `custom_mech_<id>.glb`) | Custom 3D `.glb` or `.gltf` mesh loaded through PokéBonk's toon shader pipeline. |
| `sprite` / `billboard` | `/assets/mechanics/<id>.png` (or `/assets/prefabs/<id>.png`) | 2D billboard sprite (`spriteSize` world height, `spriteBob` vertical bobbing). |
| `texture` | `/assets/mechanics/tex/<id>.png` (or `/assets/prefabs/tex/<id>.png`) | Custom texture applied to procedural pedestal or primitive shapes. |
| `icon` | `/assets/mechanics/icons/<id>.png` | Optional custom icon asset for mechanic UI/HUD scripts. |
| `vanillaModel` | built-in | Built-in model (`bounceshroom`, `slots`, `dojo`, `power`, `altar`, `shrine`, `challenge`, `porygon`, `fossil`, `totem`, `billpc`, `portal`, `chest`, `freechest`, `cursed`, `greed`, `ruins_crystals`, `goldrock`, `nest`, `cage`). Auto-picked by `kind` when no custom visual or `procedural: true` is set. |
| `parts` | composite | Array of sub-elements: primitive `shape` (`box`, `cylinder`, `cone`, `crystal`/`icosahedron`, `sphere`), sub-`model`, `vanillaModel`, or `sprite`, each with `size`, `pos` `[x,y,z]`, `rot` `[x,y,z]`, `scale`, `color`, `emissive`, `texture`, `spin`, and `bob`. |
| `scale` / `height` / `offsetY` / `rotY` / `colliderRadius` | numeric | Scale, floating label height, vertical offset, yaw rotation, and solid collision radius (`0` = pass-through). |

### Mechanic Definition Fields

| Field | Default | Description |
| --- | --- | --- |
| `id` | required | Unique mechanic ID (`a-z0-9_-`). |
| `kind` | `"custom"` | `bounce`, `jackpot`, `shop`, `dojo`, `pillar`, `portal`, `hazard`, or `custom`. |
| `name` / `desc` | required | Floating world label and `[E]` prompt description. |
| `biomes` | required (unless inside level `mechanics`) | Explicit biome IDs where this mechanic spawns. Wildcards (`"*"`, `"all"`) are rejected. |
| `prefabId` / `prefab` | `null` | References a `customPrefabs` ID or declares an inline prefab object. |
| `count` | `1` (`3` for `bounce`) | Instances per stage (`1`-`12`). |
| `positions` | `null` | Optional fixed `[{ "x": 18, "z": -12 }]` coordinates; otherwise picks safe spots between `minDist` and `maxDist`. |
| `radius` | `3.2` (`5.2` pillar, `1.8` bounce) | Interaction or trigger radius. |
| `cooldown` / `reusable` | varies by kind | Seconds before reuse and whether the node remains usable after activation. |
| `cost` / `costScale` | `0` (`25` jackpot) / `1.25` | Pokédollar cost and per-use multiplier. |
| `color` / `accentColor` / `beacon` | varies | Hex/RGB VFX colors and optional vertical light beacon. |
| `customSfx` | `null` | Custom SFX ID from `customSfx` played on activation. |
| `buffs` (alias `mods`) | `[]` | Array of `{ "stat": "damage", "mul": 1.15 }` or `{ "stat": "critChance", "add": 0.1 }` applied to `run.tempMods`. |
| `healPct` / `grantGold` / `grantXp` / `grantUlt` / `spawnChest` | `0` / `false` | Direct rewards granted on activation or pillar completion. |
| `outcomes` | built-in table | Weighted array for `jackpot`: `[{ "weight": 20, "type": "gold", "label": "+80 ₽", "gold": 80, "chest": false, "healPct": 0, "buffs": [] }]` (`type: "ambush"` spawns enemies). |
| `stock` | built-in table | Shop items for `shop`: `[{ "id": "atk", "label": "Power Charm", "desc": "+15% Damage", "cost": 40, "limit": 2, "effect": "stat", "stat": "damage", "mul": 1.15 }]` (`effect`: `heal`, `chest`, `stat`, `xp`, `candy`). |
| `waveCount` / `waveEliteCount` / `waveSpecies` / `reward` | `10` / `2` / biome pool / `{ chest: true, gold: 45 }` | Dojo challenge wave settings and clear reward. |
| `pulseInterval` / `damage` / `status` / `hitsPlayer` | `6` / `35` / `null` / `false` | Hazard pulse timing and damage settings. |

### Script Hook (`window.pokebonkMapMechanics`)

From any mod script listed in `"scripts"`:

```js
window.pokebonkMapMechanics?.registerHandler('my-shrine', {
  getLabel(node, run) {
    return node.used ? 'Shrine Depleted' : 'Ancient Shrine · Spend 15 HP for +20% Damage';
  },
  onTick(node, run, dt, distToPlayer) {},
  onInteract(node, run) {
    node.used = true;
    run.player.hp = Math.max(1, run.player.hp - 15);
    run.tempMods.push({ stat: 'damage', mul: 1.2 });
    run.player.recompute();
    run.ui?.banner?.('Blood Pact', '+20% Damage for this run!', '#ef4444');
    return true;
  }
});
```

Inspect active prefabs and mechanics at runtime via `GET /local-api/mod-api/mechanics` or `await window.pokebonkModAPI.getMechanics()`.

---

## 11. Additive Custom Music & SFX

PokéBonk Unbound adds new music tracks and sound effects **without replacing vanilla tracks or SFX**. Supported formats: `.ogg`, `.mp3`, `.wav`, `.m4a`, `.webm`, and `.flac`.

### Custom Music (`customMusic` / `musicDir`)

Built-in vanilla IDs (`menu`, `halloween-menu`, `johto-menu`, `dynamax-menu`, `ingame1`-`ingame5`, `boss`) are protected automatically; if a mod reuses a vanilla ID, it is namespaced as `<mod-id>-<id>`.

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
| `pool` | `"custom"` | `"ingame"` joins `ingame1`-`ingame5`; `"boss"` joins the boss pool; `"menu"` / `"custom"` stay selectable in Settings and playable via scripts. |
| `loop` | `0` | Loop start point in seconds (skips intro when looping). |
| `volume` | `1.0` | Relative volume multiplier (`0.05`-`2.5`). |
| `weight` | `1` | Selection weight (`1`-`10`) when `pool` is `"ingame"` or `"boss"`. |

Any audio file dropped directly inside `musicDir` with no JSON descriptor is auto-registered with `pool: "ingame"`.

### Custom SFX (`customSfx` / `sfxDir`)

Custom SFX clips decode once via Web Audio API and play through PokéBonk's native `sfxBus`, respecting Master and SFX volume sliders automatically.

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
| `volume` | `1.0` | Gain multiplier (`0.05`-`3.0`). |
| `pitch` | `1.0` | Base playback rate (`0.25`-`4.0`). |
| `pitchVar` | `0.05` | Random pitch jitter (`0`-`0.5`) to avoid repetitive hits sounding robotic. |
| `cooldown` | `0.03` | Minimum seconds between plays (`0`-`2.0`). |

### Binding Custom SFX to Attacks, Ultimates & Scripts

- **On `customMoves`**: Set `"customSfx": "picori-slash"`, `"customImpactSfx": "hit-id"`, or `"customChargeSfx": "charge-id"` (or point directly to an audio file with `"sfx": "audio/sfx/slash.ogg"`, `"impactSfx"`, `"chargeSfx"`). Add `"layerSfx": true` to play both the custom sample and the vanilla `sfxPreset` together.
- **On `customUlt`**: Set `"customSfx": "ult-id"` inside a character's `customUlt` object.
- **Runtime Audio SDK (`window.pokebonkAudio`)**:
  - `window.pokebonkAudio.playMusic(id, offsetSec)`
  - `window.pokebonkAudio.stopMusic()`
  - `window.pokebonkAudio.playSfx(id, { volume, pitch, pitchVar })`
  - `window.pokebonkAudio.listMusic()` / `window.pokebonkAudio.listSfx()`
  - `GET /local-api/mod-api/audio` returns the active custom music and SFX catalog.

---

## 12. Custom Treasures

Add custom Treasure wheels (`customTreasures` / `treasuresDir`) to PokéBonk's **Treasures** roulette using the same progression, odds, pity, titles, animated frames, profile banners, bag items, and mastery skins (`t1` / `t2`) as vanilla Series 1 & Series 2 wheels.

```json
"customTreasures": [
  {
    "id": "triforce",
    "series": 3,
    "seriesName": "Series 3",
    "seriesSub": "Hyrule",
    "seriesFresh": true,
    "starter": 2001,
    "show": 2001,
    "name": "Link Treasures",
    "color": "#22c55e",
    "color2": "#fde047",
    "color3": "#ffffff",
    "items": [
      ["rare-candy", 4, 30],
      ["amulet-coin", 3, 27],
      ["lucky-egg", 3, 25]
    ],
    "title1": "Hero of Minish",
    "frame1": "Kokiri Frame",
    "banner": "Hyrule Castle",
    "look1": "Golden Tunic",
    "look1Style": "aurora",
    "look1Pal": "#102808 #2f8520 #facc15 #fef9c3",
    "grandTitle": "Chosen of the Triforce",
    "grandFrame": "Triforce Crown",
    "grandLook": "Eternal Triforce",
    "grandLookStyle": "circuit",
    "grandLookPal": "#081c10 #15803d #fde047 #ffffff",
    "frameFx": "electric",
    "stageBgImage": "treasures/bg-triforce.png",
    "bannerImage": "treasures/tr-triforce.jpg",
    "frame1Image": "treasures/tr-triforce-1.png",
    "grandFrameImage": "treasures/tr-triforce-2.png"
  }
]
```

- **Custom Series & Collapsible Tabs**: Assign `"series": 3` (or higher) with `"seriesName"` and `"seriesSub"` to add a collapsible group in the Treasures sidebar.
- **Mastery Skins & Shaders**: `look1Style` and `grandLookStyle` accept any built-in look shader (`metal`, `crystal`, `holo`, `galaxy`, `shadow`, `neon`, `stone`, `aurora`, `gb`, `magma`, `ember`, `verdant`, `tidal`, `psionic`, `spectre`, `storm`, `geode`, `candy`, `frost`, `gothic`, `circuit`, `toxic`, `ukiyo`, `glitch`, `calavera`, `synth`) paired with a 4-color hex palette (`look1Pal`, `grandLookPal`).
- **Art Fallbacks**: Omit `stageBgImage`, `bannerImage`, `frame1Image`, or `grandFrameImage` to reuse a vanilla theme (`stageBgFrom`, `bannerFrom`, `frameFrom`, `frameFx`).
- **Offline Spin Backend**: Custom wheels register automatically on `POST /api/treasures/spin` and persist won prizes in the active offline profile.

---

## 13. Custom Mod Config Modules, Declarative Settings & Actions

Mods have two ways to expose configuration inside **Unbound Settings -> Mods Config** (across both Desktop and Android):

### A. Custom Mod Config Modules (`configModule`)

Instead of relying only on a flat list of toggles, a mod can ship its own UI module — with tabs, sliders, live previews, search bars, or custom layouts — inside its own folder. Core settings never hardcode mod-specific panels; any enabled mod declaring `configModule` is mounted dynamically by the Unbound Settings host.

In `mod.json`:

```json
"configModule": {
  "script": "config/panel.js",
  "style": "config/panel.css",
  "title": "My Mod Studio",
  "subtitle": "Configure gameplay rules, presets, and audio"
}
```

(You can also use `"configPanel": "config/panel.js"` if you do not need a separate stylesheet.)

Files under `configModule` are served strictly from inside your mod folder at `/local-api/mods/<modId>/config-asset/<relPath>` (path traversal outside the mod directory is blocked).

Your `config/panel.js` registers a renderer on `window.PokebonkModConfigModules[modId]` (or exports a `mount(ctx)` function if loaded as an ES module):

```js
(function () {
  window.PokebonkModConfigModules = window.PokebonkModConfigModules || {};
  window.PokebonkModConfigModules['my-mod-id'] = {
    mount(ctx) {
      const { container, mod, api, isOffline, toast, refresh } = ctx;
      const values = mod.settingsValues || {};
      container.innerHTML = `
        <div class="my-cfg-wrap">
          <label class="my-cfg-row">
            <span>Enable Hardcore Wave Scaling</span>
            <input type="checkbox" id="my-hc-toggle" ${values.hardcore ? 'checked' : ''} ${!isOffline ? 'disabled' : ''} />
          </label>
          <button type="button" class="btn secondary" id="my-reset-btn">Reset Defaults</button>
        </div>
      `;
      container.querySelector('#my-hc-toggle').addEventListener('change', async (ev) => {
        try {
          await api.updateModSettings(mod.id, { hardcore: ev.target.checked });
          toast('Saved setting.');
        } catch (err) {
          toast(err.message, true);
          ev.target.checked = !ev.target.checked;
        }
      });
      container.querySelector('#my-reset-btn').addEventListener('click', async () => {
        await api.updateModSettings(mod.id, { hardcore: false });
        toast('Defaults restored.');
        await refresh();
      });
    }
  };
})();
```

`ctx` passed to `mount(ctx)` provides:
- `container`: DOM element where the module mounts its UI
- `mod`: full mod descriptor (`id`, `name`, `version`, `settingsSchema`, `settingsValues`, `actions`, `capabilities`, etc.)
- `state`: current Unbound Settings state (`mode`, `mods`, `customMusic`, `hyruleConfig`, `offlineVersion`, etc.)
- `isOffline`: boolean (`true` only when client is in Offline Mode)
- `api`: host actions (`updateModSettings(modId, patch)`, `runModAction(modId, actionId)`, `updateHyruleConfig(patch)`, `mutateProfile(mutation)`, `reloadGame()`, `openBrowser(focusModId)`)
- `toast(message, isError)`: shows a notification in Unbound Settings
- `refresh()`: re-fetches current state and re-renders if needed

### B. Declarative Mod Settings (`settings`)

For simpler mods, add a `"settings"` array to `mod.json`. Values save automatically to `<modsDir>/mod-settings.json`:

```json
"settings": [
  {
    "key": "extraMusicWeight",
    "label": "High Custom Track Frequency",
    "desc": "Play custom regional battle tracks more frequently in runs.",
    "type": "toggle",
    "default": true,
    "cheat": false
  },
  {
    "key": "spawnTier",
    "label": "Custom Boss Density",
    "desc": "Adjusts custom boss encounter rate in Offline Mode.",
    "type": "select",
    "default": "normal",
    "options": [
      { "value": "normal", "label": "Normal (1:1)" },
      { "value": "high", "label": "High" }
    ],
    "cheat": true
  }
]
```

- Supported `type` values: `"toggle"` (boolean switch) and `"select"` (dropdown of strings or `{ "value", "label" }` objects).
- Set `"cheat": true` on gameplay-altering settings so the engine locks them automatically while in Online Mode.

### C. Mod Actions (`toolbarActions`)

Action buttons appear inside the mod's card in **Unbound Settings -> Manage Mods** and **Mods Config** when enabled. Non-cheat actions (like opening a mod subfolder) work in any mode; profile-mutating actions stay locked until Offline Mode.

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

#### Supported `profile-mutate` Keys

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

## 14. Scripts, Styles, Assets, Patches & Compatibility

### Runtime Mod SDK (`scripts`)

Scripts listed in `"scripts"` run in Offline Mode with `window.pokebonkModAPI`:
- `window.pokebonkModAPI.getProfile()` -> `GET /local-api/mod-api/profile`
- `window.pokebonkModAPI.getCharacters()` -> `GET /local-api/mod-api/characters` (includes `has3dModel`, `modelUrl`, `hasAltShiny`, `wardrobeCount`)
- `window.pokebonkModAPI.getWardrobe()` -> `GET /local-api/mod-api/wardrobe`
- `window.pokebonkModAPI.getEnemies()` -> `GET /local-api/mod-api/enemies`
- `window.pokebonkModAPI.getMoves()` -> `GET /local-api/mod-api/moves`
- `window.pokebonkModAPI.getVfx()` -> `GET /local-api/mod-api/vfx`
- `window.pokebonkModAPI.getMechanics()` -> `GET /local-api/mod-api/mechanics` (includes active `prefabs` and `mechanics`)
- `window.pokebonkModAPI.getAudio()` -> `GET /local-api/mod-api/audio`
- `window.pokebonkModAPI.mutateProfile(mutation)` -> `POST /local-api/mod-api/mutate` (Offline Mode + Mods ON only)
- `window.pokebonkModAPI.fetchPokeApi(path)` / `getPokeApiSpriteUrl(id, shiny)` / `reloadGame()`
- Runtime hooks: `window.pokebonkMapMechanics`, `window.pokebonkTerrainGen`, `window.pokebonkVfx`, `window.pokebonkAudio`, and read-only `GET /local-api/mods`.

### Asset Overrides & Aliases

- `assetsDir`: Files matching a game asset path (e.g. `assets/ui/maps/forest.webp` or `ui/maps/forest.webp`) override the vanilla file in Offline Mode.
- `assetAliases`: Redirects an asset path or folder prefix to another game asset path (handy for sharing vanilla biome texture packs or cries).

### Bundle Patches (`bundlePatches`)

Apply in-memory replacements to served JS/CSS chunks without modifying cached game files on disk:

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

**Tip for surviving PokéBonk updates:** Minified local variable names (like `t`, `n`, `it`, `$O`) change between PokéBonk builds. Prefer declarative Modding API fields (`characters`, `customEnemies`, `customMoves`, `customLevels`, `customMechanics`, `customWardrobe`, `customMusic`, `customSfx`) over `bundlePatches` whenever possible. If you must write a `bundlePatches` regex, match identifier names with `[\w$]+` rather than hardcoded 1-2 letter names, and read language from `localStorage.getItem('pokebonk.lang') || document.documentElement.lang || 'en'` instead of calling minified helpers.

### Co-op Scope & Auto-Updating Across Game Patches

- **Co-op Parity (`scope`)**: Mods adding characters, enemies, attacks, levels, mechanics, items, data patches, or gameplay bundle patches default to `"scope": "gameplay"` (Host and joining peers must enable matching versions). Cosmetic/audio/UI mods default to `"scope": "client"` and can differ freely in Co-op.
- **Automatic Mod Updates & Adaptation on Build Patch**: When a player downloads or patches their offline PokéBonk build to a newer version, PokéBonk Unbound checks installed mods automatically:
  - If a newer compatible version exists in the Mod Browser catalog, it backs up the previous copy and updates the installed mod automatically.
  - If an installed declarative mod already passes chunk compatibility checks against the new build, the client records the new game version in `autoAdaptedGameVersions` so players are not blocked by stale version metadata.

---

## 15. Mod Showcase (`info.json`), Experimental Mods & GitHub Mod Browser

Unbound Settings' **Mod Browser** reads from `HyruleChosenOne/Pokebonk-Unbound` (`mods-database/` on `main`) by default and works with any public GitHub `owner/repo`.

### Mod Info Showcase File (`info.json`)

Include an `info.json` next to `mod.json` so your mod renders with its banner image, highlights, category, and requirements in both the in-app **Mod Browser** and `mods-datas.md`:

```json
{
  "id": "my-mod-id",
  "name": "My Mod Name",
  "version": "1.0.0",
  "author": "AuthorName",
  "category": "Characters",
  "experimental": false,
  "tagline": "Short summary shown on the Mod Browser card.",
  "description": "Full showcase description shown when expanding Details in the Mod Browser.",
  "highlights": [
    "Playable fighter with 3D model and dual shiny",
    "Custom attacks and GPU VFX presets"
  ],
  "image": "preview.png",
  "requirements": "Offline Mode (Mod Engine ON)"
}
```

- **`image`**: Relative path inside the mod folder (e.g. `"preview.png"`, recommended `16:9` ratio such as `640x360` or `960x540`) or an `https://` URL. If omitted, the Mod Browser renders a placeholder banner.
- **`experimental`**: Set `"experimental": true` in both `mod.json` and `info.json` for unfinished, prototype, or work-in-progress mods. Experimental mods appear **only** inside the Mod Browser's **Experimental** tab and are hidden from All, Featured, Characters, Levels, Audio, Quality of Life, Community, and Modpacks.

### Option A: Curated `mods-database/mods-index.json` (Recommended)

Generate `mods-database/mods-index.json` via `node scripts/sync-mods-database.js`:

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
      "experimental": false,
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

Place each mod in its own folder under `mods-database/` or `mods/` with `mod.json` (and optionally `info.json` + `preview.png`):

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

The Mod Browser scans the repository through GitHub's API, reads `mod.json` and `info.json`, and downloads all files recursively into `<dataRoot>/mods/<id>/` when the player clicks **Install**.

---

## 16. Complete Example Mods

Every example below is self-contained. Create the folder inside `./mods/`, drop in the referenced PNG/GLB/OGG assets, enable the mod in **Unbound Settings -> Manage Mods**, and reload Offline Mode.

### Example 1: Playable 3D Fighter with Dual Shiny, Wardrobe Skin, Attack & VFX

```text
mods/
  chronos-knight/
    mod.json
    info.json
    preview.png
    models/
      chronos-knight.glb
    characters/
      knight-front.png
      knight-portrait.png
      knight-portrait-shiny.png
      knight-portrait-alt.png
      knight-icon.png
      knight-pmd.png
      knight-pmd-shiny.png
      knight-pmd-alt-shiny.png
      knight-void-pmd.png
      knight-void-portrait.png
```

`mods/chronos-knight/mod.json`:

```json
{
  "id": "chronos-knight",
  "name": "Chronos Knight",
  "version": "1.0.0",
  "author": "YourName",
  "category": "Characters",
  "scope": "gameplay",
  "gameVersions": ["0.10.36"],
  "description": "Adds Chronos Knight with a 3D .glb model, dual shinies, a Void wardrobe skin, and a custom slash attack.",
  "tags": ["character", "3d-model", "wardrobe", "vfx"],
  "customVfx": [
    {
      "id": "chrono-arc",
      "preset": "slash",
      "shape": "PixSlash",
      "color": "#38bdf8",
      "color2": "#fde047",
      "size": 1.3,
      "strikeArc": true,
      "strikeSparks": 10,
      "hitShape": "Twinkle",
      "hitColor": "#fde047",
      "hitCount": 8
    }
  ],
  "customMoves": [
    {
      "key": "chrono-cleave",
      "name": "Chrono Cleave",
      "type": "steel",
      "cls": "physical",
      "power": 82,
      "accuracy": 100,
      "pp": 20,
      "crit": 1,
      "flavor": "Splits space with twin temporal blades.",
      "archetype": "strike",
      "params": { "count": 2, "dmgMul": 1.15, "areaMul": 1.25, "cdMul": 0.88 },
      "vfxId": "chrono-arc",
      "sfxPreset": "slash"
    }
  ],
  "characters": [
    {
      "id": 2401,
      "key": "chronos-knight",
      "name": "Chronos Knight",
      "gen": 99,
      "types": ["steel", "psychic"],
      "stats": { "hp": 92, "atk": 114, "def": 95, "spa": 90, "spd": 88, "spe": 112 },
      "role": "Temporal Striker",
      "passive": "sniper",
      "rank": "legendary",
      "color": "blue",
      "start": true,
      "unlock": true,
      "unlockSkins": true,
      "cryFrom": 150,
      "kit": ["chrono-cleave", "quick-attack", "psybeam", "hyper-beam"],
      "overrideLearnset": true,
      "model3d": "models/chronos-knight.glb",
      "modelScale": 1.1,
      "modelOffsetY": 0,
      "modelYawOffset": 0,
      "sprite": "characters/knight-front.png",
      "pmdSheet": "characters/knight-pmd.png",
      "pmdShinySheet": "characters/knight-pmd-shiny.png",
      "pmdAltShinySheet": "characters/knight-pmd-alt-shiny.png",
      "portrait": "characters/knight-portrait.png",
      "portraitShiny": "characters/knight-portrait-shiny.png",
      "portraitAltShiny": "characters/knight-portrait-alt.png",
      "icon": "characters/knight-icon.png",
      "wardrobe": [
        {
          "slot": "m1",
          "name": "Void Armor",
          "style": "shadow",
          "pal": "#0b0714 #2c1654 #a855f7 #f5d0fe",
          "desc": "Forged between timelines.",
          "unlocked": true,
          "sheet": "characters/knight-void-pmd.png",
          "portrait": "characters/knight-void-portrait.png"
        }
      ],
      "customUlt": {
        "name": "Time Shatter",
        "type": "psychic",
        "cls": "physical",
        "desc": "Unleashes twin temporal rings that freeze nearby foes.",
        "tint": 3718648,
        "radius": 15,
        "dmgMul": 5.0,
        "dur": 1.8,
        "knock": 8,
        "status": "freeze",
        "vfx": {
          "ringStyle": "Runes",
          "secondaryRingStyle": "Ripple",
          "color2": "#fde047",
          "particleShape": "PixSlash",
          "particleCount": 28
        }
      }
    }
  ]
}
```

---

### Example 2: Unplayable Custom Enemy Pack (Opt-In Spawning Only)

Defines two enemies (`5101`, `5102`). They can never be played, caught, rolled as shiny, or seen in Pokédex, and they only spawn in `"cave"` because `"enemySpawns"` explicitly opts them in.

```text
mods/
  cavern-monsters/
    mod.json
    enemies/
      crystal-slime.png
      obsidian-golem.png
```

`mods/cavern-monsters/mod.json`:

```json
{
  "id": "cavern-monsters",
  "name": "Cavern Monsters",
  "version": "1.0.0",
  "author": "YourName",
  "category": "Gameplay",
  "scope": "gameplay",
  "gameVersions": ["0.10.36"],
  "description": "Adds two unplayable custom enemies that opt into Cerulean Cave.",
  "customEnemies": [
    {
      "id": 5101,
      "key": "crystal-slime",
      "name": "Crystal Slime",
      "types": ["rock", "fairy"],
      "stats": { "hp": 62, "atk": 58, "def": 70, "spa": 55, "spd": 65, "spe": 52 },
      "role": "mob",
      "stages": [1, 2, 3],
      "spawnWeight": 2,
      "sprite": "enemies/crystal-slime.png",
      "cryFrom": 88
    },
    {
      "id": 5102,
      "key": "obsidian-golem",
      "name": "Obsidian Golem",
      "types": ["rock", "dark"],
      "stats": { "hp": 140, "atk": 120, "def": 135, "spa": 65, "spd": 90, "spe": 45 },
      "role": "boss",
      "stages": [2, 3],
      "sprite": "enemies/obsidian-golem.png",
      "cryFrom": 76
    }
  ],
  "enemySpawns": [
    { "enemy": "crystal-slime", "biomes": ["cave"], "role": "mob", "stages": [1, 2, 3], "weight": 2 },
    { "enemy": "obsidian-golem", "biomes": ["cave"], "role": "boss", "stages": [2, 3] }
  ]
}
```

---

### Example 3: Procedural Custom Stage with Prefabs & Map Mechanics

Adds a custom stage (`emerald_sanctum`) combining enhanced procedural terrain (`proceduralGen` + `prefabScatters`), reusable `customPrefabs`, and vanilla-style map mechanics.

`mods/emerald-sanctum/mod.json`:

```json
{
  "id": "emerald-sanctum",
  "name": "Emerald Sanctum",
  "version": "1.0.0",
  "author": "YourName",
  "category": "Levels",
  "scope": "gameplay",
  "gameVersions": ["0.10.36"],
  "description": "Procedural terraced stage with custom prefabs, bounce pads, jackpot machines, shops, dojos, and blessing pillars.",
  "customPrefabs": [
    {
      "id": "emerald_obelisk",
      "name": "Emerald Obelisk",
      "scale": 1.15,
      "colliderRadius": 1.0,
      "parts": [
        { "shape": "cylinder", "size": [0.95, 1.15, 0.55], "pos": [0, 0.28, 0], "color": "#475569" },
        { "shape": "crystal", "size": [0.7], "pos": [0, 2.0, 0], "color": "#22c55e", "emissive": "#15803d", "spin": 1.2, "bob": 0.2 }
      ]
    }
  ],
  "customLevels": [
    {
      "id": "emerald_sanctum",
      "name": "Emerald Sanctum",
      "desc": "Terraced river sanctum filled with bounce pads, treasure wheels, and ancient trials.",
      "region": "custom",
      "envFrom": "forest",
      "thumbnailFrom": "forest",
      "size": 340,
      "landmark": { "kind": "moss_shrine", "radius": 9 },
      "proceduralGen": {
        "base": "vanilla",
        "preset": "river_basin",
        "presetBlend": 0.65,
        "noise": { "scale": 0.014, "octaves": 4, "amplitude": 11, "terraceSteps": 4 },
        "plateaus": { "count": 3, "minRadius": 16, "maxRadius": 28, "height": 6, "rampCount": 2 },
        "rivers": { "count": 1, "width": 7, "depth": 3.8, "meander": 18, "paintPath": true },
        "paths": { "radialCount": 4, "ringRadius": 54, "width": 5 },
        "spawnClearingRadius": 16,
        "waterLevel": -0.8
      },
      "prefabScatters": [
        { "prefabId": "emerald_obelisk", "count": 10, "minDist": 20, "maxDist": 115, "scaleRange": [0.85, 1.25] }
      ],
      "mechanics": [
        {
          "id": "emerald-shroom",
          "kind": "bounce",
          "name": "Emerald Bounce Pad",
          "count": 4,
          "bounceDistance": 30,
          "cooldown": 10,
          "color": "#22c55e"
        },
        {
          "id": "emerald-jackpot",
          "kind": "jackpot",
          "name": "Sanctum Slot Machine",
          "count": 1,
          "cost": 20,
          "costScale": 1.2,
          "color": "#facc15",
          "outcomes": [
            { "weight": 20, "type": "jackpot", "label": "JACKPOT! +180 ₽ & Super Ball", "gold": 180, "chest": true },
            { "weight": 35, "type": "gold", "label": "Emerald Coins! +65 ₽", "gold": 65 },
            { "weight": 25, "type": "heal", "label": "Forest Recovery! +60% HP", "healPct": 0.6 },
            { "weight": 20, "type": "buff", "label": "Swift Wind! +15% Move Speed", "buffs": [{ "stat": "moveSpeed", "mul": 1.15 }] }
          ]
        },
        {
          "id": "sanctum-trader",
          "kind": "shop",
          "name": "Sanctum Trader",
          "count": 1,
          "color": "#38bdf8",
          "stock": [
            { "id": "herb", "label": "Revival Herb", "desc": "Restore 75% Max HP", "cost": 20, "limit": 3, "effect": "heal", "amount": 0.75 },
            { "id": "superball", "label": "Free Super Ball", "desc": "Spawns a Super Ball beside you", "cost": 35, "limit": 2, "effect": "chest" },
            { "id": "blade", "label": "Emerald Charm", "desc": "+18% Damage for this run", "cost": 45, "limit": 2, "effect": "stat", "stat": "damage", "mul": 1.18 }
          ]
        },
        {
          "id": "sanctum-dojo",
          "kind": "dojo",
          "name": "Sanctum Trial Dojo",
          "count": 1,
          "waveCount": 12,
          "waveEliteCount": 3,
          "color": "#f97316",
          "reward": { "chest": true, "gold": 80, "xp": 120 }
        },
        {
          "id": "emerald-pillar",
          "kind": "pillar",
          "prefabId": "emerald_obelisk",
          "name": "Rune Blessing Pillar",
          "desc": "+15% Attack Speed & full Ult charge!",
          "count": 2,
          "radius": 5.5,
          "chargeTime": 4.5,
          "color": "#a855f7",
          "grantUlt": true,
          "buffs": [{ "stat": "attackSpeed", "mul": 1.15 }]
        }
      ]
    }
  ]
}
```

---

### Example 4: Additive Music & SFX Pack

```text
mods/
  retro-soundpack/
    mod.json
    audio/
      music/
        title-retro.ogg
        route-battle.ogg
        rival-boss.ogg
      sfx/
        crit-chime.ogg
```

`mods/retro-soundpack/mod.json`:

```json
{
  "id": "retro-soundpack",
  "name": "Retro Soundpack",
  "version": "1.0.0",
  "author": "YourName",
  "category": "Audio",
  "scope": "client",
  "gameVersions": ["0.10.36"],
  "description": "Adds retro menu, battle, and boss tracks alongside vanilla music.",
  "customMusic": [
    { "id": "retro-title", "name": "Retro Title", "file": "audio/music/title-retro.ogg", "pool": "menu", "loop": 3.5, "volume": 0.95 },
    { "id": "retro-route", "name": "Retro Route", "file": "audio/music/route-battle.ogg", "pool": "ingame", "loop": 8.0, "volume": 0.9, "weight": 2 },
    { "id": "retro-boss", "name": "Retro Boss", "file": "audio/music/rival-boss.ogg", "pool": "boss", "loop": 2.4, "volume": 1.0, "weight": 2 }
  ],
  "customSfx": [
    { "id": "retro-crit", "file": "audio/sfx/crit-chime.ogg", "volume": 0.9, "pitchVar": 0.05 }
  ],
  "settings": [
    {
      "key": "replaceMenuMusic",
      "label": "Use Retro Title as Default Menu Music",
      "desc": "Automatically plays Retro Title unless you pick another song in-game.",
      "type": "toggle",
      "default": true,
      "cheat": false
    }
  ],
  "defaultMenuMusic": "retro-title"
}
```

---

### Example 5: Mod with a Custom Config UI Module (`configModule`)

```text
mods/
  challenge-rules/
    mod.json
    script.js
    config/
      panel.js
      panel.css
```

`mods/challenge-rules/mod.json`:

```json
{
  "id": "challenge-rules",
  "name": "Challenge Rules",
  "version": "1.0.0",
  "author": "YourName",
  "category": "Gameplay",
  "scope": "gameplay",
  "gameVersions": ["0.10.36"],
  "description": "Custom difficulty modifiers configured through a dedicated UI module.",
  "scripts": ["script.js"],
  "configModule": {
    "script": "config/panel.js",
    "style": "config/panel.css",
    "title": "Challenge Rules",
    "subtitle": "Adjust custom run rules and presets"
  },
  "settings": [
    { "key": "enemyHpMul", "type": "select", "default": "1.0", "cheat": true },
    { "key": "noHealing", "type": "toggle", "default": false, "cheat": true }
  ]
}
```

`mods/challenge-rules/config/panel.js`:

```js
(function () {
  window.PokebonkModConfigModules = window.PokebonkModConfigModules || {};
  window.PokebonkModConfigModules['challenge-rules'] = {
    mount(ctx) {
      const { container, mod, api, isOffline, toast } = ctx;
      const cfg = mod.settingsValues || {};
      container.innerHTML = `
        <div class="cr-panel">
          <div class="cr-row">
            <div>
              <strong>Enemy HP Multiplier</strong>
              <p>Scales enemy health in Offline runs.</p>
            </div>
            <select id="cr-hp" ${!isOffline ? 'disabled' : ''}>
              <option value="1.0" ${cfg.enemyHpMul === '1.0' ? 'selected' : ''}>1.0x (Standard)</option>
              <option value="1.5" ${cfg.enemyHpMul === '1.5' ? 'selected' : ''}>1.5x (Hard)</option>
              <option value="2.0" ${cfg.enemyHpMul === '2.0' ? 'selected' : ''}>2.0x (Brutal)</option>
            </select>
          </div>
          <label class="cr-row">
            <div>
              <strong>Disable Healing Drops</strong>
              <p>Removes passive recovery pickups during runs.</p>
            </div>
            <input type="checkbox" id="cr-noheal" ${cfg.noHealing ? 'checked' : ''} ${!isOffline ? 'disabled' : ''} />
          </label>
        </div>
      `;
      container.querySelector('#cr-hp').addEventListener('change', async (ev) => {
        try {
          await api.updateModSettings(mod.id, { enemyHpMul: ev.target.value });
          toast('Enemy HP multiplier updated.');
        } catch (err) {
          toast(err.message, true);
        }
      });
      container.querySelector('#cr-noheal').addEventListener('change', async (ev) => {
        try {
          await api.updateModSettings(mod.id, { noHealing: ev.target.checked });
          toast('Challenge rule updated.');
        } catch (err) {
          toast(err.message, true);
          ev.target.checked = !ev.target.checked;
        }
      });
    }
  };
})();
```
