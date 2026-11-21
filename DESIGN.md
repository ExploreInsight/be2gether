# be2gether

A daily social feed. People open it on a phone at night and a laptop in daylight, so light and dark are both first-class. The default follows the system.

## Logo

`src/components/brand/Logo.tsx`. The mark is a drawn `2` in a rounded tile, not an image file, so it takes the theme color and stays crisp at 20px. Use `<Logo />` for the wordmark and `<LogoMark />` for the tile alone. `tone="inverse"` puts it on the pine header; `tone="solid"` puts it on a light surface.

## Color

One accent: lagoon pine. It owns the header bar, primary buttons, comment-active, and focus. The page behind the cards is a sage wash, not white. Neutrals are the same hue at very low chroma, not pure gray and not cream paper.

Likes and delete use destructive red. Follows use success green. Warning is reserved and is not the accent. Do not hardcode Tailwind palette colors (`red-500`, `blue-500`, `green-500`) in product UI.

## Retuning with TweakCN

Every token lives in `src/app/globals.css`, between the `TWEKCN THEME START` and `TWEKCN THEME END` markers. That block is exactly what [tweakcn.com](https://tweakcn.com) expects: the `@theme inline` mapping, then `:root`, then `.dark`.

To retune:

1. Open tweakcn.com and paste the block.
2. Move the sliders, export.
3. Replace the block in `src/app/globals.css` with the export.

Keep the two extra tokens, `--brand-highlight` and `--logo-glyph`, or the wordmark loses its accent. Fonts are not part of the export: they load once in `src/app/layout.tsx` and are referenced through `--font-sans` and `--font-serif`.

## Type

Two families, loaded once in `src/app/layout.tsx`:

- Display: Bricolage Grotesque (`font-serif`) for the wordmark, names, and card titles.
- Body: Figtree (`font-sans`) for posts, chrome, and UI.

Do not use a monospace face as a costume. Radius is `0.625rem`. Cards sit on the tinted page with a soft offset shadow, not a glass bar.
