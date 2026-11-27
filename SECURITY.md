# Security Policy

## Supported Versions

Security fixes are released for the latest stable version of **PokéBonk Unbound** and the current official mod catalog on the `mods-database` release. Older deprecated builds receive no patches.

| Component / Version | Supported | Notes |
| --- | --- | --- |
| **Desktop & Android `v1.0.5`** (Windows, Linux/SteamOS, Android) | Yes | Active stable release (`Latest`). |
| **Experimental Apple `v1.0.5`** (macOS & iOS Sideload) | Best-effort | Pre-release (`experimental-apple`); patches ship alongside stable updates. |
| **Official Mods (`mods-database` latest)** | Yes | Always update via **Unbound Menu -> Mod Browser -> Update All**. |
| **`< 1.0.5`** (`v1.0.0` – `v1.0.4`) | No | Deprecated; upgrade to `v1.0.5` or newer. |

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub Issues, Pull Requests, or Discussions.**

Instead, report vulnerabilities privately using GitHub's **Private Vulnerability Reporting** portal for this repository:

- **Report Privately**: [Open a Private Security Advisory](https://github.com/HyruleChosenOne/Pokebonk-Unbound/security/advisories/new)

### What to Include

To help reproduce and resolve the issue quickly, please include:

1. **Affected version & edition** (e.g., `v1.0.5 Complete` or `Portable`, or specific mod ID & version).
2. **Platform & OS** (Windows, Linux/SteamOS, Android, macOS, or iOS).
3. **Vulnerability category & impact** (e.g., Online Mode isolation bypass, local server auth bypass, Zip-Slip / path traversal in mod import, P2P relay crash/DoS, arbitrary code execution outside Offline renderer).
4. **Minimal reproduction steps** or proof-of-concept payload.
5. **Sanitized logs or screenshots** (strip any personal paths, IP addresses, or tokens).

### Response & Disclosure Process

- **Acknowledgment**: Initial response within **72 hours** confirming receipt.
- **Triage & Assessment**: Severity evaluation and reproduction within **7 days**.
- **Fix & Coordinated Disclosure**: Patches are built, verified, and published to GitHub Releases before any public advisory details are disclosed. Reporters are credited in the advisory unless they prefer to remain anonymous.

---

## Security Architecture & Boundaries

PokéBonk Unbound is designed around strict isolation between **Online Mode** and **Offline Mode**:

### 1. Online Mode Anti-Cheat & Session Isolation
- Online Mode loads `https://pokebonk.com/` in a completely isolated browser session (`persist:pokebonk-unbound-online` on desktop with `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`; isolated clean WebView on mobile).
- Zero script injection, zero mod patching, zero cheat toggles, and zero network interception occur in Online Mode.
- Any attempt to invoke offline cheat mutations or save imports while in Online Mode is rejected server-side (`HTTP 403`).

### 2. Local Offline Engine & Control API
- The embedded Offline server binds strictly to loopback (`127.0.0.1`) on an ephemeral port and is never exposed to external network interfaces.
- On mobile builds, the local Control API (`/unbound-api/*`) requires a per-launch cryptographic session token (`X-Unbound-Token`) generated at startup.

### 3. Mod `.zip` Import & Community Mods Safety
- Archive extraction validates every entry against a canonical destination root (`path.resolve`) to prevent Zip-Slip / directory traversal outside `./mods/`.
- Official mods are distributed exclusively via the repository's `mods-database` release, and **Community Mods** require manual maintainer review before being indexed.
- **Important User Guidance**: Offline mods (`bundlePatches`, `scripts`) execute JavaScript inside the local Offline game renderer (`127.0.0.1`). Only import third-party `.zip` mods from sources you trust, and never load untrusted mod files.

### 4. P2P Co-op Networking
- The direct IP:Port P2P Co-op relay only listens on a network port while you explicitly host a squad, and shuts down immediately when hosting stops.
- P2P Co-op traffic transmits real-time game state directly between players; share your host IP:Port only with trusted friends and prefer a private virtual LAN (such as Tailscale or ZeroTier) over public port forwarding.

### 5. Verifying Official Downloads
- Download binaries **only** from the official [GitHub Releases](https://github.com/HyruleChosenOne/Pokebonk-Unbound/releases) page.
- Because PokéBonk Unbound is an independent community client without commercial code-signing certificates, OS warnings (Windows SmartScreen, macOS Gatekeeper, Android unknown-sources prompt) are expected on first launch.
- Verify the **SHA-256 digest** displayed on each GitHub Release asset before running:
  - **Windows (PowerShell)**: `Get-FileHash .\PokeBonk-Unbound-Complete-1.0.5.exe -Algorithm SHA256`
  - **Linux / macOS**: `sha256sum PokeBonk-Unbound-Complete-1.0.5-linux-x64.tar.gz` (or `shasum -a 256` on macOS)

---

## Out of Scope

The following are outside the scope of this security policy:

- **Vulnerabilities in `pokebonk.com` itself** (official backend, accounts, leaderboards, or web app) — please report those directly to the official PokéBonk developer.
- **OS warnings for unsigned community binaries** (SmartScreen / Gatekeeper / iOS sideload prompts), which are documented in [README.md](README.md) and [docs/APPLE_EXPERIMENTAL.md](docs/APPLE_EXPERIMENTAL.md).
- **Single-player Offline cheats** intentionally exposed through **Hyrule's Collection** when Offline Mode and the Mod Engine are explicitly enabled by the player.
- **Malicious third-party `.zip` mods** manually imported by a user from unverified external sites.
