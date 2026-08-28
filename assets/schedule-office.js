(() => {
  'use strict';

  const subjectMeta = {
    politics: { name: '公共政治经济', teacher: '刘淼', mode: '线下' },
    japanese: { name: '国语', teacher: '刘淼', mode: '线下' },
    english: { name: '共通英语阅读', teacher: '刘淼', mode: '线下' },
    mathIIBC: { name: '共通考试数学IIBC', teacher: '坂野健晟', mode: '网课' },
    geography: { name: '共通考试地理', teacher: '丁玺', mode: '线下' },
    privatePhysics: { name: '魏思远物理一对一', teacher: '刘可惟', mode: '网课' }
  };

  const subjectKeys = Object.keys(subjectMeta);
  const teacherFilter = document.getElementById('teacherFilter');
  const modeFilter = document.getElementById('modeFilter');
  const roomFilter = document.getElementById('roomFilter');
  const subjectFilter = document.getElementById('subjectFilter');
  const resetButton = document.getElementById('resetOfficeFilters');
  const dayGrid = document.getElementById('dayGrid');
  const monthGrid = document.getElementById('monthGrid');
  const monthView = document.getElementById('monthView');
  const calendarPanel = document.querySelector('.office-calendar');
  const dialog = document.getElementById('eventDialog');
  const dialogRoom = document.getElementById('dialogRoom');

  const roomPendingMetric = document.getElementById('officeRoomPending');
  const roomPendingBadge = document.getElementById('officeRoomPendingBadge');
  const roomPendingList = document.getElementById('officeRoomPendingList');
  const timePendingMetric = document.getElementById('officeTimePending');
  const conflictMetric = document.getElementById('officeConflictCount');
  const conflictCard = document.getElementById('officeConflictCard');
  const summaryHours = document.getElementById('summaryHours');
  const summarySessions = document.getElementById('summarySessions');
  const summaryCancelled = document.getElementById('summaryCancelled');
  const pendingCount = document.getElementById('pendingCount');
  const pendingFollowup = document.querySelector('.pending-followup');

  if (!teacherFilter || !modeFilter || !roomFilter || !subjectFilter || !calendarPanel) return;

  function subjectKey(node) {
    return subjectKeys.find(key => node.classList.contains(key)) || '';
  }

  function teacherFor(node) {
    const key = subjectKey(node);
    return subjectMeta[key]?.teacher || '';
  }

  function modeFor(node) {
    if (node.classList.contains('tentative')) return '暂定线上';
    const key = subjectKey(node);
    return subjectMeta[key]?.mode || '';
  }

  function roomFor(node) {
    const mode = modeFor(node);
    if (mode === '网课' || mode.includes('线上')) return '无需教室';
    return '待分配';
  }

  function isCancelled(node) {
    return node.classList.contains('cancelled');
  }

  function matchesOfficeFilters(node) {
    const teacher = teacherFor(node);
    const mode = modeFor(node);
    const room = roomFor(node);

    if (teacherFilter.value !== 'all' && teacher !== teacherFilter.value) return false;

    if (modeFilter.value === 'offline' && mode !== '线下') return false;
    if (modeFilter.value === 'online' && mode !== '网课') return false;
    if (modeFilter.value === 'tentative' && mode !== '暂定线上') return false;

    if (roomFilter.value === 'pending' && room !== '待分配') return false;
    if (roomFilter.value === 'online' && room !== '无需教室') return false;

    return true;
  }

  function allRenderedNodes() {
    return [
      ...document.querySelectorAll('.event[data-event-id]'),
      ...document.querySelectorAll('.month-event[data-event-id]'),
      ...document.querySelectorAll('.mobile-event[data-event-id]')
    ];
  }

  function currentSourceNodes() {
    if (monthView && !monthView.hidden) {
      return [...monthGrid.querySelectorAll('.month-event[data-event-id]')];
    }
    return [...dayGrid.querySelectorAll('.event[data-event-id]')];
  }

  function enhanceMeta(node) {
    const teacher = teacherFor(node);
    const mode = modeFor(node);
    const room = roomFor(node);
    const selector = node.classList.contains('month-event')
      ? '.month-event-meta'
      : node.classList.contains('mobile-event')
        ? '.mobile-event-meta'
        : '.event-meta';
    const metaNode = node.querySelector(selector);
    if (!metaNode) return;

    const pieces = [teacher, mode];
    if (!isCancelled(node) && room === '待分配') pieces.push('教室待分配');
    const next = pieces.filter(Boolean).join(' · ');
    if (metaNode.textContent !== next) metaNode.textContent = next;
    metaNode.classList.toggle('room-inline-pending', !isCancelled(node) && room === '待分配');
    metaNode.classList.toggle('room-inline-online', room === '无需教室');
  }

  function parseTimes(node) {
    const aria = node.getAttribute('aria-label') || '';
    let match = aria.match(/(\d{1,2}:\d{2})至(\d{1,2}:\d{2})/);
    if (!match) {
      const timeText = node.querySelector('.event-time, .mobile-event-time')?.textContent || '';
      match = timeText.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
    }
    if (!match) return null;
    return { start: match[1], end: match[2] };
  }

  function timeToMinutes(value) {
    const [h, m] = value.split(':').map(Number);
    return h * 60 + m;
  }

  function durationHours(node) {
    const times = parseTimes(node);
    if (!times) return 0;
    return Math.max(0, timeToMinutes(times.end) - timeToMinutes(times.start)) / 60;
  }

  function dateFor(node) {
    return node.closest('[data-date]')?.dataset.date || '';
  }

  function courseFor(node) {
    const key = subjectKey(node);
    return subjectMeta[key]?.name || node.querySelector('.event-name, .month-event-top strong, strong')?.textContent || '';
  }

  function topicFor(node) {
    return node.querySelector('.event-topic, .month-event p, .mobile-event p')?.textContent || '';
  }

  function formatShortDate(date) {
    const match = date.match(/^\d{4}-(\d{2})-(\d{2})$/);
    if (!match) return date;
    return `${Number(match[1])}/${Number(match[2])}`;
  }

  function visibleScheduledNodes() {
    return currentSourceNodes().filter(node => !node.classList.contains('office-filtered'));
  }

  function countTeacherConflicts(nodes) {
    const active = nodes.filter(node => !isCancelled(node));
    let count = 0;
    for (let i = 0; i < active.length; i += 1) {
      for (let j = i + 1; j < active.length; j += 1) {
        const a = active[i];
        const b = active[j];
        if (!dateFor(a) || dateFor(a) !== dateFor(b)) continue;
        if (!teacherFor(a) || teacherFor(a) !== teacherFor(b)) continue;
        const ta = parseTimes(a);
        const tb = parseTimes(b);
        if (!ta || !tb) continue;
        const overlap = timeToMinutes(ta.start) < timeToMinutes(tb.end) && timeToMinutes(tb.start) < timeToMinutes(ta.end);
        if (overlap) count += 1;
      }
    }
    return count;
  }

  function pendingEnglishMatchesFilters() {
    if (!['all', 'english'].includes(subjectFilter.value)) return false;
    if (!['all', '刘淼'].includes(teacherFilter.value)) return false;
    if (!['all', 'offline'].includes(modeFilter.value)) return false;
    if (!['all', 'pending'].includes(roomFilter.value)) return false;
    return true;
  }

  function updateMonthDayCounts() {
    if (!monthGrid) return;
    monthGrid.querySelectorAll('.month-day').forEach(day => {
      const visible = [...day.querySelectorAll('.month-event[data-event-id]')].filter(node => !node.classList.contains('office-filtered'));
      const count = day.querySelector('.month-day-count');
      if (count) count.textContent = visible.length ? `${visible.length} 项` : '';
      day.classList.toggle('office-empty-day', visible.length === 0);
    });
  }

  function renderRoomPending(nodes) {
    const pending = nodes
      .filter(node => !isCancelled(node) && roomFor(node) === '待分配')
      .sort((a, b) => `${dateFor(a)}${parseTimes(a)?.start || ''}`.localeCompare(`${dateFor(b)}${parseTimes(b)?.start || ''}`));

    roomPendingMetric.textContent = String(pending.length);
    roomPendingBadge.textContent = String(pending.length);

    if (!pending.length) {
      roomPendingList.innerHTML = '<p class="followup-empty">当前范围没有待分配教室的课程。</p>';
      return;
    }

    roomPendingList.innerHTML = pending.slice(0, 8).map(node => {
      const times = parseTimes(node);
      const time = times ? `${times.start}–${times.end}` : '';
      return `<div class="followup-item">
        <span class="followup-time">${formatShortDate(dateFor(node))}<br>${time}</span>
        <span class="followup-main"><strong>${courseFor(node)}</strong><span>${teacherFor(node)}${topicFor(node) ? ` · ${topicFor(node)}` : ''}</span></span>
        <span class="followup-room">待分配</span>
      </div>`;
    }).join('') + (pending.length > 8 ? `<p class="followup-empty">另有 ${pending.length - 8} 节线下课待分配教室。</p>` : '');
  }

  function updateMetrics(nodes) {
    const teaching = nodes.filter(node => !isCancelled(node));
    const cancelled = nodes.filter(isCancelled);
    const hours = teaching.reduce((sum, node) => sum + durationHours(node), 0);
    summaryHours.textContent = `${Number.isInteger(hours) ? hours : hours.toFixed(1)} h`;
    summarySessions.textContent = `${teaching.length} 节`;
    summaryCancelled.textContent = String(cancelled.length);

    const conflicts = countTeacherConflicts(nodes);
    conflictMetric.textContent = String(conflicts);
    conflictCard.classList.toggle('has-conflict', conflicts > 0);

    const pendingTime = pendingEnglishMatchesFilters() ? 15 : 0;
    timePendingMetric.textContent = String(pendingTime);
    pendingCount.textContent = String(pendingTime);
    pendingFollowup.hidden = pendingTime === 0;
  }

  function applyOfficeFilters() {
    allRenderedNodes().forEach(node => {
      enhanceMeta(node);
      node.classList.toggle('office-filtered', !matchesOfficeFilters(node));
    });

    updateMonthDayCounts();
    const current = visibleScheduledNodes();
    renderRoomPending(current);
    updateMetrics(current);
    updateDialogRoom();
  }

  function updateDialogRoom() {
    if (!dialog || dialog.hidden || !dialogRoom) return;
    const mode = document.getElementById('dialogMode')?.textContent || '';
    const room = mode === '线下' ? '待分配' : (mode.includes('线上') || mode === '网课' ? '无需教室' : '—');
    dialogRoom.textContent = room;
    dialogRoom.classList.toggle('dialog-room-pending', room === '待分配');
    dialogRoom.classList.toggle('dialog-room-online', room === '无需教室');
  }

  let scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyOfficeFilters();
    });
  }

  [teacherFilter, modeFilter, roomFilter].forEach(select => select.addEventListener('change', scheduleApply));
  subjectFilter.addEventListener('change', scheduleApply);

  resetButton?.addEventListener('click', () => {
    teacherFilter.value = 'all';
    modeFilter.value = 'all';
    roomFilter.value = 'all';
    if (subjectFilter.value !== 'all') {
      subjectFilter.value = 'all';
      subjectFilter.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      scheduleApply();
    }
  });

  if ('MutationObserver' in window) {
    const observer = new MutationObserver(scheduleApply);
    observer.observe(calendarPanel, { childList: true, subtree: true });
    if (dialog) new MutationObserver(updateDialogRoom).observe(dialog, { attributes: true, attributeFilter: ['hidden'] });
  }

  window.addEventListener('resize', scheduleApply);
  document.addEventListener('click', event => {
    if (event.target.closest('[data-view], [data-range], #prevWeek, #nextWeek, #todayWeek')) scheduleApply();
  });

  /* 教务页默认展示全周。现有课程大量安排在周末，默认只看工作日容易漏课。 */
  const fullWeekButton = document.querySelector('[data-range="fullweek"]');
  if (fullWeekButton) fullWeekButton.click();
  else scheduleApply();
})();
