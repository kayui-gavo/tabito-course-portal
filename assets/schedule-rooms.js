(() => {
  'use strict';

  const HOUR_PX = 30;
  const DAY_START = 9 * 60;
  const DAY_END = 24 * 60;
  const DEFAULT_END = 21 * 60;
  const MIN_SPAN = 6 * 60;

  function minutes(value) {
    const match = String(value || '').match(/(\d{1,2}):(\d{2})/);
    return match ? Number(match[1]) * 60 + Number(match[2]) : NaN;
  }

  function eventTimes(node) {
    const text = node.querySelector('.event-time')?.textContent || '';
    const match = text.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
    if (!match) return null;
    const start = minutes(match[1]);
    const end = minutes(match[2]);
    return Number.isFinite(start) && Number.isFinite(end) ? { start, end } : null;
  }

  function visibleWeekEvents() {
    return [...document.querySelectorAll('#dayGrid .event[data-event-id]')]
      .filter(node => !node.classList.contains('office-filtered'));
  }

  function focusedRange() {
    const times = visibleWeekEvents().map(eventTimes).filter(Boolean);
    if (!times.length) return { start: DAY_START, end: DEFAULT_END };

    let start = Math.max(DAY_START, Math.floor(Math.min(...times.map(item => item.start)) / 60) * 60);
    let end = Math.min(DAY_END, Math.ceil(Math.max(...times.map(item => item.end)) / 60) * 60);

    if (end - start < MIN_SPAN) {
      const missing = MIN_SPAN - (end - start);
      const before = Math.min(start - DAY_START, Math.floor(missing / 2));
      start -= before;
      end = Math.min(DAY_END, end + missing - before);
      if (end - start < MIN_SPAN) start = Math.max(DAY_START, end - MIN_SPAN);
    }
    return { start, end };
  }

  function rebuildTimeAxis(start, end) {
    const axis = document.getElementById('timeAxis');
    if (!axis) return;
    const labels = [];
    for (let minute = start; minute <= end; minute += 60) {
      const top = ((minute - start) / 60) * HOUR_PX;
      const hour = String(Math.floor(minute / 60)).padStart(2, '0');
      labels.push(`<span class="${minute === start ? 'time-label start' : 'time-label'}" style="top:${top}px">${hour}:00</span>`);
    }
    const html = labels.join('');
    if (axis.innerHTML !== html) axis.innerHTML = html;
  }

  function localTodayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  function markColumns() {
    const today = localTodayKey();
    document.querySelectorAll('#dayGrid .day-column[data-date]').forEach(column => {
      column.classList.toggle('today-column', column.dataset.date === today);
      const hasVisibleEvent = [...column.querySelectorAll('.event[data-event-id]')]
        .some(node => !node.classList.contains('office-filtered'));
      column.classList.toggle('empty-column', !hasVisibleEvent);
    });
  }

  function syncWeekSummary() {
    const weekCount = document.getElementById('weekCount');
    const sessions = document.getElementById('summarySessions')?.textContent.trim() || '';
    const hours = document.getElementById('summaryHours')?.textContent.trim() || '';
    const cancelled = Number(document.getElementById('summaryCancelled')?.textContent || 0);
    if (!weekCount) return;
    const parts = [sessions, hours, cancelled ? `${cancelled} 项休讲` : ''].filter(Boolean);
    const next = parts.join(' · ');
    if (next && weekCount.textContent !== next) weekCount.textContent = next;
  }

  function simplifyAlertSummary() {
    document.querySelector('.ops-summary-item.period-stat')?.setAttribute('hidden', '');
    const room = document.getElementById('officeRoomPending')?.closest('.ops-summary-item');
    const time = document.getElementById('officeTimePending')?.closest('.ops-summary-item');
    const conflict = document.getElementById('officeConflictCount')?.closest('.ops-summary-item');
    [room, time, conflict].forEach(item => {
      if (!item) return;
      const value = Number(item.querySelector('strong')?.textContent || 0);
      item.hidden = value === 0;
    });
  }

  function applyCompactWeek() {
    if (window.innerWidth <= 760 || document.getElementById('monthView')?.hidden === false) {
      syncWeekSummary();
      simplifyAlertSummary();
      return;
    }

    const axis = document.getElementById('timeAxis');
    const grid = document.getElementById('dayGrid');
    if (!axis || !grid) return;

    const { start, end } = focusedRange();
    const height = ((end - start) / 60) * HOUR_PX;
    document.documentElement.style.setProperty('--calendar-hour', `${HOUR_PX}px`);
    axis.style.height = `${height}px`;
    grid.style.height = `${height}px`;
    rebuildTimeAxis(start, end);

    visibleWeekEvents().forEach(node => {
      const time = eventTimes(node);
      if (!time) return;
      const clippedStart = Math.max(time.start, start);
      const clippedEnd = Math.min(time.end, end);
      const top = ((clippedStart - start) / 60) * HOUR_PX;
      const duration = Math.max(0, clippedEnd - clippedStart);
      node.style.top = `${top}px`;
      node.style.height = `${Math.max(30, duration / 60 * HOUR_PX - 2)}px`;
    });

    markColumns();
    syncWeekSummary();
    simplifyAlertSummary();
  }

  function refineRoomCopy() {
    const pending = document.querySelector('#roomFilter option[value="pending"]');
    if (pending && pending.textContent !== '待分配') pending.textContent = '待分配';
  }

  function keepDialogRoomHint() {
    const dialog = document.getElementById('eventDialog');
    const room = document.getElementById('dialogRoom');
    if (!dialog || !room || dialog.hidden) return;
    room.classList.toggle('dialog-room-pending', room.textContent.trim() === '待分配');
    room.classList.toggle('dialog-room-online', room.textContent.trim() === '无需教室');
  }

  function ensureInitialFullWeek() {
    const fullWeek = document.querySelector('[data-range="fullweek"]');
    if (!fullWeek || fullWeek.dataset.initialized === '1') return;
    fullWeek.dataset.initialized = '1';
    fullWeek.click();
  }

  let queued = false;
  function queueCompact() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      queued = false;
      applyCompactWeek();
    }));
  }

  refineRoomCopy();
  ensureInitialFullWeek();
  keepDialogRoomHint();
  queueCompact();

  const dialog = document.getElementById('eventDialog');
  if (dialog && 'MutationObserver' in window) {
    new MutationObserver(keepDialogRoomHint).observe(dialog, { attributes: true, attributeFilter: ['hidden'] });
  }

  window.addEventListener('resize', queueCompact);
  window.addEventListener('popstate', queueCompact);
  document.addEventListener('click', event => {
    if (event.target.closest('[data-view],[data-range],#prevWeek,#nextWeek,#todayWeek')) queueCompact();
  });
  document.addEventListener('change', event => {
    if (event.target.closest('#subjectFilter,#teacherFilter,#modeFilter,#roomFilter')) queueCompact();
  });
})();