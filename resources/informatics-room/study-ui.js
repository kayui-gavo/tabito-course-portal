function lessonCompletedSet() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_COMPLETED) || '[]')); }
  catch { return new Set(); }
}
function saveCompletedSet(set) {
  localStorage.setItem(STORAGE_COMPLETED, JSON.stringify([...set]));
}
function sidebarForLesson(current) {
  const done = lessonCompletedSet();
  if (current.track === 'main') {
    return STUDY_DATA.lectures.map(meta => {
      const lessons = STUDY_DATA.mainLessons.filter(x=>x.lecture===meta.no);
      return `<div class="sidebar-group">
        <span class="sidebar-group-title">第${meta.no}講　${escapeHTML(meta.title)}</span>
        ${lessons.map(x=>`<a class="sidebar-link ${x.id===current.id?'is-current':''} ${done.has(x.id)?'is-done':''}" href="${lessonHref(x.id)}">
          <span class="sidebar-index">PART ${x.part}</span><span class="sidebar-label">${escapeHTML(x.title)}</span>
        </a>`).join('')}
      </div>`;
    }).join('');
  }
  return STUDY_DATA.programmingLevels.map(level => {
    const lessons = STUDY_DATA.programmingLessons.filter(x=>x.level===level.id);
    return `<div class="sidebar-group">
      <span class="sidebar-group-title">${level.id}　${level.range}</span>
      ${lessons.map(x=>`<a class="sidebar-link ${x.id===current.id?'is-current':''} ${done.has(x.id)?'is-done':''}" href="${lessonHref(x.id)}">
        <span class="sidebar-index">第${x.no}講</span><span class="sidebar-label">${escapeHTML(x.title)}</span>
      </a>`).join('')}
    </div>`;
  }).join('');
}
function lessonTrackProgress(current) {
  const list = current.track==='main' ? STUDY_DATA.mainLessons : STUDY_DATA.programmingLessons;
  const done = lessonCompletedSet();
  return [list.filter(x=>done.has(x.id)).length, list.length];
}
function termsHTML(lesson) {
  if (!lesson.terms || !lesson.terms.length) return '';
  return `<details class="lesson-terms">
    <summary>このPARTの用語 <span>${lesson.terms.length}語</span></summary>
    <div class="lesson-term-list">${lesson.terms.map(term=>`<span>${escapeHTML(term)}</span>`).join('')}</div>
  </details>`;
}
function conceptHTML(point, index) {
  return `<div class="concept-block"><h3>${index+1}. ${escapeHTML(point.title)}</h3><p>${escapeHTML(point.body)}</p></div>`;
}
function codeHTML(lesson) {
  if (!lesson.code) return '';
  return `<section class="lesson-section" id="example">
    <p class="lesson-section-label">EXAMPLE</p><h2>コードを追ってみる</h2>
    <div class="example-box"><strong>読む順番</strong><p>上から1行ずつ、変数の値がどう変わるかを手元で追ってから実行結果を考えます。</p></div>
    <pre class="code-block"><code>${escapeHTML(lesson.code)}</code></pre>
  </section>`;
}
function quizHTML(lesson) {
  const q=lesson.quiz;
  return `<section class="lesson-section" id="check">
    <p class="lesson-section-label">CHECK</p><h2>ここで1問</h2>
    <div class="quiz-box" data-answer="${q.answer}"><h3>確認問題</h3><p class="quiz-question">${escapeHTML(q.question)}</p>
      <div class="quiz-choices">${q.choices.map((c,i)=>`<button type="button" class="quiz-choice" data-choice="${i}"><span>${i+1}.</span> ${escapeHTML(c)}</button>`).join('')}</div>
      <p class="quiz-feedback"></p>
    </div>
  </section>`;
}
function nextPrevHTML(current) {
  const list=current.track==='main'?STUDY_DATA.mainLessons:STUDY_DATA.programmingLessons;
  const idx=list.findIndex(x=>x.id===current.id),prev=idx>0?list[idx-1]:null,next=idx<list.length-1?list[idx+1]:null;
  return `<nav class="lesson-nav" aria-label="前後の学習ページ">
    ${prev?`<a href="${lessonHref(prev.id)}"><small>← 前へ</small><strong>${escapeHTML(prev.title)}</strong></a>`:'<span></span>'}
    ${next?`<a href="${lessonHref(next.id)}"><small>次へ →</small><strong>${escapeHTML(next.title)}</strong></a>`:'<span></span>'}
  </nav>`;
}
function lessonLabel(lesson) { return lesson.track==='main' ? `第${lesson.lecture}講 / PART ${lesson.part}` : `${lesson.level} / 第${lesson.no}講`; }
function lessonParentHref(lesson) { return lesson.track==='main'?'index.html':'programming.html'; }
function lessonParentTitle(lesson) { return lesson.track==='main'?'本編':'プログラミング編'; }
function lessonJumpNavHTML(lesson) {
  return `<nav class="lesson-nav-v13 lesson-nav-v13-base" aria-label="このページの学習ナビゲーション">
    <div class="lesson-nav-progress-v13"><i data-read-progress-v13></i></div>
    <div class="lesson-nav-inner-v13">
      <span>${lesson.track==='programming'?'この講':'このPART'}</span>
      <a href="#points">学習目標</a><a href="#key-points">要点</a>${lesson.code?'<a href="#example">例題</a>':''}<a href="#check">確認</a><a href="#learn-complete">完了</a>
      <button type="button" data-to-top-v13>↑ 上へ</button>
    </div>
  </nav>`;
}
function bindLessonJumpNav() {
  const nav=document.querySelector('.lesson-nav-v13'); if(!nav)return;
  const links=[...nav.querySelectorAll('a[href^="#"]')];
  const progress=nav.querySelector('[data-read-progress-v13]');
  nav.querySelector('[data-to-top-v13]')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  const paint=()=>{
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    if(progress)progress.style.width=`${Math.min(100,Math.max(0,scrollY/max*100))}%`;
    let best=null,bestY=-Infinity;
    links.forEach(a=>{const target=document.querySelector(a.getAttribute('href'));if(!target)return;const y=target.getBoundingClientRect().top;if(y<=165&&y>bestY){best=a;bestY=y;}});
    links.forEach(a=>a.classList.toggle('is-active',a===best));
  };
  addEventListener('scroll',paint,{passive:true});addEventListener('resize',paint,{passive:true});paint();
}
function bindQuiz(root, lesson) {
  const box=root.querySelector('.quiz-box'); if(!box)return;
  const feedback=box.querySelector('.quiz-feedback'),buttons=[...box.querySelectorAll('.quiz-choice')];
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    if(buttons.some(x=>x.disabled))return;const choice=Number(btn.dataset.choice);buttons.forEach(x=>x.disabled=true);const correct=lesson.quiz.answer;buttons[correct].classList.add('is-correct');if(choice!==correct)btn.classList.add('is-wrong');feedback.textContent=choice===correct?`正解です。${lesson.quiz.explanation}`:`もう一度本文の該当箇所を確認しましょう。${lesson.quiz.explanation}`;feedback.classList.add('is-visible');
  }));
}
function bindComplete(root, lesson) {
  const btn=root.querySelector('#completeLesson'); if(!btn)return;let done=lessonCompletedSet();
  const apply=()=>{const isDone=done.has(lesson.id);btn.classList.toggle('is-done',isDone);btn.textContent=isDone?'✓ 学習済み':(lesson.track==='main'?'このPARTを完了にする':'この講を完了にする');};apply();
  btn.addEventListener('click',()=>{done=lessonCompletedSet();if(done.has(lesson.id))done.delete(lesson.id);else done.add(lesson.id);saveCompletedSet(done);apply();root.querySelectorAll(`.sidebar-link[href="${lessonHref(lesson.id)}"]`).forEach(a=>a.classList.toggle('is-done',done.has(lesson.id)));const list=lesson.track==='main'?STUDY_DATA.mainLessons:STUDY_DATA.programmingLessons,count=list.filter(item=>done.has(item.id)).length;root.querySelectorAll('.sidebar-progress').forEach(el=>{el.textContent=`${count}/${list.length} 完了`;});const progress=root.querySelector('.lesson-complete .study-progress');if(progress)progress.outerHTML=progressHTML(count,list.length);});
}
function bindMobileSyllabus() {
  const button=document.querySelector('#mobileSyllabus'),overlay=document.querySelector('.sidebar-overlay');if(!button)return;const close=()=>document.body.classList.remove('syllabus-open');button.addEventListener('click',()=>document.body.classList.toggle('syllabus-open'));overlay?.addEventListener('click',close);document.querySelector('.lesson-sidebar')?.addEventListener('click',e=>{if(e.target.closest('a'))close();});
}
window.renderStudyLesson = function renderStudyLesson() {
  const params=new URLSearchParams(location.search),id=params.get('id') || 'b1-1',lesson=studyLessonById(id);
  if(!lesson){document.body.innerHTML=`${renderStudyHeader('home')}<main class="study-shell index-shell"><h1>学習ページが見つかりません</h1><p><a href="index.html">目次へ戻る</a></p></main>`;return;}
  localStorage.setItem(STORAGE_LAST,lesson.id);document.title=`${lesson.title}｜情報Ⅰ 学習ライブラリ`;document.body.classList.add('lesson-body');
  const [done,total]=lessonTrackProgress(lesson),mainRoute=lesson.track==='main';
  document.body.innerHTML=`${renderStudyHeader(mainRoute?'home':'programming')}
    ${lessonJumpNavHTML(lesson)}
    <button id="mobileSyllabus" class="mobile-syllabus-button" type="button">目次を開く　${escapeHTML(lessonLabel(lesson))}</button>
    <div class="sidebar-overlay"></div>
    <main class="lesson-layout">
      <aside class="lesson-sidebar" aria-label="学習目次"><div class="sidebar-head"><strong>${mainRoute?'本編 9講':'プログラミング 48講'}</strong><span class="sidebar-progress">${done}/${total} 完了</span></div>${sidebarForLesson(lesson)}</aside>
      <article class="lesson-paper">
        <p class="lesson-breadcrumb"><a href="${lessonParentHref(lesson)}">${lessonParentTitle(lesson)}</a>　/　${escapeHTML(lessonLabel(lesson))}</p>
        <p class="lesson-kicker">${escapeHTML(lessonLabel(lesson))}</p><h1 class="lesson-title">${escapeHTML(lesson.title)}</h1><p class="lesson-lead">${escapeHTML(lesson.lead)}</p>
        <div class="lesson-goals" id="points"><strong>このページでできるようになること</strong><ul>${lesson.goals.map(g=>`<li>${escapeHTML(g)}</li>`).join('')}</ul></div>
        ${termsHTML(lesson)}
        <section class="lesson-section" id="key-points"><p class="lesson-section-label">KEY POINTS</p><h2>要点を理解する</h2>${lesson.points.map(conceptHTML).join('')}${lesson.note?`<p class="lesson-note"><strong>注意：</strong> ${escapeHTML(lesson.note)}</p>`:''}</section>
        ${codeHTML(lesson)}${quizHTML(lesson)}
        <p class="lesson-source">学習範囲：${escapeHTML(lesson.source)}をもとに、Web自学用に説明と例題を再構成しています。</p>
        <div class="lesson-complete" id="learn-complete"><div>${progressHTML(done,total)}</div><button id="completeLesson" class="complete-button" type="button">${mainRoute?'このPARTを完了にする':'この講を完了にする'}</button></div>
        ${nextPrevHTML(lesson)}
      </article>
    </main>`;
  bindQuiz(document,lesson);bindComplete(document,lesson);bindMobileSyllabus();bindLessonJumpNav();
};