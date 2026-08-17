/* 情報Ⅰ＜プログラミング編＞ v24 — 中級編の教材順・用語整合図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const C=K.C;
  const configs={
    p30:{
      title:'ソート：隣り合う2要素の比較と交換で並び順が変わる',height:760,
      caption:'教材第30講は Numbers=[3,1,4,1,5] を隣接比較と交換で昇順へ並べ、確認問題では比較条件を逆にして降順へ並べる。ここでは後の講で扱う方式名を先取りせず、コードの動きそのものを追う。',
      question:'昇順では Numbers[j] > Numbers[j+1] のとき交換するのに、降順ではなぜ「<」へ変わるのですか。',
      answer:'昇順は大きい値が左にある並びを交換し、降順は小さい値が左にある並びを交換するから。',
      draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'ソート（並べ替え）','教材の二重for文は、隣り合う2要素を比較し、目標の順序と逆ならtempを使って交換する。');
        const row=(y,arr,hiA=-1,hiB=-1,fixed=0,label='')=>{text(ctx,label,45,y+28,11,C.gray,700);arr.forEach((v,i)=>{const x=180+i*150,hot=i===hiA||i===hiB,done=i>=arr.length-fixed;rr(ctx,x,y,112,58,done?'#f3f9f8':hot?'#fff8f0':'#fff',done?'#cfe1d7':hot?'#e3d2bf':'#d7e1e6',7);text(ctx,String(v),x+56,y+29,17,hot?C.orange:done?C.green:C.navy,700,'center','middle');});};
        text(ctx,'A　例題：昇順は「左 > 右」なら交換',45,120,16,C.navy,700);row(155,[3,1,4,1,5],0,1,0,'開始');arrow(ctx,720,184,790,184,C.orange);text(ctx,'3 > 1 → 交換',910,188,11,C.orange,700,'center');row(240,[1,3,4,1,5],2,3,0,'途中');arrow(ctx,720,269,790,269,C.orange);text(ctx,'4 > 1 → 交換',910,273,11,C.orange,700,'center');row(325,[1,1,3,4,5],-1,-1,5,'完了');
        box(ctx,45,430,500,105,'比較範囲','外側 i が進むたび、右端側の確定済み部分を比較から外す。\n内側は range(len(Numbers)-i-1)。',{fill:'#f8fafb'});
        text(ctx,'B　確認問題：降順は比較条件だけを逆にする',610,430,16,C.navy,700);row(475,[3,1,4,1,5],0,1,0,'開始');box(ctx,610,570,525,95,'条件','Numbers[j] < Numbers[j+1] のとき交換\n→ [5,4,3,1,1]',{fill:'#fff8f0',stroke:'#e3d2bf'});
      }
    },
    p33:{
      title:'辞書型：添字ではなくキーで値を取り出す',height:650,
      caption:"教材例題は person['name'] → 太郎。確認問題は fruits['apple'] + fruits['cherry'] → 400。配列の位置指定と、辞書型のキー指定を区別する。",
      question:"配列の Numbers[0] と辞書の person['name'] は、[] の中身がどう違いますか。",
      answer:'配列は位置を表す整数の添字、辞書型は値に対応するキーを指定して取り出す。',
      draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'辞書型','教材では「キー : 値」の組から、キーを指定して対応する値を取り出すコードを読む。');
        text(ctx,'A　例題：person',45,120,16,C.navy,700);const pairs=[['name','太郎'],['age','20'],['country','日本']];pairs.forEach((p,i)=>{const y=155+i*85;box(ctx,80,y,210,62,`キー  '${p[0]}'`,'',{fill:'#eef6fa'});arrow(ctx,290,y+31,405,y+31,C.teal);box(ctx,405,y,230,62,`値  ${p[1]}`,'',{fill:'#fff'});});box(ctx,745,165,350,105,"person['name']",'キー name に対応する値\n→ 太郎',{fill:'#fff8f0',stroke:'#e3d2bf'});
        text(ctx,'B　確認問題：対応する値を取り出して足す',745,335,15,C.navy,700);box(ctx,745,370,350,135,"fruits['apple'] + fruits['cherry']",'100 + 300\n= 400',{fill:'#eef6fa',stroke:'#bfd1db'});
        rr(ctx,45,545,1090,55,'#f5f9fb','#d5e2e8',9);wrap(ctx,'配列は添字で位置を指定し、辞書型はキーを指定する。どちらも [] を使うため、中に何を指定しているかを先に読む。',70,560,1030,20,11,C.gray,400);
      }
    }
  };
  const baseRender=window.renderStudyLesson;
  function replace(){
    const id=new URLSearchParams(location.search).get('id')||'',lesson=typeof studyLessonById==='function'?studyLessonById(id):null,config=configs[id];
    if(!lesson||lesson.track!=='programming'||!config)return;
    if(document.querySelector(`[data-program-figure-v24="${id}"]`))return;
    const old=document.querySelector(`figure[data-figure-v12="${id}"]`);
    const section=K.makeSection(id,config);section.dataset.programFigureV24=id;
    if(old)old.replaceWith(section);else{const target=document.querySelector('.program-source-v9')||document.querySelector('.program-example-v6')||document.querySelector('#example');if(target)target.insertAdjacentElement('afterend',section);else document.querySelector('.lesson-paper')?.appendChild(section);}
    K.bindSection(section,config);
  }
  window.PROGRAM_FIGURE_V24_CONSISTENCY_COUNT=Object.keys(configs).length;
  window.renderStudyLesson=function renderProgramFiguresV24Consistency(){baseRender();replace();};
})();