/* 情報Ⅰ v12-a — 第3講の高精細教材図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const {register}=K;
  register('b3-2',{
    title:'2進法：位の重み・基数変換・筆算を1枚でつなぐ',height:700,
    caption:'原教材の「カードの重み」「2で割った余り」「1+1=10」を、別々の暗記事項ではなく同じ位取り記数法として整理する。',
    question:'13₁₀を2進法へ直すとき、なぜ 1101₂ になるのか。「8・4・2・1」の重みを使って説明できますか。',
    answer:'13 = 8 + 4 + 1 なので、8・4・2・1の各桁は 1・1・0・1 となり、1101₂。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell}=k;head(ctx,'2進法による表現と計算','2進法は「0/1の並び」ではなく、各桁に 2 の累乗という重みをもつ位取り記数法。');
      text(ctx,'A　位の重みで読む',45,120,16,C.navy,700);const weights=[8,4,2,1],bits=[1,1,0,1];
      weights.forEach((w,i)=>{const x=55+i*155;rr(ctx,x,150,130,115,bits[i]?'#eef6fa':'#fff','#bfd1db',12);text(ctx,`2${['³','²','¹','⁰'][i]} = ${w}`,x+65,178,12,C.gray,700,'center');text(ctx,String(bits[i]),x+65,225,34,bits[i]?C.blue:C.gray,700,'center');});
      text(ctx,'1101₂',340,305,24,C.navy,700,'center');text(ctx,'=',430,305,20,C.gray,400,'center');text(ctx,'8 + 4 + 0 + 1',555,305,20,C.dark,700,'center');text(ctx,'=',700,305,20,C.gray,400,'center');text(ctx,'13₁₀',790,305,24,C.orange,700,'center');
      text(ctx,'B　10進法 → 2進法：2で割った余りを下から読む',45,365,16,C.navy,700);const rows=[['13','6','1'],['6','3','0'],['3','1','1'],['1','0','1']];
      rows.forEach((r,i)=>{const y=398+i*48;text(ctx,'2 )',60,y+24,14,C.gray,700);rr(ctx,92,y,100,38,'#fff','#d9e2e6',5);text(ctx,r[0],142,y+20,13,C.dark,700,'center','middle');text(ctx,'商',225,y+20,10,C.gray,400,'center','middle');rr(ctx,250,y,88,38,'#f8fafb','#d9e2e6',5);text(ctx,r[1],294,y+20,13,C.dark,700,'center','middle');text(ctx,'余り',370,y+20,10,C.gray,400,'center','middle');rr(ctx,405,y,64,38,'#fff8f0','#e3d2bf',5);text(ctx,r[2],437,y+20,13,C.orange,700,'center','middle');});
      arrow(ctx,500,555,500,418,C.orange,2);wrap(ctx,'余りを下から並べる\n→ 1101₂',525,458,155,20,12,C.orange,700);
      text(ctx,'C　2進法の筆算：桁上りも2進法',690,365,16,C.navy,700);const addX=750,addY=410;['0','1','0','1'].forEach((s,i)=>text(ctx,s,addX+i*44,addY,22,C.dark,700,'center'));text(ctx,'+',addX-45,addY+48,20,C.gray,700);['1','0','0','1'].forEach((s,i)=>text(ctx,s,addX+i*44,addY+48,22,C.dark,700,'center'));line(ctx,addX-25,addY+65,addX+155,addY+65,C.navy,1.5);['1','1','1','0'].forEach((s,i)=>text(ctx,s,addX+i*44,addY+100,22,C.blue,700,'center'));
      box(ctx,965,397,170,135,'1桁の足し算','0+0=0\n0+1=1\n1+0=1\n1+1=10',{fill:'#f7fafb',stroke:'#d0dce2'});
      rr(ctx,690,575,445,72,'#f5f9fb','#d5e2e8',10);text(ctx,'注意',712,601,11,C.orange,700);wrap(ctx,'01101₂ と 1101₂ は同じ数。先頭の0は値を変えない。',760,589,350,18,11,C.gray,400);
    }
  });

  register('b3-3',{
    title:'文字コードと16進法：上位4bit・下位4bitで文字を読む',height:700,
    caption:'文字コードは「文字と数値の対応」、フォントは「文字の見た目」。2進数4桁を16進1桁にまとめる理由も同時に確認する。',
    question:'JIS X0201で文字「I」のコードが 0100 1001₂ のとき、16進法では何と表せますか。',
    answer:'0100₂=4、1001₂=9 なので 49₁₆。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,cell,table}=k;head(ctx,'文字のデジタル表現と16進法','コンピュータは文字そのものを保存せず、文字コードで数値へ対応付けて扱う。16進法は2進4桁を1桁にまとめる。');
      text(ctx,'A　文字 → コード → 2進表現 → 表示',45,120,16,C.navy,700);box(ctx,45,155,150,76,'文字','I',{fill:'#fff'});box(ctx,245,155,185,76,'文字コード','JIS X0201',{fill:'#f8fafb'});box(ctx,485,155,200,76,'2進表現','0100 1001',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,740,155,170,76,'16進表現','49₁₆',{fill:'#fff8f0',stroke:'#e3d2bf'});box(ctx,965,155,170,76,'フォント','画面上の字形',{fill:'#fff'});arrow(ctx,195,193,245,193);arrow(ctx,430,193,485,193);arrow(ctx,685,193,740,193,C.orange);arrow(ctx,910,193,965,193,C.teal);
      text(ctx,'B　2進4桁 ↔ 16進1桁',45,285,16,C.navy,700);const vals=[['0000','0'],['0001','1'],['0010','2'],['0011','3'],['0100','4'],['0101','5'],['0110','6'],['0111','7'],['1000','8'],['1001','9'],['1010','A'],['1011','B'],['1100','C'],['1101','D'],['1110','E'],['1111','F']];
      vals.forEach((v,i)=>{const col=i%8,row=Math.floor(i/8),x=48+col*87,y=318+row*65;rr(ctx,x,y,77,52,v[0]==='1001'?'#fff8f0':'#fff','#d7e1e6',6);text(ctx,v[0],x+38,y+19,9,C.gray,600,'center');text(ctx,v[1],x+38,y+40,16,v[0]==='1001'?C.orange:C.navy,700,'center');});
      rr(ctx,780,308,355,138,'#f8fafb','#d6e1e6',10);text(ctx,'0100 1001₂',957,338,18,C.navy,700,'center');line(ctx,880,350,880,382,C.grid,1,[4,4]);line(ctx,1034,350,1034,382,C.grid,1,[4,4]);text(ctx,'0100 → 4',875,410,14,C.blue,700,'center');text(ctx,'1001 → 9',1035,410,14,C.orange,700,'center');text(ctx,'→ 49₁₆',957,438,16,C.dark,700,'center');
      text(ctx,'C　同じ「文字」の中でも役割を分ける',45,510,16,C.navy,700);const rows=[['文字コード','文字 ↔ 数値の対応規則'],['Unicode','世界中の文字にコードポイントを与える枠組み'],['UTF-8','Unicodeのコードポイントをバイト列として表す方式'],['フォント','同じ文字コードをどんな字形で描くか']];table(ctx,45,540,1090,125,['用語','役割'],rows,{fs:10,headFill:'#eff5f8'});
    }
  });

  register('b3-6',{
    title:'デジタル画像：画素数・階調・dpi・ラスタ/ベクタ・CMYKを分離する',height:760,
    caption:'「高画質」の要因を一語で済ませず、画素数・1画素の階調・dpi・表現形式を別々に読む。印刷はRGBではなくCMYK系。',
    question:'4KがFull HDより「4倍の画素数」と言えるのはなぜですか。',
    answer:'3840×2160 は 1920×1080 の縦横それぞれ2倍なので、総画素数は 2×2=4倍。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,axis}=k;head(ctx,'デジタル画像の構成と色の三原色','画素数・階調・解像度(dpi)は似て見えるが別の量。ラスタとベクタも「画像の持ち方」が違う。');
      text(ctx,'A　画素数：標本化の細かさ',45,120,16,C.navy,700);function pix(x,y,n,label){rr(ctx,x,y,190,150,'#fff','#d5e0e5',6);const s=120/n,ox=x+35,oy=y+15;for(let r=0;r<n;r++)for(let c=0;c<n;c++){const dx=c-n/2,dy=r-n/2;const on=(dx*dx+dy*dy)<(n*n*.16)&&!(Math.abs(dx)<n*.08&&dy<-n*.15);ctx.fillStyle=on?'#3e7c9c':'#edf2f4';ctx.fillRect(ox+c*s,oy+r*s,s-.5,s-.5);}text(ctx,label,x+95,y+142,10,C.gray,700,'center');}pix(45,155,8,'少ない画素');pix(260,155,16,'多い画素');arrow(ctx,235,230,255,230,C.blue);box(ctx,490,165,255,125,'4K / 8K','4K = 3840×2160\nFull HD = 1920×1080\n縦2倍 × 横2倍 → 総画素4倍',{fill:'#f8fafb'});box(ctx,780,165,355,125,'階調・ビット深度','1画素で何段階の明るさ・色を表せるか。\nRGB各8bitなら 256³ ≒ 1677万色。',{fill:'#fff'});
      text(ctx,'B　dpi：1インチ当たりのドット数',45,355,16,C.navy,700);rr(ctx,45,390,430,95,'#fff','#d6e1e6',8);for(let i=0;i<30;i++){ctx.beginPath();ctx.arc(70+i*12.5,435,2.2,0,Math.PI*2);ctx.fillStyle=C.blue;ctx.fill();}line(ctx,70,405,445,405,C.orange,2);text(ctx,'1 inch = 2.54 cm',258,398,10,C.orange,700,'center');text(ctx,'同じ1インチの中にドットが多いほど dpi が高い',258,472,11,C.gray,400,'center');
      text(ctx,'C　ラスタ vs ベクタ',530,355,16,C.navy,700);rr(ctx,530,390,270,150,'#fff','#d6e1e6',8);const gx=555,gy=410,ss=18;for(let r=0;r<6;r++)for(let c=0;c<10;c++){ctx.fillStyle=(c>r&&c<10-r)?'#3b8c8c':'#edf2f4';ctx.fillRect(gx+c*ss,gy+r*ss,ss-1,ss-1);}text(ctx,'ラスタ：画素を並べる',665,525,11,C.gray,700,'center');rr(ctx,835,390,300,150,'#fff','#d6e1e6',8);ctx.beginPath();ctx.moveTo(880,500);ctx.bezierCurveTo(930,400,1020,400,1090,490);ctx.strokeStyle=C.teal;ctx.lineWidth=5;ctx.stroke();[[880,500],[960,430],[1090,490]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle=C.orange;ctx.fill();});text(ctx,'ベクタ：座標・形状・色で再現',985,525,11,C.gray,700,'center');
      text(ctx,'D　画面のRGBと印刷のCMYK',45,600,16,C.navy,700);['R','G','B'].forEach((s,i)=>{ctx.beginPath();ctx.arc(125+i*55,665,54,0,Math.PI*2);ctx.globalAlpha=.52;ctx.fillStyle=['#f04d4d','#43b568','#4a78d1'][i];ctx.fill();ctx.globalAlpha=1;});text(ctx,'RGB：加法混色 → 明るく',190,735,11,C.blue,700,'center');['C','M','Y'].forEach((s,i)=>{ctx.beginPath();ctx.arc(690+i*55,665,54,0,Math.PI*2);ctx.globalAlpha=.5;ctx.fillStyle=['#28bfc8','#d94c9a','#e6d83e'][i];ctx.fill();ctx.globalAlpha=1;});ctx.beginPath();ctx.arc(880,665,34,0,Math.PI*2);ctx.fillStyle='#20262a';ctx.fill();text(ctx,'K',880,665,14,'#fff',700,'center','middle');text(ctx,'CMYK：減法混色＋K(黒)',760,735,11,C.orange,700,'center');
    }
  });

  register('b3-7',{
    title:'動画と圧縮：fps・解像度・可逆/非可逆・圧縮率をつなぐ',height:740,
    caption:'動画はフレームの連続。fpsは時間方向、解像度は空間方向。圧縮は「元へ完全に戻せるか」で可逆/非可逆を分ける。',
    question:'0000001111000001111 を教材のランレングス方式で圧縮すると、なぜ 19bit → 16bit になりますか。',
    answer:'0が6個、1が4個、0が5個、1が4個なので、値1bit＋個数3bitを4組使い、4bit×4組=16bit。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'動画のデジタル表現と圧縮技術','動きの滑らかさはfps、1フレームの細かさは解像度。圧縮は保存・伝送量を減らすために使う。');
      text(ctx,'A　フレームを時間方向に並べる',45,120,16,C.navy,700);for(let i=0;i<6;i++){const x=45+i*112;rr(ctx,x,155,96,82,'#fff','#d5e0e5',6);ctx.beginPath();ctx.arc(x+25+i*8,196,13,0,Math.PI*2);ctx.fillStyle=C.orange;ctx.fill();text(ctx,`F${i+1}`,x+48,226,9,C.gray,700,'center');if(i<5)arrow(ctx,x+96,196,x+110,196,'#9dafb9',1);}box(ctx,760,155,375,82,'fps = frames per second','1秒当たりのフレーム数。一般に24〜30fps程度で滑らかに見える。60fpsは動きをより細かく記録。',{fill:'#f8fafb'});
      text(ctx,'B　ランレングス圧縮（教材例）',45,305,16,C.navy,700);const raw='0000001111000001111';text(ctx,raw,55,350,18,C.dark,700);text(ctx,'19 bit',365,350,12,C.orange,700);arrow(ctx,455,345,520,345,C.orange,2);const groups=[['0','110','6'],['1','100','4'],['0','101','5'],['1','100','4']];groups.forEach((g,i)=>{const x=550+i*140;rr(ctx,x,325,120,58,'#fff','#d9e2e6',6);text(ctx,g[0],x+24,354,16,C.navy,700,'center');text(ctx,g[1],x+76,354,16,C.blue,700,'center');text(ctx,`(${g[2]}個)`,x+60,376,9,C.gray,400,'center');});text(ctx,'16 bit',1090,355,12,C.blue,700,'right');rr(ctx,45,405,1090,54,'#f5f9fb','#d5e2e8',8);text(ctx,'圧縮率 = 圧縮後 / 圧縮前 × 100 = 16 / 19 × 100 ≒ 84%',590,432,13,C.blue,700,'center','middle');
      text(ctx,'C　可逆圧縮と非可逆圧縮',45,515,16,C.navy,700);box(ctx,45,550,495,122,'可逆圧縮','完全に元へ戻せる。\n例：PNG / GIF / FLAC / ZIP\n同じ記号の繰返しなど、規則性を利用。',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,595,550,540,122,'非可逆圧縮','完全には元へ戻らない。\n例：JPEG / MP3\n人が気づきにくい細部や聞き取りにくい成分を削り、高い圧縮率を得る。',{fill:'#fff8f0',stroke:'#e3d2bf'});
      text(ctx,'画質・滑らかさを上げる',45,710,11,C.blue,700);arrow(ctx,210,706,430,706,C.blue,2);text(ctx,'データ量が増える',445,710,11,C.orange,700);
    }
  });
})();