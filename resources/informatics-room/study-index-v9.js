/* 情報Ⅰ v11 — 本編/プログラミング目次から学習機能へ導く */
(() => {
  const page=location.pathname.split('/').pop()||'index.html';
  function insertStrip(root,items){
    if(!root||document.querySelector('.index-capabilities-v9'))return;
    root.insertAdjacentHTML('afterend',`<section class="index-capabilities-v9">${items.map(([n,h,p])=>`<div><span>${n}</span><b>${h}</b><p>${p}</p></div>`).join('')}</section>`);
  }
  if(page==='index.html'||page===''){
    const lead=document.querySelector('.index-intro:not(.compact) .index-lead');
    if(lead)lead.textContent='教材の9講・47PARTを原教材と逐項照合。本文・細部ノート・教材型演習だけでなく、音のPCM化、五大装置、論理回路、アルゴリズム図、ネットワーク、TCP/IP、DNS・メール、暗号、データベース、回帰・推定など、図そのものが理解の中心になる項目は専用の高精細図版へ作り直しています。';
    insertStrip(document.querySelector('.study-guide:not(.programming-guide)'),[
      ['47','PARTを逐項照合','定義・側注・数値例まで本文へ戻す'],
      ['11','高精細の専用図版','関係・方向・数値例を教材に合わせて描き直す'],
      ['25','インタラクティブ実験','計算・分類・通信・論理・統計をその場で操作'],
      ['2+','実践演習 / PART','原教材の判断・計算・説明の型を改編']
    ]);
  }
  if(page==='programming.html'){
    const lead=document.querySelector('.index-intro.compact .index-lead');
    if(lead)lead.textContent='初級14講・中級19講・上級15講を教材の順番で進めます。各講で教材の核・読み方・つまずきやすい点を確認し、コード行の意味を読み解いた後、実際のPythonをブラウザで実行。中級・上級は教材方針どおり先に例題へ挑み、上級15講では長い条件文を処理単位へ分解します。';
    insertStrip(document.querySelector('.programming-guide'),[
      ['48','全講を教材順で','初級→中級→上級の難度設計を維持'],
      ['RUN','実際にPython実行','予想→実行→出力・エラー確認までページ内で完結'],
      ['15','上級・長文問題','条件整理→コード→途中値まで分解'],
      ['SAVE','追跡メモ保存','変数・配列・自作コードを講ごとに保持']
    ]);
  }
})();