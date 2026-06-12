import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const room = join(root, 'resources', 'informatics-room');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

for (const file of ['content.js', 'figures.js', 'site.js']) {
  new vm.Script(readFileSync(join(room, file), 'utf8'), { filename: file });
}

const htmlFiles = walk(room).filter((path) => path.endsWith('.html'));
const missing = [];
const refs = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1].split('#')[0];
    if (!href || /^(https?:|mailto:)/.test(href)) continue;
    refs.push([file, href]);
  }
}

const content = readFileSync(join(room, 'content.js'), 'utf8');
for (const match of content.matchAll(/['"]([^'"]+\.html)['"]/g)) {
  refs.push([join(room, 'content.js'), match[1]]);
}

for (const [from, href] of refs) {
  const target = resolve(dirname(from), href);
  try {
    statSync(target);
  } catch {
    missing.push(`${from} -> ${href}`);
  }
}

if (missing.length) {
  console.error('Missing internal links:');
  for (const item of missing) console.error(item);
  process.exit(1);
}

console.log(`validated ${htmlFiles.length} HTML files and ${refs.length} internal references`);
