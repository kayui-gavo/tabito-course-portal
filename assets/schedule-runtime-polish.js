(() => {
  'use strict';

  const OLD_NAME = '金老师';
  const NEW_NAME = '金龙熙';
  const MATHIA_KEY = 'mathIA';
  const MATHIA_NAME = '数学IA';
  const MATHIA_TEACHER = '脇村 剛';
  const MATHIA_MODE = '网课';
  const DAY_MS = 86400000;
  const TIMELINE_START = 9 * 60;
  const TIMELINE_END = 22 * 60;
  const TIMELINE_HEIGHT = 758;

  const MATHIA_EVENTS = [
    ['mathia-01','2026-09-23','20:00','22:00','第1回','式的结构与高次式变形'],
    ['mathia-02','2026-09-25','20:00','22:00','第2回','不等式、绝对值与取值范围'],
    ['mathia-03','2026-09-30','20:00','22:00','第3回','集合与命题综合'],
    ['mathia-04','2026-10-02','20:00','22:00','第4回','图像与参数'],
    ['mathia-05','2026-10-07','20:00','22:00','第5回','最大值、最小值与定义域'],
    ['mathia-06','2026-10-09','20:00','22:00','第6回','方程、不等式与图像'],
    ['mathia-07','2026-10-14','20:00','22:00','第7回','根的分布、参数问题'],
    ['mathia-08','2026-10-16','20:00','22:00','第8回','二次函数综合练习'],
    ['mathia-09','2026-10-21','20:00','22:00','第9回','代表值、方差的应用'],
    ['mathia-10','2026-10-23','20:00','22:00','第10回','箱线图、散点图与相关'],
    ['mathia-11','2026-10-28','20:00','22:00','第11回','数据分析综合练习'],
    ['mathia-12','2026-10-30','20:00','22:00','第12回','三角比复习'],
    ['mathia-13','2026-11-04','20:00','22:00','第13回','正弦定理、余弦定理与面积'],
    ['mathia-14','2026-11-06','20:00','22:00','第14回','复合图形的度量'],
    ['mathia-15','2026-11-11','20:00','22:00','第15回','图形与测量综合练习'],
    ['mathia-16','2026-11-13','20:00','22:00','第16回','三角形的性质与比例'],
    ['mathia-17','2026-11-18','20:00','22:00','第17回','圆的性质'],
    ['mathia-18','2026-11-20','20:00','22:00','第18回','图形性质综合练习'],
    ['mathia-19','2026-11-25','20:00','22:00','第19回','计数、排列'],
    ['mathia-20','2026-11-27','20:00','22:00','第20回','组合与选取'],
    ['mathia-21','2026-12-02','20:00','22:00','第21回','概率、条件概率'],
    ['mathia-22','2026-12-04','20:00','22:00','第22回','概率综合练习'],
    ['mathia-23','2026-12-09','20:00','22:00','第23回','跨领域综合练习'],
    ['mathia-24','2026-12-11','20:00','22:00','第24回','跨领域综合练习']
  ].map(([id,date,start,end,title,topic]) => ({id,date,start,end,title,topic}));
  const MATHIA_BY_ID = new Map(MATHIA_EVENTS.map(event => [event.id, event]));

  const REMOVED_EVENTS = new Set(['jp-09', 'jp-11', 'jp-13']);
  const EVENT_OVERRIDES = new Map([
    ['jp-08', { start: '13:40', end: '16:40', title: '第8回', topic: '小说读解技巧，基础现代文练习5・6' }],
    ['jp-10', { start: '13:40', end: '16:40', title: '第9回', topic: '2020年评论・小说' }],
    ['jp-12', { start: '13:40', end: '16:40', title: '第10回', topic: '2021年评论・小说' }],
    ['jp-14', { start: '13:40', end: '16:40', title: '第11回', topic: '2022年评论' }],
    ...Array.from({length:18}, (_,i) => [`geo-${String(i + 3).padStart(2,'0')}`, { start: '18:00', end: '21:00' }])
  ]);

  const minutes = value => {
    const [h,m] = String(value).split(':').map(Number);
    return h * 60 + m;
  };
  const parseDate = value => {
    const [y,m,d] = value.split('-').map(Number);
    return new Date(Date.UTC(y,m-1,d));
  };
  const formatDate = date => `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;
  const addDays = (date, days) => new Date(date.getTime() + days * DAY_MS);
  const escapeHtml = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

  function installStyle() {
    if (document.getElementById('scheduleRuntimePolishV6')) return;
    document.getElementById('scheduleRuntimePolishV5')?.remove();
    document.getElementById('scheduleRuntimePolishV4')?.remove();
    const style = document.createElement('style');
    style.id = 'scheduleRuntimePolishV6';
    style.textContent = `
      :root{--math-ia:#7a5d8e;--math-ia-bg:#f4f0f7}
      .subject-legend.mathIA i{background:var(--math-ia)}
      .event.mathIA{border-color:#d6cbe0;border-left-color:var(--math-ia);background:var(--math-ia-bg)}
      .month-event.mathIA{border-left-color:var(--math-ia);background:var(--math-ia-bg)}
      .mobile-event.mathIA{border-left:3px solid var(--math-ia);padding-left:8px}
      .time-axis,.day-grid{height:${TIMELINE_HEIGHT}px!important}
      .day-column{background-size:100% 58.3077px!important}
      .day-column::after{background-size:100% 116.6154px!important}
      .course-overview-dot.mathIA{background:var(--math-ia)}
    `;
    document.head.append(style);
  }

  function ensureUiOptions() {
    const subject = document.getElementById('subjectFilter');
    if (subject && !subject.querySelector(`option[value="${MATHIA_KEY}"]`)) {
      const option = document.createElement('option');
      option.value = MATHIA_KEY;
      option.textContent = MATHIA_NAME;
      subject.insertBefore(option, subject.querySelector('option[value="mathIIBC"]') || null);
    }
    const teacher = document.getElementById('teacherFilter');
    if (teacher && ![...teacher.options].some(option => option.value === MATHIA_TEACHER)) {
      teacher.add(new Option(MATHIA_TEACHER, MATHIA_TEACHER));
    }
    const legend = document.querySelector('.office-legend');
    if (legend && !legend.querySelector('.subject-legend.mathIA')) {
      const item = document.createElement('span');
      item.className = 'legend-item subject-legend mathIA';
      item.innerHTML = '<i></i>数学IA';
      legend.insertBefore(item, legend.querySelector('.subject-legend.mathIIBC') || legend.querySelector('.legend-divider'));
    }
    const requested = new URL(location.href).searchParams.get('subject');
    if (requested === MATHIA_KEY && subject && subject.value !== MATHIA_KEY) {
      subject.value = MATHIA_KEY;
      subject.dispatchEvent(new Event('change', {bubbles:true}));
    }
  }

  function replaceTeacherNames() {
    document.querySelectorAll('[data-teacher]').forEach(node => {
      if (node.dataset.teacher === OLD_NAME) node.dataset.teacher = NEW_NAME;
    });
    ['#dialogTeacher','.event-meta','.month-event-meta','.mobile-event-meta','.course-overview-teacher','.followup-main span']
      .forEach(selector => document.querySelectorAll(selector).forEach(node => {
        if (node.textContent.includes(OLD_NAME)) node.textContent = node.textContent.replaceAll(OLD_NAME, NEW_NAME);
      }));
  }

  function applyExistingScheduleOverrides() {
    REMOVED_EVENTS.forEach(id => document.querySelectorAll(`[data-event-id="${id}"]`).forEach(node => node.remove()));
    EVENT_OVERRIDES.forEach((override,id) => {
      document.querySelectorAll(`[data-event-id="${id}"]`).forEach(node => {
        const timeNode = node.querySelector('.event-time,.mobile-event-time,.month-event-top time');
        const nextTime = override.start && override.end ? `${override.start}–${override.end}` : '';
        if (timeNode && nextTime && timeNode.textContent !== nextTime) timeNode.textContent = nextTime;
        if (override.title) {
          const name = node.querySelector('.event-name,.month-event-top strong,.mobile-event strong');
          if (name && !name.textContent.endsWith(override.title)) {
            const subject = name.textContent.includes('·') ? name.textContent.split('·')[0].trim() : '国语';
            name.textContent = `${subject} · ${override.title}`;
          }
        }
        if (override.topic) {
          const topic = node.querySelector('.event-topic,.month-event p,.mobile-event p');
          if (topic && topic.textContent !== override.topic) topic.textContent = override.topic;
        }
        if (override.start && override.end) {
          const aria = node.getAttribute('aria-label') || '';
          const next = aria.replace(/\d{1,2}:\d{2}至\d{1,2}:\d{2}/, `${override.start}至${override.end}`);
          if (next !== aria) node.setAttribute('aria-label', next);
        }
      });
    });
  }

  const timelineTop = start => ((minutes(start)-TIMELINE_START)/(TIMELINE_END-TIMELINE_START))*TIMELINE_HEIGHT;
  const timelineHeight = (start,end) => Math.max(34,((minutes(end)-minutes(start))/(TIMELINE_END-TIMELINE_START))*TIMELINE_HEIGHT-5);

  function rescaleWeekTimeline() {
    const axis = document.getElementById('timeAxis');
    if (axis) {
      axis.querySelectorAll('.time-label').forEach(label => {
        const match = label.textContent.match(/(\d{1,2}):00/);
        if (!match) return;
        const top = ((Number(match[1])*60-TIMELINE_START)/(TIMELINE_END-TIMELINE_START))*TIMELINE_HEIGHT;
        if (label.style.top !== `${top}px`) label.style.top = `${top}px`;
      });
      if (!axis.querySelector('[data-runtime-22]')) {
        const label = document.createElement('span');
        label.className = 'time-label';
        label.dataset.runtime22 = '1';
        label.style.top = `${TIMELINE_HEIGHT}px`;
        label.textContent = '22:00';
        axis.append(label);
      }
    }
    document.querySelectorAll('#dayGrid .event[data-event-id]').forEach(node => {
      const match = (node.querySelector('.event-time')?.textContent || '').match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
      if (!match) return;
      const top = `${timelineTop(match[1])}px`;
      const height = `${timelineHeight(match[1],match[2])}px`;
      if (node.style.top !== top) node.style.top = top;
      if (node.style.height !== height) node.style.height = height;
    });
  }

  const shouldShowMathIA = () => ['all',MATHIA_KEY].includes(document.getElementById('subjectFilter')?.value || 'all');

  function mathWeekButton(event) {
    return `<button type="button" class="event mathIA" data-event-id="${event.id}" data-teacher="${escapeHtml(MATHIA_TEACHER)}" data-mode="${MATHIA_MODE}" style="top:${timelineTop(event.start)}px;height:${timelineHeight(event.start,event.end)}px;left:4px;right:auto;width:calc(100% - 8px)" aria-label="数学IA ${event.title} ${event.start}至${event.end}"><span class="event-time">${event.start}–${event.end}</span><span class="event-name">数学IA · ${event.title}</span><span class="event-topic">${escapeHtml(event.topic)}</span><span class="event-meta">${escapeHtml(MATHIA_TEACHER)} · ${MATHIA_MODE}</span></button>`;
  }
  function mathMonthButton(event) {
    return `<button type="button" class="month-event mathIA" data-event-id="${event.id}" data-teacher="${escapeHtml(MATHIA_TEACHER)}" data-mode="${MATHIA_MODE}"><span class="month-event-top"><time>${event.start}</time><strong>数学IA · ${event.title}</strong></span><p>${escapeHtml(event.topic)}</p><span class="month-event-meta">${escapeHtml(MATHIA_TEACHER)} · ${MATHIA_MODE}</span></button>`;
  }
  function mathMobileButton(event) {
    return `<button type="button" class="mobile-event mathIA" data-event-id="${event.id}" data-teacher="${escapeHtml(MATHIA_TEACHER)}" data-mode="${MATHIA_MODE}"><span class="mobile-event-time">${event.start}–${event.end}</span><span><strong>数学IA · ${event.title}</strong><p>${escapeHtml(event.topic)}</p><span class="mobile-event-meta">${escapeHtml(MATHIA_TEACHER)} · ${MATHIA_MODE}</span></span></button>`;
  }

  function injectMathIA() {
    if (!shouldShowMathIA()) return;
    const monthVisible = document.getElementById('monthView')?.hidden === false;
    if (monthVisible) {
      document.querySelectorAll('#monthGrid .month-day[data-date]').forEach(day => {
        const event = MATHIA_EVENTS.find(item => item.date === day.dataset.date);
        if (!event || day.querySelector(`[data-event-id="${event.id}"]`)) return;
        day.querySelector('.month-events')?.insertAdjacentHTML('beforeend', mathMonthButton(event));
        const total = day.querySelectorAll('.month-event[data-event-id]').length;
        const count = day.querySelector('.month-day-count');
        if (count && count.textContent !== `${total} 项`) count.textContent = `${total} 项`;
        if (!count) day.querySelector('.month-date-row')?.insertAdjacentHTML('beforeend', `<span class="month-day-count">${total} 项</span>`);
      });
      return;
    }

    document.querySelectorAll('#dayGrid .day-column[data-date]').forEach(column => {
      const event = MATHIA_EVENTS.find(item => item.date === column.dataset.date);
      if (!event || column.querySelector(`[data-event-id="${event.id}"]`)) return;
      column.insertAdjacentHTML('beforeend', mathWeekButton(event));
    });

    const days = [...document.querySelectorAll('#calendarMobile .mobile-day')];
    const week = new URLSearchParams(location.search).get('week');
    if (!days.length || !/^\d{4}-\d{2}-\d{2}$/.test(week || '')) return;
    const start = parseDate(week);
    days.forEach((day,index) => {
      const event = MATHIA_EVENTS.find(item => item.date === formatDate(addDays(start,index)));
      if (!event || day.querySelector(`[data-event-id="${event.id}"]`)) return;
      const events = day.querySelector('.mobile-events');
      events?.querySelector('.mobile-empty')?.remove();
      events?.insertAdjacentHTML('beforeend', mathMobileButton(event));
      const count = day.querySelector('.mobile-day-head span');
      const total = events?.querySelectorAll('.mobile-event[data-event-id]').length || 0;
      if (count && count.textContent !== `${total} 项`) count.textContent = `${total} 项`;
    });
  }

  function openMathIADialog(event) {
    const dialog = document.getElementById('eventDialog');
    if (!dialog) return;
    const date = parseDate(event.date);
    const weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
    const set = (id,text) => { const node=document.getElementById(id); if(node) node.textContent=text; };
    set('dialogSubject',MATHIA_NAME);
    set('dialogTitle',event.topic);
    set('dialogDate',`${date.getUTCFullYear()}年${date.getUTCMonth()+1}月${date.getUTCDate()}日（${weekdays[date.getUTCDay()]}）`);
    set('dialogTime',`${event.start}–${event.end}`);
    set('dialogTeacher',MATHIA_TEACHER);
    set('dialogMode',MATHIA_MODE);
    set('dialogRoom','无需教室');
    set('dialogStatus','正常授课');
    set('dialogNote',`${event.title}｜${event.topic}`);
    dialog.hidden=false;
    document.body.style.overflow='hidden';
  }

  function selectedMonth() {
    const params = new URLSearchParams(location.search);
    const month = params.get('month');
    if (/^\d{4}-\d{2}$/.test(month || '')) return month;
    const week = params.get('week');
    if (/^\d{4}-\d{2}-\d{2}$/.test(week || '')) return week.slice(0,7);
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  }

  function patchCourseLedger() {
    const body = document.getElementById('courseOverviewBody');
    if (!body) return;
    const month = selectedMonth();
    const monthly = MATHIA_EVENTS.filter(event => event.date.startsWith(`${month}-`));
    const cumulative = MATHIA_EVENTS.filter(event => event.date <= `${month}-99`);
    const html = `<td data-label="类型"><span class="course-overview-type">班课</span></td><td data-label="课程"><div class="course-overview-course"><i class="course-overview-dot mathIA" aria-hidden="true"></i><div class="course-overview-name"><strong>数学IA</strong><span>周三・周五 20:00–22:00｜全24回・48h｜不设模拟考试</span></div></div></td><td data-label="授课老师"><span class="course-overview-teacher">${escapeHtml(MATHIA_TEACHER)}</span></td><td data-label="方式 / 教室" class="course-overview-delivery"><span class="course-overview-mode">网课</span><small class="course-overview-room online">无需教室</small></td><td data-label="当月授课" class="course-overview-hours">${monthly.length*2} h<small>${monthly.length} 回</small></td><td data-label="累计授课" class="course-overview-hours">${cumulative.length*2} h<small>${cumulative.length} 回</small></td>`;
    let row = body.querySelector('tr[data-mathia-ledger]');
    if (!row) {
      row = document.createElement('tr');
      row.dataset.mathiaLedger='1';
      const mathIIBC = [...body.rows].find(item => item.textContent.includes('数学IIBC'));
      body.insertBefore(row,mathIIBC||null);
    }
    if (row.innerHTML !== html) row.innerHTML = html;

    const sum = index => [...body.rows].reduce((total,item) => {
      const match = item.cells[index]?.textContent.match(/([0-9.]+)\s*h/);
      return total + (match ? Number(match[1]) : 0);
    },0);
    const monthTotal = document.getElementById('courseOverviewMonthTotal');
    const cumulativeTotal = document.getElementById('courseOverviewCumulativeTotal');
    const nextMonth = `${sum(4)} h`, nextCumulative = `${sum(5)} h`;
    if (monthTotal && monthTotal.textContent !== nextMonth) monthTotal.textContent = nextMonth;
    if (cumulativeTotal && cumulativeTotal.textContent !== nextCumulative) cumulativeTotal.textContent = nextCumulative;
  }

  function patchPendingCourseList() {
    document.querySelectorAll('#coursePlanDetails .plan-lines > div').forEach(row => {
      if (row.querySelector('strong')?.textContent.trim() !== '大课') return;
      const p = row.querySelector('p');
      if (!p || !p.textContent.includes('数学IA')) return;
      const next = p.textContent.split('、').map(v=>v.trim()).filter(v=>v&&v!=='数学IA').join('、');
      if (p.textContent !== next) p.textContent = next;
    });
  }

  function activeEnrollmentRows() {
    try {
      for (const key of ['tabitoEnrollmentV3','tabitoEnrollmentV2','tabitoEnrollmentV1']) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const rows = JSON.parse(raw);
        if (Array.isArray(rows)) return rows.filter(row => !/退课|取消|无效|已结课|结课/.test(String(row?.status ?? row?.['报名状态'] ?? row?.['状态'] ?? '')));
      }
    } catch (_) {}
    return [];
  }

  function isMathIA(value) {
    const text = String(value).trim().replace(/Ⅰ/g,'I');
    return text === '数学IA' || /数学\s*(?:i?a|1a|1)$/i.test(text);
  }

  function patchEnrollment() {
    document.querySelectorAll('#enrollmentContent [data-enrollment-course]').forEach(button => {
      if ((button.dataset.enrollmentCourse || '').trim() !== '数学IA') return;
      const small = button.querySelector('small');
      if (small?.textContent.includes('时间未定')) small.textContent = small.textContent.replace('时间未定','已排入日历');
    });
    const detail = document.querySelector('#enrollmentContent .enrollment-detail-head');
    if (detail?.querySelector('h3')?.textContent.trim() === '数学IA') {
      const small = detail.querySelector('small');
      if (small && small.textContent !== '已排入课程日历') small.textContent='已排入课程日历';
    }
    document.querySelectorAll('#enrollmentContent .planning-table tbody tr').forEach(row => {
      if (!(row.cells?.[0]?.textContent || '').includes('数学IA')) return;
      const state = row.querySelector('.schedule-state');
      if (state) {
        if (state.textContent !== '已排') state.textContent='已排';
        state.classList.remove('unscheduled');
        state.classList.add('scheduled');
      }
    });

    const rows = activeEnrollmentRows();
    const names = new Set();
    const courses = new Set();
    rows.forEach(row => {
      const list = Array.isArray(row?.courses) ? row.courses : String(row?.['报名课程'] ?? row?.['课程'] ?? '').split(/[、，,;；|]+/);
      list.map(v=>String(v).trim()).filter(Boolean).forEach(course => {
        courses.add(course);
        if (isMathIA(course)) names.add(String(row?.name ?? row?.['姓名'] ?? '').trim());
      });
    });
    if (names.size) {
      const metric = document.getElementById('enrollmentUnscheduledCount');
      const scheduledPatterns = [/公共|政经|政治经济/,/国语|现代文/,/地理/,/物理/,/数学.*(?:iibc|2bc|2)$/i];
      const pending = [...courses].filter(course => !isMathIA(course) && !scheduledPatterns.some(pattern => pattern.test(course.replace(/Ⅰ/g,'I').replace(/Ⅱ/g,'II'))));
      if (metric && metric.textContent !== String(pending.length)) metric.textContent=String(pending.length);
      document.querySelectorAll('[data-event-id^="mathia-"]').forEach(node => {
        if (node.querySelector('.enrollment-count-badge')) return;
        const badge=document.createElement('span');
        badge.className='enrollment-count-badge';
        badge.textContent=`${names.size}人`;
        (node.querySelector('.event-name,.month-event-top strong,strong')||node).append(badge);
      });
    }
  }

  function polish() {
    installStyle();
    ensureUiOptions();
    replaceTeacherNames();
    applyExistingScheduleOverrides();
    injectMathIA();
    rescaleWeekTimeline();
    patchCourseLedger();
    patchPendingCourseList();
    patchEnrollment();
  }

  document.addEventListener('click',event => {
    const node=event.target.closest('[data-event-id^="mathia-"]');
    if (!node) return;
    const item=MATHIA_BY_ID.get(node.dataset.eventId);
    if (item) setTimeout(()=>openMathIADialog(item),0);
  },true);

  let calendarQueued=false;
  const queueCalendar=()=>{
    if(calendarQueued)return;
    calendarQueued=true;
    requestAnimationFrame(()=>{calendarQueued=false;polish();});
  };

  polish();

  const calendar=document.querySelector('.office-calendar');
  if(calendar)new MutationObserver(queueCalendar).observe(calendar,{childList:true,subtree:true});
  const enrollment=document.getElementById('enrollmentContent');
  if(enrollment)new MutationObserver(()=>requestAnimationFrame(patchEnrollment)).observe(enrollment,{childList:true,subtree:true});
  const periodTitle=document.getElementById('weekTitle');
  if(periodTitle)new MutationObserver(()=>requestAnimationFrame(()=>{patchCourseLedger();patchPendingCourseList();})).observe(periodTitle,{childList:true,subtree:true,characterData:true});
  window.addEventListener('popstate',queueCalendar);
  window.addEventListener('resize',queueCalendar);
})();