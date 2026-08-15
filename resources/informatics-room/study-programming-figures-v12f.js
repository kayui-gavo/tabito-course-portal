/* 情報Ⅰ＜プログラミング編＞ v12f — 初級第1〜7講を原教材に合わせて図解 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const C=K.C;
  const configs={
    p1:{title:'print関数：文字列・数値・変数の「値」を表示する',height:620,caption:'教材は print(\'shibuya\')、print(109)、変数chimeiをprintする3例から開始。確認問題は name=\'Tokyo\' に対して print(name)。',question:'print(\'name\') と print(name) は何が違いますか。',answer:'前者は文字列nameそのものを表示し、後者は変数nameに代入されている値を表示する。',draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'print関数','丸括弧の中に「何を指定したか」を読む。引用符があるか、変数名かで表示内容が変わる。');
      const items=[['文字列',"print('shibuya')",'shibuya'],['整数', 'print(109)','109'],['変数',"chimei='shibuya'\nprint(chimei)",'shibuya']];items.forEach((a,i)=>{const x=45+i*370;box(ctx,x,155,320,105,a[0],a[1],{fill:i===2?'#eef6fa':'#fff'});arrow(ctx,x+160,260,x+160,315,i===2?C.teal:C.blue);box(ctx,x,315,320,70,'実行結果',a[2],{fill:'#f8fafb'});});
      box(ctx,45,455,510,90,'確認問題',"name = 'Tokyo'\nprint(name) → Tokyo",{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,625,455,510,90,'比較',"print('name') → name\nprint(name) → Tokyo",{fill:'#fff8f0',stroke:'#e3d2bf'});
    }},
    p2:{title:'四則演算：式の中で + − × ÷ を組み合わせる',height:650,caption:'教材はa=5,b=3で +,-,*,/ を確認。確認問題はりんご200円×3、みかん100円×2、50円引きで750円。',question:'支払額の式で割引クーポン50円の前が「-」になる理由は何ですか。',answer:'商品代の合計から50円を差し引くため。200×3 + 100×2 - 50 = 750。',draw(ctx,k){const {text,wrap,rr,box,arrow,head,table}=k;head(ctx,'四則演算','Pythonでは掛け算は *、割り算は /。買い物のような文章条件をそのまま式の項へ対応させる。');
      table(ctx,45,145,1090,210,['演算','Python','a=5,b=3','結果'],[['足し算','a + b','5 + 3','8'],['引き算','a - b','5 - 3','2'],['掛け算','a * b','5 * 3','15'],['割り算','a / b','5 / 3','1.666…']],{fs:10,headFill:'#eff5f8'});
      text(ctx,'確認問題：買い物の式へ',45,410,16,C.navy,700);box(ctx,45,450,250,90,'りんご','200 × 3\n= 600',{fill:'#eef6fa'});box(ctx,335,450,250,90,'みかん','100 × 2\n= 200',{fill:'#eef6fa'});box(ctx,625,450,220,90,'クーポン','− 50',{fill:'#fff8f0'});arrow(ctx,845,495,930,495,C.orange);box(ctx,930,450,205,90,'支払額','600+200−50\n= 750円',{fill:'#f4f9f7'});
    }},
    p3:{title:'累乗・商・余り：** / // / % の役割を分ける',height:660,caption:'教材はa=5,b=3で 5**3=125、5//3=1、5%3=2。確認問題は25÷7の商3と余り4。',question:'25 // 7 と 25 % 7 は、それぞれ何を返しますか。',answer:'25//7は整数の商3、25%7は余り4。',draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'累乗・商・余り','似た記号を「割り算の結果」のどの部分を取り出すかで区別する。');
      box(ctx,45,150,320,100,'累乗 **','5 ** 3\n= 5×5×5 = 125',{fill:'#eef6fa'});box(ctx,440,150,320,100,'商 //','5 // 3\n= 1',{fill:'#f8fafb'});box(ctx,835,150,300,100,'余り %','5 % 3\n= 2',{fill:'#fff8f0'});
      text(ctx,'確認問題：25 = 7 × 3 + 4',45,325,16,C.navy,700);box(ctx,130,370,360,105,'q = 25 // 7','商 q = 3',{fill:'#eef6fa'});box(ctx,710,370,360,105,'r = 25 % 7','余り r = 4',{fill:'#fff8f0'});arrow(ctx,490,422,710,422,C.teal);
      rr(ctx,45,535,1090,55,'#f5f9fb','#d5e2e8',9);wrap(ctx,'/ は通常の割り算で 25/7 = 3.571… 。「商と余り」を整数で取りたいときは // と % を組にして使う。',70,550,1030,20,11,C.gray,400);
    }},
    p4:{title:'比較演算子：比較の結果は True / False',height:650,caption:'教材はa=5,b=3で >,<,==,!=,>=,<= を比較。確認問題はa=7,b=2で a!=b → True。',question:'「等しい」を = ではなく == と書くのはなぜですか。',answer:'Pythonでは = は代入、== は2つの値が等しいかを比較する演算子として役割を分けている。',draw(ctx,k){const {text,wrap,rr,box,head,table}=k;head(ctx,'比較演算子','比較式は数値そのものではなく論理値 True / False を返し、後のif条件などに使われる。');
      table(ctx,45,145,1090,275,['演算子','意味','a=5,b=3','結果'],[['>','より大きい','5 > 3','True'],['<','より小さい','5 < 3','False'],['==','等しい','5 == 3','False'],['!=','等しくない','5 != 3','True'],['>=','以上','5 >= 3','True'],['<=','以下','5 <= 3','False']],{fs:10,headFill:'#eff5f8'});
      box(ctx,45,480,500,85,'確認問題','a=7, b=2\na != b → 7と2は等しくない → True',{fill:'#eef6fa'});box(ctx,635,480,500,85,'記号の役割','= は代入\n== は「等しいか」の比較',{fill:'#fff8f0'});
    }},
    p5:{title:'配列：要素の並びと0始まりの添字を対応させる',height:650,caption:'教材は Num=[1,2,3,4,5] で Num[0]=1、Num[4]=5。確認問題は Numbers[2]→3。',question:'配列の「3番目の要素」が Numbers[2] になるのはなぜですか。',answer:'Pythonの添字は先頭を0として数えるため、1番目→index0、2番目→1、3番目→2となる。',draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'配列','値の順番と添字を別に書くと、0始まりのずれを間違えにくい。');
      const vals=[1,2,3,4,5];vals.forEach((v,i)=>{const x=105+i*195;rr(ctx,x,170,155,78,i===2?'#fff8f0':'#fff',i===2?'#e3d2bf':'#d7e1e6',7);text(ctx,String(v),x+77,200,18,i===2?C.orange:C.navy,700,'center');text(ctx,`index ${i}`,x+77,232,10,C.gray,700,'center');});
      box(ctx,45,330,330,90,'Num[0]','→ 1（先頭）',{fill:'#eef6fa'});box(ctx,435,330,330,90,'Numbers[2]','→ 3（3番目）',{fill:'#fff8f0'});box(ctx,825,330,310,90,'Num[4]','→ 5（5番目）',{fill:'#eef6fa'});
      rr(ctx,45,505,1090,55,'#f5f9fb','#d5e2e8',9);wrap(ctx,'要素数5の配列で使える添字は 0,1,2,3,4。最後の添字は「要素数−1」。',70,520,1030,20,11,C.gray,400);
    }},
    p6:{title:'乱数：randint(a,b) は a以上b以下の整数を1つ生成する',height:620,caption:'教材は random.randint(1,10) を紹介。確認問題はサイコロとして random.randint(1,6)。実行するたび結果が変わり得る。',question:'サイコロの出目を作るとき randint(0,6) ではなく randint(1,6) とする理由は何ですか。',answer:'実際の六面サイコロの出目は1〜6で、0は出目として存在しないから。randintは両端を含む。',draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'乱数','randomモジュールをimportし、randintの下限・上限を現実の候補範囲に合わせる。');
      box(ctx,45,160,250,90,'import random','乱数機能を使えるようにする',{fill:'#f8fafb'});arrow(ctx,295,205,400,205,C.blue);box(ctx,400,160,330,90,'random.randint(1,10)','1〜10を両端含めて1つ',{fill:'#eef6fa'});arrow(ctx,730,205,835,205,C.teal);box(ctx,835,160,300,90,'実行例','8 など\n※毎回同じとは限らない',{fill:'#fff8f0'});
      text(ctx,'確認問題：サイコロ',45,340,16,C.navy,700);const dice=[1,2,3,4,5,6];dice.forEach((v,i)=>{rr(ctx,70+i*170,380,135,68,'#fff','#d7e1e6',7);text(ctx,String(v),137+i*170,414,17,C.navy,700,'center','middle');});box(ctx,330,500,540,72,'dice_roll = random.randint(1,6)','1〜6のどれか1つ → 六面サイコロを模倣',{fill:'#eef6fa'});
    }},
    p7:{title:'len関数：文字列の文字数・配列の要素数を数える',height:620,caption:'教材は len(\'Hello, world!\')=13 と len([1,2,3,4,5])=5。確認問題は Animals 4要素なので len(Animals)=4。',question:'len(Animals) が返す4は、最後の添字3とどう違いますか。',answer:'4は要素の個数。添字は0始まりなので最後の位置番号は3。個数と最後の添字は1ずれる。',draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'len関数','「何文字あるか」「何要素あるか」という個数を返す。添字そのものを返す関数ではない。');
      box(ctx,45,160,470,105,"len('Hello, world!')",'文字列の長さ → 13',{fill:'#eef6fa'});box(ctx,665,160,470,105,'len([1,2,3,4,5])','配列の要素数 → 5',{fill:'#f8fafb'});
      text(ctx,'確認問題：Animals',45,340,16,C.navy,700);['cat','dog','fish','bird'].forEach((v,i)=>{const x=120+i*225;rr(ctx,x,380,185,70,'#fff','#d7e1e6',7);text(ctx,v,x+92,407,13,C.navy,700,'center');text(ctx,`index ${i}`,x+92,435,9,C.gray,600,'center');});box(ctx,330,500,540,70,'len(Animals) = 4','個数4 / 最後の添字3',{fill:'#fff8f0',stroke:'#e3d2bf'});
    }}
  };
  const baseRender=window.renderStudyLesson;
  function insert(){const id=new URLSearchParams(location.search).get('id')||'',lesson=typeof studyLessonById==='function'?studyLessonById(id):null,config=configs[id];if(!lesson||lesson.track!=='programming'||!config||document.querySelector(`[data-program-figure-v12f="${id}"]`))return;const section=K.makeSection(id,config);section.dataset.programFigureV12f=id;const target=document.querySelector('.program-source-v9')||document.querySelector('.program-example-v6')||document.querySelector('#example');if(target)target.insertAdjacentElement('afterend',section);else document.querySelector('.lesson-paper')?.appendChild(section);K.bindSection(section,config);}
  window.PROGRAM_FIGURE_V12F_COUNT=Object.keys(configs).length;
  window.renderStudyLesson=function renderProgramFiguresV12f(){baseRender();insert();};
})();