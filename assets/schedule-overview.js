(() => {
  'use strict';

  const courses = [
    {
      key: 'politics', type: '班课', name: '公共政治经济', teacher: '刘淼', mode: '线下', room: '待分配',
      meta: '周日 14:00–17:00',
      events: [
        ['2026-08-30',3,0],['2026-09-06',3,1],['2026-09-13',3,0],['2026-09-20',3,0],['2026-09-27',3,0],
        ['2026-10-04',3,1],['2026-10-11',3,0],['2026-10-18',3,0],['2026-10-25',3,0],
        ['2026-11-01',3,0],['2026-11-08',3,0],['2026-11-15',3,0],['2026-11-22',3,0]
      ]
    },
    {
      key: 'japanese', type: '班课', name: '国语', teacher: '刘淼', mode: '线下为主', room: '待分配',
      meta: '9/4暂定线上｜11月为止安排暂定',
      events: [
        ['2026-08-28',2,0],['2026-08-30',2,0],['2026-09-04',2,0],['2026-09-06',2,1],['2026-09-11',2,0],
        ['2026-09-13',2,0],['2026-09-18',2,0],['2026-09-20',2,0],['2026-10-02',2,1],['2026-10-04',2,1],
        ['2026-10-09',2,0],['2026-10-11',2,0],['2026-10-16',2,0],['2026-10-18',2,0],['2026-10-23',2,0],
        ['2026-10-25',2,0],['2026-10-30',2,0]
      ]
    },
    { key: 'english', type: '班课', name: '共通英语阅读', teacher: '刘淼', mode: '线下', room: '待分配', meta: '授课时间未定', events: null },
    {
      key: 'mathIIBC', type: '班课', name: '共通考试数学IIBC', teacher: '坂野健晟', mode: '网课', room: '无需教室',
      meta: '周一 19:00–21:00／周六 17:30–19:30',
      events: [
        ['2026-09-26',2,0],['2026-09-28',2,0],['2026-10-05',2,0],['2026-10-10',2,0],['2026-10-12',2,0],
        ['2026-10-17',2,0],['2026-10-19',2,0],['2026-10-24',2,0],['2026-10-26',2,0],['2026-10-31',2,0],
        ['2026-11-02',2,0],['2026-11-07',2,0],['2026-11-09',2,0],['2026-11-14',2,0],['2026-11-16',2,0],
        ['2026-11-21',2,0],['2026-11-23',2,0],['2026-11-28',2,0],['2026-11-30',2,0],['2026-12-05',2,0]
      ]
    },
    {
      key: 'geography', type: '班课', name: '共通考试地理', teacher: '丁玺', mode: '线下', room: '待分配',
      meta: '周日 09:00–12:00｜讲义・刷题一体',
      events: Array.from({length:20}, (_,i) => {
        const d = new Date(Date.UTC(2026,7,30) + i * 7 * 86400000);
        return [`${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`,3,0];
      })
    },
    { key: 'privatePhysics', type: '一对一', name: '魏思远物理一对一', teacher: '刘可惟', mode: '网课', room: '无需教室', meta: '8/30 15:00–17:00｜后续待定', events: [['2026-08-30',2,0]] }
  ];

  const els = {
    month: document.getElementById('courseOverviewMonth'), body: document.getElementById('courseOverviewBody'),
    monthTotal: document.getElementById('courseOverviewMonthTotal'), cumulativeTotal: document.getElementById('courseOverviewCumulativeTotal'),
    periodTitle: document.getElementById('weekTitle')
  };
  if (!els.month || !els.body || !els.monthTotal || !els.cumulativeTotal) return;

  const headRow = document.querySelector('.course-overview-table thead tr');
  if (headRow) headRow.innerHTML = '<th scope="col">类型</th><th scope="col">课程</th><th scope="col">授课老师</th><th scope="col">方式 / 教室</th><th scope="col">当月授课</th><th scope="col">累计授课</th>';
  const footLabel = document.querySelector('.course-overview-table tfoot th');
  if (footLabel) footLabel.colSpan = 4;

  if (!document.getElementById('courseLedgerDeliveryStyle')) {
    const style = document.createElement('style');
    style.id = 'courseLedgerDeliveryStyle';
    style.textContent = `
      .course-overview-table thead th:nth-child(1){width:92px}
      .course-overview-table thead th:nth-child(3){width:130px}
      .course-overview-table thead th:nth-child(4){width:132px;text-align:left}
      .course-overview-table thead th:nth-child(5),
      .course-overview-table thead th:nth-child(6){width:132px;text-align:right}
      .course-overview-delivery{font-size:12px;line-height:1.3}
      .course-overview-mode{display:block;color:var(--ink);font-weight:750}
      .course-overview-room{display:block;margin-top:2px;font-size:9px;font-weight:750}
      .course-overview-room.pending{color:#9a641f}
      .course-overview-room.online{color:var(--soft)}
      @media(max-width:760px){.course-overview-delivery{text-align:left}}
    `;
    document.head.append(style);
  }

  function selectedMonth() {
    const params = new URLSearchParams(location.search);
    const month = params.get('month');
    if (/^\d{4}-\d{2}$/.test(month || '')) return month;
    const week = params.get('week');
    if (/^\d{4}-\d{2}-\d{2}$/.test(week || '')) return week.slice(0, 7);
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  }

  function statsFor(course, month) {
    if (!course.events) return null;
    const cutoff = `${month}-99`;
    const valid = course.events.filter(([, , cancelled]) => !cancelled);
    const monthly = valid.filter(([date]) => date.startsWith(`${month}-`));
    const cumulative = valid.filter(([date]) => date <= cutoff);
    return {
      monthlyHours: monthly.reduce((sum,[,hours]) => sum + hours, 0), monthlySessions: monthly.length,
      cumulativeHours: cumulative.reduce((sum,[,hours]) => sum + hours, 0), cumulativeSessions: cumulative.length
    };
  }

  function hoursCell(hours, sessions, pending=false) {
    if (pending) return '<span class="course-overview-pending">—</span><small>时间未定</small>';
    return `${hours} h<small>${sessions} 回</small>`;
  }

  function deliveryCell(course) {
    const roomClass = course.room === '待分配' ? 'pending' : 'online';
    return `<span class="course-overview-mode">${course.mode}</span><small class="course-overview-room ${roomClass}">${course.room}</small>`;
  }

  function render() {
    const month = selectedMonth();
    const [year, number] = month.split('-');
    els.month.textContent = `${year}年${Number(number)}月`;
    let monthTotal = 0, cumulativeTotal = 0;
    els.body.innerHTML = courses.map(course => {
      const stats = statsFor(course, month);
      if (stats) { monthTotal += stats.monthlyHours; cumulativeTotal += stats.cumulativeHours; }
      return `<tr>
        <td data-label="类型"><span class="course-overview-type">${course.type}</span></td>
        <td data-label="课程"><div class="course-overview-course"><i class="course-overview-dot ${course.key}" aria-hidden="true"></i><div class="course-overview-name"><strong>${course.name}</strong><span>${course.meta}</span></div></div></td>
        <td data-label="授课老师"><span class="course-overview-teacher">${course.teacher}</span></td>
        <td data-label="方式 / 教室" class="course-overview-delivery">${deliveryCell(course)}</td>
        <td data-label="当月授课" class="course-overview-hours">${stats ? hoursCell(stats.monthlyHours,stats.monthlySessions) : hoursCell(0,0,true)}</td>
        <td data-label="累计授课" class="course-overview-hours">${stats ? hoursCell(stats.cumulativeHours,stats.cumulativeSessions) : hoursCell(0,0,true)}</td>
      </tr>`;
    }).join('');
    els.monthTotal.textContent = `${monthTotal} h`;
    els.cumulativeTotal.textContent = `${cumulativeTotal} h`;
  }

  render();
  if (els.periodTitle && 'MutationObserver' in window) new MutationObserver(render).observe(els.periodTitle,{childList:true,subtree:true,characterData:true});
  window.addEventListener('popstate',render);
})();