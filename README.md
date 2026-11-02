# Shiivong Birla — The Data Architect

A buildless, dark-first data engineering portfolio. The interactive SVG hero follows a conceptual data flow from sources through ingestion and Bronze / Silver / Gold to analytics, with governance connecting the layers. The remaining sections preserve the complete professional record in editorial layouts, accessible disclosures, project cards, skill meters, and recommendations.

## Local preview

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://localhost:8000/>. If port 8000 is already occupied by this repository’s preview, reuse it. Save files and refresh to see changes. Stop a server you started with Ctrl+C.

There is no install or build step. The production entry point is `index.html`.

## Source

- `index.html`: all professional content, semantic section structure, SVG architecture, and native disclosures.
- `assets/css/portfolio.css`: colour, typography, components, motion, print and responsive layouts.
- `assets/js/portfolio.js`: native navigation, project filtering, image dialog, architecture interactions, scroll progress, and observers.
- `assets/images/project-*.jpg`: optimised thumbnails. Original images remain available in the image lightbox and in the repository.
- `docs/content-inventory.json`: the professional content inventory captured before the redesign. This is the comparison baseline, not a second runtime content source.
- `scripts/verify-content.py`: content, link, anchor, percentage, category and local asset preservation check.
- `docs/REDESIGN-REVIEW.md`: QA results, known limits, and content observations for review.

The old Bootstrap, jQuery, gallery, and animation assets are retained in the repository for reference, but the redesigned page does not load or depend on them. All content is static HTML; there is no API, backend, remote font request, or client-side routing requirement.

## Validation

```sh
python3 scripts/verify-content.py
node --check assets/js/portfolio.js
git diff --check
```

The inventory intentionally preserves original wording, including spelling and existing category assignments. When making an authorised factual change later, update the baseline deliberately after reviewing the change; do not regenerate it merely to make a failing preservation check pass.

## GitHub Pages deployment

The existing repository settings publish the root directory of **master**. They do not need to change, and no workflow YAML or static build output directory is needed.

1. Review and commit the redesign on `redesign/data-architect`.
2. Push that branch and open a pull request with base `master`.
3. Review the local preview and PR. Merge only when deployment is authorised.
4. GitHub’s existing Pages workflow publishes the merged root files. Check its run in the repository’s Actions tab.

A push to the redesign branch does not update the production site. The redesign has not been pushed, merged, or published during implementation.
