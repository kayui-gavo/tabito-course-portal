// v17 production matrix: 5 hub pages + 95 lessons, desktop and mobile = 200 cases.
// Hub pages also carry semantic freshness guards so source-aligned overlays cannot silently drop out.
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173/resources/informatics-room/';
const mainIds=['b1-1','b1-2','b1-3','b1-4','b1-5','b1-6','b2-1','b2-2','b3-1','b3-2','b3-3','b3-4','b3-5','b3-6','b3-7','b3-8','b4-1','b4-2','b4-3','b4-4','b5-1','b5-2','b5-3','b5-4','b5-5','b6-1','b6-2','b6-3','b6-4','b6-5','b6-6','b6-7','b6-8','b7-1','b7-2','b7-3','b8-1','b8-2','b8-3','b8-4','b8-5','b8-6','b8-7','b9-1','b9-2','b9-3','b9-4'];
const programIds=Array.from({length:48},(_,i)=>`p${i+1}`);
const lessonIds=[...mainIds,...programIds];
const hubPages=['index.html','programming.html','questions.html','exam.html','glossary.html'];
const failures=[];
const MAX_FAILURE_SCREENSHOTS=24;
let screenshotCount=0;
let hubScreenshotCount=0;
await fs.mkdir('artifacts/informatics-layout',{recursive:true});

