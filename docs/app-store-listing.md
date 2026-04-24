# App Store Listing Copy — ToastTime

Drafts for the fields in App Store Connect. Character limits noted where Apple enforces them.

---

## Name (30 char max)
**ToastTime**

## Subtitle (30 char max)
**Speech Timer & Light System**

## Primary Category
**Productivity**

## Secondary Category (optional)
**Utilities**

## Age Rating
**4+** (no objectionable content)

---

## Promotional Text (170 char max — can be updated without new review)
Runs your speech timer with a classic three-light system: green when you hit the minimum, yellow at the midpoint, red at your max. Audible bells and haptic cues.

## Description (4,000 char max)

ToastTime is a focused, single-purpose speech timer for club meetings and personal practice. It runs a clean traffic-light system while a speech is in progress: green when minimum time is reached, yellow at the midpoint warning, red at maximum, and a flashing red for overtime after an optional grace period.

Designed for speakers, timers, and evaluators at public-speaking clubs — the display is big enough to read from across a room, the timing logic stays out of the way, and the controls lock while a speech is running so you can't bump a threshold mid-speech.

KEY FEATURES

• Three-light traffic system: green, yellow, red, plus flashing overtime
• Large, glanceable timer that changes color with the current light
• Preset roles for common speech lengths — 1–2, 2–3, 4–6, 5–7, 7–9, plus evaluations and custom
• Scroll or drag drums to fine-tune Min / Warn / Max in 30-second steps
• Audible bell on every light transition, with distinct tones per state
• Haptic feedback on each light change
• Optional +30-second grace period before overtime begins flashing
• Auto-Warn: sets the warning time to the midpoint of Min and Max automatically
• Bells fire while the screen is locked or the app is in the background
• Silent-switch override so the bells are always heard
• Screen stays awake while timing is active
• Zero tracking, zero analytics, zero accounts — your settings stay on your device

DESIGNED FOR

• Speech clubs and public-speaking meetings
• Debate, pitch, and presentation practice
• Any context that needs a visual countdown plus clear audible cues

ToastTime does not collect personal data and does not require an account.

## Keywords (100 char max, comma-separated)
speech,timer,toastmaster,traffic,light,stopwatch,meeting,presentation,debate,practice,evaluator,bell

## What's New in This Version (for 1.0, can reuse for first release)
Initial release. A focused speech timer with a three-light system, audible bells, and haptic cues.

---

## Support URL
https://github.com/bjbyrne/toasttime

## Marketing URL (optional)
https://github.com/bjbyrne/toasttime

## Privacy Policy URL
https://bjbyrne.github.io/toasttime/privacy.html
(Enable GitHub Pages → Source: main branch, /docs folder)

---

## Copyright
© 2026 Bruce Byrne

---

## App Review Notes (private — what reviewers should know)
ToastTime is a single-screen speech timer. No account required. No network usage. To exercise the full feature:
1. Tap a speech role (e.g. "Prepared Speech 5–7 min") or adjust the Min/Warn/Max drums.
2. Press Start. Traffic light turns green at the Min threshold, yellow at Warn, red at Max, and flashes after the grace period (if enabled).
3. Bells play at each transition; they ignore the silent switch by design (AVAudioSession .playback) and continue while the screen is locked (Background Modes → Audio).
4. Local notifications are scheduled as a backup so bells fire even if JS is suspended; notifications are auto-cancelled when the app is foregrounded to avoid redundant banners.

The app has no microphone, camera, contacts, location, or tracking use. The only declared API usage in PrivacyInfo.xcprivacy is UserDefaults (reason CA92.1) for saving the user's last-used role and thresholds.

---

## Screenshot Captions (for overlay text or App Store captions — 6.9" display)

1. **Three-light system that reads from across the room**
   — Idle screen with "SPEECH TIMER" headline
2. **Ring through minimum, warning, and max**
   — Traffic light + timer mid-speech at yellow
3. **Preset roles or drag-to-tune custom times**
   — Role selector + drum thresholds visible
4. **Bells fire while your screen is locked**
   — Phone mockup with lock screen + bell notification
5. **No accounts. No tracking. Just the timer.**
   — Privacy/info screen

---

## Required Screenshot Dimensions (iOS, as of Apple 2026 requirements)

- **6.9" iPhone** (e.g. iPhone 16 Pro Max): 1290 × 2796 px
- **6.5" iPhone** (e.g. iPhone 14 Plus / 11 Pro Max): 1242 × 2688 px or 1284 × 2778 px
- Portrait orientation
- Minimum 2 screenshots, maximum 10 per size class
- PNG or JPEG, no alpha

---

## Export Compliance
Does your app use encryption? → **No** (ToastTime makes no network requests; standard HTTPS in WKWebView is exempt under Apple's self-classification rules for apps that only use the OS-provided encryption exempted categories.)
