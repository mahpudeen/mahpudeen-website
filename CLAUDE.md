# Personal Website — Claude Instructions

## Project Overview
Personal CEO website — long-term digital archive and personal branding asset built with Next.js.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- next-mdx-remote (blog, TIL, snippets, bookshelf)
- Supabase (guestbook, dynamic features)
- next-themes (dark/light mode)

## Design System
- **Fonts:** Plus Jakarta Sans (heading) + DM Sans (body)
- **Dark mode:** bg `#0F1117`, surface `#1A1D27`, accent `#F59E0B`, text `#E2E8F0`
- **Light mode:** bg `#FAFAF8`, surface `#F1F0EB`, accent `#D97706`, text `#1A1D27`
- **Vibe:** Techy & warm

## Folder Structure
- `src/app/` — App Router pages
- `src/components/ui/` — shadcn components
- `src/components/layout/` — Navbar, Footer
- `src/components/shared/` — reusable custom components
- `src/content/` — MDX files (blog, til, snippets, bookshelf)
- `src/lib/` — supabase.ts, mdx.ts, utils.ts
- `src/types/` — TypeScript types

## Conventions
- Always use TypeScript with strict types
- Use `@/` import alias
- Tailwind for all styling, no inline styles
- shadcn/ui as base component library
- Always support dark & light mode
- Mobile-first responsive design

## Important
- Always use App Router, never Pages Router
- Server Components by default, Client Components only when needed
- Keep components small and focused