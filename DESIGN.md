---
name: MXL — Teknologi Rekayasa Multimedia
description: Night-era reference plate — ultraviolet aurora, gradient Belarus display, glass cabinets on purple ground
color-amount: 0.9
colors:
  night: "#1a0d38"
  night-high: "#241352"
  night-deep: "#261757"
  fill-start: "#4c1d95"
  night-veil: "rgba(13,5,30,0.88)"
  card-veil: "rgba(30,14,64,0.92)"
  promo-veil: "rgba(23,6,52,0.55)"
  soft-shadow: "rgba(0,0,0,0.3)"
  ink: "#f4efff"
  ink-soft: "#d6c6fa"
  ink-faint: "#b3a4dd"
  violet: "#8b5cf6"
  violet-text: "#9d7ef8"
  violet-deep: "#6d28d9"
  violet-shadow-stops: "#5b21b6"
  violet-chip: "#7c3aed"
  violet-fill-end: "#a855f7"
  orchid: "#d946ef"
  pink: "#f0abfc"
  pink-text: "#f472d0"
  lilac-glyph: "#b79bff"
  mint: "#2ee6c8"
  mint-ice: "#7cf5dd"
  shadow-stages: "#7a5ce8"
  curtain: "#150826"
  curtain-lit: "#2b1560"
  scrollbar-track: "#120726"
  tape-text: "#ead9ff"
  solid-white: "#ffffff"
  rule: "rgba(167,139,250,0.28)"
  rule-strong: "rgba(216,205,250,0.6)"
  panel: "rgba(139,92,246,0.09)"
typography:
  display:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(42px, 12.6vw, 74px) mobile · clamp(52px, 9.6vw, 158px) desktop"
    fontWeight: 500
    lineHeight: 0.8
    letterSpacing: "-0.04em"
    emTreatment: "gradient fill via background-clip, 1px lilac text-stroke"
  headline:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(38px, 6.4vw, 96px)"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "-0.045em"
    emTreatment: "gradient fill, soft violet glow"
  display-short:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(46px, 7.6vw, 128px)"
    fontWeight: 500
    lineHeight: 0.82
  statement:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(24px, 3.2vw, 48px)"
    fontWeight: 400
    lineHeight: 1.06
  record:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(24px, 2.6vw, 40px)"
    fontWeight: 400
    lineHeight: 1.14
  numeral:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(34px, 4vw, 56px)"
    lineHeight: 1
    treatment: "gradient fill, glitch numbers"
  stepnum:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(40px, 4.2vw, 64px)"
    treatment: "gradient fill over an inking rule"
  instrument:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "clamp(18px, 2.2vw, 36px)"
    treatment: "gradient fill, tabular numerals"
  mark:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "26px"
    fontWeight: 700
  body:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
    measure: "40-42ch"
  body-small:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "15px"
    lineHeight: 1.45
  caption:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "13px"
  tape:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "12px"
    letterSpacing: "0.3em"
  apparatus:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.08em"
spacing:
  gutter: "clamp(20px, 2.6vw, 40px)"
  rail: "58px"
  margin-col: "clamp(132px, 15vw, 218px)"
  card-gap: "14-22px"
rounded:
  pill: "999px"
  lg: "22px"
  md: "18px"
  step: "20px"
  birthday: "24px"
  micro: "2px"
---

## Overview

The reference-setting plate world, re-lit at night. The structure is
unchanged — a ruling engine draws hairlines, two short-measure columns
twin a centre rail, an annotation margin carries the apparatus — but
the ground is now deep ultraviolet, an aurora field drifts behind the
plates, glass cabinets hold the content, and the display type is lit
with gradients. Purple owns every region the bone paper used to; mint
survives only as the live signal. The band between hero and profil is
a rolling tape of the house words.

## Colors

- Deep ultraviolet `night` is the ground; `night-high`/`night-deep` lift
  figure wells and shadow stops. Never pure black.
- Primary text is lilac `ink`; `ink-soft` for prose, `ink-faint` for
  apparatus — all tinted from the purple hue, never gray.
