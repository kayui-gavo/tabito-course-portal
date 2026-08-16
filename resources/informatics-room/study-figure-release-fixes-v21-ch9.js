/* 情報Ⅰ v21 release fix — b9-3 bottom note boundary */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;
  const {register}=K;
  register('b9-3',{
    title:'データの解釈1：散布図・相関係数・因果関係・疑似相関',height:900,
    caption:'散布図の向きと相関係数を対応させ，教材の「気温→飲み物／エアコン」の図で，相関があっても因果とは限らないことを読む。',
    question:'飲み物の売上とエアコンの売上に相関があっても，直接の因果関係とは限らないのはなぜですか。',
    answer:'教材例では両方が「気温上昇」という共通の原因から影響を受けているため。',
    draw(ctx,k){const {C,text,rr,box,line,arrow,head}=k;
      head(ctx,'相関と因果を分けて読む','散布図・相関係数は変数間の関係を示すが，それだけで原因と結果は決められない。');
      text(ctx,'A　散布図：負の相関 / 相関なし / 正の相関',45,120,16,C.navy,700);
      const boxes=[[55,'負の相関',-1],[415,'相関なし',0],[775,'正の相関',1]];
      boxes.forEach(([x,t,d])=>{rr(ctx,x,160,320,230,'#fff','#d8e1e6',8);text(ctx,t,x+160,187,12,C.navy,700,'center');line(ctx,x+45,345,x+285,345,C.gray,1);line(ctx,x+45,210,x+45,345,C.gray,1);
        for(let i=0;i<12;i++){const px=x+60+i*18+(i%2)*3;let py;if(d<0)py=225+i*8+(i%3)*4;else if(d>0)py=330-i*8+(i%3)*3;else py=250+((i*37)%80);ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fillStyle=d===0?C.gray:(d>0?C.blue:C.orange);ctx.fill();}});
      text(ctx,'B　相関係数：-1 ～ 1',45,455,16,C.navy,700);
      line(ctx,95,515,1080,515,C.gray,2);[-1,-.5,0,.5,1].forEach((v,i)=>{const x=95+i*246;line(ctx,x,505,x,525,C.gray,1.5);text(ctx,String(v),x,545,10,C.gray,600,'center');});
      text(ctx,'負の相関：強い ← 弱い',260,485,10,C.orange,700,'center');text(ctx,'弱い → 強い：正の相関',915,485,10,C.blue,700,'center');
      rr(ctx,310,570,570,48,'#eef6fa','#bfd1db',8);text(ctx,'表計算：=CORREL(A3:A13,B3:B13)',595,594,10.5,C.blue,700,'center','middle');
      text(ctx,'C　疑似相関：共通の原因を探す',45,675,16,C.navy,700);
      box(ctx,470,710,250,72,'気温が上昇した','原因',{fill:'#fff8f0',stroke:'#e3d2bf'});
      box(ctx,75,805,300,72,'飲み物の売上が伸びた','結果',{fill:'#eef6fa'});
      box(ctx,815,805,300,72,'エアコンの売上が伸びた','結果',{fill:'#eef6fa'});
      arrow(ctx,530,782,320,805,C.orange,2);arrow(ctx,660,782,870,805,C.orange,2);
      line(ctx,375,841,815,841,C.teal,1.5,[7,5]);text(ctx,'この2つには相関が見えても，直接の因果とは限らない（疑似相関）',595,884,9.5,C.teal,700,'center');
    }
  });
})();