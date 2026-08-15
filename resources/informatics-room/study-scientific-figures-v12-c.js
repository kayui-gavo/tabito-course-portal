/* 情報Ⅰ v12-c — 表計算・尺度・統計・相関の高精細教材図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const {register}=K;
  register('b7-3',{
    title:'表計算シミュレーション：相対参照・絶対参照・オートフィルを視覚化',height:760,
    caption:'複利計算を例に、コピーすると変わる参照と固定すべき参照を分ける。教材では年利B3を B$3 として行を固定する。',
    question:'セルC7の式を下へコピーするとき、年利のセルB3を B$3 と書く理由を説明できますか。',
    answer:'下方向へオートフィルしても年利は常に3行目を参照したいから。行番号3を$で固定し、列Bはそのまま使う。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;head(ctx,'シミュレーション（表計算）','表計算では「式」だけでなく、式をコピーしたとき参照先がどう変化するかを理解することが重要。');
      text(ctx,'A　複利シミュレーションの表',45,120,16,C.navy,700);const x0=45,y0=150,cw=[80,165,165,165],rh=44,heads=['年','預金残高','利息','次年度残高'];heads.forEach((s,i)=>cell(ctx,x0+cw.slice(0,i).reduce((a,b)=>a+b,0),y0,cw[i],rh,s,{head:true,fill:'#eff5f8',fs:10}));const rows=[['0','100,000','','100,000'],['1','103,000','3,000','103,000'],['2','106,090','3,090','106,090'],['3','109,273','3,183','109,273']];rows.forEach((r,ri)=>r.forEach((s,i)=>cell(ctx,x0+cw.slice(0,i).reduce((a,b)=>a+b,0),y0+(ri+1)*rh,cw[i],rh,s,{fill:ri===1?'#fff8f0':'#fff',fs:10})));
      box(ctx,705,150,430,90,'入力セル','A3：元金 100,000\nB3：年利 3%（コピーしても固定）',{fill:'#f8fafb'});box(ctx,705,265,430,120,'1年目の式','B7 = B6 + C7\nC7 = B6 × B$3\nB$3 の「$3」で行番号3を固定',{fill:'#eef6fa',stroke:'#bfd1db'});arrow(ctx,620,260,705,310,C.blue);
      text(ctx,'B　下へコピーしたとき何が変わるか',45,420,16,C.navy,700);const formulas=[['元の式','=B6*B$3'],['1行下へコピー','=B7*B$3'],['さらに1行下','=B8*B$3']];formulas.forEach((r,i)=>{const y=455+i*62;box(ctx,55,y,205,48,r[0],'');rr(ctx,300,y,270,48,i===0?'#fff8f0':'#fff','#d8e1e6',6);text(ctx,r[1],435,y+25,15,i===0?C.orange:C.navy,700,'center','middle');if(i<2)arrow(ctx,590,y+24,650,y+86,C.teal);});box(ctx,700,455,435,170,'参照の読み方','B6：相対参照 → コピー位置に応じてB7, B8…へ変化\nB$3：行3を固定 → どこへコピーしても年利は3行目\n$B$3：列B・行3の両方を固定',{fill:'#f8fafb'});
      rr(ctx,45,655,1090,62,'#f5f9fb','#d5e2e8',9);text(ctx,'オートフィルの本質',70,682,12,C.blue,700);wrap(ctx,'「同じ計算規則を多くの行へコピーする」こと。どの参照だけ固定すべきかを判断できれば、シミュレーション表を効率よく作れる。',190,668,910,18,11,C.gray);
    }
  });

  register('b9-1',{
    title:'データの尺度：名義・順序・間隔・比例を「できる計算」で判別する',height:760,
    caption:'尺度は値の見た目ではなく、その値にどんな比較・差・比の意味があるかで判別する。0℃と0kmの違いが重要。',
    question:'通知票の5段階評価で「4は2の2倍よい」と言えないのはなぜですか。',
    answer:'順序尺度は大小の順序に意味はあるが、隣り合う値の間隔や比率が数量として一定とは限らないから。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'データの収集と整理：4つの尺度','量的/質的だけでなく、値にどこまで数量的意味があるかを見る。');
      text(ctx,'できることが右へ行くほど増える',45,115,12,C.gray,700);const cards=[['名義尺度','区別だけ','血液型・都道府県コード','#fff'],['順序尺度','区別＋順序','通知票・順位','#f8fafb'],['間隔尺度','区別＋順序＋差','気温・西暦','#eef6fa'],['比例尺度','区別＋順序＋差＋比','距離・値段','#fff8f0']];cards.forEach((a,i)=>{const x=45+i*275;box(ctx,x,150,245,150,a[0],`${a[1]}\n例：${a[2]}`,{fill:a[3],stroke:i===2?'#bfd1db':i===3?'#e3d2bf':'#d8e1e6',tc:i===3?C.orange:C.navy});if(i<3)arrow(ctx,x+245,225,x+270,225,C.blue);});
      text(ctx,'0 の意味で間隔尺度と比例尺度を見分ける',45,350,16,C.navy,700);box(ctx,45,390,500,125,'0℃','「気温が存在しない」ではない。0は相対的な基準点。\n20℃は10℃の2倍の暑さ、とは言えない。',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,635,390,500,125,'0km','「距離がない」という絶対的な0。\n10kmは2kmの5倍の距離、と比率に意味がある。',{fill:'#fff8f0',stroke:'#e3d2bf'});
      text(ctx,'判別の4問',45,575,16,C.navy,700);const qs=[['① 区別だけ？','→ 名義'],['② 順序がある？','→ 順序'],['③ 差に意味？','→ 間隔'],['④ 絶対的0があり比に意味？','→ 比例']];qs.forEach((q,i)=>{const x=45+i*270;rr(ctx,x,610,245,72,i===3?'#fff8f0':'#fff','#d8e1e6',8);text(ctx,q[0],x+18,635,11,C.dark,700);text(ctx,q[1],x+18,660,11,i===3?C.orange:C.blue,700);});
    }
  });

  register('b9-2',{
    title:'代表値・散らばり・箱ひげ図：同じデータを何で要約するか',height:760,
    caption:'平均値・中央値・最頻値は中心、分散・標準偏差は散らばり、箱ひげ図は四分位数と分布の概要を見る。',
    question:'外れ値が1つ大きくなったとき、平均値と中央値ではどちらがより強く影響を受けますか。',
    answer:'平均値。すべての値を足して個数で割るため外れ値に引っ張られやすい。中央値は順位の中央なので影響が小さい。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,axis}=k;head(ctx,'データの分析：中心と散らばりを分けて読む','代表値だけでは分布は分からない。中心・散らばり・四分位数を組み合わせて読む。');
      const data=[6,7,8,9,10,42];text(ctx,'A　同じデータでも代表値は違う',45,120,16,C.navy,700);text(ctx,'データ：6, 7, 8, 9, 10, 42',45,155,14,C.dark,700);box(ctx,45,190,245,95,'平均値','82 ÷ 6 ≒ 13.7',{fill:'#fff8f0',stroke:'#e3d2bf',tc:C.orange});box(ctx,325,190,245,95,'中央値','中央2つ 8,9 の平均 → 8.5',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,605,190,245,95,'最頻値','同じ値がない → なし',{fill:'#fff'});box(ctx,885,190,250,95,'標準偏差','値の散らばりの大きさ',{fill:'#f8fafb'});
      text(ctx,'B　箱ひげ図で分布の位置を読む',45,345,16,C.navy,700);axis(ctx,75,410,1000,85,'値','');const scale=v=>75+(v-0)/45*1000;const min=6,q1=7,q2=8.5,q3=10,max=42;line(ctx,scale(min),452,scale(max),452,C.gray,2);line(ctx,scale(min),430,scale(min),474,C.gray,2);line(ctx,scale(max),430,scale(max),474,C.gray,2);ctx.fillStyle='#eef6fa';ctx.fillRect(scale(q1),420,scale(q3)-scale(q1),64);ctx.strokeStyle=C.blue;ctx.lineWidth=2;ctx.strokeRect(scale(q1),420,scale(q3)-scale(q1),64);line(ctx,scale(q2),420,scale(q2),484,C.orange,3);[['最小',min],['Q1',q1],['中央値',q2],['Q3',q3],['最大',max]].forEach(([s,v])=>{text(ctx,s,scale(v),515,9,C.gray,700,'center');text(ctx,String(v),scale(v),532,9,C.dark,700,'center');});
      text(ctx,'C　何を見たいかで指標を選ぶ',45,585,16,C.navy,700);const uses=[['中心をざっくり','平均値 / 中央値 / 最頻値'],['外れ値の影響を避けたい','中央値'],['散らばりの大きさ','分散 / 標準偏差'],['分布の概要を比較','箱ひげ図']];uses.forEach((a,i)=>box(ctx,45+i*270,620,245,82,a[0],a[1],{fill:i===1?'#eef6fa':'#fff'}));
    }
  });

  register('b9-3',{
    title:'相関・因果・疑似相関：散布図の形だけで原因を決めない',height:780,
    caption:'相関係数は直線的な関係の向きと強さを表すが、因果関係を証明しない。共通の原因（交絡因子）が疑似相関を生むことがある。',
    question:'飲み物の売上とエアコンの売上に正の相関があっても、「飲み物が売れたからエアコンが売れた」と言えないのはなぜですか。',
    answer:'気温上昇という共通の原因が両方の売上を増やしている可能性がある。相関だけでは因果の向きや共通原因を確定できない。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,axis}=k;head(ctx,'データの解釈1：相関関係と因果関係','散布図・相関係数は関係の傾向を表す道具。因果を言うには、別の原因や調査設計まで検討する。');
      text(ctx,'A　散布図の3パターン',45,120,16,C.navy,700);const panels=[[45,'負の相関',-1],[405,'相関なし',0],[765,'正の相関',1]];panels.forEach(([x,label,type])=>{rr(ctx,x,155,320,230,'#fff','#d8e1e6',8);axis(ctx,x+45,195,235,145,'x','y');for(let i=0;i<18;i++){let px=x+65+i*11.5,py;if(type===1)py=335-i*6+(i%4-1.5)*8;else if(type===-1)py=215+i*6+(i%5-2)*7;else py=250+((i*37)%95);ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fillStyle=type===0?C.gray:type===1?C.blue:C.orange;ctx.fill();}text(ctx,label,x+160,372,12,type===1?C.blue:type===-1?C.orange:C.gray,700,'center');});
      rr(ctx,45,420,1040,62,'#f5f9fb','#d5e2e8',9);text(ctx,'相関係数 r',70,447,12,C.navy,700);line(ctx,220,450,910,450,C.gray,2);[-1,-.5,0,.5,1].forEach(v=>{const x=220+(v+1)/2*690;line(ctx,x,440,x,460,C.gray,1);text(ctx,String(v),x,476,9,C.gray,400,'center');});text(ctx,'絶対値が1に近いほど直線的な相関が強い',940,454,10,C.blue,700,'center','middle');
      text(ctx,'B　疑似相関：共通の原因を探す',45,540,16,C.navy,700);box(ctx,430,575,300,72,'気温が上昇','交絡因子 / 共通の原因',{fill:'#fff8f0',stroke:'#e3d2bf',tc:C.orange});box(ctx,95,670,300,72,'飲み物の売上が伸びる','結果A',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,765,670,300,72,'エアコンの売上が伸びる','結果B',{fill:'#eef6fa',stroke:'#bfd1db'});arrow(ctx,500,647,330,670,C.orange,2);arrow(ctx,660,647,830,670,C.orange,2);line(ctx,395,710,765,710,C.red,2,[7,5]);text(ctx,'相関は見えても、A→Bの因果とは限らない',580,700,10,C.red,700,'center');
    }
  });
})();