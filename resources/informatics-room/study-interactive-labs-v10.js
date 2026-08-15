/* 情報Ⅰ v10 — 共通テストで差がつく転移領域の追加インタラクティブ */
(() => {
  const baseRender=window.renderStudyLesson;
  const esc=v=>typeof escapeHTML==='function'?escapeHTML(v):String(v);
  const shell=(title,lead,body)=>`<section class="transfer-lab-v10" data-transfer-lab-v10><header><div><span>COMMON TEST LAB</span><h3>${esc(title)}</h3></div><p>${esc(lead)}</p></header><div class="transfer-lab-v10-body">${body}</div></section>`;
  const current=()=>{const id=new URLSearchParams(location.search).get('id')||'';return {id,lesson:typeof studyLessonById==='function'?studyLessonById(id):null};};

  function securityLab(){
    const qs=[
      ['成績ファイルを、許可された教員だけが閲覧できるようにする','機密性','見てよい人だけが情報へアクセスできる状態を守る。'],
      ['送信途中で申請内容が書き換えられていないことを確認する','完全性','情報が正確で、勝手に改変されていないことを守る。'],
      ['災害時でも学校システムを使えるよう予備系を用意する','可用性','必要なときに情報やシステムを利用できる状態を守る。'],
      ['パスワード＋ICカードで本人確認する','二要素認証','知識要素と所持要素という異なる種類を組み合わせる。']
    ];
    return shell('セキュリティを「目的」で分類する','CIAや認証方式は名称からではなく、何を守りたい場面なのかで判断します。',`<div class="transfer-quiz-v10" data-transfer-quiz data-index="0"><p><small>場面</small><strong data-security-q></strong></p><div>${['機密性','完全性','可用性','二要素認証'].map(x=>`<button type="button" data-security-answer="${x}">${x}</button>`).join('')}</div><p class="transfer-feedback-v10" data-security-feedback></p><button type="button" class="transfer-next-v10" data-security-next>次の場面 →</button></div>`);
  }
  function bindSecurity(root){
    const qs=[['成績ファイルを、許可された教員だけが閲覧できるようにする','機密性','見てよい人だけが情報へアクセスできる状態を守る。'],['送信途中で申請内容が書き換えられていないことを確認する','完全性','情報が正確で、勝手に改変されていないことを守る。'],['災害時でも学校システムを使えるよう予備系を用意する','可用性','必要なときに情報やシステムを利用できる状態を守る。'],['パスワード＋ICカードで本人確認する','二要素認証','知識要素と所持要素という異なる種類を組み合わせる。']];
    let i=0,done=false;const q=root.querySelector('[data-security-q]'),f=root.querySelector('[data-security-feedback]');
    const paint=()=>{q.textContent=qs[i][0];f.textContent='';done=false;root.querySelectorAll('[data-security-answer]').forEach(b=>b.classList.remove('is-correct','is-wrong'));};
    root.querySelectorAll('[data-security-answer]').forEach(b=>b.addEventListener('click',()=>{if(done)return;done=true;const ok=b.dataset.securityAnswer===qs[i][1];b.classList.add(ok?'is-correct':'is-wrong');root.querySelectorAll('[data-security-answer]').forEach(x=>{if(x.dataset.securityAnswer===qs[i][1])x.classList.add('is-correct');});f.textContent=`${ok?'正解。':'正解は '+qs[i][1]+'。'}${qs[i][2]}`;}));
    root.querySelector('[data-security-next]').addEventListener('click',()=>{i=(i+1)%qs.length;paint();});paint();
  }

  function memoryLab(){
    return shell('主記憶と補助記憶を「場面」で選ぶ','容量の数字だけでなく、CPUが今使う領域か、電源を切っても保存したい領域かで判断します。',`<div class="memory-lab-v10"><div class="memory-spec-v10"><b>ノートPC</b><span>主記憶 16GB</span><span>SSD 512GB</span></div><div class="memory-scenarios-v10">${[['動画ファイルを来月まで保存する','SSD'],['編集中の画像データをCPUがすぐ処理する','主記憶'],['OSやアプリを長期保存する','SSD'],['実行中プログラムの命令・データを置く','主記憶']].map(([q,a],i)=>`<article data-memory-q="${i}" data-answer="${a}"><p>${q}</p><button type="button" data-memory-pick="主記憶">主記憶</button><button type="button" data-memory-pick="SSD">SSD</button><span></span></article>`).join('')}</div></div>`);
  }
  function bindMemory(root){root.querySelectorAll('[data-memory-q]').forEach(card=>card.querySelectorAll('[data-memory-pick]').forEach(btn=>btn.addEventListener('click',()=>{const ok=btn.dataset.memoryPick===card.dataset.answer;card.querySelectorAll('button').forEach(b=>b.classList.toggle('is-correct',b.dataset.memoryPick===card.dataset.answer));btn.classList.toggle('is-wrong',!ok);card.querySelector('span').textContent=ok?'正解。用途から判断できています。':`${card.dataset.answer}を使います。保存期間とCPUからの近さを確認してください。`;})));}

  function maskLab(){
    return shell('bit演算を画像の効果へ読み替える','AND・ORを計算するだけでなく、「画素を残す／強制的に1にする」という画像処理上の意味まで読みます。',`<div class="mask-lab-v10"><div class="mask-controls-v10"><label><span>画素 X（4bit）</span><input type="text" maxlength="4" value="1010" data-mask-x></label><label><span>マスク M（4bit）</span><input type="text" maxlength="4" value="1111" data-mask-m></label><label><span>演算</span><select data-mask-op><option>AND</option><option>OR</option></select></label></div><div class="mask-result-v10"><span>結果</span><strong data-mask-result>1010</strong><p data-mask-meaning></p></div><div class="mask-presets-v10"><button type="button" data-mask-preset="1111,AND">AND 1111：元を残す</button><button type="button" data-mask-preset="0000,AND">AND 0000：0にする</button><button type="button" data-mask-preset="1111,OR">OR 1111：1にする</button><button type="button" data-mask-preset="0000,OR">OR 0000：元を残す</button></div></div>`);
  }
  function bindMask(root){const x=root.querySelector('[data-mask-x]'),m=root.querySelector('[data-mask-m]'),op=root.querySelector('[data-mask-op]'),out=root.querySelector('[data-mask-result]'),meaning=root.querySelector('[data-mask-meaning]');const clean=e=>{e.value=e.value.replace(/[^01]/g,'').slice(0,4).padEnd(4,'0');};const run=()=>{clean(x);clean(m);const r=[0,1,2,3].map(i=>op.value==='AND'?(x.value[i]==='1'&&m.value[i]==='1'?'1':'0'):(x.value[i]==='1'||m.value[i]==='1'?'1':'0')).join('');out.textContent=r;meaning.textContent=op.value==='AND'?'ANDでは、マスク0の位置は0になり、マスク1の位置は元のbitを通します。':'ORでは、マスク1の位置は1になり、マスク0の位置は元のbitを通します。';};[x,m,op].forEach(e=>e.addEventListener('input',run));root.querySelectorAll('[data-mask-preset]').forEach(b=>b.addEventListener('click',()=>{const [mv,ov]=b.dataset.maskPreset.split(',');m.value=mv;op.value=ov;run();}));run();}

  function protocolLab(){
    const rows=[['Webページを要求・取得する','HTTP / HTTPS'],['ドメイン名からIPアドレスを調べる','DNS'],['メールを送信する','SMTP'],['サーバ上のメールを複数端末で管理する','IMAP'],['通信相手との信頼できる転送を行う','TCP']];
    return shell('プロトコルを「何をしている瞬間か」で選ぶ','名称を丸暗記せず、通信のどの段階・目的なのかを判断します。',`<div class="protocol-table-v10">${rows.map(([q,a],i)=>`<article data-protocol-row data-answer="${a}"><p>${q}</p><select><option value="">選択</option>${['HTTP / HTTPS','DNS','SMTP','IMAP','TCP'].map(x=>`<option>${x}</option>`).join('')}</select><span></span></article>`).join('')}<button type="button" data-protocol-check>まとめて答え合わせ</button></div>`);
  }
  function bindProtocol(root){root.querySelector('[data-protocol-check]').addEventListener('click',()=>root.querySelectorAll('[data-protocol-row]').forEach(row=>{const got=row.querySelector('select').value,ok=got===row.dataset.answer;row.classList.toggle('is-correct',ok);row.classList.toggle('is-wrong',!ok);row.querySelector('span').textContent=ok?'○':`正解：${row.dataset.answer}`;}));}

  function mailLab(){
    const steps=['送信者のメールソフトから送信用メールサーバへ送る','送信側サーバから受信側メールサーバへ転送する','受信側メールサーバにメールが保存される','受信者がPOP/IMAPでメールを読む'];
    return shell('メールが届くまでをサーバ単位で追う','SMTPとPOP/IMAPを「送信／受信」の二語だけで終わらせず、どこからどこへデータが移るかを並べます。',`<div class="mail-order-v10"><div data-mail-bank>${steps.map((s,i)=>`<button type="button" data-mail-step="${i}">${s}</button>`).join('')}</div><div data-mail-answer><span>選んだ順</span></div><div><button type="button" data-mail-check>答え合わせ</button><button type="button" data-mail-reset>リセット</button></div><p data-mail-feedback></p><aside><b>サーバ側で送信に失敗したら？</b><p>「どのサーバが、どの相手への配送に失敗したか」を図にして考えると、エラーメールの発生箇所を追いやすくなります。</p></aside></div>`);
  }
  function bindMail(root){const bank=root.querySelector('[data-mail-bank]'),ans=root.querySelector('[data-mail-answer]'),feed=root.querySelector('[data-mail-feedback]');const move=e=>{const b=e.target.closest('[data-mail-step]');if(b)(b.parentElement===bank?ans:bank).appendChild(b);};bank.addEventListener('click',move);ans.addEventListener('click',move);const reset=()=>{[...bank.querySelectorAll('button'),...ans.querySelectorAll('button')].sort((a,b)=>a.dataset.mailStep-b.dataset.mailStep).forEach(b=>bank.appendChild(b));feed.textContent='';};root.querySelector('[data-mail-reset]').addEventListener('click',reset);root.querySelector('[data-mail-check]').addEventListener('click',()=>{const got=[...ans.querySelectorAll('button')].map(b=>+b.dataset.mailStep);feed.textContent=got.length===4&&got.every((v,i)=>v===i)?'正解。SMTPで送る流れと、POP/IMAPで読む流れを分けて追えています。':'送信側メールソフト → 送信サーバ → 受信サーバ → 受信者、の順にサーバ間の流れを確認してください。';});}

  function centerLab(){
    return shell('外れ値が平均値と中央値へ与える影響を見る','代表値は計算するだけでなく、データの分布や外れ値によって適切さが変わります。',`<div class="center-lab-v10"><label><span>最後の値を動かす</span><input type="range" min="5" max="100" value="10" data-center-last><b data-center-last-label>10</b></label><div class="center-data-v10" data-center-data></div><div class="lab-metrics-v9"><div><span>平均値</span><strong data-center-mean></strong></div><div><span>中央値</span><strong data-center-median></strong></div><div><span>差</span><strong data-center-gap></strong></div></div><p data-center-note></p></div>`);
  }
  function bindCenter(root){const slider=root.querySelector('[data-center-last]'),label=root.querySelector('[data-center-last-label]');const run=()=>{const arr=[6,7,8,9,+slider.value].sort((a,b)=>a-b),mean=arr.reduce((s,x)=>s+x,0)/arr.length,median=arr[2];label.textContent=slider.value;root.querySelector('[data-center-data]').textContent=`データ：${arr.join(', ')}`;root.querySelector('[data-center-mean]').textContent=mean.toFixed(1);root.querySelector('[data-center-median]').textContent=median.toFixed(1);root.querySelector('[data-center-gap]').textContent=Math.abs(mean-median).toFixed(1);root.querySelector('[data-center-note]').textContent=+slider.value>=40?'大きな値が1つ入ると平均値は強く引っ張られます。中央値は中央の順位で決まるため影響が小さいことを確認できます。':'極端な外れ値がないと、平均値と中央値は比較的近い値になります。';};slider.addEventListener('input',run);run();}

  const labs={
    'b1-5':[securityLab,bindSecurity],
    'b5-1':[memoryLab,bindMemory],
    'b3-5':[maskLab,bindMask],
    'b8-2':[protocolLab,bindProtocol],
    'b8-3':[mailLab,bindMail],
    'b9-2':[centerLab,bindCenter]
  };
  window.renderStudyLesson=function renderTransferLabsV10(){baseRender();const {id,lesson}=current();if(!lesson||lesson.track!=='main'||!labs[id])return;const [make,bind]=labs[id];const target=document.querySelector('[data-micro-lab-v9b]')||document.querySelector('[data-micro-lab-v9]')||document.querySelector('.et-figure-v4')||document.querySelector('#points');if(target&&!document.querySelector('.transfer-lab-v10')){target.insertAdjacentHTML('afterend',make());bind(document.querySelector('.transfer-lab-v10'));}};
})();