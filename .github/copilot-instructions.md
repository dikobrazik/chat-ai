# Copilot Instructions

## Tooling and validation

- Use Node.js 24 and npm. Install locked dependencies with `npm ci`.
- Start local development with `npm run dev` (`next dev --turbopack`).
- Run the PR-equivalent checks:
  ```bash
  npx biome ci --changed --since=origin/main --no-errors-on-unmatched
  npx tsc --noEmit
  npm run build
  ```
  The full `npm run lint` (`biome check`) has pre-existing lint debt; lint only files changed from `main` for normal PR work. Format changed files with `npm run format`.
- There is no automated test runner or test suite configured, so no single-test command exists. Component stories use Storybook: `npm run storybook`; build them with `npm run build-storybook`.
- To inspect bundle size, use `npm run analyze`.

## Application architecture

- This is a Next.js App Router frontend for JonuAI. `src/app/layout.tsx` provides the persistent shell (sidebar, header, toast container, cookie banner), while route pages are thin compositions of `src/components/business` features. The `@modal` parallel route and `(.)` intercepting routes render login, plans, and settings as modals over the current page.
- `src/providers/index.tsx` defines the required client-provider nesting: React Query, authentication, email authentication, selected model, dialog modal state, then file attachments. Use the corresponding provider hooks instead of adding competing global state. Model selection and image-chat drafts persist through `usePersistentState`; file blobs remain in `FilesProvider` while attachments carry the server IDs used to submit prompts.
- All backend traffic goes through the Axios singleton configured in `src/api/index.ts`, whose base URL is `${NEXT_PUBLIC_BASE_URL || BASE_URL}/api` and which sends credentials. Each backend domain has a small `src/api/<domain>` module for request functions plus React Query hooks. Keep server data in React Query and invalidate or update the established domain query keys after mutations.
- Chat creation uses the selected model, then `/chat/[id]` loads chat and prompts. `useSendPromptStream` consumes the backend SSE prompt stream, updates the temporary leading model message for `delta` events, replaces it on `complete`, and refreshes `CHATS_QUERY_KEY` when the stream ends. Preserve this message ordering and stream-event handling when extending chat behavior.
- In local frontend-only development, set `NEXT_PUBLIC_BASE_URL=http://localhost:3000` and `DEV_API_PROXY=<backend URL>` in uncommitted `.env`; `next.config.ts` rewrites `/api/*` through that proxy outside production. Do not add the proxy to production configuration.

## Repository conventions

- Use `@/` imports for `src` and `@/ui/*` for reusable UI components. Route and component modules use default exports only where an existing local pattern does; business and API modules generally expose named exports through their domain `index.ts`.
- Keep reusable primitives in `src/components/ui` and product-specific composition/state in `src/components/business`. UI components pair with SCSS modules; shared Sass variables are injected globally from `src/styles/_variables.scss`. Tailwind utility classes are also used in JSX, especially for local layout.
- Render existing icons through `src/components/ui/Icon`. To introduce an icon, add it to that component's registry rather than embedding ad hoc SVG markup; this is also enforced by `.github/instructions/copilot-instructions.md`.
- Prefer domain API hooks (`useQuery`/`useMutation`) over direct Axios calls in components. Queries use 15-minute stale and garbage-collection times from `QueryProvider`; mutations that alter cached collections should follow the local optimistic-update or invalidation pattern.
