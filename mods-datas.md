# PokéBonk Unbound — Available Mods Catalog

PokéBonk Unbound releases ship cleanly without bundled mods. Every mod below is 100% optional, runs strictly in **Offline Mode**, and can be installed with 1 click inside **Unbound Settings -> Mod Browser**.

Each mod directory inside `mods-database/<mod-id>/` includes a `mod.json` manifest and an `info.json` showcase file (providing its description, highlights, category, and preview image slot for the in-app Mod Browser).

---

## Quick Overview

| Mod ID | Name | Category | Version | Author | Summary |
| --- | --- | --- | --- | --- | --- |
| `custom-characters-pack` | [Custom & Non-Dexed Pokémon Pack (18 Fighters)](#custom-characters-pack) | Characters | `v1.1.0` | HyruleChosenOne | 18 playable Non-Dexed, Glitch, Beta, Spin-Off, and Mega/Primal Pokémon including MissingNo., Shadow Lugia, Primal Dialga, Bad Egg, Substitute Doll, Beta Arceus, and more. |
| `gen3-9-regions-levels` | [Gen 3-9 Regions & Levels Pack (14 Unique Maps)](#gen3-9-regions-levels) | Levels | `v1.0.0` | HyruleChosenOne | 14 playable levels across Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea — 2 unique maps per region with 3D landmarks. |
| `hyrules-mods` | [Hyrule's Mods (QoL & Cheats Collection)](#hyrules-mods) | Quality of Life | `v1.0.0` | HyruleChosenOne | Offline Mode events hub, live main menu customization, P2P multiplayer, and optional solo cheats. |
| `minish-cap-link` | [Link (The Minish Cap) — Playable Character & Custom Attacks](#minish-cap-link) | Characters | `v1.0.0` | HyruleChosenOne | Playable Link from The Minish Cap with 8-direction sprites, 5 custom attacks, dedicated custom VFX, and Four Sword Ultimate. |
| `national-dex-gen3-9` | [National Dex Expansion (Gen 3-9: Hoenn to Paldea)](#national-dex-gen3-9) | Characters | `v1.0.0` | HyruleChosenOne | Expands the playable Pokédex to #1025 with 419 Gen 3-9 families, 72 custom attacks, and 24 signature Ultimates. |
| `pokemon-audio-pack` | [Pokémon Soundtrack Audio Pack (HGSS & FRLG)](#pokemon-audio-pack) | Audio | `v1.0.0` | HyruleChosenOne | 17 curated HeartGold/SoulSilver and FireRed/LeafGreen music tracks plus 4 iconic SFX added without replacing vanilla songs. |

---

## Mod Details

<a id="custom-characters-pack"></a>
### Custom & Non-Dexed Pokémon Pack (18 Fighters)

> Preview image slot: `mods-database/custom-characters-pack/preview.png` *(coming soon)*

- **ID**: `custom-characters-pack`
- **Category**: Characters
- **Version**: `v1.1.0`
- **Author**: HyruleChosenOne
- **Requirements**: Offline Mode (Mod Engine ON)
- **Info File**: [`mods-database/custom-characters-pack/info.json`](mods-database/custom-characters-pack/info.json)
- **Tags**: `custom-characters`, `non-dexed`, `missingno`, `shadow-lugia`, `primal-dialga`, `beta-pokemon`, `custom-attacks`, `custom-vfx`, `custom-items`, `forms`

Expands the core Custom region (#2000-#9999) with 18 fully animated playable fighters: 13 iconic Non-Dexed, Glitch, Beta, and Spin-Off legends (MissingNo. with animated Gen 1 glitch sprites and DMG-Green Shiny, Substitute Doll, Bad Egg, Shadow Lugia XD001, Primal Dialga, Shadow Mewtwo, Eternal Flower Floette, Ultra Necrozma, Beta Arceus, Purple Kecleon, Mikon Beta Vulpix, Pikachu Libre, and Hakogame Beta Turtle) plus 5 Special Forms (Mega Rayquaza, Primal Groudon, Primal Kyogre, Mega Mewtwo X, and Ash-Greninja). Every fighter includes 8-direction animations, portraits, signature custom attacks with Core Custom VFX, and custom Ultimates.

**Highlights:**
- Glitch & Oddity icons: MissingNo. (#2011, with custom animated glitch sheet & DMG-Green Shiny), Substitute Doll (#2012), and Bad Egg (#2013)
- Spin-Off & Unreleased legends: Shadow Lugia XD001 (#2014), Primal Dialga (#2015), Shadow Mewtwo (#2016), Eternal Flower Floette (#2017), Ultra Necrozma (#2018), Beta Arceus (#2019), Purple Kecleon (#2020), Mikon (#2021), Pikachu Libre (#2022), and Hakogame (#2023)
- Special Forms: Mega Rayquaza, Primal Groudon, Primal Kyogre, Mega Mewtwo X, and Ash-Greninja
- 37 signature custom attacks, 15 custom GPU VFX presets, 18 custom Ultimates, and 5 custom Pokéball pickup items
- Drop-in ./characters/ folder support — runs natively via the Core Modding API (no separate enabler mod required)


<a id="gen3-9-regions-levels"></a>
### Gen 3-9 Regions & Levels Pack (14 Unique Maps)

> Preview image slot: `mods-database/gen3-9-regions-levels/preview.png` *(coming soon)*

- **ID**: `gen3-9-regions-levels`
- **Category**: Levels
- **Version**: `v1.0.0`
- **Author**: HyruleChosenOne
- **Requirements**: Offline Mode (Mod Engine ON; works standalone or with National Dex Gen 3-9)
- **Info File**: [`mods-database/gen3-9-regions-levels/info.json`](mods-database/gen3-9-regions-levels/info.json)
- **Tags**: `levels`, `regions`, `maps`, `gen3`, `gen4`, `gen5`, `gen6`, `gen7`, `gen8`, `gen9`

Standalone regional levels expansion adding all 7 Gen 3-9 regions to PokéBonk's Map Picker with 2 distinct maps each (14 levels total). Every map features its own terrain relief, color palette, weather pool, sanctuary arena, regional encounters, and a dedicated 3D centerpiece landmark. Works completely standalone with vanilla Kanto/Johto Pokémon or paired with National Dex Expansion (Gen 3-9).

**Highlights:**
- Hoenn: Petalburg Canopy & Mt. Chimney Caldera
- Sinnoh: Mt. Coronet Spear Pillar & Eterna Forest Chateau
- Unova: Desert Resort Relic Castle & Dragonspiral Tower
- Kalos: Azure Bay Sea Arch & Reflection Cave Prisms
- Alola: Melemele Tapu Ruins & Wela Volcano Fire Altar
- Galar: Galar Wild Area Dynamax Den & Crown Tundra Temple
- Paldea: Asado Desert Titan Mesa & Area Zero Terastal Spire


<a id="hyrules-mods"></a>
### Hyrule's Mods (QoL & Cheats Collection)

> Preview image slot: `mods-database/hyrules-mods/preview.png` *(coming soon)*

- **ID**: `hyrules-mods`
- **Category**: Quality of Life
- **Version**: `v1.0.0`
- **Author**: HyruleChosenOne
- **Requirements**: Offline Mode (Mod Engine ON)
- **Info File**: [`mods-database/hyrules-mods/info.json`](mods-database/hyrules-mods/info.json)
- **Tags**: `qol`, `collection`, `enabler`, `events`, `p2p`, `themes`, `cheats`, `unlocks`

All-in-one Offline Mode Quality-of-Life, Enablers, and Trainer Cheats collection by HyruleChosenOne. Restores past seasonal events in a dedicated Choose-Mode hub without altering your wallpaper or music, unlocks direct IP:Port P2P Co-op multiplayer, and adds live 3D main menu diorama and music selectors alongside optional solo speed/combat cheats and save utilities.

**Highlights:**
- Events Enabler restoring Lavender Tower Night and Mewtwo Strikes Back in a dedicated hub
- Direct IP:Port Peer-to-Peer Co-op multiplayer hosting and joining
- Live 3D Main Menu Wallpaper and Music selector (supports additive custom music)
- Optional solo Offline cheats (Run Speed 1x/1.5x/2x, God Mode, Overdrive, Unlock All Difficulties, and Trainer Save Utilities)


<a id="minish-cap-link"></a>
### Link (The Minish Cap) — Playable Character & Custom Attacks

> Preview image slot: `mods-database/minish-cap-link/preview.png` *(coming soon)*

- **ID**: `minish-cap-link`
- **Category**: Characters
- **Version**: `v1.0.0`
- **Author**: HyruleChosenOne
- **Requirements**: Offline Mode (Mod Engine ON)
- **Info File**: [`mods-database/minish-cap-link/info.json`](mods-database/minish-cap-link/info.json)
- **Tags**: `character`, `zelda`, `minish-cap`, `custom-attacks`, `custom-vfx`, `custom-items`

Brings Link from The Legend of Zelda: The Minish Cap into PokéBonk as a fully animated playable fighter in the Custom region (#2010). Features complete 8-direction walk, idle, attack, and hurt spritesheets, a Four Sword Red shiny variant, 5 signature Minish Cap custom attacks built with the Core Custom VFX engine, a custom Four Sword Hurricane Spin Ultimate, and 2 Hyrule Pokéball pickup items.

**Highlights:**
- Full 8-direction GBA-style animated spritesheet plus Four Sword Red shiny variant
- 5 custom attacks: Picori Blade, Magical Boomerang, Gust Jar, Cane of Pacci, and Flame Lantern
- 5 custom GPU VFX presets showcasing dual-color slash arcs, returning crescents, gale waves, magic beams, and flame rings
- Custom Ultimate: Four Sword Hurricane Spin with rune/petal shockwaves and slash bursts
- 2 custom Pokéball items: Gold Kinstone and Pegasus Boots


<a id="national-dex-gen3-9"></a>
### National Dex Expansion (Gen 3-9: Hoenn to Paldea)

> Preview image slot: `mods-database/national-dex-gen3-9/preview.png` *(coming soon)*

- **ID**: `national-dex-gen3-9`
- **Category**: Characters
- **Version**: `v1.0.0`
- **Author**: HyruleChosenOne
- **Requirements**: Offline Mode (Mod Engine ON)
- **Info File**: [`mods-database/national-dex-gen3-9/info.json`](mods-database/national-dex-gen3-9/info.json)
- **Tags**: `gen3`, `gen4`, `gen5`, `gen6`, `gen7`, `gen8`, `gen9`, `custom-moves`, `national-dex`

Complete Gen 3 through Gen 9 character and moveset expansion covering Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea (#252-#1025). Adds 419 playable base evolution families, 774 species with animated sprites, 72 custom Gen 3-9 attacks across all 18 types, and 24 custom signature Ultimates for iconic starters, pseudos, and legendaries. Pure Pokémon and attacks pack with zero bundled levels; pair with Gen 3-9 Regions & Levels Pack for regional maps.

**Highlights:**
- Expands the Pokédex cap from #251 to #1025 across all 7 Gen 3-9 regions
- 419 playable base families (all starters, fan favorites, Paradox Pokémon, and legendaries)
- 72 custom Gen 3-9 attacks across all 18 types rendered via PokéBonk's native GPU VFX engine
- 24 custom Ultimates (Rayquaza, Lucario, Garchomp, Greninja, Zacian, Koraidon, Miraidon, Raging Bolt, Terapagos, and more)
- Characters start locked by default for progression, with per-generation unlock tools in Unbound Settings


<a id="pokemon-audio-pack"></a>
### Pokémon Soundtrack Audio Pack (HGSS & FRLG)

> Preview image slot: `mods-database/pokemon-audio-pack/preview.png` *(coming soon)*

- **ID**: `pokemon-audio-pack`
- **Category**: Audio
- **Version**: `v1.0.0`
- **Author**: HyruleChosenOne
- **Requirements**: Offline Mode (Mod Engine ON)
- **Info File**: [`mods-database/pokemon-audio-pack/info.json`](mods-database/pokemon-audio-pack/info.json)
- **Tags**: `audio`, `music`, `sfx`, `hgss`, `frlg`, `soundtrack`

Additive Pokémon soundtrack and sound effects mod curated from the HeartGold/SoulSilver and FireRed/LeafGreen soundtracks. Registers 3 peaceful menu themes, 8 high-energy wild/trainer/gym battle themes into the in-game music rotation, 6 legendary/champion boss themes into the boss pool, and 4 classic SFX stings — all without overwriting or removing a single vanilla PokéBonk track.

**Highlights:**
- 3 selectable main menu themes: Title Screen (FRLG), Title Screen (HGSS), and National Park (HGSS)
- 8 battle/run themes added to the in-game playlist alongside vanilla songs
- 6 legendary and champion boss themes (Ho-Oh, Lugia, Suicune, Champion Lance/Red, Deoxys, Mewtwo/Legendary)
- 4 short iconic SFX clips routed through PokéBonk's native SFX volume slider
- 100% additive — every vanilla PokéBonk song remains selectable and intact

---

## Installing Mods

1. Open **Unbound Settings** from the top toolbar (`Unbound Settings -> Open Unbound Settings...`).
2. Switch to the **Mod Browser** tab.
3. Click **Install** on any mod you want, then enable the **Offline Mod Engine** and toggle the mod on in **Installed Mods**.

Want to create or publish your own mod? See [docs/MODDING.md](docs/MODDING.md).
