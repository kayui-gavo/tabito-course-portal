(() => {
  'use strict';

  const STORAGE_KEY = 'tabitoEnrollmentV2';
  const LEGACY_STORAGE_KEY = 'tabitoEnrollmentV1';

  function normalize(value) {
    return String(value ?? '')
      .trim()
      .toLowerCase()
      .replace(/[\s・·_／/（）()【】\[\]《》<>「」『』\-–—]+/g, '');
  }

  const COURSE_NAME_BY_KEY = new Map(
    [...document.querySelectorAll('#subjectFilter option')]
      .filter(option => option.value && option.value !== 'all')
      .map(option => [option.value, option.textContent.trim()])
  );
  const COURSE_KEY_BY_NAME = new Map([...COURSE_NAME_BY_KEY.entries()].map(([key, name]) => [normalize(name), key]));
  const SCHEDULED_KEYS = new Set(['politics', 'japanese', 'mathIIBC', 'geography', 'commonPhysics', 'privatePhysics']);

  const COURSE_GROUPS = new Map([
    ['物理共通考试冲刺课程', '理科'], ['物理基础', '理科'], ['化学', '理科'], ['化学基础', '理科'],
    ['生物', '理科'], ['生物基础', '理科'], ['地学', '理科'], ['地学基础', '理科'],
    ['国语', '文科'], ['共通考试地理', '文科'], ['公共政治经济', '文科'], ['世界史', '文科'], ['日本史', '文科'], ['中国语', '文科'],
    ['数学IA', '数学'], ['共通考试数学IIBC', '数学'], ['共通英语阅读', '英语'], ['情报I', '其他']
  ]);

  const COURSE_ALIAS = new Map();
  const aliases = [
    ['公共政治经济', ['公共政治经济', '政治经济', '政经', '公民政治经济']],
    ['国语', ['国语', '国语现代文', '现代文', '共通国语']],
    ['共通英语阅读', ['共通英语阅读', '英语阅读', '共通英语', '英语']],
    ['共通考试数学IIBC', ['共通考试数学IIBC', '数学IIBC', '数学2BC', '数学ⅡBC', '2BC', 'IIBC']],
    ['共通考试地理', ['共通考试地理', '共通地理', '地理']],
    ['物理共通考试冲刺课程', ['物理共通考试冲刺课程', '物理冲刺', '共通物理', '物理']],
    ['数学IA', ['数学IA', '数学1A', '数学ⅠA', '1A', 'IA']],
    ['化学', ['化学']], ['生物', ['生物']], ['地学', ['地学']],
    ['物理基础', ['物理基础']], ['化学基础', ['化学基础']], ['生物基础', ['生物基础']], ['地学基础', ['地学基础']],
    ['中国语', ['中国语', '中文']], ['世界史', ['世界史', '历史探究世界史']], ['日本史', ['日本史', '历史探究日本史']],
    ['情报I', ['情报I', '情报1', '信息I', '信息1']]
  ];
  aliases.forEach(([canonical, values]) => values.forEach(value => COURSE_ALIAS.set(normalize(value), canonical)));
  COURSE_NAME_BY_KEY.forEach(name => COURSE_ALIAS.set(normalize(name), name));

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
    pending: document.getElementById('enrollmentPendingCount'),
    unscheduled: document.getElementById('enrollmentUnscheduledCount')
  };
  const searchInput = document.getElementById('enrollmentSearch');
  const requirementFilter = document.getElementById('enrollmentRequirement');
  const content = document.getElementById('enrollmentContent');
  const tabs = [...document.querySelectorAll('[data-enrollment-view]')];

  if (!drawer || !panel || !openButton || !content) return;

  function canonicalCourseName(value) {
    const raw = String(value ?? '').trim();
    return COURSE_ALIAS.get(normalize(raw)) || raw;
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
    return [...new Set(String(value ?? '')
      .split(/[、，,;；|]+/)
      .map(item => canonicalCourseName(item))
      .filter(Boolean))];
  }

  function cleanRecord(row) {
    const name = String(row.name ?? row['姓名'] ?? '').trim();
    const courseValue = row.courses ?? row['报名课程'] ?? row['课程'] ?? '';
    const courses = Array.isArray(courseValue)
      ? [...new Set(courseValue.map(canonicalCourseName).filter(Boolean))]
      : splitCourses(courseValue);
    const requirement = String(row.requirement ?? row['线下要求'] ?? row['上课方式'] ?? '').trim() || '未填写';
    const status = String(row.status ?? row['报名状态'] ?? row['状态'] ?? '').trim() || '已报名';
    const note = String(row.note ?? row['备注'] ?? '').trim();
    if (!name || !courses.length) return null;
    return { name, courses, requirement, status, note };
  }

  function loadRecords() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        raw = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (raw) localStorage.setItem(STORAGE_KEY, raw);
      }
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(cleanRecord).filter(Boolean);
    } catch (_) {
      return [];
    }
  }

  function saveRecords() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records)); } catch (_) {}
  }

  function isInactive(record) { return /退课|取消|无效/.test(record.status); }
  function isPending(record) { return /待|暂定|未确认/.test(record.status); }
  function isOfflineRequired(record) { return /必须.*线下|仅.*线下|只.*线下/.test(record.requirement); }

  function requirementGroup(record) {
    if (isOfflineRequired(record)) return 'offline-required';
    if (/优先.*线下|线下.*优先/.test(record.requirement)) return 'offline-preferred';
    if (/线上|同步|均可|都可|无所谓|不限/.test(record.requirement)) return 'online-ok';
    return 'unspecified';
  }

  function requirementRank(record) {
    return { 'offline-required': 4, 'offline-preferred': 3, 'online-ok': 2, 'unspecified': 1 }[requirementGroup(record)] || 0;
  }

  const state = {
    records: loadRecords(),
    view: 'course',
    selectedCourse: '',
    query: '',
    requirement: 'all',
    activeCourseKey: ''
  };

  function activeRawRecords() { return state.records.filter(record => !isInactive(record)); }

  function studentProfiles() {
    const grouped = new Map();
    activeRawRecords().forEach(record => {
      const key = normalize(record.name);
      if (!grouped.has(key)) grouped.set(key, { name: record.name, courses: [], rows: [], notes: [] });
      const profile = grouped.get(key);
      profile.courses.push(...record.courses);
      profile.rows.push(record);
      if (record.note) profile.notes.push(record.note);
    });

    return [...grouped.values()].map(profile => {
      const strongest = [...profile.rows].sort((a, b) => requirementRank(b) - requirementRank(a))[0];
      return {
        name: profile.name,
        courses: [...new Set(profile.courses.map(canonicalCourseName))],
        requirement: strongest?.requirement || '未填写',
        status: profile.rows.some(isPending) ? '待确认' : (profile.rows[0]?.status || '已报名'),
        note: [...new Set(profile.notes)].join('；')
      };
    });
  }

  function courseMap() {
    const map = new Map();
    studentProfiles().forEach(profile => {
      profile.courses.forEach(course => {
        if (!map.has(course)) map.set(course, []);
        map.get(course).push(profile);
      });
    });
    return map;
  }

  function isScheduledCourse(course) {
    const key = COURSE_KEY_BY_NAME.get(normalize(course));
    return !!key && SCHEDULED_KEYS.has(key);
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
    const profiles = studentProfiles();
    const links = profiles.reduce((sum, profile) => sum + profile.courses.length, 0);
    metrics.students.textContent = String(profiles.length);
    metrics.links.textContent = String(links);
    metrics.offline.textContent = String(profiles.filter(isOfflineRequired).length);
    metrics.pending.textContent = String(profiles.filter(isPending).length);
    if (metrics.unscheduled) metrics.unscheduled.textContent = String([...courseMap().keys()].filter(course => !isScheduledCourse(course)).length);
    sourceLabel.innerHTML = state.records.length
      ? `<strong>本地报名数据</strong> · ${profiles.length} 名学生 · ${state.records.length} 行源数据 · 仅保存在当前浏览器`
      : '<strong>尚未载入报名数据</strong> · 可导入 CSV';
    exportButton.disabled = !state.records.length;
    clearButton.disabled = !state.records.length;
  }

  function renderEmpty() {
    content.innerHTML = `<div class="enrollment-empty"><div><strong>还没有报名数据</strong><p>先下载 CSV 模板，填入姓名、报名课程、线下要求、报名状态与备注后导入。系统会自动统一常见课程名称，并生成选科重合与排课参考。</p></div></div>`;
  }

  function courseSort(a, b) {
    const scheduledA = isScheduledCourse(a[0]) ? 0 : 1;
    const scheduledB = isScheduledCourse(b[0]) ? 0 : 1;
    if (scheduledA !== scheduledB) return scheduledA - scheduledB;
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
      const preferredCount = records.filter(record => requirementGroup(record) === 'offline-preferred').length;
      const active = course === state.selectedCourse ? ' active' : '';
      const pressure = offlineCount ? `${offlineCount} 人必须线下` : preferredCount ? `${preferredCount} 人优先线下` : '无线下硬性要求';
      return `<button type="button" class="enrollment-course-btn${active}" data-enrollment-course="${escapeHtml(course)}"><strong>${escapeHtml(course)}</strong><span>${records.length}</span><small>${pressure} · ${isScheduledCourse(course) ? '已排入日历' : '时间未定'}</small></button>`;
    }).join('');

    const allRecords = map.get(state.selectedCourse) || [];
    const records = filteredRecords(allRecords, state.selectedCourse);
    const offlineCount = allRecords.filter(isOfflineRequired).length;
    const rows = records.length ? records.map(record => `<tr><td><strong>${escapeHtml(record.name)}</strong></td><td><span class="enrollment-chip${isOfflineRequired(record) ? ' offline' : ''}">${escapeHtml(record.requirement)}</span></td><td><span class="enrollment-chip${isPending(record) ? ' pending' : ''}">${escapeHtml(record.status)}</span></td><td>${escapeHtml(record.note || '—')}</td></tr>`).join('') : '<tr><td colspan="4" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';

    content.innerHTML = `<div class="enrollment-course-view"><aside class="enrollment-course-list"><div class="enrollment-course-list-head">课程 · 报名人数</div>${courseButtons}</aside><section class="enrollment-detail"><header class="enrollment-detail-head"><div><h3>${escapeHtml(state.selectedCourse)}</h3><small>${isScheduledCourse(state.selectedCourse) ? '已排入课程日历' : '尚未排入课程日历'}</small></div><span>${allRecords.length} 人${offlineCount ? ` · ${offlineCount} 人必须线下` : ''}</span></header><table class="enrollment-table"><thead><tr><th style="width:22%">姓名</th><th style="width:24%">线下要求</th><th style="width:18%">状态</th><th>备注</th></tr></thead><tbody>${rows}</tbody></table></section></div>`;
  }

  function renderStudentView() {
    const records = filteredRecords(studentProfiles());
    const rows = records.length ? records.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN')).map(record => `<tr><td><strong>${escapeHtml(record.name)}</strong></td><td class="course-cell">${record.courses.map(course => `<span class="course-pill">${escapeHtml(course)}</span>`).join('')}</td><td><span class="enrollment-chip${isOfflineRequired(record) ? ' offline' : ''}">${escapeHtml(record.requirement)}</span></td><td><span class="enrollment-chip${isPending(record) ? ' pending' : ''}">${escapeHtml(record.status)}</span></td><td>${escapeHtml(record.note || '—')}</td></tr>`).join('') : '<tr><td colspan="5" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';
    content.innerHTML = `<div class="enrollment-student-view"><table class="enrollment-table"><thead><tr><th style="width:15%">姓名</th><th style="width:37%">报名课程</th><th style="width:17%">线下要求</th><th style="width:13%">状态</th><th>备注</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function groupFor(course) { return COURSE_GROUPS.get(course) || '其他'; }

  function overlapPairs() {
    const counts = new Map();
    const names = new Map();
    studentProfiles().forEach(profile => {
      const courses = [...new Set(profile.courses)].sort((a, b) => a.localeCompare(b, 'zh-CN'));
      for (let i = 0; i < courses.length; i++) {
        for (let j = i + 1; j < courses.length; j++) {
          const key = `${courses[i]}|||${courses[j]}`;
          counts.set(key, (counts.get(key) || 0) + 1);
          if (!names.has(key)) names.set(key, []);
          names.get(key).push(profile.name);
        }
      }
    });
    return [...counts.entries()].map(([key, count]) => {
      const [a, b] = key.split('|||');
      const ga = groupFor(a), gb = groupFor(b);
      const level = ga === gb && ['理科', '文科', '数学'].includes(ga) ? 'high' : (ga === '数学' || gb === '数学') ? 'medium' : 'normal';
      return { a, b, count, level, students: names.get(key) || [] };
    }).sort((x, y) => y.count - x.count || ({ high: 2, medium: 1, normal: 0 }[y.level] - ({ high: 2, medium: 1, normal: 0 }[x.level])));
  }

  function planningRows() {
    return [...courseMap().entries()].map(([course, profiles]) => ({
      course,
      group: groupFor(course),
      total: profiles.length,
      required: profiles.filter(isOfflineRequired).length,
      preferred: profiles.filter(profile => requirementGroup(profile) === 'offline-preferred').length,
      flexible: profiles.filter(profile => requirementGroup(profile) === 'online-ok').length,
      scheduled: isScheduledCourse(course)
    })).sort((a, b) => Number(a.scheduled) - Number(b.scheduled) || b.total - a.total || b.required - a.required);
  }

  function renderPlanningView() {
    const demand = planningRows();
    if (!demand.length) return renderEmpty();
    const unscheduled = demand.filter(item => !item.scheduled);
    const onlineCandidates = demand.filter(item => !item.required && !item.preferred && item.total > 0);
    const pressure = [...demand].filter(item => item.required || item.preferred).sort((a, b) => b.required - a.required || b.preferred - a.preferred || b.total - a.total).slice(0, 6);
    const overlaps = overlapPairs();

    const demandRows = demand.map(item => `<tr><td><strong>${escapeHtml(item.course)}</strong><small class="course-group">${escapeHtml(item.group)}</small></td><td class="number-cell">${item.total}</td><td class="number-cell${item.required ? ' danger-number' : ''}">${item.required}</td><td class="number-cell">${item.preferred}</td><td class="number-cell">${item.flexible}</td><td><span class="schedule-state ${item.scheduled ? 'scheduled' : 'unscheduled'}">${item.scheduled ? '已排' : '时间未定'}</span></td></tr>`).join('');

    const conflictRows = overlaps.length ? overlaps.slice(0, 12).map(pair => `<tr><td><strong>${escapeHtml(pair.a)}</strong><span class="pair-arrow">×</span><strong>${escapeHtml(pair.b)}</strong></td><td class="number-cell"><b>${pair.count}</b> 人</td><td><span class="conflict-level ${pair.level}">${pair.level === 'high' ? `${escapeHtml(groupFor(pair.a))}原则上错开` : pair.level === 'medium' ? '涉及数学，优先错开' : '有实际重合'}</span></td><td class="student-sample">${escapeHtml(pair.students.slice(0, 4).join('、'))}${pair.students.length > 4 ? ` 等${pair.students.length}人` : ''}</td></tr>`).join('') : '<tr><td colspan="4" class="enrollment-no-results">当前没有学生同时报名两门以上课程。</td></tr>';

    const unscheduledCards = unscheduled.length ? unscheduled.map(item => `<div class="planning-card-row"><strong>${escapeHtml(item.course)}</strong><span>${item.total} 人报名${item.required ? ` · ${item.required} 人必须线下` : ''}</span></div>`).join('') : '<p class="planning-empty-line">当前报名课程都已经进入日历。</p>';
    const pressureChips = pressure.length ? pressure.map(item => `<span class="planning-inline-chip pressure">${escapeHtml(item.course)} · ${item.required ? `${item.required}必须` : `${item.preferred}优先`}</span>`).join('') : '<span class="planning-muted">尚无明确线下要求。</span>';
    const onlineChips = onlineCandidates.length ? onlineCandidates.map(item => `<span class="planning-inline-chip">${escapeHtml(item.course)} · ${item.total}人</span>`).join('') : '<span class="planning-muted">暂无明确候选。</span>';

    content.innerHTML = `<div class="enrollment-planning-view"><section class="planning-callouts"><article><span class="planning-kicker">时间未定</span><strong>${unscheduled.length} 门</strong><div>${unscheduledCards}</div></article><article><span class="planning-kicker">线下压力</span><strong>${demand.reduce((sum, item) => sum + item.required, 0)} 人次</strong><div class="planning-chip-wrap">${pressureChips}</div></article><article><span class="planning-kicker">可评估线上</span><strong>${onlineCandidates.length} 门</strong><div class="planning-chip-wrap">${onlineChips}</div></article></section><section class="planning-section"><header><div><h3>课程需求</h3><p>先看报名人数与线下压力，再决定是否开班以及占用哪类教室。</p></div></header><div class="planning-table-wrap"><table class="enrollment-table planning-table"><thead><tr><th>课程</th><th>报名</th><th>必须线下</th><th>优先线下</th><th>可线上/同步</th><th>排课状态</th></tr></thead><tbody>${demandRows}</tbody></table></div></section><section class="planning-section"><header><div><h3>学生选科重合</h3><p>同时报名人数直接来自导入数据；理科与理科、文科与文科默认标为高优先级错开，数学与其他科目也优先避免冲突。</p></div></header><div class="planning-table-wrap"><table class="enrollment-table planning-table conflict-table"><thead><tr><th>课程组合</th><th>重合</th><th>排课提示</th><th>学生</th></tr></thead><tbody>${conflictRows}</tbody></table></div></section></div>`;
  }

  function render() {
    updateMetrics();
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.enrollmentView === state.view));
    if (searchInput) searchInput.disabled = state.view === 'planning';
    if (requirementFilter) requirementFilter.disabled = state.view === 'planning';
    decorateCalendarCounts();
    updateDialogEnrollmentCount();
    if (!state.records.length) return renderEmpty();
    if (state.view === 'student') renderStudentView();
    else if (state.view === 'planning') renderPlanningView();
    else renderCourseView();
  }

  function openDrawer(course = '') {
    if (course) {
      state.view = 'course';
      state.selectedCourse = canonicalCourseName(course);
      state.activeCourseKey = COURSE_KEY_BY_NAME.get(normalize(state.selectedCourse)) || '';
    }
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    render();
    if (state.view !== 'planning') window.setTimeout(() => searchInput?.focus(), 40);
  }

  function closeDrawer() { drawer.hidden = true; document.body.style.overflow = ''; }

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
        if (!records.length) { alert('没有读取到有效报名数据。请确认至少包含“姓名”和“报名课程”两列。'); return; }
        state.records = records;
        saveRecords();
        state.selectedCourse = '';
        state.view = 'course';
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
    downloadText('旅人教育_共通考试报名信息模板.csv', ['姓名,报名课程,线下要求,报名状态,备注', '示例学生,"物理、数学2BC",必须线下,已报名,', '示例学生2,"政经、国语、地理",均可,待确认,'].join('\n'));
  }

  function exportCsv() {
    if (!state.records.length) return;
    const lines = ['姓名,报名课程,线下要求,报名状态,备注'];
    state.records.forEach(record => lines.push([record.name, record.courses.join('、'), record.requirement, record.status, record.note].map(csvEscape).join(',')));
    downloadText('旅人教育_共通考试报名信息_导出.csv', lines.join('\n'));
  }

  function clearData() {
    if (!state.records.length) return;
    if (!confirm('清除当前浏览器中保存的报名数据？此操作不会影响任何外部文件。')) return;
    state.records = [];
    state.selectedCourse = '';
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    render();
  }

  function subjectKeyFromNode(node) { return [...COURSE_NAME_BY_KEY.keys()].find(key => node.classList.contains(key)) || ''; }
  function studentCountForCourseName(course) { return courseMap().get(canonicalCourseName(course))?.length || 0; }

  function decorateCalendarCounts() {
    const nodes = document.querySelectorAll('.event[data-event-id], .month-event[data-event-id], .mobile-event[data-event-id]');
    nodes.forEach(node => {
      const existing = node.querySelector('.enrollment-count-badge');
      if (!state.records.length || node.classList.contains('cancelled')) { if (existing) existing.remove(); return; }
      const key = subjectKeyFromNode(node);
      const course = COURSE_NAME_BY_KEY.get(key);
      const count = course ? studentCountForCourseName(course) : 0;
      if (!count) { if (existing) existing.remove(); return; }
      const label = `${count}人`;
      if (existing) { if (existing.textContent !== label) existing.textContent = label; return; }
      const badge = document.createElement('span');
      badge.className = 'enrollment-count-badge';
      badge.textContent = label;
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
    if (dialog && !dialog.hidden) { dialog.hidden = true; document.body.style.overflow = ''; }
  }

  function updateDialogEnrollmentCount() {
    const node = document.getElementById('dialogEnrollmentCount');
    if (!node) return;
    const subject = document.getElementById('dialogSubject')?.textContent?.trim() || '';
    const label = state.records.length ? `${studentCountForCourseName(subject)} 人` : '未载入';
    if (node.textContent !== label) node.textContent = label;
  }

  openButton.addEventListener('click', () => openDrawer());
  drawer.addEventListener('click', event => {
    if (event.target.closest('[data-close-enrollment]')) closeDrawer();
    const courseButton = event.target.closest('[data-enrollment-course]');
    if (courseButton) { state.selectedCourse = courseButton.dataset.enrollmentCourse; state.activeCourseKey = COURSE_KEY_BY_NAME.get(normalize(state.selectedCourse)) || ''; renderCourseView(); }
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
    state.activeCourseKey = subjectKeyFromNode(eventNode);
    window.setTimeout(updateDialogEnrollmentCount, 0);
  });

  let observerQueued = false;
  const calendarObserver = new MutationObserver(() => {
    if (observerQueued) return;
    observerQueued = true;
    requestAnimationFrame(() => {
      observerQueued = false;
      decorateCalendarCounts();
      installDialogEnrollmentButton();
      updateDialogEnrollmentCount();
    });
  });
  const calendarPanel = document.querySelector('.office-calendar');
  if (calendarPanel) calendarObserver.observe(calendarPanel, { childList: true, subtree: true });
  const dialog = document.getElementById('eventDialog');
  if (dialog) calendarObserver.observe(dialog, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });

  installDialogEnrollmentButton();
  render();
})();