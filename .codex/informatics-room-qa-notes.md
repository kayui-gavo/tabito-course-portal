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
- `study-production-v13.js` — consolidates v11 question bridge, figure recall writing, figure accessibility, canvas viewport handling and within-lesson navigation.
- `study-production-v13.css` — final figure/mobile/readability overrides.
- `study-layout-audit-v13.js` — post-render console-only layout audit.
- `study-integrity-v6.js` — data/coverage/runtime integrity report (`INFORMATION_TEXTBOOK_AUDIT_V13`).

The superseded post-render wrappers and matching styles (`study-v11-question-bridge-v12.js`, `study-figure-writing-v12.js/.css`, `study-figure-accessibility-v12.js/.css`, `study-lesson-nav-v10.js/.css`) were removed after `lesson.html` switched to the consolidated v13 layer.

## Figure QA policy

The 1200px logical Canvas should not be squeezed into the old ~650px reading column. The v13 layout widens the desktop lesson surface and places only the Canvas itself in a horizontal viewport when necessary. Heading, caption, text alternative, recall question and answer-writing UI must stay at normal document width.

On narrow screens, preserve figure legibility rather than shrinking the Canvas into the phone width. The Canvas remains around 1040px display width and is panned inside its own viewport; all surrounding explanatory text stays responsive and does not require horizontal scrolling.

`study-layout-audit-v13.js` checks after browser layout:

- no page-wide horizontal overflow;
- every scientific figure has a Canvas viewport;
- caption / recall question / text summary exist;
- Canvas has image-role and description linkage;
- a scroll hint appears when the Canvas viewport really scrolls;
- duplicate DOM ids;
- undersized main interaction buttons;
- old duplicate reading-progress bar is hidden;
- exactly one v13 lesson navigator exists.

This audit is a detection mechanism only. Do not describe it as passing until it has actually run in a real browser on the deployed page.

## Legacy stack

`resources/informatics-room/lessons/*.html` still loads the pre-study stack (`site.css`, `content.js`, `figures.js`, `code-exercises.js`, `code-runner.js`, `site.js`). Do not delete or redirect these pages until each old slug has been mapped to the correct current `lesson.html?id=...` destination and incoming links have been checked.

The legacy header/navigation also still uses the old labels. Treat this as migration debt, not part of the current production lesson runtime.

## Browser / screenshot QA still required

When browser automation or real-device inspection is available, prioritize:

1. desktop widths around 1280/1440px: b3-4, b5-3, b8-3, b9-4;
2. mobile widths around 375/390px: a long main PART and a long programming lesson;
3. programming p17 (matrix), p24 (nested loop), p30 (sorting), p45 (directed graph), p46 (traffic), p47 (parity/JAN), p48 (sugoroku);
4. Pyodide first load, stdin, timeout, reset and mobile editor behavior;
5. open-response draft persistence and figure/practice review persistence;
6. exam mini-mock timer/resume/auto-submit.

Keep these notes internal. Do not expose this file on the public教材 site.