const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
async function checkPage(page,label,url,viewport){
  const jsErrors=[];const onError=e=>jsErrors.push(String(e?.message||e));page.on('pageerror',onError);
  try{
    await page.setViewportSize(viewport);await page.goto(url,{waitUntil:'domcontentloaded',timeout:15000});await page.evaluate(()=>document.fonts?.ready||Promise.resolve());await page.waitForTimeout(100);
    if((await page.evaluate(()=>typeof window.runInformationPageAuditV13))==='function')await page.evaluate(()=>window.runInformationPageAuditV13());
    if(url.includes('lesson.html')&&(await page.evaluate(()=>typeof window.runInformationLayoutAuditV13))==='function')await page.evaluate(()=>window.runInformationLayoutAuditV13());
    await page.waitForTimeout(35);
    const state=await page.evaluate(()=>{
      const id=new URLSearchParams(location.search).get('id')||'',width=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
      const pageName=location.pathname.split('/').pop()||'index.html';
      const master=window.SOURCE_MASTER_V7||{};
      const sourcePractice=window.SOURCE_PRACTICE_V7||{};
      const practiceHas=(id,title)=>(sourcePractice[id]||[]).some(x=>x?.title===title);
      const latestPractice=[
        ['b1-1','生活を情報技術で変える'],
        ['b1-3','著作権法に違反する行為を判定する'],
        ['b1-4','ゲームアプリのアクセス許可を考える'],
        ['b2-1','ソーシャルメディアで真偽不明情報が流れやすい理由'],
        ['b3-1','47都道府県に必要なビット数'],
        ['b3-4','CD4分間の非圧縮音声データ量'],
        ['b3-8','用途からデータ形式を選ぶ'],
        ['b5-1','自分の端末の仕様を調べる'],
        ['b6-1','採点処理をフローチャートで追う'],
        ['b7-1','対象の特性で分類する'],
        ['b8-1','ネットワーク構成図を完成する'],
        ['b9-4','回帰式から予測する']
      ].every(([lessonId,title])=>practiceHas(lessonId,title));
      const mainSourceCurrent=JSON.stringify(master['b3-8']||{}).includes('8.53MB')&&JSON.stringify(master['b3-8']||{}).includes('6.43MB')&&!JSON.stringify(master['b8-7']||{}).includes('主キー');
      const p45Row=[...document.querySelectorAll('#programmingCurriculum .curriculum-row')].find(row=>new URL(row.getAttribute('href')||'',location.href).searchParams.get('id')==='p45');
      const glossaryTerms=[...document.querySelectorAll('#glossaryList .tool-glossary-term strong')].map(x=>x.textContent.trim());
      let hubSemantic=null;
      if(pageName==='index.html'){
        const details={overlay:window.INDEX_SOURCE_V9===true,rows:document.querySelectorAll('#mainCurriculum .curriculum-row').length,mainSourceCurrent};
        hubSemantic={name:'main-index-source',details,ok:details.overlay&&details.rows===47&&details.mainSourceCurrent};
      }
      if(pageName==='programming.html'){
        const details={overlay:window.PROGRAMMING_INDEX_SOURCE_V17===true,rows:document.querySelectorAll('#programmingCurriculum .curriculum-row').length,p45ToFollow:String(p45Row?.dataset.search||'').includes('ToFollow'),p45FromFollow:String(p45Row?.dataset.search||'').includes('FromFollow')};
        hubSemantic={name:'programming-index-source',details,ok:details.overlay&&details.rows===48&&details.p45ToFollow&&details.p45FromFollow};
      }
      if(pageName==='glossary.html'){
        const curation=window.GLOSSARY_CURATION_V12||{};const counts=curation.counts||{};
        const visibleRows=[...document.querySelectorAll('#glossaryList .tool-glossary-row')].filter(x=>!x.hidden).length;
        const details={renderer:window.GLOSSARY_SOURCE_RENDER_V11===true,rows:document.querySelectorAll('#glossaryList .tool-glossary-row[data-source-master]').length,hasSampling:glossaryTerms.includes('標本化'),hasPrimaryKey:glossaryTerms.includes('主キー'),mainSourceCurrent,curation:!!window.GLOSSARY_CURATION_V12,recall:window.GLOSSARY_RECALL_V12===true,mode:curation.mode||'',counts,visibleRows,bmpHidden:[...document.querySelectorAll('#glossaryList .tool-glossary-row')].some(row=>row.querySelector('.tool-glossary-term strong')?.textContent.trim()==='.bmp'&&row.hidden)};
        hubSemantic={name:'glossary-source',details,ok:details.renderer&&details.rows>600&&details.hasSampling&&!details.hasPrimaryKey&&details.mainSourceCurrent&&details.curation&&details.recall&&details.mode==='core'&&counts.core>100&&counts.support>0&&counts.total===details.rows&&visibleRows===counts.core&&details.bmpHidden};
      }
      if(pageName==='questions.html'||pageName==='exam.html'){
        const details={latestPractice,ch12:window.SOURCE_PRACTICE_CH1_2_FIDELITY_V14===true,ch3:window.SOURCE_PRACTICE_CH3_FIDELITY_V15===true};
        hubSemantic={name:'practice-source',details,ok:details.latestPractice&&details.ch12&&details.ch3};
      }
      return {id,overflow:Math.max(0,Math.round(width-innerWidth)),canvas:(window.INFORMATION_CANVAS_TEXT_AUDIT_V13||{})[id]||null,layout:window.INFORMATION_LAYOUT_AUDIT_V13||null,pageAudit:window.INFORMATION_PAGE_AUDIT_V13||null,figures:document.querySelectorAll('.scientific-figure-v12').length,oldFigures:document.querySelectorAll('.scientific-figure-v11').length,duplicateNav:document.querySelectorAll('.lesson-nav-v13').length,visibleOldProgress:[...document.querySelectorAll('.lesson-reading-progress')].filter(n=>getComputedStyle(n).display!=='none').length,ch12PracticeFidelity:window.SOURCE_PRACTICE_CH1_2_FIDELITY_V14===true,ch3PracticeFidelity:window.SOURCE_PRACTICE_CH3_FIDELITY_V15===true,hubSemantic};
    });
    const isHub=!url.includes('lesson.html');
    if(isHub){const slug=label.replace(/[^a-zA-Z0-9_-]+/g,'-');await page.screenshot({path:`artifacts/informatics-layout/hub-${slug}.png`,fullPage:false});hubScreenshotCount++;}
    const problems=[];
    if(state.overflow>4)problems.push(`global horizontal overflow ${state.overflow}px`);if(jsErrors.length)problems.push(`pageerror: ${jsErrors.join(' | ')}`);if(state.oldFigures)problems.push(`legacy v11 figure still rendered: ${state.oldFigures}`);
    if(url.includes('lesson.html')){
      if(/^b[12]-/.test(state.id)&&!state.ch12PracticeFidelity)problems.push('chapter 1-2 source-practice fidelity overlay missing');
      if(/^b3-/.test(state.id)&&!state.ch3PracticeFidelity)problems.push('chapter 3 source-practice fidelity overlay missing');
      if(state.figures!==1)problems.push(`scientific figure count ${state.figures}, expected 1`);if(state.duplicateNav!==1)problems.push(`lesson nav count ${state.duplicateNav}, expected 1`);if(state.visibleOldProgress)problems.push('old reading progress bar is visible');
      if(state.canvas?.truncated?.length)problems.push(`Canvas text truncated: ${state.canvas.truncated.length}`);if(state.canvas?.outsideCanvas?.length)problems.push(`Canvas text outside drawing area: ${state.canvas.outsideCanvas.length}`);if(state.canvas?.textOverlaps?.length)problems.push(`Canvas internal text overlaps: ${state.canvas.textOverlaps.length}`);if(state.canvas?.shrunk?.some(x=>Number(x.to)<8.8))problems.push('Canvas text shrunk below 8.8px');
      if(state.layout?.overlappingTextPairs?.length)problems.push(`DOM text overlaps: ${state.layout.overlappingTextPairs.length}`);if(state.layout?.clippedTextNodes?.length)problems.push(`DOM text clipped: ${state.layout.clippedTextNodes.length}`);if(state.layout?.duplicateIds?.length)problems.push(`duplicate ids: ${state.layout.duplicateIds.join(',')}`);
      if(state.pageAudit?.overlappingPairs?.length)problems.push(`page text overlaps: ${state.pageAudit.overlappingPairs.length}`);if(state.pageAudit?.clippedTextNodes?.length)problems.push(`page text clipped: ${state.pageAudit.clippedTextNodes.length}`);if(state.pageAudit?.duplicateIds?.length)problems.push(`page duplicate ids: ${state.pageAudit.duplicateIds.join(',')}`);
    }else{
      if(state.hubSemantic&&!state.hubSemantic.ok)problems.push(`hub semantic freshness failed: ${state.hubSemantic.name}`);
      if(state.pageAudit?.overlappingPairs?.length)problems.push(`page text overlaps: ${state.pageAudit.overlappingPairs.length}`);if(state.pageAudit?.clippedTextNodes?.length)problems.push(`page text clipped: ${state.pageAudit.clippedTextNodes.length}`);if(state.pageAudit?.duplicateIds?.length)problems.push(`duplicate ids: ${state.pageAudit.duplicateIds.join(',')}`);
    }
    if(problems.length){if(screenshotCount<MAX_FAILURE_SCREENSHOTS){const slug=label.replace(/[^a-zA-Z0-9_-]+/g,'-');await page.screenshot({path:`artifacts/informatics-layout/failure-${slug}.png`,fullPage:true});screenshotCount++;}failures.push({label,url,viewport,problems,state});console.error(`FAIL ${label}: ${problems.join('; ')}`);}else console.log(`PASS ${label}`);
  }catch(error){failures.push({label,url,viewport,problems:[String(error?.stack||error)]});console.error(`ERROR ${label}:`,error);}finally{page.off('pageerror',onError);}
}

