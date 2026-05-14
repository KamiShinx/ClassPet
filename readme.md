# ClassPet — Architecture & Build Plan (MVP)

> **For:** Claude Code
> **Author:** Ben (T.A.V.A.S.)
> **Status:** MVP / Demo
> **Last updated:** 2026-05-12

A Tamagotchi-inspired classroom engagement system. Students rate lessons with emojis, teachers log behavior, both actions feed a single point economy that lets each student grow and customize a personal pet.

---

## 1. Project Overview

### Goal
Build a working demo that runs end-to-end for **one class of 30 students** with **one teacher**, deployed as a single Google Apps Script Web App backed by a single Google Sheet.

### Two user roles
- **Student** — logs in by selecting their name, rates lessons, views pet, shops for cosmetics.
- **Teacher** — logs in with a PIN, sees roster, logs attendance/behavior, creates lessons.

### Design DNA
Pixel-art Tamagotchi aesthetic, Hebrew RTL, mobile-first, CRT/LCD feel, Noto animated emojis. The existing prototype HTML (`tamagotchi-prototype.html`) is the **visual reference** for color palette, typography, button design, scanline effect, and emoji rating UI. Reuse its CSS variables and component patterns wherever possible.

---

## 2. Tech Stack

| Layer | Tech |
|---|---|
| Backend | Google Apps Script (V8 runtime) |
| Database | Google Sheets (one spreadsheet, ~7 tabs) |
| Frontend | Vanilla HTML / CSS / JS, served by `HtmlService` |
| Hosting | Apps Script Web App (single deployment URL) |
| Auth (student) | Name selection from class roster + `localStorage` token |
| Auth (teacher) | PIN stored in Config sheet |
| Concurrency | `LockService.getScriptLock()` on all writes |

**No** external libraries, no npm, no build step. Pure HTML/CSS/JS shipped as Apps Script HTML files.

---

## 3. Data Model — Google Sheets Tabs

All tabs live in a single spreadsheet. Tab names are case-sensitive. Header row is always row 1.

### `Students`
| Column | Type | Notes |
|---|---|---|
| id | string | `s_` + 8-char nanoid |
| name | string | display name (Hebrew) |
| coins | int | spendable currency, default 0 |
| stars | int | total XP earned, monotonically increasing |
| level | int | derived; cached for perf; `floor(stars/100)+1` |
| equipped_items | string | JSON array of item ids, e.g. `["hat_01","glasses_02"]` |
| world_id | string | currently active world, default `meadow` |
| created_at | ISO string | |

### `Lessons`
| Column | Type | Notes |
|---|---|---|
| id | string | `l_` + 8-char nanoid |
| date | YYYY-MM-DD | |
| topic | string | short title shown to students |
| description | string | optional, longer text |
| created_at | ISO string | |

### `Ratings`
One row per (student, lesson, emotion) tuple. A student can pick multiple emotions per lesson — each is its own row.
| Column | Type | Notes |
|---|---|---|
| id | string | `r_` + 8-char nanoid |
| student_id | string | FK → Students |
| lesson_id | string | FK → Lessons |
| emotion_text | string | e.g. `"נהנתי בטירוף"` |
| emotion_score | int | -2..+2, see emotion table |
| coins_awarded | int | derived from score (see Game Mechanics) |
| stars_awarded | int | same as coins for MVP |
| timestamp | ISO string | |

### `Behaviors`
| Column | Type | Notes |
|---|---|---|
| id | string | `b_` + 8-char nanoid |
| student_id | string | FK → Students |
| lesson_id | string | nullable; FK → Lessons |
| type | enum | `attendance` / `late` / `absent` / `good_behavior` / `disruption` |
| coins_delta | int | signed |
| stars_delta | int | signed |
| teacher_note | string | optional |
| timestamp | ISO string | |

### `ShopItems`
Static catalog. Seeded once at setup.
| Column | Type | Notes |
|---|---|---|
| id | string | e.g. `hat_top`, `bg_stars` |
| name_he | string | Hebrew display name |
| category | enum | `hat` / `glasses` / `accessory` / `background` |
| emoji | string | fallback emoji if no SVG |
| price_coins | int | |
| required_level | int | minimum level to buy |
| layer_z | int | render order on pet (higher = on top) |
| offset_x | int | px offset from pet center |
| offset_y | int | px offset from pet top |

