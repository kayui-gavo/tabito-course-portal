(() => {
  'use strict';

  const winter = window.TabitoWinter2026;
  const courses = winter.courses.map(course => ({
    ...course,
    mode: course.mode,
    room: ['线下','线下＋线上同步'].includes(course.mode) ? '待分配' : '无需教室',
    events: winter.events.filter(event => event.subject === course.key)
      .map(event => [event.date, (Number(event.end.slice(0,2))*60+Number(event.end.slice(3))
        -Number(event.start.slice(0,2))*60-Number(event.start.slice(3)))/60, event.status === 'cancelled' ? 1 : 0])
  }));
  courses.push({key:'english',type:'班课',name:'共通英语阅读',teacher:'刘淼',mode:'网课',room:'无需教室',meta:'授课时间待定',events:null});
  courses.push({key:'privatePhysics',type:'一对一',name:'魏思远物理一对一',teacher:'刘可惟',mode:'线下',room:'待分配',meta:'8/30 15:00–17:00｜后续待定',events:[['2026-08-30',2,0]]});

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
      .course-overview-table thead th:nth-child(3){width:150px}
      .course-overview-table thead th:nth-child(4){width:150px;text-align:left}
      .course-overview-table thead th:nth-child(5),
      .course-overview-table thead th:nth-child(6){width:132px;text-align:right}
      .course-overview-delivery{font-size:12px;line-height:1.3}
      .course-overview-mode{display:block;color:var(--ink);font-weight:750}
      .course-overview-room{display:block;margin-top:2px;font-size:9px;font-weight:750}
      .course-overview-room.pending{color:#9a641f}
      .course-overview-room.online{color:var(--soft)}
      .course-overview-dot.commonPhysics{background:#496d8b}
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