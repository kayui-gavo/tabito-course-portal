/* questions.html?mode=open / auto / all をUIへ反映 */
(() => {
  const mode=new URLSearchParams(location.search).get('mode');
  if(!['open','auto','all'].includes(mode))return;
  document.querySelector(`[data-mode="${mode}"]`)?.click();
})();