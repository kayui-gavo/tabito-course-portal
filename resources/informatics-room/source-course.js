
const STORAGE_COMPLETED = 'tabito-info-completed-v2';
const STORAGE_LAST = 'tabito-info-last-v2';

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[ch]));
}
function getCompleted() {
  try { return JSON.parse(localStorage.getItem(STORAGE_COMPLETED) || '[]'); } catch { return []; }
}
function getLastLesson() { return localStorage.getItem(STORAGE_LAST) || ''; }
function lessonHref(id) { return `lesson.html?id=${encodeURIComponent(id)}`; }

function renderStudyHeader(active='home') {
  return `<header class="study-header">
    <div class="study-header-inner">
      <a class="study-brand" href="index.html">
        <img src="../../assets/images/tabito-logo.jpg" alt="旅人教育">
        <span><strong>情報Ⅰ</strong><small>学習ライブラリ</small></span>
      </a>
      <nav class="study-nav" aria-label="メインナビゲーション">
        <a class="${active==='home'?'is-active':''}" href="index.html">本編</a>
        <a class="${active==='programming'?'is-active':''}" href="programming.html">プログラミング</a>
        <a class="${active==='practice'?'is-active':''}" href="exam.html">問題演習</a>
        <a class="${active==='glossary'?'is-active':''}" href="glossary.html">用語</a>
        <a href="../../index.html">コース一覧</a>
      </nav>
    </div>
  </header>`;
}
function progressHTML(completedCount, total) {
  const percent = total ? Math.round(completedCount / total * 100) : 0;
  return `<div class="study-progress" aria-label="学習進捗 ${percent}%">
    <div class="study-progress-meta"><span>${completedCount} / ${total} 完了</span><strong>${percent}%</strong></div>
    <div class="study-progress-track"><i style="width:${percent}%"></i></div>
  </div>`;
}
function partRow(lesson, completedSet) {
  const done = completedSet.has(lesson.id);
  return `<a class="curriculum-row ${done?'is-done':''}" href="${lessonHref(lesson.id)}" data-search="${escapeHTML([
      lesson.title, lesson.lead, ...(lesson.points||[]).map(p=>p.title+' '+p.body)
    ].join(' '))}">
      <span class="curriculum-part">${lesson.track==='main' ? `PART ${lesson.part}` : `第${lesson.no}講`}</span>
      <span class="curriculum-title">${escapeHTML(lesson.title)}</span>
      <span class="curriculum-state">${done ? '完了' : '学習する'}</span>
    </a>`;
}
function lectureBlock(no, lessons, completedSet) {
  const done = lessons.filter(x => completedSet.has(x.id)).length;
  const title = STUDY_DATA.lectures.find(x=>x.no===no)?.title || '';
  return `<section class="curriculum-lecture" data-lecture="${no}">
    <div class="lecture-heading">
      <div class="lecture-number"><span>第</span><strong>${no}</strong><span>講</span></div>
      <div class="lecture-copy">
        <h2>${escapeHTML(title)}</h2>
        <p>${done} / ${lessons.length} PART 完了</p>
      </div>
      <div class="lecture-mini-progress"><i style="width:${Math.round(done/lessons.length*100)}%"></i></div>
    </div>
    <div class="curriculum-rows">${lessons.map(x=>partRow(x, completedSet)).join('')}</div>
  </section>`;
}
function continuePanel(completedSet, track='main') {
  const lastId = getLastLesson();
  let lesson = studyLessonById(lastId);
  if (!lesson || lesson.track !== track) {
    const source = track==='main' ? STUDY_DATA.mainLessons : STUDY_DATA.programmingLessons;
    lesson = source.find(x=>!completedSet.has(x.id)) || source[0];
  }
  if (!lesson) return '';
  const label = lesson.track==='main'
    ? `第${lesson.lecture}講 PART${lesson.part}`
    : `${lesson.level} 第${lesson.no}講`;
  return `<a class="continue-strip" href="${lessonHref(lesson.id)}">
    <span class="continue-label">続きから</span>
    <span class="continue-text"><small>${escapeHTML(label)}</small><strong>${escapeHTML(lesson.title)}</strong></span>
    <span class="continue-action">開く</span>
  </a>`;
}
function bindSearch(inputId, rootSelector) {
  const input = document.querySelector(inputId);
  if (!input) return;
  const rows = [...document.querySelectorAll(`${rootSelector} .curriculum-row`)];
  const lectures = [...document.querySelectorAll(`${rootSelector} .curriculum-lecture`)];
  const counter = document.querySelector('#searchCount');
  const normalize = s => s.toLowerCase().replace(/\s+/g,'');
  input.addEventListener('input', () => {
    const q = normalize(input.value);
    let visible = 0;
    rows.forEach(row => {
      const hit = !q || normalize(row.dataset.search + ' ' + row.textContent).includes(q);
      row.hidden = !hit;
      if (hit) visible++;
    });
    lectures.forEach(block => {
      block.hidden = ![...block.querySelectorAll('.curriculum-row')].some(row=>!row.hidden);
    });
    if (counter) counter.textContent = q ? `${visible}件` : '';
  });
}

