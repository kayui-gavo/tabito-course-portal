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
      <a href="${prefix}index.html">学習目次</a>
      <a href="${prefix}exam.html">共通テスト対策</a>
      <a href="${prefix}programming.html">プログラミング</a>
      <a href="${prefix}index.html#network">データ活用</a>
      <a href="${prefix}index.html#study-routes">学習の進め方</a>
      <a class="portal-link" href="${prefix}../../index.html">コースポータル</a>
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
  const fullLesson = lessonById(lesson.id) || {};
  const tags = fullLesson.tags && fullLesson.tags.length
    ? `<div class="lesson-tags">${fullLesson.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`
    : '';
  return `<li class="lesson-link">
    <div>${linked}${tags}</div>
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
      <p>情報Ⅰの全体像を見ながら、第3章では変数、条件分岐、繰り返し、配列、探索、整列を詳しく確認できます。はじめて学ぶ人も、例と表を追いながら一つずつ進められます。</p>
    </section>

    ${renderStudyRoutes('')}

    <section class="quick-links">
      <h2>学習を助けるページ</h2>
      <div class="route-grid resource-grid">
        <a class="route-card" href="exam.html"><strong>共通テスト対策</strong><span>総合問題、プログラム読解、データ分析の練習へ進む</span></a>
        <a class="route-card" href="glossary.html"><strong>用語を確認する</strong><span>短い説明と関連ページをまとめて確認する</span></a>
      </div>
    </section>

    <section>
      <h2>目次</h2>
      <div class="directory">
        ${CHAPTERS.map(chapter => renderChapterDirectory(chapter)).join('')}
      </div>
    </section>
  </main>`;
}

function lessonLink(id, basePrefix = '') {
  const lesson = lessonById(id);
  return lesson ? `<a href="${basePrefix}lessons/${id}.html">${lesson.title}</a>` : '';
}

function routeList(ids, basePrefix = '') {
  return `<ol>${ids.map(id => `<li>${lessonLink(id, basePrefix)}</li>`).join('')}</ol>`;
}

