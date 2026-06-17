<div align="center">

# legacy-doc

**A zero-dependency documentation template built with vanilla JS and Web Components.**

No server. No build step. Double-click `index.html` and it runs.

<br>

![Version](https://img.shields.io/badge/VERSION-1.5.0-2d333b?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-MIT-22c55e?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-%E2%9C%93-e34f26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%E2%9C%93-1572b6?style=for-the-badge&logo=css3&logoColor=white)
![Dependencies](https://img.shields.io/badge/DEPENDENCIES-ZERO-00b894?style=for-the-badge)
![By](https://img.shields.io/badge/BY-MOON--CHAIN-58a6ff?style=for-the-badge)

</div>

---

## Features

- **Zero dependencies** — no npm, no bundler, no framework
- **Web Components** — every UI piece is a `<c-*>` custom element
- **Light / dark theme** — CSS variables via `tokens.css`, toggled with a single attribute
- **Syntax highlighting** — Prism.js with JSON, CSS, and embedded JS/CSS support
- **Blueprint canvas** — draggable node graph with port-to-port bezier connections, pan, zoom, and fullscreen
- **Scroll-spy sidebar** — auto-detects `h2` headings and highlights the active section while scrolling
- **Works from `file://`** — no dev server required

---

## Components

| Component | Description |
|---|---|
| `<c-navbar>` | Top bar — logo, brand, theme toggle, GitHub link, mobile hamburger |
| `<c-sidebar>` | Collapsible navigation sidebar with scroll-spy sub-sections |
| `<c-breadcrumb>` | Hierarchical path breadcrumb |
| `<c-theme-toggle>` | Light / dark theme switch with `localStorage` persistence |
| `<c-callout>` | Highlighted callout box — 7 color variants |
| `<c-code-block>` | Syntax-highlighted code block with one-click copy |
| `<c-card>` | Slotted card with header / body / footer regions |
| `<c-badge>` | Compact HTTP method and status label badges |
| `<c-alert>` | Dismissible notification box |
| `<c-tabs>` / `<c-tab>` | Tabbed content panel |
| `<c-accordion>` / `<c-accordion-item>` | Collapsible accordion |
| `<c-toc>` | Auto-generated table of contents with scroll-spy |
| `<c-pagination-nav>` | Previous / next page navigation links |
| `<c-search-box>` | Client-side live-filter search box |
| `<c-blueprint>` | Draggable node diagram with port-to-port bezier connections |

---

## Structure

```
legacy-doc/
├── index.html                    # Component gallery
├── pages/                        # One demo page per component
├── components/                   # <c-*> Web Components (.js + .css pairs)
└── assets/
    ├── css/
    │   ├── tokens.css            # CSS variables — color, spacing, radius, theme
    │   └── base.css              # Reset, typography, page layout
    ├── js/
    │   └── project.js            # Project metadata (name, version, github URL)
    └── vendor/
        └── js/prism.min.js       # Bundled Prism for syntax highlighting
```

---

## Quick Start

Add a component to any page:

```html
<!-- <head> -->
<link rel="stylesheet" href="../components/c-alert/c-alert.css">

<!-- before </body> -->
<script src="../assets/js/project.js"></script>
<script src="../components/c-alert/c-alert.js"></script>

<!-- markup -->
<c-alert variant="success" dismissible>Saved successfully.</c-alert>
```

Drop the `<link>` and `<script>` for any component you don't need — nothing else is affected.

---

## Adding a Component

1. Create `components/c-name/` with `c-name.css` and `c-name.js`.

2. Define the element in `c-name.js`:

   ```js
   class CName extends HTMLElement {
       connectedCallback() { /* render here */ }
   }
   customElements.define('c-name', CName);
   ```

3. Use variables from `tokens.css` for all colors and sizes — no hardcoded values.

4. Create a demo page at `pages/name.html` (copy any existing page as a template).

5. Register the page in `components/c-sidebar/c-sidebar.js` under `NAV_GROUPS`:

   ```js
   { id: 'name', label: 'Name', file: 'name.html' }
   ```

---

## Project Config

All project-level metadata lives in `assets/js/project.js`:

```js
window.PROJECT = {
    name:    'legacy-doc',
    version: '1.5.0',
    brand:   'Component Galerisi',
    github:  'https://github.com/Moon-Chain/legacy-doc',
};
```

`<c-navbar>` and `<c-sidebar>` read from this object automatically — no attribute changes needed across pages when the version or URL changes.

---

## License

MIT — © 2025 Moon-Chain
