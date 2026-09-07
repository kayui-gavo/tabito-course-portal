(() => {
  'use strict';

  const OLD_NAME = '金老师';
  const NEW_NAME = '金龙熙';
  const MATHIA_KEY = 'mathIA';
  const MATHIA_NAME = '数学IA';
  const MATHIA_TEACHER = '脇村 剛';
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

  function minutes(value) {
    const [hour, minute] = String(value).split(':').map(Number);
    return hour * 60 + minute;
  }

  function formatDate(date) {
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;
  }

  function addDays(date, days) {
    return new Date(date.getTime() + days * DAY_MS);
  }

  function parseDate(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function installStyle() {
    if (document.getElementById('scheduleRuntimePolishV4')) return;
    const style = document.createElement('style');
    style.id = 'scheduleRuntimePolishV4';
    style.textContent = `
      :root{--math-ia:#7a5d8e;--math-ia-bg:#f4f0f7}
      .subject-legend.mathIA i{background:var(--math-ia)}
      .event.mathIA{border-color:#d6cbe0;border-left-color:var(--math-ia);background:var(--math-ia-bg)}
      .month-event.mathIA{border-left-color:var(--math-ia);background:var(--math-ia-bg)}
      .mobile-event.mathIA{border-left:3px solid var(--math-ia)}
      .time-axis,.day-grid{height:${TIMELINE_HEIGHT}px!important}
      .day-column{background-size:100% 58.3077px!important}
      .day-column::after{background-size:100% 116.6154px!important}
      .mathia-source-note{color:#7a6a83;font-size:8.5px;font-weight:650}
      .course-overview-dot.mathIA{background:var(--math-ia)}
      .course-overview-room.unknown{color:#7b8490}
      .legend-item.mathIA{white-space:nowrap}
    `;
    document.head.append(style);
  }

  function ensureUiOptions() {
    const subjectFilter = document.getElementById('subjectFilter');
    if (subjectFilter && !subjectFilter.querySelector(`option[value="${MATHIA_KEY}"]`)) {
      const option = document.createElement('option');
      option.value = MATHIA_KEY;
      option.textContent = MATHIA_NAME;
      const mathIIBC = subjectFilter.querySelector('option[value="mathIIBC"]');
      subjectFilter.insertBefore(option, mathIIBC || null);
    }

    const teacherFilter = document.getElementById('teacherFilter');
    if (teacherFilter && ![...teacherFilter.options].some(option => option.value === MATHIA_TEACHER)) {
      const option = document.createElement('option');
      option.value = MATHIA_TEACHER;
      option.textContent = MATHIA_TEACHER;
      teacherFilter.append(option);
    }

    const legend = document.querySelector('.office-legend');
    if (legend && !legend.querySelector('.subject-legend.mathIA')) {
      const item = document.createElement('span');
      item.className = 'legend-item subject-legend mathIA';
      item.innerHTML = '<i></i>数学IA';
      const mathIIBC = legend.querySelector('.subject-legend.mathIIBC');
      legend.insertBefore(item, mathIIBC || legend.querySelector('.legend-divider'));
    }

    const url = new URL(location.href);
    if (url.searchParams.get('subject') === MATHIA_KEY && subjectFilter && subjectFilter.value !== MATHIA_KEY) {
      subjectFilter.value = MATHIA_KEY;
      subjectFilter.dispatchEvent(new Event('change', { bubbles: true }));
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

    EVENT_OVERRIDES.forEach((override, id) => {
      document.querySelectorAll(`[data-event-id="${id}"]`).forEach(node => {
        const timeNode = node.querySelector('.event-time,.mobile-event-time,.month-event-top time');
        if (timeNode && override.start && override.end) timeNode.textContent = `${override.start}–${override.end}`;
        if (override.title) {
          const nameNode = node.querySelector('.event-name,.month-event-top strong,.mobile-event strong');
          if (nameNode) {
            const subject = nameNode.textContent.includes('·') ? nameNode.textContent.split('·')[0].trim() : '国语';
            nameNode.textContent = `${subject} · ${override.title}`;
          }
        }
        const topicNode = node.querySelector('.event-topic,.month-event p,.mobile-event p');
        if (topicNode && override.topic) topicNode.textContent = override.topic;
        if (override.start && override.end) {
          node.setAttribute('aria-label', `${node.getAttribute('aria-label') || ''}`.replace(/\d{1,2}:\d{2}至\d{1,2}:\d{2}/, `${override.start}至${override.end}`));
        }
      });
    });
  }

  function timelineTop(start) {
    return ((minutes(start) - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * TIMELINE_HEIGHT;
  }

  function timelineHeight(start, end) {
    return Math.max(34, ((minutes(end) - minutes(start)) / (TIMELINE_END - TIMELINE_START)) * TIMELINE_HEIGHT - 5);
  }

  function rescaleWeekTimeline() {
    const axis = document.getElementById('timeAxis');
    if (axis) {
      [...axis.querySelectorAll('.time-label')].forEach(label => {
        const match = label.textContent.match(/(\d{1,2}):00/);
        if (!match) return;
        const minute = Number(match[1]) * 60;
        label.style.top = `${((minute - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * TIMELINE_HEIGHT}px`;
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
      const timeText = node.querySelector('.event-time')?.textContent || '';
      const match = timeText.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
      if (!match) return;
      node.style.top = `${timelineTop(match[1])}px`;
      node.style.height = `${timelineHeight(match[1], match[2])}px`;
    });
  }

  function shouldShowMathIA() {
    const subject = document.getElementById('subjectFilter')?.value || 'all';
    return subject === 'all' || subject === MATHIA_KEY;
  }

  function mathWeekButton(event) {
    const top = timelineTop(event.start);
    const height = timelineHeight(event.start, event.end);
    return `<button type="button" class="event mathIA" data-event-id="${event.id}" data-teacher="${escapeHtml(MATHIA_TEACHER)}" data-mode="" style="top:${top}px;height:${height}px;left:4px;right:auto;width:calc(100% - 8px)" aria-label="数学IA ${event.title} ${event.start}至${event.end}"><span class="event-time">${event.start}–${event.end}</span><span class="event-name">数学IA · ${event.title}</span><span class="event-topic">${escapeHtml(event.topic)}</span><span class="event-meta">${escapeHtml(MATHIA_TEACHER)} · 授课方式未注明</span></button>`;
  }

  function mathMonthButton(event) {
    return `<button type="button" class="month-event mathIA" data-event-id="${event.id}" data-teacher="${escapeHtml(MATHIA_TEACHER)}" data-mode=""><span class="month-event-top"><time>${event.start}</time><strong>数学IA · ${event.title}</strong></span><p>${escapeHtml(event.topic)}</p><span class="month-event-meta">${escapeHtml(MATHIA_TEACHER)} · 授课方式未注明</span></button>`;
  }

  function mathMobileButton(event) {
    return `<button type="button" class="mobile-event mathIA" data-event-id="${event.id}" data-teacher="${escapeHtml(MATHIA_TEACHER)}" data-mode=""><span class="mobile-event-time">${event.start}–${event.end}</span><span><strong>数学IA · ${event.title}</strong><p>${escapeHtml(event.topic)}</p><span class="mobile-event-meta">${escapeHtml(MATHIA_TEACHER)} · 授课方式未注明</span></span></button>`;
  }

  function injectMathIAWeek() {
    if (!shouldShowMathIA()) return;
    document.querySelectorAll('#dayGrid .day-column[data-date]').forEach(column => {
      const event = MATHIA_EVENTS.find(item => item.date === column.dataset.date);
      if (!event || column.querySelector(`[data-event-id="${event.id}"]`)) return;
      column.insertAdjacentHTML('beforeend', mathWeekButton(event));
    });

    const mobileDays = [...document.querySelectorAll('#calendarMobile .mobile-day')];
    if (!mobileDays.length) return;
    const params = new URLSearchParams(location.search);
    const week = params.get('week');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(week || '')) return;
    const start = parseDate(week);
    mobileDays.forEach((day, index) => {
      const date = formatDate(addDays(start, index));
      const event = MATHIA_EVENTS.find(item => item.date === date);
      if (!event || day.querySelector(`[data-event-id="${event.id}"]`)) return;
      const events = day.querySelector('.mobile-events');
      const empty = events?.querySelector('.mobile-empty');
      if (empty) empty.remove();
      events?.insertAdjacentHTML('beforeend', mathMobileButton(event));
      const count = day.querySelector('.mobile-day-head span');
      if (count) count.textContent = `${events.querySelectorAll('.mobile-event[data-event-id]').length} 项`;
    });
  }

  function injectMathIAMonth() {
    if (!shouldShowMathIA()) return;
    document.querySelectorAll('#monthGrid .month-day[data-date]').forEach(day => {
      const event = MATHIA_EVENTS.find(item => item.date === day.dataset.date);
      if (!event || day.querySelector(`[data-event-id="${event.id}"]`)) return;
      const events = day.querySelector('.month-events');
      events?.insertAdjacentHTML('beforeend', mathMonthButton(event));
      const count = day.querySelector('.month-day-count');
      const total = day.querySelectorAll('.month-event[data-event-id]').length;
      if (count) count.textContent = `${total} 项`;
      else if (total) day.querySelector('.month-date-row')?.insertAdjacentHTML('beforeend', `<span class="month-day-count">${total} 项</span>`);
    });
  }

  function injectMathIA() {
    if (!shouldShowMathIA()) return;
    if (document.getElementById('monthView')?.hidden === false) injectMathIAMonth();
    else injectMathIAWeek();
  }

  function openMathIADialog(event) {
    const dialog = document.getElementById('eventDialog');
    if (!dialog) return;
    const date = parseDate(event.date);
    const weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
    const set = (id, text) => { const node = document.getElementById(id); if (node) node.textContent = text; };
    set('dialogSubject', MATHIA_NAME);
    set('dialogTitle', event.topic);
    set('dialogDate', `${date.getUTCFullYear()}年${date.getUTCMonth()+1}月${date.getUTCDate()}日（${weekdays[date.getUTCDay()]}）`);
    set('dialogTime', `${event.start}–${event.end}`);
    set('dialogTeacher', MATHIA_TEACHER);
    set('dialogMode', '—');
    set('dialogRoom', '—');
    set('dialogStatus', '正常授课');
    set('dialogNote', `${event.title}｜${event.topic}｜原课表未注明授课方式与教室`);
    dialog.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function selectedLedgerMonth() {
    const params = new URLSearchParams(location.search);
    const month = params.get('month');
    if (/^\d{4}-\d{2}$/.test(month || '')) return month;
    const week = params.get('week');
    if (/^\d{4}-\d{2}-\d{2}$/.test(week || '')) return week.slice(0, 7);
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  }

  function patchCourseLedger() {
    const body = document.getElementById('courseOverviewBody');
    if (!body) return;
    const month = selectedLedgerMonth();
    const monthly = MATHIA_EVENTS.filter(event => event.date.startsWith(`${month}-`));
    const cutoff = `${month}-99`;
    const cumulative = MATHIA_EVENTS.filter(event => event.date <= cutoff);
    let row = body.querySelector('tr[data-mathia-ledger]');
    const html = `<td data-label="类型"><span class="course-overview-type">班课</span></td><td data-label="课程"><div class="course-overview-course"><i class="course-overview-dot mathIA" aria-hidden="true"></i><div class="course-overview-name"><strong>数学IA</strong><span>周三・周五 20:00–22:00｜全24回・48h｜不设模拟考试</span></div></div></td><td data-label="授课老师"><span class="course-overview-teacher">${escapeHtml(MATHIA_TEACHER)}</span></td><td data-label="方式 / 教室" class="course-overview-delivery"><span class="course-overview-mode">课表未注明</span><small class="course-overview-room unknown">待确认</small></td><td data-label="当月授课" class="course-overview-hours">${monthly.length * 2} h<small>${monthly.length} 回</small></td><td data-label="累计授课" class="course-overview-hours">${cumulative.length * 2} h<small>${cumulative.length} 回</small></td>`;
    if (!row) {
      row = document.createElement('tr');
      row.dataset.mathiaLedger = '1';
      const mathIIBC = [...body.rows].find(item => item.textContent.includes('数学IIBC'));
      body.insertBefore(row, mathIIBC || null);
    }
    row.innerHTML = html;

    const sumColumn = index => [...body.rows].reduce((sum, item) => {
      const cell = item.cells[index];
      const match = cell?.textContent.match(/([0-9.]+)\s*h/);
      return sum + (match ? Number(match[1]) : 0);
    }, 0);
    const monthTotal = document.getElementById('courseOverviewMonthTotal');
    const cumulativeTotal = document.getElementById('courseOverviewCumulativeTotal');
    if (monthTotal) monthTotal.textContent = `${sumColumn(4)} h`;
    if (cumulativeTotal) cumulativeTotal.textContent = `${sumColumn(5)} h`;
  }

  function patchPendingCourseList() {
    document.querySelectorAll('#coursePlanDetails .plan-lines > div').forEach(row => {
      const title = row.querySelector('strong')?.textContent.trim();
      const p = row.querySelector('p');
      if (title !== '大课' || !p || !p.textContent.includes('数学IA')) return;
      p.textContent = p.textContent
        .split('、')
        .map(value => value.trim())
        .filter(value => value && value !== '数学IA')
        .join('、');
    });
  }

  function enrollmentHasMathIA() {
    try {
      for (const key of ['tabitoEnrollmentV3','tabitoEnrollmentV2','tabitoEnrollmentV1']) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const rows = JSON.parse(raw);
        if (!Array.isArray(rows)) continue;
        if (rows.some(row => {
          const courses = Array.isArray(row?.courses) ? row.courses : String(row?.['报名课程'] ?? row?.['课程'] ?? '').split(/[、，,;；|]+/);
          return courses.some(course => /数学\s*(?:i?a|1a|1)$/i.test(String(course).replace(/Ⅰ/g,'I')) || String(course).trim() === '数学IA');
        })) return true;
      }
    } catch (_) {}
    return false;
  }

  function mathIAEnrollmentCount() {
    try {
      for (const key of ['tabitoEnrollmentV3','tabitoEnrollmentV2','tabitoEnrollmentV1']) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const rows = JSON.parse(raw);
        if (!Array.isArray(rows)) continue;
        const names = new Set();
        rows.forEach(row => {
          const status = String(row?.status ?? row?.['报名状态'] ?? row?.['状态'] ?? '');
          if (/退课|取消|无效|已结课|结课/.test(status)) return;
          const courses = Array.isArray(row?.courses) ? row.courses : String(row?.['报名课程'] ?? row?.['课程'] ?? '').split(/[、，,;；|]+/);
          if (courses.some(course => /数学\s*(?:i?a|1a|1)$/i.test(String(course).replace(/Ⅰ/g,'I')) || String(course).trim() === '数学IA')) {
            names.add(String(row?.name ?? row?.['姓名'] ?? '').trim());
          }
        });
        if (names.size) return names.size;
      }
    } catch (_) {}
    return 0;
  }

  function patchEnrollment() {
    document.querySelectorAll('#enrollmentContent [data-enrollment-course]').forEach(button => {
      if ((button.dataset.enrollmentCourse || '').trim() !== '数学IA') return;
      const small = button.querySelector('small');
      if (small) small.textContent = small.textContent.replace('时间未定', '已排入日历');
    });

    const detail = document.querySelector('#enrollmentContent .enrollment-detail-head');
    if (detail?.querySelector('h3')?.textContent.trim() === '数学IA') {
      const small = detail.querySelector('small');
      if (small) small.textContent = '已排入课程日历';
    }

    document.querySelectorAll('#enrollmentContent .planning-table tbody tr').forEach(row => {
      const first = row.cells?.[0]?.textContent || '';
      if (!first.includes('数学IA')) return;
      const state = row.querySelector('.schedule-state');
      if (state) {
        state.textContent = '已排';
        state.classList.remove('unscheduled');
        state.classList.add('scheduled');
      }
    });

    if (enrollmentHasMathIA()) {
      const metric = document.getElementById('enrollmentUnscheduledCount');
      if (metric) {
        const candidates = new Set();
        try {
          const raw = localStorage.getItem('tabitoEnrollmentV3') || localStorage.getItem('tabitoEnrollmentV2') || localStorage.getItem('tabitoEnrollmentV1');
          const rows = raw ? JSON.parse(raw) : [];
          (Array.isArray(rows) ? rows : []).forEach(row => {
            const status = String(row?.status ?? row?.['报名状态'] ?? row?.['状态'] ?? '');
            if (/退课|取消|无效|已结课|结课/.test(status)) return;
            const courses = Array.isArray(row?.courses) ? row.courses : String(row?.['报名课程'] ?? row?.['课程'] ?? '').split(/[、，,;；|]+/);
            courses.map(course => String(course).trim()).filter(Boolean).forEach(course => candidates.add(course));
          });
        } catch (_) {}
        const scheduledPatterns = [/公共|政经|政治经济/,/国语|现代文/,/数学\s*(?:i?a|1a|1)$/i,/数学.*(?:iibc|2bc|2)$/i,/地理/,/物理/,/共通考试数学IA/];
        metric.textContent = String([...candidates].filter(course => !scheduledPatterns.some(pattern => pattern.test(course.replace(/Ⅰ/g,'I').replace(/Ⅱ/g,'II')))).length);
      }
    }

    const count = mathIAEnrollmentCount();
    if (count) {
      document.querySelectorAll('[data-event-id^="mathia-"]').forEach(node => {
        if (node.querySelector('.enrollment-count-badge')) return;
        const badge = document.createElement('span');
        badge.className = 'enrollment-count-badge';
        badge.textContent = `${count}人`;
        (node.querySelector('.event-name,.month-event-top strong,strong') || node).append(badge);
      });
    }
  }

  function updateWeekCountsAfterMathIA() {
    const weekView = document.getElementById('weekView');
    if (!weekView || weekView.hidden) return;
    const active = [...document.querySelectorAll('#dayGrid .event[data-event-id]')].filter(node => !node.classList.contains('office-filtered') && !node.classList.contains('cancelled'));
    const cancelled = [...document.querySelectorAll('#dayGrid .event.cancelled[data-event-id]')].filter(node => !node.classList.contains('office-filtered'));
    const hours = active.reduce((sum, node) => {
      const match = node.querySelector('.event-time')?.textContent.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
      return sum + (match ? (minutes(match[2]) - minutes(match[1])) / 60 : 0);
    }, 0);
    const sessions = document.getElementById('summarySessions');
    const hourNode = document.getElementById('summaryHours');
    const weekCount = document.getElementById('weekCount');
    if (sessions) sessions.textContent = `${active.length} 节`;
    if (hourNode) hourNode.textContent = `${Number.isInteger(hours) ? hours : hours.toFixed(1)} h`;
    if (weekCount) weekCount.textContent = `${active.length} 节授课${cancelled.length ? ` · ${cancelled.length} 项休讲` : ''}`;
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
    updateWeekCountsAfterMathIA();
  }

  document.addEventListener('click', event => {
    const node = event.target.closest('[data-event-id^="mathia-"]');
    if (node) {
      const item = MATHIA_BY_ID.get(node.dataset.eventId);
      if (item) window.setTimeout(() => openMathIADialog(item), 0);
    }
  }, true);

  let queued = false;
  const queuePolish = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      polish();
    });
  };

  polish();
  new MutationObserver(queuePolish).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden']
  });
  window.addEventListener('popstate', queuePolish);
  window.addEventListener('resize', queuePolish);
})();
