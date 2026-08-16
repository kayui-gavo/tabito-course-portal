/* 情報Ⅰ v13 — production post-render runtime
   v11/v12 figure bridge, recall writing, a11y, figure viewport, lesson navigationを一本化。 */
(() => {
  const baseRender=window.renderStudyLesson;
  const DRAFT_KEY='tabito-info-figure-drafts-v12';
  const REVIEW_KEY='tabito-info-figure-review-v12';
  const safeLoad=key=>{try{return JSON.parse(localStorage.getItem(key)||'{}');}catch(_){return{};}};
  const safeSave=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch(_){}};
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const idNow=()=>new URLSearchParams(location.search).get('id')||'';
  const lessonNow=()=>typeof studyLessonById==='function'?studyLessonById(idNow()):null;

  const v11Prompts={
    'b3-4':['標本化周波数や量子化bit数を上げると、なぜ元の音を細かく表せる一方でデータ量も増えるのですか。','1秒あたりの標本数や1標本あたりのbit数が増えるため。時間方向・振幅方向の情報が細かくなる代わりに、保存するbit数も増える。'],
    'b5-1':['メモリとストレージを「容量が大きい/小さい」だけでなく、CPUとの関係と用途で説明できますか。','メモリはCPUが処理中の命令・データを置く主記憶、ストレージは大容量データを長期保存する補助記憶。役割が異なる。'],
    'b5-3':['2進数1桁の加算で、1+1のときC=1、S=0になる理由を説明できますか。','1+1=10₂なので、下位bitの和Sは0、上位桁への桁上りCarry Outが1になる。'],
    'b6-1':['フローチャート・アクティビティ図・状態遷移図を、見た目ではなく「何を表す図か」で区別できますか。','フローチャートは単一処理の流れ、アクティビティ図は並行して行われる処理、状態遷移図は状態と遷移条件を表す。'],
    'b8-1':['家庭や学校のLANからインターネットへ出るとき、ハブ・アクセスポイント・ルータ・ISPの役割を順に説明できますか。','ハブ/APはLAN内端末を接続し、ルータが異なるネットワーク間を中継し、ISPの接続サービスを通じてインターネットへつながる。'],
    'b8-2':['TCP/IPの4階層で、HTTP・TCP・IP・無線LANをそれぞれどの層へ置くか説明できますか。','HTTPはアプリケーション層、TCPはトランスポート層、IPはインターネット層、無線LANはネットワークインタフェース層。'],
    'b8-3':['Web閲覧とメール送信で、DNS・HTTP/HTTPS・SMTP・POP/IMAPはどの場面で使われますか。','DNSは名前解決、HTTP/HTTPSはWebの送受信、SMTPはメール送信・サーバ間転送、POP/IMAPは受信側でメールを利用する。'],
    'b8-5':['公開鍵暗号とデジタル署名で「誰の公開鍵/秘密鍵を使うか」が逆向きになる理由を目的から説明できますか。','秘密通信では受信者だけが読めるよう受信者の公開鍵で暗号化し受信者の秘密鍵で復号する。署名では送信者本人を確認するため送信者の秘密鍵で署名し公開鍵で検証する。'],
    'b8-7':['データベースの選択・射影・結合を、行・列・複数テーブルのどれを操作するかで説明できますか。','選択は条件に合う行、射影は必要な列、結合は関連する複数テーブルをキーなどでつないで1つの結果にする。'],
    'b9-4':['回帰直線がデータ点をすべて通らないのに予測に使えるのはなぜですか。また残差とは何ですか。','回帰直線は全体の傾向を表す近似直線で、各点との差が残差。最小二乗法では残差の二乗和が小さくなる直線を求める。']
  };

  function bridgeV11Question(){
    const qa=v11Prompts[idNow()],fig=document.querySelector('.scientific-figure-v11');
    if(!qa||!fig||fig.querySelector('.scientific-question-v12'))return;
    const d=document.createElement('details');
    d.className='scientific-question-v12';
    d.innerHTML=`<summary>図を見て考える</summary><p>${esc(qa[0])}</p><div class="scientific-question-answer-v12" hidden>${esc(qa[1])}</div><button type="button" data-v12-answer>考えた後に答えを見る</button>`;
    fig.appendChild(d);
    d.querySelector('[data-v12-answer]').addEventListener('click',e=>{const ans=d.querySelector('.scientific-question-answer-v12');ans.hidden=!ans.hidden;e.currentTarget.textContent=ans.hidden?'考えた後に答えを見る':'答えを閉じる';});
  }

  function wrapFigureCanvas(fig,index){
    const canvas=fig.querySelector(':scope > canvas');
    if(!canvas||canvas.closest('.figure-canvas-viewport-v13'))return;
    const viewport=document.createElement('div');viewport.className='figure-canvas-viewport-v13';
    canvas.before(viewport);viewport.appendChild(canvas);
    const hint=document.createElement('p');hint.className='figure-scroll-hint-v13';hint.textContent='図が画面より大きい場合は、ここだけ横にスクロールできます。';viewport.insertAdjacentElement('afterend',hint);
    const update=()=>{const scrollable=viewport.scrollWidth>viewport.clientWidth+4;viewport.dataset.scrollable=scrollable?'1':'0';hint.classList.toggle('is-visible',scrollable);};
    requestAnimationFrame(update);setTimeout(update,120);addEventListener('resize',update,{passive:true});
    canvas.dataset.figureCanvasV13=String(index);
  }

  function enhanceWriting(){
    const lessonId=idNow();
    document.querySelectorAll('.scientific-figure-v12,.scientific-figure-v11').forEach((fig,idx)=>{
      const details=fig.querySelector('.scientific-question-v12');if(!details||details.querySelector('.figure-writing-v12'))return;
      const answerButton=details.querySelector('[data-v12-answer]');if(!answerButton)return;
      const figureId=fig.dataset.figureV12||fig.dataset.programFigureV12||fig.dataset.programFigureV12b||fig.dataset.programFigureV12c||fig.dataset.programFigureV12d||fig.dataset.programFigureV12e||fig.dataset.programFigureV12f||fig.dataset.programFigureV12g||fig.dataset.figureId||`figure-${idx}`;
      const key=`${lessonId}:${figureId}`;
      const drafts=safeLoad(DRAFT_KEY),reviews=safeLoad(REVIEW_KEY),current=drafts[key]||'',status=reviews[key]||'';
      const block=document.createElement('div');block.className='figure-writing-v12';
      block.innerHTML=`<label><span>自分の説明</span><textarea rows="3" placeholder="図の数値・方向・条件を使って、答えを見る前に説明する。"></textarea><small><b data-figure-char>0</b>字</small></label><div class="figure-selfcheck-v12"><span>答えを見た後</span><button type="button" data-figure-review="mastered" class="${status==='mastered'?'is-selected':''}">説明できた</button><button type="button" data-figure-review="review" class="${status==='review'?'is-selected':''}">要復習</button></div>`;
      details.insertBefore(block,answerButton);
      const ta=block.querySelector('textarea'),count=block.querySelector('[data-figure-char]');ta.value=current;count.textContent=String(current.length);block.classList.toggle('is-ready',current.trim().length>=12);
      ta.addEventListener('input',()=>{const all=safeLoad(DRAFT_KEY);all[key]=ta.value;safeSave(DRAFT_KEY,all);count.textContent=String(ta.value.length);block.classList.toggle('is-ready',ta.value.trim().length>=12);block.classList.remove('needs-writing');});
      answerButton.addEventListener('click',()=>block.classList.toggle('needs-writing',ta.value.trim().length<12));
      block.querySelectorAll('[data-figure-review]').forEach(btn=>btn.addEventListener('click',()=>{const all=safeLoad(REVIEW_KEY),value=btn.dataset.figureReview;all[key]=all[key]===value?'':value;safeSave(REVIEW_KEY,all);block.querySelectorAll('[data-figure-review]').forEach(x=>x.classList.toggle('is-selected',all[key]===x.dataset.figureReview));}));
    });
  }

  function enhanceA11y(){
    document.querySelectorAll('.scientific-figure-v12,.scientific-figure-v11').forEach((fig,index)=>{
      if(fig.dataset.a11yV13==='1')return;fig.dataset.a11yV13='1';
      const title=fig.querySelector('h3')?.textContent.trim()||`教材図版 ${index+1}`;
      const caption=fig.querySelector('figcaption')?.textContent.trim()||'';
      const question=fig.querySelector('.scientific-question-v12>p')?.textContent.trim()||'';
      const canvas=fig.querySelector('canvas');
      const titleId=`figure-title-v13-${index}`,descId=`figure-desc-v13-${index}`;
      const h=fig.querySelector('h3');if(h)h.id=titleId;
      let details=fig.querySelector('.figure-text-summary-v12');
      if(!details){details=document.createElement('details');details.className='figure-text-summary-v12';details.id=descId;details.innerHTML=`<summary>図を文章で確認する</summary><p><b>図の主題：</b>${esc(title)}</p>${caption?`<p><b>読み方：</b>${esc(caption)}</p>`:''}${question?`<p><b>考えるポイント：</b>${esc(question)}</p>`:''}`;const cap=fig.querySelector('figcaption');(cap||fig.querySelector('.figure-canvas-viewport-v13')||canvas)?.insertAdjacentElement('afterend',details);}else details.id=descId;
      if(canvas){canvas.setAttribute('role','img');canvas.setAttribute('aria-labelledby',titleId);canvas.setAttribute('aria-describedby',descId);canvas.tabIndex=-1;}
      const expand=fig.querySelector('[data-v12-expand],[data-figure-zoom]');if(expand)expand.setAttribute('aria-label',`${title} を拡大して見る`);
    });
    document.querySelectorAll('.pf-result-v12c,.pf-score-stats-v12c,.figure-lab-result-v12,[data-program-run-output],.source-wireless-result-v10,.pd-result,.pe-logic-results').forEach(node=>{if(!node.hasAttribute('aria-live')){node.setAttribute('aria-live','polite');node.setAttribute('aria-atomic','true');}});
  }

  function navTargets(lesson){
    const unique=items=>{const seen=new Set();return items.filter(x=>x.node&&!seen.has(x.node)&&(seen.add(x.node),true));};
    const main=[
      ['要点',document.querySelector('#points,.lesson-goals')],
      ['図解',document.querySelector('.scientific-figure-v12,.scientific-figure-v11')],
      ['本文',document.querySelector('.et-textbook-sections,.et-detail-v5-reading')],
      ['操作',document.querySelector('.figure-lab-v12,[data-transfer-lab-v10],.source-wireless-v10,[data-micro-lab-v9b],[data-micro-lab-v9]')],
      ['例題',document.querySelector('#example,.et-practice-v4')],
      ['実践',document.querySelector('.et-source-practice-v7,.source-practice-v7')],
      ['確認',document.querySelector('#check,.et-check-v3')]
    ];
    const prog=[
      ['要点',document.querySelector('.program-text-v6,#points')],
      ['図解',document.querySelector('.scientific-figure-v12,.scientific-figure-v11')],
      ['追跡',document.querySelector('.program-figlab-v12')],
      ['例題',document.querySelector('.program-example-v6,#example')],
      ['コード読解',document.querySelector('[data-program-lab-v9]')],
      ['Python実行',document.querySelector('[data-program-run-v10]')],
      ['応用',document.querySelector('[data-program-middle-v9],[data-program-advanced-v9]')],
      ['確認',document.querySelector('#check,.et-check-v3')]
    ];
    return unique(lesson?.track==='programming'?prog:main);
  }

  function buildNav(){
    const lesson=lessonNow(),paper=document.querySelector('.lesson-paper');if(!lesson||!paper||document.querySelector('.lesson-nav-v13'))return;
    const items=navTargets(lesson);if(items.length<3)return;
    items.forEach((item,i)=>{if(!item.node.id)item.node.id=`study-section-v13-${i}`;});
    const nav=document.createElement('nav');nav.className='lesson-nav-v13';nav.setAttribute('aria-label','このページの学習ナビゲーション');nav.innerHTML=`<div class="lesson-nav-progress-v13"><i data-read-progress-v13></i></div><div class="lesson-nav-inner-v13"><span>${lesson.track==='programming'?'この講':'このPART'}</span>${items.map(item=>`<a href="#${item.node.id}">${item.label}</a>`).join('')}<button type="button" data-to-top-v13>↑ 上へ</button></div>`;
    const header=document.querySelector('.study-header');(header||paper).insertAdjacentElement(header?'afterend':'beforebegin',nav);
    nav.querySelector('[data-to-top-v13]').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    const progress=nav.querySelector('[data-read-progress-v13]');
    const paint=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=`${Math.min(100,Math.max(0,scrollY/max*100))}%`;let best=null,bestY=-Infinity;items.forEach(item=>{const y=item.node.getBoundingClientRect().top;if(y<=165&&y>bestY){best=item;bestY=y;}});nav.querySelectorAll('a').forEach((a,i)=>a.classList.toggle('is-active',items[i]===best));};
    addEventListener('scroll',paint,{passive:true});addEventListener('resize',paint,{passive:true});paint();
  }

  function polishLessonCopy(){
    const cue=document.querySelector('.et-study-cue-v3 b');if(cue)cue.textContent='図で関係をつかむ → 図の下で自分の言葉にする → 本文で細部を読む → 操作・実行して確かめる → 例題・実践演習 → 到達チェック';
    const checkLead=document.querySelector('.et-check-head p');if(checkLead)checkLead.textContent='単語暗記だけでなく、資料の読み取り・場面への適用・計算・分類まで確認します。3問のあと、仕上げ問題にも挑戦してください。';
  }

  function postRender(){
    bridgeV11Question();
    document.querySelectorAll('.scientific-figure-v12,.scientific-figure-v11').forEach(wrapFigureCanvas);
    enhanceWriting();
    enhanceA11y();
    buildNav();
    polishLessonCopy();
  }

  window.renderStudyLesson=function renderStudyProductionV13(){baseRender();postRender();};
  window.STUDY_PRODUCTION_V13=true;
})();
