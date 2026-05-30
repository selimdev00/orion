# Design

Mission-control editorial. Warm light paper, ink text, one launch-orange signal, monospace for all data. The feel of a printed flight log or an almanac, not a dark SaaS dashboard.

## Theme

Light. Scene: a hiring manager skimming a launch archive on a bright office monitor, expecting something that looks measured and printed. A dark theme here would read as the same space cliche everyone ships; light paper is the deliberate, anti-reflex choice. Never use a dark background anywhere.

## Color

Strategy: Restrained. Tinted-warm neutrals carry the surface; launch-orange is the single accent and stays under ~10% of any view, used only for state and action. No second accent, no gradients.

All neutrals are tinted warm (toward the paper hue), never pure `#fff` / `#000`.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f7f4ee` | App background (warm paper) |
| `--paper-2` | `#efe9df` | Raised surfaces, fields, table fill |
| `--inset` | `#e7e0d2` | Insets, zebra rows, skeleton base |
| `--ink` | `#1a1714` | Primary text, headings |
| `--ink-muted` | `#5c5648` | Secondary text |
| `--ink-dim` | `#8b8473` | Labels, metadata, disabled |
| `--rule` | `#d9d1c0` | Hairline rules / borders |
| `--rule-strong` | `#bcb29c` | Emphasised borders, active outline |
| `--accent` | `#d8410c` | Launch-orange signal (graphics, marks) |
| `--accent-ink` | `#a8320a` | Orange for text/links (AA on paper) |
| `--accent-wash` | `#f6e3d8` | Soft orange tint background |
| `--ok` | `#2f6d34` | Success (launch succeeded) |
| `--abort` | `#a82a1c` | Failure / aborted |
| `--hold` | `#9a6300` | Pending / upcoming |

Each state color has a `-wash` companion at ~12% for badge fills.

## Typography

- Sans: Geist (local variable, `GeistVF.woff`) for prose and headings.
- Mono: Geist Mono (local variable, `GeistMonoVF.woff`) for all data: flight numbers, dates, counts, IDs, table column labels, eyebrows.
- Display headings: Geist, weight 600-700, tight tracking (`-0.02em`).
- Eyebrows / column labels: Geist Mono, uppercase, letter-spacing `0.12em`, small.
- Body capped 65-75ch. Scale ratio >= 1.25 between steps (`--fs-label` -> `--fs-display`).
- Tabular numerals (`font-variant-numeric: tabular-nums`) on all data.

## Layout

- Max width `--maxw` 1120px; generous vertical rhythm, varied (sections breathe, dense ledgers stay tight).
- The launch list is a ruled LEDGER (column-header row + zebra data rows), not a card grid.
- Hairline rules (`--rule`) separate records and sections instead of boxed cards.
- Avoid wrapping everything in containers; let rules and whitespace structure the page.

## Elevation

Mostly flat on paper. One soft shadow token `--shadow-soft` (`0 1px 2px rgba(40,30,15,.06), 0 8px 24px rgba(40,30,15,.05)`) for the rare raised element. No glow, no glass, no backdrop-blur.

## Motion

- `--ease: cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo feel). No bounce.
- Durations: `--dur-fast 140ms`, `--dur 280ms`, `--dur-slow 560ms`.
- Animate transform/opacity only. Count-ups and scroll reveals retained, all behind `prefers-reduced-motion`.

## Bans (enforced)

No gradient text (`background-clip:text`), no glassmorphism, no side-stripe accent borders, no radial-glow washes, no `#000`/`#fff`, no em dashes, no emoji, no identical-card grids, status never by color alone.
