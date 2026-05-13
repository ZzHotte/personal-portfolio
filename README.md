# vcard-fullstack

A Next.js full-stack personal vCard / portfolio site: `/` is served from `public/index.html`, with health and contact APIs under `app/api`.

## Prerequisites

- **Node.js**: **20 LTS** or newer (aligned with `@types/node` in this repo)
- Package manager: `npm`, `pnpm`, `yarn`, or `bun` (examples below use `npm`)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The dev server runs with Turbopack (`next dev --turbopack`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production server (run `build` first) |
| `npm run lint` | Run ESLint |

## Optional environment variables

- **`CONTACT_WEBHOOK_URL`**: When set, `POST /api/contact` forwards the form payload as JSON to that URL. When unset, submissions are logged on the server and the handler still returns success (convenient for local work).