- Violet is the brand's voice: `violet-text` for small type colors and
  rules, `violet`/`violet-deep` for surfaces and gradients.
- Gradient pairs are tokens: `--g-fill` (#4c1d95 → #7c3aed → #a855f7)
  is the fill voice for chips and buttons; `--g-text`
  (#b79bff → #a855f7 → #f472d0) lights display `<em>`, instrument
  values, stats numerals and step numbers via background-clip.
- Orchid `orchid` and pink `pink` are the purple family's hot ends —
  accents inside gradients, ledger numbers, tape separators. Standalone
  pink text (#f472d0) marks the owner's name only.
- Mint `mint` remains the functional signal: live dots, meters, birthday
  key, music icon; `mint-ice` reads on colored bands.
- Rules are translucent violet `rule` / `rule-strong`; nothing hard-white
  except the promo band's own painted rule.
- Glass panels = `panel` gradients + 1px violet hairlines + a soft
  violet drop shadow; the blur lives in the masthead and overlays only.

## Typography

- Bodoni Moda carries display. The italic `<em>` lines fill with
  `--g-text` (per-char after SplitText so transforms never break the
  clip) and keep a 1px lilac rim from `-webkit-text-stroke`.
- Prose stays Spectral 17px, 40–42ch, secondary tint `ink-soft`.
- Apparatus is Martian Mono 11px tracked caps — margin keys, folio,
  ledger numbers, contacts labels, captions, tape. Nothing below 11px.
- Instrument values, stats digits, step numbers: Bodoni numerals with
  gradient fill; the clock keeps Martian Mono for tabular honesty.

## Layout

- Desktop ≥901px: same plate grid — `margin-col | spread`, spread is
  `1fr rail 1fr`, rail absolutely positioned; max 1440px.
- ≤900px: margin moves above, rail becomes a horizontal detent strip
  (11px keys), the pinned passage stacks vertically, aurora blur is
  reduced.
- Tape band sits between hero and profil: full-width, 46px tall loops
  of the house words, duplicated content for a seamless CSS loop.

## Elevation & Depth

Depth is now allowed to glow: cards carry a soft violet drop shadow
(large blur, negative spread), hover lifts translate up, highlights
come from the aurora field and the pointer bloom behind content, not
from harsh whites. The masthead and birthday overlay are the only
backdrop-blur surfaces.

## Shapes

Radius joined the system: pills for controls, 18–24px for cards and
figures, 2px only on confetti. The hairline grid stays square where it
is the world's scaffolding (rule layers, biodata rows, tape edges).

## Components

- **Glass cabinet** — panel gradient, 1px violet hairline, radius 18–22px,
  soft shadow; hover lifts (translateY) and strengthens border.
- **Margin key** — 11px mono violet; on the promo band it flips to
  mint-ice.
- **Rail key (detent)** — unchanged mechanics; active key reads violet
  and draws its 1px rule from the top.
- **Instrument card** — mint live-pulse dot before the label; gradient
  Bodoni/Mono value; hover raises the card and inks its border lilac.
- **Statement cabinet** — visi/misi/alumni as separated glass cards.
- **Contact card** — platform (icon + 11px label) left, Bodoni name
  right, circular arrow chip that fills with `--g-fill` on hover.
- **Step cabinet** — gradient Bodoni numeral over an inking hairline
  (containerAnimation drives the rule grey→orchid); body inside glass.
- **Tape track** — mono 12px caps with pink ✶ separators, CSS linear
  loop.
- **Figures** — violet duotone via a color-blend overlay, glow frame,
  trans light caption; crosshair glow follows the pointer.

## Do's and Don'ts

- Gradient fills belong to display `<em>`, numerals and values — never
  to long prose; prose stays tinted lilac.
- Purple dominates; mint is a signal, white only on painted bands and
  filled chips.
- Don't return to hard-gray neutrals; every neutral is violet-tinted.
- Don't round the scaffolding (rules, rows, rails) that binds the world.
- Don't animate layout; glow, drift, lifts and inks run transforms and
  paint only.
- `prefers-reduced-motion` removes the curtain, drifts, loop and
  pulses — the page must stay fully readable without GSAP.
