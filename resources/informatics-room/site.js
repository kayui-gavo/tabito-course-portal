function headerHtml(prefix = '') {
  return `<header class="site-header"><div class="site-header-inner">
    <a class="site-title" href="${prefix}index.html">${SITE.title}</a>
    <p class="site-subtitle">${SITE.subtitle}</p>
    <nav class="global-nav">
      <a href="${prefix}index.html">トップ</a>
      <a href="${prefix}programming.html">アルゴリズム章</a>
      <a href="${prefix}glossary.html">用語一覧</a>
      <a href="${prefix}questions.html">確認問題</a>
      <a href="${prefix}../../index.html">Portal</a>
    </nav>
  </div></header>`;
}

function footerHtml() {
  return `<footer class="site-footer"><div class="site-header-inner">
    <p>文部科学省の情報Ⅰ範囲を参考にしつつ、本文と図解は学習用に独自作成しています。外部教材やサイトの文章・画像はコピーしません。</p>
  </div></footer>`;
}

function renderChrome(prefix = '') {
  document.body.insertAdjacentHTML('afterbegin', headerHtml(prefix));
  document.body.insertAdjacentHTML('beforeend', footerHtml());
}

function tagHtml(type) {
  const label = { basic: '基本', extra: '補足', practice: '演習' }[type] || '項目';
  return `<span class="tag tag-${type}">${label}</span>`;
}

function renderTopicList(topics) {
  return `<ul class="link-list">${topics.map(([type, title, href]) => {
    const body = href === '#' ? `<span class="muted-link">${title}</span>` : `<a href="${href}">${title}</a>`;
    return `<li>${tagHtml(type)} ${body}</li>`;
  }).join('')}</ul>`;
}

function renderTop() {
  renderChrome('');
  const programming = CHAPTERS.find(ch => ch.id === 'programming');
  const others = CHAPTERS.filter(ch => ch.id !== 'programming');
  document.querySelector('#app').innerHTML = `<main class="page">
    <section class="intro">
      <h1>情報Ⅰ 全体目次</h1>
      <p>このサイトは、情報Ⅰを暗記ではなく理解で進めるための学習ノートです。いまは「コンピュータとプログラミング」を重点的に整備しています。</p>
    </section>
    <section class="chapter-block focus" id="${programming.id}">
      <div class="chapter-head">
        <div>
          <h2>${programming.title}</h2>
          <p>${programming.lead}</p>
        </div>
        <a class="chapter-button" href="programming.html">章だけを見る</a>
      </div>
      ${renderTopicList(programming.topics)}
    </section>
    <section class="directory compact">
      ${others.map(ch => `<article class="chapter-block" id="${ch.id}">
        <h2>${ch.title}</h2>
        <p>${ch.lead}</p>
        ${renderTopicList(ch.topics)}
      </article>`).join('')}
    </section>
  </main>`;
}

function renderProgramming() {
  renderChrome('');
  const programming = CHAPTERS.find(ch => ch.id === 'programming');
  document.querySelector('#app').innerHTML = `<main class="page">
    <p class="breadcrumb"><a href="index.html">トップ</a> / ${programming.title}</p>
    <h1>${programming.title}</h1>
    <p class="lead">${programming.lead}</p>
    <section class="chapter-block focus">${renderTopicList(programming.topics)}</section>
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
    <span><a href="../index.html">□ トップ</a></span>
    <span>${next ? `<a href="${nextId}.html">次：${next.title} →</a>` : '次：なし →'}</span>
  </nav>`;
}

function renderLesson(id) {
  renderChrome('../');
  const lesson = LESSONS[id];
  const root = document.querySelector('#app');
  if (!lesson) {
    root.innerHTML = '<main class="page"><h1>ページが見つかりません</h1><p><a href="../index.html">トップへ戻る</a></p></main>';
    return;
  }
  root.innerHTML = `<main class="page lesson-page">
    <p class="breadcrumb"><a href="../index.html">トップ</a> / <a href="../programming.html">コンピュータとプログラミング</a> / ${lesson.title}</p>
    ${navForLesson(id)}
    <h1>${lesson.title}</h1>
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
      ${lesson.code ? `<h3>疑似コード</h3><pre>${lesson.code}</pre>` : ''}
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
    <div class="footer-nav">${navForLesson(id)}<p><a href="#top">↑ ページ上部へ</a></p></div>
  </main>`;
  initDemo(lesson.id);
}

function renderDemo(id) {
  if (id === 'branch') {
    return `<section class="demo-box"><h2>小さな demo</h2><div class="demo-row"><label>点数 <input id="scoreInput" type="range" min="0" max="100" value="75"></label><strong id="scoreOut"></strong></div></section>`;
  }
  if (id === 'loop' || id === 'counter-sum') {
    return `<section class="demo-box"><h2>小さな demo</h2><div class="demo-row"><label>n <input id="loopInput" type="range" min="1" max="20" value="10"></label><strong id="loopOut"></strong></div><div class="table-scroll"><table><thead><tr><th>i</th><th>合計</th></tr></thead><tbody id="loopTable"></tbody></table></div></section>`;
  }
  if (id === 'linear-search') {
    return `<section class="demo-box"><h2>小さな demo</h2><p>データ：[4, 7, 2, 9, 5]、目標：9</p><button id="searchBtn">一つずつ調べる</button><div id="searchOut"></div></section>`;
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
    <p class="lead">このページは丸暗記用ではなく、学習した内容を整理するためのページです。</p>
    <div class="table-scroll"><table class="glossary-table"><thead><tr><th>用語</th><th>説明</th><th>関連</th></tr></thead><tbody>
    ${GLOSSARY.sort((a,b)=>a[0].localeCompare(b[0], 'ja')).map(([term, desc, href]) => `<tr><td>${term}</td><td>${desc}</td><td><a href="${href}">読む</a></td></tr>`).join('')}
    </tbody></table></div></main>`;
}

function renderQuestions() {
  renderChrome('');
  document.querySelector('#app').innerHTML = `<main class="page"><h1>確認問題</h1>
    <p class="lead">アルゴリズムとプログラミングの基礎を、短い問題で確認します。答えは折りたたみで確認できます。</p>
    ${QUESTIONS.map(([topic, q, a, href], i) => `<section class="question-box"><h2>問${i + 1}：${topic}</h2><p>${q}</p><details><summary>解答を見る</summary><p>${a}</p><p><a href="${href}">関連ページへ</a></p></details></section>`).join('')}
  </main>`;
}
