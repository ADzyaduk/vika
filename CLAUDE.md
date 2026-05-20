# Kamchatka
ba
Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4.

## Stack

- **Framework**: Next.js `16.2.4` (App Router, Turbopack)
- **Runtime**: React `19.2.4`
- **Language**: TypeScript `^5` (strict mode, `@/*` path alias to repo root)
- **Styling**: Tailwind CSS `^4` via `@tailwindcss/postcss` (no `tailwind.config.*` — theme lives in `app/globals.css` under `@theme`)
- **UI primitives**: shadcn/ui (`components.json` configured, primitives copied into `components/ui/`)
- **Icons**: `lucide-react`
- **Data fetching**: `@tanstack/react-query` v5; provider in `lib/query-client.tsx`, mounted in `app/layout.tsx`
- **Testing**: Jest + `@testing-library/react` (jsdom)
- **Lint**: ESLint v9 with `eslint-config-next`
- **Format**: Prettier with `prettier-plugin-tailwindcss`
- **Package manager**: `pnpm` (committed `pnpm-lock.yaml`, `pnpm-workspace.yaml`)

## Layout

```
app/                  # App Router (layout.tsx, page.tsx, globals.css)
components/ui/        # shadcn primitives (e.g. button.tsx)
components/           # Custom components
hooks/                # Custom React hooks
lib/                  # utils.ts (cn), query-client.tsx, api/
lib/api/              # Fetchers consumed by React Query hooks
styles/               # Extra CSS additions if needed
tests/                # Standalone tests (co-located *.test.tsx also fine)
public/
```

## Commands

```
pnpm dev          # next dev (Turbopack)
pnpm build        # next build
pnpm start        # next start
pnpm lint         # next lint
pnpm format       # prettier --write .
pnpm test         # jest
```

## Conventions

- Arrow functions with explicit return types; destructure props.
- Avoid `any` — prefer `unknown` or generics.
- Import order: react → next → third-party → `@/...` local.
- React Query keys are domain-prefixed tuples: `['user', id]`.
- Place fetchers in `lib/api/`, expose them as hooks from `hooks/`.
- shadcn install: `pnpm dlx shadcn@latest add <component>`.

## Notes for future sessions

- Tailwind 4 has no JS config file — extend the theme inside `app/globals.css` via `@theme inline`.
- `components.json` style is `new-york`, base color `neutral`, RSC enabled.
- React Query devtools render only in dev; provider lives at the root so all routes have access.
