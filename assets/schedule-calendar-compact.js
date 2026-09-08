(() => {
  'use strict';

  const grid = document.getElementById('dayGrid');
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

  function dayColumns() {
    return [...grid.children].filter(node => node.classList?.contains('day-column') && node.dataset.date);
  }

  function visibleEvents(column) {
    return [...column.querySelectorAll('.event[data-event-id]')]
      .filter(node => !node.classList.contains('office-filtered'))
      .filter(node => !node.classList.contains('room-filtered-v2'));
  }

  function clearPlacement(node) {
    node.style.removeProperty('--compact-day');
    node.style.removeProperty('--compact-row');
  }

  function buildCompactCalendar() {
    const compactActive = document.body.classList.contains('schedule-agenda') &&
      window.innerWidth > 760 &&
      monthView?.hidden !== false;
    if (!compactActive) return;

    const columns = dayColumns();
    if (!columns.length) return;

    const records = [];
    columns.forEach((column, dayIndex) => {
      column.classList.toggle('today-column', column.dataset.date === localTodayKey());
      visibleEvents(column).forEach(node => {
        const times = parseTimes(node);
        if (!times) return;
        records.push({node,dayIndex,start:times.start,end:times.end,startMinute:minutes(times.start),endMinute:minutes(times.end)});
      });
    });

    columns.forEach(column => {
      [...column.querySelectorAll('.event[data-event-id]')].forEach(node => {
        if (!records.some(record => record.node === node)) clearPlacement(node);
      });
    });

    const grouped = new Map();
    records.forEach(record => {
      if (!grouped.has(record.start)) grouped.set(record.start, []);
      grouped.get(record.start).push(record);
    });

    const starts = [...grouped.keys()].sort((a,b) => minutes(a) - minutes(b));
    const slots = [];
    let cursor = 1;

    starts.forEach(start => {
      const items = grouped.get(start).sort((a,b) => a.dayIndex - b.dayIndex || a.endMinute - b.endMinute || a.node.dataset.eventId.localeCompare(b.node.dataset.eventId));
      const counts = Array(7).fill(0);
      items.forEach(item => { counts[item.dayIndex] += 1; });
      const span = Math.max(1, ...counts);
      const laneByDay = Array(7).fill(0);
      const baseRow = cursor;
      items.forEach(item => {
        const lane = laneByDay[item.dayIndex]++;
        item.node.style.setProperty('--compact-day', String(item.dayIndex + 2));
        item.node.style.setProperty('--compact-row', String(baseRow + lane));
      });
      slots.push({start,baseRow,span});
      cursor += span;
    });

    if (!slots.length) {
      slots.push({start:'无课',baseRow:1,span:1});
      cursor = 2;
    }

    const signature = [columns.map(column => column.dataset.date).join(','),slots.map(slot => `${slot.start}:${slot.span}`).join(','),records.map(record => record.node.dataset.eventId).sort().join(',')].join('|');
    const generatedIntact = grid.querySelectorAll(':scope > .compact-slot-label').length === slots.length && grid.querySelectorAll(':scope > .compact-slot-cell').length === (cursor - 1) * 7;
    if (grid.dataset.compactSignature === signature && generatedIntact) return;

    grid.querySelectorAll(':scope > .compact-slot-label, :scope > .compact-slot-cell').forEach(node => node.remove());
    const fragment = document.createDocumentFragment();
    const today = localTodayKey();
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
          if (dayIndex >= 5) cell.classList.add('is-weekend');
          if (column.dataset.date === today) cell.classList.add('is-today');
          if (dayIndex === 6) cell.classList.add('last-column');
          if (row === lastRow) cell.classList.add('last-row');
          cell.setAttribute('aria-hidden','true');
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
    }).observe(grid,{childList:true,subtree:true});
  }
})();
