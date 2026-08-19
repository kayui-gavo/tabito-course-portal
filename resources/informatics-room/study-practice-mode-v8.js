/* questions.html?mode=open / auto / all をUIへ反映。未指定時は自動採点を初期表示。 */
(() => {
  const lead=document.querySelector('.index-intro .index-lead');
  if(lead)lead.textContent='自動採点の確認・仕上げ問題に加え、原教材の実践問題を設問・条件・数値に沿ってWeb上で解き直せます。教材で解答が省略されている課題は一つの模範解答へ固定せず、自分の作業や説明を本文の観点と照合して自己評価します。';
  const requested=new URLSearchParams(location.search).get('mode');
  const mode=['open','auto','all'].includes(requested)?requested:'auto';
  document.querySelector(`[data-mode="${mode}"]`)?.click();
  window.PRACTICE_SOURCE_COPY_V22=true;
})();