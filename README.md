# Personal Portfolio — ilhan.io

Personal portfolio and blog of **Ilhan Kalač**, a Software Engineer. A statically
generated site presenting experience, projects, skills and recommendations, plus a
blog, favorite quotes and a "list of seen films" page. Portfolio content is managed
through a Firebase-backed admin panel.

## Tech Stack

- **[Nuxt 4](https://nuxt.com/)** (Vue 3, SSR / static generation)
- **[Nuxt UI](https://ui.nuxt.com/)** — UI components
- **[Nuxt Content](https://content.nuxt.com/)** — Markdown-based blog posts
- **[Pinia](https://pinia.vuejs.org/)** — state management
- **[Firebase](https://firebase.google.com/)** — Realtime Database for portfolio data + hosting
- **[Tiptap](https://tiptap.dev/)** — rich text editor for the admin panel
- Google Fonts, Sitemap module

## Project Structure

```
app/
  pages/            Public pages + /admin-panel + /blogs
  components/       Portfolio sections, content, common & base components
  stores/           Pinia stores
  composables/      Reusable logic
content/blogs/      Markdown blog posts (Nuxt Content)
server/api/         Portfolio data endpoints (about, skills, experiences, projects, recommendations)
public/images/      Project, blog, logo & avatar assets
scripts/            Data utilities (e.g. merge-film-data)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev
```

Create a `.env` file with your Firebase credentials (see the keys under
`runtimeConfig.public` in `nuxt.config.ts`):

```
NUXT_PUBLIC_FIREBASE_API_KEY=...
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NUXT_PUBLIC_FIREBASE_PROJECT_ID=...
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NUXT_PUBLIC_FIREBASE_APP_ID=...
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
NUXT_PUBLIC_FIREBASE_DATABASE_URL=...
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run generate` | Generate the static site |
| `npm run preview` | Preview the production build |
| `npm run merge-films` | Merge film data (`scripts/merge-film-data.js`) |

## Deployment

The site is generated as a static app (`nitro.preset: 'static'`) and deployed to
**Firebase Hosting** (`firebase.json`).

```bash
npm run generate
firebase deploy
```
