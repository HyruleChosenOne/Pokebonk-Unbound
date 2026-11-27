# Security Policy

## Supported Versions

Security fixes ship for the latest stable release of **PokéBonk Unbound** and the current official mod catalog on the `mods-database` release. Deprecated releases receive no patches.

| Component / Version | Supported | Notes |
| --- | --- | --- |
| **Complete Edition `v1.1.1`** (Windows, Linux/SteamOS, Android, iOS) | Yes | Active stable release (`Latest`, bundles PokéBonk `v0.10.38`). |
| **Experimental: Portable `v1.1.1`** (Windows, Linux/SteamOS, Android) | Best-effort | Pre-release (`experimental-portable`); downloads live builds on demand. |
| **Experimental: Apple `v1.1.1`** (macOS & iOS Sideload) | Best-effort | Pre-release (`experimental-apple`); patches ship alongside stable releases. |
| **Official Mods (`mods-database` latest)** | Yes | Update from GitHub via **Unbound Settings -> Mod Browser -> Update All**. |
| **`< 1.1.1`** (`v1.0.0` – `v1.1.0`) | No | Deprecated; upgrade to `v1.1.1` or newer. |

---

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub Issues, Pull Requests, or Discussions.**

Report vulnerabilities privately through GitHub's **Private Vulnerability Reporting** portal for this repository:

- **Report Privately**: [Open a Private Security Advisory](https://github.com/HyruleChosenOne/Pokebonk-Unbound/security/advisories/new)

### What to Include

1. **Affected version & edition** (e.g., `v1.1.1 Complete`, `v1.1.1 Portable Experimental`, or a specific mod ID and version).
2. **Platform & OS** (Windows, Linux/SteamOS, Android, macOS, or iOS).
3. **Vulnerability category & impact** (e.g., Online Mode isolation bypass, live cheat leak into Online/Co-op, local server auth bypass, Zip-Slip / path traversal in mod import, P2P relay DoS, or code execution outside the Offline renderer).
4. **Minimal reproduction steps** or proof-of-concept payload.
5. **Sanitized logs or screenshots** (strip any personal paths, IP addresses, or tokens).

### Response & Disclosure Process

- **Acknowledgment**: Initial response within **72 hours** confirming receipt.
- **Triage & Assessment**: Severity evaluation and reproduction within **7 days**.
- **Fix & Coordinated Disclosure**: Patches are built, verified, and published to GitHub Releases before advisory details are disclosed publicly. Reporters are credited unless they prefer to remain anonymous.

---

## Security Architecture & Boundaries

PokéBonk Unbound enforces strict isolation between **Online Mode** and **Offline Mode**:

### 1. Online Mode Anti-Cheat & Session Isolation
- Online Mode loads `https://pokebonk.com/` inside an isolated session (`persist:pokebonk-unbound-online` on desktop with `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`; clean WebView session on mobile).
- Zero script injection, zero mod patching, zero cheat toggles, and zero network interception occur in Online Mode.
- Any solo live cheats enabled in **Hyrule's Collection** are automatically reset to OFF whenever launching Online Mode or hosting/joining a Co-op session.
- Offline cheat mutations and save imports are rejected server-side (`HTTP 403`) while in Online Mode.

### 2. Local Offline Engine, Storage & Control API
- The local Offline server binds strictly to loopback (`127.0.0.1`) on an ephemeral port and is never exposed externally.
- User saves, mods, and downloaded offline builds stay inside the single user-selected **Game Folder** (`saves/`, `mods/`, `build-data/`). On Windows, the single-file portable launcher caches its unpacked runtime under `%LOCALAPPDATA%\PokéBonk Unbound\runtime\<build-hash>` to avoid repeated temp extraction.
- On mobile builds, the local Control API (`/unbound-api/*`) requires a per-launch cryptographic session token (`X-Unbound-Token`) generated at startup.

### 3. Mod `.zip` Import & Community Mods Safety
- Archive extraction validates every entry against a canonical destination root (`path.resolve`) to block Zip-Slip / directory traversal outside `./mods/`.
- Official mods are published exclusively through the `mods-database` GitHub release, and **Community Mods** require manual maintainer review before indexing.
- **Important User Guidance**: Offline mods (`scripts`, `bundlePatches`) run JavaScript inside the local Offline renderer (`127.0.0.1`). Only import third-party `.zip` mods from sources you trust.

### 4. P2P Co-op Networking
- The direct IP:Port P2P Co-op relay only opens a listening port while you explicitly host a room and shuts down immediately when hosting stops.
- Share your host IP:Port only with trusted friends and prefer a private virtual LAN (Tailscale, ZeroTier, or Radmin VPN) over public port forwarding.

### 5. Verifying Official Downloads
- Download binaries **only** from the official [GitHub Releases](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases) page.
- Because PokéBonk Unbound is an independent community client without commercial code-signing certificates, OS prompts (Windows SmartScreen, macOS Gatekeeper, Android unknown-sources, iOS sideload trust) are expected on first launch.
- Verify the **SHA-256 digest** shown on each GitHub Release asset before running:
  - **Windows (PowerShell)**: `Get-FileHash .\PokeBonk-Unbound-Complete-1.1.1.exe -Algorithm SHA256`
  - **Linux / macOS**: `sha256sum PokeBonk-Unbound-Complete-1.1.1-linux-x64.tar.gz` (or `shasum -a 256` on macOS)

---

## Out of Scope

- **Vulnerabilities in `pokebonk.com` itself** (official backend, accounts, leaderboards, or web app) — report those directly to the official PokéBonk developer.
- **OS warnings for unsigned community binaries** (SmartScreen / Gatekeeper / iOS sideload prompts), documented in [README.md](README.md) and [docs/APPLE_EXPERIMENTAL.md](docs/APPLE_EXPERIMENTAL.md).
- **Single-player Offline cheats** intentionally exposed in **Hyrule's Collection** when Offline Mode and the Mod Engine are explicitly enabled by the player.
- **Malicious third-party `.zip` mods** manually imported by a user from external sources.
