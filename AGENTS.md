<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Bazar-Dor (বাজার দর)

Bangla grocery-price site. Single Next.js 16 App Router package (no monorepo, npm only — `package-lock.json`). UI copy is in Bangla; route slugs are transliterated Bangla: `mach`=fish, `sobji`=vegetables, `dal`, `chal`=rice, `tel`=oil, `mosla`=spices, `mangsho`=meat, `dim-dui`=eggs.

## Commands

- `npm run dev` — Turbopack dev server (also rewrites the managed block above)
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`)
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script
- No tests or CI exist — lint + typecheck are the only verification steps
- `npm run build` evaluates `src/lib/auth.ts` at module load, so a populated `.env` is required even to build

## Next.js 16 specifics (verify in `node_modules/next/dist/docs/`)

- `cacheComponents: true` + `partialPrefetching: true` in `next.config.ts`: the new Cache Components caching model applies, not classic `fetch` cache semantics. Category pages currently fetch external data with `cache: "force-cache"`.
- React Compiler enabled (`reactCompiler: true` + `babel-plugin-react-compiler`).
- Layout uses the generated global `LayoutProps<"/">` type — do not replace with hand-written prop types.
- Dynamic `[param]` pages must either export `generateStaticParams` or wrap `params` access in `<Suspense>` — `params` outside Suspense blocks prerender and fails `next build` ("blocking-prerender-dynamic"). `export const dynamicParams` is removed with `cacheComponents` (build error); unlisted params fall back to ISR/app-shell, and `notFound()` results get cached (first visit streams a 404 shell, later visits return real 404).
- Tailwind v4 via PostCSS; `src/app/globals.css` pulls in daisyUI (`@plugin "daisyui"`) and `@import "@heroui/styles"`. `@heroui/react` is installed but never imported — only its styles are used.

## Structure

- All routes under `src/app/`; shared components live in `src/app/component/` (singular, not `components/`).
- All 8 category folders (`chal`, `dal`, `dim-dui`, `mach`, `mangsho`, `mosla`, `sobji`, `tel`) share the same 3-file pattern (copied same-to-same from `dal/` on purpose — even the `Dal` interface name is duplicated in every `ProductList.tsx`; don't "fix" it, that's how the user wants it): `page.tsx` (server fetch + header), `ProductList.tsx` (client, sort dropdown, cards link to `/<category>/<id>`), `[slug]/page.tsx` (detail + `generateStaticParams`, matches product by `id` from the `Number(slug)` param). `ProductList.tsx` gates card clicks on `authClient.useSession()`: logged in → detail page, logged out → `/sign-up`, session loading → click blocked. All fetch the external API `https://api.abcz.workers.dev/api/bazardor/products?category=<slug>` with `cache: "force-cache"` — follow that pattern when adding a category.
- Home page sections `Price.tsx`, `DownPrice.tsx`, `AllProduct.tsx` (in `src/app/component/`) wrap each card in the shared client component `ProductCardLink.tsx` (`/${category}/${id}` href, same session gate: logged out → `/sign-up`).
- Path alias: `@/*` → `src/*`.

## Auth (better-auth + MongoDB)

- Server config `src/lib/auth.ts` (DB name hardcoded to `bazar-public`), client `src/lib/auth-client.ts`, catch-all handler `src/app/api/auth/[...all]/route.ts`.
- Required env vars in gitignored `.env`: `MONGO_DB_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`. `auth.ts` builds the Mongo client at import time, so anything importing it needs `MONGO_DB_URL` set.
