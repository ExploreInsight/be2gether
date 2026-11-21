# be2gether

A daily social feed. People open it on a phone at night and a laptop in daylight, so light and dark are both first-class. The default follows the system.

## Color

One accent: lagoon pine. It owns the header bar, primary buttons, comment-active, and focus. The page behind the cards is a sage wash, not white. Neutrals are the same hue at very low chroma, not pure gray and not cream paper.

Likes and delete use destructive red. Follows use success green. Warning is reserved and is not the accent. Do not hardcode Tailwind palette colors (`red-500`, `blue-500`, `green-500`) in product UI.

Tokens live in `src/styles/theme.css`. Retune by pasting that file into [tweakcn.com](https://tweakcn.com), exporting, and replacing the `:root` and `.dark` blocks.

## Type

Two families, loaded once in `src/app/layout.tsx`:

- Display: Bricolage Grotesque (`font-serif`) for the wordmark, names, and card titles.
- Body: Figtree (`font-sans`) for posts, chrome, and UI.

Do not use a monospace face as a costume. Radius is `0.625rem`. Cards sit on the tinted page with a soft offset shadow, not a glass bar.
