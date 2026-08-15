/* 情報Ⅰ v9 — 本編/プログラミング目次から新しい学習機能へ導く */
(() => {
  const page=location.pathname.split('/').pop()||'index.html';
  function insertStrip(root,items){
    if(!root||document.querySelector('.index-capabilities-v9'))return;
    root.insertAdjacentHTML('afterend',`<section class="index-capabilities-v9">${items.map(([n,h,p])=>`<div><span>${n}</span><b>${h}</b><p>${p}</p></div>`).join('')}</section>`);
  }
  if(page==='index.html'||page===''){
    const lead=document.querySelector('.index-intro:not(.compact) .index-lead');
    if(lead)lead.textContent='教材の9講・47PARTを原教材と逐項照合し、本文・細部ノート・教材型演習に加えて、2進法、画像・音声、圧縮、論理回路、2の補数、シミュレーション、DNS、暗号、データベース、尺度・統計・回帰などは画面上で操作しながら学べます。';
    insertStrip(document.querySelector('.study-guide:not(.programming-guide)'),[
      ['47','PARTを逐項照合','定義・側注・数値例まで本文へ戻す'],
      ['18','インタラクティブ実験','計算・分類・論理・統計をその場で操作'],
      ['2+','実践演習 / PART','原教材の判断・計算・説明の型を改編'],
      ['1','到達チェック','「読んだ」ではなく説明できる項目を記録']
    ]);
  }
  if(page==='programming.html'){
    const lead=document.querySelector('.index-intro.compact .index-lead');
    if(lead)lead.textContent='初級14講・中級19講・上級15講を教材の順番で進めます。各講で教材の核・読み方・つまずきやすい点を確認し、コードを1行ずつ追跡。中級・上級は教材方針どおり先に例題へ挑み、上級15講では長い条件文を処理単位へ分解してプログラムへ落とし込みます。';
    insertStrip(document.querySelector('.programming-guide'),[
      ['48','全講を教材順で','初級→中級→上級の難度設計を維持'],
      ['1行','ずつコード追跡','現在行の役割を表示して手で追う'],
      ['15','上級・長文問題','条件整理→コード→途中値まで分解'],
      ['SAVE','追跡メモ保存','変数・配列・出力のメモを講ごとに保持']
    ]);
  }
})();