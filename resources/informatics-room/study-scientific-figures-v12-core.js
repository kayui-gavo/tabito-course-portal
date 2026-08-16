/* 情報Ⅰ v13 — 教材級 Canvas 図版共通基盤
   v12 API互換のまま、文字のはみ出し・箱内重なり・極端な縮小を防ぎ、Canvas内部の文字衝突も監査する。 */
(() => {
  const registry = window.SCIENTIFIC_FIGURES_V12 = window.SCIENTIFIC_FIGURES_V12 || {};
  const C={navy:'#213f54',blue:'#2f789e',teal:'#3b8c8c',orange:'#d88745',grid:'#d8e1e6',light:'#f4f8fa',gray:'#667986',dark:'#273b49',red:'#b65c55',green:'#4f8a64',cream:'#fbf7f2',white:'#fff'};
  const FONT='"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
  const DPR=()=>Math.min(2.5,Math.max(1,window.devicePixelRatio||1));
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const font=(ctx,size,weight=400)=>{ctx.font=`${weight} ${size}px ${FONT}`;};
  const qa=(ctx,type,data)=>{if(ctx.__textQa)ctx.__textQa[type].push(data);};
  const logicalWidth=ctx=>ctx.__logicalW||Math.round(ctx.canvas.width/Math.max(1,ctx.getTransform().a||1));
  const logicalHeight=ctx=>ctx.__logicalH||Math.round(ctx.canvas.height/Math.max(1,ctx.getTransform().d||1));

  function availableWidth(ctx,x,align='left',pad=8){const W=logicalWidth(ctx);if(align==='center')return Math.max(1,2*Math.min(Math.max(0,x-pad),Math.max(0,W-x-pad)));if(align==='right'||align==='end')return Math.max(1,x-pad);return Math.max(1,W-x-pad);}
  function fitSize(ctx,s,start,min,maxW,weight=400){let size=start;font(ctx,size,weight);while(size>min&&ctx.measureText(String(s)).width>maxW){size=Math.max(min,size-.5);font(ctx,size,weight);}return size;}
  function splitLines(ctx,s,maxW,size,weight=400){font(ctx,size,weight);const out=[],paras=String(s).split('\n');paras.forEach((para,pi)=>{if(para===''){out.push('');return;}let line='';for(const ch of para){const test=line+ch;if(line&&ctx.measureText(test).width>maxW){out.push(line);line=ch;}else line=test;}if(line)out.push(line);if(pi<paras.length-1&&para!==''&&out.at(-1)!=='')out.push('');});return out;}
  function ellipsize(ctx,s,maxW,size,weight=400){font(ctx,size,weight);let out=String(s);if(ctx.measureText(out).width<=maxW)return out;while(out.length>1&&ctx.measureText(out+'…').width>maxW)out=out.slice(0,-1);return out+'…';}

  function textRect(ctx,s,x,y,size,weight,align,base,scope='text'){
    font(ctx,size,weight);const width=ctx.measureText(String(s)).width,height=size*1.12;
    let left=x;if(align==='center')left=x-width/2;else if(align==='right'||align==='end')left=x-width;
    let top=y-size;if(base==='top'||base==='hanging')top=y;else if(base==='middle')top=y-height/2;else if(base==='bottom'||base==='ideographic')top=y-height;
    const rect={x:left,y:top,w:width,h:height,text:String(s).slice(0,90),size,scope};ctx.__textRects?.push(rect);
    const W=logicalWidth(ctx),H=logicalHeight(ctx);if(left<-1||top<-1||left+width>W+1||top+height>H+1)qa(ctx,'outsideCanvas',{...rect,canvas:[W,H]});
  }
  function analyzeTextRects(ctx){
    const R=ctx.__textRects||[],hits=[];
    for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){
      const a=R[i],b=R[j];
      if(a.scope===b.scope&&a.scope.startsWith('wrap-'))continue;
      const w=Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)),h=Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y));
      const minH=Math.min(a.h,b.h),minW=Math.min(a.w,b.w);
      if(w>Math.max(3,minW*.12)&&h>Math.max(2,minH*.26))hits.push({a:a.text,b:b.text,w:Math.round(w),h:Math.round(h),aSize:a.size,bSize:b.size});
      if(hits.length>=40)return hits;
    }
    return hits;
  }

  function text(ctx,s,x,y,size=14,color=C.dark,weight=400,align='left',base='alphabetic',maxWidth=null,minSize=8.5){
    const lines=String(s).split('\n'),cap=maxWidth||availableWidth(ctx,x,align,8);let drawSize=size;
    lines.forEach(line=>{if(line)drawSize=Math.min(drawSize,fitSize(ctx,line,size,minSize,cap,weight));});
    if(drawSize<size-2.5)qa(ctx,'shrunk',{text:String(s).slice(0,80),from:size,to:drawSize});
    const lh=Math.max(drawSize*1.35,drawSize+3);let startY=y;if(lines.length>1&&base==='middle')startY=y-(lines.length-1)*lh/2;
    ctx.fillStyle=color;font(ctx,drawSize,weight);ctx.textAlign=align;ctx.textBaseline=base;
    lines.forEach((line,i)=>{if(line){ctx.fillText(line,x,startY+i*lh);textRect(ctx,line,x,startY+i*lh,drawSize,weight,align,base,`text-${ctx.__textSeq++}`);}});return drawSize;
  }

  function wrap(ctx,s,x,y,w,lh=19,size=12,color=C.gray,weight=400,maxH=Infinity,minSize=8.5){
    let drawSize=size,lines=splitLines(ctx,s,w,drawSize,weight),lineHeight=Math.max(lh,drawSize*1.45);
    while(drawSize>minSize&&lines.length*lineHeight>maxH){drawSize=Math.max(minSize,drawSize-.5);lineHeight=Math.max(drawSize*1.45,drawSize+3);lines=splitLines(ctx,s,w,drawSize,weight);}
    const maxLines=Number.isFinite(maxH)?Math.max(1,Math.floor(maxH/lineHeight)):lines.length;let clipped=false;
    if(lines.length>maxLines){lines=lines.slice(0,maxLines);const last=lines.length-1;lines[last]=ellipsize(ctx,lines[last].replace(/…$/,''),w,drawSize,weight);clipped=true;}
    if(drawSize<size-2.5)qa(ctx,'shrunk',{text:String(s).slice(0,80),from:size,to:drawSize});if(clipped)qa(ctx,'truncated',{text:String(s).slice(0,120),width:w,height:maxH});
    ctx.fillStyle=color;font(ctx,drawSize,weight);ctx.textAlign='left';ctx.textBaseline='top';let yy=y;const scope=`wrap-${ctx.__textSeq++}`;
    lines.forEach(line=>{if(line){ctx.fillText(line,x,yy);textRect(ctx,line,x,yy,drawSize,weight,'left','top',scope);}yy+=lineHeight;});return yy;
  }

  function rr(ctx,x,y,w,h,fill=C.white,stroke=C.grid,r=10,lw=1.2){ctx.beginPath();if(typeof ctx.roundRect==='function')ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();}
  function box(ctx,x,y,w,h,h1,p='',opt={}){rr(ctx,x,y,w,h,opt.fill||C.white,opt.stroke||C.grid,opt.r||10,opt.lw||1.2);const pad=13,titleSize=fitSize(ctx,h1,opt.ts||14,opt.minTitleSize||9.5,w-pad*2,700);if(titleSize<(opt.ts||14)-2.5)qa(ctx,'shrunk',{text:String(h1).slice(0,80),from:opt.ts||14,to:titleSize,scope:'box-title'});text(ctx,h1,x+pad,y+22,titleSize,opt.tc||C.navy,700,'left','alphabetic',w-pad*2,opt.minTitleSize||9.5);if(p){const bodyTop=y+35,bodyBottom=y+h-9,bodyH=Math.max(18,bodyBottom-bodyTop);wrap(ctx,p,x+pad,bodyTop,w-pad*2,opt.lh||18,opt.bs||11,opt.bc||C.gray,400,bodyH,opt.minBodySize||8.8);}}
  function line(ctx,x1,y1,x2,y2,color=C.grid,lw=1,dash=[]){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore();}
  function arrow(ctx,x1,y1,x2,y2,color=C.blue,lw=2,dash=[]){ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=lw;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);const a=Math.atan2(y2-y1,x2-x1),s=8;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-s*Math.cos(a-.45),y2-s*Math.sin(a-.45));ctx.lineTo(x2-s*Math.cos(a+.45),y2-s*Math.sin(a+.45));ctx.closePath();ctx.fill();ctx.restore();}
  function head(ctx,h,p){const titleSize=fitSize(ctx,h,24,17,1130,700);text(ctx,h,34,42,titleSize,C.navy,700,'left','alphabetic',1130,17);wrap(ctx,p,34,58,1130,18,12,C.gray,400,42,10);}

  function cell(ctx,x,y,w,h,s,opt={}){
    ctx.fillStyle=opt.fill||C.white;ctx.fillRect(x,y,w,h);ctx.strokeStyle=opt.stroke||C.grid;ctx.lineWidth=1;ctx.strokeRect(x,y,w,h);
    const weight=opt.head?700:400,color=opt.head?C.navy:C.dark,start=opt.fs||10,min=opt.minFs||7.5,pad=8;let size=fitSize(ctx,s,start,min,w-pad*2,weight);
    if(ctx.measureText(String(s)).width<=w-pad*2){text(ctx,s,x+w/2,y+h/2,size,color,weight,'center','middle',w-pad*2,min);return;}
    const lines=splitLines(ctx,s,w-pad*2,min,weight).filter(v=>v!=='').slice(0,2),lh=Math.max(min*1.35,min+2),cy=y+h/2-(lines.length-1)*lh/2;if(lines.length>=2)qa(ctx,'wrappedCell',{text:String(s).slice(0,80),width:w,height:h});lines.forEach((lineText,i)=>text(ctx,lineText,x+w/2,cy+i*lh,min,color,weight,'center','middle',w-pad*2,min));
  }
  function table(ctx,x,y,w,h,headers,rows,opt={}){const nr=rows.length+1,nc=headers.length,cw=w/nc,rh=h/nr;headers.forEach((s,c)=>cell(ctx,x+c*cw,y,cw,rh,s,{head:true,fill:opt.headFill||'#eff5f8',fs:opt.fs||10}));rows.forEach((row,r)=>row.forEach((s,c)=>cell(ctx,x+c*cw,y+(r+1)*rh,cw,rh,s,{fill:typeof opt.fill==='function'?opt.fill(r,c):C.white,fs:opt.fs||10})));}
  function axis(ctx,x,y,w,h,xLabel='',yLabel=''){line(ctx,x,y+h,x+w,y+h,C.gray,1.2);line(ctx,x,y+h,x,y,C.gray,1.2);if(xLabel)text(ctx,xLabel,x+w,y+h+22,10,C.gray,400,'right');if(yLabel)text(ctx,yLabel,x-4,y,10,C.gray,400,'right');}
  function register(id,config){registry[id]=config;}
  function setup(canvas,w=1200,h=660){const dpr=DPR();canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.aspectRatio=`${w}/${h}`;const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.lineCap='round';ctx.lineJoin='round';ctx.__logicalW=w;ctx.__logicalH=h;ctx.__textSeq=0;ctx.__textRects=[];ctx.__textQa={shrunk:[],truncated:[],wrappedCell:[],outsideCanvas:[],textOverlaps:[]};return ctx;}
  function makeSection(id,config){const fig=document.createElement('figure');fig.className='scientific-figure-v12';fig.dataset.figureV12=id;fig.innerHTML=`<div class="scientific-figure-head-v12"><div><span>図で整理</span><h3>${esc(config.title)}</h3></div><button type="button" data-v12-expand>拡大して見る</button></div><canvas aria-label="${esc(config.title)}"></canvas><figcaption>${esc(config.caption||'')}</figcaption>${config.question?`<details class="scientific-question-v12"><summary>図を見て考える</summary><p>${esc(config.question)}</p><div class="scientific-question-answer-v12" hidden>${esc(config.answer||'')}</div><button type="button" data-v12-answer>考えた後に答えを見る</button></details>`:''}`;return fig;}
  function renderCanvas(canvas,config){const ctx=setup(canvas,config.width||1200,config.height||660);config.draw(ctx,{C,text,wrap,rr,box,line,arrow,head,cell,table,axis,w:config.width||1200,h:config.height||660});ctx.__textQa.textOverlaps=analyzeTextRects(ctx);canvas.__figureTextQa=ctx.__textQa;return ctx.__textQa;}
  function saveQa(fig,report){const id=fig.dataset.figureV12||fig.dataset.programFigureV12||fig.dataset.programFigureV12b||fig.dataset.programFigureV12c||fig.dataset.programFigureV12d||fig.dataset.programFigureV12e||fig.dataset.programFigureV12f||fig.dataset.programFigureV12g||'unknown';const all=window.INFORMATION_CANVAS_TEXT_AUDIT_V13=window.INFORMATION_CANVAS_TEXT_AUDIT_V13||{};all[id]=report;fig.dataset.textLayoutIssue=(report.truncated.length||report.outsideCanvas.length||report.textOverlaps.length||report.shrunk.some(x=>x.to<9))?'1':'0';}
  function bindSection(fig,config){const canvas=fig.querySelector('canvas');saveQa(fig,renderCanvas(canvas,config));fig.querySelector('[data-v12-answer]')?.addEventListener('click',e=>{const ans=fig.querySelector('.scientific-question-answer-v12');ans.hidden=!ans.hidden;e.currentTarget.textContent=ans.hidden?'考えた後に答えを見る':'答えを閉じる';});fig.querySelector('[data-v12-expand]')?.addEventListener('click',()=>{const dlg=document.createElement('dialog');dlg.className='scientific-dialog-v12';dlg.innerHTML='<div><button type="button" data-close>閉じる</button><canvas></canvas></div>';document.body.appendChild(dlg);renderCanvas(dlg.querySelector('canvas'),config);dlg.querySelector('[data-close]').addEventListener('click',()=>dlg.close());dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});dlg.addEventListener('close',()=>dlg.remove(),{once:true});dlg.showModal();});}
  window.SCIENTIFIC_V12={C,text,wrap,rr,box,line,arrow,head,cell,table,axis,register,registry,makeSection,bindSection,renderCanvas};
})();