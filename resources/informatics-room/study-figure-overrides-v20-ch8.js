/* 情報Ⅰ v20 — 第8講 原教材準拠図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;
  const {register}=K;

  register('b8-1',{
    title:'ネットワーク：LAN内の接続とインターネットへの出口を分けて読む',height:840,
    caption:'ハブ／アクセスポイントはLAN内，ルータは別ネットワークへの中継，ISPはインターネット接続サービス。クライアント／サーバは要求側／提供側で判定する。',
    question:'学校のLANからインターネットへ出る境界で，別ネットワークへデータを中継する装置は何ですか。',
    answer:'ルータ。ハブやアクセスポイントは主にLAN内の端末接続を担い，ルータが別ネットワークへ中継する。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;
      head(ctx,'ネットワークの構成','「LANの中でつなぐ装置」と「LANの外へつなぐ装置」を分ける。');
      text(ctx,'A　LAN → WAN / インターネット',45,120,16,C.navy,700);
      rr(ctx,45,155,690,250,'#f7fafc','#cfdde3',12);
      text(ctx,'家庭・学校のLAN',70,185,13,C.blue,700);
      box(ctx,75,220,180,72,'PC','有線LAN');
      box(ctx,75,315,180,72,'スマートフォン','無線LAN');
      box(ctx,330,215,175,78,'ハブ','有線端末を集約',{fill:'#fff'});
      box(ctx,330,310,175,78,'アクセスポイント','無線端末を集約',{fill:'#eef6fa'});
      box(ctx,555,255,145,92,'ルータ','別ネットワークへ中継',{fill:'#fff8f0',stroke:'#e3d2bf'});
      arrow(ctx,255,256,330,254,C.blue);arrow(ctx,255,351,330,349,C.teal);arrow(ctx,505,254,555,285,C.blue);arrow(ctx,505,349,555,317,C.teal);
      box(ctx,800,205,160,86,'ISP','接続サービス',{fill:'#f8fafb'});box(ctx,1010,205,145,86,'インターネット','世界のネットワーク',{fill:'#eef6fa'});arrow(ctx,700,301,800,248,C.orange,2);arrow(ctx,960,248,1010,248,C.blue,2);
      box(ctx,800,325,355,80,'公衆無線LAN','駅などで一般利用者へWi-Fi接続を提供',{fill:'#fff'});

      text(ctx,'B　無線LAN規格：周波数帯と特徴',45,465,16,C.navy,700);
      box(ctx,55,505,330,100,'2.4GHz帯','障害物の影響を受けにくい\n電子レンジなどと干渉しやすい',{fill:'#fff8f0',stroke:'#e3d2bf'});
      box(ctx,425,505,330,100,'5GHz帯','障害物の影響を受けやすい\n障害物がなければ高速・安定しやすい',{fill:'#eef6fa'});
      rr(ctx,795,500,350,110,'#fff','#d8e1e6',8);
      text(ctx,'IEEE802.11 の教材例',815,528,12,C.navy,700);
      text(ctx,'b / g / a / n / ac / ax',815,558,12,C.dark,700);
      wrap(ctx,'規格ごとの周波数帯・最大速度は教材表の条件を読む。',815,578,305,18,10,C.gray,400);

      text(ctx,'C　クライアントサーバシステム',45,675,16,C.navy,700);
      box(ctx,90,715,300,82,'クライアント','サービスやデータを要求する側',{fill:'#eef6fa'});
      box(ctx,800,715,300,82,'サーバ','要求に応じてサービスを提供する側',{fill:'#f8fafb'});
      arrow(ctx,390,742,800,742,C.blue,2);text(ctx,'要求',595,724,10,C.blue,700,'center');
      arrow(ctx,800,773,390,773,C.teal,2);text(ctx,'Webページ・メールなどを提供',595,802,10,C.teal,700,'center');
    }
  });

  register('b8-2',{
    title:'プロトコルとTCP/IP：IPアドレス・4階層・パケット通信',height:900,
    caption:'IPv4は32bitを8bit×4へ分ける。TCP/IPは4階層，通信データはパケットへ分割され，ルータがルーティングする。',
    question:'IPv4アドレスの1ブロックに258と書けないのはなぜですか。',
    answer:'1ブロックは8bitなので0〜255までしか表せないため。IPv4は8bit×4＝32bit。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;
      head(ctx,'TCP/IPで通信を読む','「相手を識別するIPアドレス」「通信規則の階層」「パケットの経路」を分けて整理する。');
      text(ctx,'A　IPv4：32bit = 8bit × 4',45,120,16,C.navy,700);
      const nums=['192','168','10','24'];
      nums.forEach((s,i)=>{cell(ctx,75+i*190,155,145,62,s,{fill:i===3?'#eef6fa':'#fff',fs:18});if(i<3)text(ctx,'.',238+i*190,185,18,C.gray,700,'center','middle');text(ctx,'8bit',147+i*190,235,10,C.gray,600,'center');});
      box(ctx,855,150,280,94,'1ブロック','00000000₂〜11111111₂\n= 0〜255',{fill:'#fff8f0',stroke:'#e3d2bf'});

      text(ctx,'B　TCP/IPの4階層',45,305,16,C.navy,700);
      const layers=[
        ['第4層 アプリケーション','HTTP / SMTP / POP3 / FTP','#eef6fa'],
        ['第3層 トランスポート','TCP / UDP','#f8fafb'],
        ['第2層 インターネット','IP','#fff8f0'],
        ['第1層 ネットワークインタフェース','イーサネット / 無線LAN / PPP','#fff']
      ];
      layers.forEach((a,i)=>{box(ctx,65,345+i*78,590,60,a[0],a[1],{fill:a[2]});});
      box(ctx,715,350,400,110,'TCP','到着確認・再送制御あり\n信頼性を重視',{fill:'#eef6fa'});
      box(ctx,715,485,400,110,'UDP','再送制御を行わない\n高速・リアルタイム性を重視',{fill:'#fff8f0',stroke:'#e3d2bf'});

      text(ctx,'C　パケットとルーティング',45,680,16,C.navy,700);
      box(ctx,55,720,190,76,'送信元','大きなデータ');
      ['1','2','3'].forEach((s,i)=>box(ctx,300+i*115,720,85,76,`Packet ${s}`,'',{fill:'#eef6fa'}));
      box(ctx,690,700,150,95,'ルータA','経路を選択',{fill:'#fff8f0'});box(ctx,940,700,150,95,'ルータB','',{fill:'#fff'});
      arrow(ctx,245,758,300,758,C.blue);arrow(ctx,615,758,690,748,C.blue);arrow(ctx,840,730,940,730,C.teal);arrow(ctx,840,770,940,770,C.orange);
      text(ctx,'パケットごとに異なる経路の場合もある',890,824,10,C.gray,600,'center');
      rr(ctx,55,845,1060,38,'#f5f9fb','#d5e2e8',8);text(ctx,'グローバルIP＝インターネット上で一意 ／ プライベートIP＝LAN内で使用 ／ IPv6＝128bit・16進表記',585,864,10,C.blue,700,'center','middle');
    }
  });

  register('b8-3',{
    title:'WWW・URL・DNS・電子メール：名前解決から通信まで',height:900,
    caption:'URLを分解し，DNSでIPアドレスを得てからWebサーバへアクセスする。メールはSMTPが送信・転送，POP/IMAPが受信。',
    question:'Webページを見るとき，Webサーバへページを要求する前にDNSへ問い合わせるのは何のためですか。',
    answer:'URL中のドメイン名に対応するWebサーバのIPアドレスを得るため。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;
      head(ctx,'Webとメールの通信','人が扱いやすい名前と，ネットワークが扱うIPアドレスの間をDNSがつなぐ。');
      text(ctx,'A　URLを分解する',45,120,16,C.navy,700);
      rr(ctx,55,155,1080,76,'#f8fafb','#d8e1e6',8);text(ctx,'https://www.soumu.go.jp/menu_seisaku/index.html',595,180,17,C.navy,700,'center','middle');
      const parts=[['https','スキーム'],['www','ホスト'],['soumu','組織名'],['go','組織種別'],['jp','国名'],['menu_seisaku','フォルダ'],['index.html','ファイル']];
      const xs=[55,190,320,465,590,700,920],ws=[115,110,125,105,90,190,215];
      parts.forEach((a,i)=>box(ctx,xs[i],255,ws[i],72,a[0],a[1],{fill:i===0?'#eef6fa':i===3?'#fff8f0':'#fff'}));

      text(ctx,'B　DNSによる名前解決 → Webページ取得',45,390,16,C.navy,700);
      box(ctx,55,430,220,84,'ブラウザ','sample.go.jp を指定',{fill:'#eef6fa'});
      box(ctx,390,430,245,84,'DNSサーバ','ドメイン名→IPアドレス',{fill:'#fff8f0'});
      box(ctx,820,430,285,84,'Webサーバ','HTMLなどを提供',{fill:'#f8fafb'});
      arrow(ctx,275,451,390,451,C.blue);text(ctx,'① IPを問い合わせ',332,433,9,C.blue,700,'center');
      arrow(ctx,390,490,275,490,C.teal);text(ctx,'② IPを返す',332,512,9,C.teal,700,'center');
      arrow(ctx,275,470,820,470,C.orange,2);text(ctx,'③ IPアドレスへページ要求',650,452,9,C.orange,700,'center');
      arrow(ctx,820,500,275,500,C.blue,2);text(ctx,'④ ページデータを返す',650,525,9,C.blue,700,'center');
      rr(ctx,55,555,1050,54,'#f5f9fb','#d5e2e8',8);text(ctx,'DNSは「.」で区切った階層に分散して管理：ルート → jp → go.jp → sample.go.jp',580,582,10,C.blue,700,'center','middle');

      text(ctx,'C　電子メール：送信・転送・受信',45,670,16,C.navy,700);
      box(ctx,55,710,180,76,'送信者','メールソフト');box(ctx,330,710,210,76,'送信側メールサーバ','');box(ctx,650,710,210,76,'受信側メールサーバ','');box(ctx,955,710,180,76,'受信者','メールソフト');
      arrow(ctx,235,748,330,748,C.blue);text(ctx,'SMTP',282,730,10,C.blue,700,'center');
      arrow(ctx,540,748,650,748,C.blue);text(ctx,'SMTP',595,730,10,C.blue,700,'center');
      arrow(ctx,860,748,955,748,C.teal);text(ctx,'POP / IMAP',907,730,10,C.teal,700,'center');
      rr(ctx,55,830,1080,42,'#fff','#d8e1e6',8);text(ctx,'Webメール：Webブラウザからメールサービスを利用する形もある。',595,851,10,C.gray,600,'center','middle');
    }
  });

  register('b8-4',{
    title:'情報セキュリティ：CIA・ファイアウォール・フィルタリング・無線暗号化',height:900,
    caption:'CIAの3要素を基準に，通信の許可／拒否，Web閲覧制限，無線LAN暗号化を別の対策として整理する。',
    question:'ホワイトリスト方式でサイトAとサイトBだけ登録した場合，登録外サイトはどうなりますか。',
    answer:'閲覧できない。ホワイトリスト方式は登録された安全・有益な対象だけを許可する。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;
      head(ctx,'情報セキュリティ','個人・組織・技術の複数の観点で対策し，CIAを維持する。');
      text(ctx,'A　CIA：守りたい3つの状態',45,120,16,C.navy,700);
      box(ctx,55,155,330,105,'機密性','許可された人だけがアクセスできる',{fill:'#eef6fa'});
      box(ctx,425,155,330,105,'完全性','不正な書き換え・破壊がない',{fill:'#f4f9f7'});
      box(ctx,795,155,330,105,'可用性','必要なときに利用できる',{fill:'#fff8f0',stroke:'#e3d2bf'});

      text(ctx,'B　ファイアウォール：通信ルールで許可／拒否',45,320,16,C.navy,700);
      box(ctx,55,360,230,88,'インターネット','外部ネットワーク');box(ctx,465,350,260,108,'ファイアウォール','通信ルールを確認\n許可 / 拒否',{fill:'#fff8f0'});box(ctx,905,360,220,88,'LAN / PC','内部ネットワーク',{fill:'#eef6fa'});
      arrow(ctx,285,404,465,404,C.orange,2);arrow(ctx,725,404,905,404,C.blue,2);
      rr(ctx,55,485,1070,52,'#f5f9fb','#d5e2e8',8);text(ctx,'導入して終わりではない：設定ルールが目的に合っているか定期的に確認する。',590,511,10,C.blue,700,'center','middle');

      text(ctx,'C　コンテンツフィルタリング',45,590,16,C.navy,700);
      box(ctx,55,625,480,105,'ブラックリスト方式','不適切なサイトを登録 → 登録対象を拒否\n未知の対象は通る可能性',{fill:'#fff8f0',stroke:'#e3d2bf'});
      box(ctx,645,625,480,105,'ホワイトリスト方式','安全・有益なサイトを登録 → 登録対象だけ許可\n登録外は拒否',{fill:'#eef6fa'});

      text(ctx,'D　無線LAN暗号化規格の流れ',45,785,16,C.navy,700);
      const eras=[['1997','WEP'],['2002','WPA'],['2004','WPA2'],['2018','WPA3']];
      eras.forEach((a,i)=>{const x=70+i*270;box(ctx,x,820,205,58,a[1],a[0],{fill:i===3?'#eef6fa':'#fff'});if(i<3)arrow(ctx,x+205,849,x+258,849,C.blue);});
    }
  });

  register('b8-5',{
    title:'暗号化とデジタル署名：鍵の向き・ハッシュ・SSL/TLS',height:940,
    caption:'秘密保持の暗号化と，送信者確認・改ざん検知のデジタル署名は目的が違う。SSL/TLSでは共通鍵方式と公開鍵方式を組み合わせる。',
    question:'公開鍵暗号方式でBだけが読める暗号文をAが送るとき，Aは誰のどの鍵で暗号化しますか。',
    answer:'Bの公開鍵で暗号化し，BがBの秘密鍵で復号する。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;
      head(ctx,'暗号化・署名・TLSを混同しない','「秘密にする」「送信者と改ざんを確認する」「Web通信を保護する」を別の流れで追う。');
      text(ctx,'A　共通鍵暗号方式 / 公開鍵暗号方式',45,120,16,C.navy,700);
      box(ctx,55,155,470,130,'共通鍵暗号方式','暗号化：共通鍵K\n復号：同じ共通鍵K\n○ 高速　△ 鍵を安全に共有する必要',{fill:'#eef6fa'});
      box(ctx,625,155,500,130,'公開鍵暗号方式','暗号化：受信者の公開鍵\n復号：受信者の秘密鍵\n○ 公開鍵は公開可能　△ 処理は比較的重い',{fill:'#fff8f0',stroke:'#e3d2bf'});

      text(ctx,'B　公開鍵暗号：A → B',45,345,16,C.navy,700);
      box(ctx,65,385,200,76,'A（送信者）','平文');box(ctx,360,385,220,76,'Bの公開鍵','暗号化',{fill:'#eef6fa'});box(ctx,670,385,180,76,'暗号文','');box(ctx,940,385,185,76,'Bの秘密鍵','復号',{fill:'#fff8f0'});
      arrow(ctx,265,423,360,423,C.blue);arrow(ctx,580,423,670,423,C.blue);arrow(ctx,850,423,940,423,C.orange);
      text(ctx,'→ Bだけが復号できる',1028,490,10,C.gray,600,'center');

      text(ctx,'C　デジタル署名：ハッシュ値を比較する',45,555,16,C.navy,700);
      box(ctx,55,595,260,100,'送信者','メッセージ→ハッシュ値\n秘密鍵で署名',{fill:'#f8fafb'});
      box(ctx,455,595,260,100,'送信','メッセージ + デジタル署名',{fill:'#eef6fa'});
      box(ctx,855,595,270,100,'受信者','送信者の公開鍵で検証\n受信文からハッシュを再計算',{fill:'#f8fafb'});
      arrow(ctx,315,645,455,645,C.blue,2);arrow(ctx,715,645,855,645,C.blue,2);
      rr(ctx,250,735,700,58,'#fff8f0','#e3d2bf',8);text(ctx,'2つのハッシュ値が一致 → 教材では「改ざんなし」「本人から届いた」を確認',600,764,10,C.orange,700,'center','middle');

      text(ctx,'D　SSL/TLS（https）',45,835,16,C.navy,700);
      box(ctx,55,870,360,55,'共通鍵暗号方式','実際のデータを高速に暗号化',{fill:'#eef6fa'});
      box(ctx,475,870,360,55,'公開鍵暗号方式','共通鍵の受け渡しに利用',{fill:'#fff8f0'});
      box(ctx,895,870,230,55,'認証局 / 証明書','公開鍵を確認',{fill:'#fff'});
    }
  });

  register('b8-6',{
    title:'情報システムとデータベース：ITS・EC・銀行・POSを情報の流れで読む',height:900,
    caption:'情報システムはネットワーク上の情報機器が連携して機能を提供する仕組み。データベースは整合性を保ちながら複数サービスを支える。',
    question:'POSシステムが販売時に記録する基本情報として教材が挙げる4つは何ですか。',
    answer:'「いつ」「どの商品が」「どんな価格で」「いくつ売れたか」。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;
      head(ctx,'情報システムとデータベース','機器・ネットワーク・データベースが連携し，社会のサービスを支える。');
      text(ctx,'A　教材に出る情報システム',45,120,16,C.navy,700);
      const ex=[['SNS','通信'],['ITS','交通'],['eラーニング','教育'],['住民基本台帳','行政'],['緊急地震速報','気象']];
      ex.forEach((a,i)=>box(ctx,55+i*215,155,185,72,a[0],a[1],{fill:i===1?'#eef6fa':'#fff'}));
      rr(ctx,55,255,1070,58,'#f5f9fb','#d5e2e8',8);text(ctx,'ITS：ETC・信号・GPS等の情報を集め，渋滞対策・バス案内・自動運転などへ活用',590,284,10,C.blue,700,'center','middle');

      text(ctx,'B　電子商取引は「取引主体」で分類',45,365,16,C.navy,700);
      box(ctx,55,400,315,90,'B to B','企業 ↔ 企業\n例：メーカーと部品企業',{fill:'#f8fafb'});
      box(ctx,430,400,315,90,'B to C','企業 ↔ 個人\n例：ネットショッピング',{fill:'#eef6fa'});
      box(ctx,805,400,315,90,'C to C','個人 ↔ 個人\n例：ネットオークション',{fill:'#fff8f0'});

      text(ctx,'C　銀行：複数の入口でも同じ残高',45,550,16,C.navy,700);
      ['ATM','窓口','ネットバンキング'].forEach((s,i)=>box(ctx,55+i*210,590,175,72,s,'',{fill:'#fff'}));
      box(ctx,760,580,360,92,'銀行データベース','預金・為替などを蓄積\nどの入口からでも整合性を保つ',{fill:'#eef6fa'});
      arrow(ctx,230,626,760,610,C.blue);arrow(ctx,440,626,760,626,C.teal);arrow(ctx,650,626,760,642,C.orange);

      text(ctx,'D　POS：販売時点のデータを分析へ',45,730,16,C.navy,700);
      box(ctx,55,765,280,90,'POSレジ','いつ / 商品 / 価格 / 個数',{fill:'#eef6fa'});
      box(ctx,455,765,280,90,'データベース','売上データを蓄積',{fill:'#f8fafb'});
      box(ctx,855,765,270,90,'分析・活用','天気・催事・属性と組合せ\n仕入れ・商品開発へ',{fill:'#fff8f0'});
      arrow(ctx,335,810,455,810,C.blue);arrow(ctx,735,810,855,810,C.orange);
    }
  });

  register('b8-7',{
    title:'データベース管理：DBMS・3種類の構造・選択/射影/結合・レイテンシ',height:940,
    caption:'教材の中心はDBMSの4機能とリレーショナルDBの基本操作。選択＝行，射影＝列，結合＝複数表。',
    question:'「著者ID=T2の行だけを取り出す」は，選択・射影・結合のどれですか。',
    answer:'選択。条件を満たすレコード（行）を抽出する操作。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;
      head(ctx,'DBMSとリレーショナルデータベース','「管理する機能」「データの構造」「表を操作する方法」を別々に整理する。');
      text(ctx,'A　DBMSの4機能',45,120,16,C.navy,700);
      const f=[['データの一貫性','ロックで同時変更を防ぐ'],['障害復旧','バックアップから復旧'],['アクセス制御','利用者ごとに権限を設定'],['データ操作','DB言語で定義・操作・制御']];
      f.forEach((a,i)=>box(ctx,55+i*270,155,245,100,a[0],a[1],{fill:i===0?'#eef6fa':i===1?'#f4f9f7':i===2?'#fff8f0':'#fff'}));

      text(ctx,'B　データベースの3種類',45,315,16,C.navy,700);
      box(ctx,55,350,315,105,'階層型','木構造\n冗長性が生じる場合がある',{fill:'#fff'});
      box(ctx,430,350,315,105,'ネットワーク型','網目状\n冗長性を減らせるが複雑',{fill:'#f8fafb'});
      box(ctx,805,350,315,105,'リレーショナル','表形式\n表を分けて関係づける',{fill:'#eef6fa'});
      rr(ctx,55,485,1065,52,'#f5f9fb','#d5e2e8',8);text(ctx,'列＝フィールド（カラム・属性）　／　行＝レコード（タプル・組）　／　RDBMSではSQLを利用',590,511,10,C.blue,700,'center','middle');

      text(ctx,'C　選択・射影・結合',45,590,16,C.navy,700);
      const rows=[['ID','氏名','部署'],['01','Aさん','営業'],['02','Bさん','開発'],['03','Cさん','営業']];
      const x0=55,y0=625,cw=[90,130,130],rh=40;
      rows.forEach((r,ri)=>r.forEach((s,ci)=>cell(ctx,x0+[0,cw[0],cw[0]+cw[1]][ci],y0+ri*rh,cw[ci],rh,s,{head:ri===0,fill:ri===0?'#eff5f8':(ri===1||ri===3)?'#fff8f0':'#fff',fs:10})));
      box(ctx,455,625,195,110,'選択','条件に合う\nレコード（行）を抽出',{fill:'#fff8f0'});
      box(ctx,685,625,195,110,'射影','必要な\nフィールド（列）を抽出',{fill:'#eef6fa'});
      box(ctx,915,625,195,110,'結合','複数のテーブルを\n1つにする',{fill:'#f4f9f7'});

      text(ctx,'D　レイテンシ',45,825,16,C.navy,700);
      box(ctx,55,855,380,55,'転送要求','');arrow(ctx,435,882,735,882,C.orange,2);box(ctx,735,855,380,55,'データ到着','');
      text(ctx,'この遅延時間 = レイテンシ',585,858,10,C.orange,700,'center');
      rr(ctx,55,920,1060,1,'#d8e1e6','#d8e1e6',0);
    }
  });
})();