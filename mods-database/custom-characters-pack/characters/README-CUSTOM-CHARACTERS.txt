PokéBonk Unbound — Custom Characters Guide (PokéAPI Powered)
====================================================================

Drop ANY custom character .json into this folder (`./characters/`) and reload Offline Mode.
Your character automatically appears natively inside PokéBonk's menus:
  1. Play -> Classic -> Character Selection -> Filters -> "Custom Roster"
  2. Pokédex+ -> Custom (Gen 99)
  3. 3D In-Game Gameplay (moving, attacking, casting Ultimate!)

Characters start LOCKED by default (`"unlock": false`). Unlock them anytime via
the native toolbar:  Mods Config -> Custom Characters Support -> Unlock All Custom Characters
(or set `"unlock": true` in a character's JSON if you prefer that character unlocked immediately).

Sprites via PokéAPI (Recommended — zero art needed!):
  Simply set `"pokeApiId": <id>` to ANY PokéAPI Pokémon or alternate form ID:
    - Gen 1–9 Pokémon: 1 to 1025 (e.g. 448 = Lucario, 445 = Garchomp, 658 = Greninja)
    - Mega / Primal / Regional Forms: 10001+ (e.g. 10079 = Mega Rayquaza, 10078 = Primal Groudon,
      10077 = Primal Kyogre, 10043 = Mega Mewtwo X, 10117 = Ash-Greninja)

Optional Custom PNG Override (for non-Pokémon characters):
  "sprite": "my-hero.png", "portrait": "my-hero.png", "icon": "my-hero.png"

Example Custom Character (`2006-mega-lucario.json`):
{
  "id": 2006,
  "key": "mega-lucario",
  "name": "Mega Lucario",
  "pokeApiId": 10059,
  "start": true,
  "unlock": false,
  "role": "Aura Striker",
  "rank": "legendary",
  "types": ["fighting", "steel"],
  "stats": { "hp": 70, "atk": 145, "def": 88, "spa": 140, "spd": 70, "spe": 112 },
  "passive": "iron-fist",
  "kit": ["mach-punch", "aura-sphere", "meteor-mash", "flash-cannon"],
  "ultFrom": 68,
  "cryFrom": 68,
  "flavor": "Overflowing aura turns Mega Lucario into an unstoppable martial artist."
}
