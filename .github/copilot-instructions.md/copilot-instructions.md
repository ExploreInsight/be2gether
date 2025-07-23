# Copilot Instructions for AI Agents

## Project Overview
- This is a Next.js project (TypeScript, App Router) bootstrapped with `create-next-app`.
- Main app code is in `src/app/` (entry: `page.tsx`, layout: `layout.tsx`).
- Shared UI components are in `src/components/` and `src/components/ui/`.
- Utility functions are in `src/lib/`.
- Static assets are in `public/`.

## Key Patterns & Conventions
- Use functional React components with TypeScript.
- Global styles: `src/app/globals.css`.
- Theme and color mode handled via `theme-provider.tsx` and `ModeToggle.tsx`.
- Navigation is handled by `Navbar.tsx`.
- UI primitives (e.g., `button.tsx`, `sheet.tsx`) are in `src/components/ui/`.
- Prefer colocating component-specific styles and logic.
- Use Next.js conventions for routing, layouts, and static assets.

## Developer Workflows
- **Start dev server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
- **Edit main page:** `src/app/page.tsx` (auto-reloads)
- **Build for production:** `npm run build`
- **No custom test or lint scripts detected** (add as needed)

## External Integrations
- No custom backend or API integration detected in this codebase.
- No database or authentication logic present.
- No custom middleware except `src/middleware.ts` (review for any logic).

## Examples
- To add a new UI component: place it in `src/components/` or `src/components/ui/` and import as needed.
- To update navigation: edit `src/components/Navbar.tsx`.
- To add global styles: edit `src/app/globals.css`.

## Additional Notes
- Follow Next.js and React best practices unless project-specific patterns are documented here.
- If adding new workflows or conventions, update this file to keep AI agents productive.