### `Inventory`
What each student owns.
| Column | Type | Notes |
|---|---|---|
| id | string | `inv_` + nanoid |
| student_id | string | FK → Students |
| item_id | string | FK → ShopItems |
| acquired_at | ISO string | |

### `Config`
Single-row key→value sheet for tunable game parameters.
| key | value (default) |
|---|---|
| teacher_pin | `1234` |
| class_name | `כיתה ז'1` |
| attendance_points | `10` |
| good_behavior_bonus | `5` |
| late_penalty | `-3` |
| absent_penalty | `0` |
| disruption_penalty | `-2` |
| stars_per_level | `100` |
| max_level | `200` |

---

## 4. Apps Script API

A single web app exposes one endpoint via `doGet` (for HTML) and one via `doPost` (for all data actions).

### `doGet(e)` — serves HTML
Query params decide which view:
- `?view=student` → `Student.html`
- `?view=teacher` → `Teacher.html`
- (no params) → `Landing.html` with two buttons

All HTML files include shared partials via `HtmlService` templating:
- `Styles.html` — shared CSS variables and base styles, copied from the prototype
- `Common.html` — shared JS utility functions (API caller, localStorage helpers)

### `doPost(e)` — JSON action router
Body is always `application/x-www-form-urlencoded` with a single `payload` field containing JSON:
```json
{ "action": "submitRating", "data": { ... } }
```

Return is always JSON:
```json
{ "ok": true, "result": { ... } }
// or
{ "ok": false, "error": "message" }
```

### Action list
| Action | Auth | Input | Output |
|---|---|---|---|
| `getRoster` | none | — | `[{id, name}]` |
| `loginStudent` | none | `{student_id}` | full student state |
| `getStudentState` | student | `{student_id}` | student + inventory + lessons + ratings |
| `getOpenLessons` | student | `{student_id}` | lessons the student hasn't rated yet |
| `submitRating` | student | `{student_id, lesson_id, emotions: ["..."]}` | updated student state |
| `getShop` | student | `{student_id}` | items + ownership flags + can_afford flags |
| `buyItem` | student | `{student_id, item_id}` | updated student state |
| `equipItem` | student | `{student_id, item_id, equipped: bool}` | updated student state |
| `loginTeacher` | none | `{pin}` | `{ok, token}` or error |
| `getClassDashboard` | teacher | `{token}` | roster + today's lessons + recent activity |
| `createLesson` | teacher | `{token, topic, description, date}` | lesson_id |
| `addBehavior` | teacher | `{token, student_id, lesson_id?, type, note?}` | updated student state |
| `getStudentDetail` | teacher | `{token, student_id}` | full history for one student |

### Concurrency
Every `doPost` that writes wraps the critical section in:
```js
const lock = LockService.getScriptLock();
if (!lock.tryLock(10000)) return jsonError("busy");
try { /* mutate */ } finally { lock.releaseLock(); }
```

### Auth
- **Student:** trust-based. After `loginStudent`, frontend stores `student_id` in `localStorage`. Every action includes it; server checks the id exists.
- **Teacher:** `loginTeacher` checks PIN against Config, returns a session token (random string saved to `Sessions` cache via `CacheService` for 6h). Each teacher action includes that token; server verifies via cache.

This is **demo-grade** auth — fine for an MVP in a single classroom, not for production.

---

## 5. Student Panel

### Bottom nav (4 tabs)
1. **🥚 הפט שלי** — pet view (default)
2. **⭐ דרג שיעור** — open lessons list
3. **🛒 חנות** — shop grid
4. **📊 סטטיסטיקה** — coins / stars / level / streak / history

### Pet view (main screen)
The Tamagotchi shell from the prototype is the **shell of the entire app** — every screen lives inside the LCD. Always visible at the top:
- Student name + level
- Coins icon + count
- Stars icon + count

LCD body shows:
- The world background (meadow for MVP)
- The pet (round egg) centered, with all equipped cosmetic items layered on top
- A small speech bubble that occasionally shows encouragement
- The 3 hardware buttons at the bottom map to: nav left / OK / nav right

