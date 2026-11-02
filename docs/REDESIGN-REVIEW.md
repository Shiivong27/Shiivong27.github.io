# Redesign review

## Implementation

The Data Architect identity uses midnight navy, cyan, restrained violet, native system typography, a faint architectural grid, and a conceptual SVG data architecture. The SVG’s routes follow meaningful data-platform stages; hover, focus or tap a node to inspect its description and connections. A pause control stops decorative data traffic. Traffic also stops offscreen and when the page is hidden. Operating-system reduced-motion preferences disable animations and smooth scrolling.

Every section has been redesigned. Roles use a connected timeline with the latest role expanded initially and the other complete descriptions in native disclosures. Projects use an editorial grid, category buttons, optimised images, always-visible GitHub titles, and an accessible native modal lightbox. Skills retain the original self-assessed percentages and are grouped by topic. Education uses paired academic panels. Full recommendations remain visible without carousel controls. Credentials use disclosures for their full descriptions and existing verification links. Contact uses the original email, location and social links.

All core content is rendered in static HTML. If JavaScript fails or is disabled, professional details and native disclosures remain usable; the mobile navigation is shown, all projects remain visible, and the decorative architecture remains legible. JavaScript-only filter, motion and image-zoom controls are hidden in the no-script fallback.

## Content-preservation checks

`python3 scripts/verify-content.py` passes against the captured baseline:

- 7 experience entries, with complete original responsibility and achievement wording.
- 11 projects, original repository links, original image lightbox paths, and exact category assignments.
- 12 skill names and original percentages.
- 2 educational qualifications and their original details.
- 6 recommendations and complete original text, names, titles and dates.
- 9 certifications/publications, descriptions, dates, codes and original verification links.
- Biography, personal details, capabilities, social/contact links and meaningful original images.
- No duplicate IDs, broken internal anchors or missing referenced local resources.

Legacy invalid paragraph/list nesting was repaired while preserving its words. Repeated literal bullet text remains as authored. The original images and legacy assets were not deleted.

## Browser QA

Tested in the available in-app browser:

- Layout widths of 1440, 1024, 768, 390 and 320 CSS pixels: document width matches viewport; no horizontal page overflow.
- Desktop hero and mobile page inspected visually.
- Mobile menu opens; section selection closes it and places focus on the destination.
- Enter activates project category buttons. Computer Vision yields the one original matching project; All restores all eleven.
- Image modal opens, focuses its close button, closes with Escape, and restores focus to the triggering button.
- Native role and credential disclosures expand with Enter and expose full descriptions and the DP-700 verification link.
- Architecture node activation updates explanatory text and highlights connected paths.
- Pause / resume changes the decorative traffic animation’s computed play state.
- No console errors or warnings observed during these checks.
- No broken loaded images observed. Lazy-loaded images are also checked through local file references by the content validator.
- JavaScript syntax and Git whitespace checks pass.

Reduced-motion CSS and media-query event handling were reviewed. An operating-system preference override, a screen-reader session, and JavaScript-disabled browser mode were not available in this QA session; do not interpret the implementation checks as those tests having been run. Lighthouse was not installed or run, so no numerical scores are claimed. External destinations were checked with HTTP HEAD, not by logging into third-party services.

## External links

22 existing HTTPS destinations checked: 20 returned HTTP 200. LinkedIn returned HTTP 405 (HEAD not accepted) and IEEE Xplore returned HTTP 202. These outcomes do not establish that a destination is broken; both original links remain unchanged. No credentials or secrets were used for link checks.

## Existing content observations — left unchanged

- The Credit Risk Modelling project has original categories `web` and `visual`, which do not match any of the original six category filters. It remains visible under All and retains those categories.
- Existing wording includes “Forecating” in a project title and “Imabalanced” in a publication title. They were preserved rather than silently corrected.
- At the owner’s request, the spelling in Adwait’s recommendation was corrected from “Shivong” to “Shiivong”; the preservation baseline was deliberately updated for this authorised correction.
- Some Microsoft credential links are labelled “Verify via Credly” in the original content. Those labels and URLs were preserved.
- Existing date of birth and email remain displayed as requested. No personal information was removed or amended.

## Review and deployment

Work is isolated on `redesign/data-architect`. Review at <http://localhost:8000/>. No production deployment, remote push, or PR merge was performed for this redesign. The existing GitHub Pages root-on-master deployment remains compatible with these static files.

## Follow-up refinements

- Governance connects to Sources, Ingestion, Bronze, Silver, Gold, Analytics, and Machine Learning through dashed violet oversight paths. Data-flow paths remain separate; both Silver and Gold feed the new ML node, and Gold feeds Analytics.
- Explicit text sizes were increased by 6 CSS pixels, including responsive rules. Layouts were adjusted for the larger type; narrow-screen headings can wrap rather than overflow.
- Education now follows About and precedes Work Experience. Navigation and section numbers follow the new order.
- Adwait’s recommendation uses the owner-authorised spelling “Shiivong”.

## Career update authorised by the owner

Added Senior Data Engineer at Brennan Australia, Melbourne (Aug’26–Present), with three polished points based on the owner’s supplied infrastructure, platform and CI/CD responsibilities. NTT Data now ends Aug’26, and the hero employer is Brennan Australia. The latest role is expanded initially; timeline indices and the preservation inventory were updated deliberately. The current product name, Declarative Automation Bundles (formerly Databricks Asset Bundles), was confirmed against Databricks documentation: https://docs.databricks.com/aws/en/dev-tools/bundles/faqs
