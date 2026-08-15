/* 情報Ⅰ v10 — 学習状況を「次に何をするか」へ変える */
(() => {
  const COMPLETED='tabito-info-completed-v2';
  const MASTERY='tabito-info-mastery-v8';
  const WRONG='tabito-info-practice-wrong-v2';
  const GLOSSARY='tabito-info-glossary-review-v9';
  const safe=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch(_){return fallback;}};
  function currentStats(){
    const completed=new Set(safe(COMPLETED,[]));
    const mastery=safe(MASTERY,{});
    const wrong=safe(WRONG,[]);
    const glossary=safe(GLOSSARY,{});
    const lessons=(window.STUDY_DATA?.mainLessons)||[];
    let masteryDone=0,masteryTotal=0;
    lessons.forEach(l=>{
      const total=(window.SOURCE_MASTER_V7?.[l.id]?.sections||[]).length;
      masteryTotal+=total;
      masteryDone+=Math.min(total,(mastery[l.id]||[]).length);
    });
    const glossaryReview=Object.values(glossary).filter(v=>v==='review').length;
    const next=lessons.find(l=>!completed.has(l.id))||lessons[0];
    return {completed:lessons.filter(l=>completed.has(l.id)).length,total:lessons.length,masteryDone,masteryTotal,wrong:Array.isArray(wrong)?wrong.length:0,glossaryReview,next};
  }
  function percent(a,b){return b?Math.round(a/b*100):0;}
  function init(){
    const curriculum=document.querySelector('.curriculum-toolbar');if(!curriculum||document.querySelector('.study-dashboard-v10'))return;
    const s=currentStats(),mp=percent(s.masteryDone,s.masteryTotal),cp=percent(s.completed,s.total);
    const nextHref=s.next?`lesson.html?id=${encodeURIComponent(s.next.id)}`:'index.html';
    curriculum.insertAdjacentHTML('beforebegin',`<section class="study-dashboard-v10">
      <header><div><span>STUDY STATUS</span><h2>次にやることが分かる学習状況</h2></div><a href="${nextHref}">${s.completed>=s.total?'本編を復習する':'次のPARTへ進む'} →</a></header>
      <div class="study-dashboard-v10-grid">
        <div><b>本編完了</b><strong>${s.completed}<small> / ${s.total}</small></strong><i><span style="width:${cp}%"></span></i><p>${cp}%</p></div>
        <div><b>到達チェック</b><strong>${s.masteryDone}<small> / ${s.masteryTotal}</small></strong><i><span style="width:${mp}%"></span></i><p>${mp}%</p></div>
        <a href="questions.html?wrong=1"><b>要復習の問題</b><strong>${s.wrong}</strong><p>${s.wrong?'誤答・要復習だけを解き直す':'現在の要復習はありません'}</p></a>
        <a href="glossary.html"><b>要復習の用語</b><strong>${s.glossaryReview}</strong><p>${s.glossaryReview?'想起練習でもう一度確認':'用語の想起練習へ'}</p></a>
      </div>
      <footer><b>おすすめ</b><p>${s.wrong>0?'新しいPARTへ進む前に、要復習問題を5〜10問だけ解き直す。':s.glossaryReview>0?'用語を5語ほど思い出してから次のPARTへ進む。':'次のPARTを読み、到達チェックまで終えてから問題演習へ進む。'}</p></footer>
    </section>`);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();