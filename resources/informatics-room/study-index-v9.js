/* 情報Ⅰ v12 — 本編/プログラミング目次から学習機能へ導く */
(() => {
  const page=location.pathname.split('/').pop()||'index.html';
  function insertStrip(root,items){
    if(!root||document.querySelector('.index-capabilities-v9'))return;
    root.insertAdjacentHTML('afterend',`<section class="index-capabilities-v9">${items.map(([n,h,p])=>`<div><span>${n}</span><b>${h}</b><p>${p}</p></div>`).join('')}</section>`);
  }
  if(page==='index.html'||page===''){
    const lead=document.querySelector('.index-intro:not(.compact) .index-lead');
    if(lead)lead.textContent='教材の9講・47PARTを原教材と逐項照合。本文・細部ノート・教材型演習に加え、全47PARTに専用図版を用意し、デジタル表現、情報デザイン、プログラミング、モデル化、ネットワーク、情報システム、データ分析などは関係・方向・数値例まで図で読み取れる構成へ作り直しています。図の直後には考える問いと操作型演習を接続し、「眺める」だけで終わらない自学導線にしています。';
    insertStrip(document.querySelector('.study-guide:not(.programming-guide)'),[
      ['47','PARTを逐項照合','定義・側注・数値例まで本文へ戻す'],
      ['47','全PARTに専用図版','分類・流れ・座標・表・ネットワークを内容に合わせて描き分け'],
      ['30','インタラクティブ実験','計算・分類・通信・論理・統計をその場で操作'],
      ['2+','実践演習 / PART','原教材の判断・計算・説明の型を改編']
    ]);
  }
  if(page==='programming.html'){
    const lead=document.querySelector('.index-intro.compact .index-lead');
    if(lead)lead.textContent='初級14講・中級19講・上級15講を教材順で進めます。各講でコード行の役割を読み、実際のPythonをブラウザで実行します。第15講以降は、関数、配列と乱数、2次元配列、範囲判定、入れ子、最大・最小、while、ソート、料金計算、統計、グラフ理論、待ち行列、誤り検出、すごろくまで全34講に専用図版を用意し、特に状態変化が重要な15講には図直結の追跡インタラクティブも置いています。';
    insertStrip(document.querySelector('.programming-guide'),[
      ['48','全講を教材順で','初級→中級→上級の難度設計を維持'],
      ['34','中級以降を全講図解','第15〜48講を処理の流れ・配列・境界・途中値まで可視化'],
      ['15','図直結の追跡演習','乱数・2次元配列・反復・最大最小・料金・ソート等を操作'],
      ['RUN','実際にPython実行','予想→実行→出力・エラー確認までページ内で完結']
    ]);
  }
})();