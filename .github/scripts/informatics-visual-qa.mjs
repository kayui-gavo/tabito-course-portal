import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'http://127.0.0.1:4173/resources/informatics-room';
const OUT = path.resolve('artifacts/informatics-visual');
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  'b3-4','b3-5','b3-6','b3-7','b3-8','b4-1','b4-2','b4-3','b4-4','b5-1','b5-2','b5-3','b5-4','b5-5','b6-8','b7-3','b8-2','b8-3','b8-5','b8-7','b9-2','b9-3','b9-4',
  'p43','p45','p46','p48'
];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
];

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
const report = { generatedAt: new Date().toISOString(), targets, cases: [], failures: [] };

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  for (const id of targets) {
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', e => pageErrors.push(String(e?.stack || e)));
    const url = `${ROOT}/lesson.html?id=${encodeURIComponent(id)}`;
    const record = { viewport: vp.name, id, url, pageErrors: [] };
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForSelector('.scientific-figure-v12 canvas', { timeout: 10000 });
      await page.waitForTimeout(180);
      const metrics = await page.evaluate(() => {
        const fig = document.querySelector('.scientific-figure-v12');
        const viewport = fig?.querySelector('.figure-canvas-viewport-v13');
        const canvas = fig?.querySelector('canvas');
        const paper = document.querySelector('.lesson-paper');
        const layout = document.querySelector('.lesson-layout');
        const qa = canvas?.__figureTextQa || null;
        const parentChain = [];
        let node = fig?.parentElement || null;
        while (node && parentChain.length < 5) {
          parentChain.push({ tag: node.tagName, className: node.className || '', width: Math.round(node.getBoundingClientRect().width) });
          node = node.parentElement;
        }
        return {
          figureCount: document.querySelectorAll('.scientific-figure-v12').length,
          globalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          figureId: fig?.dataset.figureV12 || fig?.dataset.programFigureV12 || fig?.dataset.programFigureV12b || fig?.dataset.programFigureV12c || fig?.dataset.programFigureV12d || fig?.dataset.programFigureV12e || fig?.dataset.programFigureV12f || fig?.dataset.programFigureV12g || null,
          geometry: {
            figureWidth: fig ? Math.round(fig.getBoundingClientRect().width) : 0,
            viewportWidth: viewport ? Math.round(viewport.getBoundingClientRect().width) : 0,
            viewportScrollWidth: viewport?.scrollWidth || 0,
            canvasWidth: canvas ? Math.round(canvas.getBoundingClientRect().width) : 0,
            paperWidth: paper ? Math.round(paper.getBoundingClientRect().width) : 0,
            layoutWidth: layout ? Math.round(layout.getBoundingClientRect().width) : 0,
            parentChain
          },
          canvasQa: qa ? {
            truncated: qa.truncated?.length || 0,
            outsideCanvas: qa.outsideCanvas?.length || 0,
            textOverlaps: qa.textOverlaps?.length || 0,
            shrunkBelowNine: (qa.shrunk || []).filter(x => Number(x.to) < 9).length
          } : null,
          title: document.querySelector('h1')?.textContent?.trim() || ''
        };
      });
      Object.assign(record, metrics);
      record.pageErrors = pageErrors;
      const figure = page.locator('.scientific-figure-v12').first();
      const canvas = figure.locator('canvas').first();
      await figure.scrollIntoViewIfNeeded();
      const figureShot = `${vp.name}-${id}-figure.png`;
      const canvasShot = `${vp.name}-${id}-canvas.png`;
      await figure.screenshot({ path: path.join(OUT, figureShot), animations: 'disabled' });
      await canvas.screenshot({ path: path.join(OUT, canvasShot), animations: 'disabled' });
      record.screenshot = figureShot;
      record.canvasScreenshot = canvasShot;
      const desktopCanvasVisibility = metrics.geometry.canvasWidth > 0 ? metrics.geometry.viewportWidth / metrics.geometry.canvasWidth : 0;
      const tooNarrowOnDesktop = vp.name === 'desktop' && (metrics.geometry.figureWidth < 980 || desktopCanvasVisibility < 0.9);
      const failed = pageErrors.length || metrics.figureCount !== 1 || metrics.globalOverflow > 4 || !metrics.canvasQa || metrics.canvasQa.truncated || metrics.canvasQa.outsideCanvas || metrics.canvasQa.textOverlaps || metrics.canvasQa.shrunkBelowNine || tooNarrowOnDesktop;
      if (failed) report.failures.push(record);
    } catch (error) {
      record.error = String(error?.stack || error);
      record.pageErrors = pageErrors;
      report.failures.push(record);
    }
    report.cases.push(record);
    await page.close();
  }
  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ cases: report.cases.length, failures: report.failures.length, screenshots: report.cases.filter(x => x.screenshot).length, canvasScreenshots: report.cases.filter(x => x.canvasScreenshot).length }, null, 2));
if (report.failures.length) process.exit(1);
