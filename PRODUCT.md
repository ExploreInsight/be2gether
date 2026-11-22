# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
A small community of friends who post daily, phone-first at night and on a laptop in daylight. Basis: user's answer "go with defaults" to the audience question (default proposed: invite-feel community of friends). Not a public mass-market network.

## Product Purpose
be2gether is a daily social feed: write a short post with an optional photo, like and comment on friends' posts, follow people, and get notified. Success is friends opening it every day and replying to each other.

## Positioning
A small, calm, friends-only-feeling feed. Not an algorithmic public network. (Inferred; confirm.)

## Operating Context
Signed-out visitors can read the feed. Signed-in users post, like, comment, follow, receive notifications and edit a profile. Routes today: `/`, `/post/[id]`, `/profile/[username]`, `/notifications`.

## Capabilities and Constraints
- Stack: Next.js 15 (App Router), React 19, Tailwind 4, Clerk auth, Prisma + PostgreSQL, UploadThing images, deployed on Vercel. Server actions in `src/actions`.
- Scope confirmed: full-stack. New server features (search, bookmarks, hashtags, settings, demo seed) are in scope; migrations must not be run against production by the agent.
- Existing models: User, Post, Comment, Like, Follows, Notification.
- Missing today: search, bookmarks, hashtags, Settings page, comment delete, pagination, moderation/admin.

## Brand Commitments
- Name stays "be2gether" (user default). The logo mark may be redrawn.
- The prior look (T3 Chat rose theme, Bricolage + Figtree) is evidence and anti-reference, not authority.

## Evidence on Hand
No real testimonials, customer counts, statistics or prices exist and none may be invented. Any sample content must be labelled demo.

## Product Principles
1. Friends first: the feed is people you know, not a stream of strangers.
2. Fast to post, easy to reply. The two key actions stay one thumb away.
3. Quiet by default: no counts-as-status pressure, no dark patterns.
4. Works the same on a phone at night and a laptop in daylight; the person chooses the theme.
5. Nothing is claimed that is not true; demo content is always labelled.

## Accessibility & Inclusion
Text contrast at least 4.5:1, visible focus, labelled controls, keyboard-friendly, honour reduced motion and offer an in-app animations toggle. No horizontal overflow at 390px.
