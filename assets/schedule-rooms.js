(() => {
  'use strict';

  const BASE_GRID_HEIGHT = 700;

  function refineRoomCopy() {
    const roomFilter = document.getElementById('roomFilter');
    if (!roomFilter) return;
    const pending = roomFilter.querySelector('option[value="pending"]');
    if (pending) pending.textContent = '待分配';
  }

  function keepDialogRoomHint() {
    const dialog = document.getElementById('eventDialog');
    const room = document.getElementById('dialogRoom');
    if (!dialog || !room || dialog.hidden) return;
    room.classList.toggle('dialog-room-pending', room.textContent.trim() === '待分配');
    room.classList.toggle('dialog-room-online', room.textContent.trim() === '无需教室');
  }

  function numberFromStyle(node, property) {
    const value = parseFloat(node.style[property] || '0');
    return Number.isFinite(value) ? value : 0;
  }

  function fitWeek(panel) {
    const head = document.getElementById('calendarHead');
    const axis = document.getElementById('timeAxis');
    const grid = document.getElementById('dayGrid');
    if (!head || !axis || !grid) return;

    const available = Math.floor(window.innerHeight - panel.getBoundingClientRect().top - 8);
    const headHeight = Math.max(36, Math.round(head.getBoundingClientRect().height || 38));
    const bodyHeight = Math.max(320, Math.min(BASE_GRID_HEIGHT, available - headHeight - 2));
    const ratio = bodyHeight / BASE_GRID_HEIGHT;

    panel.classList.add('fit-week');
    panel.classList.remove('fit-month');
    panel.style.setProperty('--fit-hour', `${bodyHeight / 12}px`);
    panel.style.setProperty('--fit-half-hour', `${bodyHeight / 24}px`);

    axis.style.height = `${bodyHeight}px`;
    grid.style.height = `${bodyHeight}px`;

    grid.querySelectorAll('.event[data-event-id]').forEach(node => {
      if (!node.dataset.baseTop) node.dataset.baseTop = String(numberFromStyle(node, 'top'));
      if (!node.dataset.baseHeight) node.dataset.baseHeight = String(numberFromStyle(node, 'height'));
      node.style.top = `${Number(node.dataset.baseTop) * ratio}px`;
      node.style.height = `${Math.max(25, Number(node.dataset.baseHeight) * ratio)}px`;
    });

    axis.querySelectorAll('.time-label').forEach(node => {
      if (!node.dataset.baseTop) node.dataset.baseTop = String(numberFromStyle(node, 'top'));
      node.style.top = `${Number(node.dataset.baseTop) * ratio}px`;
    });
  }

  function fitMonth(panel) {
    const grid = document.getElementById('monthGrid');
    const weekdays = document.querySelector('.month-weekdays');
    if (!grid || !weekdays || !grid.children.length) return;

    const available = Math.floor(window.innerHeight - panel.getBoundingClientRect().top - 8);
    const headerHeight = Math.max(26, Math.round(weekdays.getBoundingClientRect().height || 28));
    const rows = Math.max(1, Math.ceil(grid.children.length / 7));
    const rowHeight = Math.max(54, Math.min(118, Math.floor((available - headerHeight - 2) / rows)));

    panel.classList.remove('fit-week');
    panel.classList.add('fit-month');
    grid.style.gridAutoRows = `${rowHeight}px`;
    grid.querySelectorAll('.month-day').forEach(day => {
      day.style.height = `${rowHeight}px`;
      day.style.minHeight = `${rowHeight}px`;
    });
  }

  function fitCalendar() {
    if (window.innerWidth <= 760) return;
    const panel = document.querySelector('.office-calendar');
    const monthView = document.getElementById('monthView');
    if (!panel) return;
    if (monthView && !monthView.hidden) fitMonth(panel);
    else fitWeek(panel);
  }

  let queued = false;
  function queueFit() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        queued = false;
        fitCalendar();
      });
    });
  }

  refineRoomCopy();
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