### Rating flow
1. Student taps "דרג שיעור" → list of unrated lessons (today's + last 3 days).
2. Tap a lesson → single screen with all 8 emotion buttons (same as prototype, identical visual).
3. Student selects one or more emotions.
4. Tap OK → server call → coins/stars animation → return to pet view.

Each emotion is its own rating row. Positive emotions (score ≥1) award `score` coins+stars. Score ≤0 emotions award 0 (no punishment for honesty — but recorded for the teacher's analytics).

### Emotion catalog (same as prototype)
| Emotion | Score | Coins+Stars |
|---|---|---|
| הפתיע אותי 🤯 | +2 | 2 |
| גיליתי מלא 💡 | +1 | 1 |
| רוצה עוד ✨ | +2 | 2 |
| נהנתי בטירוף 🤩 | +2 | 2 |
| הלכתי לאיבוד 😵 | -1 | 0 |
| היה רגיל 😐 | 0 | 0 |
| היה קשה 🥵 | -1 | 0 |
| שעמם אותי 🥱 | -2 | 0 |

### Shop flow
- Grid of items, each card shows: emoji, name, price, "owned" / "locked (lvl X)" / "buy" state.
- Tap to preview on pet (live overlay).
- Confirm to buy → spends coins → adds to inventory → auto-equips.
- "Closet" toggle on each owned item to equip/unequip.

### Pet visual implementation
The pet is a single positioned container. Equipped items are absolutely-positioned children layered by `layer_z` and offset by `offset_x` / `offset_y` from the catalog.

```html
<div class="pet-container">
  <div class="pet-egg"><!-- the base egg from prototype --></div>
  <div class="cosmetic" data-item="hat_top" style="z-index:30; top:-10px"></div>
  <div class="cosmetic" data-item="glasses_01" style="z-index:25; top:15px"></div>
</div>
```

For MVP each cosmetic item is **a single emoji** rendered at large size — no SVG asset pipeline needed. Use Noto Color Emoji for consistency with the prototype.

---

## 6. Teacher Panel

### Main view: Roster grid
Compact card per student showing: name, today's attendance status, coin count, level. Each card has 5 quick-action buttons:

| Button | Action | Δ Coins | Δ Stars | Notes |
|---|---|---|---|---|
| ✅ נוכח | attendance | +10 | +10 | once per lesson, idempotent |
| ⏰ איחור | late | -3 | -3 | |
| ❌ חיסור | absent | 0 | 0 | tracked, no points |
| ⭐ התנהגות טובה | good_behavior | +5 | +5 | |
| 🚫 הפרעה | disruption | -2 | -2 | |

Tap on a student card → drawer with full history + a free-text note input that attaches to the next behavior log.

### Lesson management
A "+" floating button to create a new lesson. Quick form: topic, optional description, date defaults to today.

A dropdown at the top selects "today's active lesson" — quick-action buttons attach behaviors to this lesson when relevant.

### Optional: Class overview chart
A simple row of bars showing average sentiment per recent lesson. Nice-to-have, leave for the end.

---

## 7. Game Mechanics

### Currencies
- **Coins** — spent in shop. Earned and spent. Can be 0 but not negative (any penalty that would go negative is clamped to 0).
- **Stars** — XP. Never decreases. Determines level.

### Level formula
```
level = min(max_level, floor(stars / stars_per_level) + 1)
```
With default `stars_per_level=100`, `max_level=200` — a student needs 19,900 stars total to max. Plenty of headroom; the demo cap won't be hit.

### Coin earning sources
| Source | Coins | Stars | Trigger |
|---|---|---|---|
| Attendance | +10 | +10 | teacher logs |
| Good behavior | +5 | +5 | teacher logs |
| Lesson rating (per positive emotion) | +1 to +2 | same | student submits |
| Late | -3 | -3 | teacher logs (clamped at 0 floor for coins; stars never decrease — late just yields 0 stars in practice; see note below) |
| Disruption | -2 | -2 | same |
| Absent | 0 | 0 | teacher logs |

> **Star handling for penalties:** Stars must never decrease (otherwise students lose levels). Implement penalties as: `coins = max(0, coins + coins_delta)` and `stars += max(0, stars_delta)` — so negative star deltas effectively become 0. The behavior is still logged with its real signed value for analytics.

### MVP shop catalog (seed data)
| id | name_he | category | price | required_level |
|---|---|---|---|---|
| `hat_cap` | כובע מצחייה 🧢 | hat | 30 | 1 |
| `flower_pink` | פרח ורוד 🌸 | accessory | 25 | 1 |
| `glasses_sun` | משקפי שמש 🕶️ | glasses | 40 | 2 |
| `hat_top` | מגבעת 🎩 | hat | 50 | 2 |
| `bow_red` | פפיון 🎀 | accessory | 35 | 2 |
| `mushroom_buddy` | חבר פטרייה 🍄 | accessory | 100 | 3 |
| `hat_crown` | כתר 👑 | hat | 200 | 5 |
| `bg_stars` | רקע כוכבים ✨ | background | 150 | 4 |

### MVP world
One world only: `meadow` — green grass floor, light-blue sky gradient, small sun emoji in the corner. CSS-only, no assets. The `bg_stars` shop item swaps the sky for a starry gradient — the world stays `meadow` but the background can be replaced as a cosmetic.

---

## 8. UI / UX Principles

1. **Everything is inside the Tamagotchi shell.** Every screen — login, rating, shop, teacher panel — renders inside the LCD. The hardware buttons (◀ OK ▶) are real navigation.
2. **Mobile-first, single column.** Target viewport ~380px wide. The shell from the prototype already handles this.
3. **Hebrew RTL** everywhere. `dir="rtl"` on `<html>`.
4. **Noto animated emojis** for all emotion and item icons (URLs follow the same pattern as the prototype: `https://fonts.gstatic.com/s/e/notoemoji/latest/<hex>/512.webp`).
5. **Sounds + haptics** on every action (square-wave tones via `AudioContext`, `navigator.vibrate`). Borrow `sfxClick / sfxSelect / sfxSuccess` from the prototype.
6. **No external CSS frameworks.** Inline styles using the existing CSS variables (`--egg`, `--lcd`, `--candy-pink`, etc.).
7. **Optimistic UI.** Update local state instantly, sync to server in background, roll back on error with a brief toast.
8. **localStorage for student session.** Survives page reloads; one tap to "log out" clears it.

---

## 9. File Structure (Apps Script project)

Apps Script has a flat file structure. The project should contain:

```
Code.gs              — entry: doGet, doPost, action router
Db.gs                — sheet read/write helpers (getStudent, saveStudent, ...)
Game.gs              — pure game logic (calcLevel, awardCoins, validateBuy, ...)
Auth.gs              — student/teacher auth helpers
Seed.gs              — one-time setup: creates tabs, seeds shop, sets config
Landing.html         — view=default
Student.html         — view=student
Teacher.html         — view=teacher
Styles.html          — shared CSS (the Tamagotchi shell, palette, animations)
Common.html          — shared JS (API caller, localStorage, sfx, vibe)
PetRender.html       — JS+HTML for pet+world rendering, included in Student.html
```

Each `.html` file is included via:
```js
HtmlService.createTemplateFromFile('Student').evaluate()
```
With partials inlined by:
```html
<?!= include('Styles') ?>
```
And the `include` helper defined in `Code.gs`:
```js
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
```

---

## 10. Build Plan — Phased Task List

Check off as you complete. Each phase ends in a runnable, testable milestone.

### Phase 0 — Setup
- [ ] Create new Google Sheet, copy its ID to `Code.gs` as `SPREADSHEET_ID`
- [ ] Create new Apps Script project bound to the sheet
- [ ] Add empty files: `Code.gs`, `Db.gs`, `Game.gs`, `Auth.gs`, `Seed.gs`, `Landing.html`, `Student.html`, `Teacher.html`, `Styles.html`, `Common.html`, `PetRender.html`
- [ ] Write `include()` helper in `Code.gs`
- [ ] Add `Seed.gs` with `setupSheets()` that creates all 7 tabs with headers
- [ ] Add `seedShop()` that inserts the 8 MVP items
- [ ] Add `seedConfig()` that inserts default config keys
- [ ] Add `seedRoster()` that inserts 30 placeholder students (`תלמיד 1` … `תלמיד 30`) — replace later
- [ ] Run setup functions manually from Apps Script editor; verify all tabs populated

### Phase 1 — Data Layer
- [ ] `Db.gs`: `getAll(sheetName)` — returns array of row objects
- [ ] `Db.gs`: `getById(sheetName, id)` — single row lookup
- [ ] `Db.gs`: `insertRow(sheetName, obj)` — appends, returns inserted row
- [ ] `Db.gs`: `updateById(sheetName, id, patch)` — partial update
- [ ] `Db.gs`: `getConfig(key)` and `getAllConfig()`
- [ ] `Db.gs`: helper `nanoId(prefix)` for ID generation
- [ ] Unit-test by calling each from the Apps Script editor

### Phase 2 — Action Router + Auth
- [ ] `Code.gs`: `doGet(e)` routes to the correct HTML file based on `e.parameter.view`
- [ ] `Code.gs`: `doPost(e)` parses payload, dispatches by `action`, wraps in `LockService`
- [ ] `Auth.gs`: `verifyStudent(id)` — checks student exists in roster
- [ ] `Auth.gs`: `createTeacherSession()` and `verifyTeacherToken(token)` using `CacheService`
- [ ] Implement actions: `getRoster`, `loginStudent`, `loginTeacher`
- [ ] Deploy as Web App; verify URL responds

### Phase 3 — Student Panel (shell + login)
- [ ] `Styles.html`: copy Tamagotchi shell CSS from prototype (`.egg-wrapper`, `.shell`, `.bezel`, `.lcd`, palette vars, scanline, etc.)
- [ ] `Common.html`: `api(action, data)` wrapper around `google.script.run` or `fetch`
- [ ] `Common.html`: `localStorage` helpers `getSession()` / `setSession()` / `clearSession()`
- [ ] `Common.html`: `sfxClick`, `sfxSelect`, `sfxSuccess`, `vibe` (port from prototype)
- [ ] `Landing.html`: two big buttons — "אני תלמיד" / "אני מורה"
- [ ] `Student.html`: if no session, show name-picker dropdown populated from `getRoster`; on select call `loginStudent` and persist
- [ ] `Student.html`: after login, show pet view scaffolding (status bar + LCD body with placeholder pet)
- [ ] Verify end-to-end: open URL → land → click student → pick name → see pet shell

### Phase 4 — Pet & World Rendering
- [ ] `PetRender.html`: meadow world background (CSS-only — sky gradient + grass strip + sun)
- [ ] `PetRender.html`: render the base egg pet (reuse `.tamagotchi-egg` from prototype, scaled up)
- [ ] `PetRender.html`: render equipped cosmetic items layered by `layer_z`, positioned by offsets
- [ ] `PetRender.html`: speech bubble component (reuse from prototype) showing a random encouragement every 30s
- [ ] `Student.html`: status bar shows live coins, stars, level
- [ ] Verify: equipping/unequipping in test data correctly re-renders

### Phase 5 — Rating Flow
- [ ] Backend: `submitRating(student_id, lesson_id, emotions[])` — inserts N Rating rows, sums coins+stars, updates Student, returns new state
- [ ] Backend: `getOpenLessons(student_id)` — returns lessons of last 3 days where student has no rating
- [ ] Frontend: "דרג שיעור" tab — list of open lessons
- [ ] Frontend: rating screen — 8 emotion buttons (reuse exact UI from prototype), multi-select, submit button
- [ ] Frontend: success animation — coins fly to status bar; pet does a little jump
- [ ] Frontend: empty-state — "אין שיעורים לדרג כרגע 🌱"
- [ ] Verify: rate a lesson; sheet has new Rating rows; student coins go up

### Phase 6 — Shop & Inventory
- [ ] Backend: `getShop(student_id)` — returns ShopItems with `owned` and `affordable` flags
- [ ] Backend: `buyItem(student_id, item_id)` — validates: owned? level? affordable? Inserts Inventory row, decrements Student coins, auto-equips (adds to `equipped_items` JSON)
- [ ] Backend: `equipItem(student_id, item_id, equipped)` — toggles inclusion in `equipped_items`
- [ ] Frontend: shop grid — card per item with state (owned / locked / buyable)
- [ ] Frontend: tap item → preview overlay on pet → confirm/cancel
- [ ] Frontend: "closet" view — list of owned items with equip toggles
- [ ] Verify: buy → coins decrement → pet shows item

### Phase 7 — Teacher Panel
- [ ] `Teacher.html`: PIN entry screen (numpad UI)
- [ ] `Teacher.html`: after login, fetch `getClassDashboard`, render roster grid
- [ ] Each student card: name + coins + level + 5 quick-action buttons
- [ ] Backend: `addBehavior(student_id, lesson_id?, type, note?)` — inserts Behavior row, updates Student
- [ ] Each action button calls `addBehavior`, optimistically updates UI, plays sfxSuccess
- [ ] "+" FAB → modal → `createLesson(topic, description, date)`
- [ ] Top dropdown shows recent lessons; selecting one sets the "active lesson" for behavior logging
- [ ] Tap student card → drawer with full history (recent ratings + behaviors)
- [ ] Verify: log behaviors for several students; check sheet has rows; student coins on student panel reflect changes

### Phase 8 — Polish & Deploy
- [ ] Sounds + vibration on every meaningful tap
- [ ] Loading states / spinners during API calls
- [ ] Error toasts on failed calls
- [ ] "Log out" link on both panels
- [ ] Initial onboarding tooltip for first-time student
- [ ] Test on real mobile (iOS Safari + Android Chrome)
- [ ] Re-deploy as Web App with "Execute as: Me", "Who has access: Anyone"
- [ ] Share single URL with teacher; teacher distributes to students
- [ ] Document the teacher PIN somewhere safe

---

## 11. Deployment

1. In Apps Script editor: **Deploy → New deployment → Type: Web app**.
2. **Execute as:** Me (your Google account).
3. **Who has access:** Anyone (so students don't need Google login).
4. Save and copy the URL — looks like `https://script.google.com/macros/s/AKfyc.../exec`.
5. Students get `URL?view=student`; teacher gets `URL?view=teacher`.
6. After any backend change, run **Deploy → Manage deployments → Edit → New version** (otherwise changes don't go live for users).

---

## 12. Out of Scope (post-MVP)

These are explicitly **not** built in this iteration. Listed here so they don't sneak in.

- Multiple classes / multi-tenant
- Multiple worlds beyond `meadow`
- Pet evolution stages (egg → child → adult)
- Streak system (consecutive days)
- Class leaderboard
- Push notifications / reminders
- Photo upload / pet photos
- Parent-facing dashboard
- Hebrew/English language toggle
- Real authentication (OAuth / passwords)
- Soft delete / audit log
- Mobile app wrapper (PWA install is fine, but no React Native)

---

## 13. Open questions to resolve during build

- [ ] Final project name (suggestions: **ClassPet**, **כיתתון**, **TamaLearn**, **Beitza**, **Lumigotchi**)
- [ ] Actual student roster — replace `תלמיד 1..30` with real names before the demo
- [ ] Teacher PIN — change default `1234` in Config sheet
- [ ] Encouragement strings for the speech bubble — write 10-15 short Hebrew lines
- [ ] Final coin values for shop items — playtest and tune

---

## 14. Visual reference

The existing `tamagotchi-prototype.html` is the canonical source for:
- Color palette (`--egg`, `--lcd`, `--candy-pink`, `--candy-yellow`, `--candy-blue`, `--sel-bg`)
- Fonts (Heebo, Secular One, Press Start 2P)
- Shell geometry (egg shape, ring, bezel, LCD)
- Hardware buttons (▶ OK ◀)
- Scanline + vignette overlays
- Emoji rating UI (the 8-grid that becomes the rating screen)
- Speech bubble (the white rounded bubble with tail)
- Sound effects (square-wave AudioContext pattern)
- Animations (`bounce`, `wiggle`, `popIn`, `bubblePop`, `bubbleFadeOut`, `floatDevice`)

Keep these intact. The whole point of the project is that the existing prototype's *feel* survives the expansion into a full app.