# be2gether

A daily social feed. People open it on a phone at night and a laptop in daylight, so light and dark are both first-class. The default follows the system.

## Theme

The palette is the **T3 Chat** preset from [tweakcn.com](https://tweakcn.com), read from `https://tweakcn.com/r/themes/t3-chat.json`. It lives in one block in `src/app/globals.css`, between the `TWEKCN THEME START` and `TWEKCN THEME END` markers, in the exact export shape: `@theme inline`, then `:root`, then `.dark`.

To retune: paste that block into tweakcn.com, move the sliders, export, and replace the block. Fonts are not part of the export, they load once in `src/app/layout.tsx`.

Four tokens deviate from the raw preset, each because the original failed contrast on our surfaces:

- light `--card` is white, so posts read as raised surfaces on the tinted page
- light `--border` is one step darker, so card edges stay visible
- dark `--primary` is a lighter rose, so it works as text on a dark card
- dark `--destructive` is a readable red with a dark foreground on it

`--brand` and `--brand-highlight` are ours. The header bar is always dark, in both themes.

## Logo

`src/components/brand/Logo.tsx`. The mark is a drawn `2` in a rounded tile, not an image file, so it takes the theme color and stays crisp at 20px. Use `<Logo />` for the wordmark and `<LogoMark />` for the tile alone. `tone="inverse"` puts it on the dark header, `tone="solid"` on a light surface.

## Color

One accent: the T3 Chat rose. It owns the header wordmark, primary buttons, the active tab underline, comment-active, and focus. Likes and delete use destructive red. Follows use success green. Do not hardcode Tailwind palette colors (`red-500`, `blue-500`, `green-500`) in product UI.

## Type

Two families, loaded once in `src/app/layout.tsx`:

- Display: Bricolage Grotesque (`font-serif`) for the wordmark, names, and card titles.
- Body: Figtree (`font-sans`) for posts, chrome, and UI.

Do not use a monospace face as a costume. Radius is `0.5rem`. Cards sit on the tinted page with a soft offset shadow, not a glass bar.
