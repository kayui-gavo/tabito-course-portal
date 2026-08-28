(() => {
  'use strict';

  const subjects = {
    politics: { name: '公共政治经济', teacher: '刘淼' },
    japanese: { name: '国语', teacher: '刘淼' },
    english: { name: '共通英语阅读', teacher: '刘淼' },
    geography: { name: '共通考试地理', teacher: '丁玺', mode: '线下' },
    privatePhysics: { name: '魏思远物理一对一', teacher: '刘可惟', mode: '网课' }
  };

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
    { id: 'jp-03', subject: 'japanese', date: '2026-09-04', start: '14:00', end: '16:00', title: '第3回', topic: '基础现代文练习1', status: 'tentative', mode: '暂定线上' },
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
    { id: 'jp-14', subject: 'japanese', date: '2026-10-30', start: '14:00', end: '16:00', title: '第14回', topic: '2022年评论', status: 'normal' },

    { id: 'geo-01', subject: 'geography', date: '2026-08-30', start: '09:00', end: '12:00', title: '第1回', topic: '大地形', status: 'normal' },
    { id: 'geo-02', subject: 'geography', date: '2026-09-06', start: '09:00', end: '12:00', title: '第2回', topic: '小地形', status: 'normal' },
    { id: 'geo-03', subject: 'geography', date: '2026-09-13', start: '09:00', end: '12:00', title: '第3回', topic: '气候・植生・土壤', status: 'normal' },
    { id: 'geo-04', subject: 'geography', date: '2026-09-20', start: '09:00', end: '12:00', title: '第4回', topic: '农业', status: 'normal' },
    { id: 'geo-05', subject: 'geography', date: '2026-09-27', start: '09:00', end: '12:00', title: '第5回', topic: '工业', status: 'normal' },
    { id: 'geo-06', subject: 'geography', date: '2026-10-04', start: '09:00', end: '12:00', title: '第6回', topic: '文化・宗教・语言／民族・纷争', status: 'normal' },
    { id: 'geo-07', subject: 'geography', date: '2026-10-11', start: '09:00', end: '12:00', title: '第7回', topic: '人口・村落・都市／商业・交通', status: 'normal' },
    { id: 'geo-08', subject: 'geography', date: '2026-10-18', start: '09:00', end: '12:00', title: '第8回', topic: '日本地理', status: 'normal' },
    { id: 'geo-09', subject: 'geography', date: '2026-10-25', start: '09:00', end: '12:00', title: '第9回', topic: '地形 专题演习', status: 'normal' },
    { id: 'geo-10', subject: 'geography', date: '2026-11-01', start: '09:00', end: '12:00', title: '第10回', topic: '气候・植生・土壤 专题演习', status: 'normal' },
    { id: 'geo-11', subject: 'geography', date: '2026-11-08', start: '09:00', end: '12:00', title: '第11回', topic: '农业 专题演习', status: 'normal' },
    { id: 'geo-12', subject: 'geography', date: '2026-11-15', start: '09:00', end: '12:00', title: '第12回', topic: '工业 专题演习', status: 'normal' },
    { id: 'geo-13', subject: 'geography', date: '2026-11-22', start: '09:00', end: '12:00', title: '第13回', topic: '人文地理 专题演习', status: 'normal' },
    { id: 'geo-14', subject: 'geography', date: '2026-11-29', start: '09:00', end: '12:00', title: '第14回', topic: '地形图・图法 专题演习', status: 'normal' },
    { id: 'geo-15', subject: 'geography', date: '2026-12-06', start: '09:00', end: '12:00', title: '第15回', topic: '地域地理 专题演习', status: 'normal' },
    { id: 'geo-16', subject: 'geography', date: '2026-12-13', start: '09:00', end: '12:00', title: '第16回', topic: '2023 地理 本试＋追试', status: 'normal' },
    { id: 'geo-17', subject: 'geography', date: '2026-12-20', start: '09:00', end: '12:00', title: '第17回', topic: '2024 地理 本试＋追试', status: 'normal' },
    { id: 'geo-18', subject: 'geography', date: '2026-12-27', start: '09:00', end: '12:00', title: '第18回', topic: '2025 旧地理B 本试＋追试', status: 'normal' },
    { id: 'geo-19', subject: 'geography', date: '2027-01-03', start: '09:00', end: '12:00', title: '第19回', topic: '2025 地理 本试＋追试', status: 'normal' },
    { id: 'geo-20', subject: 'geography', date: '2027-01-10', start: '09:00', end: '12:00', title: '第20回', topic: '2026 地理 本试＋追试', status: 'normal' },

    { id: 'private-physics-01', subject: 'privatePhysics', date: '2026-08-30', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-02', subject: 'privatePhysics', date: '2026-09-06', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-03', subject: 'privatePhysics', date: '2026-09-13', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-04', subject: 'privatePhysics', date: '2026-09-20', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-05', subject: 'privatePhysics', date: '2026-09-27', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-06', subject: 'privatePhysics', date: '2026-10-04', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-07', subject: 'privatePhysics', date: '2026-10-11', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-08', subject: 'privatePhysics', date: '2026-10-18', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-09', subject: 'privatePhysics', date: '2026-10-25', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-10', subject: 'privatePhysics', date: '2026-11-01', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-11', subject: 'privatePhysics', date: '2026-11-08', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-12', subject: 'privatePhysics', date: '2026-11-15', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-13', subject: 'privatePhysics', date: '2026-11-22', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-14', subject: 'privatePhysics', date: '2026-11-29', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-15', subject: 'privatePhysics', date: '2026-12-06', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-16', subject: 'privatePhysics', date: '2026-12-13', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-17', subject: 'privatePhysics', date: '2026-12-20', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-18', subject: 'privatePhysics', date: '2026-12-27', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-19', subject: 'privatePhysics', date: '2027-01-03', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' },
    { id: 'private-physics-20', subject: 'privatePhysics', date: '2027-01-10', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' }
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

  installSubjectUI();

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
    dialogTeacher: document.getElementById('dialogTeacher'),
    dialogMode: document.getElementById('dialogMode'),
    dialogStatus: document.getElementById('dialogStatus'),
    dialogNote: document.getElementById('dialogNote')
  };

  function installSubjectUI() {
    const filter = document.getElementById('subjectFilter');
    if (filter) {
      [
        ['geography', '共通考试地理'],
        ['privatePhysics', '魏思远物理一对一']
      ].forEach(([value, label]) => {
        if (!filter.querySelector(`option[value="${value}"]`)) {
          const option = document.createElement('option');
          option.value = value;
          option.textContent = label;
          filter.append(option);
        }
      });
    }

    const divider = document.querySelector('.legend-divider');
    if (divider) {
      [
        ['geography', '共通考试地理'],
        ['privatePhysics', '魏思远物理一对一']
      ].forEach(([cls, label]) => {
        if (!document.querySelector(`.subject-legend.${cls}`)) {
          const span = document.createElement('span');
          span.className = `legend-item subject-legend ${cls}`;
          span.innerHTML = `<i></i>${label}`;
          divider.before(span);
        }
      });
    }

    if (!document.getElementById('scheduleSubjectPatch')) {
      const style = document.createElement('style');
      style.id = 'scheduleSubjectPatch';
      style.textContent = `
        :root {
          --geography: #8a6a3f;
          --geography-bg: #f7f1e8;
          --private-physics: #695f8d;
          --private-physics-bg: #f1eff7;
        }
        .subject-legend.geography i { background: var(--geography); }
        .subject-legend.privatePhysics i { background: var(--private-physics); }
        .event.geography { border-color: #d9c8af; border-left-color: var(--geography); background: var(--geography-bg); }
        .event.privatePhysics { border-color: #cbc4df; border-left-color: var(--private-physics); background: var(--private-physics-bg); }
        .month-event.geography { border-left-color: var(--geography); background: var(--geography-bg); }
        .month-event.privatePhysics { border-left-color: var(--private-physics); background: var(--private-physics-bg); }
        .event-meta, .month-event-meta, .mobile-event-meta {
          color: rgba(24,34,48,.58);
          font-weight: 650;
        }
        .event-meta {
          display: block;
          margin-top: 2px;
          font-size: 9px;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .month-event-meta {
          display: block;
          margin-top: 2px;
          font-size: 8.5px;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mobile-event-meta { display: block; margin-top: 2px; font-size: 11px; }
      `;
      document.head.append(style);
    }
  }

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

  function eventTeacher(event) {
    return event.teacher || subjects[event.subject]?.teacher || '';
  }

  function eventMode(event) {
    return event.mode || subjects[event.subject]?.mode || '';
  }

  function eventMeta(event) {
    return [eventTeacher(event), eventMode(event)].filter(Boolean).join(' · ');
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
    els.calendarHead.style.gridTemplateColumns = `68px repeat(${dates.length}, minmax(0, 1fr))`;
    const now = new Date();
    const todayKey = formatDate(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));

    els.calendarHead.innerHTML = [
      '<div class="corner" aria-hidden="true"></div>',
      ...dates.map((date, index) => {
        const isToday = formatDate(date) === todayKey ? ' today' : '';
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

  function eventsOverlap(a, b) {
    return minutes(a.start) < minutes(b.end) && minutes(b.start) < minutes(a.end);
  }

  function layoutDayEvents(dayEvents) {
    const sorted = [...dayEvents].sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end));
    const result = [];
    let group = [];
    let groupEnd = -1;

    const flush = () => {
      if (!group.length) return;
      const columnEnds = [];
      const placed = group.map(event => {
        const start = minutes(event.start);
        const end = minutes(event.end);
        let column = columnEnds.findIndex(value => value <= start);
        if (column === -1) {
          column = columnEnds.length;
          columnEnds.push(end);
        } else {
          columnEnds[column] = end;
        }
        return { event, column };
      });
      const columns = Math.max(1, columnEnds.length);
      placed.forEach(item => result.push({ ...item, columns }));
      group = [];
      groupEnd = -1;
    };

    sorted.forEach(event => {
      const start = minutes(event.start);
      const end = minutes(event.end);
      if (group.length && start >= groupEnd) flush();
      group.push(event);
      groupEnd = Math.max(groupEnd, end);
    });
    flush();
    return result;
  }

  function eventButton(event, layout = { column: 0, columns: 1 }) {
    const topMinute = Math.max(START_MINUTE, minutes(event.start));
    const endMinute = Math.min(END_MINUTE, minutes(event.end));
    const top = ((topMinute - START_MINUTE) / (END_MINUTE - START_MINUTE)) * GRID_HEIGHT;
    const height = Math.max(34, ((endMinute - topMinute) / (END_MINUTE - START_MINUTE)) * GRID_HEIGHT - 5);
    const subjectName = subjects[event.subject].name;
    const name = event.status === 'cancelled' ? `休讲 · ${subjectName}` : `${subjectName} · ${event.title}`;
    const width = 100 / layout.columns;
    const left = layout.column * width;
    const style = `top:${top}px;height:${height}px;left:calc(${left}% + 4px);right:auto;width:calc(${width}% - 8px)`;
    const meta = eventMeta(event);
    return `<button type="button" class="event ${eventClass(event)}" data-event-id="${event.id}" style="${style}" aria-label="${name} ${event.start}至${event.end}"><span class="event-time">${event.start}–${event.end}</span><span class="event-name">${name}</span><span class="event-topic">${event.topic}</span>${meta ? `<span class="event-meta">${meta}</span>` : ''}</button>`;
  }

  function renderGrid() {
    const dates = visibleDates();
    const events = visibleWeekEvents();
    els.dayGrid.style.gridTemplateColumns = `repeat(${dates.length}, minmax(0, 1fr))`;
    els.dayGrid.innerHTML = dates.map(date => {
      const key = formatDate(date);
      const dayEvents = events.filter(event => event.date === key);
      const laidOut = layoutDayEvents(dayEvents);
      return `<div class="day-column" data-date="${key}">${laidOut.map(item => eventButton(item.event, item)).join('')}</div>`;
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
            const meta = eventMeta(event);
            return `<button type="button" class="mobile-event" data-event-id="${event.id}"><span class="mobile-event-time">${event.start}–${event.end}</span><span><strong>${line}</strong><p>${event.topic}</p>${meta ? `<span class="mobile-event-meta">${meta}</span>` : ''}</span></button>`;
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
    const meta = eventMeta(event);
    return `<button type="button" class="month-event ${eventClass(event)}" data-event-id="${event.id}" aria-label="${name} ${event.start}至${event.end}"><span class="month-event-top"><time>${event.start}</time><strong>${name}</strong></span><p>${event.topic}</p>${meta ? `<span class="month-event-meta">${meta}</span>` : ''}</button>`;
  }

  function renderMonth() {
    const dates = monthGridDates();
    const events = eventsBetween(dates[0], dates[dates.length - 1]);
    const currentMonth = state.monthStart.getUTCMonth();
    const now = new Date();
    const todayKey = formatDate(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));

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
    const preview = pendingCourses.slice(0, 5).map(item => `<div class="pending-item"><strong>共通英语阅读 · 刘淼</strong><span>${item}</span></div>`).join('');
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
    if (state.subject === 'all') url.searchParams.delete('subject');
    else url.searchParams.set('subject', state.subject);
    history.replaceState(null, '', url);
  }

  function openDialog(id) {
    const event = scheduleEvents.find(item => item.id === id);
    if (!event) return;
    const date = parseDate(event.date);
    const dayIndex = (date.getUTCDay() + 6) % 7;
    const teacher = eventTeacher(event);
    const mode = eventMode(event);
    els.dialogSubject.textContent = subjects[event.subject].name;
    els.dialogTitle.textContent = event.status === 'cancelled' ? '休讲' : event.topic;
    els.dialogDate.textContent = `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日（${weekdayNames[dayIndex]}）`;
    els.dialogTime.textContent = `${event.start}–${event.end}`;
    if (els.dialogTeacher) els.dialogTeacher.textContent = teacher || '—';
    if (els.dialogMode) els.dialogMode.textContent = mode || '—';
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

  const params = new URLSearchParams(location.search);
  const requestedSubject = params.get('subject');
  if (requestedSubject && subjects[requestedSubject]) {
    state.subject = requestedSubject;
    els.subjectFilter.value = requestedSubject;
  }

  renderTimeAxis();
  render();
})();
