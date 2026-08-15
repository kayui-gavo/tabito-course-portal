/* 情報Ⅰ v10 — 令和8年度の能力構成を踏まえたオリジナル短縮模試 */
(() => {
  const KEY='tabito-info-mini-mock-v10';
  const DURATION=30*60;
  const sections=[
    {title:'第1問型　幅広い基礎を身近な場面へ適用',lead:'学校の文化祭準備を題材に、記憶装置・認証・デジタル表現・メールを横断する。',qs:[
      {q:'動画編集PCに「主記憶8GB、SSD 512GB」とある。最も適切な説明はどれか。',c:['8GBは長期保存用、512GBは処理中データ用','8GBは処理中のデータを置く主記憶、512GBは長期保存に使う補助記憶','どちらも電源を切ると必ず消える','容量の大きい装置ほどCPUに近い'],a:1,why:'主記憶はCPUが処理中の命令・データを置く領域で、SSDは補助記憶装置として長期保存に使う。',link:'b5-1'},
      {q:'受付端末でパスワードとICカードを併用する。二要素認証といえる理由はどれか。',c:['操作が2回あるから','知識要素と所持要素という異なる種類を組み合わせるから','暗号化を2回するから','利用者が2人必要だから'],a:1,why:'回数ではなく認証要素の種類が基準。知識・所持・生体など異なる要素を組み合わせる。',link:'b1-5'},
      {q:'4bitの値 1011₂ を16進1桁で表すとどれか。',c:['9','A','B','D'],a:2,why:'1011₂=8+2+1=11₁₀で、16進ではB。',link:'b3-3'},
      {q:'送信者がメールを送るときに主に使うプロトコルはどれか。',c:['SMTP','POP','IMAP','HTTP'],a:0,why:'SMTPはメール送信、POP/IMAPは受信・メールボックス利用に使う。',link:'b8-3'}
    ]},
    {title:'第2問型　情報システムと画像・論理演算',lead:'オンライン証明発行と画像合成を別の場面として読み、仕組みから判断する。',qs:[
      {q:'証明データ取得用コードが第三者へ漏れても、コードだけで個人情報を取得できない設計にする改善として最も適切なのはどれか。',c:['コードを短くする','本人認証を別に要求する','コードを画面に大きく表示する','同じコードを全員で共有する'],a:1,why:'単一コードの漏えいだけで取得が成立しないよう、本人だけが満たせる別の確認を組み合わせる。',link:'b8-6'},
      {q:'4bit画素 A=1010、B=0110 にOR演算を行った結果はどれか。',c:['0010','1010','1110','1111'],a:2,why:'各bitで少なくとも一方が1なら1なので1110。',link:'b5-3'},
      {q:'4bit画素Xに白マスク1111をANDすると、結果はどうなるか。',c:['必ず0000','Xがそのまま残る','必ず1111','Xを反転する'],a:1,why:'各bitで x AND 1 = x なので元の画素が保持される。',link:'b5-3'},
      {q:'画像編集で背景だけを選びたい。ヒストグラムを見る主な理由はどれか。',c:['ファイル名を知るため','背景と対象で多く現れる階調の範囲を判断するため','画素を必ずRGBへ変換するため','著作権者を判定するため'],a:1,why:'階調ごとの画素数の分布から、背景として選ぶ範囲を判断できる。',link:'b3-5'}
    ]},
    {title:'第3問型　条件を読み、プログラムを追跡・改善',lead:'来場者の到着時刻と体験時間から開始時刻・待ち時間を求める。配列の添字は1から始まるものとする。',material:'到着=[0,3,8,12]、体験時間=5。開始[1]=到着[1]。i=2から4まで、開始[i]=max(到着[i], 開始[i-1]+5)、待ち[i]=開始[i]-到着[i] とする。',qs:[
      {q:'開始[2] はいくつか。',c:['3','5','8','10'],a:1,why:'max(3,0+5)=5。',link:'b6-6'},
      {q:'開始[3] と待ち[3] の組として正しいものはどれか。',c:['8,0','10,2','13,5','15,7'],a:1,why:'開始[3]=max(8,5+5)=10、待ち[3]=10-8=2。',link:'b7-2'},
      {q:'開始[4] と待ち[4] の組として正しいものはどれか。',c:['12,0','13,1','15,3','17,5'],a:2,why:'開始[4]=max(12,10+5)=15、待ち[4]=15-12=3。',link:'b7-2'},
      {q:'「最長待ち時間が10分以上になった候補は、それ以降の計算を打ち切る」改善の目的として最も適切なのはどれか。',c:['答えを必ず小さくする','条件を満たさないことが確定した後の不要な計算を省く','配列を0始まりに変える','乱数を使う'],a:1,why:'条件違反が確定した候補について残りを計算しても採用されないため、探索を早く終了できる。',link:'b6-1'}
    ]},
    {title:'第4問型　データを処理し、分析の妥当性まで判断',lead:'イベント来場予測のデータを整理・分析する。計算値だけでなく、そこから何が言えるかを判断する。',qs:[
      {q:'気温データが欠損している日を一律0℃として扱うことが不適切になり得る主な理由はどれか。',c:['0は数字ではないから','欠損は「0という観測値」とは意味が異なるから','平均値を計算できなくなるから','散布図には0を使えないから'],a:1,why:'欠損は値が観測・取得できていない状態で、実測値0とは区別して前処理する。',link:'b9-1'},
      {q:'データ [1,2,4,6,8,9] の中央値はいくつか。',c:['4','5','6','30'],a:1,why:'6個なので中央の3番目4と4番目6の平均で5。',link:'b9-2'},
      {q:'相関係数 r=-0.82 から直接言えることとして最も適切なのはどれか。',c:['強い負の直線的関係がみられる','一方が他方の原因である','必ず回帰予測が正確である','外れ値が存在しない'],a:0,why:'相関係数は直線的な関係の向きと強さの手掛かり。因果関係までは示さない。',link:'b9-3'},
      {q:'回帰式 y=0.5x-2 で x=8 のとき、予測値yはいくつか。',c:['1','2','4','6'],a:1,why:'0.5×8-2=2。計算後は、その補正・予測が目的に合うかも別に評価する必要がある。',link:'b9-4'}
    ]}
  ];
  const flat=sections.flatMap((s,si)=>s.qs.map((q,qi)=>({...q,si,qi,id:`${si}-${qi}`})));
  const esc=v=>typeof escapeHTML==='function'?escapeHTML(v):String(v);
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(_){return{};}};
  const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v));}catch(_){}};
  let timerId=null;
  function render(){
    const anchor=document.querySelector('.ct-sets-v7')||document.querySelector('.tool-note-panel');if(!anchor||document.querySelector('.mini-mock-v10'))return;
    const state=load();
    anchor.insertAdjacentHTML('afterend',`<section class="mini-mock-v10" data-mini-mock>
      <header><div><span>MINI MOCK / 30 MIN</span><h2>共通テスト型・短縮模試</h2><p>4大問型・16問。教材知識をそのまま聞かず、身近な場面・図式・プログラム・データへ移して判断します。</p></div><div class="mini-mock-clock"><span>残り時間</span><strong data-mock-time>30:00</strong><button type="button" data-mock-start>${state.startedAt?'再開':'開始する'}</button></div></header>
      <div class="mini-mock-status"><span data-mock-answered>回答 0 / ${flat.length}</span><div>${flat.map((q,i)=>`<a href="#mock-q-${q.id}" data-mock-nav="${q.id}">${i+1}</a>`).join('')}</div></div>
      <div class="mini-mock-sections">${sections.map((s,si)=>`<section><div class="mini-mock-section-head"><b>第${si+1}問</b><div><h3>${esc(s.title)}</h3><p>${esc(s.lead)}</p>${s.material?`<aside>${esc(s.material)}</aside>`:''}</div></div>${s.qs.map((q,qi)=>{const id=`${si}-${qi}`,picked=state.answers?.[id];return `<article id="mock-q-${id}" data-mock-q="${id}"><p><span>${si+1}-${qi+1}</span>${esc(q.q)}</p><div class="mini-mock-choices">${q.c.map((c,ci)=>`<button type="button" data-pick="${ci}" class="${picked===ci?'is-picked':''}">${ci+1}. ${esc(c)}</button>`).join('')}</div><div class="mini-mock-explain" data-explain hidden></div></article>`}).join('')}</section>`).join('')}</div>
      <footer><button type="button" data-mock-submit>採点する</button><button type="button" data-mock-reset>最初からやり直す</button><p data-mock-result>すべて解き終わったら採点してください。</p></footer>
    </section>`);
    bind();update();
  }
  function bind(){
    const root=document.querySelector('[data-mini-mock]');if(!root)return;
    root.querySelectorAll('[data-mock-q]').forEach(card=>card.querySelectorAll('[data-pick]').forEach(btn=>btn.addEventListener('click',()=>{const state=load();state.answers=state.answers||{};state.answers[card.dataset.mockQ]=Number(btn.dataset.pick);save(state);card.querySelectorAll('[data-pick]').forEach(x=>x.classList.toggle('is-picked',x===btn));update();})));
    root.querySelector('[data-mock-start]').addEventListener('click',()=>{const state=load();if(!state.startedAt||state.submitted){state.startedAt=Date.now();state.submitted=false;state.answers=state.answers||{};save(state);}startTimer();update();});
    root.querySelector('[data-mock-submit]').addEventListener('click',submit);
    root.querySelector('[data-mock-reset]').addEventListener('click',()=>{if(!confirm('短縮模試の回答をすべて消しますか？'))return;localStorage.removeItem(KEY);clearInterval(timerId);document.querySelector('[data-mini-mock]').remove();render();});
    if(load().startedAt&&!load().submitted)startTimer();
  }
  function startTimer(){clearInterval(timerId);timerId=setInterval(()=>{const state=load();if(!state.startedAt||state.submitted){clearInterval(timerId);return;}const remain=Math.max(0,DURATION-Math.floor((Date.now()-state.startedAt)/1000));paintTime(remain);if(remain===0){clearInterval(timerId);submit(true);}},1000);}
  function paintTime(remain){const el=document.querySelector('[data-mock-time]');if(!el)return;el.textContent=`${String(Math.floor(remain/60)).padStart(2,'0')}:${String(remain%60).padStart(2,'0')}`;el.classList.toggle('is-low',remain<=300);}
  function update(){const root=document.querySelector('[data-mini-mock]');if(!root)return;const state=load(),answers=state.answers||{},count=Object.keys(answers).length;root.querySelector('[data-mock-answered]').textContent=`回答 ${count} / ${flat.length}`;root.querySelectorAll('[data-mock-nav]').forEach(a=>a.classList.toggle('is-answered',answers[a.dataset.mockNav]!==undefined));if(state.startedAt&&!state.submitted)paintTime(Math.max(0,DURATION-Math.floor((Date.now()-state.startedAt)/1000)));if(state.submitted)showResult(state);}
  function submit(auto=false){const state=load();state.submitted=true;state.submittedAt=Date.now();save(state);clearInterval(timerId);showResult(state,auto);}
  function showResult(state,auto=false){
    const root=document.querySelector('[data-mini-mock]');if(!root)return;const answers=state.answers||{};let total=0;const sectionScores=sections.map(()=>[0,0]);
    flat.forEach(q=>{sectionScores[q.si][1]++;const correct=answers[q.id]===q.a;if(correct){total++;sectionScores[q.si][0]++;}const card=root.querySelector(`[data-mock-q="${q.id}"]`);card?.classList.toggle('is-correct',correct);card?.classList.toggle('is-wrong',!correct);card?.querySelectorAll('[data-pick]').forEach(b=>b.classList.toggle('is-answer',Number(b.dataset.pick)===q.a));const box=card?.querySelector('[data-explain]');if(box){box.hidden=false;box.innerHTML=`<b>${correct?'正解':'正解は '+(q.a+1)}</b><p>${esc(q.why)}</p><a href="lesson.html?id=${q.link}">このPARTを復習 →</a>`;}});
    const pct=Math.round(total/flat.length*100);root.querySelector('[data-mock-result]').innerHTML=`<strong>${total} / ${flat.length}（${pct}%）</strong>　${sectionScores.map((x,i)=>`第${i+1}問 ${x[0]}/${x[1]}`).join(' ・ ')}${auto?'　時間終了':''}`;root.querySelector('[data-mock-submit]').disabled=true;root.querySelector('[data-mock-start]').textContent='終了';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();