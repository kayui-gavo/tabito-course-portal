/* 情報Ⅰ v11b — 原教材の図が理解の中心になるPARTを追加で高精細Canvas化 */
(() => {
  const baseRender=window.renderStudyLesson;
  const idNow=()=>new URLSearchParams(location.search).get('id')||'';
  const C={navy:'#213f54',blue:'#2f789e',teal:'#3b8c8c',orange:'#d88745',grid:'#d8e1e6',light:'#f4f8fa',gray:'#667986',dark:'#273b49',red:'#b65c55',green:'#4f8a64'};
  const FONT='"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
  function t(ctx,s,x,y,size=14,color=C.dark,weight=400,align='left',base='alphabetic'){ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${FONT}`;ctx.textAlign=align;ctx.textBaseline=base;ctx.fillText(s,x,y);}
  function wrap(ctx,s,x,y,w,lh=19,size=12,color=C.gray,weight=400){ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${FONT}`;ctx.textAlign='left';ctx.textBaseline='top';let line='',yy=y;for(const ch of String(s)){const test=line+ch;if(ctx.measureText(test).width>w&&line){ctx.fillText(line,x,yy);line=ch;yy+=lh;}else line=test;}if(line)ctx.fillText(line,x,yy);}
  function rr(ctx,x,y,w,h,fill='#fff',stroke=C.grid,r=10,lw=1.2){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();}
  function box(ctx,x,y,w,h,h1,p='',opt={}){rr(ctx,x,y,w,h,opt.fill||'#fff',opt.stroke||C.grid,opt.r||10,opt.lw||1.2);t(ctx,h1,x+13,y+22,opt.ts||14,opt.tc||C.navy,700);if(p)wrap(ctx,p,x+13,y+34,w-26,opt.lh||18,opt.bs||11,opt.bc||C.gray);}
  function line(ctx,x1,y1,x2,y2,color=C.grid,lw=1,dash=[]){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore();}
  function ar(ctx,x1,y1,x2,y2,color=C.blue,lw=2,dash=[]){ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);const a=Math.atan2(y2-y1,x2-x1),s=8;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-s*Math.cos(a-.45),y2-s*Math.sin(a-.45));ctx.lineTo(x2-s*Math.cos(a+.45),y2-s*Math.sin(a+.45));ctx.closePath();ctx.fill();ctx.restore();}
  function head(ctx,h,p){t(ctx,h,34,42,24,C.navy,700);wrap(ctx,p,34,55,1130,18,12,C.gray);}
  function cell(ctx,x,y,w,h,s,head=false,fill='#fff',fs=10){ctx.fillStyle=fill;ctx.fillRect(x,y,w,h);ctx.strokeStyle=C.grid;ctx.strokeRect(x,y,w,h);t(ctx,s,x+w/2,y+h/2,fs,head?C.navy:C.dark,head?700:400,'center','middle');}

  function drawLogic(ctx){
    head(ctx,'論理回路：真理値表から半加算回路へ','0/1の全組合せを表で確認し、2進数1桁の加算で C（Carry Out）と S（Sum）が何を表すかを結び付ける。');
    t(ctx,'基本回路',45,125,16,C.navy,700);
    [['AND','両方1なら1'],['OR','少なくとも一方1なら1'],['NOT','0と1を反転']].forEach((a,i)=>box(ctx,45+i*195,155,165,92,a[0],a[1],{fill:i===0?'#eef6fa':'#fff'}));
    t(ctx,'2進数1桁の加算',45,305,16,C.navy,700);const rows=[['0','0','0','0'],['0','1','0','1'],['1','0','0','1'],['1','1','1','0']];
    ['A','B','C','S'].forEach((s,c)=>cell(ctx,45+c*86,335,86,42,s,true,'#eff5f8',11));rows.forEach((r,ri)=>r.forEach((s,c)=>cell(ctx,45+c*86,377+ri*42,86,42,s,false,ri===3?'#fff5ea':'#fff',11)));
    t(ctx,'C = Carry Out（桁上り）',45,570,12,C.orange,700);t(ctx,'S = Sum（和の下位bit）',250,570,12,C.blue,700);
    rr(ctx,535,150,600,355,'#f8fafb','#d6e1e6',14);t(ctx,'半加算回路を「入力 → 2つの出力」で読む',560,185,17,C.navy,700);
    box(ctx,565,250,120,80,'入力 A','0 / 1');box(ctx,565,360,120,80,'入力 B','0 / 1');box(ctx,810,220,150,88,'C','ANDの出力\n1+1の桁上り',{fill:'#fff8f0',stroke:'#e3d2bf'});box(ctx,810,375,150,88,'S','1bitの和\n0+1 / 1+0 など',{fill:'#eef6fa',stroke:'#bfd1db'});
    ar(ctx,685,290,810,264);ar(ctx,685,400,810,264);ar(ctx,685,290,810,419,C.teal);ar(ctx,685,400,810,419,C.teal);
    box(ctx,990,285,120,110,'全加算回路','半加算回路を組み合わせ、下の桁からの桁上りにも対応',{fill:'#fff'});ar(ctx,960,340,990,340,C.orange);
    rr(ctx,535,535,600,64,'#f5f9fb','#d5e2e8');t(ctx,'重要：回路図は左から順に追い、中間出力を書いてから次の回路へ進む',835,567,12,C.blue,700,'center');
  }

  function drawAlgorithms(ctx){
    head(ctx,'アルゴリズムを表す3種類の図','「何を表したいのか」で図を選ぶ。単一処理の順序・並行する処理・状態の移り変わりは別物。');
    const xs=[45,420,795],titles=['フローチャート','アクティビティ図','状態遷移図'],subs=['単一の処理の流れ','並行して行われる処理','状態の移り変わり'];
    xs.forEach((x,i)=>{rr(ctx,x,135,330,430,'#fff',C.grid,12);t(ctx,titles[i],x+20,170,17,[C.blue,C.teal,C.orange][i],700);t(ctx,subs[i],x+20,195,11,C.gray,400);});
    // flowchart
    box(ctx,135,230,150,55,'開始','',{fill:'#f7fafb'});box(ctx,135,315,150,62,'処理','値を入力');rr(ctx,165,420,90,70,'#fff8f0','#e3d2bf',4);t(ctx,'条件?',210,455,13,C.navy,700,'center','middle');box(ctx,90,520,100,50,'Yes','処理A',{fill:'#eef6fa'});box(ctx,230,520,100,50,'No','処理B',{fill:'#fff'});ar(ctx,210,285,210,315);ar(ctx,210,377,210,420);ar(ctx,165,455,140,520);ar(ctx,255,455,280,520);
    // activity: swimlanes
    line(ctx,440,220,730,220,C.grid,1.2);t(ctx,'自分',495,212,11,C.gray,700,'center');t(ctx,'スマホ',655,212,11,C.gray,700,'center');line(ctx,575,220,575,535,C.grid,1.2);box(ctx,455,250,105,52,'画面を点ける','');box(ctx,595,250,110,52,'指紋・顔認証','');box(ctx,455,350,105,52,'確認する','');box(ctx,595,350,110,52,'判定','Yes / No');box(ctx,455,455,105,52,'解除','');box(ctx,595,455,110,52,'エラー表示','');ar(ctx,507,302,507,350);ar(ctx,650,302,650,350);ar(ctx,560,376,595,376,C.teal);ar(ctx,650,402,507,455,C.teal);ar(ctx,650,402,650,455,C.orange);
    // state transition
    const st=[[900,275,'待機'],[1035,275,'計測'],[968,455,'終了']];st.forEach(([x,y,s])=>{ctx.beginPath();ctx.arc(x,y,48,0,Math.PI*2);ctx.fillStyle='#f8fafb';ctx.fill();ctx.strokeStyle=C.orange;ctx.lineWidth=2;ctx.stroke();t(ctx,s,x,y,13,C.navy,700,'center','middle');});ar(ctx,948,275,987,275,C.orange);t(ctx,'開始ボタン',968,250,10,C.gray,400,'center');ar(ctx,1012,315,980,410,C.orange);t(ctx,'終了ボタン',1040,370,10,C.gray,400,'center');
    rr(ctx,45,590,1080,40,'#f5f9fb','#d5e2e8');t(ctx,'順次・分岐・反復は制御構造。図の種類は「表したい関係」に合わせて選ぶ。',585,611,12,C.blue,700,'center','middle');
  }

  function drawNetwork(ctx){
    head(ctx,'LAN・ルータ・ISP・インターネットの位置関係','教材の構成図問題で、ハブ・アクセスポイント・ルータ・ISPを「どこに置くか」から理解する。');
    rr(ctx,45,150,500,350,'#f8fafb','#cfdce2',14);t(ctx,'LAN（学校・家庭など限られた範囲）',70,185,16,C.navy,700);
    box(ctx,80,235,140,72,'PC','有線');box(ctx,80,345,140,72,'プリンタ','有線');box(ctx,300,285,135,82,'ハブ','LAN内の有線端末を接続',{fill:'#eef6fa'});ar(ctx,220,271,300,310);ar(ctx,220,381,300,340);
    box(ctx,330,435,165,72,'アクセスポイント','無線LAN端末を接続',{fill:'#fff'});box(ctx,70,455,130,62,'スマホ','無線');line(ctx,200,486,330,471,C.teal,2,[7,5]);
    box(ctx,580,280,145,90,'ルータ','異なるネットワーク間を中継',{fill:'#fff8f0',stroke:'#e3d2bf'});ar(ctx,435,326,580,326,C.orange);
    box(ctx,775,280,145,90,'ISP','インターネット接続を提供',{fill:'#f7fafb'});ar(ctx,725,326,775,326,C.orange);
    ctx.beginPath();ctx.ellipse(1050,325,120,72,0,0,Math.PI*2);ctx.fillStyle='#eef6fa';ctx.fill();ctx.strokeStyle=C.blue;ctx.lineWidth=2;ctx.stroke();t(ctx,'インターネット',1050,325,16,C.navy,700,'center','middle');ar(ctx,920,326,930,326,C.blue);
    box(ctx,735,455,180,82,'クライアント','サービスを要求する側');box(ctx,955,455,180,82,'サーバ','サービスを提供する側');ar(ctx,915,496,955,496,C.blue);t(ctx,'要求',935,480,10,C.gray,400,'center');ar(ctx,955,525,915,525,C.teal);t(ctx,'応答',935,548,10,C.gray,400,'center');
    t(ctx,'実線＝有線　／　点線＝無線電波',55,585,12,C.gray,400);
  }

  function drawTcpIp(ctx){
    head(ctx,'TCP/IP 4階層：送信側と受信側で同じ層を対応させる','階層は「何を」「ミスなく」「誰から誰に」「どんな方法で」を分担する。各層の代表プロトコルも位置で覚える。');
    const layers=[['アプリケーション層','何を','HTTP / SMTP / FTP'],['トランスポート層','ミスなく・効率よく','TCP / UDP'],['インターネット層','誰から誰に','IP'],['ネットワークインタフェース層','どんな方法で','Ethernet / 無線LAN / PPP']];
    t(ctx,'送信側',180,125,17,C.navy,700,'center');t(ctx,'受信側',1020,125,17,C.navy,700,'center');
    layers.forEach((L,i)=>{const y=155+i*105,fill=i%2===0?'#f6fafb':'#fff';box(ctx,55,y,420,82,L[0],`${L[1]}　｜　${L[2]}`,{fill});box(ctx,725,y,420,82,L[0],`${L[1]}　｜　${L[2]}`,{fill});if(i<3){ar(ctx,265,y+82,265,y+103,C.blue,1.5);ar(ctx,935,y+103,935,y+82,C.teal,1.5);}ar(ctx,475,y+41,725,y+41,'#9aadb7',1,[6,5]);});
    rr(ctx,505,170,165,365,'#fff8f0','#e3d2bf',12);t(ctx,'送信データ',587,205,14,C.orange,700,'center');['アプリ情報','TCP/UDP情報','IPアドレス','通信機器情報'].forEach((s,i)=>{rr(ctx,530,245+i*60,115,42,i===0?'#fff':'#fbf7f2',C.grid,5);t(ctx,s,587,266+i*60,10,C.dark,500,'center','middle');});
    t(ctx,'送信側では各層の情報を付加し、受信側では対応する層で読み取る',600,605,12,C.blue,700,'center');
  }

  function drawWebMail(ctx){
    head(ctx,'Webページ閲覧と電子メール：サーバ間の流れを分けて追う','WWWはDNSで名前解決してからWebサーバへ要求する。メールはSMTPで送信・転送し、POP/IMAPで受信する。');
    line(ctx,600,120,600,610,C.grid,1.5);t(ctx,'A  Webページ閲覧',45,125,17,C.navy,700);box(ctx,45,195,160,82,'Webブラウザ','www.sample.com');box(ctx,270,175,190,102,'DNSサーバ','ドメイン名 ↔ IPアドレス\n対応リストを管理',{fill:'#eef6fa'});box(ctx,270,365,190,92,'Webサーバ','123.123.123.XXX');
    ar(ctx,205,220,270,220);t(ctx,'① IPを問い合わせ',236,205,9,C.gray,400,'center');ar(ctx,270,255,205,255,C.teal);t(ctx,'② IPを返す',236,274,9,C.gray,400,'center');ar(ctx,155,277,320,365,C.orange);t(ctx,'③ HTTP/HTTPSでデータ要求',240,330,9,C.gray,400,'center');ar(ctx,300,410,155,277,C.blue);t(ctx,'④ Webページを受信',210,430,9,C.gray,400,'center');
    t(ctx,'B  電子メール',635,125,17,C.navy,700);box(ctx,635,210,130,78,'送信者','メールソフト');box(ctx,810,195,150,105,'送信側\nメールサーバ','',{fill:'#f7fafb'});box(ctx,1000,195,150,105,'受信側\nメールサーバ','',{fill:'#f7fafb'});box(ctx,1000,405,150,78,'受信者','メールソフト');
    ar(ctx,765,249,810,249,C.orange);t(ctx,'SMTP',787,232,10,C.orange,700,'center');ar(ctx,960,249,1000,249,C.orange);t(ctx,'SMTP',980,232,10,C.orange,700,'center');ar(ctx,1075,300,1075,405,C.blue);t(ctx,'POP / IMAP',1090,355,10,C.blue,700);
    box(ctx,810,405,150,78,'DNSサーバ','宛先ドメインの\nメールサーバIPを取得',{fill:'#eef6fa'});ar(ctx,885,300,885,405,C.teal,1.5,[6,5]);
    rr(ctx,635,530,515,68,'#f5f9fb','#d5e2e8');t(ctx,'POP：端末へダウンロード　／　IMAP：サーバに保存したまま読む',892,558,11,C.blue,700,'center');t(ctx,'Webメールはブラウザを使って送受信する方式',892,580,10,C.gray,400,'center');
  }

  const FIGS={
    'b5-3':{title:'半加算回路を真理値表から読む',caption:'教材の C（Carry Out）・S（Sum）と半加算／全加算の関係を図と表で対応させています。',draw:drawLogic},
    'b6-1':{title:'フローチャート・アクティビティ図・状態遷移図を使い分ける',caption:'三つを「全部矢印の図」として扱わず、表現する関係の違いが見えるように整理しています。',draw:drawAlgorithms},
    'b8-1':{title:'LANからインターネットまでの構成を一枚で読む',caption:'ハブ・アクセスポイント・ルータ・ISPの位置と、クライアント／サーバの役割を同じ図で確認できます。',draw:drawNetwork},
    'b8-2':{title:'TCP/IP 4階層を送受信で対応させる',caption:'各層の役割とHTTP/TCP・UDP/IP/Ethernet・無線LANなどの位置関係を固定します。',draw:drawTcpIp},
    'b8-3':{title:'DNS・WWW・メールのデータ経路を追う',caption:'Web閲覧の4段階と、SMTP→メールサーバ→POP/IMAPの流れを左右に分けています。',draw:drawWebMail}
  };
  function renderCanvas(canvas,draw,w=1200,h=650){const d=Math.min(2,devicePixelRatio||1);canvas.width=w*d;canvas.height=h*d;canvas.style.aspectRatio=`${w}/${h}`;const ctx=canvas.getContext('2d');ctx.setTransform(d,0,0,d,0,0);ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);draw(ctx);}
  function html(id,d){return `<figure class="scientific-figure-v11" data-scientific-figure-v11b data-figure-id="${id}"><div class="scientific-figure-head-v11"><div><span>TEXTBOOK FIGURE</span><h3>${d.title}</h3></div><button type="button" data-figure-zoom-b>拡大して見る</button></div><canvas aria-label="${d.title}">${d.caption}</canvas><figcaption>${d.caption}</figcaption></figure>`;}
  function zoom(root,d){root.querySelector('[data-figure-zoom-b]')?.addEventListener('click',()=>{let dlg=document.querySelector('.scientific-dialog-v11b');if(!dlg){dlg=document.createElement('dialog');dlg.className='scientific-dialog-v11 scientific-dialog-v11b';dlg.innerHTML='<div><button type="button" data-close>閉じる ×</button><canvas></canvas></div>';document.body.appendChild(dlg);dlg.querySelector('[data-close]').addEventListener('click',()=>dlg.close());dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});}renderCanvas(dlg.querySelector('canvas'),d.draw);dlg.showModal();});}
  function insert(){const id=idNow(),d=FIGS[id];if(!d||document.querySelector('[data-scientific-figure-v11b]'))return;const lesson=typeof studyLessonById==='function'?studyLessonById(id):null;if(!lesson)return;const old=document.querySelector('.et-figure-v4,.et-figure-v3');if(old){old.insertAdjacentHTML('afterend',html(id,d));old.hidden=true;}else{(document.querySelector('#points')||document.querySelector('.lesson-goals'))?.insertAdjacentHTML('afterend',html(id,d));}const root=document.querySelector('[data-scientific-figure-v11b]');if(root){renderCanvas(root.querySelector('canvas'),d.draw);zoom(root,d);}}
  window.renderStudyLesson=function renderScientificFiguresV11b(){baseRender();insert();};
})();