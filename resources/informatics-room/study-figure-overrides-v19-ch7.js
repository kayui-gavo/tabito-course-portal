/* 情報Ⅰ v19 — 第7講 原教材準拠図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;
  const {register}=K;

  register('b7-1',{
    title:'モデル化とシミュレーション：2つの分類軸とシミュレーションの種類',height:800,
    caption:'原教材の分類を「対象の特性」「表現形式」「シミュレーション方法」の3段階に分けて整理する。',
    question:'「SNSで情報が広がる様子」は，教材のコンピュータシミュレーションではどの種類に最も当てはまりますか。',
    answer:'エージェントシミュレーション。一定のルールで自律的に動く個々の主体の振る舞いの集まりとして扱う。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;
      head(ctx,'モデル化とシミュレーション','目的を明確にしてモデルを作り，そのモデルを使って条件を設定し試行・実験する。');
      text(ctx,'A　モデル化の流れ',45,120,16,C.navy,700);
      const steps=[['目的（問題）','何のためにモデル化するか'],['構成要素','必要な要素を決める'],['表現','図・数式などで表す']];
      steps.forEach((a,i)=>{const x=55+i*365;box(ctx,x,155,300,82,a[0],a[1],{fill:i===2?'#eef6fa':'#fff'});if(i<2)arrow(ctx,x+300,196,x+350,196,C.blue);});

      text(ctx,'B　対象の特性による分類',45,285,16,C.navy,700);
      box(ctx,55,320,235,72,'静的モデル','時間の経過がほかの要素に影響しない\n例：家のレイアウト図',{fill:'#f8fafb'});
      box(ctx,355,320,235,72,'動的モデル','時間の経過がほかの要素に影響する',{fill:'#eef6fa'});
      arrow(ctx,590,356,645,356,C.blue);
      box(ctx,655,305,220,72,'確定的モデル','変動要素なし\n結果が1つに定まる',{fill:'#fff'});
      box(ctx,915,305,220,72,'確率的モデル','変動要素あり\n結果が1つに定まらない',{fill:'#fff8f0',stroke:'#e3d2bf'});
      text(ctx,'動的モデルをさらに分類',895,397,10,C.gray,600,'center');

      text(ctx,'C　表現形式による分類',45,445,16,C.navy,700);
      box(ctx,55,480,315,100,'物理（実体）モデル','実物モデル・縮小モデル・拡大モデル\n例：モデルルーム・地球儀・細胞模型',{fill:'#fff'});
      box(ctx,430,480,315,100,'図的モデル','構造や状態変化を視覚的な図で表す\n例：フローチャート',{fill:'#f8fafb'});
      box(ctx,805,480,315,100,'数理モデル','構造や状態変化を数式・論理式で表す\n例：水量＝注水量×時間',{fill:'#eef6fa'});

      text(ctx,'D　シミュレーションの方法',45,625,16,C.navy,700);
      box(ctx,55,660,250,82,'物理シミュレーション','物理（実体）モデルを使う',{fill:'#fff'});
      box(ctx,360,660,250,82,'連続型','時間とともに連続的に変化する状態量',{fill:'#eef6fa'});
      box(ctx,665,660,220,82,'離散型','待ち行列など確率的に発生する事象',{fill:'#fff8f0',stroke:'#e3d2bf'});
      box(ctx,940,660,180,82,'エージェント','自律的に行動する主体の集まり',{fill:'#f5f9f5'});
      wrap(ctx,'費用・時間・危険性などで実物の試行が難しいときに有効。結果を検討し，必要ならモデルを修正する。',55,765,1060,18,10,C.gray,400);
    }
  });

  register('b7-2',{
    title:'プログラムによるシミュレーション：確定的モデルと乱数',height:800,
    caption:'教材のメロン売上・サイコロ60回をそのまま軸に，確定的モデルと確率的モデルを対比する。',
    question:'教材のサイコロ集計で r=1 のとき，どの配列要素を1増やしますか。',
    answer:'Kaisuu[0]。コードは Kaisuu[r-1] = Kaisuu[r-1] + 1。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;
      head(ctx,'シミュレーション（プログラミング）','確定的モデルは式で一意に計算し，確率的モデルは擬似乱数を使って試行を繰り返す。');

      text(ctx,'A　確定的モデル：メロン1個750円',45,120,16,C.navy,700);
      box(ctx,55,155,290,100,'数理モデル','売上金額 = 商品単価 × 売れた個数\n1個750円',{fill:'#eef6fa'});
      box(ctx,390,155,330,100,'Python','tanka = 750\nfor i in range(1,11):\n  uriage = tanka * i',{fill:'#f8fafb'});
      box(ctx,765,155,355,100,'結果','1個 750円 → 10個 7500円\n条件が同じなら結果は1つに定まる',{fill:'#fff'});
      arrow(ctx,345,205,390,205,C.blue);arrow(ctx,720,205,765,205,C.blue);

      text(ctx,'B　配列へ入れてグラフ表示',45,300,16,C.navy,700);
      box(ctx,55,335,500,105,'配列と反復','Uriage = [0,0,0,0,0,0,0,0,0,0,0]\nfor i in range(len(Uriage)):\n  Uriage[i] = tanka * i',{fill:'#f8fafb'});
      rr(ctx,610,335,510,105,'#fff','#d8e1e6',8);
      line(ctx,665,415,1065,415,C.grid,1);line(ctx,665,365,665,415,C.grid,1);
      ctx.beginPath();ctx.moveTo(665,415);for(let i=1;i<=10;i++)ctx.lineTo(665+i*40,415-i*5);ctx.strokeStyle=C.blue;ctx.lineWidth=3;ctx.stroke();
      for(let i=0;i<=10;i++){ctx.beginPath();ctx.arc(665+i*40,415-i*5,3.5,0,Math.PI*2);ctx.fillStyle=C.orange;ctx.fill();}
      text(ctx,"plt.plot(Uriage, marker='o')",865,355,11,C.gray,700,'center');

      text(ctx,'C　確率的モデル：擬似乱数とモンテカルロ法',45,495,16,C.navy,700);
      box(ctx,55,530,320,92,'擬似乱数','コンピュータが計算で生成する\n教材では以後「乱数」と呼ぶ',{fill:'#fff8f0',stroke:'#e3d2bf'});
      box(ctx,430,530,320,92,'モンテカルロ法','確率的モデルで乱数を用いて\n問題を解決する手法',{fill:'#eef6fa'});
      box(ctx,805,530,315,92,'乱数生成','import random\nr = random.randint(1,6)',{fill:'#f8fafb'});

      text(ctx,'D　サイコロ60回：Kaisuu[r-1] を更新',45,665,16,C.navy,700);
      const counts=[17,8,6,8,12,9], max=18, bx=85, by=755, bw=52, gap=36;
      line(ctx,70,755,600,755,C.gray,1.5);line(ctx,70,685,70,755,C.gray,1.5);
      counts.forEach((v,i)=>{const h=v/max*62;ctx.fillStyle=i===0?C.orange:C.blue;ctx.fillRect(bx+i*(bw+gap),by-h,bw,h);text(ctx,String(i+1),bx+bw/2+i*(bw+gap),775,10,C.gray,700,'center');text(ctx,String(v),bx+bw/2+i*(bw+gap),by-h-8,9,C.dark,700,'center');});
      box(ctx,680,680,440,105,'試行回数を増やす','60 → 600 → 6000 → 60000\n教材では，回数を大きくするほど各目の出現回数がより均等になっていくことを確認する。',{fill:'#f5f9fb'});
    }
  });

  register('b7-3',{
    title:'表計算によるシミュレーション：複利・参照・人口増減',height:820,
    caption:'教材のセル位置と式 B7=B6+C7，C7=B6*B$3，人口 B7=B6*(1+B$3) を中心に整理する。',
    question:'B7の式を下へコピーするとき，年利B3の「行3」だけ固定する表記は何ですか。',
    answer:'B$3。教材の金利計算では C7=B6*B$3 とする。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;
      head(ctx,'シミュレーション（表計算）','数式をコピーするとき，変化させる参照と固定する参照を分ける。');

      text(ctx,'A　金利計算シミュレーション（元金100,000円・年利4%）',45,120,16,C.navy,700);
      box(ctx,55,155,290,90,'複利法','利息 = 現在の金額 × 年利\n次期の金額 = 現在の金額 + 利息',{fill:'#eef6fa'});
      box(ctx,390,155,350,90,'教材のセル式','B6 = A3\nC7 = B6 * B$3\nB7 = B6 + C7',{fill:'#fff8f0',stroke:'#e3d2bf'});
      box(ctx,785,155,335,90,'参照の役割','B6：前年残高 → 下へずれる\nB$3：年利の行3 → 固定',{fill:'#f8fafb'});

      text(ctx,'B　オートフィルした結果',45,300,16,C.navy,700);
      const rows=[['年数','預金残高','利息'],['0','100,000',''],['1','104,000','4,000'],['2','108,160','4,160'],['3','112,486','4,326'],['4','116,986','4,499'],['5','121,665','4,679']];
      const x0=55,y0=330,cw=[120,180,150],rh=42;
      rows.forEach((r,ri)=>r.forEach((s,ci)=>cell(ctx,x0+[0,cw[0],cw[0]+cw[1]][ci],y0+ri*rh,cw[ci],rh,s,{head:ri===0,fill:ri===0?'#eff5f8':ri===2?'#fff8f0':'#fff',fs:10})));
      box(ctx,560,350,250,120,'相対参照','コピー先に合わせて参照セルが変化\n例：B6 → B7 → B8 …',{fill:'#fff'});
      box(ctx,860,350,260,120,'絶対参照','固定したい行・列の前に$\n教材例：B$3 は行3を固定',{fill:'#eef6fa'});
      arrow(ctx,685,485,685,530,C.blue);text(ctx,'オートフィルで下へコピー',685,550,11,C.blue,700,'center');

      text(ctx,'C　人口の増減シミュレーション',45,610,16,C.navy,700);
      box(ctx,55,645,360,105,'教材例','初期人口 A3 = 100,000\n増減率 B3 = 20%\nB6 = A3\nB7 = B6 * (1 + B$3)',{fill:'#f8fafb'});
      box(ctx,465,645,325,105,'POINT','増減率だけを掛けると\n「増加数／減少数」になる。\n総人口には 1（100%）を足す。',{fill:'#fff8f0',stroke:'#e3d2bf'});
      rr(ctx,840,645,280,105,'#fff','#d8e1e6',8);
      line(ctx,875,730,1080,730,C.grid,1);line(ctx,875,670,875,730,C.grid,1);
      ctx.beginPath();ctx.moveTo(875,730);[[1,721],[2,710],[3,697],[4,682],[5,665]].forEach(([i,y])=>ctx.lineTo(875+i*36,y));ctx.strokeStyle=C.blue;ctx.lineWidth=3;ctx.stroke();
      text(ctx,'20%増加のイメージ',980,755,10,C.gray,700,'center');
      wrap(ctx,'減少させる場合は増減率へ負の値を入力する。表の結果をグラフにすると，増減率を変えたときの形の変化を確認できる。',55,785,1060,18,10,C.gray,400);
    }
  });
})();