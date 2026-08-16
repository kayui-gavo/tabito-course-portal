# Informatics Room QA Notes

## Current production path (2026-08-16)

Public study entry points use the newer `study-*` stack:

- `resources/informatics-room/index.html`
- `resources/informatics-room/programming.html`
- `resources/informatics-room/lesson.html?id=...`
- `resources/informatics-room/questions.html`
- `resources/informatics-room/exam.html`
- `resources/informatics-room/glossary.html`

`lesson.html` now finishes with the v13 production layer:

- `study-practice-rubric-v13.js` — saved open-response draft + 3-point self-check.
- `study-production-v13.js` — figure recall writing, figure accessibility, canvas viewport handling and within-lesson navigation.
- `study-production-v13.css` — final figure/mobile/readability overrides.
- `study-overlap-fix-v13.css` — site-wide min-width/wrapping/grid rules to prevent text collisions.
- `study-layout-audit-v13.js` — lesson-specific post-render console-only layout audit.
- `study-page-audit-v13.js` — page-wide overflow/clipping/overlap audit on all public entry pages.
- `study-integrity-v6.js` — data/coverage/runtime integrity report (`INFORMATION_TEXTBOOK_AUDIT_V13`).

The base lesson renderer creates the v13 in-page navigation directly. Rich main lessons also pass through `study-main-nav-v13.js`, because the v1 electronic-textbook renderer rebuilds `body.innerHTML` instead of delegating to the base renderer. This keeps the same navigation behavior across both main and programming lessons. `study-production-failsafe-v13.js` remains as a defensive final pass while the older rendering stack is still being consolidated.

The superseded post-render wrappers and matching styles (`study-v11-question-bridge-v12.js`, `study-figure-writing-v12.js/.css`, `study-figure-accessibility-v12.js/.css`, `study-lesson-nav-v10.js/.css`) were removed after `lesson.html` switched to the consolidated v13 layer.

The old v11 Canvas figure renderers and stylesheet (`study-scientific-figures-v11.js`, `study-scientific-figures-v11b.js`, `study-scientific-figures-v11.css`) are also removed. Their ten high-value figures were redrawn into `study-scientific-figures-v13-legacy.js`, which registers through the same collision-safe `SCIENTIFIC_V12` core as the other figures. All 47 main PART figures therefore use one text-layout engine.

## Figure text / collision policy

Text overlap is a release-blocking defect.

`study-scientific-figures-v12-core.js` is responsible for preventing Canvas text collisions:

- text auto-fits to the logical Canvas width;
- explicit newlines are respected;
- box titles shrink within a controlled minimum size;
- box body text is constrained by the box height;
- table cells auto-fit and can use two lines;
- text that still cannot fit is ellipsized rather than painted across a neighboring object;
- every rendered figure records `shrunk`, `truncated`, `wrappedCell`, `outsideCanvas`, and `textOverlaps` events in `INFORMATION_CANVAS_TEXT_AUDIT_V13`.

A release fails if a figure reports truncation, outside-canvas text, internal text overlap, or text below the accepted minimum. Individual figures should then be redrawn with more space; do not simply lower the global minimum font size.

The 1200px logical Canvas is not squeezed into the old ~650px reading column. The v13 layout widens the desktop lesson surface and places only the Canvas itself in a horizontal viewport when necessary. Heading, caption, text alternative, recall question and answer-writing UI stay at normal document width.

On narrow screens, preserve figure legibility rather than shrinking the Canvas into the phone width. The Canvas remains around 1040px display width and is panned inside its own viewport; all surrounding explanatory text stays responsive and must not require page-wide horizontal scrolling.

## Automated browser QA

`.github/workflows/informatics-layout-qa.yml` runs Chromium-based layout QA using `.github/scripts/informatics-layout-qa.mjs`.

Current full matrix:

- desktop 1440×1000: all five public hub/tool pages + all 47 main PARTs + all 48 programming lessons;
- mobile 390×844: all five public hub/tool pages + all 47 main PARTs + all 48 programming lessons;
- total: 200 browser-rendered cases.

The browser QA rejects:

- page-wide horizontal overflow;
- JavaScript page errors;
- more or fewer than one scientific figure on a lesson;
- legacy v11 figure DOM;
- Canvas text truncation;
- Canvas text outside the drawing area;
- Canvas-internal text overlap;
- Canvas text below the minimum size;
- detected DOM text collisions/clipping;
- duplicate DOM ids;
- duplicate lesson navigators / old progress bars.

### First full green run

- Workflow run: `Informatics layout QA #23`
- Run ID: `31929679974`
- Production head tested: `09a0ef19c805b81783de5912587ee5678ab11eca`
- Chromium job conclusion: `success`
- Matrix: 200 / 200 cases passed
- Artifact `report.json`: `failures: []`, `screenshotsCaptured: 0`

This green run came after fixing the issues caught by earlier failed runs: b5-5 decimal-label collision, p43 FizzBuzz text collision, b9-3 range clipping, mobile glossary overflow, b1-2 graph-axis control clipping, b7-3 spreadsheet-reference control clipping, and missing main-lesson navigation caused by the body-rebuilding rich renderer.

Future production changes to `resources/informatics-room/**` must rerun the workflow. Do not describe a newer production head as green until its own run succeeds.

## Legacy stack

`resources/informatics-room/lessons/*.html` still loads the pre-study stack (`site.css`, `content.js`, `figures.js`, `code-exercises.js`, `code-runner.js`, `site.js`). Do not delete or redirect these pages until each old slug has been mapped to the correct current `lesson.html?id=...` destination and incoming links have been checked.

The legacy header/navigation also still uses the old labels. Treat this as migration debt, not part of the current production lesson runtime.

## Remaining manual / runtime QA

The green Chromium layout run establishes layout/text-overlap safety for the tested matrix. Still verify the behaviors that the layout pass cannot fully judge:

1. Pyodide first load, stdin, timeout, reset and mobile editor behavior;
2. open-response draft persistence and figure/practice review persistence;
3. exam mini-mock timer/resume/auto-submit;
4. Safari/iOS scrolling and dialog behavior;
5. visual judgment of arrow/label semantics, not only bounding-box correctness.

Keep these notes internal. Do not expose this file on the public教材 site.