window.renderTop = function renderTop() {
  const completedSet = new Set(getCompleted());
  const lessons = STUDY_DATA.mainLessons;
  const complete = lessons.filter(x=>completedSet.has(x.id)).length;
  document.body.innerHTML = `${renderStudyHeader('home')}
  <main class="study-shell index-shell">
    <section class="index-intro">
      <div>
        <p class="index-kicker">共通テスト 情報Ⅰ・自学用</p>
        <h1>情報Ⅰを、わかる順番で。</h1>
        <p class="index-lead">教材の第1講から第9講までを47のPARTに分け、図解 → 詳しい本文 → 教材型の改編例題 → 確認問題の順で学べるように再構成しています。初めて学ぶ人も、このサイトだけで用語の定義と使い方まで確認できます。</p>
      </div>
      <div class="index-progress-box">
        <span>本編の進捗</span>
        ${progressHTML(complete, lessons.length)}
      </div>
    </section>
    ${continuePanel(completedSet,'main')}
    <section class="study-guide" aria-label="使い方">
      <strong>1 PART の学び方</strong>
      <span>① 図で関係をつかむ</span><span>② 本文・教科書ノートを読む</span><span>③ 改編例題を解く</span><span>④ 確認問題で定着</span>
    </section>
    <div class="curriculum-toolbar">
      <div>
        <p class="section-label">本編 9講 / 47 PART</p>
        <h2>学習目次</h2>
      </div>
      <label class="curriculum-search">
        <span class="sr-only">講・用語を検索</span>
        <input id="curriculumSearch" type="search" placeholder="用語を検索　例：著作権、2進法、相関">
        <small id="searchCount"></small>
      </label>
    </div>
    <div id="mainCurriculum" class="curriculum-list">
      ${STUDY_DATA.lectures.map(meta => lectureBlock(meta.no, lessons.filter(x=>x.lecture===meta.no), completedSet)).join('')}
    </div>
    <section class="next-track">
      <div><span>PRACTICE</span><h2>読んだら、そのまま問題演習へ。</h2><p>47PARTの確認問題を講別・検索・ランダムで解けます。間違えたPARTへすぐ戻れます。</p></div>
      <a href="questions.html">問題を解く</a>
    </section>
    <section class="next-track">
      <div><span>PROGRAMMING</span><h2>プログラミング編は別の学習ルートで。</h2><p>初級14講 → 中級19講 → 上級15講。教材と同じ48講の順序で進められます。</p></div>
      <a href="programming.html">48講の目次へ</a>
    </section>
  </main>`;
  bindSearch('#curriculumSearch','#mainCurriculum');
};

function programmingLevelBlock(level, lessons, completedSet) {
  const done = lessons.filter(x=>completedSet.has(x.id)).length;
  return `<section class="curriculum-lecture programming-level">
    <div class="lecture-heading">
      <div class="level-badge">${escapeHTML(level.id)}</div>
      <div class="lecture-copy"><h2>${escapeHTML(level.range)}</h2><p>${done} / ${lessons.length} 講 完了</p></div>
      <div class="lecture-mini-progress"><i style="width:${Math.round(done/lessons.length*100)}%"></i></div>
    </div>
    <div class="curriculum-rows">${lessons.map(x=>partRow(x,completedSet)).join('')}</div>
  </section>`;
}

window.renderProgramming = function renderProgramming() {
  const completedSet = new Set(getCompleted());
  const lessons = STUDY_DATA.programmingLessons;
  const complete = lessons.filter(x=>completedSet.has(x.id)).length;
  document.body.innerHTML = `${renderStudyHeader('programming')}
  <main class="study-shell index-shell">
    <section class="index-intro compact">
      <div>
        <p class="index-kicker">Python / 情報Ⅰ プログラミング編</p>
        <h1>コードを読む力を、1講ずつ積み上げる。</h1>
        <p class="index-lead">初級では基本命令、中級では組合せ、上級では長めの条件整理へ。各講の例題は教材の学習項目に合わせて改編しています。</p>
      </div>
      <div class="index-progress-box"><span>48講の進捗</span>${progressHTML(complete,lessons.length)}</div>
    </section>
    ${continuePanel(completedSet,'programming')}
    <section class="study-guide programming-guide">
      <strong>おすすめの進め方</strong>
      <span>初級：解説から</span><span>中級・上級：先にコードを読む</span><span>実行結果を予想してから確認</span>
    </section>
    <div class="curriculum-toolbar">
      <div><p class="section-label">初級 14 / 中級 19 / 上級 15</p><h2>全48講</h2></div>
      <label class="curriculum-search"><span class="sr-only">講・用語を検索</span><input id="curriculumSearch" type="search" placeholder="講題を検索　例：for、配列、ソート"><small id="searchCount"></small></label>
    </div>
    <div id="programmingCurriculum" class="curriculum-list">
      ${STUDY_DATA.programmingLevels.map(level => programmingLevelBlock(level, lessons.filter(x=>x.level===level.id), completedSet)).join('')}
    </div>
  </main>`;
  bindSearch('#curriculumSearch','#programmingCurriculum');
};
