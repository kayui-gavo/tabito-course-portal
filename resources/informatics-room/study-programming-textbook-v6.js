/* 情報Ⅰ＜プログラミング編＞ 自学教材 v6
   既存48講の教材準拠データを、要点整理→例題コード→確認問題の読書順へ整える。 */
(() => {
  const baseRender=window.renderStudyLesson;

  function current(){
    const id=new URLSearchParams(location.search).get('id')||'';
    return studyLessonById(id);
  }

  function numberedCode(code){
    const lines=String(code||'').split('\n');
    return `<div class="program-code-v6" aria-label="コード例">${lines.map((line,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><code>${escapeHTML(line||' ')}</code></div>`).join('')}</div>`;
  }

  function termPanel(lesson){
    const terms=lesson.terms||[];
    if(!terms.length)return'';
    return `<div class="program-terms-v6"><b>この講で使う語・記号</b><div>${terms.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div></div>`;
  }

  function readingSteps(lesson){
    const hasLoop=/\b(for|while)\b/.test(lesson.code||'');
    const hasBranch=/\b(if|elif|else)\b/.test(lesson.code||'');
    const steps=[
      '最初に、変数へどの値が入っているかを書き出す。',
      hasLoop?'反復するたびに、変数や配列のどこが変わるかを1回ずつ追う。':hasBranch?'条件式がTrueかFalseかを先に判定し、実行される行だけを追う。':'上から1行ずつ、演算・関数呼び出し・代入の結果を確認する。',
      '最後に、print()などで何が出力されるかを確認する。'
    ];
    return `<div class="program-reading-v6"><b>コードを読む順番</b><ol>${steps.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ol></div>`;
  }

  function upgradeKeypoints(lesson){
    const sections=[...document.querySelectorAll('.lesson-section')];
    const key=sections.find(s=>s.querySelector('.lesson-section-label')?.textContent.trim()==='KEY POINTS');
    if(!key)return;
    key.classList.add('program-text-v6');
    key.querySelector('.lesson-section-label').textContent='TEXTBOOK';
    const h2=key.querySelector('h2'); if(h2)h2.textContent='要点整理';
    const first=key.querySelector('.concept-block');
    first?.insertAdjacentHTML('beforebegin',`<p class="program-intro-v6">まず、この講で使う書き方と意味を確認します。コードを暗記するのではなく、各記号・関数が何をしているかを説明できるようにします。</p>${termPanel(lesson)}`);
  }

  function upgradeCode(lesson){
    if(!lesson.code)return;
    const sections=[...document.querySelectorAll('.lesson-section')];
    const codeSection=sections.find(s=>s.querySelector('.lesson-section-label')?.textContent.trim()==='EXAMPLE');
    if(!codeSection)return;
    codeSection.classList.add('program-example-v6');
    codeSection.querySelector('.lesson-section-label').textContent='EXAMPLE';
    const h2=codeSection.querySelector('h2'); if(h2)h2.textContent='例題コードを手で追う';
    const oldPre=codeSection.querySelector('pre.code-block');
    if(oldPre)oldPre.outerHTML=numberedCode(lesson.code);
    const box=codeSection.querySelector('.example-box');
    if(box){
      box.innerHTML=`<strong>先に実行結果を予想する</strong><p>${escapeHTML(lesson.lead)} 下のコードを実行する前に、各行で値がどう変わるかを紙に書いて確認します。</p>`;
      box.insertAdjacentHTML('afterend',readingSteps(lesson));
    }
  }

  function upgradeCheck(lesson){
    const check=document.querySelector('#check');
    if(!check)return;
    const label=check.querySelector('.lesson-section-label'); if(label)label.textContent='CHECK';
    const h2=check.querySelector('h2'); if(h2)h2.textContent='確認問題';
    const box=check.querySelector('.quiz-box');
    if(box&&!box.querySelector('.program-check-note-v6'))box.insertAdjacentHTML('afterbegin','<p class="program-check-note-v6">コードを見直す前に、まず自分で答えを決めてください。正解した場合も、なぜそうなるか説明できるか確認します。</p>');
  }

  function addSourceFlow(lesson){
    const goals=document.querySelector('.lesson-goals');
    if(!goals||document.querySelector('.program-source-flow-v6'))return;
    goals.insertAdjacentHTML('afterend','<nav class="program-source-flow-v6" aria-label="この講の学習順序"><a href="#program-key">1 <span>要点整理</span></a><a href="#program-example">2 <span>例題コード</span></a><a href="#check">3 <span>確認問題</span></a></nav>');
    const key=[...document.querySelectorAll('.lesson-section')].find(s=>s.classList.contains('program-text-v6')); if(key)key.id='program-key';
    const ex=[...document.querySelectorAll('.lesson-section')].find(s=>s.classList.contains('program-example-v6')); if(ex)ex.id='program-example';
  }

  window.renderStudyLesson=function renderProgrammingTextbookV6(){
    baseRender();
    const lesson=current();
    if(!lesson||lesson.track!=='programming')return;
    document.body.classList.add('programming-textbook-v6');
    upgradeKeypoints(lesson);
    upgradeCode(lesson);
    upgradeCheck(lesson);
    addSourceFlow(lesson);
  };
})();