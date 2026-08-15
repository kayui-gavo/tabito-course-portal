/* 情報Ⅰ v11 — 原教材の関係・数値例に合わせた高精細 Canvas 図版
   generic concept cardsではなく、教材で図そのものが学習内容になっているPARTを優先して置換する。 */
(() => {
  const baseRender = window.renderStudyLesson;
  const currentId = () => new URLSearchParams(location.search).get('id') || '';
  const COLORS={navy:'#213f54',blue:'#2f789e',teal:'#3b8c8c',orange:'#d88745',grid:'#d8e1e6',light:'#f4f8fa',gray:'#667986',dark:'#273b49',red:'#b65c55',green:'#4f8a64',white:'#fff'};
  const FONT='"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
  const BOLD='700 16px '+FONT, BODY='13px '+FONT, SMALL='11px '+FONT;

  function rounded(ctx,x,y,w,h,r=10,fill='#fff',stroke=COLORS.grid,lw=1.2){
    ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();ctx.lineWidth=lw;ctx.strokeStyle=stroke;ctx.stroke();
  }
  function text(ctx,s,x,y,size=14,color=COLORS.dark,weight=400,align='left',baseline='alphabetic'){
    ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${FONT}`;ctx.textAlign=align;ctx.textBaseline=baseline;ctx.fillText(s,x,y);
  }
  function wrap(ctx,s,x,y,maxWidth,lineHeight=20,size=13,color=COLORS.gray,weight=400){
    ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${FONT}`;ctx.textAlign='left';ctx.textBaseline='top';
    let line='',yy=y;for(const ch of String(s)){const test=line+ch;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,yy);line=ch;yy+=lineHeight;}else line=test;}if(line)ctx.fillText(line,x,yy);return yy;
  }
  function box(ctx,x,y,w,h,title,body='',opt={}){
    rounded(ctx,x,y,w,h,opt.r||10,opt.fill||'#fff',opt.stroke||COLORS.grid,opt.lw||1.2);
    text(ctx,title,x+14,y+22,opt.titleSize||14,opt.titleColor||COLORS.navy,700);
    if(body)wrap(ctx,body,x+14,y+34,w-28,opt.lineHeight||18,opt.bodySize||11,opt.bodyColor||COLORS.gray,400);
  }
  function arrow(ctx,x1,y1,x2,y2,color=COLORS.blue,lw=2,dash=[]){
    ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);
    const a=Math.atan2(y2-y1,x2-x1),s=8;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-s*Math.cos(a-.45),y2-s*Math.sin(a-.45));ctx.lineTo(x2-s*Math.cos(a+.45),y2-s*Math.sin(a+.45));ctx.closePath();ctx.fill();ctx.restore();
  }
  function line(ctx,x1,y1,x2,y2,color=COLORS.grid,lw=1,dash=[]){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore();}
  function title(ctx,h,sub){text(ctx,h,34,42,24,COLORS.navy,700);wrap(ctx,sub,34,55,1130,18,12,COLORS.gray,400);}

  function drawPCM(ctx){
    title(ctx,'音のデジタル化：標本化 → 量子化 → 符号化','教材例の6標本をそのまま追う。量子化値 5, 9, 12, 14, 13, 10 を4bitで符号化すると合計24bit。');
    const gx=48,gy=150,gw=650,gh=350;ctx.strokeStyle=COLORS.grid;ctx.strokeRect(gx,gy,gw,gh);
    for(let v=0;v<=15;v+=3){const yy=gy+gh-v/15*gh;line(ctx,gx,yy,gx+gw,yy,'#edf1f3',1);text(ctx,String(v),gx-10,yy,10,COLORS.gray,400,'right','middle');}
    const vals=[5,9,12,14,13,10], codes=['0101','1001','1100','1110','1101','1010'];
    const pts=vals.map((v,i)=>({x:gx+80+i*102,y:gy+gh-v/15*gh}));
    ctx.strokeStyle=COLORS.navy;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(gx+20,gy+gh-35);for(let i=0;i<pts.length;i++){const p=pts[i];if(i===0)ctx.quadraticCurveTo(p.x-35,p.y+40,p.x,p.y);else{const prev=pts[i-1];ctx.bezierCurveTo(prev.x+45,prev.y-5,p.x-45,p.y+5,p.x,p.y);}}ctx.bezierCurveTo(pts.at(-1).x+35,pts.at(-1).y+5,gx+gw-10,pts.at(-1).y+20,gx+gw,pts.at(-1).y+15);ctx.stroke();
    pts.forEach((p,i)=>{line(ctx,p.x,gy+gh,p.x,p.y,'#9fb5c1',1,[5,5]);ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fillStyle=COLORS.orange;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#fff';ctx.stroke();text(ctx,String(i+1),p.x,gy+gh+22,10,COLORS.gray,400,'center');});
    text(ctx,'標本番号',gx,gy+gh+48,12,COLORS.gray,400);
    box(ctx,755,150,400,108,'① 標本化','一定間隔で波の高さを取り出す。標本化周波数を高くすると、時間方向を細かく捉えられる。',{fill:COLORS.light,stroke:'#bfd1db'});
    box(ctx,755,278,400,95,'② 量子化','教材例：5　9　12　14　13　10',{fill:'#fff'});
    box(ctx,755,393,400,108,'③ 符号化','0101　1001　1100　1110　1101　1010\n6標本 × 4bit = 24bit',{fill:'#fff'});
    arrow(ctx,955,258,955,276);arrow(ctx,955,373,955,391);
    rounded(ctx,48,545,1107,60,10,'#f5f9fb','#d5e2e8');text(ctx,'標本化周波数↑ / 量子化bit数↑',68,570,14,COLORS.blue,700);text(ctx,'→ 元の波形をより忠実に表せるが、データ量も増える（トレードオフ）',312,570,13,COLORS.dark,400);
  }

  function drawFiveUnits(ctx){
    title(ctx,'コンピュータの五大装置と CPU・メモリ・ストレージ','「五大装置」という機能分類と、CPU・メモリ・ストレージという実際の部品名を対応させる。');
    box(ctx,55,245,205,125,'入力装置','外界の情報を得る\nキーボード・マウス など',{fill:'#f8fbfc'});
    box(ctx,940,245,205,125,'出力装置','結果を外へ出す\nディスプレイ・プリンタ など',{fill:'#f8fbfc'});
    box(ctx,390,105,420,115,'記憶装置（主記憶）','メモリ：CPUと直接データをやり取りし、処理中のデータ・命令を保持',{fill:COLORS.light,stroke:'#bfd1db'});
    rounded(ctx,350,260,500,205,18,'#eef6fa',COLORS.blue,2);text(ctx,'CPU',372,294,16,COLORS.blue,700);
    box(ctx,390,325,180,92,'演算装置','計算をする',{fill:'#fff',stroke:'#bfd1db'});box(ctx,630,325,180,92,'制御装置','他の装置を制御',{fill:'#fff',stroke:'#bfd1db'});
    box(ctx,390,505,420,88,'補助記憶装置（ストレージ）','大容量のデータを長期的に保存する',{fill:'#fbf7f2',stroke:'#e3d2bf',titleColor:'#8a5d34'});
    arrow(ctx,260,307,390,162);arrow(ctx,810,162,940,307);arrow(ctx,600,220,600,260,COLORS.blue,2);arrow(ctx,600,465,600,505,COLORS.orange,2);
    [[725,360,260,290],[725,360,940,290],[725,360,600,220]].forEach(([a,b,c,d])=>arrow(ctx,a,b,c,d,'#91a9b6',1,[6,5]));
    text(ctx,'実線＝主なデータの流れ',55,535,12,COLORS.blue,700);text(ctx,'破線＝制御装置が各装置の動作を制御',55,560,12,COLORS.gray,400);
  }

  function drawCrypto(ctx){
    title(ctx,'公開鍵暗号方式とデジタル署名：鍵の向きを分けて読む','暗号化は「受信者だけが読める」に注目し、署名は「送信者本人・改ざんなしを確認」に注目する。');
    line(ctx,600,105,600,610,COLORS.grid,1.5);text(ctx,'A  公開鍵暗号方式',45,115,18,COLORS.navy,700);text(ctx,'B  デジタル署名（教材の代表例）',635,115,18,COLORS.navy,700);
    box(ctx,45,185,145,82,'平文','HELLO');box(ctx,255,185,220,82,'受信者の公開鍵','暗号化に使用',{fill:'#eef6fa',stroke:'#b8d1df'});arrow(ctx,190,226,255,226);
    box(ctx,45,345,205,82,'暗号文','盗み見ても意味不明',{fill:'#fbf7f2',stroke:'#e2cdb6'});arrow(ctx,360,267,160,345,COLORS.orange,2);
    box(ctx,320,345,200,82,'受信者の秘密鍵','復号に使用',{fill:'#f7f4f2',stroke:'#d7c5bd'});arrow(ctx,250,386,320,386);box(ctx,320,505,200,72,'平文','HELLO');arrow(ctx,420,427,420,505);
    wrap(ctx,'公開鍵で暗号化したデータは、対応する秘密鍵でのみ復号できる。',45,490,230,19,11,COLORS.gray,400);

    box(ctx,635,175,135,72,'メッセージ','HELLO');box(ctx,805,175,155,72,'ハッシュ関数','一定長の値へ',{fill:COLORS.light});box(ctx,995,175,120,72,'ハッシュ値','H');arrow(ctx,770,211,805,211);arrow(ctx,960,211,995,211);
    box(ctx,770,300,185,75,'送信者の秘密鍵','ハッシュ値から署名を作る',{fill:'#f7f4f2',stroke:'#d7c5bd'});box(ctx,1000,300,115,75,'署名','SIG',{fill:'#fbf7f2',stroke:'#e2cdb6'});arrow(ctx,1055,247,875,300,COLORS.orange,2);arrow(ctx,955,337,1000,337,COLORS.orange,2);
    box(ctx,635,470,135,72,'受信文','HELLO');box(ctx,805,470,150,72,'ハッシュ関数','→ H1',{fill:COLORS.light});box(ctx,990,470,155,72,'署名を確認','送信者の公開鍵 → H2',{fill:'#eef6fa',stroke:'#b8d1df'});arrow(ctx,770,506,805,506);arrow(ctx,955,506,990,506);
    rounded(ctx,715,565,375,52,9,'#f4f9f5','#d3e4d7');text(ctx,'H1 = H2  →  改ざんなし・送信者本人を確認',902,591,12,COLORS.green,700,'center');
  }

  function cell(ctx,x,y,w,h,s,head=false,fill='#fff',fs=10){ctx.fillStyle=fill;ctx.fillRect(x,y,w,h);ctx.strokeStyle=COLORS.grid;ctx.lineWidth=1;ctx.strokeRect(x,y,w,h);text(ctx,s,x+w/2,y+h/2,fs,head?COLORS.navy:COLORS.dark,head?700:400,'center','middle');}
  function table(ctx,x,y,w,h,headers,rows,opt={}){const nr=rows.length+1,nc=headers.length,cw=w/nc,rh=h/nr;headers.forEach((s,c)=>cell(ctx,x+c*cw,y,cw,rh,s,true,opt.headFill||'#eff5f8',opt.fs||9));rows.forEach((row,r)=>row.forEach((s,c)=>cell(ctx,x+c*cw,y+(r+1)*rh,cw,rh,s,false,opt.fill?.(r,c)||'#fff',opt.fs||9)));}
  function drawDatabase(ctx){
    title(ctx,'リレーショナルデータベース：選択・射影・結合','教材の書籍テーブルを使い、「行を絞る」「列を取り出す」「別テーブルをつなぐ」を視覚的に分ける。');
    const books=[['S1','吾輩は猫である','T1'],['S2','伊豆の踊子','T2'],['S3','三四郎','T1'],['S4','草枕','T1'],['S5','雪国','T2']];
    text(ctx,'元の書籍テーブル',45,125,15,COLORS.navy,700);table(ctx,45,145,420,240,['書籍ID','書籍名','著者ID'],books,{fs:10});
    text(ctx,'選択',535,125,15,COLORS.blue,700);wrap(ctx,'条件を満たすレコード（行）を抽出',535,136,250,18,10,COLORS.gray);table(ctx,535,185,285,128,['書籍ID','書籍名','著者ID'],books.filter(r=>r[2]==='T2'),{fs:9,fill:()=> '#fff5ea'});arrow(ctx,465,260,535,250);
    text(ctx,'射影',900,125,15,COLORS.teal,700);wrap(ctx,'一部のフィールド（列）を取り出す',900,136,250,18,10,COLORS.gray);table(ctx,950,185,155,210,['書籍名'],books.map(r=>[r[1]]),{fs:9,headFill:'#ddeeea',fill:()=> '#eef7f5'});
    text(ctx,'結合',535,375,15,COLORS.orange,700);wrap(ctx,'共通する著者IDを使い、複数テーブルを1つにする',535,386,450,18,10,COLORS.gray);
    table(ctx,535,435,230,115,['著者ID','著者'],[['T1','夏目漱石'],['T2','川端康成']],{fs:9});arrow(ctx,765,493,805,493,COLORS.orange,2);
    table(ctx,805,425,345,165,['書籍ID','書籍名','著者ID','著者'],books.map(r=>[...r,r[2]==='T1'?'夏目漱石':'川端康成']),{fs:8});
    text(ctx,'列＝フィールド / カラム / 属性　　行＝レコード / タプル / 組',45,590,12,COLORS.navy,700);
  }

  function drawStats(ctx){
    title(ctx,'データの解釈：相関・回帰・残差・標本から母集団へ','相関係数は直線的関係の向きと強さ。回帰は関係式。標本から母集団を確率的に推定する。');
    const sx=45,sy=155,sw=455,sh=290;ctx.fillStyle='#fbfcfc';ctx.fillRect(sx,sy,sw,sh);ctx.strokeStyle=COLORS.grid;ctx.strokeRect(sx,sy,sw,sh);
    const px=[0.04,.18,.27,.38,.48,.56,.65,.72,.80,.89,.96],py=[.05,.45,.40,.37,.50,.56,.43,.66,.72,.80,.93];
    ctx.strokeStyle=COLORS.orange;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(sx,sy+sh-18);ctx.lineTo(sx+sw,sy+18);ctx.stroke();
    px.forEach((p,i)=>{const x=sx+p*sw,y=sy+(1-py[i])*sh;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle=COLORS.blue;ctx.fill();if([1,6,8].includes(i)){const ly=sy+sh-(.10+.82*p)*sh;line(ctx,x,y,x,ly,'#9fb0b9',1,[4,4]);}});
    text(ctx,'回帰直線',62,178,12,COLORS.orange,700);text(ctx,'点と回帰直線の縦の差＝残差',62,425,11,COLORS.gray,400);
    text(ctx,'相関係数 r',45,495,14,COLORS.navy,700);line(ctx,75,525,450,525,'#b9c7ce',5);[-1,-.5,0,.5,1].forEach((v,i)=>{const x=75+i*93.75;line(ctx,x,515,x,535,COLORS.navy,1.2);text(ctx,String(v),x,552,10,COLORS.gray,400,'center');});text(ctx,'負の相関',75,575,10,COLORS.gray);text(ctx,'相関なし',262,575,10,COLORS.gray,400,'center');text(ctx,'正の相関',450,575,10,COLORS.gray,400,'right');
    box(ctx,610,165,205,115,'母集団','統計対象となる全体\n例：15万個',{fill:'#f7fafb'});box(ctx,920,165,185,115,'標本','母集団から抽出した部分集合\n例：100個',{fill:'#fff8f0',stroke:'#e5d2bc'});arrow(ctx,815,222,920,222,COLORS.orange,2);text(ctx,'無作為に抽出',867,205,10,COLORS.gray,400,'center');
    box(ctx,690,360,330,135,'推定','無作為に抽出した標本を調べ、母集団がどのような値を持つかを確率的に推測する。',{fill:COLORS.light});arrow(ctx,1012,280,855,360,COLORS.blue,2);
    rounded(ctx,610,545,495,58,10,'#fff7f6','#ead5d2');text(ctx,'相関が強くても「一方が他方の原因」とは限らない',857,574,13,COLORS.red,700,'center');
  }

  function node(ctx,x,y,label,fill='#fff'){ctx.beginPath();ctx.arc(x,y,28,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=COLORS.blue;ctx.stroke();text(ctx,label,x,y,14,COLORS.navy,700,'center','middle');}
  function directed(ctx,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;arrow(ctx,a[0]+ux*31,a[1]+uy*31,b[0]-ux*31,b[1]-uy*31,'#7896a7',2);}
  function drawGraph(ctx){
    title(ctx,'グラフ理論：無向グラフ（友人関係）と有向グラフ（SNSフォロー）','教材第45講は、例題で相互的な友人関係を扱い、確認問題で矢印をもつSNSフォロー関係へ発展する。');
    text(ctx,'例題：友人関係（無向グラフ）',55,135,17,COLORS.navy,700);const L={A:[155,255],B:[425,255],C:[155,445],D:[425,445]};[['A','B'],['A','C'],['B','C'],['B','D']].forEach(([a,b])=>line(ctx,...L[a],...L[b],'#7896a7',2.5));Object.entries(L).forEach(([k,p])=>node(ctx,...p,k));
    rounded(ctx,70,510,450,75,10,'#f7fafb','#dbe4e8');text(ctx,'相互関係なので Data[i][j] = Data[j][i]',295,540,12,COLORS.navy,700,'center');text(ctx,'→ 隣接行列は対称になる',295,564,11,COLORS.gray,400,'center');
    text(ctx,'確認問題：SNSフォロー（有向グラフ）',650,135,17,COLORS.navy,700);const R={A:[735,255],B:[1035,255],C:[735,445],D:[1035,445]};[['A','B'],['A','C'],['B','A'],['B','D'],['D','A'],['D','B']].forEach(([a,b])=>directed(ctx,R[a],R[b]));Object.entries(R).forEach(([k,p])=>node(ctx,...p,k,'#fbfcfc'));
    rounded(ctx,650,510,500,75,10,'#fff8f0','#e5d2bc');text(ctx,'行：Data[name_index][i] = 1 → その人がフォロー',675,538,11,COLORS.dark,700);text(ctx,'列：Data[i][name_index] = 1 → その人をフォローしている人',675,563,11,COLORS.dark,700);
    text(ctx,'「行を見る」のか「列を見る」のかで矢印の向きが変わる',600,620,13,COLORS.orange,700,'center');
  }

  const FIGS={
    'b3-4':{title:'PCMの3段階を教材例で追う',caption:'標本化→量子化→符号化を、教材掲載の量子化値・4bit符号列まで一枚で対応させています。',draw:drawPCM},
    'b5-1':{title:'五大装置と実際の部品を対応させる',caption:'データの主経路と制御線を分け、CPU・メモリ・ストレージの役割を混同しない構図にしています。',draw:drawFiveUnits},
    'b8-5':{title:'公開鍵暗号とデジタル署名を別目的で読む',caption:'「受信者の公開鍵→受信者の秘密鍵」と「送信者の秘密鍵→送信者の公開鍵」を左右で分けています。',draw:drawCrypto},
    'b8-7':{title:'選択・射影・結合を表そのものから理解する',caption:'教材の書籍ID・書籍名・著者ID・著者テーブルの例に合わせています。',draw:drawDatabase},
    'b9-4':{title:'回帰・残差・標本・母集団の関係を整理する',caption:'同じPARTに登場する回帰と推定を、誤った一方向フローにせず別の分析概念として整理しています。',draw:drawStats},
    'p45':{title:'無向グラフから有向グラフへ',caption:'第45講の例題（友人関係）と確認問題（SNSフォロー）の両方を一枚で比較します。',draw:drawGraph}
  };

  function renderCanvas(canvas,draw,w=1200,h=650){
    const dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.aspectRatio=`${w}/${h}`;const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);draw(ctx,w,h);
  }
  function figureHTML(id,d){return `<figure class="scientific-figure-v11" data-scientific-figure-v11 data-figure-id="${id}"><div class="scientific-figure-head-v11"><div><span>TEXTBOOK FIGURE</span><h3>${d.title}</h3></div><button type="button" data-figure-zoom>拡大して見る</button></div><canvas aria-label="${d.title}">${d.caption}</canvas><figcaption>${d.caption}</figcaption></figure>`;}
  function attachZoom(root,d){const button=root.querySelector('[data-figure-zoom]');button?.addEventListener('click',()=>{let dialog=document.querySelector('.scientific-dialog-v11');if(!dialog){dialog=document.createElement('dialog');dialog.className='scientific-dialog-v11';dialog.innerHTML='<div><button type="button" data-close>閉じる ×</button><canvas></canvas></div>';document.body.appendChild(dialog);dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}renderCanvas(dialog.querySelector('canvas'),d.draw,1200,650);dialog.showModal();});}
  function insert(){const id=currentId(),d=FIGS[id];if(!d||document.querySelector('[data-scientific-figure-v11]'))return;const lesson=typeof studyLessonById==='function'?studyLessonById(id):null;if(!lesson)return;
    if(lesson.track==='main'){
      const old=document.querySelector('.et-figure-v4,.et-figure-v3');
      if(old){old.insertAdjacentHTML('afterend',figureHTML(id,d));old.hidden=true;}else{(document.querySelector('#points')||document.querySelector('.lesson-goals'))?.insertAdjacentHTML('afterend',figureHTML(id,d));}
    }else{
      const target=document.querySelector('.program-example-v6,#example,[data-program-lab-v9]');target?.insertAdjacentHTML('beforebegin',figureHTML(id,d));
    }
    const root=document.querySelector('[data-scientific-figure-v11]');if(root){renderCanvas(root.querySelector('canvas'),d.draw);attachZoom(root,d);}
  }
  window.renderStudyLesson=function renderScientificFiguresV11(){baseRender();insert();};
})();