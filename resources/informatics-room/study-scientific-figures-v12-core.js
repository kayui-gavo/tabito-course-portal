/* 情報Ⅰ v12 — 教材級 Canvas 図版共通基盤 */
(() => {
  const registry = window.SCIENTIFIC_FIGURES_V12 = window.SCIENTIFIC_FIGURES_V12 || {};
  const C={navy:'#213f54',blue:'#2f789e',teal:'#3b8c8c',orange:'#d88745',grid:'#d8e1e6',light:'#f4f8fa',gray:'#667986',dark:'#273b49',red:'#b65c55',green:'#4f8a64',cream:'#fbf7f2',white:'#fff'};
  const FONT='"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
  const DPR=()=>Math.min(2.5,Math.max(1,window.devicePixelRatio||1));
  function text(ctx,s,x,y,size=14,color=C.dark,weight=400,align='left',base='alphabetic'){
    ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${FONT}`;ctx.textAlign=align;ctx.textBaseline=base;ctx.fillText(String(s),x,y);
  }
  function wrap(ctx,s,x,y,w,lh=19,size=12,color=C.gray,weight=400){
    ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${FONT}`;ctx.textAlign='left';ctx.textBaseline='top';let yy=y;
    const paragraphs=String(s).split('\n');
    paragraphs.forEach((para,pi)=>{
      if(!para){yy+=lh;return;}
      let line='';
      for(const ch of para){const test=line+ch;if(ctx.measureText(test).width>w&&line){ctx.fillText(line,x,yy);line=ch;yy+=lh;}else line=test;}
      if(line){ctx.fillText(line,x,yy);yy+=lh;}
      if(pi<paragraphs.length-1&&para)yy+=1;
    });
    return yy;
  }
  function rr(ctx,x,y,w,h,fill=C.white,stroke=C.grid,r=10,lw=1.2){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();}
  function box(ctx,x,y,w,h,h1,p='',opt={}){rr(ctx,x,y,w,h,opt.fill||C.white,opt.stroke||C.grid,opt.r||10,opt.lw||1.2);text(ctx,h1,x+13,y+22,opt.ts||14,opt.tc||C.navy,700);if(p)wrap(ctx,p,x+13,y+35,w-26,opt.lh||18,opt.bs||11,opt.bc||C.gray,400);}
  function line(ctx,x1,y1,x2,y2,color=C.grid,lw=1,dash=[]){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore();}
  function arrow(ctx,x1,y1,x2,y2,color=C.blue,lw=2,dash=[]){ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);const a=Math.atan2(y2-y1,x2-x1),s=8;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-s*Math.cos(a-.45),y2-s*Math.sin(a-.45));ctx.lineTo(x2-s*Math.cos(a+.45),y2-s*Math.sin(a+.45));ctx.closePath();ctx.fill();ctx.restore();}
  function head(ctx,h,p){text(ctx,h,34,42,24,C.navy,700);wrap(ctx,p,34,58,1130,18,12,C.gray,400);}
  function cell(ctx,x,y,w,h,s,opt={}){ctx.fillStyle=opt.fill||C.white;ctx.fillRect(x,y,w,h);ctx.strokeStyle=opt.stroke||C.grid;ctx.lineWidth=1;ctx.strokeRect(x,y,w,h);text(ctx,s,x+w/2,y+h/2,opt.fs||10,opt.head?C.navy:C.dark,opt.head?700:400,'center','middle');}
  function table(ctx,x,y,w,h,headers,rows,opt={}){const nr=rows.length+1,nc=headers.length,cw=w/nc,rh=h/nr;headers.forEach((s,c)=>cell(ctx,x+c*cw,y,cw,rh,s,{head:true,fill:opt.headFill||'#eff5f8',fs:opt.fs||10}));rows.forEach((row,r)=>row.forEach((s,c)=>cell(ctx,x+c*cw,y+(r+1)*rh,cw,rh,s,{fill:typeof opt.fill==='function'?opt.fill(r,c):C.white,fs:opt.fs||10})));}
  function axis(ctx,x,y,w,h,xLabel='',yLabel=''){line(ctx,x,y+h,x+w,y+h,C.gray,1.2);line(ctx,x,y+h,x,y,C.gray,1.2);if(xLabel)text(ctx,xLabel,x+w,y+h+22,10,C.gray,400,'right');if(yLabel)text(ctx,yLabel,x-4,y,10,C.gray,400,'right');}
  function register(id,config){registry[id]=config;}
  function setup(canvas,w=1200,h=660){const dpr=DPR();canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.aspectRatio=`${w}/${h}`;const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.lineCap='round';ctx.lineJoin='round';return ctx;}
  function makeSection(id,config){
    const fig=document.createElement('figure');fig.className='scientific-figure-v12';fig.dataset.figureV12=id;
    fig.innerHTML=`<div class="scientific-figure-head-v12"><div><span>TEXTBOOK FIGURE / v12</span><h3>${config.title}</h3></div><button type="button" data-v12-expand>拡大して見る</button></div><canvas aria-label="${config.title}"></canvas><figcaption>${config.caption||''}</figcaption>${config.question?`<details class="scientific-question-v12"><summary>図を見て考える</summary><p>${config.question}</p><div class="scientific-question-answer-v12" hidden>${config.answer||''}</div><button type="button" data-v12-answer>考えた後に答えを見る</button></details>`:''}`;
    return fig;
  }
  function renderCanvas(canvas,config){const ctx=setup(canvas,config.width||1200,config.height||660);config.draw(ctx,{C,text,wrap,rr,box,line,arrow,head,cell,table,axis,w:config.width||1200,h:config.height||660});}
  function bindSection(fig,config){
    const canvas=fig.querySelector('canvas');renderCanvas(canvas,config);
    fig.querySelector('[data-v12-answer]')?.addEventListener('click',e=>{const ans=fig.querySelector('.scientific-question-answer-v12');ans.hidden=!ans.hidden;e.currentTarget.textContent=ans.hidden?'考えた後に答えを見る':'答えを閉じる';});
    fig.querySelector('[data-v12-expand]')?.addEventListener('click',()=>{const dlg=document.createElement('dialog');dlg.className='scientific-dialog-v12';dlg.innerHTML='<div><button type="button" data-close>閉じる</button><canvas></canvas></div>';document.body.appendChild(dlg);renderCanvas(dlg.querySelector('canvas'),config);dlg.querySelector('[data-close]').addEventListener('click',()=>dlg.close());dlg.addEventListener('close',()=>dlg.remove(),{once:true});dlg.showModal();});
  }
  window.SCIENTIFIC_V12={C,text,wrap,rr,box,line,arrow,head,cell,table,axis,register,registry,makeSection,bindSection,renderCanvas};
})();