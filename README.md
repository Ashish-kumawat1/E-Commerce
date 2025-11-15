# E-Commerce (Vite + React + TypeScript) — README

Overview
- A lightweight demo storefront built with React, TypeScript and Vite.
- Pages: Home (product listing), Product Detail, Cart, Products (alias of Home), Help.
- Routing: `/`, `/products`, `/product/:id`, `/cart`, `/help`.
- Small local persistence: cart and product comments/ratings are persisted to `localStorage` for demo purposes.

Quick Start (Windows PowerShell)

1. Install dependencies

```powershell
cd D:\E-Commerce
npm install
```

2. Run dev server

```powershell
npm run dev
# Open http://localhost:5173 (port may vary)
```

3. Build for production

```powershell
npm run build
npm run preview
```

Routes & Pages
- `/` — Home: product listing (uses `src/components/ProductList.tsx`).
- `/products` — Products: same as Home (keeps a distinct route for navigation).
- `/product/:id` — Product detail: shows product info, rating UI and comments (see `src/components/ProductDetail.tsx`).
- `/cart` — Cart page (`src/components/Cart.tsx`).
- `/help` — Help page (`src/pages/Help.tsx`).

Header / Navigation
- The header component is `src/components/Header.tsx`. It exposes:
  - `onSearch(q: string)` — called when the search input changes.
  - `onShowCart()` — open cart (used to navigate to `/cart`).
  - `cartCount` — number shown in cart badge.
- The header contains links to Home (`/`), Products (`/products`) and Help (`/help`).

Components & Key Props
- `ProductList` (`src/components/ProductList.tsx`)
  - Props: `products: Product[]`, `onAdd: (p: Product) => void`, `sort: string`, `setSort: (s: string) => void`.
  - Renders a grid of `ProductCard` components and a simple sort control.

- `ProductDetail` (`src/components/ProductDetail.tsx`)
  - Props: `onAdd: (p: Product, qty?: number) => void`.
  - Includes an interactive 5-star rating widget and comments list persisted to `localStorage` (demo-only).

- `Cart` (`src/components/Cart.tsx`)
  - Props: `items: CartItem[]`, `onUpdate(id, qty)`, `onBack()`, `onClear()`.

Local Persistence
- Cart state is saved to `localStorage` under the `cart` key.
- Product detail comments and ratings are stored locally per-product in `localStorage` (see `ProductDetail` logic).

Icons & Animations
- Icons use `lucide-react` (already imported in `Header.tsx` etc.).
- A lightweight animation polish exists via CSS transitions in `src/styles.css` (GSAP not required but may be added).

Tailwind migration notes (optional)
- The repository currently contains a handcrafted `src/styles.css` with utility fallbacks; Tailwind tooling is not yet installed.
- If you want to migrate to Tailwind fully, run:

```powershell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then add the Tailwind directives to your global CSS (or create `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Known issues & debugging tips
- If Vite shows a CSS error like `@import must precede all other statements (besides @charset or empty @layer)`, check `src/styles.css` for any `@import` lines not at the top. Move imports there or wrap external utility imports inside an `@layer` block.
- If you see esbuild transform errors pointing to `ProductList.tsx` (invalid `>` inside JSX), open `src/components/ProductList.tsx` and ensure:
  - There are no stray Markdown code fences (``` ), stray TypeScript lines inside returned JSX, or type blocks left inside JSX.
  - `type` or `interface` declarations and `import` statements are at the top-level (outside JSX).

Development tips
- Use the browser devtools to test localStorage values (under Application → Local Storage) while experimenting with ratings/comments.
- To add pages: put new page components in `src/pages/` and add a `<Route path="/your-path" element={<YourPage/>} />` in `src/App.tsx`.

Where to look next
- `src/components/` — contains main UI components.
- `src/pages/Help.tsx` — the Help page created; update content there.
- `src/styles.css` — global stylesheet (also contains small Tailwind-like fallbacks used while Tailwind is not installed).

If you want me to:
- add inline code comments across the main components (Header, ProductList, ProductDetail, Cart) I can batch them in a single pass (I recommend that),
- scaffold Tailwind (`tailwind.config.cjs` + postcss) and swap components to Tailwind utilities,
- or run the dev server here and share the build logs — tell me which next step to take.

License & Notes
- This is a small demo. No external backend or payment processing is implemented. Do not use the demo for production checkout flows.

---
Updated: November 15, 2025
we# E-Commerce Assignment (Minimal React Demo)

This is a small React + Vite demo implementing a product listing, product detail, and cart with localStorage persistence. It was converted to TypeScript and includes React Router for navigation.

How to run (Windows PowerShell):

```powershell
cd d:\e-commercs
npm install
npm run dev
```

Files added/converted:
- `src/` - React + TypeScript source files and components
- `src/data/products.ts` - mock product data (TypeScript)
- `package.json`, `vite.config.js`, `index.html` - project metadata and Vite entry

Next steps you might ask for:
- Wire to a real backend or add JSON API
- Add authentication or checkout integration
- Improve styling and accessibility

Deployment (GitHub Pages via Actions)

- A GitHub Actions workflow has been added at `.github/workflows/deploy.yml`. It runs on push to the `main` or `master` branch, builds the site with `npm run build`, and publishes the `dist/` output to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

- How to enable deployment:
  - Create a GitHub repository (e.g. `https://github.com/your-username/your-repo`).
  - Add the repo as a remote locally and push the code to `main`:

```powershell
cd D:\E-Commerce
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

  - The workflow will run automatically on push. It uses the repository's built-in `GITHUB_TOKEN` so you don't need to add any secrets.

- Verifying the build locally before pushing:

```powershell
npm ci
npm run build
# serve the built files (if you have `serve` installed)
npx serve dist
```

- Notes & troubleshooting:
  - If your repository uses a different default branch (for example `main` vs `master`), either push to one of the branches configured in the workflow, or update the workflow `on.push.branches` list to match.
  - If GitHub Pages doesn't show the site immediately, open the repository page → Settings → Pages and ensure the Pages source is set to the `gh-pages` branch. The `peaceiris/actions-gh-pages` action creates and updates the branch for you.

If you'd like, I can:
- prepare and commit the workflow file here (already done) and provide a small commit you can push, or
- if you provide the target GitHub repository URL and confirm, I can add a commit and push the workflow to that remote for you. Which do you prefer?
