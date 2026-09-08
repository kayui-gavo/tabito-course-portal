(() => {
  'use strict';

  const grid = document.getElementById('dayGrid');
  const head = document.getElementById('calendarHead');
  const monthView = document.getElementById('monthView');
  if (!grid) return;

  function minutes(value) {
    const match = String(value || '').match(/(\d{1,2}):(\d{2})/);
    return match ? Number(match[1]) * 60 + Number(match[2]) : NaN;
  }

  function parseTimes(node) {
    const text = node.querySelector('.event-time')?.textContent || node.getAttribute('aria-label') || '';
    let match = text.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
    if (!match) match = (node.getAttribute('aria-label') || '').match(/(\d{1,2}:\d{2})至(\d{1,2}:\d{2})/);
    return match ? { start: match[1], end: match[2] } : null;
  }

  function localTodayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  function allDayColumns() {
    return [...grid.children].filter(node => node.classList?.contains('day-column') && node.dataset.date);
  }

  function activeDayColumns() {
    const all = allDayColumns();
    const workdays = document.querySelector('[data-range="workdays"]')?.classList.contains('active');
    return workdays ? all.slice(0, 5) : all;
  }

  function visibleEvents(column) {
    return [...column.querySelectorAll('.event[data-event-id]')]
      .filter(node => !node.classList.contains('office-filtered'))
      .filter(node => !node.classList.contains('room-filtered-v2'));
  }

  function isWeekend(date) {
    const day = new Date(`${date}T12:00:00`).getDay();
    return day === 0 || day === 6;
  }

  function clearPlacement(node) {
    node.style.removeProperty('--compact-day');
    node.style.removeProperty('--compact-row');
  }

  function removeGenerated() {
    grid.querySelectorAll(':scope > .compact-slot-label, :scope > .compact-slot-cell').forEach(node => node.remove());
    delete grid.dataset.compactSignature;
    allDayColumns().forEach(column => column.querySelectorAll('.event[data-event-id]').forEach(clearPlacement));
  }

  function syncDayVisibility(columns) {
    const all = allDayColumns();
    const activeDates = new Set(columns.map(column => column.dataset.date));
    all.forEach(column => column.classList.toggle('compact-hidden-day', !activeDates.has(column.dataset.date)));
    const heads = [...(head?.querySelectorAll('.day-head') || [])];
    heads.forEach((node, index) => {
      const column = all[index];
      node.classList.toggle('compact-hidden-day', Boolean(column) && !activeDates.has(column.dataset.date));
    });
  }

  function addHoverText(node) {
    ['.event-name', '.event-topic', '.event-meta'].forEach(selector => {
      const target = node.querySelector(selector);
      if (target?.textContent?.trim()) target.title = target.textContent.trim();
    });
  }

  function buildCompactCalendar() {
    const compactActive = document.body.classList.contains('schedule-agenda') &&
      window.innerWidth > 760 &&
      monthView?.hidden !== false;

    if (!compactActive) {
      removeGenerated();
      allDayColumns().forEach(column => column.classList.remove('compact-hidden-day'));
      head?.querySelectorAll('.day-head').forEach(node => node.classList.remove('compact-hidden-day'));
      return;
    }

    const columns = activeDayColumns();
    if (!columns.length) return;
    syncDayVisibility(columns);

    const dayCount = columns.length;
    document.documentElement.style.setProperty('--compact-days', String(dayCount));
    const template = `var(--compact-time-col) repeat(${dayCount}, minmax(0,1fr))`;
    grid.style.setProperty('grid-template-columns', template, 'important');
    head?.style.setProperty('grid-template-columns', template, 'important');

    const today = localTodayKey();
    const records = [];
    columns.forEach((column, dayIndex) => {
      const events = visibleEvents(column);
      column.classList.toggle('today-column', column.dataset.date === today);
      column.classList.toggle('empty-column', events.length === 0);
      events.forEach(node => {
        const times = parseTimes(node);
        if (!times) return;
        addHoverText(node);
        records.push({
          node,
          dayIndex,
          start: times.start,
          endMinute: minutes(times.end)
        });
      });
    });

    const visibleSet = new Set(records.map(record => record.node));
    allDayColumns().forEach(column => {
      column.querySelectorAll('.event[data-event-id]').forEach(node => {
        if (!visibleSet.has(node)) clearPlacement(node);
      });
    });

    const grouped = new Map();
    records.forEach(record => {
      if (!grouped.has(record.start)) grouped.set(record.start, []);
      grouped.get(record.start).push(record);
    });

    const starts = [...grouped.keys()].sort((a, b) => minutes(a) - minutes(b));
    const slots = [];
    let cursor = 1;

    starts.forEach(start => {
      const items = grouped.get(start).sort((a, b) => a.dayIndex - b.dayIndex || a.endMinute - b.endMinute || a.node.dataset.eventId.localeCompare(b.node.dataset.eventId));
      const counts = Array(dayCount).fill(0);
      items.forEach(item => { counts[item.dayIndex] += 1; });
      const span = Math.max(1, ...counts);
      const laneByDay = Array(dayCount).fill(0);
      const baseRow = cursor;

      items.forEach(item => {
        const lane = laneByDay[item.dayIndex]++;
        item.node.style.setProperty('--compact-day', String(item.dayIndex + 2));
        item.node.style.setProperty('--compact-row', String(baseRow + lane));
      });

      slots.push({ start, baseRow, span });
      cursor += span;
    });

    if (!slots.length) {
      slots.push({ start: '无课', baseRow: 1, span: 1 });
      cursor = 2;
    }

    const signature = [
      columns.map(column => column.dataset.date).join(','),
      slots.map(slot => `${slot.start}:${slot.span}`).join(','),
      records.map(record => record.node.dataset.eventId).sort().join(',')
    ].join('|');

    const expectedCells = (cursor - 1) * dayCount;
    const generatedIntact = grid.querySelectorAll(':scope > .compact-slot-label').length === slots.length &&
      grid.querySelectorAll(':scope > .compact-slot-cell').length === expectedCells;
    if (grid.dataset.compactSignature === signature && generatedIntact) return;

    grid.querySelectorAll(':scope > .compact-slot-label, :scope > .compact-slot-cell').forEach(node => node.remove());
    const fragment = document.createDocumentFragment();
    const lastRow = cursor - 1;

    slots.forEach(slot => {
      const label = document.createElement('div');
      label.className = 'compact-slot-label';
      if (slot.baseRow + slot.span - 1 === lastRow) label.classList.add('last-row');
      label.textContent = slot.start === '无课' ? '—' : slot.start;
      label.style.gridRow = `${slot.baseRow} / span ${slot.span}`;
      fragment.append(label);

      for (let lane = 0; lane < slot.span; lane += 1) {
        const row = slot.baseRow + lane;
        columns.forEach((column, dayIndex) => {
          const cell = document.createElement('div');
          cell.className = 'compact-slot-cell';
          if (isWeekend(column.dataset.date)) cell.classList.add('is-weekend');
          if (column.dataset.date === today) cell.classList.add('is-today');
          if (dayIndex === dayCount - 1) cell.classList.add('last-column');
          if (row === lastRow) cell.classList.add('last-row');
          cell.setAttribute('aria-hidden', 'true');
          cell.style.gridColumn = String(dayIndex + 2);
          cell.style.gridRow = String(row);
          fragment.append(cell);
        });
      }
    });

    grid.append(fragment);
    grid.dataset.compactSignature = signature;
  }

  function renameDensityControl() {
    const compact = document.querySelector('[data-density="agenda"]');
    if (compact && compact.textContent !== '周历') compact.textContent = '周历';
  }

  let queued = false;
  function queueBuild() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      queued = false;
      renameDensityControl();
      buildCompactCalendar();
    }));
  }

  renameDensityControl();
  queueBuild();

  document.addEventListener('click', event => {
    if (event.target.closest('[data-density],[data-view],[data-range],#prevWeek,#nextWeek,#todayWeek,[data-admin-module]')) queueBuild();
  }, true);

  document.addEventListener('change', event => {
    if (event.target.closest('#subjectFilter,#teacherFilter,#modeFilter,#roomFilter,[data-room-event]')) queueBuild();
  });

  window.addEventListener('resize', queueBuild);
  window.addEventListener('popstate', queueBuild);

  if ('MutationObserver' in window) {
    new MutationObserver(mutations => {
      const relevant = mutations.some(mutation => {
        const changed = [...mutation.addedNodes, ...mutation.removedNodes].filter(node => node.nodeType === 1);
        return changed.some(node => !node.classList?.contains('compact-slot-label') && !node.classList?.contains('compact-slot-cell'));
      });
      if (relevant) queueBuild();
    }).observe(grid, { childList: true, subtree: true });
  }
})();
