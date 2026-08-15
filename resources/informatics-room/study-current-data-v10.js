/* 情報Ⅰ v10 — 教材本文とは別に、2026年現在の制度名を検索・用語一覧へ追加 */
(() => {
  const lesson=(window.STUDY_MAIN||[]).find(x=>x.id==='b2-2');
  if(!lesson)return;
  lesson.terms=[...new Set([...(lesson.terms||[]),'情報流通プラットフォーム対処法'])];
  if(!(lesson.points||[]).some(p=>p.title==='2026年現在の法律名')){
    lesson.points=[...(lesson.points||[]),{title:'2026年現在の法律名',body:'原教材にある「プロバイダ責任制限法」は、現在「情報流通プラットフォーム対処法」と呼ばれる。教材の旧称と現名称を対応させて確認する。'}];
  }
})();