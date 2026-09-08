(() => {
  'use strict';

  const HOUR_PX = 34;
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
      end = Math.min(DAY_END, end + (missing - before));
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

  function applyCompactWeek() {
    if (window.innerWidth <= 760 || document.getElementById('monthView')?.hidden === false) return;
    const axis = document.getElementById('timeAxis');
    const grid = document.getElementById('dayGrid');
    if (!axis || !grid) return;

    const { start, end } = focusedRange();
    const height = ((end - start) / 60) * HOUR_PX;
    const root = document.documentElement;
    root.style.setProperty('--runtime-grid-height', `${height}px`);
    root.style.setProperty('--runtime-hour', `${HOUR_PX}px`);
    root.style.setProperty('--runtime-two-hour', `${HOUR_PX * 2}px`);
    axis.style.height = `${height}px`;
    grid.style.height = `${height}px`;
    rebuildTimeAxis(start, end);

    visibleWeekEvents().forEach(node => {
      const time = eventTimes(node);
      if (!time) return;
      const top = ((Math.max(time.start, start) - start) / 60) * HOUR_PX;
      const duration = Math.max(0, Math.min(time.end, end) - Math.max(time.start, start));
      node.style.top = `${top}px`;
      node.style.height = `${Math.max(31, duration / 60 * HOUR_PX - 3)}px`;
    });
  }

  function installCompactStyle() {
    if (document.getElementById('scheduleCompactDensityV1')) return;
    const style = document.createElement('style');
    style.id = 'scheduleCompactDensityV1';
    style.textContent = `
      @media (min-width:761px){
        .workspace-shell{padding-top:4px!important}
        .schedule-command{padding:2px 0 4px!important}
        .command-main{min-height:32px!important;gap:8px!important}
        .command-title h1{font-size:15px!important}
        .text-btn,.primary-btn{min-height:25px!important}
        .command-lower{min-height:27px!important;padding-top:2px!important;gap:9px!important}
        .filter-field{height:24px!important}
        .reset-btn,.enrollment-open-btn{min-height:24px!important}
        .legend-drawer{margin:2px 0 3px!important;min-height:15px!important}
        .calendar-head .day-head,.calendar-head .corner{min-height:32px!important}
        .day-head{padding:2px!important}
        .day-head .weekday{font-size:8px!important}
        .day-head .date{font-size:12px!important}
        .calendar-body{grid-template-columns:54px minmax(0,1fr)!important}
        .time-label{right:6px!important;font-size:7.5px!important}
        .event{min-height:31px!important;padding:3px 4px 2px!important;border-left-width:3px!important}
        .event .event-time{margin-bottom:1px!important;font-size:7.4px!important;line-height:1.05!important}
        .event .event-name{font-size:8.7px!important;line-height:1.12!important}
        .event .event-topic{display:block!important;margin-top:1px!important;color:rgba(24,34,48,.68)!important;font-size:7.3px!important;line-height:1.1!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
        .event .event-meta{display:block!important;margin-top:1px!important;font-size:6.8px!important;line-height:1.05!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
        .enrollment-count-badge{font-size:6.4px!important}
        .workspace-details{margin-top:7px!important}
      }
    `;
    document.head.append(style);
  }

  function refineRoomCopy() {
    const roomFilter = document.getElementById('roomFilter');
    const pending = roomFilter?.querySelector('option[value="pending"]');
    if (pending && pending.textContent !== '待分配') pending.textContent = '待分配';
  }

  function keepDialogRoomHint() {
    const dialog = document.getElementById('eventDialog');
    const room = document.getElementById('dialogRoom');
    if (!dialog || !room || dialog.hidden) return;
    room.classList.toggle('dialog-room-pending', room.textContent.trim() === '待分配');
    room.classList.toggle('dialog-room-online', room.textContent.trim() === '无需教室');
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

  function openAtCurrentWeek() {
    const weekButton = document.querySelector('[data-view="week"]');
    if (weekButton && !weekButton.classList.contains('active')) weekButton.click();
    document.getElementById('todayWeek')?.click();
    document.querySelector('[data-range="fullweek"]')?.click();
  }

  installCompactStyle();
  refineRoomCopy();
  openAtCurrentWeek();
  keepDialogRoomHint();
  queueCompact();

  const dialog = document.getElementById('eventDialog');
  if (dialog && 'MutationObserver' in window) {
    new MutationObserver(keepDialogRoomHint).observe(dialog, { attributes: true, attributeFilter: ['hidden'] });
  }

  window.addEventListener('resize', queueCompact);
  document.addEventListener('click', event => {
    if (event.target.closest('[data-view],[data-range],#prevWeek,#nextWeek,#todayWeek')) queueCompact();
  });
  document.addEventListener('change', event => {
    if (event.target.closest('#subjectFilter,#teacherFilter,#modeFilter,#roomFilter')) queueCompact();
  });
})();