(() => {
  'use strict';

  const OLD_NAME = '金老师';
  const NEW_NAME = '金龙熙';
  const ENROLLMENT_KEYS = ['tabitoEnrollmentV3', 'tabitoEnrollmentV2', 'tabitoEnrollmentV1'];

  const REMOVED_EVENTS = new Set(['jp-09', 'jp-11', 'jp-13']);
  const EVENT_OVERRIDES = new Map([
    ['jp-08', { start: '13:40', end: '16:40', title: '第8回', topic: '小说读解技巧，基础现代文练习5・6' }],
    ['jp-10', { start: '13:40', end: '16:40', title: '第9回', topic: '2020年评论・小说' }],
    ['jp-12', { start: '13:40', end: '16:40', title: '第10回', topic: '2021年评论・小说' }],
    ['jp-14', { start: '13:40', end: '16:40', title: '第11回', topic: '2022年评论' }],
    ['geo-03', { start: '18:00', end: '21:00' }],
    ['geo-04', { start: '18:00', end: '21:00' }],
    ['geo-05', { start: '18:00', end: '21:00' }],
    ['geo-06', { start: '18:00', end: '21:00' }],
    ['geo-07', { start: '18:00', end: '21:00' }],
    ['geo-08', { start: '18:00', end: '21:00' }],
    ['geo-09', { start: '18:00', end: '21:00' }],
    ['geo-10', { start: '18:00', end: '21:00' }],
    ['geo-11', { start: '18:00', end: '21:00' }],
    ['geo-12', { start: '18:00', end: '21:00' }],
    ['geo-13', { start: '18:00', end: '21:00' }],
    ['geo-14', { start: '18:00', end: '21:00' }],
    ['geo-15', { start: '18:00', end: '21:00' }],
    ['geo-16', { start: '18:00', end: '21:00' }],
    ['geo-17', { start: '18:00', end: '21:00' }],
    ['geo-18', { start: '18:00', end: '21:00' }],
    ['geo-19', { start: '18:00', end: '21:00' }],
    ['geo-20', { start: '18:00', end: '21:00' }]
  ]);

  let lastClickedEventId = '';

  function normalizeToken(value) {
    return String(value ?? '').trim().toLowerCase().replace(/[\s・·_／/（）()【】\[\]《》<>「」『』\-–—]+/g, '');
  }

  function subjectName(key, fallback) {
    return document.querySelector(`#subjectFilter option[value="${key}"]`)?.textContent?.trim() || fallback;
  }

  function enrollmentAliases() {
    const politics = subjectName('politics', '公共政治经济');
    const geography = subjectName('geography', '共通考试地理');
    const english = subjectName('english', '共通英语阅读');
    const mathIIBC = subjectName('mathIIBC', '共通考试数学IIBC');
    const commonPhysics = subjectName('commonPhysics', '物理共通考试冲刺课程');
    const privatePhysics = subjectName('privatePhysics', '魏思远物理一对一');
    const map = new Map();
    const add = (canonical, values) => values.forEach(value => map.set(normalizeToken(value), canonical));

    add(politics, ['公共政治经济', '公共', '政治经济', '政经', '公民政治经济']);
    add(geography, ['共通考试地理', '共通地理', '地理']);
    add(english, ['共通英语阅读', '英语阅读', '共通英语', '英语']);
    add(mathIIBC, ['共通考试数学IIBC', '数学IIBC', '数学2', '数学2BC', '数学ⅡBC', '2BC', 'IIBC']);
    add('数学IA', ['数学IA', '数学1', '数学1A', '数学ⅠA', '1A', 'IA']);
    add(commonPhysics, ['物理共通考试冲刺课程', '物理冲刺', '共通物理', '物理']);
    add(privatePhysics, ['魏思远物理一对一', '物理1对1', '物理一对一', '1对1物理']);
    return map;
  }

  function canonicalCourse(value, aliases) {
    const raw = String(value ?? '').trim();
    return aliases.get(normalizeToken(raw)) || raw;
  }

  function normalizeCourseField(value, aliases) {
    const source = Array.isArray(value)
      ? value
      : String(value ?? '').split(/[、，,;；|]+/);
    return [...new Set(source.map(item => canonicalCourse(item, aliases)).filter(Boolean))];
  }

  function normalizeEnrollmentStorage() {
    const aliases = enrollmentAliases();
    let changed = false;

    ENROLLMENT_KEYS.forEach(key => {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return;
        const normalized = parsed.map(row => {
          if (!row || typeof row !== 'object') return row;
          const next = { ...row };
          if ('courses' in next) next.courses = normalizeCourseField(next.courses, aliases);
          else if ('报名课程' in next) next['报名课程'] = normalizeCourseField(next['报名课程'], aliases).join('、');
          else if ('课程' in next) next['课程'] = normalizeCourseField(next['课程'], aliases).join('、');
          return next;
        });
        const nextRaw = JSON.stringify(normalized);
        if (nextRaw !== raw) {
          localStorage.setItem(key, nextRaw);
          changed = true;
        }
      } catch (_) {}
    });
    return changed;
  }

  function replaceTeacherText(node) {
    if (!node || !node.textContent || !node.textContent.includes(OLD_NAME)) return;
    node.textContent = node.textContent.replaceAll(OLD_NAME, NEW_NAME);
  }

  function polishTeacherNames(root = document) {
    const filter = document.getElementById('teacherFilter');
    if (filter) {
      [...filter.options].forEach(option => {
        if (option.value === OLD_NAME || option.textContent.trim() === OLD_NAME) {
          option.value = NEW_NAME;
          option.textContent = NEW_NAME;
        }
      });
    }

    let changedDataset = false;
    root.querySelectorAll?.('[data-teacher]').forEach(node => {
      if (node.dataset.teacher === OLD_NAME) {
        node.dataset.teacher = NEW_NAME;
        changedDataset = true;
      }
    });

    [
      '#dialogTeacher',
      '.event-meta',
      '.month-event-meta',
      '.mobile-event-meta',
      '.course-overview-teacher',
      '.followup-main span'
    ].forEach(selector => {
      document.querySelectorAll(selector).forEach(replaceTeacherText);
    });

    if (changedDataset && filter?.value === NEW_NAME) {
      filter.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function registrationFromNote(value) {
    const source = String(value ?? '').trim();
    const match = source.match(/报名时间\s*[:：]?\s*((?:19|20)\d{2}年\s*\d{1,2}月)/);
    if (!match) return { time: '—', note: source || '—' };
    const note = source
      .replace(match[0], '')
      .replace(/^[\s；;、,，]+|[\s；;、,，]+$/g, '')
      .trim();
    return { time: match[1].replace(/\s+/g, ''), note: note && note !== '—' ? note : '—' };
  }

  function installEnrollmentDataStyle() {
    if (document.getElementById('enrollmentDataPolishStyle')) return;
    const style = document.createElement('style');
    style.id = 'enrollmentDataPolishStyle';
    style.textContent = `
      .registration-time-col,.registration-time-cell{white-space:nowrap}
      .registration-time-cell{color:#66717c!important;font-variant-numeric:tabular-nums}
      .enrollment-table th.registration-time-col{color:#69737e}
    `;
    document.head.append(style);
  }

  function polishRegistrationTables() {
    installEnrollmentDataStyle();
    document.querySelectorAll('#enrollmentContent table.enrollment-table').forEach(table => {
      const headRow = table.tHead?.rows?.[0];
      if (!headRow) return;
      const headers = [...headRow.cells].map(cell => cell.textContent.trim());
      if (headers.includes('报名时间')) return;
      const noteIndex = headers.indexOf('备注');
      const nameIndex = headers.indexOf('姓名');
      if (noteIndex < 0 || nameIndex < 0) return;

      const studentView = headers.includes('报名课程');
      const insertIndex = studentView ? headers.indexOf('报名课程') + 1 : nameIndex + 1;
      const header = document.createElement('th');
      header.textContent = '报名时间';
      header.className = 'registration-time-col';
      headRow.insertBefore(header, headRow.cells[insertIndex] || null);

      if (studentView) {
        const widths = ['13%', '29%', '14%', '16%', '11%', '17%'];
        [...headRow.cells].forEach((cell, index) => { cell.style.width = widths[index] || ''; });
      } else {
        const widths = ['18%', '17%', '22%', '16%', '27%'];
        [...headRow.cells].forEach((cell, index) => { cell.style.width = widths[index] || ''; });
      }

      [...table.tBodies].forEach(body => [...body.rows].forEach(row => {
        if (row.cells.length === 1 && row.cells[0].colSpan > 1) {
          row.cells[0].colSpan += 1;
          return;
        }
        const noteCell = row.cells[noteIndex];
        if (!noteCell) return;
        const parsed = registrationFromNote(noteCell.textContent);
        const cell = row.insertCell(insertIndex);
        cell.className = 'registration-time-cell';
        cell.textContent = parsed.time;
        noteCell.textContent = parsed.note;
      }));
    });
  }

  function timeToMinutes(value) {
    const [h, m] = String(value).split(':').map(Number);
    return h * 60 + m;
  }

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function updateEventLabel(node, override) {
    if (!override?.title) return;
    const targets = [
      node.querySelector('.event-name'),
      node.querySelector('.month-event-top strong'),
      node.querySelector('.mobile-event strong')
    ].filter(Boolean);
    targets.forEach(target => {
      const text = target.textContent || '';
      const next = text.replace(/第\d+回/, override.title);
      setText(target, next);
    });
  }

  function updateEventTopic(node, override) {
    if (!override?.topic) return;
    [
      node.querySelector('.event-topic'),
      node.querySelector('.month-event p'),
      node.querySelector('.mobile-event p')
    ].forEach(target => setText(target, override.topic));
  }

  function updateEventTime(node, override) {
    if (!override?.start || !override?.end) return;
    const range = `${override.start}–${override.end}`;
    setText(node.querySelector('.event-time'), range);
    setText(node.querySelector('.mobile-event-time'), range);
    setText(node.querySelector('.month-event-top time'), override.start);

    if (node.classList.contains('event')) {
      const startMinute = Math.max(9 * 60, timeToMinutes(override.start));
      const endMinute = Math.min(21 * 60, timeToMinutes(override.end));
      const top = ((startMinute - 9 * 60) / (12 * 60)) * 700;
      const height = Math.max(34, ((endMinute - startMinute) / (12 * 60)) * 700 - 5);
      node.style.top = `${top}px`;
      node.style.height = `${height}px`;
    }

    const aria = node.getAttribute('aria-label');
    if (aria) {
      const next = aria.replace(/\d{1,2}:\d{2}至\d{1,2}:\d{2}/, `${override.start}至${override.end}`);
      if (next !== aria) node.setAttribute('aria-label', next);
    }
  }

  function applyScheduleCorrections(root = document) {
    root.querySelectorAll?.('[data-event-id]').forEach(node => {
      const id = node.dataset.eventId || '';
      if (REMOVED_EVENTS.has(id)) {
        node.remove();
        return;
      }
      const override = EVENT_OVERRIDES.get(id);
      if (!override) return;
      updateEventTime(node, override);
      updateEventLabel(node, override);
      updateEventTopic(node, override);
    });
  }

  function polishDialogSchedule() {
    const dialog = document.getElementById('eventDialog');
    if (!dialog || dialog.hidden || !lastClickedEventId) return;
    const override = EVENT_OVERRIDES.get(lastClickedEventId);
    if (!override) return;

    if (override.start && override.end) {
      setText(document.getElementById('dialogTime'), `${override.start}–${override.end}`);
    }
    if (override.topic) {
      setText(document.getElementById('dialogTitle'), override.topic);
      const title = override.title || '';
      setText(document.getElementById('dialogNote'), `${title}${title ? '｜' : ''}${override.topic}`);
    }
  }

  document.addEventListener('click', event => {
    const node = event.target.closest?.('[data-event-id]');
    if (node) lastClickedEventId = node.dataset.eventId || '';
  }, true);

  if (normalizeEnrollmentStorage()) {
    location.reload();
    return;
  }

  let queued = false;
  function queuePolish() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      if (normalizeEnrollmentStorage()) {
        location.reload();
        return;
      }
      applyScheduleCorrections(document);
      polishTeacherNames(document);
      polishRegistrationTables();
      polishDialogSchedule();
    });
  }

  applyScheduleCorrections(document);
  polishTeacherNames(document);
  polishRegistrationTables();
  polishDialogSchedule();
  new MutationObserver(queuePolish).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-teacher', 'hidden']
  });
})();
