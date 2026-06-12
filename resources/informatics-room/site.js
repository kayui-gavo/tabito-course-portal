function lessonFile(id) {
  return `lessons/${id}.html`;
}

function headerHtml(prefix = '') {
  return `<header class="site-header"><div class="site-header-inner">
    <h1 class="site-title"><a href="${prefix}index.html">${SITE.title}</a></h1>
    <p class="site-subtitle">${SITE.subtitle}</p>
    <nav class="global-nav">
      <a href="${prefix}index.html">トップ</a>
      <a href="${prefix}glossary.html">用語一覧</a>
      <a href="${prefix}questions.html">確認問題</a>
      <a href="${prefix}../informatics-curriculum-map.html">公式知識点マップ</a>
      <a href="${prefix}../../informatics.html">Portalへ戻る</a>
    </nav>
  </div></header>`;
}

function footerHtml() {
  return `<footer class="site-footer"><div class="site-header-inner">
    <p>このサイトは学習用に作成した教材原型です。外部サイトや文部科学省資料の文章・画像をそのままコピーせず、内容を自分たちの言葉と図解で整理しています。</p>
  </div></footer>`;
}

function renderChrome(prefix = '') {
  document.body.insertAdjacentHTML('afterbegin', headerHtml(prefix));
  document.body.insertAdjacentHTML('beforeend', footerHtml());
}

function tagHtml(type) {
  const label = { basic: '基本', extra: '補足', practice: '演習', lesson: 'ページ' }[type] || '項目';
  return `<span class="tag tag-${type}">${label}</span>`;
}

function renderTop() {
  renderChrome('');
  const root = document.querySelector('#app');
  root.innerHTML = `<main class="page">
    <h1>情報Ⅰ 全体目次</h1>
    <p class="top-note">最初から順番に読む必要はありません。分からない言葉を見つけたら、その小さなページへ移動して、図と例で確認してください。</p>
    <section class="directory">
      ${CHAPTERS.map(ch => `<article class="chapter-block" id="${ch.id}">
        <h2>${ch.title}</h2>
        <ul class="link-list">
          ${ch.topics.map(([type, title, href]) => `<li>${tagHtml(type)} ${href === '#' ? `<span>${title}</span>` : `<a href="${href}">${title}</a>`}</li>`).join('')}
        </ul>
      </article>`).join('')}
    </section>
  </main>`;
}

