/* 電子教材レンダラー v1 — 本編47PART専用。
   プログラミング48講は既存レンダラーをそのまま使う。 */
(() => {
  const baseRender = window.renderStudyLesson;
  const rich = window.ELECTRONIC_TEXTBOOK_V1 || {};

  function visualItems(data) {
    return data.visual.items.map((item, i) => {
      const [head, body] = String(item).split('｜');
      return `<div class="et-visual-item"><b>${escapeHTML(head)}</b>${body ? `<span>${escapeHTML(body)}</span>` : ''}</div>`;
    }).join('');
  }

  function genericVisual(data) {
    const kind = escapeHTML(data.visual.kind || 'cards');
    return `<div class="et-visual et-${kind}">
      <div class="et-visual-items">${visualItems(data)}</div>
    </div>`;
  }

  function graphAxisVisual() {
    const vals = [1260,1300,1340,1380,1420];
    const bars = vals.map((v,i)=>`<i style="height:${34+i*9}px"><small>${v}</small></i>`).join('');
    const barsZoom = vals.map((v,i)=>`<i style="height:${22+i*17}px"><small>${v}</small></i>`).join('');
    return `<div class="et-two-figures">
      <figure><figcaption>0から見る</figcaption><div class="et-bars">${bars}</div><p>差は比較的小さく見える</p></figure>
      <figure><figcaption>途中から見る</figcaption><div class="et-bars et-bars-zoom">${barsZoom}</div><p>同じ値でも増加が強調される</p></figure>
    </div>`;
  }

  function binaryVisual() {
    return `<div class="et-interactive et-binary" data-et-binary>
      <p class="et-interactive-help">各桁をクリックして 0 / 1 を切り替える</p>
      <div class="et-bit-row">
        ${[8,4,2,1].map((w,i)=>`<button type="button" class="et-bit" data-weight="${w}" data-on="${i===0||i===1||i===3?'1':'0'}"><small>${w}の位</small><strong>${i===0||i===1||i===3?'1':'0'}</strong></button>`).join('')}
      </div>
      <div class="et-binary-result"><span>2進法 <b data-binary-value>1101</b></span><span>10進法 <b data-decimal-value>13</b></span></div>
    </div>`;
  }

  function rgbVisual() {
    return `<div class="et-interactive et-rgb" data-et-rgb>
      <div class="et-rgb-preview" data-rgb-preview aria-label="RGB preview"></div>
      <div class="et-rgb-controls">
        ${['R','G','B'].map((x,i)=>`<label><span>${x}</span><input type="range" min="0" max="255" value="${[45,107,152][i]}" data-rgb="${x}"><output>${[45,107,152][i]}</output></label>`).join('')}
      </div>
      <p>R・G・Bをそれぞれ0〜255の256段階で組み合わせる。</p>
    </div>`;
  }

  function logicVisual() {
    return `<div class="et-interactive et-logic" data-et-logic>
      <div class="et-switches">
        <button type="button" data-logic-a data-on="1">A = <b>1</b></button>
        <button type="button" data-logic-b data-on="0">B = <b>0</b></button>
      </div>
      <div class="et-logic-output">
        <span>AND <b data-and>0</b></span><span>OR <b data-or>1</b></span><span>NOT A <b data-not>0</b></span>
      </div>
    </div>`;
  }

  function diceVisual() {
    return `<div class="et-interactive et-dice" data-et-dice>
      <div class="et-dice-actions"><button type="button" data-dice-count="60">60回</button><button type="button" data-dice-count="600">600回</button><button type="button" data-dice-count="6000">6000回</button></div>
      <div class="et-dice-bars">${[1,2,3,4,5,6].map(n=>`<div><i data-dice-bar="${n}" style="height:2px"></i><small>${n}</small><b data-dice-num="${n}">0</b></div>`).join('')}</div>
      <p data-dice-note>試行回数を選ぶと、各出目の回数をシミュレーションします。</p>
    </div>`;
  }

  function scatterVisual() {
    const sets = {
      positive:[[8,82],[20,72],[29,68],[40,54],[53,47],[64,35],[78,27],[88,18]],
      negative:[[8,20],[20,29],[31,34],[42,45],[54,51],[65,63],[78,70],[89,82]],
      none:[[8,42],[20,76],[31,24],[42,64],[54,37],[65,82],[77,51],[89,29]]
    };
    const dots = sets.positive.map(([x,y])=>`<i style="left:${x}%;top:${y}%"></i>`).join('');
    return `<div class="et-interactive et-scatter" data-et-scatter>
      <div class="et-scatter-actions"><button type="button" data-scatter="positive">正の相関</button><button type="button" data-scatter="negative">負の相関</button><button type="button" data-scatter="none">相関が弱い</button></div>
      <div class="et-scatter-plot" data-scatter-plot>${dots}</div>
      <p data-scatter-label>右肩上がり → 正の相関</p>
    </div>`;
  }

  function regressionVisual() {
    return `<div class="et-regression-demo">
      <div class="et-regression-plot">
        <i style="left:12%;top:73%"></i><i style="left:25%;top:65%"></i><i style="left:36%;top:57%"></i><i style="left:50%;top:51%"></i><i style="left:63%;top:36%"></i><i style="left:78%;top:30%"></i><i style="left:88%;top:20%"></i>
        <b class="et-reg-line"></b>
      </div>
      <div class="et-reg-caption"><span>独立変数 X</span><span>従属変数 Y</span><strong>点と直線のY方向の差＝残差</strong></div>
    </div>`;
  }

  function databaseVisual() {
    return `<div class="et-db-demo">
      <div><b>書籍テーブル</b><table><tr><th>書籍ID</th><th>書籍名</th><th>著者ID</th></tr><tr><td>S1</td><td>書籍A</td><td>T1</td></tr><tr><td>S2</td><td>書籍B</td><td>T2</td></tr></table></div>
      <span class="et-db-arrow">結合 →</span>
      <div><b>著者テーブル</b><table><tr><th>著者ID</th><th>著者</th></tr><tr><td>T1</td><td>著者A</td></tr><tr><td>T2</td><td>著者B</td></tr></table></div>
    </div>`;
  }

  function samplingVisual() {
    const heights=[25,46,66,82,75,52];
    return `<div class="et-sampling-demo">
      <div class="et-wave-line"></div>
      ${heights.map((h,i)=>`<span style="left:${8+i*17}%;bottom:${h}%"><i></i><b>${[5,9,12,14,13,10][i]}</b></span>`).join('')}
      <small>一定間隔で値を取り出す → 段階値を割り当てる → 2進法へ</small>
    </div>`;
  }

  function ciaVisual() {
    return `<div class="et-cia-demo"><div><strong>C</strong><span>機密性</span></div><div><strong>I</strong><span>完全性</span></div><div><strong>A</strong><span>可用性</span></div><p>3つを同時に意識して情報を安全に保つ</p></div>`;
  }

  function pdcaVisual() {
    return `<div class="et-pdca-demo"><div>Plan<small>計画</small></div><span>→</span><div>Do<small>実行</small></div><span>→</span><div>Check<small>評価</small></div><span>→</span><div>Act<small>改善</small></div><b>↺</b></div>`;
  }

  function specialVisual(data) {
    switch (data.interactive) {
      case 'graph-axis': return graphAxisVisual();
      case 'binary': return binaryVisual();
      case 'rgb': return rgbVisual();
      case 'logic': return logicVisual();
      case 'dice': return diceVisual();
      case 'scatter': return scatterVisual();
      case 'regression': return regressionVisual();
      case 'database': return databaseVisual();
      case 'sampling': return samplingVisual();
      case 'cia': return ciaVisual();
      case 'pdca': return pdcaVisual();
      default: return genericVisual(data);
    }
  }

  function figureHTML(data) {
    return `<section class="lesson-section et-figure-section" id="figure">
      <p class="lesson-section-label">VISUAL</p>
      <h2>図でつかむ</h2>
      <p class="et-section-lead">文章を読む前に、まず関係と流れを一枚で整理します。</p>
      <figure class="et-figure"><figcaption>${escapeHTML(data.visual.title)}</figcaption>${specialVisual(data)}</figure>
    </section>`;
  }

  function workedHTML(data) {
    return `<section class="lesson-section et-worked-section" id="example">
      <p class="lesson-section-label">WORKED EXAMPLE</p>
      <h2>例題を解く</h2>
      <div class="et-worked">
        <div class="et-worked-question"><span>例題</span><p>${escapeHTML(data.worked.problem)}</p></div>
        <div class="et-reasoning">
          <strong>考え方</strong>
          <ol>${data.worked.steps.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ol>
        </div>
        <details class="et-answer"><summary>答えと確認ポイントを見る</summary><p>${escapeHTML(data.worked.answer)}</p></details>
      </div>
    </section>`;
  }

  function summaryHTML(data) {
    return `<section class="lesson-section et-summary-section" id="summary">
      <p class="lesson-section-label">SUMMARY</p>
      <h2>このPARTのまとめ</h2>
      <div class="et-summary">${data.summary.map((s,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><p>${escapeHTML(s)}</p></div>`).join('')}</div>
    </section>`;
  }

  function routeHTML() {
    return `<nav class="et-route" aria-label="このPARTの学習順序">
      <a href="#goals"><b>1</b><span>目標</span></a>
      <a href="#figure"><b>2</b><span>図解</span></a>
      <a href="#points"><b>3</b><span>要点</span></a>
      <a href="#example"><b>4</b><span>例題</span></a>
      <a href="#check"><b>5</b><span>確認</span></a>
      <a href="#summary"><b>6</b><span>まとめ</span></a>
    </nav>`;
  }

  function bindElectronicInteractions() {
    const binary=document.querySelector('[data-et-binary]');
    if(binary){
      const update=()=>{
        let decimal=0, bits='';
        binary.querySelectorAll('.et-bit').forEach(btn=>{
          const on=btn.dataset.on==='1';
          bits+=on?'1':'0';
          if(on) decimal+=Number(btn.dataset.weight);
          btn.querySelector('strong').textContent=on?'1':'0';
          btn.classList.toggle('is-on',on);
        });
        binary.querySelector('[data-binary-value]').textContent=bits;
        binary.querySelector('[data-decimal-value]').textContent=decimal;
      };
      binary.querySelectorAll('.et-bit').forEach(btn=>btn.addEventListener('click',()=>{btn.dataset.on=btn.dataset.on==='1'?'0':'1';update();}));
      update();
    }

    const rgb=document.querySelector('[data-et-rgb]');
    if(rgb){
      const update=()=>{
        const vals={};
        rgb.querySelectorAll('[data-rgb]').forEach(input=>{vals[input.dataset.rgb]=Number(input.value);input.nextElementSibling.value=input.value;});
        rgb.querySelector('[data-rgb-preview]').style.background=`rgb(${vals.R},${vals.G},${vals.B})`;
      };
      rgb.querySelectorAll('[data-rgb]').forEach(input=>input.addEventListener('input',update)); update();
    }

    const logic=document.querySelector('[data-et-logic]');
    if(logic){
      const a=logic.querySelector('[data-logic-a]'), b=logic.querySelector('[data-logic-b]');
      const update=()=>{
        const A=Number(a.dataset.on), B=Number(b.dataset.on);
        a.querySelector('b').textContent=A; b.querySelector('b').textContent=B;
        a.classList.toggle('is-on',!!A); b.classList.toggle('is-on',!!B);
        logic.querySelector('[data-and]').textContent=A&&B?1:0;
        logic.querySelector('[data-or]').textContent=A||B?1:0;
        logic.querySelector('[data-not]').textContent=A?0:1;
      };
      [a,b].forEach(x=>x.addEventListener('click',()=>{x.dataset.on=x.dataset.on==='1'?'0':'1';update();})); update();
    }

    const dice=document.querySelector('[data-et-dice]');
    if(dice){
      dice.querySelectorAll('[data-dice-count]').forEach(btn=>btn.addEventListener('click',()=>{
        const n=Number(btn.dataset.diceCount), counts=[0,0,0,0,0,0];
        for(let i=0;i<n;i++) counts[Math.floor(Math.random()*6)]++;
        const max=Math.max(...counts);
        counts.forEach((c,i)=>{
          dice.querySelector(`[data-dice-bar="${i+1}"]`).style.height=`${Math.max(4,c/max*82)}px`;
          dice.querySelector(`[data-dice-num="${i+1}"]`).textContent=c;
        });
        dice.querySelector('[data-dice-note]').textContent=`${n}回試行。割合は実行するたびに少しずつ変わります。`;
      }));
    }

    const scatter=document.querySelector('[data-et-scatter]');
    if(scatter){
      const sets={positive:[[8,82],[20,72],[29,68],[40,54],[53,47],[64,35],[78,27],[88,18]],negative:[[8,20],[20,29],[31,34],[42,45],[54,51],[65,63],[78,70],[89,82]],none:[[8,42],[20,76],[31,24],[42,64],[54,37],[65,82],[77,51],[89,29]]};
      const labels={positive:'右肩上がり → 正の相関',negative:'右肩下がり → 負の相関',none:'一定の向きが見えない → 相関が弱い／ない'};
      scatter.querySelectorAll('[data-scatter]').forEach(btn=>btn.addEventListener('click',()=>{
        const key=btn.dataset.scatter;
        scatter.querySelector('[data-scatter-plot]').innerHTML=sets[key].map(([x,y])=>`<i style="left:${x}%;top:${y}%"></i>`).join('');
        scatter.querySelector('[data-scatter-label]').textContent=labels[key];
      }));
    }
  }

  window.renderStudyLesson = function renderElectronicStudyLesson() {
    const params=new URLSearchParams(location.search);
    const id=params.get('id') || 'b1-1';
    const lesson=studyLessonById(id);
    if(!lesson || lesson.track!=='main' || !rich[id]) return baseRender();

    const data=rich[id];
    localStorage.setItem(STORAGE_LAST,lesson.id);
    document.title=`${lesson.title}｜情報Ⅰ 学習ライブラリ`;
    document.body.classList.add('lesson-body','electronic-textbook');
    const [done,total]=lessonTrackProgress(lesson);

    document.body.innerHTML=`${renderStudyHeader('home')}
      <button id="mobileSyllabus" class="mobile-syllabus-button" type="button">目次を開く　${escapeHTML(lessonLabel(lesson))}</button>
      <div class="sidebar-overlay"></div>
      <main class="lesson-layout">
        <aside class="lesson-sidebar" aria-label="学習目次">
          <div class="sidebar-head"><strong>本編 9講 / 47 PART</strong><span class="sidebar-progress">${done}/${total} 完了</span></div>
          ${sidebarForLesson(lesson)}
        </aside>
        <article class="lesson-paper et-paper">
          <p class="lesson-breadcrumb"><a href="index.html">本編</a>　/　${escapeHTML(lessonLabel(lesson))}</p>
          <p class="lesson-kicker">${escapeHTML(lessonLabel(lesson))}</p>
          <h1 class="lesson-title">${escapeHTML(lesson.title)}</h1>
          <p class="lesson-lead">${escapeHTML(lesson.lead)}</p>
          ${routeHTML()}

          <div class="lesson-goals" id="goals">
            <strong>このPARTでできるようになること</strong>
            <ul>${lesson.goals.map(g=>`<li>${escapeHTML(g)}</li>`).join('')}</ul>
          </div>
          ${termsHTML(lesson)}

          ${figureHTML(data)}

          <section class="lesson-section" id="points">
            <p class="lesson-section-label">KEY POINTS</p>
            <h2>要点を理解する</h2>
            <p class="et-section-lead">用語を暗記する前に、「何と何を区別するのか」「どの順番で考えるのか」を押さえます。</p>
            ${lesson.points.map(conceptHTML).join('')}
            ${lesson.note?`<p class="lesson-note"><strong>注意：</strong> ${escapeHTML(lesson.note)}</p>`:''}
          </section>

          ${codeHTML(lesson)}
          ${workedHTML(data)}
          ${quizHTML(lesson)}
          ${summaryHTML(data)}

          <p class="lesson-source">学習範囲：${escapeHTML(lesson.source)}。提供教材の用語・構成・扱う範囲を基準に、図解と例題をWeb自学用に再構成しています。</p>
          <div class="lesson-complete">
            <div>${progressHTML(done,total)}</div>
            <button id="completeLesson" class="complete-button" type="button">このPARTを完了にする</button>
          </div>
          ${nextPrevHTML(lesson)}
        </article>
      </main>`;

    bindQuiz(document,lesson);
    bindComplete(document,lesson);
    bindMobileSyllabus();
    bindElectronicInteractions();
  };
})();
