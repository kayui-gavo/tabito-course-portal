/* 情報Ⅰ＜プログラミング編＞ v10 — 実コードをブラウザ上で実行する */
(() => {
  const baseRender=window.renderStudyLesson;
  const STORE='tabito-info-python-v10';
  const workerUrl=new URL('python-worker.js',document.currentScript.src).href;
  const read=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'{}');}catch(_){return{};}};
  const save=v=>{try{localStorage.setItem(STORE,JSON.stringify(v));}catch(_){}};
  let worker=null,ready=null,nextId=1,pending=new Map();
  function ensureWorker(){
    if(worker&&ready)return ready;
    worker=new Worker(workerUrl);
    ready=new Promise((resolve,reject)=>{
      worker.addEventListener('message',e=>{
        const m=e.data||{};
        if(m.type==='ready')resolve();
        if(m.type==='load-error')reject(new Error(m.error||'Python実行環境を読み込めませんでした。'));
        if(m.type==='result'||m.type==='run-error'){
          const p=pending.get(m.id);if(!p)return;clearTimeout(p.timer);pending.delete(m.id);
          m.type==='result'?p.resolve(m.result):p.reject(new Error(m.error||'実行エラー'));
        }
      });
      worker.addEventListener('error',()=>reject(new Error('Python実行環境を読み込めませんでした。')),{once:true});
    });
    return ready;
  }
  async function run(code,stdin){
    await ensureWorker();
    const id=nextId++;
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{pending.delete(id);worker?.terminate();worker=null;ready=null;reject(new Error('実行時間が長すぎます。無限ループになっていないか確認してください。'));},4500);
      pending.set(id,{resolve,reject,timer});
      worker.postMessage({type:'run',id,code,exercise:{mode:'sandbox',stdin}});
    });
  }
  function current(){const id=new URLSearchParams(location.search).get('id')||'';return {id,lesson:typeof studyLessonById==='function'?studyLessonById(id):null};}
  function html(id,lesson){
    const state=read()[id]||{}; const code=state.code??lesson.code??''; const hasInput=/\binput\s*\(/.test(code);
    return `<section class="program-run-v10" data-program-run-v10>
      <header><div><span>RUN PYTHON</span><h3>予想してから、実際に動かす</h3></div><p>上の「コード読解」は行の役割を読むためのガイドです。ここでは本物のPythonを実行し、分岐・反復・関数呼び出しを含む実際の結果を確かめます。</p></header>
      <div class="program-run-v10-main">
        <div class="program-run-v10-editor"><label><span>Pythonコード</span><textarea rows="12" spellcheck="false" data-python-code>${escapeHTML(code)}</textarea></label>${hasInput?`<label class="program-stdin-v10"><span>input() に渡す値（1行につき1つ）</span><textarea rows="3" data-python-stdin placeholder="例：グー\n10">${escapeHTML(state.stdin||'')}</textarea></label>`:''}<div class="program-run-v10-actions"><button type="button" data-python-run>実行する</button><button type="button" data-python-reset>教材のコードに戻す</button><small>Ctrl / ⌘ + Enter でも実行</small></div></div>
        <aside class="program-run-v10-output"><div><span>標準出力</span><pre data-python-stdout>(まだ実行していません)</pre></div><div><span>エラー</span><pre data-python-stderr>(エラーはありません)</pre></div><p data-python-status>先に出力を予想してから実行してください。</p></aside>
      </div>
      <div class="program-run-v10-note"><b>共通テストへのつなぎ</b><p>共通テスト本番はPythonそのものではなく大学入試センター独自の表記を使います。ここでは構文暗記より、値・条件・配列・反復がどう変化するかを確認してください。</p></div>
    </section>`;
  }
  function bind(id,lesson){
    const root=document.querySelector('[data-program-run-v10]');if(!root)return;
    const code=root.querySelector('[data-python-code]'),stdin=root.querySelector('[data-python-stdin]'),runBtn=root.querySelector('[data-python-run]'),reset=root.querySelector('[data-python-reset]'),stdout=root.querySelector('[data-python-stdout]'),stderr=root.querySelector('[data-python-stderr]'),status=root.querySelector('[data-python-status]');
    const persist=()=>{const all=read();all[id]={code:code.value,stdin:stdin?.value||''};save(all);};
    code.addEventListener('input',persist);stdin?.addEventListener('input',persist);
    code.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const a=code.selectionStart,b=code.selectionEnd;code.value=code.value.slice(0,a)+'    '+code.value.slice(b);code.selectionStart=code.selectionEnd=a+4;persist();}if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();runBtn.click();}});
    reset.addEventListener('click',()=>{code.value=lesson.code||'';if(stdin)stdin.value='';persist();stdout.textContent='(まだ実行していません)';stderr.textContent='(エラーはありません)';status.textContent='教材のコードへ戻しました。まず結果を予想してください。';});
    runBtn.addEventListener('click',async()=>{
      runBtn.disabled=true;runBtn.textContent='実行中…';status.textContent='初回はPython実行環境の読み込みに少し時間がかかります。';
      try{const result=await run(code.value,(stdin?.value||'').split(/\r?\n/));stdout.textContent=result.stdout||'(出力はありません)';stderr.textContent=result.stderr||'(エラーはありません)';status.textContent=result.status==='error'?'エラー箇所を読み、どの行まで実行されたか確認してください。':`実行完了（約 ${result.runtimeMs} ms）。予想と一致したか確認してください。`;}
      catch(err){stderr.textContent=err.message;status.textContent='実行できませんでした。コードと入力値を確認してください。';}
      finally{runBtn.disabled=false;runBtn.textContent='実行する';}
    });
  }
  window.renderStudyLesson=function renderProgrammingRunV10(){baseRender();const {id,lesson}=current();if(!lesson||lesson.track!=='programming')return;const trace=document.querySelector('[data-program-lab-v9]');const target=trace||document.querySelector('.program-example-v6')||document.querySelector('#example');if(target&&!document.querySelector('[data-program-run-v10]')){target.insertAdjacentHTML('afterend',html(id,lesson));bind(id,lesson);}};
})();