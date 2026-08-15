/* 情報Ⅰ v12-e — 社会・問題解決・情報デザインの高精細教材図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const {register}=K;

  register('b1-2',{
    title:'メディアリテラシー：同じデータでも見せ方で印象は変わる',height:760,
    caption:'原教材の「縦軸を途中から始めた棒グラフ」「3D表現による錯覚」を、発信者の意図・第一印象・実際の差に分けて読む。',
    question:'棒グラフの縦軸が0から始まっていないとき、なぜ実際以上に増加して見えることがありますか。',
    answer:'表示範囲が狭くなり、同じ数値差でも棒の高さの差が大きく見えるから。数値そのものと軸の範囲を別々に確認する必要がある。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,axis}=k;head(ctx,'メディアリテラシー','情報は受け手によって意味や価値が変わる。だから、内容だけでなく「どのように見せられているか」も読む。');
      text(ctx,'A　同じ増加データを2つの縦軸で見る',45,120,16,C.navy,700);const vals=[1260,1300,1340,1380,1420],labels=['2018','2019','2020','2021','2022'];
      function bars(x,y,w,h,min,max,titleText){rr(ctx,x,y,w,h,'#fff','#d7e1e6',8);text(ctx,titleText,x+18,y+25,12,C.navy,700);axis(ctx,x+45,y+45,w-70,h-80,'年','人数');vals.forEach((v,i)=>{const bh=(v-min)/(max-min)*(h-115),bx=x+65+i*52,by=y+h-36-bh;ctx.fillStyle=i===vals.length-1?C.orange:C.blue;ctx.fillRect(bx,by,28,bh);text(ctx,labels[i],bx+14,y+h-18,8,C.gray,400,'center');});text(ctx,`縦軸 ${min}〜${max}`,x+w-15,y+24,9,C.gray,600,'right');}
      bars(45,155,510,255,1200,1450,'縦軸を1200から開始');bars(600,155,535,255,0,1500,'縦軸を0から開始');
      box(ctx,45,440,510,100,'第一印象','左は「急増している」ように見えやすい。',{fill:'#fff8f0',stroke:'#e3d2bf'});box(ctx,600,440,535,100,'数値の事実','1260 → 1420。差は160人。軸を確認すると変化量を冷静に読める。',{fill:'#f8fafb'});
      text(ctx,'B　3D表現は比較を難しくする',45,600,16,C.navy,700);rr(ctx,45,630,1090,80,'#f5f9fb','#d5e2e8',10);wrap(ctx,'遠近法・立体感・装飾によって面積や長さの比較がしにくくなる。グラフは「印象」ではなく、軸・目盛・数値・凡例を確認して読む。',70,650,1040,22,12,C.gray,400);
    }
  });

  register('b1-6',{
    title:'問題解決：発散と収束、原因分析、PDCAを1つの地図にする',height:780,
    caption:'ブレーンストーミングやオズボーンは発想を広げる、KJ法は整理する、特性要因図・ロジックツリーは原因や構造を分解する。PDCAは実行後の改善サイクル。',
    question:'アイデアを出す段階で、すぐに「その案は無理」と評価してはいけないのはなぜですか。',
    answer:'発散段階では案の数と広がりを優先するため。評価・整理はその後の収束段階で行う。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'問題の発見と解決','「何をしたいか」→「原因や条件を整理」→「案を広げる」→「絞る」→「実行・評価」の役割を分ける。');
      const steps=[['問題の発見','現状と理想の差'],['整理・分析','原因・条件を分解'],['解決策の立案','案を広げて選ぶ'],['実行','計画を行う'],['評価・改善','結果から見直す']];
      steps.forEach((s,i)=>{const x=45+i*220;box(ctx,x,135,190,82,s[0],s[1],{fill:i===2?'#eef6fa':'#fff',stroke:i===2?'#bfd1db':'#d8e1e6'});if(i<4)arrow(ctx,x+190,176,x+216,176,i===2?C.orange:C.blue);});
      text(ctx,'発散：まず広げる',45,270,15,C.blue,700);box(ctx,45,300,245,118,'ブレーンストーミング','批判を避け、量を出し、自由な発想を歓迎する。',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,315,300,245,118,'オズボーンのチェックリスト','転用・応用・変更・拡大縮小など、視点を変えて案を増やす。',{fill:'#eef6fa',stroke:'#bfd1db'});
      text(ctx,'収束：整理して構造化する',610,270,15,C.teal,700);box(ctx,610,300,245,118,'KJ法','似た意見をまとめ、関係を整理して全体像をつかむ。',{fill:'#f4f9f7',stroke:'#cfe1d7'});box(ctx,880,300,255,118,'ロジックツリー','大きな問いを枝分かれさせ、漏れ・重複を減らして考える。',{fill:'#f4f9f7',stroke:'#cfe1d7'});
      text(ctx,'原因を探る図',45,470,15,C.orange,700);rr(ctx,45,500,515,150,'#fff8f0','#e3d2bf',10);line(ctx,100,575,480,575,C.orange,3);arrow(ctx,480,575,525,575,C.orange,3);text(ctx,'結果',500,558,11,C.orange,700,'center');[['人',170,525],['方法',265,625],['環境',350,525],['道具',430,625]].forEach(([s,x,y],i)=>{line(ctx,x,y,x+45,575,C.gray,1.5);text(ctx,s,x+(y<575?0:5),y<575?y-8:y+18,10,C.gray,700);});text(ctx,'特性要因図（魚の骨）',70,625,11,C.orange,700);
      text(ctx,'実行後はPDCA',610,470,15,C.navy,700);const cyc=[['Plan',725,520],['Do',900,520],['Check',900,635],['Act',725,635]];cyc.forEach(([s,x,y],i)=>{rr(ctx,x,y,110,56,i===0?'#eef6fa':'#fff','#cfdce2',28);text(ctx,s,x+55,y+28,12,C.navy,700,'center','middle');});arrow(ctx,835,548,890,548,C.blue);arrow(ctx,955,576,955,625,C.blue);arrow(ctx,900,663,845,663,C.blue);arrow(ctx,725,635,725,584,C.blue);wrap(ctx,'問題解決の「5段階」と、実行後に改善を続けるPDCAを混同しない。',610,710,500,20,11,C.gray,400);
    }
  });

  register('b2-1',{
    title:'コミュニケーション：時間と人数の2軸で分類する',height:690,
    caption:'「同期/非同期」と「1対1/1対多」は別の軸。チャットのように使い方によって同期的にも非同期的にもなるものがある。',
    question:'電子メールが「非同期」と分類される主な理由は何ですか。',
    answer:'送信者と受信者が同じ時刻に参加していなくても、送信・受信・返信ができるため。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'コミュニケーション手段の変化と影響','媒体名を暗記するより、「同じ時刻に参加する必要があるか」「相手は何人か」で整理する。');
      const x=180,y=155,w=820,h=390;line(ctx,x,y+h/2,x+w,y+h/2,C.gray,1.5);line(ctx,x+w/2,y,x+w/2,y+h,C.gray,1.5);text(ctx,'同期',x-35,y+h/4,14,C.blue,700,'right','middle');text(ctx,'非同期',x-35,y+h*3/4,14,C.teal,700,'right','middle');text(ctx,'1対1',x+w/4,y-20,14,C.navy,700,'center');text(ctx,'1対多 / 多対多',x+w*3/4,y-20,14,C.navy,700,'center');
      box(ctx,x+35,y+45,300,105,'電話・対面','同じ時間にやり取りする。',{fill:'#eef6fa'});box(ctx,x+455,y+45,300,105,'会議・ライブ配信','同時参加で多数へ伝える。',{fill:'#eef6fa'});box(ctx,x+35,y+245,300,105,'電子メール・手紙','受け手が後で読んで返信できる。',{fill:'#f4f9f7'});box(ctx,x+455,y+245,300,105,'SNS投稿・掲示板','時間をずらして多数が閲覧・返信。',{fill:'#f4f9f7'});
      rr(ctx,180,575,820,64,'#fff8f0','#e3d2bf',10);text(ctx,'チャット',205,602,11,C.orange,700);wrap(ctx,'即時に応答し続ければ同期的、時間を空けて返信すれば非同期的にも使える。道具名だけで固定分類しない。',275,590,690,20,11,C.gray,400);
    }
  });

  register('b4-1',{
    title:'情報デザイン：抽象化・可視化・構造化を同じ題材で比較する',height:730,
    caption:'表現・機能・論理の3側面のうち、このPARTは主に「表現」。同じ情報でも抽象化・可視化・構造化で伝え方が変わる。',
    question:'駅構内のピクトグラムは、主に「抽象化」のどの特徴を利用していますか。',
    answer:'細部を省き、目的に必要な特徴だけを残して、言語に依存せず素早く意味を伝える特徴。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'情報デザイン','大量の情報を「何を残すか」「どう見せるか」「どう関係づけるか」で整理し、受け手が理解しやすい表現へ変える。');
      text(ctx,'同じ題材：学校祭の案内',45,120,16,C.navy,700);const cols=[['抽象化','細部を省き、必要な特徴を残す'],['可視化','数値・関係を図やグラフで見える形にする'],['構造化','情報を階層・順序・まとまりで整理する']];
      cols.forEach((a,i)=>{const x=45+i*365;rr(ctx,x,155,330,430,i===0?'#eef6fa':i===1?'#f4f9f7':'#fff8f0',i===0?'#bfd1db':i===1?'#cfe1d7':'#e3d2bf',12);text(ctx,a[0],x+20,190,18,[C.blue,C.teal,C.orange][i],700);wrap(ctx,a[1],x+20,210,290,20,11,C.gray,400);
        if(i===0){['WC','Food','Stage'].forEach((s,j)=>{rr(ctx,x+55+j*78,310,58,58,'#fff','#cfdce2',12);text(ctx,s,x+84+j*78,339,10,C.navy,700,'center','middle');});text(ctx,'文字を読まなくても意味が伝わる記号へ',x+165,405,10,C.gray,400,'center');}
        if(i===1){const vals=[42,30,14,14],labs=['A','B','C','D'];vals.forEach((v,j)=>{ctx.fillStyle=j===0?C.blue:C.teal;ctx.fillRect(x+50+j*58,405-v*3,36,v*3);text(ctx,labs[j],x+68+j*58,425,9,C.gray,400,'center');});text(ctx,'来場者数をグラフ化',x+165,470,10,C.gray,400,'center');}
        if(i===2){box(ctx,x+75,295,180,50,'学校祭','',{fill:'#fff'});arrow(ctx,x+165,345,x+95,390,C.orange,1.5);arrow(ctx,x+165,345,x+235,390,C.orange,1.5);box(ctx,x+35,390,125,55,'展示','教室A/B');box(ctx,x+190,390,125,55,'ステージ','体育館');text(ctx,'階層で「どこに何があるか」を整理',x+165,500,10,C.gray,400,'center');}
      });
      rr(ctx,45,620,1060,55,'#f5f9fb','#d5e2e8',9);text(ctx,'重要',70,648,11,C.blue,700);wrap(ctx,'1つの制作物で3手法を同時に使うことも多い。「この図は何のための表現か」で判断する。',125,635,930,20,11,C.gray,400);
    }
  });

  register('b4-3',{
    title:'アクセシビリティ：バリアフリーとユニバーサルデザインを設計段階で分ける',height:720,
    caption:'バリアフリーは既にある障壁を取り除く。ユニバーサルデザインは最初から多様な利用者を想定する。色だけに情報を依存させない設計も重要。',
    question:'「赤ならエラー、緑なら正常」だけで状態を示すUIが望ましくないのはなぜですか。',
    answer:'色の見え方が異なる利用者には区別しにくい場合があるため。色に加えて文字・形・アイコンなど複数の手掛かりを使う。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'バリアフリーとユニバーサルデザイン','「一部の人だけが使える」を後から直すのか、最初から多様な人が使えるよう設計するのかを分けて考える。');
      text(ctx,'A　設計の考え方',45,120,16,C.navy,700);box(ctx,45,155,490,145,'バリアフリー','既にある障壁を取り除く。\n例：段差へスロープを追加、映像へ字幕を追加。',{fill:'#f8fafb'});box(ctx,610,155,525,145,'ユニバーサルデザイン','最初から多くの人が使いやすいよう設計する。\n例：自動ドア、分かりやすい表示、操作方法の複数化。',{fill:'#eef6fa',stroke:'#bfd1db'});
      text(ctx,'B　色だけに意味を持たせない',45,355,16,C.navy,700);rr(ctx,45,390,490,170,'#fff','#d7e1e6',10);text(ctx,'改善前',70,420,12,C.red,700);ctx.beginPath();ctx.arc(120,480,28,0,Math.PI*2);ctx.fillStyle='#d45b58';ctx.fill();ctx.beginPath();ctx.arc(200,480,28,0,Math.PI*2);ctx.fillStyle='#55a06d';ctx.fill();text(ctx,'色だけで判定',315,485,12,C.gray,400,'center');rr(ctx,610,390,525,170,'#f8fafb','#d7e1e6',10);text(ctx,'改善後',635,420,12,C.green,700);rr(ctx,660,455,180,58,'#fff1ef','#e4c6c2',8);text(ctx,'× エラー',750,484,13,C.red,700,'center','middle');rr(ctx,875,455,180,58,'#eef7f0','#cfe0d3',8);text(ctx,'✓ 正常',965,484,13,C.green,700,'center','middle');text(ctx,'色 + 記号 + 文字',855,535,11,C.gray,400,'center');
      text(ctx,'C　スマートフォンのアクセシビリティ',45,610,16,C.navy,700);['文字拡大','画面読み上げ','字幕','音声入力'].forEach((s,i)=>box(ctx,45+i*270,635,240,50,s,'',{fill:i%2?'#f8fafb':'#fff'}));
    }
  });
})();