function renderStudyRoutes(basePrefix = '') {
  const routes = [
    ['はじめて学ぶ人', ['information', 'problem-solving-flow', 'bit-byte', 'binary', 'text-digital', 'computer-structure', 'algorithm']],
    ['プログラミングを重点的に学ぶ', ['input-process-output', 'variable', 'branch', 'loop', 'array', 'function', 'linear-search', 'binary-search']],
    ['データ活用を重点的に学ぶ', ['statistics', 'visualization', 'data-format', 'qualitative-data', 'database']],
    ['共通テスト前に確認する', ['intellectual-property', 'security', 'protocol', 'encryption-signature', 'simulation', 'scatter-correlation', 'outlier-representative']]
  ];
  return `<section class="study-routes" id="study-routes">
    <h2>学習の進め方</h2>
    <div class="route-grid">
      ${routes.map(([title, ids]) => `<article class="route-card"><h3>${title}</h3>${routeList(ids, basePrefix)}</article>`).join('')}
    </div>
  </section>`;
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

function examLessonLinks(ids, basePrefix = '') {
  return `<ul class="featured-list">
    ${ids.map(id => {
      const lesson = lessonById(id);
      return lesson ? `<li><a href="${basePrefix}lessons/${id}.html">${lesson.title}</a>${statusBadge(lesson.status || 'enhanced')}</li>` : '';
    }).join('')}
  </ul>`;
}

function renderExamHub() {
  renderChrome('');
  const integrated = [
    ['模擬店の待ち時間シミュレーション', 'lessons/simulation.html#exam-set'],
    ['イベント準備を助けるプログラムとモデル化', 'lessons/deterministic-random-model.html#exam-set'],
    ['学校サイト公開前のチェック', 'lessons/intellectual-property.html#exam-set'],
    ['SNS投稿と情報の読み取り', 'lessons/privacy.html#exam-set'],
    ['地域イベントの来場データを分析する', 'lessons/scatter-correlation.html#exam-set'],
    ['アンケート結果の分析', 'lessons/statistics.html#exam-set']
  ];
  document.querySelector('#app').innerHTML = `<main class="page">
    <p class="breadcrumb"><a href="index.html">学習目次</a> / 共通テスト対策</p>
    <section class="intro brand-intro compact-intro">
      <p class="eyebrow">学習用類題</p>
      <h1>共通テスト対策</h1>
      <p>用語を覚えるだけでなく、表・グラフ・会話文・疑似コードを読み、条件を整理して判断する練習をします。</p>
    </section>

    <section class="guide-box">
      <h2>共通テストで大切な力</h2>
      <ul class="point-list">
        <li>用語を、具体的な場面と結び付けて理解する。</li>
        <li>表やグラフから、必要な値と関係を読み取る。</li>
        <li>疑似コードを一行ずつ追い、変数の変化を表で確認する。</li>
        <li>文章から条件を拾い、最も適切な判断を選ぶ。</li>
        <li>データや情報の扱いについて、安全性と妥当性を考える。</li>
      </ul>
    </section>

    <section class="quick-links">
      <h2>総合問題で練習する</h2>
      <p class="small-note">入試本番の過去問ではなく、このページの内容を確認するための学習用類題です。</p>
      <div class="route-grid">
        ${integrated.map(([title, href]) => `<a class="route-card" href="${href}"><strong>${title}</strong><span>資料を読み、複数の単元をつなげて考える</span></a>`).join('')}
      </div>
    </section>

    <section class="quick-links">
      <h2>分野別に練習する</h2>
      <p class="small-note">苦手な分野から直接復習できます。</p>
      <div class="route-grid">
        <a class="route-card" href="#program-reading"><strong>プログラム読解</strong><span>変数、分岐、反復、配列、探索、整列</span></a>
        <a class="route-card" href="#data-reading"><strong>データ活用</strong><span>代表値、外れ値、可視化、相関、形式</span></a>
        <a class="route-card" href="#network-society"><strong>情報社会・ネットワーク</strong><span>権利、個人情報、セキュリティ、通信</span></a>
        <a class="route-card" href="#last-review"><strong>直前確認</strong><span>短いページを続けて見直す</span></a>
      </div>
    </section>

    <section class="quick-links" id="program-reading">
      <h2>プログラム読解の練習</h2>
      ${examLessonLinks(['function', 'branch', 'loop', 'array', 'counter-sum', 'linear-search', 'binary-search', 'selection-sort', 'bubble-sort'])}
    </section>

    <section class="quick-links" id="data-reading">
      <h2>データ分析の練習</h2>
      ${examLessonLinks(['statistics', 'outlier-representative', 'visualization', 'scatter-correlation', 'data-format', 'database'])}
    </section>

    <section class="quick-links" id="network-society">
      <h2>ネットワーク・情報社会の確認</h2>
      ${examLessonLinks(['problem-solving-flow', 'intellectual-property', 'security', 'privacy', 'protocol', 'encryption-signature', 'media-literacy', 'information-design', 'network-build', 'packet', 'api'])}
    </section>

    <section class="quick-links" id="last-review">
      <h2>直前に見直したい単元</h2>
      ${examLessonLinks(['binary', 'hexadecimal', 'text-digital', 'function', 'binary-search', 'statistics', 'scatter-correlation', 'security', 'encryption-signature', 'protocol'])}
      <div class="route-grid">
        <a class="route-card" href="glossary.html"><strong>用語一覧</strong><span>短い説明から関連ページへ戻る</span></a>
        <a class="route-card" href="questions.html"><strong>基礎確認問題</strong><span>各ページの短い確認問題をまとめて見る</span></a>
      </div>
    </section>
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

function renderDetailBlock(block) {
  const paragraphs = (block.paragraphs || []).map(text => `<p>${text}</p>`).join('');
  const bullets = block.bullets && block.bullets.length
    ? `<ul class="point-list">${block.bullets.map(item => `<li>${item}</li>`).join('')}</ul>`
    : '';
  const table = block.table
    ? `<div class="table-scroll"><table class="mini-table"><thead><tr>${block.table.headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${block.table.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
    : '';
  const steps = block.steps && block.steps.length
    ? `<ol class="step-list">${block.steps.map(step => `<li>${step}</li>`).join('')}</ol>`
    : '';
  return `<section class="detail-card">
    <h3>${block.title}</h3>
    ${paragraphs}
    ${bullets}
    ${steps}
    ${table}
  </section>`;
}

function renderLessonDetails(lesson) {
  if (!lesson.details || !lesson.details.length) return '';
  return `<section class="deep-dive">
    <h2>ゆっくり理解する</h2>
    <div class="detail-grid">${lesson.details.map(renderDetailBlock).join('')}</div>
  </section>`;
}

function renderWorkedExample(item) {
  const thinking = item.thinking && item.thinking.length
    ? `<ol class="step-list">${item.thinking.map(step => `<li>${step}</li>`).join('')}</ol>`
    : '';
  const answer = item.answer ? `<details class="answer-details" open><summary>考え方と答え</summary>${thinking}<p>${item.answer}</p></details>` : '';
  const code = item.code ? `<pre class="code-block">${item.code}</pre>` : '';
  return `<section class="worked-card">
    <h3>${item.title}</h3>
    <p class="problem-text">${item.problem}</p>
    ${answer}
    ${code}
  </section>`;
}

function renderPracticeProblem(item, index) {
  const hint = item.hint ? `<p class="hint-text">ヒント：${item.hint}</p>` : '';
  return `<li class="practice-card">
    <p class="practice-number">問${index + 1}</p>
    <p>${item.question}</p>
    ${hint}
    <details><summary>解答を見る</summary><p>${item.answer}</p></details>
  </li>`;
}

function renderLessonExamples(lesson) {
  const worked = lesson.workedExamples && lesson.workedExamples.length
    ? `<section class="worked-area" id="examples"><h2>例題で確認する</h2><div class="worked-grid">${lesson.workedExamples.map(renderWorkedExample).join('')}</div></section>`
    : '';
  const practice = lesson.practiceProblems && lesson.practiceProblems.length
    ? `<section class="practice-area" id="practice"><h2>練習問題</h2><ol class="practice-list">${lesson.practiceProblems.map(renderPracticeProblem).join('')}</ol></section>`
    : '';
  return `${worked}${practice}`;
}

function renderExamFocus(lesson) {
  if (!lesson.examFocus) return '';
  return `<section class="guide-box" id="exam-focus">
    <h2>共通テストではどう問われるか</h2>
    <p>${lesson.examFocus}</p>
  </section>`;
}

function renderTraceTables(lesson) {
  if (!lesson.traceTables || !lesson.traceTables.length) return '';
  return `<section class="trace-area" id="trace">
    <h2>手で追ってみよう</h2>
    <p>プログラムは、変数の値が一行ずつ変わりながら進みます。表にして追うと、どこで値が変わるのかが見えやすくなります。</p>
    ${lesson.traceTables.map(table => `<section class="trace-card">
      <h3>${table.title}</h3>
      ${table.note ? `<p>${table.note}</p>` : ''}
      <div class="table-scroll"><table class="mini-table"><thead><tr>${table.headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    </section>`).join('')}
  </section>`;
}

function renderExamQuestion(item, index) {
  const passage = item.passage ? `<div class="exam-passage">${item.passage.split('\n').map(line => `<p>${line}</p>`).join('')}</div>` : '';
  const code = item.code ? `<pre class="code-block">${item.code}</pre>` : '';
  const choices = item.choices && item.choices.length
    ? `<ol class="choice-list">${item.choices.map(choice => `<li>${choice}</li>`).join('')}</ol>`
    : '';
  return `<section class="exam-card">
    <p class="exam-number">類題${index + 1}</p>
    <h3>${item.title}</h3>
    ${passage}
    ${code}
    <p class="problem-text">${item.question}</p>
    ${choices}
    <details><summary>解答と解説を見る</summary><p><strong>答え：</strong>${item.answer}</p><p>${item.explanation}</p></details>
  </section>`;
}

function renderExamArea(lesson) {
  if (!lesson.examQuestions || !lesson.examQuestions.length) return '';
  return `<section class="exam-area" id="exam">
    <h2>共通テスト風の確認</h2>
    <p class="small-note">入試本番の過去問ではなく、このページの内容を確認するための学習用類題です。</p>
    <div class="exam-grid">${lesson.examQuestions.map(renderExamQuestion).join('')}</div>
  </section>`;
}

function renderExamMaterial(material) {
  if (material.type === 'conversation') {
    return `<div class="exam-passage">${material.lines.map(line => `<p><strong>${line.speaker}：</strong>${line.text}</p>`).join('')}</div>`;
  }
  if (material.type === 'table') {
    return `<div class="table-scroll"><table class="mini-table"><thead><tr>${material.headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${material.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  if (material.type === 'code') {
    return `<pre class="code-block">${material.code}</pre>`;
  }
  return `<div class="exam-passage">${material.text.split('\n').map(line => `<p>${line}</p>`).join('')}</div>`;
}

function renderExamSetQuestion(question, index) {
  const choices = question.choices && question.choices.length
    ? `<ol class="choice-list">${question.choices.map(choice => `<li>${choice}</li>`).join('')}</ol>`
    : '';
  return `<section class="exam-set-question">
    <h4>問${index + 1}　${question.title}</h4>
    <p>${question.question}</p>
    ${choices}
    <details><summary>解答と解説を見る</summary><p><strong>答え：</strong>${question.answer}</p><p>${question.explanation}</p>${question.mistake ? `<p class="hint-text">つまずきポイント：${question.mistake}</p>` : ''}</details>
  </section>`;
}

function renderExamSets(lesson) {
  if (!lesson.examSets || !lesson.examSets.length) return '';
  return `<section class="exam-set-area" id="exam-set">
    <h2>共通テスト風 総合問題</h2>
    <p class="small-note">入試本番の過去問ではなく、このページの内容を確認するための学習用類題です。</p>
    ${lesson.examSets.map(set => `<article class="exam-set-card">
      <div class="exam-set-head">
        <p class="exam-number">${set.difficulty || '共通テスト重要'}</p>
        <h3>${set.title}</h3>
      </div>
      <p>${set.lead}</p>
      <div class="exam-materials">${(set.materials || []).map(renderExamMaterial).join('')}</div>
      <div class="exam-set-questions">${set.questions.map(renderExamSetQuestion).join('')}</div>
    </article>`).join('')}
  </section>`;
}

function renderInPageNav(lesson) {
  const items = [
    ['#image', 'まずイメージ'],
    ['#basic', '基本の考え方'],
    ['#figure', '図で理解'],
    ...(lesson.traceTables && lesson.traceTables.length ? [['#trace', '手で追う']] : []),
    ...(lesson.workedExamples && lesson.workedExamples.length ? [['#examples', '例題']] : []),
    ...(lesson.practiceProblems && lesson.practiceProblems.length ? [['#practice', '練習問題']] : []),
    ...(lesson.examQuestions && lesson.examQuestions.length ? [['#exam', '共通テスト風']] : []),
    ...(lesson.examSets && lesson.examSets.length ? [['#exam-set', '総合問題']] : []),
    ['#check', '確認問題']
  ];
  return `<nav class="in-page-nav" aria-label="このページで学ぶこと">
    <h2>このページで学ぶこと</h2>
    <div>${items.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</div>
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
      ${renderInPageNav(lesson)}

      <section id="image">
        <h2>まず一言でいうと</h2>
        <p>${lesson.oneLine}</p>
      </section>

      <section>
        <h2>まず身近な場面で考える</h2>
        <div class="example">${lesson.example}</div>
      </section>

      <section id="figure">
        <h2>図で見る</h2>
        ${FIGURES[lesson.figure] ? FIGURES[lesson.figure]() : ''}
      </section>

      <section id="basic">
        <h2>情報Ⅰではこう考える</h2>
        ${lesson.explanation.split('。').filter(Boolean).map(s => `<p>${s}。</p>`).join('')}
        ${lesson.code ? `<h3>疑似コード</h3><pre class="code-block">${lesson.code}</pre>` : ''}
        ${lesson.python ? `<h3>Pythonで書くと</h3><pre class="code-block python-code">${lesson.python}</pre>` : ''}
      </section>

      ${renderLessonDetails(lesson)}

      ${renderTraceTables(lesson)}

      ${renderLessonExamples(lesson)}

      ${renderExamFocus(lesson)}

      ${renderExamArea(lesson)}

      ${renderExamSets(lesson)}

      ${typeof renderCodeExercise === 'function' ? renderCodeExercise(lesson.id) : ''}

      <section>
        <h2>よくある誤解</h2>
        <div class="mistake">${lesson.misconception}</div>
      </section>

      ${renderDemo(lesson.id)}

      <section class="question-box" id="check">
        <h2>確認問題</h2>
        <p>${lesson.question}</p>
        <details><summary>解答を見る</summary><p>${lesson.answer}</p></details>
      </section>

      <section>
        <h2>まとめ</h2>
        <p>${lesson.summary || lesson.oneLine}</p>
      </section>

      <section class="term-area">
        <h2>関連用語</h2>
        <p><a href="../glossary.html">用語一覧で、このページに関係する言葉を確認する</a></p>
      </section>
    </article>
    <div class="footer-nav">${navForLesson(id)}<p><a href="#top">↑ ページ上部へ</a></p></div>
  </main>`;
  initDemo(lesson.id);
  if (typeof initCodeExercise === 'function') initCodeExercise(lesson.id);
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
