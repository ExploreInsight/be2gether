---
name: be2gether
description: A warm, soft daily friends feed with white rounded cards, pill controls, aubergine ink and one cheerful brand colour.
colors:
  paper: "#fff6f8"
  card: "#ffffff"
  ink: "#2b2330"
  muted: "#6b5f70"
  rule: "#f0dde3"
  line: "#8c7f92"
  hover: "#fbe9ee"
  wash: "#fde4ec"
  brand: "#b83266"
  pop: "#ff7a6b"
  on-brand: "#ffffff"
  on-pop: "#2b2330"
  danger: "#b3261e"
  paper-dark: "#1d171f"
  card-dark: "#2a222d"
  ink-dark: "#f7eff4"
  muted-dark: "#b9adbf"
  rule-dark: "#3b3140"
  line-dark: "#8f8296"
  hover-dark: "#342b38"
  wash-dark: "#3d2c3b"
  danger-dark: "#ff9188"
  brand-meadow: "#1f7a4d"
  brand-lagoon: "#0f6e8c"
  brand-grape: "#6a3fc4"
  brand-honey: "#9a5200"
typography:
  display:
    fontFamily: "Gabarito, Nunito, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Gabarito, Nunito, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  field: "16px"
  card: "24px"
  pill: "9999px"
spacing:
  card-pad: "16px"
  card-pad-sm: "20px"
  card-gap: "16px"
  row-pad: "20px"
  row-pad-compact: "12px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-soft:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.brand}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  post-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 16px"
    height: "44px"
  tab-active:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    rounded: "{rounded.pill}"
    height: "44px"
  nav-item-active:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.brand}"
    rounded: "{rounded.pill}"
    height: "48px"
  badge-unread:
    backgroundColor: "{colors.pop}"
    textColor: "{colors.on-pop}"
    rounded: "{rounded.pill}"
---

# Design System: be2gether

## Overview

**Creative North Star: "The Group Chat You Want to Open"**

be2gether looks like a warm group chat given a feed: rosy-white ground, white cards that float on a soft shadow, round faces, pill buttons and pill tabs, and sentence-case friendly type. Everything is rounded and nothing is hard. Ink is aubergine rather than black, so even text feels tinted and gentle. One cheerful brand colour carries selection and action; a second, coral "pop" colour is rationed to hearts and unread marks so those small signals stay noticeable.

Density is relaxed and phone-first. Cards breathe, tap targets are at least 44px, and the feed is one calm centre column. Dark mode is aubergine night, not black. The person picks the theme: five colour themes swap only brand and pop (and their wash), leaving every neutral untouched, so the system reads the same in all of them.

The build rejects the hard, uppercase, ink-bordered transit-sign look of the first redesign and the cold default social feed. Nothing in the visual system advertises popularity: counts are quiet, tabular, and optional.

**Key Characteristics:**
- Rosy-white paper with white soft-shadowed cards, never cream, never black.
- Pills for every control; 24px corners for every card and sheet.
- One brand colour, one pop colour, a tinted wash for selection.
- Gabarito for titles and the wordmark, Nunito for everything else.
- Dark mode is aubergine night; themes swap only brand, pop and wash.

## Colors

A rose-tinted, aubergine-inked palette with one brand colour and one rationed coral accent.

### Primary
- **Sunrise Rose** (brand, default theme): the one cheerful action colour. Solid buttons, active tab pill, saved bookmark, focus ring. Text on it is `on-brand` white.
- **Wash Pink** (wash): the tinted selection ground behind active navigation, soft buttons, selected theme card and the demo badge. Brand-coloured text sits on it.

### Secondary
- **Coral Pop** (pop): hearts when liked, unread counts and dots, the second speech bubble in the wordmark. Nothing else. Text on it is `on-pop` aubergine.

### Theme brands
Meadow, Lagoon, Grape and Honey replace brand, pop and wash together (Meadow green, Lagoon teal-blue, Grape violet, Honey amber; their pops are amber, orange, pink and yellow). In dark mode each theme's brand text and focus ring lifts to a lighter "soft" tint and the wash deepens; the solid brand fill stays as is.

### Neutral
- **Rosy White** (paper): page ground.
- **Card White** (card): cards, sidebar, top and tab bars, inputs.
- **Aubergine Ink** (ink): body and title text.
- **Dusty Plum** (muted): secondary text, timestamps, inactive tabs, placeholders.
- **Blush Rule** (rule): hairline borders on cards, bars and dividers.
- **Mauve Line** (line): borders of controls (inputs, outline buttons, ); strong enough for control boundaries.
- **Blush Hover** (hover): hover ground on ghost and outline controls.
- **Brick Danger** (danger): errors, destructive actions, low character count.
- **Aubergine Night** set (paper-dark, card-dark, ink-dark, muted-dark, rule-dark, line-dark, hover-dark, wash-dark, danger-dark): the dark-mode counterparts, applied under `data-mode="dark"`.

### Named Rules
**The Rationed Pop Rule.** Pop appears only on liked hearts, unread marks and the wordmark's second bubble. It is never a button, banner or decoration.

**The Theme Swap Rule.** A theme changes brand, pop and wash and nothing else. Neutrals, radii, type and shadow are identical across themes.

## Typography

**Display Font:** Gabarito (with Nunito, system-ui, sans-serif)
**Body Font:** Nunito (with system-ui, sans-serif)

**Character:** Gabarito is round and bubbly with weight, used sparingly for names of things; Nunito's rounded terminals keep running text friendly and legible. Everything is sentence case.

