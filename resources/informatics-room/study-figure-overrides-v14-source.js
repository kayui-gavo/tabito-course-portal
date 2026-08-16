/* 情報Ⅰ v14 — 原教材再照合で確定した高密度図版の差し替え */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;
  const C=K.C;

  K.register('b3-4',{
    title:'音のデジタル化：PCMの3段階とデータ量',
    height:820,
    caption:'標本化→量子化→符号化を教材の6標本で追い、CD音声の標本化周波数・量子化bit数・チャンネル数・時間から非圧縮データ量を計算する。',
    question:'44100Hz・16bit・ステレオの音声を4分記録すると、教材の1KB=1000B・1MB=1000KBでは何MBですか。',
    answer:'44100×16×2×240=338688000bit。8で割ると42336000Bなので42.336MB。',
    draw(ctx,k){
      const {text,wrap,rr,box,line,arrow,head}=k;
      head(ctx,'音のデジタル化','連続する音の波形を、標本化・量子化・符号化の順で数値化する。設定を細かくすると再現性は上がるが、保存するデータ量も増える。');

      const gx=45,gy=155,gw=620,gh=290;
      const vals=[5,9,12,14,13,10],codes=['0101','1001','1100','1110','1101','1010'];
      text(ctx,'A　PCM：標本化 → 量子化 → 符号化',45,125,15,C.navy,700);
      rr(ctx,gx,gy,gw,gh,'#fff','#d8e1e6',0);
      for(let v=0;v<=15;v+=3){const y=gy+gh-v/15*gh;line(ctx,gx,y,gx+gw,y,'#edf1f3');text(ctx,String(v),gx-9,y,9,C.gray,400,'right','middle');}
      const pts=vals.map((v,i)=>({x:gx+68+i*102,y:gy+gh-v/15*gh}));
      ctx.strokeStyle=C.navy;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(gx+15,gy+gh-30);
      pts.forEach((p,i)=>{if(i===0)ctx.quadraticCurveTo(p.x-28,p.y+34,p.x,p.y);else{const q=pts[i-1];ctx.bezierCurveTo(q.x+36,q.y,p.x-36,p.y,p.x,p.y);}});ctx.stroke();
      pts.forEach((p,i)=>{line(ctx,p.x,gy+gh,p.x,p.y,'#9fb5c1',1,[5,5]);ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fillStyle=C.orange;ctx.fill();text(ctx,String(vals[i]),p.x,p.y-12,10,C.orange,700,'center');text(ctx,`${i+1}`,p.x,gy+gh+20,9,C.gray,400,'center');});
      text(ctx,'標本',gx+gw-5,gy+gh+38,9,C.gray,400,'right');

      box(ctx,720,150,430,82,'① 標本化','一定間隔で波の高さを取り出す。標本化周波数の単位はHz。',{fill:'#eef6fa'});
      box(ctx,720,252,430,82,'② 量子化','教材例の段階値：5，9，12，14，13，10',{fill:'#fff'});
      box(ctx,720,354,430,112,'③ 符号化','0101　1001　1100　1110　1101　1010\n6標本 × 4bit = 24bit',{fill:'#fff8f0',stroke:'#e3d2bf',bs:10.5});
      arrow(ctx,935,232,935,250,C.blue);arrow(ctx,935,334,935,352,C.orange);

      text(ctx,'B　音質とデータ量',45,510,15,C.navy,700);
      box(ctx,45,540,340,92,'標本化周波数 ↑','1秒あたりの標本数が増える\n→ 時間方向を細かく表す',{fill:'#eef6fa'});
      box(ctx,430,540,340,92,'量子化bit数 ↑','1標本の段階数が増える\n→ 振幅方向を細かく表す',{fill:'#eef6fa'});
      box(ctx,815,540,335,92,'結果','再現は細かくなるが\nデータ量も大きくなる',{fill:'#fff8f0',stroke:'#e3d2bf'});

      text(ctx,'C　教材のCD音声例：非圧縮データ量',45,685,15,C.navy,700);
      rr(ctx,45,715,1105,72,'#f5f9fb','#d5e2e8',10);
      text(ctx,'44100 Hz',72,743,12,C.blue,700);
      text(ctx,'× 16 bit',190,743,12,C.dark,700);
      text(ctx,'× 2 ch',300,743,12,C.dark,700);
      text(ctx,'× 240 s',395,743,12,C.dark,700);
      text(ctx,'=',488,743,12,C.gray,700);
      text(ctx,'338688000 bit',515,743,12,C.navy,700);
      text(ctx,'÷ 8',680,743,12,C.gray,700);
      text(ctx,'=',730,743,12,C.gray,700);
      text(ctx,'42336000 B',760,743,12,C.navy,700);
      text(ctx,'→ 42.336 MB',910,743,13,C.orange,700);
      text(ctx,'1KB=1000B / 1MB=1000KB',72,773,10,C.gray,400);
    }
  });

  K.register('b5-3',{
    title:'論理回路：ANSI記号・XOR・半加算回路を真理値表で読む',
    height:840,
    caption:'AND・OR・NOTのANSI系記号からXOR・NOR・NANDへ進み、半加算回路のC（Carry Out）とS（Sum）を真理値表と実回路の対応で確認する。',
    question:'半加算回路でA=1、B=1のとき、なぜC=1、S=0になりますか。',
    answer:'1+1=10₂なので、和の下位bit Sは0、上位桁への桁上がりC（Carry Out）は1になる。',
    draw(ctx,k){
      const {text,wrap,rr,box,line,head,table}=k;
      head(ctx,'演算の仕組みと論理回路','論理回路は記号の形だけでなく、入力→中間出力→最終出力を真理値表と対応させて読む。教材の回路記号はANSIの体系。');

      function pins(x,y,w,h){line(ctx,x-30,y+h/3,x,y+h/3,C.gray,1.5);line(ctx,x-30,y+2*h/3,x,y+2*h/3,C.gray,1.5);line(ctx,x+w,y+h/2,x+w+34,y+h/2,C.gray,1.5);}
      function andGate(x,y,w=95,h=62,bubble=false){pins(x,y,w,h);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w*.48,y);ctx.bezierCurveTo(x+w*.88,y,x+w*.88,y+h,x+w*.48,y+h);ctx.lineTo(x,y+h);ctx.closePath();ctx.strokeStyle=C.navy;ctx.lineWidth=2;ctx.stroke();if(bubble){ctx.beginPath();ctx.arc(x+w*.88+8,y+h/2,6,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.stroke();}}
      function orGate(x,y,w=95,h=62,xor=false,bubble=false){pins(x,y,w,h);ctx.beginPath();ctx.moveTo(x+8,y);ctx.bezierCurveTo(x+w*.45,y,x+w*.78,y+4,x+w,y+h/2);ctx.bezierCurveTo(x+w*.78,y+h-4,x+w*.45,y+h,x+8,y+h);ctx.bezierCurveTo(x+w*.28,y+h*.72,x+w*.28,y+h*.28,x+8,y);ctx.strokeStyle=C.navy;ctx.lineWidth=2;ctx.stroke();if(xor){ctx.beginPath();ctx.moveTo(x-2,y);ctx.bezierCurveTo(x+18,y+h*.28,x+18,y+h*.72,x-2,y+h);ctx.stroke();}if(bubble){ctx.beginPath();ctx.arc(x+w+7,y+h/2,6,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.stroke();}}
      function notGate(x,y,w=82,h=62){line(ctx,x-30,y+h/2,x,y+h/2,C.gray,1.5);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w*.72,y+h/2);ctx.lineTo(x,y+h);ctx.closePath();ctx.strokeStyle=C.navy;ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.arc(x+w*.72+7,y+h/2,6,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.stroke();line(ctx,x+w*.72+13,y+h/2,x+w+34,y+h/2,C.gray,1.5);}

      text(ctx,'A　基本回路と派生回路',45,120,15,C.navy,700);
      const gateY=160,gateXs=[100,330,560,790,1020];
      andGate(gateXs[0],gateY);orGate(gateXs[1],gateY);notGate(gateXs[2],gateY);orGate(gateXs[3],gateY,95,62,true);orGate(gateXs[4],gateY,95,62,false,true);
      text(ctx,'AND',gateXs[0]+45,250,11,C.blue,700,'center');text(ctx,'OR',gateXs[1]+45,250,11,C.blue,700,'center');text(ctx,'NOT',gateXs[2]+38,250,11,C.blue,700,'center');text(ctx,'XOR',gateXs[3]+45,250,11,C.orange,700,'center');text(ctx,'NOR',gateXs[4]+45,250,11,C.orange,700,'center');
      wrap(ctx,'両方1',gateXs[0]+8,267,85,17,9.5,C.gray,400);wrap(ctx,'一方以上1',gateXs[1]+5,267,90,17,9.5,C.gray,400);wrap(ctx,'反転',gateXs[2]+15,267,70,17,9.5,C.gray,400);wrap(ctx,'入力が異なる',gateXs[3]-2,267,105,17,9.5,C.gray,400);wrap(ctx,'NOT OR',gateXs[4]+10,267,85,17,9.5,C.gray,400);
      text(ctx,'NAND = NOT AND（出力側の○はNOT）',825,315,10.5,C.gray,700,'center');

      text(ctx,'B　半加算回路の真理値表',45,355,15,C.navy,700);
      table(ctx,45,390,400,225,['A','B','C','S'],[['0','0','0','0'],['0','1','0','1'],['1','0','0','1'],['1','1','1','0']],{fs:10,headFill:'#eff5f8',fill:r=>r===3?'#fff8f0':'#fff'});
      text(ctx,'C = Carry Out（桁上がり）',45,646,10.5,C.orange,700);
      text(ctx,'S = Sum（和の下位bit）',250,646,10.5,C.blue,700);

      text(ctx,'C　半加算回路：A・BをXORとANDへ分岐',520,355,15,C.navy,700);
      rr(ctx,520,390,630,300,'#f8fafb','#d6e1e6',12);
      text(ctx,'A',555,451,13,C.navy,700);text(ctx,'B',555,625,13,C.navy,700);
      line(ctx,580,446,700,446,C.gray,2);line(ctx,700,446,700,501,C.gray,2);line(ctx,700,501,705,501,C.gray,2);
      line(ctx,700,446,900,446,C.gray,2);line(ctx,900,446,900,523,C.gray,2);line(ctx,900,523,910,523,C.gray,2);
      line(ctx,580,620,680,620,C.gray,2);line(ctx,680,523,680,620,C.gray,2);line(ctx,680,523,705,523,C.gray,2);
      line(ctx,680,620,880,620,C.gray,2);line(ctx,880,547,880,620,C.gray,2);line(ctx,880,547,910,547,C.gray,2);
      orGate(735,478,105,68,true,false);andGate(940,500,105,70,false);
      text(ctx,'XOR',787,466,10,C.orange,700,'center');text(ctx,'AND',992,488,10,C.blue,700,'center');
      line(ctx,874,512,885,512,C.blue,2);text(ctx,'S',902,516,18,C.blue,700,'center');text(ctx,'Sum',925,516,10,C.gray,400,'left');
      line(ctx,1079,535,1085,535,C.orange,2);text(ctx,'C',1102,539,18,C.orange,700,'center');text(ctx,'Carry Out',1123,539,9.5,C.gray,400,'left',70,9);

      box(ctx,45,710,500,92,'1 + 1 = 10₂','A=1，B=1 → S=0 / C=1',{fill:'#fff8f0',stroke:'#e3d2bf'});
      box(ctx,610,710,540,92,'全加算回路','半加算回路を組み合わせ、下位桁からのCarry Inも入力して多桁加算へつなぐ。',{fill:'#eef6fa',stroke:'#bfd1db',bs:10.5});
    }
  });
})();