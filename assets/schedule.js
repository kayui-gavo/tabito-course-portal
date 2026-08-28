(() => {
  'use strict';

  const subjects = {
    politics: { name: '公共政治经济' },
    japanese: { name: '国语' },
    english: { name: '共通英语阅读' }
  };

  // 课程数据统一放在这里维护。date 使用 YYYY-MM-DD，time 使用 24 小时制。
  const scheduleEvents = [
    { id: 'pol-01', subject: 'politics', date: '2026-08-30', start: '14:00', end: '17:00', title: '第1回', topic: '政治哲学编年史、政治体系基础，哲学史入门', status: 'normal' },
    { id: 'pol-off-01', subject: 'politics', date: '2026-09-06', start: '14:00', end: '17:00', title: '休讲', topic: '公共政治经济', status: 'cancelled' },
    { id: 'pol-02', subject: 'politics', date: '2026-09-13', start: '14:00', end: '17:00', title: '第2回', topic: '日本国宪法', status: 'normal' },
    { id: 'pol-03', subject: 'politics', date: '2026-09-20', start: '14:00', end: '17:00', title: '第3回', topic: '选举制度和立法权与行政权', status: 'normal' },
    { id: 'pol-04', subject: 'politics', date: '2026-09-27', start: '14:00', end: '17:00', title: '第4回', topic: '日本地方行政和司法权', status: 'normal' },
    { id: 'pol-off-02', subject: 'politics', date: '2026-10-04', start: '14:00', end: '17:00', title: '休讲', topic: '公共政治经济', status: 'cancelled' },
    { id: 'pol-05', subject: 'politics', date: '2026-10-11', start: '14:00', end: '17:00', title: '第5回', topic: '经济思想入门', status: 'normal' },
    { id: 'pol-06', subject: 'politics', date: '2026-10-18', start: '14:00', end: '17:00', title: '第6回', topic: '宏观经济基础', status: 'normal' },
    { id: 'pol-07', subject: 'politics', date: '2026-10-25', start: '14:00', end: '17:00', title: '第7回', topic: '市场与金融', status: 'normal' },
    { id: 'pol-08', subject: 'politics', date: '2026-11-01', start: '14:00', end: '17:00', title: '第8回', topic: '日本经济与国际经济局式', status: 'normal' },
    { id: 'pol-09', subject: 'politics', date: '2026-11-08', start: '14:00', end: '17:00', title: '第9回', topic: '战后日本政党史和战后国际关系史', status: 'normal' },
    { id: 'pol-10', subject: 'politics', date: '2026-11-15', start: '14:00', end: '17:00', title: '第10回', topic: '国际法基础', status: 'normal' },
    { id: 'pol-11', subject: 'politics', date: '2026-11-22', start: '14:00', end: '17:00', title: '第11回', topic: '国际关系基础', status: 'normal' },

    { id: 'jp-01', subject: 'japanese', date: '2026-08-28', start: '14:00', end: '16:00', title: '第1回', topic: '基础读解方法：组合意图，接续词', status: 'normal' },
    { id: 'jp-02', subject: 'japanese', date: '2026-08-30', start: '18:30', end: '20:30', title: '第2回', topic: '基础读解方法：读题技巧', status: 'normal' },
    { id: 'jp-03', subject: 'japanese', date: '2026-09-04', start: '14:00', end: '16:00', title: '第3回', topic: '基础现代文练习1', status: 'tentative' },
    { id: 'jp-off-01', subject: 'japanese', date: '2026-09-06', start: '18:30', end: '20:30', title: '休讲', topic: '国语', status: 'cancelled' },
    { id: 'jp-04', subject: 'japanese', date: '2026-09-11', start: '14:00', end: '16:00', title: '第4回', topic: '基础现代文练习1', status: 'normal' },
    { id: 'jp-05', subject: 'japanese', date: '2026-09-13', start: '18:30', end: '20:30', title: '第5回', topic: '基础现代文练习2', status: 'normal' },
    { id: 'jp-06', subject: 'japanese', date: '2026-09-18', start: '14:00', end: '16:00', title: '第6回', topic: '基础现代文练习3', status: 'normal' },
    { id: 'jp-07', subject: 'japanese', date: '2026-09-20', start: '18:30', end: '20:30', title: '第7回', topic: '基础现代文练习4', status: 'normal' },
    { id: 'jp-off-02', subject: 'japanese', date: '2026-10-02', start: '14:00', end: '16:00', title: '休讲', topic: '国语', status: 'cancelled' },
    { id: 'jp-off-03', subject: 'japanese', date: '2026-10-04', start: '18:30', end: '20:30', title: '休讲', topic: '国语', status: 'cancelled' },
    { id: 'jp-08', subject: 'japanese', date: '2026-10-09', start: '14:00', end: '16:00', title: '第8回', topic: '小说读解技巧，基础现代文练习5', status: 'normal' },
    { id: 'jp-09', subject: 'japanese', date: '2026-10-11', start: '18:30', end: '20:30', title: '第9回', topic: '基础现代文练习6', status: 'normal' },
    { id: 'jp-10', subject: 'japanese', date: '2026-10-16', start: '14:00', end: '16:00', title: '第10回', topic: '2020年评论', status: 'normal' },
    { id: 'jp-11', subject: 'japanese', date: '2026-10-18', start: '18:30', end: '20:30', title: '第11回', topic: '2020年小说', status: 'normal' },
    { id: 'jp-12', subject: 'japanese', date: '2026-10-23', start: '14:00', end: '16:00', title: '第12回', topic: '2021年评论', status: 'normal' },
    { id: 'jp-13', subject: 'japanese', date: '2026-10-25', start: '18:30', end: '20:30', title: '第13回', topic: '2021年小说', status: 'normal' },
    { id: 'jp-14', subject: 'japanese', date: '2026-10-30', start: '14:00', end: '16:00', title: '第14回', topic: '2022年评论', status: 'normal' }
  ];

  const pendingCourses = [
    '第1回　基础文型解析',
    '第2回　复杂句解析',
    '第3回　特殊文型解析',
    '第4回　多义动词理解',
    '第5回　听力技巧训练1，长文讲评1',
    '第6回　听力技巧训练1，长文讲评2',
    '第7回　听力技巧训练1，长文讲评3',
    '第8回　听力技巧训练1，长文讲评4',
    '第9回　听力技巧训练1，长文讲评5',
    '第10回　2020年过去问演练',
    '第11回　2021年过去问演练',
    '第12回　2022年过去问演练',
    '第13回　2023年过去问演练',
    '第14回　2024年过去问演练',
    '第15回　2025年过去问演练'
  ];

  const DAY_MS = 86400000;
  const START_MINUTE = 9 * 60;
  const END_MINUTE = 21 * 60;
  const GRID_HEIGHT = 700;
  const weekdayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const shortWeekdayNames = ['一', '二', '三', '四', '五', '六', '日'];

  const initial = getInitialState();
  const state = {
    view: initial.view,
    weekStart: initial.weekStart,
    monthStart: initial.monthStart,
    range: 'workdays',
    subject: 'all'
  };

  const els = {
    weekTitle: document.getElementById('weekTitle'),
    weekCount: document.getElementById('weekCount'),
    calendarHead: document.getElementById('calendarHead'),
    timeAxis: document.getElementById('timeAxis'),
    dayGrid: document.getElementById('dayGrid'),
    calendarMobile: document.getElementById('calendarMobile'),
    weekView: document.getElementById('weekView'),
    monthView: document.getElementById('monthView'),
    monthGrid: document.getElementById('monthGrid'),
    rangeSegment: document.getElementById('rangeSegment'),
    summaryPeriodLabel: document.getElementById('summaryPeriodLabel'),
    summarySessions: document.getElementById('summarySessions'),
    summaryHours: document.getElementById('summaryHours'),
    summaryCancelled: document.getElementById('summaryCancelled'),
    subjectFilter: document.getElementById('subjectFilter'),
    pendingList: document.getElementById('pendingList'),
    pendingCount: document.getElementById('pendingCount'),
    prevLabel: document.getElementById('prevLabel'),
    todayLabel: document.getElementById('todayLabel'),
    nextLabel: document.getElementById('nextLabel'),
    dialog: document.getElementById('eventDialog'),
    dialogSubject: document.getElementById('dialogSubject'),
    dialogTitle: document.getElementById('dialogTitle'),
    dialogDate: document.getElementById('dialogDate'),
    dialogTime: document.getElementById('dialogTime'),
    dialogStatus: document.getElementById('dialogStatus'),
    dialogNote: document.getElementById('dialogNote')
  };

  function parseDate(value) {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  }

  function formatDate(date) {
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
  }

  function firstOfMonth(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
  }

  function lastOfMonth(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
  }

  function startOfWeek(date) {
    const copy = new Date(date.getTime());
    const day = copy.getUTCDay();
    const offset = day === 0 ? -6 : 1 - day;
    copy.setUTCDate(copy.getUTCDate() + offset);
    return copy;
  }

  function getInitialState() {
    const params = new URLSearchParams(location.search);
    const requestedView = params.get('view') === 'month' ? 'month' : 'week';
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

    let weekStart = startOfWeek(today);
    const queryWeek = params.get('week');
    if (queryWeek && /^\d{4}-\d{2}-\d{2}$/.test(queryWeek)) {
      const parsed = parseDate(queryWeek);
      if (!Number.isNaN(parsed.getTime())) weekStart = startOfWeek(parsed);
    }

    let monthStart = firstOfMonth(today);
    const queryMonth = params.get('month');
    if (queryMonth && /^\d{4}-\d{2}$/.test(queryMonth)) {
      const parsed = parseDate(`${queryMonth}-01`);
      if (!Number.isNaN(parsed.getTime())) monthStart = parsed;
    } else if (queryWeek) {
      monthStart = firstOfMonth(weekStart);
    }

    return { view: requestedView, weekStart, monthStart };
  }

  function addDays(date, days) {
    return new Date(date.getTime() + days * DAY_MS);
  }

  function addMonths(date, months) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
  }

  function minutes(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  function durationHours(event) {
    return Math.max(0, minutes(event.end) - minutes(event.start)) / 60;
  }

  function subjectMatches(event) {
    return state.subject === 'all' || event.subject === state.subject;
  }

  function eventsBetween(start, end) {
    const startKey = formatDate(start);
    const endKey = formatDate(end);
    return scheduleEvents
      .filter(event => event.date >= startKey && event.date <= endKey)
      .filter(subjectMatches)
      .sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start));
  }

  function visibleDates() {
    const count = state.range === 'fullweek' ? 7 : 5;
    return Array.from({ length: count }, (_, i) => addDays(state.weekStart, i));
  }

  function visibleWeekEvents() {
    const dates = visibleDates();
    return eventsBetween(dates[0], dates[dates.length - 1]);
  }

  function visibleMonthEvents() {
    return eventsBetween(state.monthStart, lastOfMonth(state.monthStart));
  }

  function currentPeriodEvents() {
    return state.view === 'month' ? visibleMonthEvents() : visibleWeekEvents();
  }

  function renderTimeAxis() {
    const rows = [];
    for (let minute = START_MINUTE; minute <= END_MINUTE; minute += 60) {
      const top = ((minute - START_MINUTE) / (END_MINUTE - START_MINUTE)) * GRID_HEIGHT;
      const hour = String(Math.floor(minute / 60)).padStart(2, '0');
      const cls = minute === START_MINUTE ? 'time-label start' : 'time-label';
      rows.push(`<span class="${cls}" style="top:${top}px">${hour}:00</span>`);
    }
    els.timeAxis.innerHTML = rows.join('');
  }

  function renderHeader() {
    const dates = visibleDates();
    const columns = dates.length;
    els.calendarHead.style.gridTemplateColumns = `68px repeat(${columns}, minmax(0, 1fr))`;
    const today = new Date();
    const todayKey = formatDate(new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())));

    els.calendarHead.innerHTML = [
      '<div class="corner" aria-hidden="true"></div>',
      ...dates.map((date, index) => {
        const key = formatDate(date);
        const isToday = key === todayKey ? ' today' : '';
        return `<div class="day-head${isToday}"><span class="weekday">${weekdayNames[index]}</span><span class="date">${date.getUTCMonth() + 1}/${date.getUTCDate()}</span></div>`;
      })
    ].join('');
  }

  function eventClass(event) {
    if (event.status === 'cancelled') return `${event.subject} cancelled`;
    if (event.status === 'tentative') return `${event.subject} tentative`;
    return event.subject;
  }

  function eventStatusLabel(event) {
    if (event.status === 'cancelled') return '休讲';
    if (event.status === 'tentative') return '暂定线上';
    return '正常授课';
  }

  function eventButton(event) {
    const topMinute = Math.max(START_MINUTE, minutes(event.start));
    const endMinute = Math.min(END_MINUTE, minutes(event.end));
    const top = ((topMinute - START_MINUTE) / (END_MINUTE - START_MINUTE)) * GRID_HEIGHT;
    const height = Math.max(34, ((endMinute - topMinute) / (END_MINUTE - START_MINUTE)) * GRID_HEIGHT - 5);
    const subjectName = subjects[event.subject].name;
    const name = event.status === 'cancelled' ? `休讲 · ${subjectName}` : `${subjectName} · ${event.title}`;
    return `<button type="button" class="event ${eventClass(event)}" data-event-id="${event.id}" style="top:${top}px;height:${height}px" aria-label="${name} ${event.start}至${event.end}"><span class="event-time">${event.start}–${event.end}</span><span class="event-name">${name}</span><span class="event-topic">${event.topic}</span></button>`;
  }

  function renderGrid() {
    const dates = visibleDates();
    const events = visibleWeekEvents();
    els.dayGrid.style.gridTemplateColumns = `repeat(${dates.length}, minmax(0, 1fr))`;
    els.dayGrid.innerHTML = dates.map(date => {
      const key = formatDate(date);
      const dayEvents = events.filter(event => event.date === key);
      return `<div class="day-column" data-date="${key}">${dayEvents.map(eventButton).join('')}</div>`;
    }).join('');
  }

  function renderMobile() {
    const dates = visibleDates();
    const events = visibleWeekEvents();
    els.calendarMobile.innerHTML = dates.map((date, index) => {
      const key = formatDate(date);
      const dayEvents = events.filter(event => event.date === key);
      const body = dayEvents.length
        ? dayEvents.map(event => {
            const subjectName = subjects[event.subject].name;
            const line = event.status === 'cancelled' ? `休讲 · ${subjectName}` : `${subjectName} · ${event.title}`;
            return `<button type="button" class="mobile-event" data-event-id="${event.id}"><span class="mobile-event-time">${event.start}–${event.end}</span><span><strong>${line}</strong><p>${event.topic}</p></span></button>`;
          }).join('')
        : '<p class="mobile-empty">无课程</p>';
      return `<section class="mobile-day"><div class="mobile-day-head"><strong>周${shortWeekdayNames[index]} · ${date.getUTCMonth() + 1}月${date.getUTCDate()}日</strong><span>${dayEvents.length ? `${dayEvents.length} 项` : ''}</span></div><div class="mobile-events">${body}</div></section>`;
    }).join('');
  }

  function monthGridDates() {
    const first = state.monthStart;
    const last = lastOfMonth(first);
    const gridStart = startOfWeek(first);
    const lastDayIndex = (last.getUTCDay() + 6) % 7;
    const gridEnd = addDays(last, 6 - lastDayIndex);
    const count = Math.round((gridEnd - gridStart) / DAY_MS) + 1;
    return Array.from({ length: count }, (_, i) => addDays(gridStart, i));
  }

  function monthEventButton(event) {
    const subjectName = subjects[event.subject].name;
    const name = event.status === 'cancelled' ? `休讲 · ${subjectName}` : `${subjectName} · ${event.title}`;
    return `<button type="button" class="month-event ${eventClass(event)}" data-event-id="${event.id}" aria-label="${name} ${event.start}至${event.end}"><span class="month-event-top"><time>${event.start}</time><strong>${name}</strong></span><p>${event.topic}</p></button>`;
  }

  function renderMonth() {
    const dates = monthGridDates();
    const events = eventsBetween(dates[0], dates[dates.length - 1]);
    const currentMonth = state.monthStart.getUTCMonth();
    const today = new Date();
    const todayKey = formatDate(new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())));

    els.monthGrid.innerHTML = dates.map(date => {
      const key = formatDate(date);
      const dayEvents = events.filter(event => event.date === key);
      const outside = date.getUTCMonth() !== currentMonth ? ' outside' : '';
      const isToday = key === todayKey ? ' today' : '';
      const countLabel = dayEvents.length ? `<span class="month-day-count">${dayEvents.length} 项</span>` : '';
      return `<section class="month-day${outside}${isToday}" data-date="${key}"><div class="month-date-row"><span class="month-date">${date.getUTCDate()}</span>${countLabel}</div><div class="month-events">${dayEvents.map(monthEventButton).join('')}</div></section>`;
    }).join('');
  }

  function renderSummary() {
    const events = currentPeriodEvents();
    const teaching = events.filter(event => event.status !== 'cancelled');
    const cancelled = events.filter(event => event.status === 'cancelled');
    const hours = teaching.reduce((sum, event) => sum + durationHours(event), 0);
    els.summarySessions.textContent = `${teaching.length} 节`;
    els.summaryHours.textContent = `${Number.isInteger(hours) ? hours : hours.toFixed(1)} h`;
    els.summaryCancelled.textContent = String(cancelled.length);
    els.weekCount.textContent = `${teaching.length} 节授课${cancelled.length ? ` · ${cancelled.length} 项休讲` : ''}`;
    els.summaryPeriodLabel.textContent = state.view === 'month' ? '本月' : '本周';
  }

  function renderPeriodTitle() {
    if (state.view === 'month') {
      els.weekTitle.textContent = `${state.monthStart.getUTCFullYear()}年${state.monthStart.getUTCMonth() + 1}月`;
      return;
    }

    const end = addDays(state.weekStart, state.range === 'fullweek' ? 6 : 4);
    const sameMonth = state.weekStart.getUTCMonth() === end.getUTCMonth();
    els.weekTitle.textContent = sameMonth
      ? `${state.weekStart.getUTCFullYear()}年${state.weekStart.getUTCMonth() + 1}月${state.weekStart.getUTCDate()}日 – ${end.getUTCDate()}日`
      : `${state.weekStart.getUTCFullYear()}年${state.weekStart.getUTCMonth() + 1}月${state.weekStart.getUTCDate()}日 – ${end.getUTCMonth() + 1}月${end.getUTCDate()}日`;
  }

  function renderPending() {
    const showEnglish = state.subject === 'all' || state.subject === 'english';
    els.pendingCount.textContent = showEnglish ? String(pendingCourses.length) : '0';
    if (!showEnglish) {
      els.pendingList.innerHTML = '<p class="pending-more">当前筛选科目没有时间未定课程。</p>';
      return;
    }
    const preview = pendingCourses.slice(0, 5).map(item => `<div class="pending-item"><strong>共通英语阅读</strong><span>${item}</span></div>`).join('');
    els.pendingList.innerHTML = `${preview}<p class="pending-more">另有 ${pendingCourses.length - 5} 回，日期与时间确定后将自动加入日历。</p>`;
  }

  function renderViewControls() {
    const isMonth = state.view === 'month';
    els.weekView.hidden = isMonth;
    els.monthView.hidden = !isMonth;
    els.rangeSegment.hidden = isMonth;
    els.prevLabel.textContent = isMonth ? '上一月' : '上一周';
    els.todayLabel.textContent = isMonth ? '本月' : '本周';
    els.nextLabel.textContent = isMonth ? '下一月' : '下一周';
    document.querySelectorAll('[data-view]').forEach(button => {
      button.classList.toggle('active', button.dataset.view === state.view);
    });
  }

  function render() {
    renderViewControls();
    renderPeriodTitle();
    if (state.view === 'month') {
      renderMonth();
    } else {
      renderHeader();
      renderGrid();
      renderMobile();
    }
    renderSummary();
    renderPending();
    updateQuery();
  }

  function updateQuery() {
    const url = new URL(location.href);
    url.searchParams.set('view', state.view);
    if (state.view === 'month') {
      url.searchParams.set('month', `${state.monthStart.getUTCFullYear()}-${String(state.monthStart.getUTCMonth() + 1).padStart(2, '0')}`);
      url.searchParams.delete('week');
    } else {
      url.searchParams.set('week', formatDate(state.weekStart));
      url.searchParams.delete('month');
    }
    history.replaceState(null, '', url);
  }

  function openDialog(id) {
    const event = scheduleEvents.find(item => item.id === id);
    if (!event) return;
    const date = parseDate(event.date);
    const dayIndex = (date.getUTCDay() + 6) % 7;
    els.dialogSubject.textContent = subjects[event.subject].name;
    els.dialogTitle.textContent = event.status === 'cancelled' ? '休讲' : event.topic;
    els.dialogDate.textContent = `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日（${weekdayNames[dayIndex]}）`;
    els.dialogTime.textContent = `${event.start}–${event.end}`;
    els.dialogStatus.textContent = eventStatusLabel(event);
    els.dialogNote.textContent = event.status === 'cancelled' ? '本次课程休讲。' : `${event.title}｜${event.topic}`;
    els.dialog.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeDialog() {
    els.dialog.hidden = true;
    document.body.style.overflow = '';
  }

  document.getElementById('prevWeek').addEventListener('click', () => {
    if (state.view === 'month') state.monthStart = addMonths(state.monthStart, -1);
    else state.weekStart = addDays(state.weekStart, -7);
    render();
  });

  document.getElementById('nextWeek').addEventListener('click', () => {
    if (state.view === 'month') state.monthStart = addMonths(state.monthStart, 1);
    else state.weekStart = addDays(state.weekStart, 7);
    render();
  });

  document.getElementById('todayWeek').addEventListener('click', () => {
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    state.weekStart = startOfWeek(today);
    state.monthStart = firstOfMonth(today);
    render();
  });

  els.subjectFilter.addEventListener('change', event => {
    state.subject = event.target.value;
    render();
  });

  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      const nextView = button.dataset.view;
      if (nextView === state.view) return;
      if (nextView === 'month') state.monthStart = firstOfMonth(state.weekStart);
      else state.weekStart = startOfWeek(state.monthStart);
      state.view = nextView;
      render();
    });
  });

  document.querySelectorAll('[data-range]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-range]').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      state.range = button.dataset.range;
      render();
    });
  });

  document.addEventListener('click', event => {
    const eventButtonNode = event.target.closest('[data-event-id]');
    if (eventButtonNode) openDialog(eventButtonNode.dataset.eventId);
    if (event.target.closest('[data-close-dialog]')) closeDialog();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !els.dialog.hidden) closeDialog();
  });

  renderTimeAxis();
  render();
})();
