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
      return {id,overflow:Math.max(0,Math.round(width-innerWidth)),canvas:(window.INFORMATION_CANVAS_TEXT_AUDIT_V13||{})[id]||null,layout:window.INFORMATION_LAYOUT_AUDIT_V13||null,pageAudit:window.INFORMATION_PAGE_AUDIT_V13||null,figures:document.querySelectorAll('.scientific-figure-v12').length,oldFigures:document.querySelectorAll('.scientific-figure-v11').length,duplicateNav:document.querySelectorAll('.lesson-nav-v13').length,visibleOldProgress:[...document.querySelectorAll('.lesson-reading-progress')].filter(n=>getComputedStyle(n).display!=='none').length};
    });
    const problems=[];
    if(state.overflow>4)problems.push(`global horizontal overflow ${state.overflow}px`);if(jsErrors.length)problems.push(`pageerror: ${jsErrors.join(' | ')}`);if(state.oldFigures)problems.push(`legacy v11 figure still rendered: ${state.oldFigures}`);
    if(url.includes('lesson.html')){
      if(state.figures!==1)problems.push(`scientific figure count ${state.figures}, expected 1`);if(state.duplicateNav!==1)problems.push(`lesson nav count ${state.duplicateNav}, expected 1`);if(state.visibleOldProgress)problems.push('old reading progress bar is visible');
      if(state.canvas?.truncated?.length)problems.push(`Canvas text truncated: ${state.canvas.truncated.length}`);if(state.canvas?.outsideCanvas?.length)problems.push(`Canvas text outside drawing area: ${state.canvas.outsideCanvas.length}`);if(state.canvas?.textOverlaps?.length)problems.push(`Canvas internal text overlaps: ${state.canvas.textOverlaps.length}`);if(state.canvas?.shrunk?.some(x=>Number(x.to)<8.8))problems.push('Canvas text shrunk below 8.8px');
      if(state.layout?.overlappingTextPairs?.length)problems.push(`DOM text overlaps: ${state.layout.overlappingTextPairs.length}`);if(state.layout?.clippedTextNodes?.length)problems.push(`DOM text clipped: ${state.layout.clippedTextNodes.length}`);if(state.layout?.duplicateIds?.length)problems.push(`duplicate ids: ${state.layout.duplicateIds.join(',')}`);
      if(state.pageAudit?.overlappingPairs?.length)problems.push(`page text overlaps: ${state.pageAudit.overlappingPairs.length}`);if(state.pageAudit?.clippedTextNodes?.length)problems.push(`page text clipped: ${state.pageAudit.clippedTextNodes.length}`);if(state.pageAudit?.duplicateIds?.length)problems.push(`page duplicate ids: ${state.pageAudit.duplicateIds.join(',')}`);
    }else{
      if(state.pageAudit?.overlappingPairs?.length)problems.push(`page text overlaps: ${state.pageAudit.overlappingPairs.length}`);if(state.pageAudit?.clippedTextNodes?.length)problems.push(`page text clipped: ${state.pageAudit.clippedTextNodes.length}`);if(state.pageAudit?.duplicateIds?.length)problems.push(`duplicate ids: ${state.pageAudit.duplicateIds.join(',')}`);
    }
    if(problems.length){if(screenshotCount<MAX_FAILURE_SCREENSHOTS){const slug=label.replace(/[^a-zA-Z0-9_-]+/g,'-');await page.screenshot({path:`artifacts/informatics-layout/${slug}.png`,fullPage:true});screenshotCount++;}failures.push({label,url,viewport,problems,state});console.error(`FAIL ${label}: ${problems.join('; ')}`);}else console.log(`PASS ${label}`);
  }catch(error){failures.push({label,url,viewport,problems:[String(error?.stack||error)]});console.error(`ERROR ${label}:`,error);}finally{page.off('pageerror',onError);}
}

const page=await browser.newPage();
for(const name of hubPages)await checkPage(page,`desktop-${name}`,base+name,{width:1440,height:1000});
for(const id of lessonIds)await checkPage(page,`desktop-${id}`,`${base}lesson.html?id=${id}`,{width:1440,height:1000});
for(const name of hubPages)await checkPage(page,`mobile-${name}`,base+name,{width:390,height:844});
for(const id of lessonIds)await checkPage(page,`mobile-${id}`,`${base}lesson.html?id=${id}`,{width:390,height:844});
await browser.close();
await fs.writeFile('artifacts/informatics-layout/report.json',JSON.stringify({checked:{hubDesktop:hubPages.length,lessonDesktop:lessonIds.length,hubMobile:hubPages.length,lessonMobile:lessonIds.length,total:hubPages.length*2+lessonIds.length*2},failures,screenshotsCaptured:screenshotCount},null,2));
if(failures.length){console.error(`\n${failures.length} layout QA case(s) failed; ${screenshotCount} screenshot(s) captured.`);process.exit(1);}else console.log(`\nAll ${hubPages.length*2+lessonIds.length*2} Informatics layout QA cases passed.`);
