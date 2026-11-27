# Apple Support (iOS / iPadOS Sideload & Experimental macOS)

> **Status Notice**
> - **iOS / iPadOS (`.ipa` Sideload)**: Verified working on real iPad Pro hardware and included in the main **[v1.1.1 Release](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/v1.1.1)** (with Portable under **[Experimental: Portable](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/experimental-portable)**).
> - **macOS (`.zip`)**: Still **experimental / untested** on real Mac hardware and hosted under the **[Experimental: Apple](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/experimental-apple)** pre-release tab.
>
> Feedback, crash logs (`Documents/PokéBonk Unbound` / `ios-node.log`), and compatibility reports are welcomed via [GitHub Issues](https://github.com/HyruleChosenOne/Pokebonk-Unbound/issues).

---

## macOS (Apple Silicon & Intel)

### Downloads

Download the **Complete Edition** (recommended — includes the `v0.10.38` offline game build ready to play, with zero pre-installed mods) from the **[Experimental: Apple](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/experimental-apple)** release tab:

- **Apple Silicon (`M1 / M2 / M3 / M4`)**: `PokeBonk-Unbound-Complete-1.1.1-mac-arm64.zip`
- **Intel Mac (`x64`)**: `PokeBonk-Unbound-Complete-1.1.1-mac-x64.zip`
- **Experimental Portable ("Nothing Included")**: `PokeBonk-Unbound-Portable-1.1.1-mac-arm64.zip` / `...-mac-x64.zip`

### First-Time Launch (Unsigned App)

Because the experimental macOS builds are **unsigned / un-notarized**, macOS Gatekeeper may display *"PokeBonk Unbound is damaged and can't be opened"* or *"cannot be verified"* until quarantine is cleared and a local ad-hoc signature is applied:

1. Extract the `.zip` archive.
2. **Option A (1-Click Helper — Recommended)**: Right-click **`First-Time-Setup-macOS.command`** -> **Open**. It clears macOS quarantine, applies an inside-out local ad-hoc code signature to nested frameworks, helpers, and the `.app`, and launches PokéBonk Unbound automatically.
3. **Option B (Terminal)**:
   ```bash
   xattr -cr "PokeBonk Unbound.app"
   ./First-Time-Setup-macOS.command
   ```
4. Once launched successfully, you can drag `PokeBonk Unbound.app` into `/Applications`.

### macOS Shortcuts & Data Storage

- `Cmd+,` — Open **Unbound Settings**
- `Ctrl+Cmd+F` — Toggle fullscreen
- `Cmd+R` — Reload game
- `Cmd+Q` — Quit (use the native macOS top menu bar to switch Online / Offline Mode)
- **Saves, Profiles, Mods & Offline Build Data**: `~/Library/Application Support/pokebonk-unbound/`
- **Optional Side-by-Side Mods**: Placing a `mods/` folder right beside `PokeBonk Unbound.app` is also detected automatically (after clearing quarantine / moving out of Gatekeeper App Translocation).

---

## iOS / iPadOS (Unsigned `.ipa` Sideloading)

### Downloads (v1.1.1 — Unsigned `arm64` `.ipa`)

Download directly from the **[v1.1.1 Release](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/v1.1.1)** (Complete) or **[Experimental: Portable](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/experimental-portable)** (Portable):

- **Complete Edition (Recommended — includes `v0.10.38` offline build)**: **[PokeBonk-Unbound-Complete-1.1.1.ipa](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/download/v1.1.1/PokeBonk-Unbound-Complete-1.1.1.ipa)**
- **Experimental Portable Edition ("Nothing Included" — downloads offline build on demand)**: **[PokeBonk-Unbound-Portable-1.1.1.ipa](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/download/experimental-portable/PokeBonk-Unbound-Portable-1.1.1.ipa)**

### Automated CI Builds

Because PokéBonk Unbound is a fangame distributed **unsigned** for sideloading (no App Store distribution) and the developer does not have local Apple hardware, compilation and packaging are automated via GitHub Actions `macos-latest` runners ([build-ipa.yml](../.github/workflows/build-ipa.yml)):

1. Verifies the existing **macOS** port packs cleanly, passes inside-out `codesign --verify --deep --strict`, and loads `app.asar` on macOS.
2. Runs an **iOS Simulator** compile/link smoke check against `NodeMobile.xcframework`.
3. Compiles the **unsigned `arm64` iOS `.app`** with `xcodebuild` (`CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO`), validates `Info.plist` (`plutil -lint`) and `arm64` Mach-O slices (`lipo -info`), and packages `PokeBonk-Unbound-Complete-<ver>.ipa` & `PokeBonk-Unbound-Portable-<ver>.ipa` as downloadable workflow artifacts (and optionally uploads them to the **[Experimental: Apple](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/experimental-apple)** release).

### How to Sideload the Unsigned `.ipa`

Targets **iOS 15.0+ / iPadOS 15.0+** (Portrait & Landscape supported on both iPhone and iPad):

- **AltStore / SideStore**: Open the `.ipa` in AltStore or SideStore on your iPhone/iPad (refresh every 7 days on free Apple IDs; SideStore supports on-device Wi-Fi refresh).
- **Sideloadly (Windows / macOS)**: Connect your iPhone/iPad via USB, drag the `.ipa` into Sideloadly, enter your Apple ID, and click **Start**.
- **TrollStore (Supported iOS 15.0–17.0 Devices)**: Share the `.ipa` directly to TrollStore for permanent installation without 7-day refreshes.

### iOS Features, Data Storage & Known Platform Caveats

- **Isolated Online & Offline Modes**: Online Mode runs `https://pokebonk.com/` cleanly in a vanilla `WKWebView` (using dedicated isolated persistent `WKWebsiteDataStore` containers on iOS 17+); Offline Mode serves PokéBonk from the embedded local Node.js 18 server (`--jitless`) on `127.0.0.1`.
- **Files App Access & Diagnostics**: `UIFileSharingEnabled` is enabled so your `unbound-data/` folder (saves, profiles, mods, and `ios-node.log` runtime diagnostics) is accessible right inside the iOS **Files** app under **On My iPhone / iPad -> PokéBonk Unbound**.
- **Import Mod (`.zip`) & Save Export/Import**: Uses the native iOS Document Picker (with streaming `.zip` upload to stay within iOS Jetsam RAM limits).
- **Known iOS `< 18.4` `.ogg` Audio Limitation**: Base PokéBonk background music (`.mp3`) works on all supported iOS versions, while Pokémon cries and `.ogg` audio mods rely on WebKit's native Ogg Vorbis/Opus decoder added in **iOS 18.4** (on iOS 15.0–18.3, `.ogg` cries and `.ogg` mod tracks will be silent).
- **Known P2P Co-op LAN Discovery Limitation**: Direct `IP:Port` TCP/WebSocket Co-op works over LAN/VPN/port-forwarding, but automatic UDP broadcast "Local Lobbies" discovery (`255.255.255.255:41284`) requires Apple's restricted multicast entitlement unavailable to free sideloading profiles — enter the Host's `IP:Port` directly to join on iOS.
