# Aurelia Museum — Virtual Guide

A responsive, accessible **Museum Virtual Guide** built with **React + Vite**. Visitors can explore exhibits, search and filter the collection, read about individual objects, and find their way around the building using an interactive floor plan with step‑by‑step directions.

> ⚠️ **Sample content notice:** The "Aurelia Museum" and all its exhibits, dates, and details are **illustrative sample content** created for this learning project. They are clearly labelled in the UI and are **not verified historical facts**.

---

## Features

- **Home** — hero, museum introduction, featured exhibits, quick links, and sample visiting info.
- **Exhibits** — a responsive card grid with images, names, categories, and short descriptions.
- **Search** — live search by exhibit name **and** description (case‑insensitive).
- **Category filters** — work **together** with search; state is reflected in the URL.
- **Exhibit detail** — image, historical background, interesting facts, category, room location, and a "Find on floor plan" link.
- **Interactive floor plan** — a custom inline SVG with labelled rooms and exhibit counts.
- **Routing / wayfinding** — pick a starting room (by clicking the map or a dropdown) and a destination exhibit; the app computes the **shortest route** (BFS) and shows step‑by‑step directions, with the route highlighted on the map.
- **Visitor guide** — a short "how to use this site" section.
- **States** — loading skeleton, empty‑search, invalid exhibit (404), and invalid‑selection states.
- **Accessibility** — semantic landmarks, skip link, labelled controls, keyboard‑friendly rooms, focus styles, alt text, and reduced‑motion support.
- **Responsive** — mobile, tablet, and desktop layouts with a collapsible navigation menu.
- **Reliable assets** — all exhibit illustrations are generated **local SVGs** (no network needed) with an automatic fallback placeholder.

## Tech stack

- **React 18** + **Vite 5**
- **React Router 6** (`HashRouter` — works on GitHub Pages without server config)
- **Vitest** + **Testing Library** for automated tests
- Plain **CSS** (no UI framework) with a warm museum‑inspired design system
- Local **JSON** data — no backend, no API keys, no paid services

## Project structure

```
museum-virtual-guide/
├─ public/assets/exhibits/      # Generated SVG illustrations + placeholder
├─ scripts/generate-art.mjs     # Generates the exhibit illustrations
├─ src/
│  ├─ components/               # Navbar, Footer, ExhibitCard, FloorPlan, ...
│  ├─ data/                     # exhibits.json, rooms.json, siteConfig.js
│  ├─ pages/                    # Home, Exhibits, ExhibitDetail, FloorPlanPage, VisitorGuide
│  ├─ utils/                    # filterExhibits, pathfinding (BFS), formatRoute
│  ├─ test/                     # automated tests
│  ├─ App.jsx / main.jsx / index.css
├─ .github/workflows/deploy.yml # GitHub Pages deploy workflow
├─ vite.config.js / vitest.config.js
└─ package.json
```

## Local setup

Requirements: **Node.js 18+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Regenerate the exhibit illustrations
npm run generate:art

# 3. Start the dev server (open the printed URL, usually http://localhost:5173)
npm run dev
```

## Testing

Automated tests cover the most important behaviour: search + filtering, pathfinding (BFS), route formatting, the exhibits page, exhibit detail, and floor‑plan routing.

```bash
# Run all tests once
npm test

# Run in watch mode
npm run test:watch
```

## Production build & preview

```bash
npm run build     # outputs to dist/
npm run preview   # serves the production build locally
```

## Deployment to GitHub Pages

This project is configured for **GitHub Pages project sites** (`https://<username>.github.io/<repo>/`).

1. Create a new repository (e.g. `museum-virtual-guide`) and push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Museum Virtual Guide"
   git branch -M main
   git remote add origin https://github.com/<username>/museum-virtual-guide.git
   git push -u origin main
   ```
2. In your repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main`. The included workflow (`.github/workflows/deploy.yml`) will:
   - install dependencies (`npm ci`),
   - regenerate the illustrations,
   - build with `BASE_PATH=/<repo-name>/` so asset paths are correct under the project URL,
   - upload and deploy the `dist/` folder to GitHub Pages.

The site URL will be `https://<username>.github.io/<repo-name>/`.

> Deploying a **user/organization site** (repo named `<username>.github.io`, served from root)? Set `BASE_PATH=/` instead. In `deploy.yml`, change the build `env` to `BASE_PATH: /`. Also update `repoUrl` in `src/data/siteConfig.js` to your own repository URL.

### Asset paths under a project URL

Routing uses `HashRouter`, so deep links like `#/exhibits/sun-disk-of-aravia` work after a refresh on GitHub Pages. Public assets are referenced via `import.meta.env.BASE_URL`, which Vite sets from the `base`/`BASE_PATH` value, so images load correctly under `/<repo-name>/`.

## Configuration

Most site‑wide content lives in **`src/data/siteConfig.js`** — the museum name, tagline, hours, admission, categories, and the `repoUrl` used in the footer. Exhibit data is in **`src/data/exhibits.json`** and the museum layout/adjacency graph in **`src/data/rooms.json`**. The room `connectsTo` arrays define the graph used by the BFS pathfinder.

## Screenshots

Add screenshots here once you have run the app:

| Home | Exhibits | Floor plan |
|------|----------|------------|
| ![Home](./docs/home.png) | ![Exhibits](./docs/exhibits.png) | ![Floor plan](./docs/floor-plan.png) |

(Drop images into a `docs/` folder, or remove these placeholders.)

## License

This is a learning project. You're welcome to use and adapt it.