function navForLesson(id) {
  const index = LESSON_ORDER.indexOf(id);
  const prev = LESSONS[LESSON_ORDER[index - 1]];
  const next = LESSONS[LESSON_ORDER[index + 1]];
  return `<nav class="lesson-nav" aria-label="ページ移動">
    <span>${prev ? `<a href="${LESSON_ORDER[index - 1]}.html">← 前の項目：${prev.title}</a>` : '← 前の項目：なし'}</span>
    <span><a href="../index.html">□ トップ</a></span>
    <span>${next ? `<a href="${LESSON_ORDER[index + 1]}.html">次の項目：${next.title} →</a>` : '次の項目：なし →'}</span>
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
  root.innerHTML = `<main class="page">
    ${navForLesson(id)}
    <h1>${lesson.title}</h1>
    <p><strong>${lesson.chapter}</strong></p>
    <p class="top-note">対応する公式範囲：${lesson.sourceChapter}</p>
    ${(lesson.figures || []).map(name => FIGURES[name] ? FIGURES[name]() : '').join('')}
    ${lesson.sections.map(section => `<section>
      <h2>${section.h3}</h2>
      ${(section.body || []).map(p => `<p>${p}</p>`).join('')}
      ${section.example ? `<div class="example"><strong>たとえば：</strong>${section.example}</div>` : ''}
      ${section.mistake ? `<div class="mistake"><strong>ここで注意：</strong>${section.mistake}</div>` : ''}
      ${section.supplement ? `<details class="supplement"><summary>＊補足：${section.supplement[0]}</summary><p>${section.supplement[1]}</p></details>` : ''}
    </section>`).join('')}
    ${lesson.code ? `<section><h2>疑似コードで見る</h2><pre>${lesson.code}</pre></section>` : ''}
    ${renderDemo(lesson.demo)}
    <section class="question-box">
      <h2>確認</h2>
      <p>このページの内容に関係する問題は、確認問題ページで復習できます。</p>
      <p><a href="../questions.html">Q：関連問題へ</a></p>
    </section>
    <div class="footer-nav">${navForLesson(id)}<p><a href="#top">↑ ページ上部へ</a></p></div>
  </main>`;
  initDemo(lesson.demo);
}

function renderDemo(type) {
  if (!type) return '';
  const demos = {
    binary: `<section class="demo-box"><h2>ミニ demo：2進数に直す</h2><div class="demo-row"><label>10進数 <input id="binaryInput" type="range" min="0" max="31" value="11"></label><strong id="binaryOut"></strong></div><div id="binaryBits" class="bits"></div></section>`,
    branch: `<section class="demo-box"><h2>ミニ demo：条件分岐</h2><div class="demo-row"><label>点数 <input id="scoreInput" type="range" min="0" max="100" value="75"></label><strong id="scoreOut"></strong></div></section>`,
    loop: `<section class="demo-box"><h2>ミニ demo：1からnまで足す</h2><div class="demo-row"><label>n <input id="loopInput" type="range" min="1" max="20" value="10"></label><strong id="loopOut"></strong></div><div class="table-scroll"><table><thead><tr><th>i</th><th>合計</th></tr></thead><tbody id="loopTable"></tbody></table></div></section>`,
    packet: `<section class="demo-box"><h2>ミニ demo：パケットに分ける</h2><div class="demo-row"><button id="packetBtn">分けて送る</button><strong id="packetOut"></strong></div><div id="packetList"></div></section>`,
    stats: `<section class="demo-box"><h2>ミニ demo：代表値</h2><p>データ：10, 12, 12, 13, 50</p><button id="statsBtn">代表値を見る</button><div id="statsOut"></div></section>`
  };
  return demos[type] || '';
}

function initDemo(type) {
  if (type === 'binary') {
    const input = document.querySelector('#binaryInput');
    const out = document.querySelector('#binaryOut');
    const bits = document.querySelector('#binaryBits');
    const update = () => {
      const n = Number(input.value);
      const b = n.toString(2);
      out.textContent = `${n}₁₀ = ${b}₂`;
      bits.innerHTML = b.padStart(5, '0').split('').map(bit => `<div class="bit ${bit === '1' ? 'on' : ''}"><b>${bit}</b></div>`).join('');
    };
    input.addEventListener('input', update);
    update();
  }
  if (type === 'branch') {
    const input = document.querySelector('#scoreInput');
    const out = document.querySelector('#scoreOut');
    const update = () => {
      const score = Number(input.value);
      out.textContent = `${score}点 → ${score >= 80 ? '合格' : 'もう一度確認'}`;
    };
    input.addEventListener('input', update);
    update();
  }
  if (type === 'loop') {
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
  if (type === 'packet') {
    document.querySelector('#packetBtn').addEventListener('click', () => {
      document.querySelector('#packetOut').textContent = '受信側で 1→2→3 の順に並べ直します。';
      document.querySelector('#packetList').innerHTML = ['1/3: 情報', '2/3: を小さく', '3/3: 分ける'].map(p => `<p class="note">${p}</p>`).join('');
    });
  }
  if (type === 'stats') {
    document.querySelector('#statsBtn').addEventListener('click', () => {
      document.querySelector('#statsOut').innerHTML = '<p class="note">平均値：19.4、中央値：12、最頻値：12。50という外れ値で平均値が大きくなっています。</p>';
    });
  }
}

function renderGlossary() {
  renderChrome('');
  document.querySelector('#app').innerHTML = `<main class="page"><h1>情報Ⅰ 用語一覧</h1>
    <p class="top-note">このページは丸暗記用ではなく、学習した内容を整理するためのページです。分からない言葉は、関連ページへ戻って図で確認しましょう。</p>
    <div class="table-scroll"><table class="glossary-table"><thead><tr><th>用語</th><th>説明</th><th>関連</th></tr></thead><tbody>
    ${GLOSSARY.sort((a,b)=>a[0].localeCompare(b[0], 'ja')).map(([term, desc, href]) => `<tr><td>${term}</td><td>${desc}</td><td>${href === '#' ? '-' : `<a href="${href}">読む</a>`}</td></tr>`).join('')}
    </tbody></table></div></main>`;
}

function renderQuestions() {
  renderChrome('');
  document.querySelector('#app').innerHTML = `<main class="page"><h1>確認問題</h1>
    <p class="top-note">定期テスト前に、言葉の意味と基本的な考え方を確認するためのページです。自動採点ではなく、答えを開いて確認する形式です。</p>
    ${QUESTIONS.map(([topic, q, a, href], i) => `<section class="question-box"><h2>問${i + 1}：${topic}</h2><p>${q}</p><details><summary>解答を見る</summary><p>${a}</p><p><a href="${href}">関連ページへ</a></p></details></section>`).join('')}
  </main>`;
}
