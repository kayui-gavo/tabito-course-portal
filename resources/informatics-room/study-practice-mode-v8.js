/* questions.html?mode=open / auto / all をUIへ反映。未指定時は自動採点を初期表示。 */
(() => {
  const requested=new URLSearchParams(location.search).get('mode');
  const mode=['open','auto','all'].includes(requested)?requested:'auto';
  document.querySelector(`[data-mode="${mode}"]`)?.click();
})();