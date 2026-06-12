function assetPath(prefix, path) {
  return `${prefix}../../${path}`;
}

function headerHtml(prefix = '') {
  return `<header class="site-header"><div class="site-header-inner">
    <div class="brand-row">
      <a class="brand-mark" href="${prefix}index.html" aria-label="トップへ">
        <img src="${assetPath(prefix, 'assets/images/tabito-logo.jpg')}" alt="旅人教育" />
      </a>
      <div>
        <a class="site-title" href="${prefix}index.html">${SITE.title}</a>
        <p class="site-subtitle">${SITE.subtitle}</p>
      </div>
    </div>
    <nav class="global-nav">
      <a href="${prefix}index.html">目次</a>
      <a href="${prefix}programming.html">アルゴリズム</a>
      <a href="${prefix}glossary.html">用語一覧</a>
      <a href="${prefix}questions.html">確認問題</a>
      <a href="${prefix}../../index.html">コースポータル</a>
    </nav>
  </div></header>`;
}

function footerHtml(prefix = '') {
  return `<footer class="site-footer"><div class="site-header-inner footer-inner">
    <div class="footer-brand">
      <img src="${assetPath(prefix, 'assets/images/tabito-logo.jpg')}" alt="旅人教育" />
      <span>情報Ⅰ 学習教材</span>
    </div>
    <p>本文と図解は、学習しやすいように独自に整理した教材です。授業の予習・復習や、基礎事項の確認に使えます。</p>
  </div></footer>`;
}

function renderChrome(prefix = '') {
  document.body.insertAdjacentHTML('afterbegin', headerHtml(prefix));
  document.body.insertAdjacentHTML('beforeend', footerHtml(prefix));
}

function statusBadge(status) {
  const label = STATUS_LABELS[status] || STATUS_LABELS.planned;
  return `<span class="status-badge status-${status || 'planned'}">${label}</span>`;
}

function lessonById(id) {
  return LESSONS[id];
}

function findChapterForLesson(id) {
  return CHAPTERS.find(chapter =>
    chapter.sections.some(section => section.lessons.some(lesson => lesson.id === id))
  );
}

function renderLessonLink(lesson, basePrefix = '') {
  const href = lesson.href === '#' ? '#' : `${basePrefix}${lesson.href}`;
  const linked = lesson.href === '#'
    ? `<span class="muted-link">${lesson.title}</span>`
    : `<a href="${href}">${lesson.title}</a>`;
  return `<li class="lesson-link">
    <div>${linked}</div>
    ${statusBadge(lesson.status)}
  </li>`;
}

function renderChapterDirectory(chapter, basePrefix = '') {
  return `<article class="chapter-block" id="${chapter.id}">
    <div class="chapter-topline">
      <div class="chapter-kicker">第${chapter.order}章</div>
      ${chapter.id === 'programming' ? '<span class="status-badge status-enhanced">重点：アルゴリズム</span>' : ''}
    </div>
    <h2>${chapter.title.replace(/^第\d章　/, '')}</h2>
    <p class="chapter-lead">${chapter.lead}</p>
    <div class="section-list">
      ${chapter.sections.map(section => `<section class="section-card">
        <h3>${section.title}</h3>
        <ul class="link-list">${section.lessons.map(lesson => renderLessonLink(lesson, basePrefix)).join('')}</ul>
      </section>`).join('')}
    </div>
  </article>`;
}

function renderFeaturedLinks(basePrefix = '') {
  return `<ul class="featured-list">
    ${FEATURED_LESSONS.map(id => {
      const lesson = lessonById(id);
      return `<li><a href="${basePrefix}lessons/${id}.html">${lesson.title}</a>${statusBadge(lesson.status || 'enhanced')}</li>`;
    }).join('')}
  </ul>`;
}

