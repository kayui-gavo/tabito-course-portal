(() => {
  'use strict';
  const OFFLINE_CLASSES=new Set(['japanese','geography','commonPhysics','privatePhysics']);
  const KNOWN_CLASSES=['politics','japanese','english','mathIA','mathIIBC','chemCurrent','biologySummer','geography','commonPhysics','privatePhysics'];
  const subjectClass=node=>KNOWN_CLASSES.find(key=>node.classList?.contains(key))||'';
  const desiredMode=node=>{const key=subjectClass(node);return key?(OFFLINE_CLASSES.has(key)?'offline':'online'):'';};
  function applyNode(node){const mode=desiredMode(node);if(mode&&node.dataset.mode!==mode)node.dataset.mode=mode;}
  function applyAll(root=document){root.querySelectorAll?.('.event[data-event-id],.month-event[data-event-id],.mobile-event[data-event-id]').forEach(applyNode);}
  function syncDialog(node){const key=subjectClass(node);if(!key)return;const target=document.getElementById('dialogMode');if(target)target.textContent=OFFLINE_CLASSES.has(key)?'线下':'网课';}
  applyAll();
  document.addEventListener('click',event=>{const node=event.target.closest('[data-event-id]');if(!node)return;applyNode(node);setTimeout(()=>syncDialog(node),0);},true);
  const calendar=document.querySelector('.office-calendar');
  if(calendar&&'MutationObserver'in window){let queued=false;new MutationObserver(mutations=>{if(!mutations.some(m=>m.type==='childList')||queued)return;queued=true;requestAnimationFrame(()=>{queued=false;applyAll(calendar);});}).observe(calendar,{childList:true,subtree:true});}
})();