# ToastTime Roadmap

Features and improvements planned for future versions. Items are not listed in priority order.

---

## 🔐 Code Signing
**Effort: Medium**

Remove the Gatekeeper/SmartScreen warnings that require manual workarounds on Mac and Windows.

- **Mac:** Join Apple Developer Program ($99/yr), obtain a Developer ID Application certificate, configure `osxSign` and `osxNotarize` in `forge.config.ts`, add `APPLE_ID`, `APPLE_ID_PASSWORD`, and `APPLE_TEAM_ID` as GitHub Actions secrets
- **Windows:** Purchase a Microsoft EV Code Signing certificate (~$300–500/yr from DigiCert, Sectigo, etc.), add to GitHub Actions secrets, configure `forge.config.ts` for Windows signing
- **Result:** App installs and runs without any security warnings on both platforms

---

## 📱 iOS & Android Versions
**Effort: Medium–High**

Port ToastTime to mobile so it can be used on a phone or tablet during meetings.

- Best path: **Capacitor** — wraps the existing React/TypeScript UI in a native shell with minimal code changes
- Replace Web Audio API with a Capacitor audio plugin (e.g. `@capacitor/sound`)
- Always-on-top equivalent: request screen wake lock so the display stays on
- Build pipeline: Xcode (iOS) + Android Studio (Android) required for local builds; GitHub Actions can automate both
- App Store submission requires Apple Developer account; Google Play requires a one-time $25 fee
- Consider a PWA first as a low-effort stepping stone before native store submission

---

## 🛡️ Reduce Security Attack Surface
**Effort: Low–Medium**

Make ToastTime more acceptable to corporate IT and security reviews.

- **Short term (Electron):**
  - Add a Content Security Policy to the renderer
  - Enable `sandbox: true` on the BrowserWindow renderer
  - Audit and pin npm dependencies, run `npm audit` regularly
- **Long term:**
  - Migrate from Electron to **Tauri** — replaces bundled Chromium (~150MB) with the OS system webview (~5MB), Rust backend has a much smaller attack surface
  - Tauri passes most enterprise security reviews that Electron fails
  - React/TypeScript UI code is largely reusable

---

## 🔄 Auto-Update
**Effort: Medium**

Allow ToastTime to update itself without requiring users to download a new installer.

- **Mac/Windows (Electron):** Use `update-electron-app` package with GitHub Releases as the update server — minimal config, free
- Alternatively use `electron-updater` (part of electron-builder) for more control
- Requires signed builds — auto-update won't work on unsigned apps
- GitHub Actions workflow update: publish releases with artifacts attached to a GitHub Release (not just workflow artifacts)

---

## 🪪 License & Attribution
**Effort: Low**

Add proper open source license and in-app attribution.

- Choose a license: **MIT** recommended (matches the stack, allows free use and modification)
- Add `LICENSE` file to the repo root
- Optionally surface the license version and build number in the About page
- Add third-party attribution if required by any dependencies

---

## 📌 Always-on-Top Toggle
**Effort: Low**

Let the user turn always-on-top on or off without restarting the app.

- Add a pin/unpin button to the header (📌 icon)
- Use Electron's `mainWindow.setAlwaysOnTop(true/false)` via IPC from the renderer
- Requires adding an IPC channel in `preload.ts` and a handler in `main.ts`
- Persist preference with `localStorage` or `electron-store`
- Could also expose as a checkbox in the options row alongside +30s grace and Auto Warn

---

## 🛠️ Additional Meeting Tools
**Effort: Medium per tool**

Expand ToastTime into a fuller meeting toolkit. Each tool would be a new tab or mode accessible from the header.

### Ah-Counter
Track filler words (um, ah, so, like, you know) per speaker during a meeting.
- Tap a button per filler word heard — running tally per speaker
- Summary view at end of meeting
- Could use keyboard shortcuts for quick tapping during a speech

### Word of the Day
Display and track usage of the meeting's chosen word.
- Input the word at the start of the meeting
- Track how many times it's correctly used by speakers

### Meeting Timer
Time the overall meeting against an agenda, not just individual speeches.
- Agenda builder: add items with target durations
- Running clock per agenda item with same Min/Warn/Max light system

### Attendance Tracker
Simple head count and role assignment for the meeting record.

---

## 📋 Notes

- Items marked **Low effort** can likely be done in a single session
- Items marked **Medium effort** require a few hours of focused work
- Items marked **High effort** represent multi-day projects
- Code signing is a prerequisite for auto-update
- Tauri migration is a prerequisite for best security posture
