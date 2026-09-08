(() => {
  'use strict';

  const OFFLINE_CLASSES = new Set(['japanese','geography','commonPhysics','privatePhysics']);
  const KNOWN_CLASSES = ['politics','japanese','english','mathIA','mathIIBC','chemCurrent','biologySummer','geography','commonPhysics','privatePhysics'];

  function subjectClass(node) {
    return KNOWN_CLASSES.find(key => node.classList?.contains(key)) || '';
  }
  function desiredMode(node) {
    const key=subjectClass(node);
    if(!key)return'';
    return OFFLINE_CLASSES.has(key)?'offline':'online';
  }
  function applyNode(node) {
    const mode=desiredMode(node);
    if(!mode)return;
    if(node.dataset.mode!==mode)node.dataset.mode=mode;
    if(node.dataset.eventId==='jp-03'){
      node.classList.remove('tentative');
      if(node.dataset.status)node.dataset.status='normal';
    }
  }
  function applyAll(root=document) {
    root.querySelectorAll?.('.event[data-event-id],.month-event[data-event-id],.mobile-event[data-event-id]').forEach(applyNode);
  }
  function patchOverview() {
    document.querySelectorAll('#courseOverviewBody tr').forEach(row=>{
      const name=row.querySelector('.course-overview-name strong')?.textContent?.trim();
      if(name==='国语'){
        const meta=row.querySelector('.course-overview-name span');
        if(meta&&meta.textContent!=='10/9起周五 13:40–16:40')meta.textContent='10/9起周五 13:40–16:40';
      }
    });
  }
  function syncDialog(node) {
    const key=subjectClass(node);
    if(!key)return;
    const target=document.getElementById('dialogMode');
    if(target)target.textContent=OFFLINE_CLASSES.has(key)?'线下':'网课';
    if(node.dataset.eventId==='jp-03'){
      const status=document.getElementById('dialogStatus');
      if(status)status.textContent='正常';
    }
  }

  applyAll();
  patchOverview();

  document.addEventListener('click',event=>{
    const node=event.target.closest('[data-event-id]');
    if(!node)return;
    applyNode(node);
    setTimeout(()=>syncDialog(node),0);
  },true);

  const calendar=document.querySelector('.office-calendar');
  if(calendar&&'MutationObserver'in window){
    let queued=false;
    new MutationObserver(mutations=>{
      if(!mutations.some(m=>m.type==='childList'))return;
      if(queued)return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;applyAll(calendar);});
    }).observe(calendar,{childList:true,subtree:true});
  }
  const overview=document.getElementById('courseOverviewBody');
  if(overview&&'MutationObserver'in window){
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;patchOverview();});
    }).observe(overview,{childList:true,subtree:true});
  }
})();