const page=await browser.newPage();
for(const name of hubPages)await checkPage(page,`desktop-${name}`,base+name,{width:1440,height:1000});
for(const id of lessonIds)await checkPage(page,`desktop-${id}`,`${base}lesson.html?id=${id}`,{width:1440,height:1000});
for(const name of hubPages)await checkPage(page,`mobile-${name}`,base+name,{width:390,height:844});
for(const id of lessonIds)await checkPage(page,`mobile-${id}`,`${base}lesson.html?id=${id}`,{width:390,height:844});
await browser.close();
await fs.writeFile('artifacts/informatics-layout/report.json',JSON.stringify({checked:{hubDesktop:hubPages.length,lessonDesktop:lessonIds.length,hubMobile:hubPages.length,lessonMobile:lessonIds.length,total:hubPages.length*2+lessonIds.length*2},failures,failureScreenshotsCaptured:screenshotCount,hubScreenshotsCaptured:hubScreenshotCount},null,2));
if(failures.length){console.error(`\n${failures.length} layout QA case(s) failed; ${screenshotCount} failure screenshot(s), ${hubScreenshotCount} hub screenshot(s) captured.`);process.exit(1);}else console.log(`\nAll ${hubPages.length*2+lessonIds.length*2} Informatics layout QA cases passed; ${hubScreenshotCount} hub screenshot(s) captured.`);
