/* 情報Ⅰ v13 — 本編/プログラミング目次から学習機能へ導く */
(() => {
  const page=location.pathname.split('/').pop()||'index.html';
  function insertStrip(root,items){
    if(!root||document.querySelector('.index-capabilities-v9'))return;
    root.insertAdjacentHTML('afterend',`<section class="index-capabilities-v9">${items.map(([n,h,p])=>`<div><span>${n}</span><b>${h}</b><p>${p}</p></div>`).join('')}</section>`);
  }
  if(page==='index.html'||page===''){
    const lead=document.querySelector('.index-intro:not(.compact) .index-lead');
    if(lead)lead.textContent='教材の9講・47PARTを原教材と逐項照合。全PARTを専用図版で整理し、本文・細部ノート・操作型演習・教材型の記述実践まで一続きにしました。図や記述問題では、先に自分の説明を書き、解答例と照合して「説明できた／要復習」を残せます。';
    insertStrip(document.querySelector('.study-guide:not(.programming-guide)'),[
      ['47','PARTを逐項照合','定義・側注・数値例まで本文へ戻す'],
      ['47','全PARTに専用図版','分類・流れ・座標・表・ネットワークを内容に合わせて描き分け'],
      ['30','インタラクティブ実験','計算・分類・通信・論理・統計をその場で操作'],
      ['2+','記述実践 / PART','自答→解答例→3観点セルフチェックまで保存']
    ]);
  }
  if(page==='programming.html'){
    const lead=document.querySelector('.index-intro.compact .index-lead');
    if(lead)lead.textContent='初級14講・中級19講・上級15講を教材順で進めます。print・演算・配列・range・分岐・whileから、関数、2次元配列、入れ子、ソート、統計、グラフ理論、待ち行列、誤り検出、すごろくまで全48講に専用図版を用意。23講では図直結の追跡演習を行い、全講で実際のPythonもブラウザ上で実行できます。';
    insertStrip(document.querySelector('.programming-guide'),[
      ['48','全講に専用図版','初級から上級まで、教材の例・配列・条件・途中値を図で確認'],
      ['23','図直結の追跡演習','添字・range・分岐・while・料金・ソートなどをその場で操作'],
      ['RUN','全講でPython実行','予想→実行→出力・エラー確認までページ内で完結'],
      ['3段階','初級・中級・上級','教材どおり難度と学習順序を維持']
    ]);
  }
})();