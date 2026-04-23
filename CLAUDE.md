# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # build (watch) + start Express server concurrently
npm run build        # production webpack build → /public/
npm run build:dev    # webpack watch mode only
npm start            # serve already-built bundles on port 8000
```

There are no tests configured (Jest types are installed but unused).

## Environment

Requires a `.env` file at the repo root:

```
BACKEND_URL="http://localhost:3000/v1"
GOOGLE_CLIENT_ID="<google-oauth-client-id>"
```

`dotenv-webpack` injects these at build time. The production build uses `EnvironmentPlugin` instead.

## Architecture

This is a React 19 + TypeScript SPA (webpack-bundled) served by a thin Express server (`index.js`). All routing is client-side; the server has a catch-all that returns `index.html`.

**Layers:**

- **`src/client/index.ts`** — Axios instance + all API methods. `BACKEND_URL` is injected at build time. Interceptors auto-redirect to `/not-found` on 404 and throw on 401. JWT is stored in `localStorage` under the key `"t"` and attached via `Authorization: Bearer` header on every request.

- **`src/state/`** — Global auth state (`isLogged`, `role`, `userId`, `email`, `name`) lives in a React Context. The `useGlobalContext()` hook is the only way to read or update it. There is no Redux or other state library.

- **`src/router/`** — React Router v7 with all pages lazy-loaded (`React.lazy`). `PrivateRoute` reads the JWT from localStorage, calls `verifyToken`, and redirects to `/login` if it fails. It also enforces role-based access (`admin` / `seller` / user).

- **`src/pages/`** — Route-level components. Each page is responsible for its own data fetching using the client methods directly (no shared data layer like React Query).

- **`src/components/`** — Shared layout primitives (`MainLayout`, `Container`, `Section`, `Title`, etc.) and global chrome (`AppHeader`, `Logo`). UI is built with Ant Design 6.

## Key Conventions

- Prettier is configured: 2-space indent, single quotes, 100-char line width, no trailing commas. Run `npx prettier --write .` to format.
- TypeScript is in strict mode with `noEmit: true` — webpack + babel-loader handle compilation; `tsc` is only for type checking.
- The `src/client/index.ts` file is the single source of truth for API shape — add new endpoints there.
- Deployment to GitHub Pages is triggered by pushing to `main` (see `.github/workflows/deploy.yml`). The `vercel.json` SPA fallback route is also present for Vercel hosting.
