---
name: be2gether
description: A daily friends feed set as a mixtape J-card inlay, with numbered tracks, durations for ages, an ultramarine spine and signal orange marks.
colors:
  spine: "#2a3bd6"
  spine-soft-dark: "#a9b4ff"
  signal: "#ff5a1f"
  paper: "#f2f4f1"
  card: "#fbfcfa"
  ink: "#101214"
  muted: "#4a5057"
  hover: "#e6e9e4"
  danger: "#b3261e"
  paper-dark: "#0e1013"
  card-dark: "#15181c"
  ink-dark: "#f0f2ee"
  muted-dark: "#a6acb3"
  hover-dark: "#1d2126"
  danger-dark: "#ff9188"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "3rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0em"
  track-number:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 1
  track-age:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  none: "0px"
spacing:
  row-pad: "20px"
  row-pad-compact: "12px"
  gutter: "16px"
  column-gap: "40px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-solid-hover:
    backgroundColor: "{colors.spine}"
    textColor: "{colors.paper}"
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-ghost-hover:
    backgroundColor: "{colors.hover}"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
    height: "44px"
  rail:
    backgroundColor: "{colors.spine}"
    textColor: "{colors.paper}"
    width: "260px"
    padding: "32px 24px"
  rail-item-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "48px"
  tab-bar-item-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "56px"
  tab-bar-record:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    height: "56px"
  unread-mark:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
  avatar:
    backgroundColor: "{colors.spine}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
---

# Design System: be2gether

## Overview

**Creative North Star: "The J-Card Tracklist"**

be2gether is a mixtape inlay printed offset. The day's posts are tracks on a tape: numbered by position, aged as durations (0:47), split into Side A (friends) and Side B (everyone). The shell is an ultramarine spine; the content sits on a cool off-white card in near-black ink with hairline track rules. Signal orange appears only as a fill or a mark, never as text.

Density is moderate and the mood is calm and printed rather than glossy. Structure comes from ink rules and flat colour blocks, not from shadow, rounding or cards-per-post. The one display voice is a condensed heavy face used for side titles, page titles, track numbers and ages; everything else is a single humanist grotesque. Dark mode is the same card printed on black stock with a lighter spine blue. Five selectable themes (ultramarine, vermilion, moss, graphite, plum) swap only the spine and signal hues.

The build follows the intended world closely. Nothing in the shipped code claims friend or popularity counts.

**Key Characteristics:**
- Square corners everywhere; no radius, no shadows.
- Two-weight ink rules: 2px for structure, 1px at 30% ink for track dividers.
- Condensed heavy uppercase display titles; numbers in tabular figures.
- Spine colour owns the shell (rail, phone top bar, avatars); signal owns fills and marks.
- Colour themes change spine and signal only; paper, ink and muted never change by theme.

## Colors

A two-hue print palette, ultramarine and orange, on a cool grey-white ground with near-black ink. Themes swap the two hues; the neutrals stay.

