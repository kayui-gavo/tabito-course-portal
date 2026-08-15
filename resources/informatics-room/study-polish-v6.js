/* 情報Ⅰ UI / 教材仕上げ v12
   core pages share one navigation/copy system; source-master details also feed glossary definitions. */
(() => {
  const path=location.pathname.split('/').pop()||'index.html';

  function setActive(key){
    document.querySelectorAll('.study-nav a').forEach(a=>a.classList.remove('is-active'));
    const map={home:'index.html',programming:'programming.html',practice:'exam.html',glossary:'glossary.html'};
    const href=map[key];
    if(href) document.querySelector(`.study-nav a[href="${href}"]`)?.classList.add('is-active');
  }
  function replaceText(root,from,to){
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{if(node.nodeValue.includes(from))node.nodeValue=node.nodeValue.split(from).join(to);});
  }
  function polishExamCounts(){
    if(path!=='exam.html'||typeof STUDY_DATA==='undefined')return;
    document.querySelectorAll('.tool-lecture-row').forEach((row,index)=>{
      const lecture=index+1;
      const lessons=STUDY_DATA.mainLessons.filter(x=>x.lecture===lecture);
      const parts=lessons.length;
      const open=lessons.reduce((sum,l)=>sum+((window.SOURCE_PRACTICE_V7?.[l.id]||[]).length),0);
      const p=row.querySelector('p'); if(p)p.textContent=`${parts} PART / 自動採点 約${parts*4}問 + 記述${open}問`;
    });
  }
  function addPracticeJump(lesson){
    if(!lesson||lesson.track!=='main')return;
    const complete=document.querySelector('.lesson-complete');
    if(!complete||document.querySelector('.practice-jump-v6'))return;
    complete.insertAdjacentHTML('afterend',`<div class="practice-jump-v6"><div><b>このPARTを読んだら</b><p>同じ第${lesson.lecture}講の問題を続けて解くと、用語だけでなく資料・場面への当てはめまで確認できます。</p></div><a href="questions.html?lecture=${lesson.lecture}">第${lesson.lecture}講の問題演習へ →</a></div>`);
  }
  function deMetaTextbookCopy(){
    document.querySelectorAll('.et-textbook-sections,.et-figure-note-v3,.et-detail-v5-notes,.et-detail-v5-reading').forEach(root=>{
      replaceText(root,'教材では、',''); replaceText(root,'教材では','');
      replaceText(root,'本教材では、',''); replaceText(root,'本教材では','');
    });
  }
  function restorePageCopy(){
    if(path==='index.html'||path===''){
      setActive('home');
      const title=document.querySelector('.index-intro:not(.compact) h1');
      const lead=document.querySelector('.index-intro:not(.compact) .index-lead');
      if(title)title.textContent='情報Ⅰを、わかる順番で。';
      if(lead)lead.textContent='教材の9講・47PARTを原教材と逐項照合し、図で関係をつかみ、本文で流れを理解し、逐項ノートで定義・数値例・注記まで補い、改編例題と確認問題で定着まで進めます。';
      const guide=document.querySelector('.study-guide:not(.programming-guide)');
      if(guide){
        const strong=guide.querySelector('strong'); if(strong)strong.textContent='1 PART の学び方';
        [...guide.querySelectorAll('span')].forEach((span,i)=>{const copy=['図でつかむ','本文・逐項ノート','例題で使う','確認して定着'];if(copy[i])span.textContent=copy[i];});
      }
    }
    if(path==='programming.html'){
      setActive('programming');
      const title=document.querySelector('.index-intro.compact h1'); if(title)title.textContent='プログラムは、手で追うとわかる。';
    }
    if(path==='questions.html'){
      setActive('practice');
      const title=document.querySelector('.tool-intro h1'); if(title)title.textContent='確認問題を、解きながら定着させる。';
    }
    if(path==='exam.html'){
      setActive('practice');
      const title=document.querySelector('.tool-intro h1'); if(title)title.textContent='問題演習';
      replaceText(document.querySelector('.tool-shell'),'知識点','学習事項');
      replaceText(document.querySelector('.tool-shell'),'全範囲を刷る','全範囲を演習する');
      polishExamCounts();
    }
    if(path==='glossary.html'){
      setActive('glossary');
      const title=document.querySelector('.tool-intro h1'); if(title)title.textContent='用語一覧';
    }
    if(path==='lesson.html'){
      const params=new URLSearchParams(location.search);
      const lesson=typeof studyLessonById==='function'?studyLessonById(params.get('id')||'b1-1'):null;
      const isMain=lesson?.track!=='programming';
      setActive(isMain?'home':'programming');
      document.querySelectorAll('.et-v4-status').forEach(node=>node.remove());
      if(isMain||document.querySelector('.et-route')||document.querySelector('.program-source-flow-v6'))document.querySelectorAll('.lesson-route').forEach(node=>node.remove());
      replaceText(document.querySelector('.lesson-paper'),'知識点','要点');
      if(isMain)deMetaTextbookCopy();
      const source=document.querySelector('.lesson-source');
      if(source)source.textContent=source.textContent.replace('Web自学用に説明と例題を再構成しています。','原教材の学習順序と範囲を保ちながら、Web自学用に本文・図解・例題を再構成しています。');
      addPracticeJump(lesson);
    }
  }
  function termKeys(term){
    const raw=String(term||'').trim();
    const noParen=raw.replace(/[（(][^）)]*[）)]/g,'').trim();
    return [...new Set([raw,noParen,...raw.split(/[（(／/・]/).map(x=>x.trim())].filter(x=>x.length>=2))];
  }
  function betterDefinition(lesson,term){
    if(!lesson)return'';
    const v3=(window.ELECTRONIC_TEXTBOOK_V3||{})[lesson.id];
    const master=(window.SOURCE_MASTER_V7||{})[lesson.id];
    const texts=[...(master?.sections||[]).map(x=>x[1]),...(v3?.sections||[]).map(x=>x.body),...(lesson.points||[]).map(x=>x.body),lesson.lead,lesson.note].filter(Boolean);
    const keys=termKeys(term);
    for(const text of texts){
      const sentences=String(text).split('。').map(x=>x.trim()).filter(Boolean);
      const hit=sentences.find(s=>keys.some(k=>s.includes(k)));
      if(hit)return `${hit}。`;
    }
    return lesson.lead||'';
  }
  function polishGlossary(){
    if(path!=='glossary.html')return;
    const root=document.querySelector('#glossaryList'); if(!root)return;
    const apply=()=>{
      root.querySelectorAll('.tool-glossary-row').forEach(row=>{
        const term=row.querySelector('.tool-glossary-term strong')?.textContent.trim();
        const link=row.querySelector('a[href*="lesson.html?id="]');
        const id=link?new URL(link.href,location.href).searchParams.get('id'):'';
        const lesson=id&&typeof studyLessonById==='function'?studyLessonById(id):null;
        const desc=row.querySelector('p'),improved=betterDefinition(lesson,term);
        if(desc&&improved&&desc.textContent!==improved)desc.textContent=improved;
      });
    };
    apply();
    new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});
  }
  function polishProgrammingLesson(){
    if(path!=='lesson.html')return;
    const params=new URLSearchParams(location.search);
    const lesson=typeof studyLessonById==='function'?studyLessonById(params.get('id')||''):null;
    if(!lesson||lesson.track!=='programming')return;
    document.body.classList.add('programming-textbook-v6');
    const key=document.querySelector('.program-text-v6')||document.querySelector('.lesson-section'); key?.classList.add('programming-key-v6');
  }
  function cleanDeveloperCopy(){
    document.querySelectorAll('[data-dev],[data-debug]').forEach(node=>node.remove());
    document.querySelectorAll('.lesson-paper,.tool-shell,.index-shell').forEach(root=>{replaceText(root,'PART別編集済み','');replaceText(root,'SOURCE MAP','');});
  }
  function init(){
    document.body.classList.add('information-ui-v6'); restorePageCopy(); polishGlossary(); polishProgrammingLesson(); cleanDeveloperCopy();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();