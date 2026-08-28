(() => {
  'use strict';

  const DAY_MS = 86400000;

  function parseDate(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  function formatDate(date) {
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
  }

  function addDays(date, days) {
    return new Date(date.getTime() + days * DAY_MS);
  }

  function weeklySeries(startDate, count, hours) {
    const start = parseDate(startDate);
    return Array.from({ length: count }, (_, index) => ({
      date: formatDate(addDays(start, index * 7)),
      hours,
      cancelled: false
    }));
  }

  const courses = [
    {
      key: 'politics',
      type: '班课',
      name: '公共政治经济',
      teacher: '刘淼',
      meta: '周日 14:00–17:00',
      events: [
        ['2026-08-30', 3, false],
        ['2026-09-06', 3, true],
        ['2026-09-13', 3, false],
        ['2026-09-20', 3, false],
        ['2026-09-27', 3, false],
        ['2026-10-04', 3, true],
        ['2026-10-11', 3, false],
        ['2026-10-18', 3, false],
        ['2026-10-25', 3, false],
        ['2026-11-01', 3, false],
        ['2026-11-08', 3, false],
        ['2026-11-15', 3, false],
        ['2026-11-22', 3, false]
      ].map(([date, hours, cancelled]) => ({ date, hours, cancelled }))
    },
    {
      key: 'japanese',
      type: '班课',
      name: '国语',
      teacher: '刘淼',
      meta: '11月为止课程安排暂定',
      events: [
        ['2026-08-28', 2, false],
        ['2026-08-30', 2, false],
        ['2026-09-04', 2, false],
        ['2026-09-06', 2, true],
        ['2026-09-11', 2, false],
        ['2026-09-13', 2, false],
        ['2026-09-18', 2, false],
        ['2026-09-20', 2, false],
        ['2026-10-02', 2, true],
        ['2026-10-04', 2, true],
        ['2026-10-09', 2, false],
        ['2026-10-11', 2, false],
        ['2026-10-16', 2, false],
        ['2026-10-18', 2, false],
        ['2026-10-23', 2, false],
        ['2026-10-25', 2, false],
        ['2026-10-30', 2, false]
      ].map(([date, hours, cancelled]) => ({ date, hours, cancelled }))
    },
    {
      key: 'english',
      type: '班课',
      name: '共通英语阅读',
      teacher: '刘淼',
      meta: '授课时间未定',
      events: null
    },
    {
      key: 'geography',
      type: '班课',
      name: '共通考试地理',
      teacher: '丁玺',
      meta: '线下｜周日 09:00–12:00',
      events: weeklySeries('2026-08-30', 20, 3)
    },
    {
      key: 'privatePhysics',
      type: '一对一',
      name: '魏思远物理一对一',
      teacher: '刘可惟',
      meta: '网课｜周日 15:00–17:00',
      events: weeklySeries('2026-08-30', 20, 2)
    }
  ];

  const els = {
    month: document.getElementById('courseOverviewMonth'),
    body: document.getElementById('courseOverviewBody'),
    monthTotal: document.getElementById('courseOverviewMonthTotal'),
    cumulativeTotal: document.getElementById('courseOverviewCumulativeTotal'),
    periodTitle: document.getElementById('weekTitle')
  };

  if (!els.month || !els.body || !els.monthTotal || !els.cumulativeTotal) return;

  function selectedMonth() {
    const params = new URLSearchParams(location.search);
    const month = params.get('month');
    if (/^\d{4}-\d{2}$/.test(month || '')) return month;

    const week = params.get('week');
    if (/^\d{4}-\d{2}-\d{2}$/.test(week || '')) return week.slice(0, 7);

    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  function statsFor(course, month) {
    if (!course.events) return null;
    const monthPrefix = `${month}-`;
    const cutoff = `${month}-99`;
    const validEvents = course.events.filter(event => !event.cancelled);
    const monthly = validEvents.filter(event => event.date.startsWith(monthPrefix));
    const cumulative = validEvents.filter(event => event.date <= cutoff);
    return {
      monthlyHours: monthly.reduce((sum, event) => sum + event.hours, 0),
      monthlySessions: monthly.length,
      cumulativeHours: cumulative.reduce((sum, event) => sum + event.hours, 0),
      cumulativeSessions: cumulative.length
    };
  }

  function hoursCell(hours, sessions, pending = false) {
    if (pending) return '<span class="course-overview-pending">—</span><small>时间未定</small>';
    return `${hours} h<small>${sessions} 回</small>`;
  }

  function render() {
    const month = selectedMonth();
    const [year, monthNumber] = month.split('-');
    els.month.textContent = `${year}年${Number(monthNumber)}月`;

    let monthTotal = 0;
    let cumulativeTotal = 0;

    els.body.innerHTML = courses.map(course => {
      const stats = statsFor(course, month);
      if (stats) {
        monthTotal += stats.monthlyHours;
        cumulativeTotal += stats.cumulativeHours;
      }

      return `
        <tr>
          <td data-label="类型"><span class="course-overview-type">${course.type}</span></td>
          <td data-label="课程">
            <div class="course-overview-course">
              <i class="course-overview-dot ${course.key}" aria-hidden="true"></i>
              <div class="course-overview-name"><strong>${course.name}</strong><span>${course.meta}</span></div>
            </div>
          </td>
          <td data-label="授课老师"><span class="course-overview-teacher">${course.teacher}</span></td>
          <td data-label="当月授课" class="course-overview-hours">${stats ? hoursCell(stats.monthlyHours, stats.monthlySessions) : hoursCell(0, 0, true)}</td>
          <td data-label="累计授课" class="course-overview-hours">${stats ? hoursCell(stats.cumulativeHours, stats.cumulativeSessions) : hoursCell(0, 0, true)}</td>
        </tr>`;
    }).join('');

    els.monthTotal.textContent = `${monthTotal} h`;
    els.cumulativeTotal.textContent = `${cumulativeTotal} h`;
  }

  render();

  if (els.periodTitle && 'MutationObserver' in window) {
    const observer = new MutationObserver(render);
    observer.observe(els.periodTitle, { childList: true, subtree: true, characterData: true });
  }

  window.addEventListener('popstate', render);
})();
