/* 情報Ⅰ＜プログラミング編＞ v16 — 48講横断の用語・教材順・転移演習整合 */
(() => {
  const lessons=window.STUDY_PROGRAMMING||[];
  const source=window.PROGRAM_SOURCE_V9||{};
  const middle=window.PROGRAM_MIDDLE_V9||{};
  const advanced=window.PROGRAM_ADVANCED_V9||{};
  const get=id=>lessons.find(x=>x.id===id);

  // 原教材は「配列」「添字（インデックス）」を基本表記とする。
  // コード中の name_index / min_index などの変数名は変更しない。
  const normalize=s=>String(s??'')
    .replace(/行index\s*/g,'行の添字')
    .replace(/列index\s*/g,'列の添字')
    .replace(/index\s*(\d+)/g,'添字$1')
    .replace(/\bindex\b/g,'添字')
    .replace(/リスト/g,'配列');

  const normalizeLesson=x=>{
    if(!x)return;
    x.goals=(x.goals||[]).map(normalize);
    if(typeof x.lead==='string')x.lead=normalize(x.lead);
    (x.points||[]).forEach(p=>{p.title=normalize(p.title);p.body=normalize(p.body);});
    if(x.quiz){x.quiz.question=normalize(x.quiz.question);x.quiz.explanation=normalize(x.quiz.explanation);}
    x.terms=(x.terms||[]).map(normalize);
  };
  lessons.forEach(normalizeLesson);
  Object.values(source).forEach(d=>{if(!d)return;['core','read','pitfall','drill'].forEach(k=>{if(typeof d[k]==='string')d[k]=normalize(d[k]);});});
  Object.values(middle).forEach(d=>{if(!d)return;['title','q','a','point'].forEach(k=>{if(typeof d[k]==='string')d[k]=normalize(d[k]);});});
  Object.values(advanced).forEach(d=>{if(!d)return;if(typeof d.title==='string')d.title=normalize(d.title);d.conditions=(d.conditions||[]).map(normalize);if(typeof d.focus==='string')d.focus=normalize(d.focus);if(typeof d.check==='string')d.check=normalize(d.check);});

  // 第4講では原教材がまだ「論理値」という用語を導入していないため、True / False の結果として説明する。
  const p4=get('p4');
  if(p4?.points?.[2]){
    p4.points[2].title='結果は True / False';
    p4.points[2].body='比較式の結果は True または False で表示されます。教材例 a=5,b=3 では a>b，a!=b，a>=b が True，a<b，a==b，a<=b が False です。';
  }

  // 第15・19講では原教材の表記「引数」を優先し、未導入の実引数／仮引数という分類を前面に出さない。
  const p19=get('p19');
  if(p19){
    if(p19.points?.[0])p19.points[0].body='呼び出し側の Numbers を calculate_sum(Numbers) として関数へ渡し，関数内では引数 Arr として同じ配列データを処理します。';
    p19.terms=(p19.terms||[]).filter(t=>t!=='仮引数');
  }
  if(middle.p15){
    middle.p15.a='result=12。triple(4) と呼び出すと x=4 となり，y=3×4=12，return で12が呼び出し元へ返る。';
    middle.p15.point='呼び出し時の値→関数内部の計算→戻り値の順を追う。';
  }

  // 第18講：原教材が扱うのは input と random.choice の役割分担。入力値の型に話を広げない。
  if(middle.p18){
    middle.p18.a='user には利用者が input で入力した値，computer には Hand から random.choice が選んだ1要素が入る。';
    middle.p18.point='利用者が入力する値と，配列からランダムに選ばれる値を別々に追う。';
  }

  // 第30講：教材どおり temp を用いる隣接比較・交換を反復する。後の第44講で初めて名称を学ぶ構成を崩さない。
  if(middle.p30){
    Object.assign(middle.p30,{
      title:'隣り合う要素を比較・交換して並べ替える',
      code:`Numbers = [3,1,2]\nfor i in range(len(Numbers)):\n    for j in range(len(Numbers)-i-1):\n        if Numbers[j] > Numbers[j+1]:\n            temp = Numbers[j]\n            Numbers[j] = Numbers[j+1]\n            Numbers[j+1] = temp\nprint(Numbers)`,
      q:'最終的に表示される配列を答え、交換が起きる比較を順に説明してください。',
      a:'[1,2,3]。最初に3>1で交換して[1,3,2]、次に3>2で交換して[1,2,3]となる。その後は順序が変わらない。',
      point:'教材と同じ「隣接比較→tempで交換→比較範囲を短くする」流れを途中配列で追う。'
    });
  }

  // 第31講：append の学習に未学の条件抽出を混ぜず、教材の確認問題と同じ形で定着させる。
  if(middle.p31){
    Object.assign(middle.p31,{
      title:'appendで配列の末尾へ要素を追加する',
      code:`Subjects = ['国語','数学']\nSubjects.append('英語')\nprint(Subjects)`,
      q:'表示される配列を答え、append の丸括弧内を引用符で囲む理由を説明してください。',
      a:"['国語','数学','英語']。追加する「英語」は文字列そのものなので、教材確認問題どおり引用符で囲んで Subjects.append('英語') と書く。",
      point:'append(value) が「配列の末尾へ1要素を追加する」ことと、文字列の引用符を確認する。'
    });
  }

  // 第32講：二重forによる一般走査へ広げず、教材の2行×同じ添字という構造をそのまま練習する。
  if(middle.p32){
    Object.assign(middle.p32,{
      title:'2行の対応する要素を同じ添字で読む',
      code:`Fruits_and_numbers = [\n    ['りんご','みかん','バナナ'],\n    [10,12,18]\n]\nnum = len(Fruits_and_numbers[1])\nfor i in range(num):\n    print(Fruits_and_numbers[1][i], '個の', Fruits_and_numbers[0][i])`,
      q:'num が3になる理由と、i=1 のときに取り出す2つの値を答えてください。',
      a:'Fruits_and_numbers[1] の要素数が3なので num=3。i=1 では [1][1] から12、[0][1] から「みかん」を取り出し、「12個のみかん」と表示する。',
      point:'第1の添字で行、第2の添字 i で同じ列を指定し、対応する2つの値を組にする。'
    });
  }

  // コード読解ガイドも、returnだけの教材例では「出力」ではなく「戻り値」を最後に確認する。
  const baseRender=window.renderStudyLesson;
  function post(){
    const id=new URLSearchParams(location.search).get('id')||'';
    const lesson=typeof studyLessonById==='function'?studyLessonById(id):null;
    if(!lesson||lesson.track!=='programming')return;
    const code=String(lesson.code||'');
    if(/\breturn\b/.test(code)&&!/^\s*print\s*\(/m.test(code)){
      const items=document.querySelectorAll('.program-reading-v6 ol li');
      const last=items[items.length-1];
      if(last)last.textContent='最後に、return でどの値が呼び出し元へ返るかを確認する。';
    }
  }
  window.renderStudyLesson=function renderProgrammingConsistencyV16(){baseRender();post();};
  window.PROGRAMMING_CONSISTENCY_V16=true;
})();