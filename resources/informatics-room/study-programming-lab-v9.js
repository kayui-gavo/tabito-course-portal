/* 情報Ⅰ＜プログラミング編＞ v9 — 48講 interactive code-reading lab */
(() => {
  const baseRender=window.renderStudyLesson;
  const STORE='tabito-info-program-note-v9';
  const readStore=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'{}');}catch(_){return{};}};
  const saveStore=v=>{try{localStorage.setItem(STORE,JSON.stringify(v));}catch(_){}};
  const current=()=>{
    const id=new URLSearchParams(location.search).get('id')||'';
    return {id,lesson:typeof studyLessonById==='function'?studyLessonById(id):null};
  };
  const role=line=>{
    const s=String(line||'').trim();
    if(!s)return ['空行','処理の区切り'];
    if(s.startsWith('#'))return ['コメント','実行されない説明'];
    if(/^import\s|^from\s/.test(s))return ['モジュール','外部の機能を使えるようにする'];
    if(/^def\s/.test(s))return ['関数定義','この時点では関数本体を実行せず、処理を定義する'];
    if(/^return\b/.test(s))return ['戻り値','関数の結果を呼び出し元へ返す'];
    if(/^for\s/.test(s))return ['反復','指定された範囲・要素について字下げ部分を繰り返す'];
    if(/^while\s/.test(s))return ['条件付き反復','条件がTrueである間、字下げ部分を繰り返す'];
    if(/^if\s/.test(s))return ['条件分岐','条件をTrue/Falseにして、実行する処理を選ぶ'];
    if(/^elif\s/.test(s))return ['追加条件','前の条件が成立しなかった場合に次の条件を判定する'];
    if(/^else\s*:/.test(s))return ['それ以外','それまでの条件が成立しなかった場合の処理へ進む'];
    if(/\.append\s*\(/.test(s))return ['配列更新','配列の末尾へ要素を追加する'];
    if(/^print\s*\(/.test(s))return ['出力','括弧内の値を画面へ表示する'];
    if(/^input\s*\(/.test(s)||/=\s*input\s*\(/.test(s))return ['入力','利用者から受け取った値を変数へ入れる'];
    if(/(^|[^=!<>])=([^=]|$)/.test(s))return ['代入・更新','右辺を計算して左辺の変数・要素へ入れる'];
    if(/\w+\s*\(/.test(s))return ['関数呼び出し','引数を渡して関数を実行し、必要なら戻り値を受け取る'];
    return ['処理','前後の変数・配列がどう変化するか確認する'];
  };
  function sourcePanel(id){
    const d=(window.PROGRAM_SOURCE_V9||{})[id]; if(!d)return'';
    return `<section class="program-source-v9" data-program-source-v9>
      <div class="program-source-v9-head"><span>TEXTBOOK NOTE</span><h3>この講で本当に追うもの</h3></div>
      <div class="program-source-v9-grid">
        <article><b>核になる考え方</b><p>${escapeHTML(d.core)}</p></article>
        <article><b>コードの読み方</b><p>${escapeHTML(d.read)}</p></article>
        <article><b>つまずきやすい点</b><p>${escapeHTML(d.pitfall)}</p></article>
        <article><b>手を動かす復習</b><p>${escapeHTML(d.drill)}</p></article>
      </div>
    </section>`;
  }
  function lineRows(code){
    return String(code||'').split('\n').map((line,i)=>{
      const [name]=role(line);
      return `<button type="button" class="program-lab-v9-line" data-line="${i}"><i>${String(i+1).padStart(2,'0')}</i><code>${escapeHTML(line||' ')}</code><span>${escapeHTML(name)}</span></button>`;
    }).join('');
  }
  function labHTML(id,lesson){
    const code=lesson.code||'';
    return `<section class="program-lab-v9" data-program-lab-v9 data-lesson="${escapeHTML(id)}">
      <header><div><span>INTERACTIVE TRACE</span><h3>1行ずつ、実行の意味を追う</h3></div><p>「次の行」で処理を進め、変数や配列の値を自分のメモに残します。コードを眺めるだけで終わらせず、値の更新を紙面化します。</p></header>
      <div class="program-lab-v9-layout">
        <div class="program-lab-v9-code">${lineRows(code)}</div>
        <aside class="program-lab-v9-side">
          <div class="program-lab-v9-step"><span>現在の行</span><strong data-trace-pos>01 / ${String(code).split('\n').length}</strong><b data-trace-role></b><p data-trace-desc></p><div><button type="button" data-trace-prev>← 前</button><button type="button" data-trace-next>次の行 →</button></div></div>
          <label class="program-lab-v9-memo"><span>変数・配列の追跡メモ</span><textarea rows="7" data-trace-memo placeholder="例：i=2, total=3 / A=[2,5] / 出力=..."></textarea><small>この端末に自動保存</small></label>
        </aside>
      </div>
      <details class="program-lab-v9-check"><summary>この講の追跡ルールを確認する</summary><p>${escapeHTML((window.PROGRAM_SOURCE_V9||{})[id]?.read||'各行で値がどう変わるかを順番に追います。')}</p></details>
    </section>`;
  }
  function bindLab(id,lesson){
    const root=document.querySelector('[data-program-lab-v9]'); if(!root)return;
    const lines=[...root.querySelectorAll('[data-line]')];
    let pos=0;
    const posEl=root.querySelector('[data-trace-pos]'),roleEl=root.querySelector('[data-trace-role]'),descEl=root.querySelector('[data-trace-desc]');
    const memo=root.querySelector('[data-trace-memo]');
    const stored=readStore(); memo.value=stored[id]||'';
    memo.addEventListener('input',()=>{const all=readStore();all[id]=memo.value;saveStore(all);});
    const paint=()=>{
      lines.forEach((line,i)=>line.classList.toggle('is-active',i===pos));
      lines[pos]?.scrollIntoView({block:'nearest'});
      const raw=String(lesson.code||'').split('\n')[pos]||'';
      const [name,desc]=role(raw);
      posEl.textContent=`${String(pos+1).padStart(2,'0')} / ${lines.length}`;
      roleEl.textContent=name; descEl.textContent=desc;
      root.querySelector('[data-trace-prev]').disabled=pos===0;
      root.querySelector('[data-trace-next]').disabled=pos===lines.length-1;
    };
    lines.forEach((line,i)=>line.addEventListener('click',()=>{pos=i;paint();}));
    root.querySelector('[data-trace-prev]').addEventListener('click',()=>{if(pos>0){pos--;paint();}});
    root.querySelector('[data-trace-next]').addEventListener('click',()=>{if(pos<lines.length-1){pos++;paint();}});
    paint();
  }
  function reorderByLevel(lesson,key,ex,lab){
    if(lesson.level==='初級'||!key||!ex)return;
    document.body.classList.add('program-prestudy-v9');
    const anchor=document.querySelector('.program-source-flow-v6')||document.querySelector('.lesson-goals');
    if(anchor){anchor.insertAdjacentElement('afterend',ex);ex.insertAdjacentElement('afterend',lab);}
    const h2=ex.querySelector('h2');if(h2)h2.textContent='まず例題コードを自力で追う';
    const intro=ex.querySelector('.program-intro-v6,.et-section-lead,.example-box');
    if(intro&&lesson.level!=='初級')intro.insertAdjacentHTML('beforebegin','<p class="program-prestudy-note-v9">中級・上級は、先に例題を解いてから解説へ進みます。実行結果を予想し、分からない行に印を付けてください。</p>');
  }
  function insert(id,lesson){
    const key=document.querySelector('.program-text-v6')||document.querySelector('#points');
    if(key&&!document.querySelector('[data-program-source-v9]')) key.insertAdjacentHTML('beforeend',sourcePanel(id));
    const ex=document.querySelector('.program-example-v6')||document.querySelector('#example');
    if(ex&&!document.querySelector('[data-program-lab-v9]')) ex.insertAdjacentHTML('afterend',labHTML(id,lesson));
    const lab=document.querySelector('[data-program-lab-v9]');
    if(lab)bindLab(id,lesson);
    reorderByLevel(lesson,key,ex,lab);
  }
  window.renderStudyLesson=function renderProgrammingLabV9(){
    baseRender();
    const {id,lesson}=current();
    if(!lesson||lesson.track!=='programming')return;
    document.body.classList.add('programming-v9');
    insert(id,lesson);
  };
})();