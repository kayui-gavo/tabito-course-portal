import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'http://127.0.0.1:4173/resources/informatics-room';
const OUT = path.resolve('artifacts/informatics-visual');
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  'b3-4','b5-3','b5-5','b6-8','b7-3','b8-2','b8-3','b8-5','b8-7','b9-2','b9-3','b9-4',
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
      await page.waitForTimeout(150);
      const metrics = await page.evaluate(() => {
        const fig = document.querySelector('.scientific-figure-v12');
        const canvas = fig?.querySelector('canvas');
        const qa = canvas?.__figureTextQa || null;
        return {
          figureCount: document.querySelectorAll('.scientific-figure-v12').length,
          globalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          figureId: fig?.dataset.figureV12 || fig?.dataset.programFigureV12 || fig?.dataset.programFigureV12b || fig?.dataset.programFigureV12c || fig?.dataset.programFigureV12d || fig?.dataset.programFigureV12e || fig?.dataset.programFigureV12f || fig?.dataset.programFigureV12g || null,
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
      await figure.scrollIntoViewIfNeeded();
      const screenshot = `${vp.name}-${id}-figure.png`;
      await figure.screenshot({ path: path.join(OUT, screenshot), animations: 'disabled' });
      record.screenshot = screenshot;
      const failed = pageErrors.length || metrics.figureCount !== 1 || metrics.globalOverflow > 4 || !metrics.canvasQa || metrics.canvasQa.truncated || metrics.canvasQa.outsideCanvas || metrics.canvasQa.textOverlaps || metrics.canvasQa.shrunkBelowNine;
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
console.log(JSON.stringify({ cases: report.cases.length, failures: report.failures.length, screenshots: report.cases.filter(x => x.screenshot).length }, null, 2));
if (report.failures.length) process.exit(1);