function renderTop() {
  renderChrome('');
  document.querySelector('#app').innerHTML = `<main class="page">
    <section class="intro brand-intro compact-intro">
      <div>
        <p class="eyebrow">旅人教育 情報Ⅰノート</p>
        <h1>${SITE.title}</h1>
        <p>${SITE.description}</p>
      </div>
    </section>

    <section class="guide-box">
      <h2>学習の進め方</h2>
      <p>公式教材の章立てに沿って全体像を見ながら、第3章では変数、条件分岐、繰り返し、配列、探索、整列を詳しく確認できます。</p>
    </section>

    <section>
      <h2>目次</h2>
      <div class="directory">
        ${CHAPTERS.map(chapter => renderChapterDirectory(chapter)).join('')}
      </div>
    </section>
  </main>`;
}

function renderProgramming() {
  renderChrome('');
  const programming = CHAPTERS.find(ch => ch.id === 'programming');
  document.querySelector('#app').innerHTML = `<main class="page">
    <p class="breadcrumb"><a href="index.html">目次</a> / ${programming.title}</p>
    <section class="intro compact-intro">
      <p class="eyebrow">重点項目</p>
      <h1>${programming.title}</h1>
      <p>${programming.lead}</p>
    </section>
    <section class="quick-links">
      <h2>すぐ確認したい項目</h2>
      ${renderFeaturedLinks('')}
    </section>
    ${renderChapterDirectory(programming)}
  </main>`;
}

function navForLesson(id) {
  const index = LESSON_ORDER.indexOf(id);
  const prevId = LESSON_ORDER[index - 1];
  const nextId = LESSON_ORDER[index + 1];
  const prev = LESSONS[prevId];
  const next = LESSONS[nextId];
  return `<nav class="lesson-nav" aria-label="ページ移動">
    <span>${prev ? `<a href="${prevId}.html">← 前：${prev.title}</a>` : '← 前：なし'}</span>
    <span><a href="../index.html">目次へ</a></span>
    <span>${next ? `<a href="${nextId}.html">次：${next.title} →</a>` : '次：なし →'}</span>
  </nav>`;
}

function renderLesson(id) {
  renderChrome('../');
  const lesson = LESSONS[id];
  const root = document.querySelector('#app');
  if (!lesson) {
    root.innerHTML = '<main class="page"><h1>ページが見つかりません</h1><p><a href="../index.html">目次へ戻る</a></p></main>';
    return;
  }
  const chapter = findChapterForLesson(id);
  const chapterTitle = chapter ? chapter.title : lesson.chapter;
  root.innerHTML = `<main class="page lesson-page">
    <p class="breadcrumb"><a href="../index.html">目次</a> / ${chapterTitle} / ${lesson.title}</p>
    ${navForLesson(id)}
    <article class="lesson-article">
      <div class="lesson-head">
        <p class="eyebrow">旅人教育 情報Ⅰノート</p>
        <h1>${lesson.title}</h1>
        ${statusBadge(lesson.status || 'draft')}
      </div>
      <p class="lesson-one-line">${lesson.oneLine}</p>

      <section>
        <h2>まず一言でいうと</h2>
        <p>${lesson.oneLine}</p>
      </section>

      <section>
        <h2>たとえば</h2>
        <div class="example">${lesson.example}</div>
      </section>

      <section>
        <h2>図で見る</h2>
        ${FIGURES[lesson.figure] ? FIGURES[lesson.figure]() : ''}
      </section>

      <section>
        <h2>情報Ⅰではこう考える</h2>
        ${lesson.explanation.split('。').filter(Boolean).map(s => `<p>${s}。</p>`).join('')}
        ${lesson.code ? `<h3>疑似コード</h3><pre class="code-block">${lesson.code}</pre>` : ''}
        ${lesson.python ? `<h3>Pythonで書くと</h3><pre class="code-block python-code">${lesson.python}</pre>` : ''}
      </section>

      <section>
        <h2>よくある誤解</h2>
        <div class="mistake">${lesson.misconception}</div>
      </section>

      ${renderDemo(lesson.id)}

      <section class="question-box">
        <h2>確認問題</h2>
        <p>${lesson.question}</p>
        <details><summary>解答を見る</summary><p>${lesson.answer}</p></details>
      </section>

      <section class="term-area">
        <h2>関連用語</h2>
        <p><a href="../glossary.html">用語一覧で、このページに関係する言葉を確認する</a></p>
      </section>
    </article>
    <div class="footer-nav">${navForLesson(id)}<p><a href="#top">↑ ページ上部へ</a></p></div>
  </main>`;
  initDemo(lesson.id);
}

