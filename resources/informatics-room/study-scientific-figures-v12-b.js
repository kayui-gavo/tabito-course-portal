/* 情報Ⅰ v12-b — UI・補数・誤差・外部データの高精細教材図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const {register}=K;
  register('b4-2',{
    title:'UI設計：シグニファイア・アフォーダンス・フールプルーフ・フェイルセーフ',height:760,
    caption:'「見た目がきれい」ではなく、操作の手掛かり・誤操作の予防・失敗時の被害低減を別の設計問題として読む。',
    question:'「削除」ボタンを押した直後に確認ダイアログを出す設計は、主にフールプルーフとフェイルセーフのどちらですか。',
    answer:'誤操作そのものを起こしにくくするのでフールプルーフ。削除後にバックアップから復旧できる設計ならフェイルセーフ寄り。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'機能と論理のデザイン','UIは利用者とコンピュータの入出力の接点。操作の意味が見えること、ミスを防ぐこと、失敗時に安全側へ倒すことを分けて設計する。');
      text(ctx,'A　悪いUI / 改善UI を比べる',45,120,16,C.navy,700);
      rr(ctx,45,155,500,235,'#fff','#d8e1e6',12);text(ctx,'改善前',70,185,14,C.red,700);box(ctx,80,220,160,52,'送信','',{fill:'#f6f7f8'});box(ctx,285,220,160,52,'削除','',{fill:'#f6f7f8'});wrap(ctx,'色・位置・文言が似ていて、押した結果も想像しにくい。',80,300,360,20,11,C.gray);rr(ctx,80,338,360,34,'#f8fafb','#d8e1e6',6);text(ctx,'処理しました',260,355,10,C.gray,400,'center','middle');
      rr(ctx,595,155,540,235,'#f8fafb','#cfdde3',12);text(ctx,'改善後',620,185,14,C.green,700);box(ctx,630,220,210,58,'メッセージを送信','紙飛行機のアイコン＋明確な文言',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,885,220,210,58,'このファイルを削除','危険操作は色・位置・文言で区別',{fill:'#fff4f2',stroke:'#e3c8c4',tc:C.red});rr(ctx,630,315,465,50,'#fff','#d7e1e6',8);text(ctx,'本当に削除しますか？　キャンセル　　削除する',862,340,10,C.dark,600,'center','middle');
      text(ctx,'B　4つの視点を「役割」で区別',45,445,16,C.navy,700);const cards=[['アフォーダンス','物の形や性質が「できそうな操作」を感じさせる。','例：取っ手→引く'],['シグニファイア','どこをどう操作するかの手掛かりを明示する。','例：下線付きリンク・矢印'],['フールプルーフ','誤操作が起きにくいようにする。','例：確認・入力制約'],['フェイルセーフ','失敗・故障時の被害を小さくする。','例：自動保存・安全停止']];cards.forEach((a,i)=>{const x=45+i*270;box(ctx,x,485,245,130,a[0],a[1]+'\n'+a[2],{fill:i===1?'#eef6fa':i===3?'#f5f9f5':'#fff',stroke:i===1?'#bfd1db':i===3?'#d1e1d5':'#d8e1e6',tc:i===3?C.green:C.navy});});
      rr(ctx,45,650,1090,70,'#f5f9fb','#d5e2e8',10);text(ctx,'設計の問い',68,677,11,C.blue,700);wrap(ctx,'「利用者は次に何をすればよいと分かるか」「間違えても破滅的な結果にならないか」を、操作の前後で確認する。',150,663,940,19,11,C.gray,400);
    }
  });

  register('b5-4',{
    title:'2の補数：符号付き表現と「引き算を足し算へ変える」仕組み',height:760,
    caption:'ビット幅を先に固定し、反転→+1で2の補数を作る。符号付き4bitでは 1110₂ は -2、符号なしでは14。',
    question:'符号付き4bitで +6 を -6 に変える2の補数表現を作れますか。',
    answer:'+6 = 0110₂ → 反転 1001₂ → +1 で 1010₂。符号付き4bitの 1010₂ は -6。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;head(ctx,'補数の計算','コンピュータは引き算を「負の数を足す」計算へ変えられる。2の補数では固定bit幅が前提。');
      text(ctx,'A　4bitで +6 → -6 を作る',45,120,16,C.navy,700);const steps=[['+6','0110'],['各bitを反転','1001'],['1を加える','1010'],['符号付き4bit','-6']];steps.forEach((s,i)=>{const x=45+i*270;box(ctx,x,155,225,92,s[0],s[1],{fill:i===2?'#fff8f0':i===3?'#f5f9f5':'#fff',stroke:i===2?'#e3d2bf':i===3?'#d1e1d5':'#d8e1e6',tc:i===2?C.orange:i===3?C.green:C.navy,ts:13,bs:20});if(i<3)arrow(ctx,x+225,201,x+260,201,i===1?C.orange:C.blue);});
      text(ctx,'B　同じビット列でも「符号付き/符号なし」で意味が変わる',45,305,16,C.navy,700);const xs=70,ys=340;['0000','0001','0010','0011','0100','0101','0110','0111','1000','1001','1010','1011','1100','1101','1110','1111'].forEach((b,i)=>{const ang=-Math.PI/2+i*Math.PI*2/16,x=260+Math.cos(ang)*130,y=485+Math.sin(ang)*130;rr(ctx,x-36,y-19,72,38,i>=8?'#fff6f4':'#eef6fa',i>=8?'#e3c8c4':'#bfd1db',6);text(ctx,b,x,y-2,9,C.dark,700,'center','middle');text(ctx,i<8?String(i):String(i-16),x,y+10,9,i<8?C.blue:C.red,700,'center','middle');});text(ctx,'符号付き4bit',260,486,14,C.navy,700,'center','middle');
      text(ctx,'C　8 − 6 を加算だけで計算',545,305,16,C.navy,700);box(ctx,545,350,210,76,'8','1000₂');box(ctx,800,350,210,76,'-6 の2の補数','1010₂',{fill:'#fff8f0',stroke:'#e3d2bf'});arrow(ctx,755,389,800,389,C.orange);text(ctx,'1000',650,500,22,C.dark,700,'center');text(ctx,'+ 1010',650,545,22,C.dark,700,'center');line(ctx,565,562,735,562,C.navy,1.5);text(ctx,'1 0010',650,598,22,C.blue,700,'center');box(ctx,800,480,300,125,'最上位の桁上りを捨てる','4bit計算なので 1 0010 の左端1は桁あふれとして無視。残る 0010₂ = 2。',{fill:'#f8fafb'});arrow(ctx,735,585,800,545,C.blue);
      rr(ctx,545,640,555,64,'#f5f9fb','#d5e2e8',9);text(ctx,'重要',565,667,11,C.orange,700);wrap(ctx,'1110₂だけでは -2 か14か決まらない。「符号付き4bit」など表現条件を必ず読む。',620,654,455,18,11,C.gray);
    }
  });

  register('b5-5',{
    title:'有限bitの限界：2進小数の誤差とオーバーフロー',height:760,
    caption:'0.625は2進有限小数だが0.1は無限小数になる。有限bitで打ち切るため誤差が生じ、上限を超えるとオーバーフローが起きる。',
    question:'0.625₁₀ が 0.101₂ と有限桁で表せる理由を、1/2・1/4・1/8 の重みで説明できますか。',
    answer:'0.625 = 0.5 + 0.125 = 1/2 + 1/8 なので、0.101₂。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell,axis}=k;head(ctx,'コンピュータの限界','10進法で有限小数でも2進法では無限小数になることがある。有限bitしかないため近似し、誤差が残る。');
      text(ctx,'A　2進小数の桁の重み',45,120,16,C.navy,700);const ws=[['1/2','0.5'],['1/4','0.25'],['1/8','0.125'],['1/16','0.0625'],['1/32','0.03125'],['1/64','0.015625']];ws.forEach((a,i)=>{const x=50+i*160;box(ctx,x,155,135,78,a[0],a[1],{fill:'#f8fafb',ts:13,bs:11});});
      text(ctx,'0.625₁₀',55,290,17,C.navy,700);const bitsA=['1','0','1','0','0','0'];bitsA.forEach((b,i)=>{cell(ctx,180+i*68,260,68,52,b,{fill:b==='1'?'#eef6fa':'#fff',fs:16});});text(ctx,'= 0.101₂',625,291,17,C.blue,700);
      text(ctx,'0.1₁₀',55,365,17,C.navy,700);const bitsB=['0','0','0','1','1','0'];bitsB.forEach((b,i)=>{cell(ctx,180+i*68,335,68,52,b,{fill:b==='1'?'#fff8f0':'#fff',fs:16});});text(ctx,'… と続き、有限桁では終わらない',625,366,13,C.orange,700);
      rr(ctx,45,425,650,92,'#fff8f0','#e3d2bf',10);text(ctx,'打ち切り → 近似値',70,454,14,C.orange,700);wrap(ctx,'コンピュータは有限個のbitでしか保存できないため、途中で表現を打ち切る。比較演算では「見た目は同じ」に見えても内部値がわずかに違うことがある。',70,468,590,19,11,C.gray);
      text(ctx,'B　オーバーフロー：表現可能範囲を超える',760,120,16,C.navy,700);axis(ctx,785,200,320,80,'値','');const minX=820,maxX=1065;line(ctx,minX,190,minX,290,C.red,2);line(ctx,maxX,190,maxX,290,C.red,2);text(ctx,'下限',minX,183,10,C.red,700,'center');text(ctx,'上限',maxX,183,10,C.red,700,'center');ctx.fillStyle='#eaf4f8';ctx.fillRect(minX,220,maxX-minX,40);arrow(ctx,930,240,1110,240,C.orange,3);text(ctx,'演算結果',975,226,10,C.orange,700,'center');text(ctx,'範囲外',1115,244,11,C.red,700,'left','middle');
      box(ctx,760,340,375,105,'誤差','表現できる範囲内でも、有限bitの近似により値が少しずれる。',{fill:'#f8fafb'});box(ctx,760,475,375,105,'オーバーフロー','演算結果そのものが、用意されたbit数の表現上限を超える。',{fill:'#fff4f2',stroke:'#e3c8c4',tc:C.red});
      rr(ctx,45,570,650,120,'#f5f9fb','#d5e2e8',10);text(ctx,'比較の実務的な考え方',70,600,13,C.blue,700);wrap(ctx,'小数を「完全に等しいか」で比較すると意図しない結果になることがある。必要な桁に丸める、許容誤差を設けるなど、目的に合う比較方法を選ぶ。',70,615,590,19,11,C.gray);
    }
  });

  register('b6-8',{
    title:'Web API・JSON・CSV・DataFrame：外部データがPythonへ入るまで',height:720,
    caption:'「外部データを使う」を一括りにせず、取得経路・データ形式・Python内の型・表形式処理を分けて読む。',
    question:'JSONを json.loads() で読み込んだ後と、CSVを pandas.read_csv() で読み込んだ後では、Python内でどんな形のデータとして扱うことが多いですか。',
    answer:'JSONは辞書型・リストなどのPythonオブジェクト、CSVはDataFrameとして扱うことが多い。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,table}=k;head(ctx,'Web APIや外部データの活用','外部サービスへ要求し、返ってきたJSON/CSVをPythonのデータ構造へ変換して、必要な列・値を取り出し分析する。');
      text(ctx,'A　Web API → JSON → Python',45,120,16,C.navy,700);box(ctx,45,165,180,88,'Python','APIへリクエスト');box(ctx,285,165,190,88,'Web API','外部サービスの窓口',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,535,165,190,88,'JSON','{"city":"Tokyo",\n"temp":31.2}',{fill:'#fff8f0',stroke:'#e3d2bf'});box(ctx,785,165,180,88,'json.loads()','JSON文字列を変換',{fill:'#f8fafb'});box(ctx,1025,165,120,88,'dict','city / temp');[225,475,725,965].forEach((x,i)=>arrow(ctx,x,209,x+60,209,i===1?C.orange:C.blue));
      text(ctx,'B　CSV → DataFrame',45,315,16,C.navy,700);const rows=[['2026-08-01','31.2','58'],['2026-08-02','32.4','55'],['2026-08-03','30.9','64']];table(ctx,45,350,450,190,['date','temp','humidity'],rows,{fs:10});arrow(ctx,515,445,615,445,C.teal,2);box(ctx,635,380,190,128,'pandas.read_csv()','CSVを表形式のDataFrameへ',{fill:'#eef6fa',stroke:'#bfd1db'});arrow(ctx,825,445,900,445,C.teal,2);box(ctx,920,365,215,158,'DataFrame','列ラベルで参照\ndf["temp"]\nastype()で型変換\nplot / matplotlibで可視化',{fill:'#f8fafb'});
      text(ctx,'C　「形式」と「Python内の型」を混同しない',45,595,16,C.navy,700);const note=[['JSON / CSV','外部で受け渡すデータ形式'],['dict / list / DataFrame','Pythonの中で扱うデータ構造'],['列名・ラベル','表から必要なデータを取り出す手掛かり']];note.forEach((a,i)=>box(ctx,45+i*360,625,330,70,a[0],a[1],{fill:i===1?'#f5f9fb':'#fff'}));
    }
  });
})();