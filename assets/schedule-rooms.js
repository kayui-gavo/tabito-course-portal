(() => {
  'use strict';

  function installRoomResources() {
    if (document.querySelector('.room-resources')) return;
    const summary = document.querySelector('.ops-summary');
    if (!summary) return;

    const section = document.createElement('section');
    section.className = 'room-resources';
    section.setAttribute('aria-label', '教室条件');
    section.innerHTML = `
      <div class="room-resources-head">
        <strong>教室条件</strong>
        <span>线下课未指定教室时继续保留“待分配”</span>
      </div>
      <div class="room-resource-grid">
        <article class="room-resource common">
          <span class="room-resource-mark" aria-hidden="true">共通</span>
          <div class="room-resource-copy">
            <strong>共通教室</strong>
            <span>配有大屏幕，可用于线下授课，也适合需要线上线下同步的课程。</span>
            <em>大屏幕 · 支持同步授课</em>
          </div>
        </article>
        <article class="room-resource art">
          <span class="room-resource-mark" aria-hidden="true">美术</span>
          <div class="room-resource-copy">
            <strong>美术教室</strong>
            <span>以白板板书为主，不具备共通教室的大屏幕与线上线下同步条件。</span>
            <em>白板板书</em>
          </div>
        </article>
      </div>
      <p class="room-rule"><strong>分配时：</strong>需要大屏幕、投屏或线上线下同步的课优先使用共通教室；只需要白板板书的线下课可再根据时间安排选择教室。</p>`;

    summary.insertAdjacentElement('afterend', section);
  }

  function installRoomLegend() {
    const legend = document.querySelector('.office-legend');
    if (!legend || legend.querySelector('.common-room')) return;
    const pending = [...legend.querySelectorAll('.legend-item')].find(item => item.textContent.includes('教室待分配'));
    if (!pending) return;

    const common = document.createElement('span');
    common.className = 'legend-item';
    common.innerHTML = '<i class="room-dot common-room"></i>共通教室';

    const art = document.createElement('span');
    art.className = 'legend-item';
    art.innerHTML = '<i class="room-dot art-room"></i>美术教室';

    pending.before(common, art);
  }

  function refineCopy() {
    const lead = document.querySelector('.office-page-head .lead');
    if (lead) lead.textContent = '核对授课时间、授课老师和教室安排。线下课程未确定教室时标记为“待分配”，再根据授课设备需求安排共通教室或美术教室。';

    const roomFilter = document.getElementById('roomFilter');
    if (roomFilter) {
      const all = roomFilter.querySelector('option[value="all"]');
      if (all) all.textContent = '全部教室状态';
      const pending = roomFilter.querySelector('option[value="pending"]');
      if (pending) pending.textContent = '待分配（共通 / 美术）';
    }
  }

  function keepDialogRoomHint() {
    const dialog = document.getElementById('eventDialog');
    const room = document.getElementById('dialogRoom');
    if (!dialog || !room) return;
    requestAnimationFrame(() => {
      room.classList.toggle('dialog-room-pending', room.textContent.trim() === '待分配');
    });
  }

  installRoomResources();
  installRoomLegend();
  refineCopy();
  keepDialogRoomHint();

  const dialog = document.getElementById('eventDialog');
  if (dialog && 'MutationObserver' in window) {
    new MutationObserver(keepDialogRoomHint).observe(dialog, { attributes: true, attributeFilter: ['hidden'] });
  }
})();