### Primary
- **Ultramarine Spine** (#2a3bd6, set by `--spine`): the shell: desktop rail, phone top bar, avatar fill, and the track-number colour in light mode. Dark mode keeps the block colour for the shell and switches text uses to **Spine Soft** (#a9b4ff in the ultramarine theme) for legibility.

### Secondary
- **Signal Orange** (#ff5a1f, `--signal`): fills and marks only: the Record button, the active-side underline, the unread tape mark, the Record tab, text selection. Ink text sits on it (`--on-signal` #101214). It is never body or link text.

### Neutral
- **Cool Paper** (#f2f4f1): page ground, phone tab bar, dialogs; the active rail item is paper on the spine.
- **Card White** (#fbfcfa): input fill.
- **Tape Ink** (#101214): text, 2px rules, focus outlines, solid button fill. Rules use ink at full strength for structure and 30% for track dividers.
- **Liner Grey** (#4a5057): secondary text, placeholders, inactive side title.
- **Rewind Tint** (#e6e9e4): hover fill for ghost buttons and segmented options.
- **Jam Red** (#b3261e): errors and destructive outlines only.
- **Black Stock set** (dark mode): paper #0e1013, card #15181c, ink #f0f2ee, muted #a6acb3, hover #1d2126, danger #ff9188. Rules flip to the light ink.

### Named Rules
**The Fill-Not-Type Rule.** Signal orange is a fill or a mark. It never colours text or thin lines; the active-side underline is the only line and it is 6px.

**The Spine Rule.** The spine colour appears as the shell or as a hover fill on the solid button. Content areas stay paper, card and ink.

**The Theme Swap Rule.** Themes override `--spine`, `--spine-soft` and `--signal` and nothing else. A new surface must be built from the role tokens so a theme change needs no per-component edits.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow, sans-serif), self-hosted variable, weights 100 to 900
**Body Font:** Hanken Grotesk (with system-ui, sans-serif), self-hosted variable, weights 100 to 900

**Character:** A condensed poster face against a plain, friendly grotesque: the printed spine lettering over the track credits. The display face carries every title and every number; the grotesque carries everything people read.

### Hierarchy
- **Display** (900, 3rem, 1.0, uppercase): page titles (Search, Saved, Settings, Alerts, Admin, profile name). The Side A / Side B titles use the same face at 2.25rem on phones and 3rem from sm.
- **Headline** (900, 1.875rem, 1.0, uppercase): section titles (Replies, People to follow, Tags this fortnight, dialog titles, empty states at 2.25rem).
- **Track number** (900, 2.25rem, 1.0, tabular figures): the post's position in the day, in the accent colour.
- **Track age** (800, 1.5rem, 1.0, tabular figures): the age written as a duration, right-aligned.
- **Body** (400, 1rem, 1.5): post text, form text; the author name is 700.
- **Label** (600, 0.875rem): field labels, handles, hints, side subtitles (normal case), the demo tag (0.75rem, 700, uppercase).

The wordmark is 3rem stacked in the rail and 1.875rem inline in the phone bar, 900 uppercase at 0.01em tracking, beside a drawn cassette mark.

### Named Rules
**The Display-Is-Titles Rule.** The condensed face is for titles, numbers and durations. Running text, buttons, labels and inputs stay in the grotesque.

**The Tabular Rule.** Any number that can change (track number, age, counts, unread) uses tabular figures.

## Layout

A single time axis. Desktop is a 260px spine rail, then a centred container capped at 62rem with a 40px gap: the main column (capped at 42rem from the xl breakpoint) and a right aside of suggestions and trending tags. Phone drops the rail for a 56px spine top bar and a fixed 56px bottom tab bar (Feed, Search, Record, Alerts, Me) with a safe-area inset. Page gutters are 16px on phones, 32px from sm. Bottom padding clears the tab bar.

A track row is a three-column grid: number (2.5rem, 3.25rem from sm), content, age. Row padding is 1.25rem, 0.75rem in compact density; users can also scale text to 112.5%. Touch targets are 44px minimum (buttons, inputs, icon buttons), 36px for small buttons.

### Named Rules
**The One Axis Rule.** Posts run in a single ordered list with number left and age right. No side-by-side post cards, no masonry.

## Elevation & Depth

Flat and printed. There are no box-shadows anywhere in the build. Depth is carried by 2px ink borders, flat colour blocks (spine against paper) and a 60% ink scrim behind dialogs. The one layer of rank is the spine versus the card ground; the dialog is a paper panel with a 2px ink border.

### Named Rules
**The No-Shadow Rule.** Separate with a rule or a colour block, never a shadow. Hover is a fill change, not a lift.

## Shapes

Square-cut like a printed card. Radius is 0 on buttons, inputs, avatars, dialogs, photos and tabs. The only round things are the busy spinner and the reel circles in the cassette mark. Photos get a 2px ink frame, capped at 28rem wide and 24rem tall. Avatars are square tape labels with initials on the spine colour. Focus is a 3px ink outline (paper on the spine) with a 2px offset.

## Components

### Buttons
- **Shape:** square, 44px minimum height (36px small), 20px horizontal padding, semibold.
- **Solid (default):** ink fill, paper text; hover turns the fill to the spine.
- **Signal:** orange fill with ink text; hover is a slight brightness drop. Used for Record a track.
- **Outline:** 2px ink border, transparent; hover fills with ink. **Danger:** 2px jam-red border; hover fills red. **Ghost:** transparent; hover is Rewind Tint.
- **Loading:** a 16px ring spinner (0.8s) beside the label; disabled is 50% opacity.

### Inputs / Fields
- **Style:** 2px ink border, card fill, square, 44px minimum (textarea 96px), base text, placeholder in muted.
- **Focus:** the global 3px ink outline pulled flush to the border.
- **Error:** border turns jam red and the message appears below in red as an alert; hints are muted. Labels are semibold above the control.

### Segmented control
A 2px ink-bordered row of equal options, 44px high; selected is solid ink on paper text, unselected hovers to Rewind Tint. Focus is an inset signal outline.

### Navigation
- **Rail:** spine fill, paper text, 48px items at 1.125rem semibold, 12px padding; active is a paper block with ink text, hover is 15% paper. The unread count sits right in a signal block.
- **Phone:** spine top bar; the bottom tab bar is paper with a 2px ink top rule, 56px items at 0.75rem semibold, active is solid ink, Record is a solid signal block in the middle, and unread is a 10px signal square on Alerts.

### Track row (signature)
Number in condensed accent figures, name in bold with a muted handle, optional demo tag (1px ink border, uppercase), body text, framed photo, action row, and the age in the display face at right. A 1px 30% ink rule closes each row. New rows enter with a 0.35s rise of 6px and a fade; the list ends with "End of tape".

### Side tabs
Side A and Side B as two real tabs in the display face, 2.25rem to 3rem, with a 2px ink rule beneath. The active side gets a 6px signal underline; the inactive side is muted and darkens to ink on hover. The subtitle (Friends, Everyone) is small grotesque.

### Dialog
A bottom sheet on phones and a 32rem centred panel from sm. Paper fill, 2px ink border, 20px padding, a 60% ink scrim, a headline-size uppercase title and a 44px square close button.

## Do's and Don'ts

### Do:
- **Do** build every surface from the role tokens (`paper`, `card`, `ink`, `muted`, `rule`, `spine`, `signal`) so a theme or dark mode swap needs no edits.
- **Do** write ages as durations in the display face and number posts by position in the day.
- **Do** use 2px ink for structural borders and 1px at 30% ink for dividers between tracks.
- **Do** keep targets at 44px or more and keep the 3px focus outline.
- **Do** label demo content with the demo tag; show no counts that imply status.
- **Do** honour reduced motion: with the animations setting off, nothing moves.

### Don't:
- **Don't** use shadows, radii or card-per-post layouts; they are not part of this world.
- **Don't** set text in signal orange or put it on a thin line.
- **Don't** use the display face for body text, buttons or inputs.
- **Don't** let a theme change anything beyond the spine and signal hues.
- **Don't** reintroduce the old T3 Chat rose palette or the Bricolage and Figtree type.
