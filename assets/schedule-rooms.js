(() => {
  'use strict';

  const BASE_GRID_HEIGHT = 700;

  function installRoomResources() {
    if (document.querySelector('.room-resources')) return;
    const calendar = document.querySelector('.office-calendar');
    if (!calendar) return;

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

    /* 教室条件是排课参考，不应占用首屏日历空间。 */
    calendar.insertAdjacentElement('afterend', section);
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

  function installViewportFitStyles() {
    if (document.getElementById('scheduleViewportFit')) return;
    const style = document.createElement('style');
    style.id = 'scheduleViewportFit';
    style.textContent = `
      @media (min-width: 761px) {
        .site-header .nav { min-height: 48px; }
        .brand-logo { width: 29px; height: 29px; }
        .brand-copy strong { font-size: 14px; }
        .brand-copy span { font-size: 10px; }
        .nav-links a { padding: 6px 9px; font-size: 12px; }

        .page-shell { padding-top: 10px; }
        .office-page-head { min-height: 34px; margin-bottom: 7px; align-items: center; }
        .office-page-head > div:first-child { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
        .office-page-head .eyebrow { flex: 0 0 auto; font-size: 9px; letter-spacing: .06em; }
        .office-page-head h1 { flex: 0 0 auto; margin: 0; font-size: 23px; line-height: 1.2; }
        .office-page-head .lead { display: none; }
        .office-page-head .head-meta { display: flex; align-items: center; gap: 12px; font-size: 9px; }

        .office-toolbar { top: 54px; padding: 6px 8px; border-radius: 8px; }
        .toolbar-primary { grid-template-columns: auto minmax(240px, 1fr) auto; gap: 10px; }
        .text-btn, .primary-btn { min-height: 30px; padding: 4px 9px; font-size: 11px; }
        .segment { padding: 2px; }
        .segment-btn { min-height: 27px; padding: 3px 8px; font-size: 11px; }
        .week-title-wrap strong { font-size: 14px; }
        .week-title-wrap span { font-size: 9px; line-height: 1.2; }
        .toolbar-filters { margin-top: 5px; padding-top: 5px; gap: 6px; }
        .filter-field { min-height: 29px; padding: 0 7px; }
        .filter-field > span { font-size: 9px; }
        .filter-field select { font-size: 11px; }
        .reset-btn { min-height: 29px; padding: 0 10px; font-size: 10px; }

        .ops-summary { margin-top: 7px; border-radius: 8px; }
        .ops-summary-item { padding: 5px 12px 5px; }
        .ops-summary-item > span { font-size: 8.5px; }
        .ops-summary-item > strong { display: inline-block; margin-top: 0; font-size: 17px; line-height: 1.15; }
        .ops-summary-item > small { display: inline; margin-left: 6px; font-size: 8.5px; }

        .office-legend { min-height: 18px; margin: 5px 2px 6px; gap: 9px; font-size: 9px; line-height: 1.2; }
        .office-legend .legend-label, .office-legend .legend-item { font-size: 9px; }
        .office-legend .subject-legend i,
        .office-legend .legend-swatch,
        .office-legend .room-dot { width: 7px; height: 7px; }

        .calendar-head .day-head,
        .calendar-head .corner { min-height: 42px; }
        .day-head { padding: 4px 3px; }
        .day-head .weekday { font-size: 9px; }
        .day-head .date { margin-top: 0; font-size: 14px; }
        .day-head.today .date::after { margin-top: 2px; width: 14px; }
        .time-label { right: 8px; font-size: 8.5px; }

        .event { min-height: 28px; padding: 4px 5px 3px; border-left-width: 3px; }
        .event .event-time { margin-bottom: 1px; font-size: 8.5px; }
        .event .event-name { font-size: 9.5px; line-height: 1.18; }
        .event .event-topic { margin-top: 1px; font-size: 8px; line-height: 1.15; }
        .event .event-meta { margin-top: 1px !important; font-size: 7.5px !important; line-height: 1.1 !important; }

        .office-calendar.fit-week .day-column { background-size: 100% var(--fit-half-hour, 24px) !important; }
        .office-calendar.fit-week .day-column::after { background-size: 100% var(--fit-hour, 48px) !important; }
        .office-calendar.density-tight .event-topic { display: none; }
        .office-calendar.density-ultra .event-meta { display: none; }

        .month-weekdays { min-width: 0 !important; }
        .month-grid { min-width: 0 !important; }
        .month-weekdays span { min-height: 30px; font-size: 9px; }
        .office-calendar.fit-month .month-day { overflow: hidden; padding: 4px; }
        .office-calendar.fit-month .month-date-row { min-height: 17px; margin-bottom: 2px; }
        .office-calendar.fit-month .month-date { width: 20px; height: 20px; font-size: 10px; }
        .office-calendar.fit-month .month-day-count { font-size: 8px; }
        .office-calendar.fit-month .month-events { gap: 2px; }
        .office-calendar.fit-month .month-event { padding: 2px 4px; border-left-width: 2px; border-radius: 3px; }
        .office-calendar.fit-month .month-event time { font-size: 7.5px; }
        .office-calendar.fit-month .month-event strong { font-size: 8.5px; }
        .office-calendar.fit-month .month-event p,
        .office-calendar.fit-month .month-event-meta { display: none !important; }

        .room-resources { margin-top: 12px !important; }
      }
    `;
    document.head.append(style);
  }

  function numericStyle(node, property) {
    const raw = node.style[property] || '';
    const value = parseFloat(raw);
    return Number.isFinite(value) ? value : 0;
  }

  function fitWeekCalendar(panel) {
    const axis = document.getElementById('timeAxis');
    const grid = document.getElementById('dayGrid');
    const head = document.getElementById('calendarHead');
    if (!axis || !grid || !head) return;

    const viewportBottomGap = 8;
    const available = Math.floor(window.innerHeight - panel.getBoundingClientRect().top - viewportBottomGap);
    const headHeight = Math.max(40, Math.round(head.getBoundingClientRect().height || 42));
    const bodyHeight = Math.max(300, Math.min(620, available - headHeight - 2));
    const ratio = bodyHeight / BASE_GRID_HEIGHT;

    panel.classList.add('fit-week');
    panel.classList.remove('fit-month');
    panel.classList.toggle('density-tight', bodyHeight < 430);
    panel.classList.toggle('density-ultra', bodyHeight < 345);
    panel.style.setProperty('--fit-hour', `${bodyHeight / 12}px`);
    panel.style.setProperty('--fit-half-hour', `${bodyHeight / 24}px`);

    axis.style.height = `${bodyHeight}px`;
    grid.style.height = `${bodyHeight}px`;

    grid.querySelectorAll('.event[data-event-id]').forEach(node => {
      if (!node.dataset.baseTop) node.dataset.baseTop = String(numericStyle(node, 'top'));
      if (!node.dataset.baseHeight) node.dataset.baseHeight = String(numericStyle(node, 'height'));
      const baseTop = Number(node.dataset.baseTop);
      const baseHeight = Number(node.dataset.baseHeight);
      node.style.top = `${baseTop * ratio}px`;
      node.style.height = `${Math.max(28, baseHeight * ratio)}px`;
    });

    axis.querySelectorAll('.time-label').forEach(node => {
      if (!node.dataset.baseTop) node.dataset.baseTop = String(numericStyle(node, 'top'));
      const baseTop = Number(node.dataset.baseTop);
      node.style.top = `${baseTop * ratio}px`;
    });
  }

  function fitMonthCalendar(panel) {
    const grid = document.getElementById('monthGrid');
    const weekdays = document.querySelector('.month-weekdays');
    if (!grid || !weekdays || !grid.children.length) return;

    const available = Math.floor(window.innerHeight - panel.getBoundingClientRect().top - 8);
    const headerHeight = Math.max(28, Math.round(weekdays.getBoundingClientRect().height || 30));
    const rowCount = Math.max(1, Math.ceil(grid.children.length / 7));
    const rowHeight = Math.max(58, Math.min(132, Math.floor((available - headerHeight - 2) / rowCount)));

    panel.classList.remove('fit-week', 'density-tight', 'density-ultra');
    panel.classList.add('fit-month');
    grid.style.gridAutoRows = `${rowHeight}px`;
    grid.querySelectorAll('.month-day').forEach(day => {
      day.style.minHeight = `${rowHeight}px`;
      day.style.height = `${rowHeight}px`;
    });
  }

  function fitCalendarToViewport() {
    if (window.innerWidth <= 760) return;
    const panel = document.querySelector('.office-calendar');
    const weekView = document.getElementById('weekView');
    const monthView = document.getElementById('monthView');
    if (!panel) return;

    if (monthView && !monthView.hidden) fitMonthCalendar(panel);
    else if (weekView && !weekView.hidden) fitWeekCalendar(panel);
  }

  let fitQueued = false;
  function queueFit() {
    if (fitQueued) return;
    fitQueued = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fitQueued = false;
        fitCalendarToViewport();
      });
    });
  }

  installRoomResources();
  installRoomLegend();
  refineCopy();
  keepDialogRoomHint();
  installViewportFitStyles();
  queueFit();

  const dialog = document.getElementById('eventDialog');
  if (dialog && 'MutationObserver' in window) {
    new MutationObserver(keepDialogRoomHint).observe(dialog, { attributes: true, attributeFilter: ['hidden'] });
  }

  const calendar = document.querySelector('.office-calendar');
  if (calendar && 'MutationObserver' in window) {
    new MutationObserver(queueFit).observe(calendar, { childList: true, subtree: true });
  }

  window.addEventListener('resize', queueFit);
  document.addEventListener('click', event => {
    if (event.target.closest('[data-view], [data-range], #prevWeek, #nextWeek, #todayWeek')) queueFit();
  });
  document.addEventListener('change', event => {
    if (event.target.closest('#subjectFilter, #teacherFilter, #modeFilter, #roomFilter')) queueFit();
  });
})();