function renderDemo(id) {
  if (id === 'branch') {
    return `<section class="demo-box"><h2>ためしてみる</h2><div class="demo-row"><label>点数 <input id="scoreInput" type="range" min="0" max="100" value="75"></label><strong id="scoreOut"></strong></div></section>`;
  }
  if (id === 'loop' || id === 'counter-sum') {
    return `<section class="demo-box"><h2>ためしてみる</h2><div class="demo-row"><label>n <input id="loopInput" type="range" min="1" max="20" value="10"></label><strong id="loopOut"></strong></div><div class="table-scroll"><table><thead><tr><th>i</th><th>合計</th></tr></thead><tbody id="loopTable"></tbody></table></div></section>`;
  }
  if (id === 'linear-search') {
    return `<section class="demo-box"><h2>ためしてみる</h2><p>データ：[4, 7, 2, 9, 5]、目標：9</p><button id="searchBtn">一つずつ調べる</button><div id="searchOut"></div></section>`;
  }
  return '';
}

function initDemo(id) {
  if (id === 'branch') {
    const input = document.querySelector('#scoreInput');
    const out = document.querySelector('#scoreOut');
    const update = () => {
      const score = Number(input.value);
      out.textContent = `${score}点 → ${score >= 80 ? '合格' : '再挑戦'}`;
    };
    input.addEventListener('input', update);
    update();
  }
  if (id === 'loop' || id === 'counter-sum') {
    const input = document.querySelector('#loopInput');
    const out = document.querySelector('#loopOut');
    const table = document.querySelector('#loopTable');
    const update = () => {
      const n = Number(input.value);
      let total = 0;
      const rows = [];
      for (let i = 1; i <= n; i += 1) {
        total += i;
        rows.push(`<tr><td>${i}</td><td>${total}</td></tr>`);
      }
      out.textContent = `合計 ${total}`;
      table.innerHTML = rows.join('');
    };
    input.addEventListener('input', update);
    update();
  }
  if (id === 'linear-search') {
    document.querySelector('#searchBtn').addEventListener('click', () => {
      document.querySelector('#searchOut').innerHTML = [4, 7, 2, 9].map((v, i) => `<p class="note">${i + 1}回目：${v} を確認 ${v === 9 ? '→ 見つかった' : '→ まだ違う'}</p>`).join('');
    });
  }
}

function renderGlossary() {
  renderChrome('');
  document.querySelector('#app').innerHTML = `<main class="page"><h1>情報Ⅰ 用語一覧</h1>
    <p class="lead">現在はアルゴリズムとプログラミングの用語を中心に整理しています。章全体の学習に合わせて、用語を順次追加します。</p>
    <div class="table-scroll"><table class="glossary-table"><thead><tr><th>用語</th><th>説明</th><th>関連</th></tr></thead><tbody>
    ${GLOSSARY.slice().sort((a,b)=>a[0].localeCompare(b[0], 'ja')).map(([term, desc, href]) => `<tr><td>${term}</td><td>${desc}</td><td><a href="${href}">読む</a></td></tr>`).join('')}
    </tbody></table></div></main>`;
}

function renderQuestions() {
  renderChrome('');
  document.querySelector('#app').innerHTML = `<main class="page"><h1>確認問題</h1>
    <p class="lead">アルゴリズムとプログラミングの基礎を、短い問題で確認します。答えは折りたたみで確認できます。</p>
    ${QUESTIONS.map(([topic, q, a, href], i) => `<section class="question-box"><h2>問${i + 1}：${topic}</h2><p>${q}</p><details><summary>解答を見る</summary><p>${a}</p><p><a href="${href}">関連ページへ</a></p></details></section>`).join('')}
  </main>`;
}