### Hierarchy
- **Display** (800, 1.5rem, line-height 1, tracking -0.025em): the lowercase "be2gether" wordmark.
- **Title** (700, 1.125rem, 1.5): navigation labels in the sidebar (Nunito bold) and page and dialog headings in Gabarito.
- **Body** (400, 1rem, 1.5): post text, inputs, buttons (buttons are bold). Posts run in a single column no wider than 42rem.
- **Label** (700, 0.875rem, 1.5): action counts, timestamps, field labels (semibold), tab-bar captions (0.75rem), badges.

Avatar initials use Gabarito bold at 40% of avatar size on a per-person pastel (six soft tints, fixed aubergine text, chosen from the username). Numbers use tabular figures. Root size is 100%, 112.5% when the user chooses large text.

### Named Rules
**The Sentence Case Rule.** Labels, tabs and buttons are sentence case. No all-caps, no letter-spaced small caps.

## Layout

Phone-first. Desktop (lg and up) is a 16rem light sidebar, a centre column capped at 42rem (the whole row capped at 62rem and centred, with a 2.5rem gap), and from xl a 18rem right column of tags and people to follow. Below lg the sidebar disappears for a 56px white top bar with the logo and a bottom tab bar (Home, Search, a raised round New post button, Alerts, Me) that respects the device safe-area inset. Content padding is 16px on phones, 32px from sm.

Posts stack with a 16px gap. Card padding is 16px, 20px from sm. A density setting switches row padding between 20px and 12px. Minimum tap target is 44px (48px for sidebar items). No horizontal overflow at 390px.

## Elevation & Depth

Hybrid, led by one soft shadow. Cards are white on a rosy ground with a hairline blush border and a diffuse plum-tinted shadow (`0 1px 2px rgb(60 30 70 / 0.06), 0 8px 24px rgb(60 30 70 / 0.07)`); in dark mode the same shape in black at 0.3 and 0.25. The shadow is the single elevation token, shared by post cards, dialogs, the mobile tab bar and the round New post button. Sidebar and top bar are flat, separated by a hairline rule.

### Named Rules
**The One Shadow Rule.** There is a single soft shadow. No hard offset shadows, no glow, no second tier.

## Shapes

Round everywhere. Cards, dialogs and the tab bar's top edge use 24px corners (rounded-3xl); photos inside cards and inputs use 16px (rounded-2xl); every button, tab, tab track, nav item, badge, action button, switch and avatar is a full pill or circle. Dialogs become bottom sheets with only the top corners rounded on phones. Cards carry a 1px blush rule border; controls carry a 1px mauve line border. Focus is a 3px brand-soft outline with 2px offset.

### Named Rules
**The Pill Rule.** Anything you tap is a pill or a circle. Anything you read in is a 24px card.

## Components

### Buttons
- **Shape:** full pill (9999px), minimum height 44px (36px small), bold text, 20px horizontal padding.
- **Primary (solid):** brand fill, on-brand text; hover brightens.
- **Soft:** wash fill, brand text. **Pop:** pop fill, aubergine text. **Outline:** card fill, mauve line border. **Ghost:** transparent, hover tint. **Danger:** card fill, danger border and text, fills on hover.
- **Press / loading / disabled:** slight scale-down on press; loading shows an inline spinner; disabled becomes a hover-tint pill with a rule border and muted text.

### Pill tabs and segmented controls
A borderless hover-tinted track with 4px padding holds pills; the selected pill is brand with white text, others are muted with hover tint. Used for Friends / Everyone and for settings choices. Arrow keys move between tabs.

### Cards / Containers
- **Post card:** card white, 24px corners, blush rule border, soft shadow, 16/20px padding, round 44px avatar left, bold name, muted handle and tabular age, optional photo at 16px corners. A new post arrives with a soft rise. Demo content carries a small wash "demo" pill.
- **Actions row:** 44px pill buttons, muted until hover; liked heart fills pop and pops once; saved bookmark fills brand.

### Inputs / Fields
- **Style:** card fill, 1px mauve line border, 16px corners, 44px minimum height, muted placeholder, brand caret.
- **Focus:** 3px brand-soft outline. **Error:** danger border with an alert message below; hints are muted.

### Navigation
- **Sidebar:** light card ground, pill items 48px tall with icon and bold lowercase-friendly label; active is wash with brand text, hover is blush. A full-width solid New post pill sits at the bottom.
- **Mobile:** white top bar, and a rounded-top white tab bar with a raised 56px round brand New post button centred; active tabs take brand text, inactive muted. Unread shows as a pop dot or count pill.

### Wordmark
Two overlapping rounded speech bubbles (brand and pop) beside the lowercase "be2gether" in Gabarito extra-bold.

### Theme picker
A grid of 16px-corner option cards, each with a two-colour round swatch (brand and pop); selected has a brand border, wash fill and a check.

## Do's and Don'ts

### Do:
- **Do** keep action and selection on the brand colour and selection ground on wash.
- **Do** give every card 24px corners, a blush hairline and the single soft shadow.
- **Do** make every tappable control a pill or circle with at least 44px height.
- **Do** keep dark mode aubergine (`#1d171f` ground), and let themes change only brand, pop and wash.
- **Do** write labels in sentence case and keep counts tabular and optional.
- **Do** switch off the rise and heart-pop animations when Animations is off or reduced motion is set.

### Don't:
- **Don't** use the hard, uppercase, ink-bordered transit-sign look of the first redesign.
- **Don't** use pop for anything beyond hearts, unread marks and the wordmark bubble.
- **Don't** use cream, pure black, or pure grey grounds.
- **Don't** add hard offset shadows or a second shadow tier.
- **Don't** show or imply friend counts or popularity as status.
- **Don't** ship photographs in demo content; photos are user-uploaded only.
