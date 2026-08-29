(() => {
  'use strict';

  const STORAGE_KEY = 'tabitoEnrollmentV1';
  const COURSE_NAME_BY_KEY = new Map(
    [...document.querySelectorAll('#subjectFilter option')]
      .filter(option => option.value && option.value !== 'all')
      .map(option => [option.value, option.textContent.trim()])
  );
  const COURSE_KEY_BY_NAME = new Map([...COURSE_NAME_BY_KEY.entries()].map(([key, name]) => [normalize(name), key]));

  const drawer = document.getElementById('enrollmentDrawer');
  const panel = drawer?.querySelector('.enrollment-panel');
  const openButton = document.getElementById('openEnrollment');
  const fileInput = document.getElementById('enrollmentFile');
  const importButton = document.getElementById('enrollmentImport');
  const templateButton = document.getElementById('enrollmentTemplate');
  const exportButton = document.getElementById('enrollmentExport');
  const clearButton = document.getElementById('enrollmentClear');
  const sourceLabel = document.getElementById('enrollmentSource');
  const metrics = {
    students: document.getElementById('enrollmentStudentCount'),
    links: document.getElementById('enrollmentLinkCount'),
    offline: document.getElementById('enrollmentOfflineCount'),
    pending: document.getElementById('enrollmentPendingCount')
  };
  const searchInput = document.getElementById('enrollmentSearch');
  const requirementFilter = document.getElementById('enrollmentRequirement');
  const content = document.getElementById('enrollmentContent');
  const tabs = [...document.querySelectorAll('[data-enrollment-view]')];

  if (!drawer || !panel || !openButton || !content) return;

  const state = {
    records: loadRecords(),
    view: 'course',
    selectedCourse: '',
    query: '',
    requirement: 'all',
    activeCourseKey: ''
  };

  function normalize(value) {
    return String(value ?? '').trim().replace(/\s+/g, '').toLowerCase();
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function splitCourses(value) {
    return [...new Set(
      String(value ?? '')
        .split(/[、，,;；|]+/)
        .map(item => item.trim())
        .filter(Boolean)
    )];
  }

  function cleanRecord(row) {
    const name = String(row.name ?? row['姓名'] ?? '').trim();
    const courseValue = row.courses ?? row['报名课程'] ?? row['课程'] ?? '';
    const courses = Array.isArray(courseValue) ? courseValue.map(String).map(item => item.trim()).filter(Boolean) : splitCourses(courseValue);
    const requirement = String(row.requirement ?? row['线下要求'] ?? row['上课方式'] ?? '').trim() || '未填写';
    const status = String(row.status ?? row['报名状态'] ?? row['状态'] ?? '').trim() || '已报名';
    const note = String(row.note ?? row['备注'] ?? '').trim();
    if (!name || !courses.length) return null;
    return { name, courses, requirement, status, note };
  }

  function loadRecords() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(cleanRecord).filter(Boolean);
    } catch (_) {
      return [];
    }
  }

  function saveRecords() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
    } catch (_) {}
  }

  function isInactive(record) {
    return /退课|取消|无效/.test(record.status);
  }

  function isPending(record) {
    return /待|暂定|未确认/.test(record.status);
  }

  function isOfflineRequired(record) {
    return /必须.*线下|仅.*线下|只.*线下/.test(record.requirement);
  }

  function requirementGroup(record) {
    if (isOfflineRequired(record)) return 'offline-required';
    if (/优先.*线下|线下.*优先/.test(record.requirement)) return 'offline-preferred';
    if (/线上|同步|均可|都可|无所谓/.test(record.requirement)) return 'online-ok';
    return 'unspecified';
  }

  function activeRecords() {
    return state.records.filter(record => !isInactive(record));
  }

  function courseMap() {
    const map = new Map();
    activeRecords().forEach(record => {
      record.courses.forEach(course => {
        if (!map.has(course)) map.set(course, []);
        map.get(course).push(record);
      });
    });
    return map;
  }

  function matchesSearch(record, course = '') {
    const query = normalize(state.query);
    if (!query) return true;
    return [record.name, record.requirement, record.status, record.note, ...record.courses, course]
      .some(value => normalize(value).includes(query));
  }

  function matchesRequirement(record) {
    if (state.requirement === 'all') return true;
    return requirementGroup(record) === state.requirement;
  }

  function filteredRecords(records, course = '') {
    return records.filter(record => matchesSearch(record, course) && matchesRequirement(record));
  }

  function updateMetrics() {
    const active = activeRecords();
    const uniqueStudents = new Set(active.map(record => record.name)).size;
    const links = active.reduce((sum, record) => sum + record.courses.length, 0);
    const offline = active.filter(isOfflineRequired).length;
    const pending = active.filter(isPending).length;
    metrics.students.textContent = String(uniqueStudents);
    metrics.links.textContent = String(links);
    metrics.offline.textContent = String(offline);
    metrics.pending.textContent = String(pending);
    sourceLabel.innerHTML = state.records.length
      ? `<strong>本地报名数据</strong> · ${state.records.length} 行 · 仅保存在当前浏览器`
      : '<strong>尚未载入报名数据</strong> · 可导入 CSV';
    exportButton.disabled = !state.records.length;
    clearButton.disabled = !state.records.length;
  }

  function renderEmpty() {
    content.innerHTML = `
      <div class="enrollment-empty">
        <div>
          <strong>还没有报名数据</strong>
          <p>点击“导入 CSV”载入姓名、报名课程、线下要求等信息。数据只保存在当前浏览器，不会写入公开 GitHub 仓库。</p>
        </div>
      </div>`;
  }

  function courseSort(a, b) {
    const knownA = COURSE_KEY_BY_NAME.has(normalize(a[0])) ? 0 : 1;
    const knownB = COURSE_KEY_BY_NAME.has(normalize(b[0])) ? 0 : 1;
    if (knownA !== knownB) return knownA - knownB;
    if (b[1].length !== a[1].length) return b[1].length - a[1].length;
    return a[0].localeCompare(b[0], 'zh-CN');
  }

  function renderCourseView() {
    const map = courseMap();
    const entries = [...map.entries()].sort(courseSort);
    if (!entries.length) return renderEmpty();

    if (!state.selectedCourse || !map.has(state.selectedCourse)) {
      const preferredName = state.activeCourseKey ? COURSE_NAME_BY_KEY.get(state.activeCourseKey) : '';
      state.selectedCourse = preferredName && map.has(preferredName) ? preferredName : entries[0][0];
    }

    const courseButtons = entries.map(([course, records]) => {
      const offlineCount = records.filter(isOfflineRequired).length;
      const active = course === state.selectedCourse ? ' active' : '';
      return `<button type="button" class="enrollment-course-btn${active}" data-enrollment-course="${escapeHtml(course)}">
        <strong>${escapeHtml(course)}</strong><span>${records.length}</span>
        <small>${offlineCount ? `${offlineCount} 人必须线下` : '无明确必须线下'}</small>
      </button>`;
    }).join('');

    const records = filteredRecords(map.get(state.selectedCourse) || [], state.selectedCourse);
    const rows = records.length ? records.map(record => `
      <tr>
        <td><strong>${escapeHtml(record.name)}</strong></td>
        <td><span class="enrollment-chip${isOfflineRequired(record) ? ' offline' : ''}">${escapeHtml(record.requirement)}</span></td>
        <td><span class="enrollment-chip${isPending(record) ? ' pending' : ''}">${escapeHtml(record.status)}</span></td>
        <td>${escapeHtml(record.note || '—')}</td>
      </tr>`).join('') : '<tr><td colspan="4" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';

    content.innerHTML = `
      <div class="enrollment-course-view">
        <aside class="enrollment-course-list">
          <div class="enrollment-course-list-head">课程 · 报名人数</div>
          ${courseButtons}
        </aside>
        <section class="enrollment-detail">
          <header class="enrollment-detail-head">
            <h3>${escapeHtml(state.selectedCourse)}</h3>
            <span>${records.length} 人</span>
          </header>
          <table class="enrollment-table">
            <thead><tr><th style="width:22%">姓名</th><th style="width:24%">线下要求</th><th style="width:18%">状态</th><th>备注</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </section>
      </div>`;
  }

  function renderStudentView() {
    const records = filteredRecords(activeRecords());
    const rows = records.length ? records
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
      .map(record => `
        <tr>
          <td><strong>${escapeHtml(record.name)}</strong></td>
          <td class="course-cell">${record.courses.map(escapeHtml).join('、')}</td>
          <td><span class="enrollment-chip${isOfflineRequired(record) ? ' offline' : ''}">${escapeHtml(record.requirement)}</span></td>
          <td><span class="enrollment-chip${isPending(record) ? ' pending' : ''}">${escapeHtml(record.status)}</span></td>
          <td>${escapeHtml(record.note || '—')}</td>
        </tr>`).join('') : '<tr><td colspan="5" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';

    content.innerHTML = `
      <div class="enrollment-student-view">
        <table class="enrollment-table">
          <thead><tr><th style="width:15%">姓名</th><th style="width:35%">报名课程</th><th style="width:17%">线下要求</th><th style="width:13%">状态</th><th>备注</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  function render() {
    updateMetrics();
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.enrollmentView === state.view));
    if (!state.records.length) return renderEmpty();
    if (state.view === 'student') renderStudentView();
    else renderCourseView();
    decorateCalendarCounts();
    updateDialogEnrollmentCount();
  }

  function openDrawer(course = '') {
    if (course) {
      state.view = 'course';
      state.selectedCourse = course;
      state.activeCourseKey = COURSE_KEY_BY_NAME.get(normalize(course)) || '';
    }
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    render();
    window.setTimeout(() => searchInput?.focus(), 40);
  }

  function closeDrawer() {
    drawer.hidden = true;
    document.body.style.overflow = '';
  }

  function parseCsv(text) {
    const rows = [];
    let row = [], cell = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (quoted) {
        if (char === '"' && text[i + 1] === '"') { cell += '"'; i++; }
        else if (char === '"') quoted = false;
        else cell += char;
      } else if (char === '"') quoted = true;
      else if (char === ',') { row.push(cell); cell = ''; }
      else if (char === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
      else cell += char;
    }
    if (cell.length || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
    const nonEmpty = rows.filter(values => values.some(value => String(value).trim()));
    if (!nonEmpty.length) return [];
    const headers = nonEmpty.shift().map(header => String(header).trim().replace(/^\ufeff/, ''));
    return nonEmpty.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
  }

  function importCsv(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const rows = parseCsv(String(reader.result || ''));
        const records = rows.map(cleanRecord).filter(Boolean);
        if (!records.length) {
          alert('没有读取到有效报名数据。请确认至少包含“姓名”和“报名课程”两列。');
          return;
        }
        state.records = records;
        saveRecords();
        state.selectedCourse = '';
        render();
      } catch (_) {
        alert('CSV 解析失败，请使用模板列名后重试。');
      }
      fileInput.value = '';
    };
    reader.readAsText(file, 'utf-8');
  }

  function csvEscape(value) {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  }

  function downloadText(filename, text, type = 'text/csv;charset=utf-8') {
    const blob = new Blob(['\ufeff', text], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function downloadTemplate() {
    downloadText('旅人教育_共通考试报名信息模板.csv', '姓名,报名课程,线下要求,报名状态,备注\n');
  }

  function exportCsv() {
    if (!state.records.length) return;
    const lines = ['姓名,报名课程,线下要求,报名状态,备注'];
    state.records.forEach(record => {
      lines.push([
        record.name,
        record.courses.join('、'),
        record.requirement,
        record.status,
        record.note
      ].map(csvEscape).join(','));
    });
    downloadText('旅人教育_共通考试报名信息_导出.csv', lines.join('\n'));
  }

  function clearData() {
    if (!state.records.length) return;
    if (!confirm('清除当前浏览器中保存的报名数据？此操作不会影响任何外部文件。')) return;
    state.records = [];
    state.selectedCourse = '';
    localStorage.removeItem(STORAGE_KEY);
    render();
  }

  function subjectKeyFromNode(node) {
    return [...COURSE_NAME_BY_KEY.keys()].find(key => node.classList.contains(key)) || '';
  }

  function studentCountForCourseName(course) {
    return courseMap().get(course)?.length || 0;
  }

  function decorateCalendarCounts() {
    document.querySelectorAll('.enrollment-count-badge').forEach(node => node.remove());
    if (!state.records.length) return;
    document.querySelectorAll('.event[data-event-id], .month-event[data-event-id], .mobile-event[data-event-id]').forEach(node => {
      if (node.classList.contains('cancelled')) return;
      const key = subjectKeyFromNode(node);
      const course = COURSE_NAME_BY_KEY.get(key);
      if (!course) return;
      const count = studentCountForCourseName(course);
      if (!count) return;
      const badge = document.createElement('span');
      badge.className = 'enrollment-count-badge';
      badge.textContent = `${count}人`;
      const target = node.querySelector('.event-name, .month-event-top strong, strong') || node;
      target.append(badge);
    });
  }

  function installDialogEnrollmentButton() {
    const card = document.querySelector('#eventDialog .dialog-card');
    if (!card || document.getElementById('dialogEnrollmentButton')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'dialogEnrollmentButton';
    button.className = 'dialog-enrollment-btn';
    button.innerHTML = '查看报名学生 <span id="dialogEnrollmentCount">未载入</span>';
    button.addEventListener('click', () => {
      const subject = document.getElementById('dialogSubject')?.textContent?.trim() || '';
      closeEventDialogIfOpen();
      openDrawer(subject);
    });
    card.append(button);
  }

  function closeEventDialogIfOpen() {
    const dialog = document.getElementById('eventDialog');
    if (dialog && !dialog.hidden) {
      dialog.hidden = true;
      document.body.style.overflow = '';
    }
  }

  function updateDialogEnrollmentCount() {
    const node = document.getElementById('dialogEnrollmentCount');
    if (!node) return;
    const subject = document.getElementById('dialogSubject')?.textContent?.trim() || '';
    if (!state.records.length) node.textContent = '未载入';
    else node.textContent = `${studentCountForCourseName(subject)} 人`;
  }

  openButton.addEventListener('click', () => openDrawer());
  drawer.addEventListener('click', event => {
    if (event.target.closest('[data-close-enrollment]')) closeDrawer();
    const courseButton = event.target.closest('[data-enrollment-course]');
    if (courseButton) {
      state.selectedCourse = courseButton.dataset.enrollmentCourse;
      state.activeCourseKey = COURSE_KEY_BY_NAME.get(normalize(state.selectedCourse)) || '';
      renderCourseView();
    }
  });
  importButton.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => fileInput.files?.[0] && importCsv(fileInput.files[0]));
  templateButton.addEventListener('click', downloadTemplate);
  exportButton.addEventListener('click', exportCsv);
  clearButton.addEventListener('click', clearData);
  searchInput.addEventListener('input', event => { state.query = event.target.value; render(); });
  requirementFilter.addEventListener('change', event => { state.requirement = event.target.value; render(); });
  tabs.forEach(tab => tab.addEventListener('click', () => { state.view = tab.dataset.enrollmentView; render(); }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !drawer.hidden) closeDrawer(); });

  document.addEventListener('click', event => {
    const eventNode = event.target.closest('[data-event-id]');
    if (!eventNode) return;
    const key = subjectKeyFromNode(eventNode);
    state.activeCourseKey = key;
    window.setTimeout(updateDialogEnrollmentCount, 0);
  });

  const calendarObserver = new MutationObserver(() => {
    decorateCalendarCounts();
    installDialogEnrollmentButton();
    updateDialogEnrollmentCount();
  });
  const calendarPanel = document.querySelector('.office-calendar');
  if (calendarPanel) calendarObserver.observe(calendarPanel, { childList: true, subtree: true });
  const dialog = document.getElementById('eventDialog');
  if (dialog) calendarObserver.observe(dialog, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });

  installDialogEnrollmentButton();
  render();
})();
