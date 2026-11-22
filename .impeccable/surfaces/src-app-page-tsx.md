---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface brief: be2gether app shell (feed, search, saved, profile, settings, admin)

Mode: Operate. Audience: small community of friends posting daily, phone-first. Task: read the day, post, reply, find, save.

## Direction contract

THESIS: A feed that feels like a warm group chat you want to open: soft cards, round faces, sentence-case friendly type. It refuses the hard, uppercase, ink-bordered transit-sign look the first redesign shipped, and the cold default social feed.
OWN-WORLD: Rosy-white ground (not cream), white soft-shadowed cards with 20px corners, round avatars, pill buttons and pill tabs, aubergine-tinted ink, one cheerful brand colour (rose by default) with a tinted wash for selection, a coral pop colour only for hearts and unread marks. Gabarito for titles and the wordmark, Nunito for text. Dark mode is aubergine night, not black. Themes swap brand and pop only.
STORY: A friend opens it, sees what friends posted today in warm cards, writes one in a single tap, replies, saves, and leaves feeling welcome. Nothing claims friend counts or popularity.
FIRST VIEWPORT: Desktop: light sidebar (logo, Feed, Search, Saved, Alerts, Settings, Record pill), centre column with Friends / Everyone pill tabs, composer card ("What's happening today?"), post cards below; right column with tags and people to follow. Phone: white top bar with logo, post cards full width, floating round Record button centred in a white bottom tab bar.
FORM: Warm and soft, pinned by the user's choice of "Warm and soft" after the first world was rejected as unfriendly; seed: none (pinned) "Warm and soft".
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature move
Posts arrive with a soft rise; a heart pops once when liked. Both off when Animations is off.

## Unresolved
Photos stay sparse: only user-uploaded post images; demo content ships no photographs.
