/* 情報Ⅰ v10 — 原教材の実践条件をインタラクティブへ反映 */
(() => {
  const baseRender=window.renderStudyLesson;
  const current=()=>{const id=new URLSearchParams(location.search).get('id')||'';return {id,lesson:typeof studyLessonById==='function'?studyLessonById(id):null};};
  const fmt=v=>Number(v).toLocaleString('ja-JP',{maximumFractionDigits:3});
  function upgradeAudio(){
    const root=document.querySelector('[data-micro-lab-v9]');if(!root||root.dataset.audioSourceV10)return;root.dataset.audioSourceV10='1';
    const metrics=root.querySelector('.lab-metrics-v9');const mib=root.querySelector('[data-audio-mib]');if(!metrics||!mib)return;
    const mb=document.createElement('div');mb.innerHTML='<span>MB（1MB=1000KB）</span><strong data-audio-mb></strong>';mib.parentElement.insertAdjacentElement('beforebegin',mb);
    mib.previousElementSibling?.querySelector('span');
    const title=root.querySelector('h3');if(title)title.textContent='音声データ量を MB / MiB まで区別して計算する';
    const preset=document.createElement('div');preset.className='source-preset-v10';preset.innerHTML='<button type="button" data-cd-preset>教材のCD例：44,100Hz / 16bit / stereo / 4分</button><p>教材の実践問題は 1KB=1000B、1MB=1000KB と条件を指定しています。問題文に定義がある場合は必ずその定義を使います。</p>';
    metrics.insertAdjacentElement('afterend',preset);
    const update=()=>{const rate=+root.querySelector('[data-audio-rate]')?.value||0,bit=+root.querySelector('[data-audio-bit]')?.value||0,ch=+root.querySelector('[data-audio-ch]')?.value||0,sec=+root.querySelector('[data-audio-sec]')?.value||0;const bytes=rate*bit*ch*sec/8;root.querySelector('[data-audio-mb]').textContent=fmt(bytes/1000/1000);};
    root.querySelectorAll('[data-audio-rate],[data-audio-bit],[data-audio-ch],[data-audio-sec]').forEach(e=>e.addEventListener('input',update));
    root.querySelector('[data-cd-preset]').addEventListener('click',()=>{root.querySelector('[data-audio-rate]').value=44100;root.querySelector('[data-audio-bit]').value=16;root.querySelector('[data-audio-ch]').value=2;root.querySelector('[data-audio-sec]').value=240;root.querySelector('[data-audio-sec]').dispatchEvent(new Event('input',{bubbles:true}));update();});
    update();
  }
  function wirelessHTML(){return `<section class="source-wireless-v10"><header><div><span>TEXTBOOK INTERACTIVE</span><h3>無線グループ番号で「届く相手」を確かめる</h3></div><p>教材のmicro:bit例では、同じ無線グループ番号の端末どうしで通信します。グループ番号は0〜255です。</p></header><div class="source-wireless-body-v10"><label><span>受信機のグループ</span><input type="number" min="0" max="255" value="192" data-receiver-group></label><div class="source-wireless-senders-v10">${[1,2,3].map((x,i)=>`<article><b>テーブル${x}送信機</b><label>group <input type="number" min="0" max="255" value="${i===1?100:192}" data-sender-group="${x}"></label><button type="button" data-send-table="${x}">Aボタンを押す</button><span data-send-result="${x}"></span></article>`).join('')}</div><aside><b>双方向通信</b><p>受信機がテーブル番号を受け取った後、テーブル側へ「PLEASE WAIT」のような応答を返すことで、送信だけでなく双方向の通信になる。</p></aside></div></section>`;}
  function bindWireless(){const root=document.querySelector('.source-wireless-v10');if(!root)return;const receiver=root.querySelector('[data-receiver-group]');const clamp=e=>{e.value=Math.max(0,Math.min(255,Math.trunc(+e.value||0)));};[receiver,...root.querySelectorAll('[data-sender-group]')].forEach(e=>e.addEventListener('change',()=>clamp(e)));root.querySelectorAll('[data-send-table]').forEach(btn=>btn.addEventListener('click',()=>{const n=btn.dataset.sendTable,sender=root.querySelector(`[data-sender-group="${n}"]`),out=root.querySelector(`[data-send-result="${n}"]`);clamp(sender);clamp(receiver);out.textContent=sender.value===receiver.value?`受信成功：受信機に「${n}」を表示 → 応答を返せる`:`受信されない：送信group ${sender.value} / 受信group ${receiver.value}`;out.className=sender.value===receiver.value?'is-ok':'is-miss';}));}
  window.renderStudyLesson=function renderSourceInteractiveV10(){baseRender();const {id,lesson}=current();if(!lesson||lesson.track!=='main')return;if(id==='b3-4')upgradeAudio();if(id==='b6-3'&&!document.querySelector('.source-wireless-v10')){const target=document.querySelector('.et-figure-v4')||document.querySelector('#points');target?.insertAdjacentHTML('afterend',wirelessHTML());bindWireless();}};
})();