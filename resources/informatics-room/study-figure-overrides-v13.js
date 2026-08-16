/* 情報Ⅰ v13 — ブラウザ実測で検出した図中文字衝突の最終修正 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const C=K.C;

  /* b5-5: 0.1の説明が右側「誤差」ボックスへ食い込まないよう、図中ラベルを短くする。
     詳細はcaption/本文で保持する。 */
  K.register('b5-5',{
    title:'有限bitの限界：2進小数の誤差とオーバーフロー',height:760,
    caption:'0.625は2進有限小数だが0.1は無限小数になる。有限bitで打ち切るため誤差が生じ、上限を超えるとオーバーフローが起きる。',
    question:'0.625₁₀ が 0.101₂ と有限桁で表せる理由を、1/2・1/4・1/8 の重みで説明できますか。',
    answer:'0.625 = 0.5 + 0.125 = 1/2 + 1/8 なので、0.101₂。',
    draw(ctx,k){const {text,wrap,rr,box,line,arrow,head,cell,axis}=k;head(ctx,'コンピュータの限界','10進法で有限小数でも2進法では無限小数になることがある。有限bitしかないため近似し、誤差が残る。');
      text(ctx,'A　2進小数の桁の重み',45,120,16,C.navy,700);const ws=[['1/2','0.5'],['1/4','0.25'],['1/8','0.125'],['1/16','0.0625'],['1/32','0.03125'],['1/64','0.015625']];ws.forEach((a,i)=>{const x=50+i*160;box(ctx,x,155,135,78,a[0],a[1],{fill:'#f8fafb',ts:13,bs:11});});
      text(ctx,'0.625₁₀',55,290,17,C.navy,700);const bitsA=['1','0','1','0','0','0'];bitsA.forEach((b,i)=>{cell(ctx,180+i*68,260,68,52,b,{fill:b==='1'?'#eef6fa':'#fff',fs:16});});text(ctx,'= 0.101₂',625,291,17,C.blue,700);
      text(ctx,'0.1₁₀',55,365,17,C.navy,700);const bitsB=['0','0','0','1','1','0'];bitsB.forEach((b,i)=>{cell(ctx,180+i*68,335,68,52,b,{fill:b==='1'?'#fff8f0':'#fff',fs:16});});text(ctx,'…（以後も続く）',625,366,11,C.orange,700,'left','alphabetic',115,9.5);
      rr(ctx,45,425,650,92,'#fff8f0','#e3d2bf',10);text(ctx,'打ち切り → 近似値',70,454,14,C.orange,700);wrap(ctx,'コンピュータは有限個のbitでしか保存できないため、途中で表現を打ち切る。比較演算では「見た目は同じ」に見えても内部値がわずかに違うことがある。',70,468,590,19,11,C.gray);
      text(ctx,'B　オーバーフロー：表現可能範囲を超える',760,120,16,C.navy,700);axis(ctx,785,200,320,80,'値','');const minX=820,maxX=1065;line(ctx,minX,190,minX,290,C.red,2);line(ctx,maxX,190,maxX,290,C.red,2);text(ctx,'下限',minX,183,10,C.red,700,'center');text(ctx,'上限',maxX,183,10,C.red,700,'center');ctx.fillStyle='#eaf4f8';ctx.fillRect(minX,220,maxX-minX,40);arrow(ctx,930,240,1110,240,C.orange,3);text(ctx,'演算結果',975,226,10,C.orange,700,'center');text(ctx,'範囲外',1115,244,11,C.red,700,'left','middle');
      box(ctx,760,340,375,105,'誤差','表現できる範囲内でも、有限bitの近似により値が少しずれる。',{fill:'#f8fafb'});box(ctx,760,475,375,105,'オーバーフロー','演算結果そのものが、用意されたbit数の表現上限を超える。',{fill:'#fff4f2',stroke:'#e3c8c4',tc:C.red});
      rr(ctx,45,570,650,120,'#f5f9fb','#d5e2e8',10);text(ctx,'比較の実務的な考え方',70,600,13,C.blue,700);wrap(ctx,'小数を「完全に等しいか」で比較すると意図しない結果になることがある。必要な桁に丸める、許容誤差を設けるなど、目的に合う比較方法を選ぶ。',70,615,590,19,11,C.gray);
    }
  });

  /* p43: 三行の条件式をboxタイトルへ詰め込まず、「判断名」と「式」を分ける。 */
  window.PROGRAM_FIGURE_OVERRIDES_V13=Object.assign(window.PROGRAM_FIGURE_OVERRIDES_V13||{}, {
    p43:{
      title:'FizzBuzz：複数条件を満たす「最も狭い条件」を先に判定する',height:720,
      caption:'教材確認問題は1〜100を走査し、3と5の両方で割り切れるときFizzBuzz、次に3のみ、5のみ、最後に数値そのものを出力する。',
      question:'なぜ「3の倍数」をFizzBuzzより先に判定してはいけないのですか。',
      answer:'15や30は3の倍数でもあるため、先にi%3==0を判定するとそこでFizzと出力され、FizzBuzzの分岐へ到達しないから。',
      draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'倍数判定・FizzBuzz','if / elif は上から順に判定され、最初にTrueになった分岐だけが実行される。');
        text(ctx,'判定順',45,120,15,C.navy,700);
        const steps=[['①  3かつ5の倍数','i % 3 == 0 and i % 5 == 0\n→ FizzBuzz'],['②  3の倍数','i % 3 == 0 → Fizz'],['③  5の倍数','i % 5 == 0 → Buzz'],['④  それ以外','i を表示']];
        steps.forEach((s,i)=>{const y=155+i*105;box(ctx,90,y,315,78,s[0],s[1],{fill:i===0?'#fff8f0':i===3?'#f8fafb':'#fff',stroke:i===0?'#e3d2bf':'#d8e1e6',ts:12.5,bs:i===0?9.5:10.5,lh:14});if(i<3)arrow(ctx,247,y+78,247,y+102,i===0?C.orange:C.blue);});
        text(ctx,'代表値を通してみる',520,120,15,C.navy,700);const vals=[[6,'Fizz'],[10,'Buzz'],[30,'FizzBuzz'],[17,'17']];vals.forEach((a,i)=>{const x=525+(i%2)*300,y=165+Math.floor(i/2)*180;rr(ctx,x,y,260,140,'#fff','#d7e1e6',10);text(ctx,`i = ${a[0]}`,x+25,y+30,13,C.navy,700);wrap(ctx,`${a[0]}%3=${a[0]%3} / ${a[0]}%5=${a[0]%5}`,x+25,y+55,215,18,10,C.gray,400);text(ctx,a[1],x+130,y+110,18,a[1]==='FizzBuzz'?C.orange:C.blue,700,'center');});
        rr(ctx,520,545,565,95,'#f5f9fb','#d5e2e8',9);wrap(ctx,'一般原則：条件が重なるif-elifでは「より限定的な条件」を上へ置く。FizzBuzzは3の倍数かつ5の倍数なので最初。',545,565,515,20,11,C.gray,400);
      }
    }
  });
})();