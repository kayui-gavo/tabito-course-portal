(() => {
  'use strict';

  const HOUR_PX = 28;
  const DAY_START = 9 * 60;
  const DAY_END = 24 * 60;
  const DEFAULT_END = 21 * 60;
  const MIN_SPAN = 5 * 60;

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

  function localTodayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  function markColumns() {
    const today = localTodayKey();
    document.querySelectorAll('#dayGrid .day-column[data-date]').forEach(column => {
      column.classList.toggle('today-column', column.dataset.date === today);
      const visible = [...column.querySelectorAll('.event[data-event-id]')]
        .some(node => !node.classList.contains('office-filtered'));
      column.classList.toggle('empty-column', !visible);
    });
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
      node.style.height = `${Math.max(26, duration / 60 * HOUR_PX - 2)}px`;
    });
    markColumns();
  }

  function installCompactStyle() {
    ['scheduleCompactDensityV1', 'scheduleCompactDensityV2'].forEach(id => document.getElementById(id)?.remove());
    const style = document.createElement('style');
    style.id = 'scheduleCompactDensityV3';
    style.textContent = `
      @media (min-width:761px){
        .schedule-workspace{background:#fbfaf7!important}
        .schedule-workspace .nav,.schedule-workspace .page-shell,.schedule-workspace .footer-inner{width:min(1620px,calc(100% - 24px))!important}
        .compact-header{background:rgba(251,250,247,.985)!important;border-bottom-color:#d9dee3!important}
        .compact-header .nav{min-height:40px!important}
        .compact-header .brand-logo{width:24px!important;height:24px!important;border-radius:3px!important}
        .compact-header .brand-copy{display:flex!important;align-items:baseline!important;gap:7px!important}
        .compact-header .brand-copy strong{font-size:12px!important}
        .compact-header .brand-copy span{font-size:8.5px!important;color:#8a9198!important}
        .compact-header .nav-links a{padding:4px 7px!important;border-radius:2px!important;font-size:9.5px!important;background:transparent!important}
        .compact-header .nav-links a.active{color:#173b5d!important;border-bottom:1px solid #244f7a!important}

        .workspace-shell{padding-top:3px!important;padding-bottom:22px!important}
        .schedule-command{top:41px!important;padding:1px 0 3px!important;background:rgba(251,250,247,.985)!important;border-bottom-color:#d9dee3!important;backdrop-filter:blur(10px)!important}
        .command-main{min-height:29px!important;grid-template-columns:auto auto minmax(240px,1fr) auto!important;gap:7px!important}
        .command-title{gap:6px!important}
        .command-title>span{font-size:7.8px!important;letter-spacing:.045em!important}
        .command-title h1{font-size:14px!important;letter-spacing:-.015em!important}
        .week-controls{gap:1px!important}
        .text-btn,.primary-btn{min-height:23px!important;padding:2px 7px!important;border-radius:2px!important;font-size:9px!important}
        .icon-btn{width:24px!important;padding:0!important}
        .week-title-wrap strong{font-size:11.5px!important;letter-spacing:-.005em!important}
        .week-title-wrap span{margin-top:0!important;font-size:7.5px!important}
        .view-controls{gap:8px!important}
        .segment{padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:inset 0 -1px #d9dee3!important}
        .segment-btn{min-height:23px!important;padding:2px 8px!important;border-radius:0!important;font-size:8.8px!important;background:transparent!important}
        .segment-btn.active{color:#173b5d!important;background:transparent!important;box-shadow:inset 0 -2px #244f7a!important}

        .command-lower{min-height:25px!important;padding-top:2px!important;gap:8px!important;border-top-color:#eceff1!important}
        .toolbar-filters{gap:3px!important}
        .filter-field{height:22px!important;padding:0 5px!important;border:0!important;border-right:1px solid #dfe3e7!important;border-radius:0!important;background:transparent!important}
        .filter-field:first-child{min-width:138px!important;border-left:1px solid #dfe3e7!important}
        .filter-field>span{font-size:7.5px!important;color:#90979f!important}
        .filter-field select{max-width:145px!important;font-size:8.8px!important;font-weight:680!important;background:transparent!important}
        .reset-btn,.enrollment-open-btn{min-height:22px!important;padding:0 7px!important;border-radius:0!important;font-size:8.5px!important}
        .enrollment-open-btn{border-left:1px solid #dfe3e7!important}
        .ops-summary-item{padding:0 7px!important}
        .ops-summary-item>span,.ops-summary-item>small{font-size:7.5px!important}
        .ops-summary-item>strong{font-size:9.8px!important}

        .legend-drawer{margin:1px 0 2px!important;min-height:13px!important}
        .legend-drawer>summary{font-size:8px!important;color:#8d949b!important}
        .office-legend{margin-top:2px!important;padding:3px 0 1px!important;gap:9px!important;font-size:8px!important}
        .office-legend .subject-legend i,.office-legend .legend-swatch,.office-legend .room-dot{width:6px!important;height:6px!important;border-radius:1px!important}

        .office-calendar{border-radius:1px!important;border-color:#d7dce1!important;background:#fff!important}
        .calendar-head{background:#f7f8f7!important}
        .calendar-head .day-head,.calendar-head .corner{min-height:29px!important}
        .day-head{padding:1px 2px!important}
        .day-head .weekday{font-size:7.6px!important;font-weight:760!important;color:#7d858e!important}
        .day-head .date{font-size:11px!important;font-weight:790!important}
        .day-head.today{background:#eef4f8!important}
        .day-head.today .weekday,.day-head.today .date{color:#173b5d!important}
        .day-head.today .date::after{width:10px!important;height:1px!important;margin-top:1px!important}
        .calendar-head .day-head:nth-last-child(-n+2){background-color:#fafaf9!important}
        .calendar-head .day-head.today:nth-last-child(-n+2){background:#eef4f8!important}

        .calendar-body{grid-template-columns:48px minmax(0,1fr)!important}
        .time-axis{background:#f9faf9!important;border-right-color:#dde2e6!important}
        .time-label{right:5px!important;color:#9aa0a6!important;font-size:7px!important;font-variant-numeric:tabular-nums!important}
        .day-column{background-size:100% var(--runtime-hour)!important;border-right-color:#e2e6e9!important}
        .day-column::after{background-size:100% var(--runtime-two-hour)!important;background-image:linear-gradient(to bottom,#e3e7ea 1px,transparent 1px)!important}
        .day-column.today-column{background-color:#f7fafc!important}
        .day-column.empty-column{background-image:repeating-linear-gradient(135deg,transparent 0,transparent 11px,rgba(30,45,60,.018) 11px,rgba(30,45,60,.018) 12px)!important;background-size:auto!important}
        .day-column.today-column.empty-column{background-color:#f7fafc!important}

        .event{min-height:26px!important;display:grid!important;grid-template-columns:auto minmax(0,1fr)!important;grid-template-rows:auto auto auto!important;column-gap:5px!important;align-content:start!important;padding:2px 4px!important;border-width:1px!important;border-left-width:3px!important;border-radius:2px!important;box-shadow:none!important;overflow:hidden!important;transition:none!important}
        .event:hover{filter:none!important;outline:1px solid rgba(36,79,122,.28)!important;outline-offset:-1px!important}
        .event:focus-visible{outline:2px solid #244f7a!important;outline-offset:-1px!important}
        .event .event-time{grid-column:1!important;grid-row:1!important;margin:0!important;font-size:7.2px!important;line-height:1.12!important;font-weight:790!important;color:#53606b!important;white-space:nowrap!important}
        .event .event-name{grid-column:2!important;grid-row:1!important;min-width:0!important;margin:0!important;font-size:8.6px!important;line-height:1.12!important;font-weight:790!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
        .event .event-topic{grid-column:1/-1!important;grid-row:2!important;display:block!important;margin-top:1px!important;color:rgba(24,34,48,.72)!important;font-size:7.2px!important;line-height:1.08!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
        .event .event-meta{grid-column:1/-1!important;grid-row:3!important;display:block!important;margin-top:1px!important;color:rgba(24,34,48,.48)!important;font-size:6.7px!important;line-height:1.05!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
        .event.cancelled{opacity:.72!important}
        .enrollment-count-badge{font-size:6.2px!important;color:rgba(24,34,48,.48)!important}

        .month-weekdays span{min-height:25px!important;font-size:7.8px!important}
        .month-grid{grid-auto-rows:minmax(80px,auto)!important}
        .month-day{min-height:80px!important;padding:3px!important}
        .month-date-row{min-height:16px!important;margin-bottom:1px!important}
        .month-date{width:18px!important;height:18px!important;font-size:8px!important}
        .month-day-count{font-size:7px!important}
        .month-events{gap:1px!important}
        .month-event{padding:2px 3px!important;border-radius:1px!important}
        .month-event time{font-size:6.7px!important}
        .month-event strong{font-size:7.5px!important}
        .month-day.today{box-shadow:inset 0 0 0 1px rgba(36,79,122,.25)!important}

        .workspace-details{margin-top:6px!important;border-top-color:#d9dee3!important}
        .workspace-detail>summary{min-height:29px!important;font-size:9.5px!important}
        .workspace-detail>summary::before{font-size:12px!important}
        .workspace-detail>summary b,.workspace-detail>summary em{font-size:8px!important}
        .schedule-workspace .footer{margin-top:10px!important}
        .schedule-workspace .footer-inner{min-height:30px!important;font-size:8px!important}
      }

      @media (min-width:761px) and (max-height:780px){
        .compact-header .nav{min-height:36px!important}
        .schedule-command{top:37px!important}
        .compact-header .brand-copy span{display:none!important}
        .legend-drawer{display:none!important}
        .workspace-details{margin-top:4px!important}
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