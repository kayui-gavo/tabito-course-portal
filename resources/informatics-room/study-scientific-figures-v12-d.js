/* 情報Ⅰ v12-d — 画像・Web・ソフトウェア・配列の高精細教材図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const {register}=K;
  register('b3-5',{
    title:'画像のデジタル化：標本化・量子化とRGBの加法混色',height:720,
    caption:'画像も音と同じく標本化・量子化でデジタル化する。カラー画像では1画素のR/G/B各成分を数値で表す。',
    question:'RGB各8bitのフルカラー画像では、1画素を何bitで表し、何色程度を表現できますか。',
    answer:'8bit×3色=24bit。各色256段階なので 256³ = 16,777,216色、約1677万色。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'画像のデジタル化と光の三原色','画像は平面を画素へ区切り、各画素の色や明るさを有限の段階値として数値化する。');
      text(ctx,'A　標本化：平面を画素へ区切る',45,120,16,C.navy,700);rr(ctx,45,155,360,230,'#fff','#d8e1e6',8);for(let r=0;r<12;r++)for(let c=0;c<18;c++){const x=60+c*18,y=170+r*16;const dx=c-9,dy=r-6;ctx.fillStyle=(dx*dx+dy*dy<30)?'#77a7bd':'#edf2f4';ctx.fillRect(x,y,17.2,15.2);}text(ctx,'画素の格子',225,370,10,C.gray,700,'center');arrow(ctx,425,270,500,270,C.blue);
      text(ctx,'B　量子化：各画素を段階値へ',515,120,16,C.navy,700);['2階調','4階調','256階調'].forEach((s,i)=>{const x=515+i*205;box(ctx,x,155,180,95,s,i===0?'1bit / 画素':i===1?'2bit / 画素':'8bit / 成分',{fill:i===2?'#eef6fa':'#fff',stroke:i===2?'#bfd1db':'#d8e1e6'});});
      text(ctx,'C　RGB：光を加えるほど明るくなる',45,455,16,C.navy,700);const circles=[[180,570,'#ef4c4c','R'],[270,570,'#48ae66','G'],[225,505,'#4e78d1','B']];circles.forEach(([x,y,c,s])=>{ctx.beginPath();ctx.arc(x,y,76,0,Math.PI*2);ctx.globalAlpha=.52;ctx.fillStyle=c;ctx.fill();ctx.globalAlpha=1;text(ctx,s,x,y,15,C.dark,700,'center','middle');});text(ctx,'中心は白へ近づく',225,665,11,C.blue,700,'center');box(ctx,420,490,290,120,'24bitフルカラー','R 8bit + G 8bit + B 8bit\n= 24bit / 画素\n256³ ≒ 1677万色',{fill:'#f8fafb'});box(ctx,770,490,365,120,'データ量の基本','画素数 × 1画素あたりbit数\n無圧縮なら、ここから8で割るとByte。\n問題文のKB/MB換算条件を確認する。',{fill:'#fff8f0',stroke:'#e3d2bf'});
    }
  });

  register('b4-4',{
    title:'Webページの情報デザイン：HTML・CSS・JavaScriptと見出し構造',height:720,
    caption:'HTMLは内容と構造、CSSは見た目、JavaScriptは動きや処理。見出しh1/h2は文書構造を表し、画像にはaltで代替テキストを与える。',
    question:'文字を大きく見せたいだけの理由でh1を使うのが適切でないのはなぜですか。',
    answer:'h1は見た目ではなく文書構造上の最上位見出しを表すから。見た目の大きさはCSSで調整する。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'Webページと情報デザイン','ブラウザに見える1画面の裏側では、文書構造・見た目・動作を別の技術で分担している。');
      text(ctx,'A　3つの役割を分ける',45,120,16,C.navy,700);box(ctx,45,155,310,130,'HTML','内容・構造\n<h1>タイトル</h1>\n<p>本文</p>\n<img alt="…">',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,445,155,310,130,'CSS','色・余白・配置・文字サイズ\n「どう見せるか」を担当',{fill:'#f8fafb'});box(ctx,845,155,290,130,'JavaScript','クリック・入力・計算・画面更新\n「どう動くか」を担当',{fill:'#fff8f0',stroke:'#e3d2bf'});
      text(ctx,'B　見出しは文書の階層',45,350,16,C.navy,700);box(ctx,70,390,235,70,'h1','ページ全体の主題',{fill:'#eef6fa'});arrow(ctx,187,460,187,495,C.blue);box(ctx,70,500,235,62,'h2','大きな節');arrow(ctx,305,531,375,531,C.blue);box(ctx,390,500,235,62,'p','その節の本文');box(ctx,720,390,385,172,'画像＋alt','画像が見えない・読み上げ利用時でも内容が伝わるよう、意味のある代替テキストを付ける。',{fill:'#f8fafb'});
      rr(ctx,45,610,1090,64,'#f5f9fb','#d5e2e8',10);text(ctx,'Webサーバ',70,637,11,C.blue,700);wrap(ctx,'作成したHTML/CSS/JavaScriptなどのファイルをWebサーバへ置き、ブラウザから要求されたとき配信する。',155,623,940,19,11,C.gray);
    }
  });

  register('b5-2',{
    title:'ソフトウェアの階層：アプリ・OS・デバイスドライバ・ハードウェア',height:700,
    caption:'OSはアプリそのものではなく、CPU・メモリ・ファイル・周辺機器などを管理してアプリが使えるようにする基本ソフトウェア。',
    question:'プリンタを新しく接続したとき、OSとプリンタの間で機器固有の制御を仲介するものは何ですか。',
    answer:'デバイスドライバ。OSからその周辺機器を利用できるように仲介する。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'ソフトウェア','コンピュータは「アプリが直接ハードウェアを全部操作する」構造ではなく、OSが資源を管理する。');
      const layers=[['応用ソフトウェア','文書作成・画像編集・ブラウザなど','#eef6fa'],['基本ソフトウェア（OS）','CPU・メモリ・ファイル・入出力装置などを管理','#f8fafb'],['デバイスドライバ','プリンタ・GPU・カメラなど機器固有の制御を仲介','#fff8f0'],['ハードウェア','CPU・メモリ・SSD・周辺機器','#fff']];layers.forEach((a,i)=>{const y=140+i*120;box(ctx,190,y,820,86,a[0],a[1],{fill:a[2],stroke:i===0?'#bfd1db':i===2?'#e3d2bf':'#d8e1e6'});if(i<3)arrow(ctx,600,y+86,600,y+112,i===1?C.orange:C.blue);});
      box(ctx,45,245,120,86,'利用者','アプリを操作');arrow(ctx,165,288,190,183,C.teal);box(ctx,1035,385,120,86,'プリンタ','周辺機器');arrow(ctx,1010,423,1035,428,C.orange);
      rr(ctx,190,635,820,40,'#f5f9fb','#d5e2e8',8);text(ctx,'プログラム = コンピュータへの命令＋扱うデータ。ノイマン型では命令もデータも主記憶へ置く。',600,655,11,C.blue,700,'center','middle');
    }
  });

  register('b6-6',{
    title:'配列と反復処理：インデックス0始まりと値の更新を追う',height:720,
    caption:'配列では「人間が言う3番目」と「Pythonのindex 2」を対応させる。for/whileは値がどう変わるか表にすると追いやすい。',
    question:'scores=[72,85,90,66] の「3番目の値」をPythonで取り出す式は何ですか。',
    answer:'scores[2]。Pythonの配列は先頭をindex 0として数えるため。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;head(ctx,'配列と反復処理','複数の値を順序付きで持つ配列では、位置（index）と値を分けて読む。反復では1回ごとの状態変化を書く。');
      text(ctx,'A　配列：位置と値',45,120,16,C.navy,700);const vals=[72,85,90,66];vals.forEach((v,i)=>{cell(ctx,70+i*160,160,145,70,String(v),{fill:i===2?'#eef6fa':'#fff',fs:20});text(ctx,`index ${i}`,142+i*160,252,11,i===2?C.blue:C.gray,700,'center');text(ctx,`${i+1}番目`,142+i*160,275,10,C.gray,400,'center');});box(ctx,760,160,375,115,'3番目を取り出す','人間：3番目\nPython：scores[2]\n→ 先頭が0番目なので1つずれる',{fill:'#f8fafb'});
      text(ctx,'B　forで合計を更新する',45,345,16,C.navy,700);const rows=[['開始','—','0'],['1回目','72','72'],['2回目','85','157'],['3回目','90','247'],['4回目','66','313']];const x0=70,y0=380,widths=[180,180,220];['反復','score','total'].forEach((s,i)=>cell(ctx,x0+widths.slice(0,i).reduce((a,b)=>a+b,0),y0,widths[i],42,s,{head:true,fill:'#eff5f8',fs:10}));rows.forEach((r,ri)=>r.forEach((s,i)=>cell(ctx,x0+widths.slice(0,i).reduce((a,b)=>a+b,0),y0+(ri+1)*42,widths[i],42,s,{fill:ri===3?'#fff8f0':'#fff',fs:10})));
      box(ctx,720,395,415,145,'読む順番','① 今回の要素 score を取り出す\n② total = total + score を計算\n③ 新しいtotalを次の反復へ渡す',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,720,575,415,85,'whileとの違い','for：回数・要素列が見通しやすい\nwhile：条件がTrueの間くり返す',{fill:'#f8fafb'});
    }
  });
})();