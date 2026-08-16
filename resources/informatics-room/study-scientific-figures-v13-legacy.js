/* 情報Ⅰ v13 — v11の10枚を衝突防止コアへ移植
   旧Canvasは描画互換性のため残しても、v13登録図が優先表示される。 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const C=K.C;

  K.register('b3-4',{
    title:'音のデジタル化：標本化 → 量子化 → 符号化',height:660,
    caption:'教材例の量子化値 5, 9, 12, 14, 13, 10 を4bitで符号化し、6標本×4bit=24bitまで一枚で追います。',
    question:'標本化周波数や量子化bit数を上げると、なぜ再現が細かくなる一方でデータ量も増えるのですか。',
    answer:'1秒あたりの標本数や1標本あたりのbit数が増え、保存する情報量そのものが増えるためです。',
    draw(ctx,k){const {text,wrap,rr,box,line,arrow,head}=k;head(ctx,'音のデジタル化','時間方向を区切る標本化、振幅を段階へ丸める量子化、数値をbit列へ変える符号化を順に読む。');
      const gx=45,gy=155,gw=650,gh=330,vals=[5,9,12,14,13,10],codes=['0101','1001','1100','1110','1101','1010'];
      rr(ctx,gx,gy,gw,gh,'#fff','#d8e1e6',0);for(let v=0;v<=15;v+=3){const y=gy+gh-v/15*gh;line(ctx,gx,y,gx+gw,y,'#edf1f3');text(ctx,String(v),gx-9,y,9,C.gray,400,'right','middle');}
      const pts=vals.map((v,i)=>({x:gx+85+i*100,y:gy+gh-v/15*gh}));ctx.strokeStyle=C.navy;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(gx+20,gy+gh-25);pts.forEach((p,i)=>{if(i===0)ctx.quadraticCurveTo(p.x-35,p.y+35,p.x,p.y);else{const q=pts[i-1];ctx.bezierCurveTo(q.x+38,q.y,p.x-38,p.y,p.x,p.y);}});ctx.stroke();
      pts.forEach((p,i)=>{line(ctx,p.x,gy+gh,p.x,p.y,'#9fb5c1',1,[5,5]);ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fillStyle=C.orange;ctx.fill();text(ctx,String(i+1),p.x,gy+gh+20,9,C.gray,400,'center');text(ctx,String(vals[i]),p.x,p.y-12,10,C.orange,700,'center');});
      box(ctx,745,155,405,95,'① 標本化','一定間隔で波の高さを取り出す。標本化周波数を高くすると時間方向を細かく捉えられる。',{fill:'#eef6fa'});
      box(ctx,745,275,405,90,'② 量子化','教材例：5　9　12　14　13　10');
      box(ctx,745,390,405,105,'③ 符号化',`${codes.join('  ')}\n6標本 × 4bit = 24bit`,{fill:'#fff8f0'});
      arrow(ctx,947,250,947,273,C.blue);arrow(ctx,947,365,947,388,C.orange);
      rr(ctx,45,545,1105,60,'#f5f9fb','#d5e2e8',9);text(ctx,'標本化周波数↑ / 量子化bit数↑',70,575,13,C.blue,700);text(ctx,'→ 再現は細かくなるが、保存するbit数も増える',400,575,12,C.dark,400);
    }
  });

  K.register('b5-1',{
    title:'コンピュータの五大装置と CPU・メモリ・ストレージ',height:650,
    caption:'機能分類としての五大装置と、実際の部品名を対応させ、データ経路と制御の向きを分けます。',
    question:'メモリとストレージを、容量の大小ではなくCPUとの関係と用途で説明できますか。',
    answer:'メモリはCPUが処理中の命令・データを置く主記憶、ストレージは大容量データを長期保存する補助記憶です。',
    draw(ctx,k){const {text,rr,box,arrow,head}=k;head(ctx,'五大装置','入力・出力・記憶・演算・制御という機能分類を、CPU・メモリ・ストレージの実物名へ対応させる。');
      box(ctx,50,245,190,115,'入力装置','キーボード・マウスなど\n外界の情報を得る',{fill:'#f8fafb'});box(ctx,960,245,190,115,'出力装置','ディスプレイ・プリンタなど\n結果を外へ出す',{fill:'#f8fafb'});
      box(ctx,390,105,420,110,'記憶装置（主記憶）','メモリ：CPUと直接データをやり取りし、処理中の命令・データを保持',{fill:'#eef6fa'});
      rr(ctx,345,260,510,205,'#eef6fa',C.blue,16,2);text(ctx,'CPU',370,295,16,C.blue,700);box(ctx,390,325,180,88,'演算装置','計算をする');box(ctx,630,325,180,88,'制御装置','各装置を制御する');
      box(ctx,390,505,420,85,'補助記憶装置','ストレージ：大容量のデータを長期的に保存',{fill:'#fff8f0'});
      arrow(ctx,240,302,390,160,C.blue);arrow(ctx,810,160,960,302,C.blue);arrow(ctx,600,215,600,260,C.blue);arrow(ctx,600,465,600,505,C.orange);
      [[720,360,240,285],[720,360,960,285],[720,360,600,215]].forEach(([a,b,c,d])=>arrow(ctx,a,b,c,d,'#91a9b6',1,[6,5]));
      text(ctx,'実線＝主なデータの流れ',55,618,11,C.blue,700);text(ctx,'破線＝制御装置から各装置への制御',300,618,11,C.gray,400);
    }
  });

  K.register('b5-3',{
    title:'論理回路：真理値表から半加算回路へ',height:660,
    caption:'AND・OR・NOTの基本と、2進数1桁の加算におけるC（Carry Out）・S（Sum）を同じ図で結びます。',
    question:'1+1のとき C=1、S=0 になる理由を2進数で説明できますか。',
    answer:'1+1=10₂なので、下位bitの和Sは0、上位桁への桁上りCarry Outが1になります。',
    draw(ctx,k){const {text,wrap,rr,box,arrow,head,table}=k;head(ctx,'論理回路','真理値表を先に確認し、その出力を2進数1桁の加算へ対応させる。');
      text(ctx,'基本回路',45,125,15,C.navy,700);[['AND','両方1なら1'],['OR','少なくとも一方1なら1'],['NOT','0と1を反転']].forEach((a,i)=>box(ctx,45+i*195,150,165,88,a[0],a[1],{fill:i===0?'#eef6fa':'#fff'}));
      text(ctx,'2進数1桁の加算',45,300,15,C.navy,700);table(ctx,45,330,350,210,['A','B','C','S'],[['0','0','0','0'],['0','1','0','1'],['1','0','0','1'],['1','1','1','0']],{fs:10,fill:r=>r===3?'#fff8f0':'#fff'});text(ctx,'C = 桁上り',45,575,11,C.orange,700);text(ctx,'S = 和の下位bit',175,575,11,C.blue,700);
      rr(ctx,520,145,630,390,'#f8fafb','#d6e1e6',12);text(ctx,'半加算回路：2入力 → 2出力',550,180,16,C.navy,700);
      box(ctx,555,235,130,75,'入力 A','0 / 1');box(ctx,555,345,130,75,'入力 B','0 / 1');box(ctx,815,215,165,95,'C','ANDの出力\n1+1の桁上り',{fill:'#fff8f0'});box(ctx,815,365,165,95,'S','1bitの和\n0+1 / 1+0 など',{fill:'#eef6fa'});
      arrow(ctx,685,272,815,260);arrow(ctx,685,382,815,260);arrow(ctx,685,272,815,412,C.teal);arrow(ctx,685,382,815,412,C.teal);box(ctx,1010,285,115,115,'全加算回路','下の桁からのCarry Inにも対応');arrow(ctx,980,337,1010,337,C.orange);
      rr(ctx,520,565,630,48,'#f5f9fb','#d5e2e8',8);text(ctx,'回路図は左から追い、中間出力を書いてから次へ進む',835,589,11,C.blue,700,'center','middle');
    }
  });

  K.register('b6-1',{
    title:'アルゴリズムを表す3種類の図',height:660,
    caption:'フローチャート・アクティビティ図・状態遷移図を「何を表すか」で区別します。',
    question:'3種類の図を、見た目ではなく「何を表現する図か」で区別できますか。',
    answer:'フローチャートは処理の流れ、アクティビティ図は並行する処理、状態遷移図は状態と遷移条件を表します。',
    draw(ctx,k){const {text,rr,box,line,arrow,head}=k;head(ctx,'アルゴリズムの表現','単一処理の順序、並行する処理、状態の移り変わりは別の関係なので、同じ矢印図として混同しない。');
      const xs=[45,420,795],titles=['フローチャート','アクティビティ図','状態遷移図'],subs=['単一処理の流れ','並行して行われる処理','状態と遷移条件'];xs.forEach((x,i)=>{rr(ctx,x,135,330,425,'#fff','#d8e1e6',12);text(ctx,titles[i],x+20,170,16,[C.blue,C.teal,C.orange][i],700);text(ctx,subs[i],x+20,196,10,C.gray,400);});
      box(ctx,135,230,150,52,'開始','');box(ctx,135,315,150,58,'処理','値を入力');rr(ctx,165,415,90,65,'#fff8f0','#e3d2bf',4);text(ctx,'条件?',210,447,12,C.navy,700,'center','middle');box(ctx,90,505,100,48,'Yes','処理A',{fill:'#eef6fa'});box(ctx,230,505,100,48,'No','処理B');arrow(ctx,210,282,210,315);arrow(ctx,210,373,210,415);arrow(ctx,165,447,140,505);arrow(ctx,255,447,280,505);
      line(ctx,440,220,730,220);text(ctx,'自分',500,210,10,C.gray,700,'center');text(ctx,'スマホ',655,210,10,C.gray,700,'center');line(ctx,575,220,575,535);box(ctx,455,250,105,50,'操作','画面点灯');box(ctx,595,250,110,50,'認証','指紋・顔');box(ctx,455,350,105,50,'確認','');box(ctx,595,350,110,50,'判定','Yes / No');box(ctx,455,455,105,50,'解除','');box(ctx,595,455,110,50,'エラー','');arrow(ctx,507,300,507,350);arrow(ctx,650,300,650,350);arrow(ctx,560,375,595,375,C.teal);arrow(ctx,650,400,507,455,C.teal);arrow(ctx,650,400,650,455,C.orange);
      const states=[[900,280,'待機'],[1035,280,'計測'],[970,455,'終了']];states.forEach(([x,y,s])=>{ctx.beginPath();ctx.arc(x,y,46,0,Math.PI*2);ctx.fillStyle='#f8fafb';ctx.fill();ctx.strokeStyle=C.orange;ctx.lineWidth=2;ctx.stroke();text(ctx,s,x,y,12,C.navy,700,'center','middle');});arrow(ctx,946,280,989,280,C.orange);text(ctx,'開始',968,252,9,C.gray,400,'center');arrow(ctx,1012,320,982,409,C.orange);text(ctx,'終了',1040,370,9,C.gray,400,'center');
      rr(ctx,45,590,1080,40,'#f5f9fb','#d5e2e8',8);text(ctx,'図の種類は「表したい関係」で選ぶ',585,610,11,C.blue,700,'center','middle');
    }
  });

  K.register('b8-1',{
    title:'LAN・ルータ・ISP・インターネットの位置関係',height:650,
    caption:'LAN内の接続機器と、外部ネットワークへ出るためのルータ・ISPを一枚で追います。',
    question:'LAN内からインターネットへ出るとき、ハブ/AP・ルータ・ISPはどの順で役割を持ちますか。',
    answer:'ハブ/APがLAN内端末を接続し、ルータが異なるネットワーク間を中継し、ISPの接続サービスを通じてインターネットへつながります。',
    draw(ctx,k){const {text,rr,box,line,arrow,head}=k;head(ctx,'ネットワーク','「LAN内の接続」と「別ネットワークへの中継」を分けると、機器の配置を判断しやすい。');
      rr(ctx,45,150,500,350,'#f8fafb','#cfdce2',14);text(ctx,'LAN（学校・家庭など）',70,185,15,C.navy,700);box(ctx,80,235,140,70,'PC','有線');box(ctx,80,345,140,70,'プリンタ','有線');box(ctx,300,285,135,82,'ハブ','LAN内の有線端末を接続',{fill:'#eef6fa'});arrow(ctx,220,270,300,310);arrow(ctx,220,380,300,340);box(ctx,330,435,165,68,'アクセスポイント','無線LAN端末を接続');box(ctx,70,455,130,58,'スマホ','無線');line(ctx,200,485,330,470,C.teal,2,[7,5]);
      box(ctx,580,280,145,90,'ルータ','異なるネットワーク間を中継',{fill:'#fff8f0'});arrow(ctx,435,326,580,326,C.orange);box(ctx,775,280,145,90,'ISP','インターネット接続を提供');arrow(ctx,725,326,775,326,C.orange);
      ctx.beginPath();ctx.ellipse(1050,325,115,68,0,0,Math.PI*2);ctx.fillStyle='#eef6fa';ctx.fill();ctx.strokeStyle=C.blue;ctx.lineWidth=2;ctx.stroke();text(ctx,'インターネット',1050,325,15,C.navy,700,'center','middle');arrow(ctx,920,326,935,326,C.blue);
      box(ctx,735,455,180,80,'クライアント','サービスを要求する側');box(ctx,955,455,180,80,'サーバ','サービスを提供する側');arrow(ctx,915,493,955,493,C.blue);text(ctx,'要求',935,477,9,C.gray,400,'center');arrow(ctx,955,522,915,522,C.teal);text(ctx,'応答',935,546,9,C.gray,400,'center');text(ctx,'実線＝有線　／　点線＝無線',55,590,11,C.gray,400);
    }
  });

  K.register('b8-2',{
    title:'TCP/IP 4階層：送信側と受信側を対応させる',height:650,
    caption:'HTTP・TCP/UDP・IP・Ethernet/無線LANを、それぞれの階層の役割と同じ位置で整理します。',
    question:'HTTP・TCP・IP・無線LANを、それぞれどの層へ置くか説明できますか。',
    answer:'HTTPはアプリケーション層、TCPはトランスポート層、IPはインターネット層、無線LANはネットワークインタフェース層です。',
    draw(ctx,k){const {text,rr,box,arrow,head}=k;head(ctx,'TCP/IP 4階層','各層が担当する役割と代表プロトコルを、送信側・受信側で同じ高さへ対応させる。');
      const layers=[['アプリケーション層','何を｜HTTP / SMTP / FTP'],['トランスポート層','ミスなく・効率よく｜TCP / UDP'],['インターネット層','誰から誰に｜IP'],['ネットワークインタフェース層','どんな方法で｜Ethernet / 無線LAN / PPP']];text(ctx,'送信側',180,125,16,C.navy,700,'center');text(ctx,'受信側',1020,125,16,C.navy,700,'center');
      layers.forEach((L,i)=>{const y=155+i*105,fill=i%2===0?'#f6fafb':'#fff';box(ctx,55,y,420,82,L[0],L[1],{fill});box(ctx,725,y,420,82,L[0],L[1],{fill});if(i<3){arrow(ctx,265,y+82,265,y+103,C.blue,1.5);arrow(ctx,935,y+103,935,y+82,C.teal,1.5);}arrow(ctx,475,y+41,725,y+41,'#9aadb7',1,[6,5]);});
      rr(ctx,505,170,165,365,'#fff8f0','#e3d2bf',12);text(ctx,'送信データ',587,205,13,C.orange,700,'center');['アプリ情報','TCP/UDP情報','IPアドレス','通信機器情報'].forEach((s,i)=>{rr(ctx,530,245+i*60,115,42,i===0?'#fff':'#fbf7f2','#d8e1e6',5);text(ctx,s,587,266+i*60,9.5,C.dark,500,'center','middle',105,8.5);});text(ctx,'各層で情報を付加し、受信側の対応層で読み取る',600,605,11,C.blue,700,'center');
    }
  });

  K.register('b8-3',{
    title:'Webページ閲覧と電子メール：サーバ間の流れ',height:650,
    caption:'WebはDNS→HTTP/HTTPS、メールはSMTPで送信・転送しPOP/IMAPで受信する流れを左右に分けます。',
    question:'Web閲覧とメール送受信で、DNS・HTTP/HTTPS・SMTP・POP/IMAPはどの場面に現れますか。',
    answer:'DNSは名前解決、HTTP/HTTPSはWebデータ、SMTPはメール送信・サーバ間転送、POP/IMAPは受信側でメールを利用するときに使います。',
    draw(ctx,k){const {text,rr,box,line,arrow,head}=k;head(ctx,'WWWとメール','同じネットワーク利用でも、Web閲覧とメールではサーバの種類とプロトコルの流れが異なる。');line(ctx,600,120,600,610);
      text(ctx,'A  Webページ閲覧',45,125,16,C.navy,700);box(ctx,45,195,160,82,'Webブラウザ','www.sample.com');box(ctx,270,175,190,102,'DNSサーバ','ドメイン名 ↔ IPアドレス\n対応表を管理',{fill:'#eef6fa'});box(ctx,270,365,190,92,'Webサーバ','123.123.123.XXX');arrow(ctx,205,220,270,220);text(ctx,'① IPを問い合わせ',237,204,9,C.gray,400,'center');arrow(ctx,270,255,205,255,C.teal);text(ctx,'② IPを返す',237,276,9,C.gray,400,'center');arrow(ctx,155,277,320,365,C.orange);text(ctx,'③ HTTP/HTTPSで要求',240,330,9,C.gray,400,'center');arrow(ctx,300,410,155,277,C.blue);text(ctx,'④ Webページを受信',210,432,9,C.gray,400,'center');
      text(ctx,'B  電子メール',635,125,16,C.navy,700);box(ctx,635,210,130,78,'送信者','メールソフト');box(ctx,810,195,150,105,'送信側メールサーバ','');box(ctx,1000,195,150,105,'受信側メールサーバ','');box(ctx,1000,405,150,78,'受信者','メールソフト');arrow(ctx,765,249,810,249,C.orange);text(ctx,'SMTP',787,231,9,C.orange,700,'center');arrow(ctx,960,249,1000,249,C.orange);text(ctx,'SMTP',980,231,9,C.orange,700,'center');arrow(ctx,1075,300,1075,405,C.blue);text(ctx,'POP / IMAP',1090,355,9,C.blue,700);box(ctx,810,405,150,78,'DNSサーバ','宛先ドメインからメールサーバIPを取得',{fill:'#eef6fa'});arrow(ctx,885,300,885,405,C.teal,1.5,[6,5]);
      rr(ctx,635,530,515,68,'#f5f9fb','#d5e2e8',8);text(ctx,'POP：端末へ取得 ／ IMAP：サーバ上で管理',892,558,10.5,C.blue,700,'center');text(ctx,'Webメールはブラウザを使って利用する',892,580,9.5,C.gray,400,'center');
    }
  });

  K.register('b8-5',{
    title:'公開鍵暗号方式とデジタル署名：鍵の向きを分ける',height:660,
    caption:'秘密通信と本人確認は目的が異なるため、公開鍵・秘密鍵を使う向きも異なります。',
    question:'公開鍵暗号とデジタル署名で、使う鍵の向きが逆になる理由を目的から説明できますか。',
    answer:'秘密通信では受信者だけが読めるよう受信者の公開鍵で暗号化し、署名では送信者本人を確認するため送信者の秘密鍵で署名します。',
    draw(ctx,k){const {text,box,line,arrow,rr,head}=k;head(ctx,'暗号化と署名','暗号化は「受信者だけが読める」、署名は「送信者本人・改ざんなしを確かめる」という目的から鍵を選ぶ。');line(ctx,600,110,600,615);
      text(ctx,'A  公開鍵暗号',45,125,17,C.navy,700);box(ctx,45,185,145,75,'平文','HELLO');box(ctx,250,185,220,75,'受信者の公開鍵','暗号化に使用',{fill:'#eef6fa'});arrow(ctx,190,222,250,222);box(ctx,45,340,205,78,'暗号文','盗み見ても意味不明',{fill:'#fff8f0'});arrow(ctx,360,260,160,340,C.orange);box(ctx,320,340,200,78,'受信者の秘密鍵','復号に使用');arrow(ctx,250,379,320,379);box(ctx,320,500,200,70,'復号した平文','HELLO',{fill:'#f4f9f7'});arrow(ctx,420,418,420,500,C.teal);box(ctx,45,485,210,90,'要点','受信者の公開鍵で暗号化\n→ 受信者の秘密鍵で復号',{fill:'#f8fafb'});
      text(ctx,'B  デジタル署名',635,125,17,C.navy,700);box(ctx,635,175,135,68,'メッセージ','HELLO');box(ctx,805,175,150,68,'ハッシュ関数','一定長の値へ',{fill:'#eef6fa'});box(ctx,995,175,120,68,'ハッシュ値','H');arrow(ctx,770,209,805,209);arrow(ctx,955,209,995,209);box(ctx,770,300,190,80,'送信者の秘密鍵','Hから署名を作る');box(ctx,1000,300,115,80,'署名','SIG',{fill:'#fff8f0'});arrow(ctx,1055,243,865,300,C.orange);arrow(ctx,960,340,1000,340,C.orange);
      box(ctx,635,470,135,70,'受信文','HELLO');box(ctx,805,470,150,70,'ハッシュ関数','→ H1',{fill:'#eef6fa'});box(ctx,990,460,155,90,'署名を検証','送信者の公開鍵\n→ H2',{fill:'#eef6fa'});arrow(ctx,770,505,805,505);arrow(ctx,955,505,990,505);rr(ctx,690,575,430,48,'#f4f9f5','#d3e4d7',8);text(ctx,'H1 = H2 → 改ざんなし・送信者本人を確認',905,599,11,C.green,700,'center','middle');
    }
  });

  K.register('b8-7',{
    title:'リレーショナルデータベース：選択・射影・結合',height:660,
    caption:'行を絞る「選択」、列を取り出す「射影」、共通キーで複数表をつなぐ「結合」を書籍表で整理します。',
    question:'選択・射影・結合を、行・列・複数テーブルのどれを操作するかで説明できますか。',
    answer:'選択は条件に合う行、射影は必要な列、結合は関連する複数テーブルを共通キーでつなぎます。',
    draw(ctx,k){const {text,wrap,table,arrow,head}=k;head(ctx,'リレーショナルデータベース','同じ表を使って「行」「列」「表同士」の3種類の操作を分ける。');const books=[['S1','吾輩は猫である','T1'],['S2','伊豆の踊子','T2'],['S3','三四郎','T1'],['S4','草枕','T1'],['S5','雪国','T2']];
      text(ctx,'元の書籍テーブル',45,125,14,C.navy,700);table(ctx,45,145,420,240,['書籍ID','書籍名','著者ID'],books,{fs:9.5});text(ctx,'選択',535,125,14,C.blue,700);wrap(ctx,'条件を満たすレコード（行）を抽出',535,140,250,18,9.5,C.gray);table(ctx,535,185,285,128,['書籍ID','書籍名','著者ID'],books.filter(r=>r[2]==='T2'),{fs:8.5,fill:()=> '#fff8f0'});arrow(ctx,465,260,535,250);
      text(ctx,'射影',900,125,14,C.teal,700);wrap(ctx,'必要なフィールド（列）だけを取り出す',900,140,250,18,9.5,C.gray);table(ctx,950,185,155,210,['書籍名'],books.map(r=>[r[1]]),{fs:8.5,headFill:'#ddeeea',fill:()=> '#eef7f5'});
      text(ctx,'結合',535,375,14,C.orange,700);wrap(ctx,'共通する著者IDで書籍表と著者表をつなぐ',535,390,460,18,9.5,C.gray);table(ctx,535,435,230,115,['著者ID','著者'],[['T1','夏目漱石'],['T2','川端康成']],{fs:8.5});arrow(ctx,765,493,805,493,C.orange);table(ctx,805,425,345,165,['書籍ID','書籍名','著者ID','著者'],books.map(r=>[...r,r[2]==='T1'?'夏目漱石':'川端康成']),{fs:7.8});text(ctx,'列＝フィールド / カラム / 属性　　行＝レコード / タプル / 組',45,610,10.5,C.navy,700);
    }
  });

  K.register('b9-4',{
    title:'相関・回帰・残差・標本から母集団へ',height:660,
    caption:'相関係数の向きと強さ、回帰直線と残差、標本から母集団を推定する考え方を一枚にまとめます。',
    question:'回帰直線がすべての点を通らなくても使える理由と、残差の意味を説明できますか。',
    answer:'回帰直線は全体傾向を表す近似直線で、各点と回帰直線との差が残差です。',
    draw(ctx,k){const {text,rr,box,line,arrow,head}=k;head(ctx,'データの解釈','相関は直線的関係の向き・強さ、回帰は関係式、標本調査は母集団を確率的に推定する方法。');const sx=45,sy=155,sw=455,sh=290;rr(ctx,sx,sy,sw,sh,'#fbfcfc','#d8e1e6',0);const px=[.04,.18,.27,.38,.48,.56,.65,.72,.80,.89,.96],py=[.05,.45,.40,.37,.50,.56,.43,.66,.72,.80,.93];ctx.strokeStyle=C.orange;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(sx,sy+sh-18);ctx.lineTo(sx+sw,sy+18);ctx.stroke();px.forEach((p,i)=>{const x=sx+p*sw,y=sy+(1-py[i])*sh;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle=C.blue;ctx.fill();if([1,6,8].includes(i)){const ly=sy+sh-(.10+.82*p)*sh;line(ctx,x,y,x,ly,'#9fb0b9',1,[4,4]);}});text(ctx,'回帰直線',62,178,11,C.orange,700);text(ctx,'縦の差＝残差',62,425,10,C.gray,400);
      text(ctx,'相関係数 r',45,490,13,C.navy,700);line(ctx,75,525,450,525,'#b9c7ce',5);[-1,-.5,0,.5,1].forEach((v,i)=>{const x=75+i*93.75;line(ctx,x,515,x,535,C.navy,1.2);text(ctx,String(v),x,552,9,C.gray,400,'center');});text(ctx,'負の相関',75,575,9,C.gray);text(ctx,'相関なし',262,575,9,C.gray,400,'center');text(ctx,'正の相関',450,575,9,C.gray,400,'right');
      box(ctx,610,165,205,110,'母集団','統計対象となる全体\n例：15万個');box(ctx,920,165,185,110,'標本','母集団から抽出した部分集合\n例：100個',{fill:'#fff8f0'});arrow(ctx,815,220,920,220,C.orange);text(ctx,'無作為に抽出',867,203,9,C.gray,400,'center');box(ctx,690,350,330,135,'推定','無作為に抽出した標本を調べ、母集団がどのような値を持つかを確率的に推測する。',{fill:'#eef6fa'});arrow(ctx,1010,275,855,350,C.blue);rr(ctx,610,545,495,58,'#fff7f6','#ead5d2',9);text(ctx,'相関が強くても「一方が他方の原因」とは限らない',857,574,12,C.red,700,'center','middle');
    }
  });

  window.SCIENTIFIC_LEGACY_MIGRATED_V13=['b3-4','b5-1','b5-3','b6-1','b8-1','b8-2','b8-3','b8-5','b8-7','b9-4'];
})();