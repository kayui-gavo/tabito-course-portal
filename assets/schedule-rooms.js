(() => {
  'use strict';

  const ROOM_STORAGE = 'tabitoRoomAssignmentsV1';
  const ROOMS = ['共通教室', '美术教室', '外部教室'];
  const HOUR_PX = 24;
  const DAY_START = 9 * 60;
  const DAY_END = 24 * 60;
  const DEFAULT_END = 21 * 60;
  const MIN_SPAN = 6 * 60;
  const MODULES = [
    ['schedule', '日程'],
    ['rooms', '教室'],
    ['courses', '课程'],
    ['teachers', '讲师'],
    ['enrollment', '报名'],
    ['check', '检查']
  ];

  const subjectSelect = document.getElementById('subjectFilter');
  const roomFilter = document.getElementById('roomFilter');
  const calendar = document.querySelector('.office-calendar');
  const details = document.querySelector('.workspace-details');
  const legend = document.querySelector('.legend-drawer');
  const command = document.querySelector('.schedule-command');
  if (!calendar || !command) return;

  const subjectNames = new Map(
    [...(subjectSelect?.options || [])]
      .filter(option => option.value !== 'all')
      .map(option => [option.value, option.textContent.trim()])
  );
  const subjectKeys = [...subjectNames.keys()];

  let activeModule = 'schedule';
  let density = 'agenda';
  let lastEventId = '';
  let roomAssignments = loadRooms();
  let refreshQueued = false;

  function esc(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
  }

  function loadRooms() {
    try {
      const value = JSON.parse(localStorage.getItem(ROOM_STORAGE) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch (_) {
      return {};
    }
  }

  function saveRooms() {
    try { localStorage.setItem(ROOM_STORAGE, JSON.stringify(roomAssignments)); } catch (_) {}
  }

  function minutes(value) {
    const match = String(value || '').match(/(\d{1,2}):(\d{2})/);
    return match ? Number(match[1]) * 60 + Number(match[2]) : NaN;
  }

  function parseTimes(node) {
    const text = node.querySelector('.event-time,.mobile-event-time,time')?.textContent || node.getAttribute('aria-label') || '';
    const match = text.match(/(\d{1,2}:\d{2})\s*(?:[–-]|至)\s*(\d{1,2}:\d{2})/);
    if (!match) {
      const aria = node.getAttribute('aria-label') || '';
      const ariaMatch = aria.match(/(\d{1,2}:\d{2})至(\d{1,2}:\d{2})/);
      return ariaMatch ? { start: ariaMatch[1], end: ariaMatch[2] } : null;
    }
    return { start: match[1], end: match[2] };
  }

  function subjectKey(node) {
    return subjectKeys.find(key => node.classList.contains(key)) || '';
  }

  function normalizeMode(value) {
    const mode = String(value || '').trim();
    if (mode === 'online') return '网课';
    if (mode === 'offline') return '线下';
    if (mode === 'hybrid') return '线下＋线上同步';
    if (mode === 'tentative') return '暂定线上';
    return mode;
  }

  function metaPieces(node) {
    return String(node.querySelector('.event-meta,.month-event-meta,.mobile-event-meta')?.textContent || '')
      .split('·').map(part => part.trim()).filter(Boolean);
  }

  function teacherFor(node) {
    if (node.dataset.teacher) return node.dataset.teacher.trim();
    const pieces = metaPieces(node);
    return pieces[0] || '—';
  }

  function modeFor(node) {
    if (node.dataset.mode) return normalizeMode(node.dataset.mode);
    const pieces = metaPieces(node);
    const mode = pieces.find(part => /网课|线上|线下|同步/.test(part));
    return normalizeMode(mode || '—');
  }

  function onlineMode(mode) {
    return mode === '网课' || mode === '仅线上' || mode === '暂定线上' || (mode.includes('线上') && !mode.includes('同步'));
  }

  function roomForNode(node) {
    const mode = modeFor(node);
    if (onlineMode(mode)) return '无需教室';
    return roomAssignments[node.dataset.eventId] || '待分配';
  }

  function dateFor(node) {
    return node.closest('[data-date]')?.dataset.date || '';
  }

  function courseFor(node) {
    const key = subjectKey(node);
    if (key && subjectNames.has(key)) return subjectNames.get(key);
    const raw = node.querySelector('.event-name,.month-event-top strong,.mobile-event strong')?.textContent || '';
    return raw.split(' · ')[0].trim() || '—';
  }

  function titleFor(node) {
    const raw = node.querySelector('.event-name,.month-event-top strong,.mobile-event strong')?.textContent || '';
    const pieces = raw.split(' · ');
    return pieces.length > 1 ? pieces.slice(1).join(' · ') : '';
  }

  function topicFor(node) {
    return node.querySelector('.event-topic,.month-event p,.mobile-event p')?.textContent?.trim() || '';
  }

  function cancelled(node) {
    return node.classList.contains('cancelled');
  }

  function duration(node) {
    const times = parseTimes(node);
    if (!times) return 0;
    return Math.max(0, minutes(times.end) - minutes(times.start)) / 60;
  }

  function eventRecord(node) {
    const times = parseTimes(node) || { start: '—', end: '—' };
    return {
      id: node.dataset.eventId || '',
      node,
      date: dateFor(node),
      start: times.start,
      end: times.end,
      course: courseFor(node),
      title: titleFor(node),
      topic: topicFor(node),
      teacher: teacherFor(node),
      mode: modeFor(node),
      room: roomForNode(node),
      cancelled: cancelled(node),
      hours: duration(node)
    };
  }

  function currentWeekNodes(includeRoomFiltered = true) {
    return [...document.querySelectorAll('#dayGrid .event[data-event-id]')]
      .filter(node => !node.classList.contains('office-filtered'))
      .filter(node => includeRoomFiltered || !node.classList.contains('room-filtered-v2'));
  }

  function currentWeekEvents(includeRoomFiltered = true) {
    return currentWeekNodes(includeRoomFiltered)
      .map(eventRecord)
      .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
  }

  function allRenderedNodes() {
    return [...document.querySelectorAll('.event[data-event-id],.month-event[data-event-id],.mobile-event[data-event-id]')];
  }

  function addRoomFilterOptions() {
    if (!roomFilter) return;
    const options = [['common', '共通教室'], ['art', '美术教室'], ['external', '外部教室']];
    options.forEach(([value, label]) => {
      if (roomFilter.querySelector(`option[value="${value}"]`)) return;
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      roomFilter.append(option);
    });
  }

  function roomFilterValue(room) {
    if (room === '共通教室') return 'common';
    if (room === '美术教室') return 'art';
    if (room === '外部教室') return 'external';
    if (room === '无需教室') return 'online';
    return 'pending';
  }

  function applyRealRoomFilter() {
    const selected = roomFilter?.value || 'all';
    allRenderedNodes().forEach(node => {
      const matches = selected === 'all' || roomFilterValue(roomForNode(node)) === selected;
      node.classList.toggle('room-filtered-v2', !matches);
    });
  }

  function enhanceRoomMeta() {
    allRenderedNodes().forEach(node => {
      const meta = node.querySelector('.event-meta,.month-event-meta,.mobile-event-meta');
      if (!meta || cancelled(node)) return;
      const teacher = teacherFor(node);
      const mode = modeFor(node);
      const room = roomForNode(node);
      const pieces = [teacher, mode];
      if (room !== '无需教室') pieces.push(room);
      const next = pieces.filter(Boolean).join(' · ');
      if (meta.textContent !== next) meta.textContent = next;
      node.dataset.assignedRoom = room;
    });
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
        .some(node => !node.classList.contains('office-filtered') && !node.classList.contains('room-filtered-v2'));
      column.classList.toggle('empty-column', !visible);
    });
  }

  function applyAgenda() {
    document.body.classList.add('schedule-agenda');
    document.body.classList.remove('schedule-timeline');
    currentWeekNodes(false).forEach(node => {
      const time = parseTimes(node);
      node.style.setProperty('--agenda-order', String(time ? minutes(time.start) : 0));
    });
    markColumns();
  }

  function focusedRange() {
    const times = currentWeekNodes(false).map(parseTimes).filter(Boolean);
    if (!times.length) return { start: DAY_START, end: DEFAULT_END };
    let start = Math.max(DAY_START, Math.floor(Math.min(...times.map(item => minutes(item.start))) / 60) * 60);
    let end = Math.min(DAY_END, Math.ceil(Math.max(...times.map(item => minutes(item.end))) / 60) * 60);
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
    const html = [];
    for (let minute = start; minute <= end; minute += 60) {
      const top = ((minute - start) / 60) * HOUR_PX;
      html.push(`<span class="${minute === start ? 'time-label start' : 'time-label'}" style="top:${top}px">${String(Math.floor(minute / 60)).padStart(2, '0')}:00</span>`);
    }
    const next = html.join('');
    if (axis.innerHTML !== next) axis.innerHTML = next;
  }

  function applyTimeline() {
    document.body.classList.remove('schedule-agenda');
    document.body.classList.add('schedule-timeline');
    if (window.innerWidth <= 760 || document.getElementById('monthView')?.hidden === false) return;
    const axis = document.getElementById('timeAxis');
    const grid = document.getElementById('dayGrid');
    if (!axis || !grid) return;
    const { start, end } = focusedRange();
    const height = ((end - start) / 60) * HOUR_PX;
    document.documentElement.style.setProperty('--calendar-hour', `${HOUR_PX}px`);
    axis.style.height = `${height}px`;
    grid.style.height = `${height}px`;
    rebuildTimeAxis(start, end);
    currentWeekNodes(false).forEach(node => {
      const time = parseTimes(node);
      if (!time) return;
      const s = Math.max(start, minutes(time.start));
      const e = Math.min(end, minutes(time.end));
      node.style.top = `${((s - start) / 60) * HOUR_PX}px`;
      node.style.height = `${Math.max(22, ((e - s) / 60) * HOUR_PX - 2)}px`;
    });
    markColumns();
  }

  function intervalsOverlap(a, b) {
    return a.date === b.date && minutes(a.start) < minutes(b.end) && minutes(b.start) < minutes(a.end);
  }

  function teacherConflicts(events) {
    const active = events.filter(event => !event.cancelled && event.teacher !== '—');
    const conflicts = [];
    for (let i = 0; i < active.length; i += 1) {
      for (let j = i + 1; j < active.length; j += 1) {
        if (active[i].teacher === active[j].teacher && intervalsOverlap(active[i], active[j])) conflicts.push([active[i], active[j]]);
      }
    }
    return conflicts;
  }

  function roomConflicts(events) {
    const active = events.filter(event => !event.cancelled && ROOMS.includes(event.room));
    const conflicts = [];
    for (let i = 0; i < active.length; i += 1) {
      for (let j = i + 1; j < active.length; j += 1) {
        if (active[i].room === active[j].room && intervalsOverlap(active[i], active[j])) conflicts.push([active[i], active[j]]);
      }
    }
    return conflicts;
  }

  function formatDay(date) {
    const match = String(date).match(/^\d{4}-(\d{2})-(\d{2})$/);
    return match ? `${Number(match[1])}/${Number(match[2])}` : date;
  }

  function syncMetrics(events) {
    const active = events.filter(event => !event.cancelled);
    const pending = active.filter(event => event.room === '待分配');
    const tConflicts = teacherConflicts(events);
    const roomPending = document.getElementById('officeRoomPending');
    const roomBadge = document.getElementById('officeRoomPendingBadge');
    const conflict = document.getElementById('officeConflictCount');
    if (roomPending) roomPending.textContent = String(pending.length);
    if (roomBadge) roomBadge.textContent = String(pending.length);
    if (conflict) conflict.textContent = String(tConflicts.length);

    const roomList = document.getElementById('officeRoomPendingList');
    if (roomList) {
      roomList.innerHTML = pending.length ? pending.map(event => `<div class="followup-item"><span class="followup-time">${formatDay(event.date)}<br>${event.start}–${event.end}</span><span class="followup-main"><strong>${esc(event.course)}</strong><span>${esc(event.teacher)}${event.topic ? ` · ${esc(event.topic)}` : ''}</span></span><span class="followup-room">待分配</span></div>`).join('') : '<p class="followup-empty">当前范围没有待分配教室的课程。</p>';
    }

    [roomPending?.closest('.ops-summary-item'), document.getElementById('officeTimePending')?.closest('.ops-summary-item'), conflict?.closest('.ops-summary-item')].forEach(item => {
      if (!item) return;
      item.hidden = Number(item.querySelector('strong')?.textContent || 0) === 0;
    });
    document.querySelector('.ops-summary-item.period-stat')?.setAttribute('hidden', '');
  }

  function syncWeekSummary() {
    const events = currentWeekEvents(false);
    const active = events.filter(event => !event.cancelled);
    const cancelledCount = events.length - active.length;
    const hours = active.reduce((sum, event) => sum + event.hours, 0);
    const node = document.getElementById('weekCount');
    if (node) node.textContent = `${active.length} 节 · ${Number.isInteger(hours) ? hours : hours.toFixed(1)} h${cancelledCount ? ` · ${cancelledCount} 项休讲` : ''}`;
  }

  function installModuleNav() {
    if (document.getElementById('adminModuleNav')) return;
    const nav = document.createElement('nav');
    nav.id = 'adminModuleNav';
    nav.className = 'admin-module-nav';
    nav.setAttribute('aria-label', '教务功能');
    nav.innerHTML = MODULES.map(([key, label]) => `<button type="button" data-admin-module="${key}" class="${key === 'schedule' ? 'active' : ''}">${label}</button>`).join('') + '<span class="admin-nav-spacer"></span><span class="admin-density" aria-label="日程显示方式"><button type="button" data-density="agenda" class="active">紧凑表</button><button type="button" data-density="timeline">时间轴</button></span>';
    command.insertAdjacentElement('afterend', nav);

    const workbench = document.createElement('section');
    workbench.id = 'adminWorkbench';
    workbench.className = 'admin-workbench';
    workbench.hidden = true;
    nav.insertAdjacentElement('afterend', workbench);
  }

  function workbench() { return document.getElementById('adminWorkbench'); }

  function setModule(module) {
    if (module === 'enrollment') {
      document.getElementById('openEnrollment')?.click();
      return;
    }
    activeModule = module;
    document.querySelectorAll('[data-admin-module]').forEach(button => button.classList.toggle('active', button.dataset.adminModule === module));
    const isSchedule = module === 'schedule';
    calendar.hidden = !isSchedule;
    if (legend) legend.hidden = !isSchedule;
    if (details) details.hidden = !isSchedule;
    const wb = workbench();
    if (wb) wb.hidden = isSchedule;
    document.body.dataset.adminModule = module;
    if (isSchedule) refreshLayout(); else renderWorkbench(module);
  }

  function roomSelect(event) {
    if (onlineMode(event.mode)) return '<span class="admin-status">无需教室</span>';
    const values = ['待分配', ...ROOMS];
    return `<select class="admin-room-select" data-room-event="${esc(event.id)}">${values.map(room => `<option value="${esc(room)}"${room === event.room ? ' selected' : ''}>${esc(room)}</option>`).join('')}</select>`;
  }

  function renderRooms(events) {
    const active = events.filter(event => !event.cancelled);
    const pending = active.filter(event => event.room === '待分配').length;
    const conflicts = roomConflicts(events).length;
    return `<div class="admin-summary-strip"><div><span>本周课程</span><strong>${active.length}</strong></div><div><span>教室待分配</span><strong>${pending}</strong></div><div><span>教室冲突</span><strong>${conflicts}</strong></div></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>日期</th><th>时间</th><th>课程</th><th>讲师</th><th>方式</th><th>教室</th></tr></thead><tbody>${events.map(event => `<tr><td>${esc(formatDay(event.date))}</td><td>${esc(event.start)}–${esc(event.end)}</td><td><strong>${esc(event.course)}</strong><small>${esc(event.title)}${event.topic ? ` · ${esc(event.topic)}` : ''}</small></td><td>${esc(event.teacher)}</td><td>${esc(event.mode)}</td><td>${roomSelect(event)}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function groupBy(events, key) {
    const groups = new Map();
    events.forEach(event => {
      const value = event[key] || '—';
      if (!groups.has(value)) groups.set(value, []);
      groups.get(value).push(event);
    });
    return [...groups.entries()];
  }

  function renderCourses(events) {
    const groups = groupBy(events.filter(event => !event.cancelled), 'course');
    if (!groups.length) return '<p class="admin-empty">当前筛选范围没有课程。</p>';
    return `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>课程</th><th>本周</th><th>课时</th><th>讲师</th><th>方式</th><th>本周安排</th></tr></thead><tbody>${groups.map(([course, items]) => {
      const teachers = [...new Set(items.map(item => item.teacher))].join(' / ');
      const modes = [...new Set(items.map(item => item.mode))].join(' / ');
      const hours = items.reduce((sum, item) => sum + item.hours, 0);
      const list = items.map(item => `${formatDay(item.date)} ${item.start} ${item.title}`).join('；');
      return `<tr><td><strong>${esc(course)}</strong></td><td>${items.length} 回</td><td>${hours} h</td><td>${esc(teachers)}</td><td>${esc(modes)}</td><td><small>${esc(list)}</small></td></tr>`;
    }).join('')}</tbody></table></div>`;
  }

  function renderTeachers(events) {
    const groups = groupBy(events.filter(event => !event.cancelled), 'teacher');
    if (!groups.length) return '<p class="admin-empty">当前筛选范围没有讲师安排。</p>';
    return `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>讲师</th><th>本周课程</th><th>课时</th><th>授课科目</th><th>安排</th></tr></thead><tbody>${groups.map(([teacher, items]) => {
      const courses = [...new Set(items.map(item => item.course))].join('、');
      const hours = items.reduce((sum, item) => sum + item.hours, 0);
      const list = items.map(item => `${formatDay(item.date)} ${item.start}–${item.end} ${item.course}`).join('；');
      return `<tr><td><strong>${esc(teacher)}</strong></td><td>${items.length} 节</td><td>${hours} h</td><td>${esc(courses)}</td><td><small>${esc(list)}</small></td></tr>`;
    }).join('')}</tbody></table></div>`;
  }

  function renderCheck(events) {
    const active = events.filter(event => !event.cancelled);
    const pending = active.filter(event => event.room === '待分配');
    const teachers = teacherConflicts(events);
    const rooms = roomConflicts(events);
    const timePending = Number(document.getElementById('officeTimePending')?.textContent || 0);
    const rows = [];
    rows.push(`<div class="admin-check-row"><span>教室分配</span><strong>${pending.length ? `${pending.length} 节待处理` : '已确认'}</strong><span class="${pending.length ? 'admin-check-warn' : 'admin-check-ok'}">${pending.length ? pending.map(item => `${formatDay(item.date)} ${item.course}`).join('；') : 'OK'}</span></div>`);
    rows.push(`<div class="admin-check-row"><span>讲师冲突</span><strong>${teachers.length ? `${teachers.length} 组冲突` : '无冲突'}</strong><span class="${teachers.length ? 'admin-check-bad' : 'admin-check-ok'}">${teachers.length ? teachers.map(pair => `${formatDay(pair[0].date)} ${pair[0].teacher}`).join('；') : 'OK'}</span></div>`);
    rows.push(`<div class="admin-check-row"><span>教室冲突</span><strong>${rooms.length ? `${rooms.length} 组冲突` : '无冲突'}</strong><span class="${rooms.length ? 'admin-check-bad' : 'admin-check-ok'}">${rooms.length ? rooms.map(pair => `${formatDay(pair[0].date)} ${pair[0].room}`).join('；') : 'OK'}</span></div>`);
    rows.push(`<div class="admin-check-row"><span>时间未定</span><strong>${timePending ? `${timePending} 项` : '无'}</strong><span class="${timePending ? 'admin-check-warn' : 'admin-check-ok'}">${timePending ? '请在待排课程中确认' : 'OK'}</span></div>`);
    return `<div class="admin-summary-strip"><div><span>教室待分配</span><strong>${pending.length}</strong></div><div><span>讲师冲突</span><strong>${teachers.length}</strong></div><div><span>教室冲突</span><strong>${rooms.length}</strong></div><div><span>时间未定</span><strong>${timePending}</strong></div></div><div class="admin-check-list">${rows.join('')}</div>`;
  }

  function renderWorkbench(module) {
    const wb = workbench();
    if (!wb) return;
    const events = currentWeekEvents(true);
    const titleMap = { rooms: ['教室', '本周教室分配与占用'], courses: ['课程', '当前范围课程汇总'], teachers: ['讲师', '本周讲师授课安排'], check: ['检查', '排课异常与待处理事项'] };
    const [title, subtitle] = titleMap[module] || ['教务', ''];
    let body = '';
    if (module === 'rooms') body = renderRooms(events);
    if (module === 'courses') body = renderCourses(events);
    if (module === 'teachers') body = renderTeachers(events);
    if (module === 'check') body = renderCheck(events);
    wb.innerHTML = `<header class="admin-workbench-head"><div><h2>${title}</h2><p>${subtitle}</p></div><span class="admin-workbench-meta">${esc(document.getElementById('weekTitle')?.textContent || '')}</span></header>${body}`;
  }

  function syncDialogRoom() {
    const dialog = document.getElementById('eventDialog');
    const target = document.getElementById('dialogRoom');
    if (!dialog || dialog.hidden || !target || !lastEventId) return;
    const node = [...document.querySelectorAll('[data-event-id]')].find(item => item.dataset.eventId === lastEventId);
    if (!node) return;
    const room = roomForNode(node);
    if (target.textContent !== room) target.textContent = room;
    target.classList.toggle('dialog-room-pending', room === '待分配');
    target.classList.toggle('dialog-room-online', room === '无需教室');
  }

  function setDensity(next) {
    density = next === 'timeline' ? 'timeline' : 'agenda';
    document.querySelectorAll('[data-density]').forEach(button => button.classList.toggle('active', button.dataset.density === density));
    refreshLayout();
  }

  function refreshLayout() {
    enhanceRoomMeta();
    applyRealRoomFilter();
    if (density === 'agenda') applyAgenda(); else applyTimeline();
    const events = currentWeekEvents(true);
    syncMetrics(events);
    syncWeekSummary();
    syncDialogRoom();
    if (activeModule !== 'schedule' && activeModule !== 'enrollment') renderWorkbench(activeModule);
  }

  function queueRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      refreshQueued = false;
      refreshLayout();
    }));
  }

  function openCurrentWeek() {
    const week = document.querySelector('[data-view="week"]');
    if (week && !week.classList.contains('active')) week.click();
    document.getElementById('todayWeek')?.click();
    const full = document.querySelector('[data-range="fullweek"]');
    if (full && !full.classList.contains('active')) full.click();
  }

  installModuleNav();
  addRoomFilterOptions();
  document.body.classList.add('schedule-agenda');
  openCurrentWeek();
  queueRefresh();

  document.addEventListener('click', event => {
    const eventNode = event.target.closest('[data-event-id]');
    if (eventNode) {
      lastEventId = eventNode.dataset.eventId || '';
      setTimeout(syncDialogRoom, 0);
    }
    const module = event.target.closest('[data-admin-module]')?.dataset.adminModule;
    if (module) setModule(module);
    const densityButton = event.target.closest('[data-density]');
    if (densityButton) setDensity(densityButton.dataset.density);
    if (event.target.closest('[data-view],[data-range],#prevWeek,#nextWeek,#todayWeek')) queueRefresh();
  }, true);

  document.addEventListener('change', event => {
    const roomSelectNode = event.target.closest('[data-room-event]');
    if (roomSelectNode) {
      const id = roomSelectNode.dataset.roomEvent;
      const value = roomSelectNode.value;
      if (value === '待分配') delete roomAssignments[id];
      else roomAssignments[id] = value;
      saveRooms();
      queueRefresh();
      return;
    }
    if (event.target.closest('#subjectFilter,#teacherFilter,#modeFilter,#roomFilter')) queueRefresh();
  });

  window.addEventListener('resize', queueRefresh);
  window.addEventListener('popstate', queueRefresh);

  if ('MutationObserver' in window) {
    const grid = document.getElementById('dayGrid');
    if (grid) new MutationObserver(mutations => {
      if (mutations.some(mutation => mutation.type === 'childList')) queueRefresh();
    }).observe(grid, { childList: true, subtree: true });
  }
})();
