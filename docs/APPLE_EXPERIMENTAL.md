# Experimental: Apple Support (macOS & iOS Sideload)

> **Experimental & Untested Notice**
> The Apple builds are **experimental** because the developer does not currently own macOS or iOS hardware to test them firsthand. Feedback, crash logs, and compatibility reports from macOS and iOS testers are warmly welcomed via [GitHub Issues](https://github.com/HyruleChosenOne/Pokebonk-Unbound/issues).

All experimental Apple packages live under the dedicated **[Experimental: Apple (macOS & iOS Sideload)](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/experimental-apple)** pre-release tab so stable Windows, Linux / SteamOS, and Android auto-updaters are never affected.

---

## macOS (Apple Silicon & Intel)

### Downloads

Download the **Complete Edition** (recommended — includes the `v0.10.31` offline game build ready to play, with zero pre-installed mods) from the **[Experimental: Apple](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/experimental-apple)** release tab:

- **Apple Silicon (`M1 / M2 / M3 / M4`)**: `PokeBonk-Unbound-Complete-1.0.5-mac-arm64.zip`
- **Intel Mac (`x64`)**: `PokeBonk-Unbound-Complete-1.0.5-mac-x64.zip`
- **Optional Portable ("Nothing Included")**: `PokeBonk-Unbound-Portable-1.0.5-mac-arm64.zip` / `...-mac-x64.zip`

### First-Time Launch (Unsigned App)

Because the experimental macOS builds are **unsigned / un-notarized**, macOS Gatekeeper may display *"PokeBonk Unbound is damaged and can't be opened"* or *"cannot be verified"* until quarantine is cleared and a local ad-hoc signature is applied:

1. Extract the `.zip` archive.
2. **Option A (1-Click Helper)**: Right-click **`First-Time-Setup-macOS.command`** -> **Open**. It clears macOS quarantine, runs local ad-hoc signing (`codesign --force --deep --sign -`), and launches the app automatically.
3. **Option B (Terminal)**:
   ```bash
   xattr -cr "PokeBonk Unbound.app"
   codesign --force --deep --sign - "PokeBonk Unbound.app"
   open "PokeBonk Unbound.app"
   ```
4. Once launched successfully, you can drag `PokeBonk Unbound.app` into `/Applications`.

### macOS Shortcuts & Data Storage

- `Cmd+,` — Open **Unbound Settings**
- `F1` — Show / hide the in-window toolbar
- `Ctrl+Cmd+F` — Toggle fullscreen
- `Cmd+R` — Reload game
- **Saves, Profiles, Mods & Offline Build Data**: `~/Library/Application Support/pokebonk-unbound/`
- **Optional Side-by-Side Mods**: Placing a `mods/` folder right beside `PokeBonk Unbound.app` is also detected automatically.

---

## iOS / iPadOS (`.ipa` Sideloading — Experimental)

### Current Status

The native iOS client (`UIKit` + `WKWebView` + embedded `NodeMobile.xcframework` running the same local engine and **Unbound Settings** UI as Android, with isolated Online/Offline sessions, auto-hiding floating **Unbound** button, native `.json` save export/import, and `.zip` mod import via the iOS Files picker) is prepared and staged in the project, but compiling the final ARM64 `.ipa` Mach-O binary requires **macOS + Xcode**.

Because the developer does not have a Mac available to compile and test `.ipa` binaries directly yet:
- Once compiled on macOS, unsigned sideloadable `.ipa` files (`PokeBonk-Unbound-Complete-1.0.5.ipa` & `PokeBonk-Unbound-Portable-1.0.5.ipa`) will be posted directly under the **[Experimental: Apple](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases/tag/experimental-apple)** release tab.

### How to Sideload the `.ipa` (Once Published)

The iOS `.ipa` is distributed unsigned for sideloading on iOS 15.0+ / iPadOS 15.0+ (no App Store distribution):

- **AltStore / SideStore**: Open the `.ipa` in AltStore or SideStore on your iPhone/iPad (refresh every 7 days on free Apple IDs; SideStore supports on-device Wi-Fi refresh).
- **Sideloadly (Windows / macOS)**: Connect your iPhone/iPad via USB, drag the `.ipa` into Sideloadly, enter your Apple ID, and click **Start**.
- **TrollStore (Supported iOS Versions)**: Share the `.ipa` directly to TrollStore for permanent installation without 7-day refreshes.

### iOS Features & Data Storage

- **Isolated Online & Offline Modes**: Online Mode runs `https://pokebonk.com/` cleanly in a vanilla `WKWebView`; Offline Mode serves PokéBonk from the embedded local server on `127.0.0.1` with full Mod Browser, Curated Modpacks, P2P Co-op, and Offline Modding Engine support.
- **Files App Access**: `UIFileSharingEnabled` is enabled so your `unbound-data/` folder (saves, profiles, mods) is accessible right inside the iOS **Files** app under **On My iPhone / iPad -> PokéBonk Unbound**.
- **Import Mod (`.zip`) & Save Export/Import**: Uses the native iOS Document Picker so you can import `.zip` mods and `.json` saves directly from iCloud Drive or On My iPhone.
