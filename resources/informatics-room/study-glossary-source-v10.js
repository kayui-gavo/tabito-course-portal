/* 情報Ⅰ v10 — 用語一覧の説明を最新SOURCE_MASTERへ再接続 */
(() => {
  const rows=[...document.querySelectorAll('#glossaryList .tool-glossary-row')];
  if(!rows.length)return;
  const master=window.SOURCE_MASTER_V7||{};
  const norm=s=>String(s||'').replace(/[（）()・\s]/g,'').toLowerCase();

  rows.forEach(row=>{
    const term=row.querySelector('.tool-glossary-term strong')?.textContent.trim()||'';
    const href=row.querySelector('a')?.getAttribute('href')||'';
    const id=new URL(href,location.href).searchParams.get('id')||'';
    const source=master[id];
    if(!term||!source)return;
    const target=norm(term);
    const sections=source.sections||[];
    const exact=sections.find(([title])=>norm(title)===target);
    const titleHit=sections.find(([title])=>norm(title).includes(target)||target.includes(norm(title)));
    const bodyHit=sections.find(([,body])=>norm(body).includes(target));
    const hit=exact||titleHit||bodyHit;
    if(!hit)return;
    const p=row.querySelector('p');
    if(p)p.textContent=hit[1];
    row.dataset.sourceMaster=id;
  });

  window.GLOSSARY_SOURCE_V10=true;
})();
