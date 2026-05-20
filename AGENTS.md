# Agent Guide — Kamchatka

Authoritative stack and conventions live in [CLAUDE.md](./CLAUDE.md). This file is the short version for AI agents.

## Stack snapshot

Next.js 16 App Router · React 19 · TypeScript 5 (strict) · Tailwind 4 · shadcn/ui · React Query 5 · Jest + RTL · ESLint 9 · Prettier · **pnpm**.

## Commands

```
pnpm dev | build | start | lint | format | test
```

## Rules

- Use `pnpm`, never `npm` or `yarn` (lockfile is `pnpm-lock.yaml`).
- Tailwind 4: theme in `app/globals.css` under `@theme`, not a JS config.
- Add shadcn primitives via `pnpm dlx shadcn@latest add <name>` — they land in `components/ui/`.
- Fetchers in `lib/api/`, hooks in `hooks/`, RQ keys are domain tuples.
- Tests: co-located `*.test.tsx` or under `tests/`. Use `@testing-library/react` + `@testing-library/jest-dom`.
- TypeScript: explicit return types, no `any`, destructured props.
