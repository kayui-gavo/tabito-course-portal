(() => {
  'use strict';

  const DAY_MS = 86400000;
  const TIMELINE_START = 9 * 60;
  const DEFAULT_TIMELINE_END = 22 * 60;
  const LATE_TIMELINE_END = 24 * 60;
  const PX_PER_HOUR = 58.3077;

  const OLD_NAME = '金老师';
  const NEW_NAME = '金龙熙';

  const MATHIA = {
    key: 'mathIA', name: '数学IA', enrollmentName: '数学IA', teacher: '脇村 剛', mode: '网课',
    color: '#7a5d8e', bg: '#f4f0f7', border: '#d6cbe0',
    ledgerName: '数学IA', ledgerMeta: '周三・周五 20:00–22:00｜全24回・48h｜不设模拟考试',
    events: [
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
    ]
  };

  const CHEMISTRY = {
    key: 'chemCurrent', name: '化学（上半期）', enrollmentName: '化学', teacher: '孫', mode: '网课',
    color: '#9a6048', bg: '#f8f1ed', border: '#dfc8bd',
    ledgerName: '共通考试化学', ledgerMeta: '2026上半期入门讲座｜全20回・40h',
    events: [
      ['chem-01','2026-04-25','13:00','15:00','第1回','化学基础总复习、基础能力诊断测试'],
      ['chem-02','2026-05-12','22:00','24:00','第2回','脂肪族烃、含氧化合物与异构体'],
      ['chem-03','2026-05-19','22:00','24:00','第3回','芳香族化合物、官能团检验'],
      ['chem-04','2026-05-26','22:00','24:00','第4回','结构推断、元素分析与分子式确定'],
      ['chem-05','2026-06-02','22:00','24:00','第5回','高分子化合物、糖与蛋白质'],
      ['chem-06','2026-06-09','22:00','24:00','第6回','物质构成、原子结构、化学键与晶体'],
      ['chem-07','2026-06-16','22:00','24:00','第7回','物质的量、化学方程式与浓度计算'],
      ['chem-08','2026-06-23','22:00','24:00','第8回','气体性质、状态方程、分压与蒸气压'],
      ['chem-09','2026-06-30','22:00','24:00','第9回','溶液性质、亨利定律与稀溶液'],
      ['chem-10','2026-07-08','09:00','11:00','第10回','化学反应与能量、焓'],
      ['chem-11','2026-07-14','22:00','24:00','第11回','反应速率、活化能与催化剂'],
      ['chem-12','2026-07-21','22:00','24:00','第12回','化学平衡、平衡常数与勒夏特列原理'],
      ['chem-13','2026-07-29','09:00','11:00','第13回','酸碱反应、pH、缓冲溶液与滴定曲线'],
      ['chem-14','2026-08-12','09:00','11:00','第14回','氧化还原反应与各类电池'],
      ['chem-15','2026-08-19','09:00','11:00','第15回','电解、法拉第定律与电解工业'],
      ['chem-16','2026-08-26','09:00','11:00','第16回','非金属元素'],
      ['chem-17','2026-08-31','09:00','11:00','第17回','典型金属元素'],
      ['chem-18','2026-09-09','09:00','11:00','第18回','过渡元素与配合离子分析'],
      ['chem-19','2026-09-16','09:00','11:00','第19回','实验考察、图表读取与综合问题'],
      ['chem-20','2026-09-23','09:00','11:00','第20回','真题、模拟题练习与时间分配']
    ]
  };

  const BIOLOGY = {
    key: 'biologySummer', name: '生物（夏期集中）', enrollmentName: '生物', teacher: '周梓杰', mode: '网课',
    color: '#4f776c', bg: '#eef5f2', border: '#c4d8d1',
    ledgerName: '生物', ledgerMeta: '2026前期夏期集中讲座｜全20回・40h',
    events: [
      ['bio-01','2026-07-20','19:00','21:00','第1回','微观领域问题练习 I'],
      ['bio-02','2026-07-24','13:00','15:00','第2回','微观领域问题练习 II'],
      ['bio-03','2026-07-27','19:00','21:00','第3回','微观领域问题练习 III'],
      ['bio-04','2026-07-31','13:00','15:00','第4回','微观领域知识整理'],
      ['bio-05','2026-08-03','19:00','21:00','第5回','宏观领域问题练习 I'],
      ['bio-06','2026-08-07','13:00','15:00','第6回','宏观领域问题练习 II'],
      ['bio-07','2026-08-10','19:00','21:00','第7回','宏观领域问题练习 III'],
      ['bio-08','2026-08-14','13:00','15:00','第8回','宏观领域知识整理'],
      ['bio-09','2026-08-17','19:00','21:00','第9回','考试・讲评 I'],
      ['bio-10','2026-08-21','13:00','15:00','第10回','考试・讲评 II'],
      ['bio-11','2026-08-24','19:00','21:00','第11回','综合问题练习 I'],
      ['bio-12','2026-08-28','13:00','15:00','第12回','进阶学习 I'],
      ['bio-13','2026-08-31','19:00','21:00','第13回','综合问题练习 II'],
      ['bio-14','2026-09-04','13:00','15:00','第14回','进阶学习 II'],
      ['bio-15','2026-09-07','19:00','21:00','第15回','综合问题练习 III'],
      ['bio-16','2026-09-11','13:00','15:00','第16回','进阶学习 III'],
      ['bio-17','2026-09-14','19:00','21:00','第17回','综合问题练习 IV'],
      ['bio-18','2026-09-18','13:00','15:00','第18回','进阶学习 IV'],
      ['bio-19','2026-09-21','19:00','21:00','第19回','综合问题练习 V'],
      ['bio-20','2026-09-25','13:00','15:00','第20回','进阶学习 V']
    ]
  };

  const EXTRA_COURSES = [MATHIA, CHEMISTRY, BIOLOGY];
  EXTRA_COURSES.forEach(course => {
    course.events = course.events.map(([id,date,start,end,title,topic]) => ({id,date,start,end,title,topic,course}));
  });
  const EXTRA_EVENT_BY_ID = new Map(EXTRA_COURSES.flatMap(course => course.events.map(event => [event.id,event])));

  const REMOVED_EVENTS = new Set(['jp-09','jp-11','jp-13']);
  const EVENT_OVERRIDES = new Map([
    ['jp-08',{start:'13:40',end:'16:40',title:'第8回',topic:'小说读解技巧，基础现代文练习5・6'}],
    ['jp-10',{start:'13:40',end:'16:40',title:'第9回',topic:'2020年评论・小说'}],
    ['jp-12',{start:'13:40',end:'16:40',title:'第10回',topic:'2021年评论・小说'}],
    ['jp-14',{start:'13:40',end:'16:40',title:'第11回',topic:'2022年评论'}],
    ...Array.from({length:18},(_,i)=>[`geo-${String(i+3).padStart(2,'0')}`,{start:'18:00',end:'21:00'}])
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
  const addDays = (date,days) => new Date(date.getTime()+days*DAY_MS);
  const escapeHtml = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
  const todayKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  };

  function filterValue(id) {
    return document.getElementById(id)?.value || 'all';
  }
  function shouldShow(course) {
    const subject = filterValue('subjectFilter');
    const teacher = filterValue('teacherFilter');
    const mode = filterValue('modeFilter');
    const room = filterValue('roomFilter');
    if (subject !== 'all' && subject !== course.key) return false;
    if (teacher !== 'all' && teacher !== course.teacher) return false;
    if (mode !== 'all' && mode !== 'online') return false;
    if (room !== 'all' && room !== 'online') return false;
    return true;
  }

  function installStyle() {
    if (document.getElementById('scheduleRuntimePolishV9')) return;
    ['scheduleRuntimePolishV8','scheduleRuntimePolishV7','scheduleRuntimePolishV6','scheduleRuntimePolishV5','scheduleRuntimePolishV4'].forEach(id => document.getElementById(id)?.remove());
    const style = document.createElement('style');
    style.id = 'scheduleRuntimePolishV9';
    style.textContent = `
      :root{
        --math-ia:${MATHIA.color};--math-ia-bg:${MATHIA.bg};
        --chem-current:${CHEMISTRY.color};--chem-current-bg:${CHEMISTRY.bg};
        --bio-summer:${BIOLOGY.color};--bio-summer-bg:${BIOLOGY.bg};
        --runtime-grid-height:758px;--runtime-hour:${PX_PER_HOUR}px;--runtime-two-hour:${PX_PER_HOUR*2}px;
      }
      .time-axis,.day-grid{height:var(--runtime-grid-height)!important}
      .day-column{background-size:100% var(--runtime-hour)!important}
      .day-column::after{background-size:100% var(--runtime-two-hour)!important}
      .subject-legend.mathIA i{background:var(--math-ia)}
      .subject-legend.chemCurrent i{background:var(--chem-current)}
      .subject-legend.biologySummer i{background:var(--bio-summer)}
      .event.mathIA{border-color:${MATHIA.border};border-left-color:var(--math-ia);background:var(--math-ia-bg)}
      .event.chemCurrent{border-color:${CHEMISTRY.border};border-left-color:var(--chem-current);background:var(--chem-current-bg)}
      .event.biologySummer{border-color:${BIOLOGY.border};border-left-color:var(--bio-summer);background:var(--bio-summer-bg)}
      .month-event.mathIA{border-left-color:var(--math-ia);background:var(--math-ia-bg)}
      .month-event.chemCurrent{border-left-color:var(--chem-current);background:var(--chem-current-bg)}
      .month-event.biologySummer{border-left-color:var(--bio-summer);background:var(--bio-summer-bg)}
      .mobile-event.mathIA{border-left:3px solid var(--math-ia);padding-left:8px}
      .mobile-event.chemCurrent{border-left:3px solid var(--chem-current);padding-left:8px}
      .mobile-event.biologySummer{border-left:3px solid var(--bio-summer);padding-left:8px}
      .course-overview-dot.mathIA{background:var(--math-ia)}
      .course-overview-dot.chemCurrent{background:var(--chem-current)}
      .course-overview-dot.biologySummer{background:var(--bio-summer)}
    `;
    document.head.append(style);
  }

  function ensureUiOptions() {
    const subject = document.getElementById('subjectFilter');
    if (subject) {
      const anchor = subject.querySelector('option[value="mathIIBC"]');
      EXTRA_COURSES.forEach(course => {
        if (!subject.querySelector(`option[value="${course.key}"]`)) subject.insertBefore(new Option(course.name,course.key),anchor||null);
      });
      const requested = new URL(location.href).searchParams.get('subject');
      if (EXTRA_COURSES.some(course => course.key === requested) && subject.value !== requested) {
        subject.value = requested;
        subject.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }
    const teacher = document.getElementById('teacherFilter');
    if (teacher) {
      EXTRA_COURSES.map(course=>course.teacher).forEach(name => {
        if (name && ![...teacher.options].some(option=>option.value===name)) teacher.add(new Option(name,name));
      });
    }
    const legend = document.querySelector('.office-legend');
    if (legend) {
      EXTRA_COURSES.forEach(course => {
        if (legend.querySelector(`.subject-legend.${course.key}`)) return;
        const item = document.createElement('span');
        item.className = `legend-item subject-legend ${course.key}`;
        item.innerHTML = `<i></i>${escapeHtml(course.name)}`;
        legend.insertBefore(item,legend.querySelector('.legend-divider'));
      });
    }
  }

  function replaceTeacherNames() {
    document.querySelectorAll('[data-teacher]').forEach(node => {
      if (node.dataset.teacher === OLD_NAME) node.dataset.teacher = NEW_NAME;
    });
    ['#dialogTeacher','.event-meta','.month-event-meta','.mobile-event-meta','.course-overview-teacher','.followup-main span'].forEach(selector => {
      document.querySelectorAll(selector).forEach(node => {
        if (node.textContent.includes(OLD_NAME)) node.textContent = node.textContent.replaceAll(OLD_NAME,NEW_NAME);
      });
    });
  }

  function applyExistingScheduleOverrides() {
    REMOVED_EVENTS.forEach(id => document.querySelectorAll(`[data-event-id="${id}"]`).forEach(node=>node.remove()));
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
          const next = aria.replace(/\d{1,2}:\d{2}至\d{1,2}:\d{2}/,`${override.start}至${override.end}`);
          if (next !== aria) node.setAttribute('aria-label',next);
        }
      });
    });
  }

  function visibleWeekDates() {
    return [...document.querySelectorAll('#dayGrid .day-column[data-date]')].map(node=>node.dataset.date);
  }
  function timelineEnd() {
    const dates = new Set(visibleWeekDates());
    return EXTRA_COURSES.some(course => shouldShow(course) && course.events.some(event => dates.has(event.date) && minutes(event.end) > DEFAULT_TIMELINE_END))
      ? LATE_TIMELINE_END : DEFAULT_TIMELINE_END;
  }
  function timelineHeight() { return ((timelineEnd()-TIMELINE_START)/60)*PX_PER_HOUR; }
  function timelineTop(start) { return ((minutes(start)-TIMELINE_START)/(timelineEnd()-TIMELINE_START))*timelineHeight(); }
  function eventHeight(start,end) { return Math.max(34,((minutes(end)-minutes(start))/(timelineEnd()-TIMELINE_START))*timelineHeight()-5); }

  function eventMeta(course) { return `${course.teacher} · ${course.mode}`; }
  function weekButton(event) {
    const c = event.course;
    return `<button type="button" class="event ${c.key}" data-event-id="${event.id}" data-teacher="${escapeHtml(c.teacher)}" data-mode="online" aria-label="${escapeHtml(c.name)} ${event.title} ${event.start}至${event.end}"><span class="event-time">${event.start}–${event.end}</span><span class="event-name">${escapeHtml(c.name)} · ${event.title}</span><span class="event-topic">${escapeHtml(event.topic)}</span><span class="event-meta">${escapeHtml(eventMeta(c))}</span></button>`;
  }
  function monthButton(event) {
    const c = event.course;
    return `<button type="button" class="month-event ${c.key}" data-event-id="${event.id}" data-teacher="${escapeHtml(c.teacher)}" data-mode="online"><span class="month-event-top"><time>${event.start}</time><strong>${escapeHtml(c.name)} · ${event.title}</strong></span><p>${escapeHtml(event.topic)}</p><span class="month-event-meta">${escapeHtml(eventMeta(c))}</span></button>`;
  }
  function mobileButton(event) {
    const c = event.course;
    return `<button type="button" class="mobile-event ${c.key}" data-event-id="${event.id}" data-teacher="${escapeHtml(c.teacher)}" data-mode="online"><span class="mobile-event-time">${event.start}–${event.end}</span><span><strong>${escapeHtml(c.name)} · ${event.title}</strong><p>${escapeHtml(event.topic)}</p><span class="mobile-event-meta">${escapeHtml(eventMeta(c))}</span></span></button>`;
  }

  function pruneExtraCourses() {
    document.querySelectorAll('[data-event-id^="mathia-"],[data-event-id^="chem-"],[data-event-id^="bio-"]').forEach(node => {
      const event = EXTRA_EVENT_BY_ID.get(node.dataset.eventId);
      if (!event || !shouldShow(event.course)) node.remove();
    });
  }

  function injectExtraCourses() {
    const visibleCourses = EXTRA_COURSES.filter(shouldShow);
    if (document.getElementById('monthView')?.hidden === false) {
      document.querySelectorAll('#monthGrid .month-day[data-date]').forEach(day => {
        visibleCourses.forEach(course => {
          course.events.filter(event=>event.date===day.dataset.date).forEach(event => {
            if (!day.querySelector(`[data-event-id="${event.id}"]`)) day.querySelector('.month-events')?.insertAdjacentHTML('beforeend',monthButton(event));
          });
        });
        const total = day.querySelectorAll('.month-event[data-event-id]').length;
        const count = day.querySelector('.month-day-count');
        const next = total ? `${total} 项` : '';
        if (count && count.textContent !== next) count.textContent = next;
        else if (!count && total) day.querySelector('.month-date-row')?.insertAdjacentHTML('beforeend',`<span class="month-day-count">${total} 项</span>`);
      });
      return;
    }

    document.querySelectorAll('#dayGrid .day-column[data-date]').forEach(column => {
      visibleCourses.forEach(course => {
        course.events.filter(event=>event.date===column.dataset.date).forEach(event => {
          if (!column.querySelector(`[data-event-id="${event.id}"]`)) column.insertAdjacentHTML('beforeend',weekButton(event));
        });
      });
    });

    const days = [...document.querySelectorAll('#calendarMobile .mobile-day')];
    const week = new URLSearchParams(location.search).get('week');
    if (!days.length || !/^\d{4}-\d{2}-\d{2}$/.test(week||'')) return;
    const start = parseDate(week);
    days.forEach((day,index) => {
      const date = formatDate(addDays(start,index));
      const list = day.querySelector('.mobile-events');
      visibleCourses.forEach(course => {
        course.events.filter(event=>event.date===date).forEach(event => {
          if (!day.querySelector(`[data-event-id="${event.id}"]`)) list?.insertAdjacentHTML('beforeend',mobileButton(event));
        });
      });
      if (list?.querySelector('.mobile-event[data-event-id]')) list.querySelector('.mobile-empty')?.remove();
      const total = list?.querySelectorAll('.mobile-event[data-event-id]').length || 0;
      const count = day.querySelector('.mobile-day-head span');
      const next = total ? `${total} 项` : '';
      if (count && count.textContent !== next) count.textContent = next;
    });
  }

  function rescaleWeekTimeline() {
    const end = timelineEnd();
    const height = timelineHeight();
    const root = document.documentElement;
    if (root.style.getPropertyValue('--runtime-grid-height') !== `${height}px`) root.style.setProperty('--runtime-grid-height',`${height}px`);

    const axis = document.getElementById('timeAxis');
    if (axis) {
      axis.querySelectorAll('.time-label').forEach(label => {
        const match = label.textContent.match(/(\d{1,2}):00/);
        if (!match) return;
        const minute = Number(match[1])*60;
        const display = minute > end ? 'none' : '';
        if (label.style.display !== display) label.style.display = display;
        if (minute <= end) {
          const top = `${((minute-TIMELINE_START)/(end-TIMELINE_START))*height}px`;
          if (label.style.top !== top) label.style.top = top;
        }
      });
      for (let hour=22; hour<=end/60; hour++) {
        const labelText = `${String(hour).padStart(2,'0')}:00`;
        if ([...axis.querySelectorAll('.time-label')].some(label=>label.textContent.trim()===labelText)) continue;
        const label = document.createElement('span');
        label.className = 'time-label';
        label.dataset.runtimeExtraLabel = '1';
        label.style.top = `${((hour*60-TIMELINE_START)/(end-TIMELINE_START))*height}px`;
        label.textContent = labelText;
        axis.append(label);
      }
      axis.querySelectorAll('[data-runtime-extra-label]').forEach(label => {
        const hour = Number(label.textContent.slice(0,2));
        if (hour*60 > end) label.remove();
      });
    }

    document.querySelectorAll('#dayGrid .event[data-event-id]').forEach(node => {
      const match = (node.querySelector('.event-time')?.textContent||'').match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
      if (!match) return;
      const top = `${timelineTop(match[1])}px`;
      const h = `${eventHeight(match[1],match[2])}px`;
      if (node.style.top !== top) node.style.top = top;
      if (node.style.height !== h) node.style.height = h;
    });
  }

  function relayoutWeekColumns() {
    document.querySelectorAll('#dayGrid .day-column[data-date]').forEach(column => {
      const nodes = [...column.querySelectorAll('.event[data-event-id]')]
        .map(node => {
          const match = (node.querySelector('.event-time')?.textContent||'').match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
          return match ? {node,start:minutes(match[1]),end:minutes(match[2])} : null;
        })
        .filter(Boolean)
        .sort((a,b)=>a.start-b.start||a.end-b.end);

      let group = [];
      let groupEnd = -1;
      const flush = () => {
        if (!group.length) return;
        const ends = [];
        const placed = group.map(item => {
          let col = ends.findIndex(v=>v<=item.start);
          if (col===-1) { col=ends.length; ends.push(item.end); }
          else ends[col]=item.end;
          return {...item,col};
        });
        const cols = Math.max(1,ends.length);
        placed.forEach(item => {
          const width = 100/cols;
          const left = item.col*width;
          const a = `calc(${left}% + 4px)`;
          const w = `calc(${width}% - 8px)`;
          if (item.node.style.left !== a) item.node.style.left = a;
          if (item.node.style.right !== 'auto') item.node.style.right = 'auto';
          if (item.node.style.width !== w) item.node.style.width = w;
        });
        group=[]; groupEnd=-1;
      };
      nodes.forEach(item => {
        if (group.length && item.start>=groupEnd) flush();
        group.push(item);
        groupEnd=Math.max(groupEnd,item.end);
      });
      flush();
    });
  }

  function openExtraDialog(event) {
    const dialog = document.getElementById('eventDialog');
    if (!dialog) return;
    const date = parseDate(event.date);
    const weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
    const set = (id,text) => {
      const node=document.getElementById(id);
      if (node && node.textContent!==text) node.textContent=text;
    };
    set('dialogSubject',event.course.enrollmentName||event.course.name);
    set('dialogTitle',event.topic);
    set('dialogDate',`${date.getUTCFullYear()}年${date.getUTCMonth()+1}月${date.getUTCDate()}日（${weekdays[date.getUTCDay()]}）`);
    set('dialogTime',`${event.start}–${event.end}`);
    set('dialogTeacher',event.course.teacher);
    set('dialogMode','网课');
    set('dialogRoom','无需教室');
    set('dialogStatus','正常授课');
    const status = event.course===CHEMISTRY ? '｜2026上半期课程' : event.course===BIOLOGY ? '｜2026前期夏期集中讲座' : '';
    set('dialogNote',`${event.title}｜${event.topic}${status}`);
    dialog.hidden=false;
    document.body.style.overflow='hidden';
  }

  function selectedMonth() {
    const params=new URLSearchParams(location.search);
    const month=params.get('month');
    const week=params.get('week');
    if (/^\d{4}-\d{2}$/.test(month||'')) return month;
    if (/^\d{4}-\d{2}-\d{2}$/.test(week||'')) return week.slice(0,7);
    const now=new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  }

  function statusMeta(course) {
    if (course===MATHIA) return course.ledgerMeta;
    const today=todayKey();
    const remaining=course.events.filter(event=>event.date>=today);
    const last=course.events[course.events.length-1];
    if (!remaining.length) return `${course.ledgerMeta}｜已结课`;
    const next=remaining[0];
    const [m,d]=next.date.slice(5).split('-').map(Number);
    const [lm,ld]=last.date.slice(5).split('-').map(Number);
    return `${course.ledgerMeta}｜${course===CHEMISTRY?'上半期未结课・':''}剩余${remaining.length}回（下回 ${m}/${d}，至 ${lm}/${ld}）`;
  }

  function patchCourseLedger() {
    const body=document.getElementById('courseOverviewBody');
    if (!body) return;
    const month=selectedMonth();
    EXTRA_COURSES.forEach(course => {
      const monthly=course.events.filter(event=>event.date.startsWith(`${month}-`));
      const cumulative=course.events.filter(event=>event.date<=`${month}-99`);
      const html=`<td data-label="类型"><span class="course-overview-type">班课</span></td><td data-label="课程"><div class="course-overview-course"><i class="course-overview-dot ${course.key}" aria-hidden="true"></i><div class="course-overview-name"><strong>${escapeHtml(course.ledgerName)}</strong><span>${escapeHtml(statusMeta(course))}</span></div></div></td><td data-label="授课老师"><span class="course-overview-teacher">${escapeHtml(course.teacher)}</span></td><td data-label="方式 / 教室" class="course-overview-delivery"><span class="course-overview-mode">网课</span><small class="course-overview-room online">无需教室</small></td><td data-label="当月授课" class="course-overview-hours">${monthly.length*2} h<small>${monthly.length} 回</small></td><td data-label="累计授课" class="course-overview-hours">${cumulative.length*2} h<small>${cumulative.length} 回</small></td>`;
      let row=body.querySelector(`tr[data-runtime-ledger="${course.key}"]`);
      if (!row) {
        row=document.createElement('tr');
        row.dataset.runtimeLedger=course.key;
        const anchor=[...body.rows].find(item=>item.textContent.includes('数学IIBC'));
        course===MATHIA ? body.insertBefore(row,anchor||null) : body.append(row);
      }
      if (row.innerHTML!==html) row.innerHTML=html;
    });

    const sum=index=>[...body.rows].reduce((total,item)=>{
      const match=item.cells[index]?.textContent.match(/([0-9.]+)\s*h/);
      return total+(match?Number(match[1]):0);
    },0);
    const mt=document.getElementById('courseOverviewMonthTotal');
    const ct=document.getElementById('courseOverviewCumulativeTotal');
    const m=`${sum(4)} h`,c=`${sum(5)} h`;
    if (mt&&mt.textContent!==m) mt.textContent=m;
    if (ct&&ct.textContent!==c) ct.textContent=c;

    [...body.rows].forEach(row => {
      if (row.textContent.includes('共通考试地理')) {
        const meta=row.querySelector('.course-overview-name span');
        const next='9/6 09:00–12:00｜9/13起周日 18:00–21:00｜讲义・刷题一体';
        if (meta&&meta.textContent!==next) meta.textContent=next;
      }
      if (row.textContent.includes('国语')) {
        const meta=row.querySelector('.course-overview-name span');
        const next='10/9起周五 13:40–16:40';
        if (meta&&meta.textContent!==next) meta.textContent=next;
      }
    });
  }

  function patchPendingCourseList() {
    document.querySelectorAll('#coursePlanDetails .plan-lines > div').forEach(row => {
      if (row.querySelector('strong')?.textContent.trim()!=='大课') return;
      const p=row.querySelector('p');
      if (!p) return;
      const next=p.textContent.split('、').map(v=>v.trim()).filter(Boolean).map(v=>
        v==='数学IA' ? '' : v==='化学' ? '化学（下半期方案待定）' : v==='生物' ? '生物（下半期方案待定）' : v
      ).filter(Boolean).join('、');
      if (p.textContent!==next) p.textContent=next;
    });
  }

  let polishing=false;
  function polish() {
    if (polishing) return;
    polishing=true;
    try {
      installStyle();
      ensureUiOptions();
      replaceTeacherNames();
      applyExistingScheduleOverrides();
      pruneExtraCourses();
      injectExtraCourses();
      rescaleWeekTimeline();
      relayoutWeekColumns();
      patchCourseLedger();
      patchPendingCourseList();
    } finally {
      polishing=false;
    }
  }

  let queued=false;
  function queuePolish() {
    if (queued) return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;polish();});
  }

  document.addEventListener('click',event => {
    const extraNode=event.target.closest('[data-event-id]');
    if (extraNode) {
      const extra=EXTRA_EVENT_BY_ID.get(extraNode.dataset.eventId);
      if (extra) setTimeout(()=>openExtraDialog(extra),0);
    }
    if (event.target.closest('[data-view],[data-range],#prevWeek,#nextWeek,#todayWeek')) queuePolish();
  },true);

  ['subjectFilter','teacherFilter','modeFilter','roomFilter'].forEach(id => document.getElementById(id)?.addEventListener('change',queuePolish));
  window.addEventListener('popstate',queuePolish);
  window.addEventListener('resize',queuePolish);

  polish();
})();