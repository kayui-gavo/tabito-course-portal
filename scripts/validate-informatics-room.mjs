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

for (const file of ['content.js', 'figures.js', 'code-exercises.js', 'code-runner.js', 'python-worker.js', 'site.js']) {
  new vm.Script(readFileSync(join(room, file), 'utf8'), { filename: file });
}

const htmlFiles = walk(room).filter((path) => path.endsWith('.html'));
const publicFiles = walk(room).filter((path) => /\.(html|js|css)$/.test(path));
const missing = [];
const refs = [];

const bannedPatterns = [
  /Codex/i,
  /\bprompt\b/i,
  /TODO/,
  /実装メモ/,
  /開発(?!者ツール)/,
  /用户|客户|需求|要件|本 prompt|开发|中文说明/
];

const leaked = [];
for (const file of publicFiles) {
  const text = readFileSync(file, 'utf8');
  for (const pattern of bannedPatterns) {
    if (pattern.test(text)) leaked.push(`${file} -> ${pattern}`);
  }
}
if (leaked.length) {
  console.error('User-facing source contains internal wording:');
  for (const item of leaked) console.error(item);
  process.exit(1);
}

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

const contentSource = readFileSync(join(room, 'content.js'), 'utf8');
const contentContext = {};
vm.runInNewContext(`${contentSource}\nglobalThis.__LESSONS = LESSONS;`, contentContext, { filename: 'content.js' });
const lessonIds = readdirSync(join(room, 'lessons'))
  .filter((name) => name.endsWith('.html'))
  .map((name) => name.replace(/\.html$/, ''));
const lessonProblems = [];
for (const id of lessonIds) {
  const lesson = contentContext.__LESSONS[id];
  if (!lesson) {
    lessonProblems.push(`${id}: missing lesson data`);
    continue;
  }
  if (!lesson.workedExamples || !lesson.workedExamples.length) lessonProblems.push(`${id}: missing worked examples`);
  if (!lesson.practiceProblems || !lesson.practiceProblems.length) lessonProblems.push(`${id}: missing practice problems`);
  if (!lesson.examQuestions || !lesson.examQuestions.length) lessonProblems.push(`${id}: missing exam-style questions`);
  if (!lesson.misconception) lessonProblems.push(`${id}: missing misconception`);
  if (!lesson.question || !lesson.answer) lessonProblems.push(`${id}: missing confirmation question`);
}
const traceRequired = ['branch', 'loop', 'array', 'counter-sum', 'max-min', 'linear-search', 'binary-search', 'selection-sort', 'bubble-sort'];
for (const id of traceRequired) {
  if (!contentContext.__LESSONS[id]?.traceTables?.length) lessonProblems.push(`${id}: missing trace table`);
}
if (lessonProblems.length) {
  console.error('Lesson content checks failed:');
  for (const item of lessonProblems) console.error(item);
  process.exit(1);
}

console.log(`validated ${htmlFiles.length} HTML files and ${refs.length} internal references`);
