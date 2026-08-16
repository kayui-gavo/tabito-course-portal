/* 情報Ⅰ v21 — 第9講 原教材準拠図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;
  const {register}=K;

  register('b9-1',{
    title:'データの収集と整理：尺度・オープンデータ・3V・クレンジング',height:920,
    caption:'原教材の「収集→整理→分析」を軸に，4尺度，オープンデータ3条件，ビッグデータ3V，欠損値・外れ値・データクレンジングを一枚で整理する。',
    question:'「部屋の気温」と「歩いた距離」は，教材の4尺度ではそれぞれ何ですか。',
    answer:'部屋の気温は間隔尺度，歩いた距離は比例尺度。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;
      head(ctx,'データ分析の入口','まずデータを集め，分析できる形へ整理してから分析する。データの尺度を先に見抜く。');
      text(ctx,'A　データ分析の流れ',45,120,16,C.navy,700);
      const flow=[['データの収集','必要なデータを集める'],['データの整理','欠損・外れ値・形式を確認'],['データの分析','統計量・グラフ等で特徴を読む']];
      flow.forEach((a,i)=>{const x=55+i*365;box(ctx,x,155,305,85,a[0],a[1],{fill:i===1?'#eef6fa':'#fff'});if(i<2)arrow(ctx,x+305,197,x+350,197,C.blue);});

      text(ctx,'B　4つの尺度',45,295,16,C.navy,700);
      const scales=[
        ['量的','間隔尺度','差に意味／0は相対的','気温・西暦','#eef6fa'],
        ['量的','比例尺度','差と比に意味／0は絶対的','距離・値段','#eef6fa'],
        ['質的','名義尺度','分類の区別に意味','血液型・都道府県','#fff8f0'],
        ['質的','順序尺度','順序に意味／間隔は一定でない','通知票・順位','#fff8f0']
      ];
      scales.forEach((a,i)=>{const x=55+(i%2)*540,y=330+Math.floor(i/2)*108;box(ctx,x,y,500,88,`${a[0]}：${a[1]}`,`${a[2]}\n例：${a[3]}`,{fill:a[4],stroke:i<2?'#bfd1db':'#e3d2bf'});});

      text(ctx,'C　データの収集',45,575,16,C.navy,700);
      box(ctx,55,610,500,115,'オープンデータ','① 二次利用可能\n② 機械判読に適する\n③ 無償で利用できる',{fill:'#f8fafb'});
      box(ctx,610,610,510,115,'ビッグデータ：3V','Volume＝量\nVariety＝種類\nVelocity＝頻度・更新頻度',{fill:'#eef6fa'});

      text(ctx,'D　データの整理 → 分析',45,785,16,C.navy,700);
      box(ctx,55,820,250,72,'欠損値','故障・入力忘れ等で欠けた値',{fill:'#fff'});
      box(ctx,335,820,250,72,'外れ値（異常値）','他と比べて大きく外れた値',{fill:'#fff8f0'});
      box(ctx,615,820,250,72,'データクレンジング','破損・不正確・無関係なデータを修正／削除',{fill:'#eef6fa'});
      box(ctx,895,820,225,72,'データマイニング','大量データから傾向・パターンを発見',{fill:'#f4f9f7'});
    }
  });

  register('b9-2',{
    title:'データの分析：代表値・散らばり・箱ひげ図・ヒストグラム・クロス集計',height:980,
    caption:'AVERAGE/MEDIAN/MODE，分散・標準偏差，四分位数と箱ひげ図，度数分布表・ヒストグラム，クロス集計を教材の順に整理する。',
    question:'教材の尺度と分析手法の表で，平均値・分散まで意味を持つ尺度はどれですか。',
    answer:'間隔尺度と比例尺度。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;
      head(ctx,'データの特徴を複数の側面から見る','代表値だけでなく，散らばりと分布の形，カテゴリ間の関係まで確認する。');
      text(ctx,'A　代表的な統計量と表計算関数',45,120,16,C.navy,700);
      const stat=[['平均値','AVERAGE'],['中央値','MEDIAN'],['最頻値','MODE'],['分散','VARP'],['標準偏差','STDEV.P'],['最大/最小','MAX / MIN'],['合計','SUM']];
      stat.forEach((a,i)=>box(ctx,55+(i%4)*265,155+Math.floor(i/4)*82,235,62,a[0],a[1],{fill:i<3?'#eef6fa':'#fff'}));

      text(ctx,'B　偏差 → 分散 → 標準偏差',45,345,16,C.navy,700);
      box(ctx,55,380,280,82,'偏差','データの値 − 平均値',{fill:'#fff'});arrow(ctx,335,421,420,421,C.blue);
      box(ctx,420,380,280,82,'分散','偏差の二乗の平均',{fill:'#eef6fa'});arrow(ctx,700,421,785,421,C.blue);
      box(ctx,785,380,335,82,'標準偏差','分散の正の平方根\n小さいほど一般に散らばりは小さい',{fill:'#fff8f0'});

      text(ctx,'C　四分位数と箱ひげ図',45,525,16,C.navy,700);
      const vals=['56','59','69','75','78','79','81','81','81','92'];
      vals.forEach((s,i)=>cell(ctx,55+i*74,560,70,42,s,{fill:'#fff',fs:9}));
      text(ctx,'Q1',203,625,10,C.blue,700,'center');text(ctx,'Q2',425,625,10,C.blue,700,'center');text(ctx,'Q3',647,625,10,C.blue,700,'center');
      rr(ctx,800,550,320,120,'#fff','#d8e1e6',8);
      line(ctx,840,612,1085,612,C.gray,1.5);line(ctx,865,590,865,634,C.gray,2);line(ctx,1040,590,1040,634,C.gray,2);rr(ctx,910,582,85,60,'#eef6fa','#bfd1db',0);line(ctx,953,582,953,642,C.orange,2);text(ctx,'箱ひげ図',960,662,10,C.gray,600,'center');

      text(ctx,'D　ヒストグラムとクロス集計',45,720,16,C.navy,700);
      rr(ctx,55,755,470,145,'#fff','#d8e1e6',8);text(ctx,'ヒストグラム',75,780,12,C.navy,700);
      const hs=[20,38,62,86,66,35,18];hs.forEach((h,i)=>{ctx.fillStyle=i===3?C.orange:C.blue;ctx.fillRect(95+i*52,875-h,48,h);});line(ctx,85,875,470,875,C.gray,1);text(ctx,'横軸＝階級／縦軸＝度数',285,895,9,C.gray,600,'center');
      rr(ctx,585,755,535,145,'#f8fafb','#d8e1e6',8);text(ctx,'クロス集計',605,780,12,C.navy,700);
      const table=[['','サッカー','ドッチ'],['男子','82','50'],['女子','65','72']];
      table.forEach((r,ri)=>r.forEach((s,ci)=>cell(ctx,620+ci*135,805+ri*30,130,30,s,{head:ri===0||ci===0,fill:ri===0||ci===0?'#eff5f8':'#fff',fs:9})));
      text(ctx,'カテゴリ×カテゴリで数・割合を比較',850,908,9,C.gray,600,'center');

      rr(ctx,55,930,1065,36,'#f5f9fb','#d5e2e8',8);text(ctx,'尺度と分析手法：名義＝最頻値 ／ 順序＝＋最大・中央値・最小 ／ 間隔・比例＝＋平均値・分散',588,948,9.5,C.blue,700,'center','middle');
    }
  });

  register('b9-3',{
    title:'データの解釈1：散布図・相関係数・因果関係・疑似相関',height:900,
    caption:'散布図の向きと相関係数を対応させ，教材の「気温→飲み物／エアコン」の図で，相関があっても因果とは限らないことを読む。',
    question:'飲み物の売上とエアコンの売上に相関があっても，直接の因果関係とは限らないのはなぜですか。',
    answer:'教材例では両方が「気温上昇」という共通の原因から影響を受けているため。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;
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
      line(ctx,375,841,815,841,C.teal,1.5,[7,5]);text(ctx,'この2つには相関が見えても，直接の因果とは限らない（疑似相関）',595,900,9.5,C.teal,700,'center');
    }
  });

  register('b9-4',{
    title:'データの解釈2：単回帰分析・最小二乗法・母集団/標本・仮説検定',height:1040,
    caption:'原教材の回帰式 Y=0.717X+19.6 とおにぎり100gの仮説検定を中心に，推定・p値・棄却・片側/両側検定までつなぐ。',
    question:'教材の仮説検定では，p値が5%未満のとき帰無仮説をどうしますか。',
    answer:'棄却する。教材では，めったに起こらないことが起きたとして対立仮説が正しいと判断する。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;
      head(ctx,'回帰から仮説検定まで','「予測する回帰」と「標本から母集団を考える検定」は役割が違う。教材の手順を順番で追う。');
      text(ctx,'A　単回帰分析：Y = aX + b',45,120,16,C.navy,700);
      rr(ctx,55,155,490,220,'#fff','#d8e1e6',8);line(ctx,100,340,500,340,C.gray,1);line(ctx,100,190,100,340,C.gray,1);
      const pts=[[130,310],[165,300],[205,285],[245,276],[280,260],[325,245],[365,232],[410,215],[460,205]];pts.forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle=C.blue;ctx.fill();});line(ctx,120,320,480,195,C.orange,3);text(ctx,'回帰直線',420,190,10,C.orange,700,'center');
      box(ctx,610,160,510,88,'教材例','情報の点数 X → 数学の点数 Y\nY = 0.717X + 19.6',{fill:'#eef6fa'});
      box(ctx,610,275,510,88,'X = 75 を代入','Y = 0.717×75 + 19.6 = 73.375',{fill:'#fff8f0'});

      text(ctx,'B　最小二乗法：Y軸方向のずれ（残差）',45,435,16,C.navy,700);
      rr(ctx,55,470,1065,90,'#f8fafb','#d8e1e6',8);line(ctx,105,535,1065,495,C.orange,2.5);
      [250,460,690,900].forEach((x,i)=>{const y=500+[20,-16,23,-19][i];ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle=C.blue;ctx.fill();const ly=535-(x-105)*(40/960);line(ctx,x,y,x,ly,C.gray,1.5,[4,3]);});
      text(ctx,'各点と回帰直線のY軸方向のずれがトータルで最も小さくなるように直線を描く',590,580,10,C.gray,600,'center');

      text(ctx,'C　母集団 → 標本 → 推定',45,635,16,C.navy,700);
      box(ctx,55,675,270,85,'母集団','おにぎり 15万個',{fill:'#fff8f0'});arrow(ctx,325,718,465,718,C.blue);text(ctx,'無作為に抽出',395,697,9,C.blue,700,'center');
      box(ctx,465,675,270,85,'標本','100個',{fill:'#eef6fa'});arrow(ctx,735,718,875,718,C.teal);text(ctx,'推定',805,697,9,C.teal,700,'center');
      box(ctx,875,675,245,85,'母集団の性質を推測','',{fill:'#f8fafb'});

      text(ctx,'D　教材の仮説検定の流れ',45,815,16,C.navy,700);
      const steps=[['対立仮説','平均は100gではない'],['帰無仮説','平均は100gである'],['p値','帰無仮説が正しい前提で確率を計算'],['判断','p < 5% → 帰無仮説を棄却']];
      steps.forEach((a,i)=>{const x=55+i*270;box(ctx,x,850,240,88,a[0],a[1],{fill:i===3?'#fff8f0':i===2?'#eef6fa':'#fff'});if(i<3)arrow(ctx,x+240,894,x+260,894,C.blue);});
      rr(ctx,55,965,520,48,'#f5f9fb','#d5e2e8',8);text(ctx,'両側検定：左右を合わせて有意水準5%',315,989,9.5,C.blue,700,'center','middle');
      rr(ctx,600,965,520,48,'#f5f9fb','#d5e2e8',8);text(ctx,'片側検定：一方の領域で有意水準5%',860,989,9.5,C.blue,700,'center','middle');
    }
  });
})();