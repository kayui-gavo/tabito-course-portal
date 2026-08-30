(() => {
  'use strict';

  const STORAGE_KEY = 'tabitoEnrollmentV3';
  const LEGACY_KEYS = ['tabitoEnrollmentV2', 'tabitoEnrollmentV1'];

  const normalize = value => String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s・·_／/（）()【】\[\]《》<>「」『』\-–—]+/g, '');

  const escapeHtml = value => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

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
    ['数学IA', '数学'], ['共通考试数学IIBC', '数学'], ['数学（待确认）', '数学'],
    ['共通英语阅读', '英语'], ['雅思一对一', '英语'], ['情报I', '其他'], ['魏思远物理一对一', '理科']
  ]);

  const COURSE_ALIAS = new Map();
  [
    ['公共政治经济', ['公共政治经济', '公共', '政治经济', '政经', '公民政治经济', '公共政经']],
    ['国语', ['国语', '国语现代文', '现代文', '共通国语']],
    ['共通英语阅读', ['共通英语阅读', '英语阅读', '共通英语']],
    ['雅思一对一', ['雅思一对一', '雅思1对1', 'ielts一对一', 'ielts1对1']],
    ['共通考试数学IIBC', ['共通考试数学IIBC', '数学IIBC', '数学2BC', '数学ⅡBC', '数学2', '2BC', 'IIBC']],
    ['共通考试地理', ['共通考试地理', '共通地理', '地理']],
    ['物理共通考试冲刺课程', ['物理共通考试冲刺课程', '物理冲刺', '共通物理', '物理']],
    ['魏思远物理一对一', ['魏思远物理一对一', '物理1对1', '物理一对一']],
    ['数学IA', ['数学IA', '数学1A', '数学ⅠA', '数学1', '1A', 'IA']],
    ['化学', ['化学']], ['生物', ['生物']], ['地学', ['地学']],
    ['物理基础', ['物理基础']], ['化学基础', ['化学基础']], ['生物基础', ['生物基础']], ['地学基础', ['地学基础']],
    ['中国语', ['中国语', '中文']], ['世界史', ['世界史', '历史探究世界史']], ['日本史', ['日本史', '历史探究日本史']],
    ['情报I', ['情报I', '情报1', '信息I', '信息1']]
  ].forEach(([canonical, values]) => values.forEach(value => COURSE_ALIAS.set(normalize(value), canonical)));
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
  const searchInput = document.getElementById('enrollmentSearch');
  const requirementFilter = document.getElementById('enrollmentRequirement');
  const content = document.getElementById('enrollmentContent');

  if (!drawer || !panel || !openButton || !content) return;

  function installUi() {
    const subtitle = document.querySelector('.enrollment-head p');
    if (subtitle) subtitle.textContent = '课程报名、学生选科、线下需求与排课风险统一核对。';

    const metrics = document.querySelector('.enrollment-metrics');
    if (metrics && !document.getElementById('enrollmentUnscheduledCount')) {
      const item = document.createElement('div');
      item.className = 'enrollment-metric unscheduled';
      item.innerHTML = '<span>时间未定科目</span><strong id="enrollmentUnscheduledCount">0</strong>';
      metrics.append(item);
    }

    const tabs = document.querySelector('.enrollment-tabs');
    if (tabs && !tabs.querySelector('[data-enrollment-view="planning"]')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'enrollment-tab';
      button.dataset.enrollmentView = 'planning';
      button.textContent = '排课参考';
      tabs.append(button);
    }

    const toolbar = document.querySelector('.enrollment-toolbar');
    if (toolbar && !document.getElementById('enrollmentStatus')) {
      const status = document.createElement('select');
      status.id = 'enrollmentStatus';
      status.className = 'enrollment-status';
      status.setAttribute('aria-label', '筛选报名状态');
      status.innerHTML = '<option value="active">当前报名</option><option value="all">全部记录</option><option value="history">已结课 / 已退出</option>';
      toolbar.append(status);
    }
    if (toolbar && !document.getElementById('enrollmentMonth')) {
      const month = document.createElement('select');
      month.id = 'enrollmentMonth';
      month.className = 'enrollment-month';
      month.setAttribute('aria-label', '筛选报名时间');
      month.innerHTML = '<option value="all">全部报名时间</option>';
      toolbar.append(month);
    }
  }
  installUi();

  const statusFilter = document.getElementById('enrollmentStatus');
  const monthFilter = document.getElementById('enrollmentMonth');
  const tabs = [...document.querySelectorAll('[data-enrollment-view]')];
  const metrics = {
    students: document.getElementById('enrollmentStudentCount'),
    links: document.getElementById('enrollmentLinkCount'),
    offline: document.getElementById('enrollmentOfflineCount'),
    pending: document.getElementById('enrollmentPendingCount'),
    unscheduled: document.getElementById('enrollmentUnscheduledCount')
  };

  function canonicalCourseName(value) {
    const raw = String(value ?? '').trim();
    return COURSE_ALIAS.get(normalize(raw)) || raw;
  }

  function splitRawCourses(value) {
    return String(value ?? '').split(/[、，,;；|]+/).map(item => item.trim()).filter(Boolean);
  }

  function inferGenericMath(rawCourses, canonicalCourses) {
    const hasGenericMath = rawCourses.some(course => normalize(course) === '数学');
    if (!hasGenericMath) return canonicalCourses;

    const withoutGeneric = canonicalCourses.filter(course => normalize(course) !== '数学');
    const otherGroups = withoutGeneric.map(course => COURSE_GROUPS.get(course)).filter(Boolean);
    const hasHumanities = otherGroups.includes('文科');
    const hasScience = otherGroups.includes('理科');
    const inferred = hasHumanities && !hasScience ? '数学IA' : '数学（待确认）';
    return [...new Set([...withoutGeneric, inferred])];
  }

  function cleanSignupTime(value) {
    const raw = String(value ?? '').trim();
    if (!raw) return '';
    const normalized = raw.replace(/\s+/g, '');
    const match = normalized.match(/(20\d{2})[年\/.\-]?(\d{1,2})月?/);
    if (!match) return raw;
    return `${match[1]}年${Number(match[2])}月`;
  }

  function monthSortKey(value) {
    const match = String(value ?? '').match(/(20\d{2})年(\d{1,2})月/);
    return match ? Number(match[1]) * 100 + Number(match[2]) : 0;
  }

  function cleanRecord(row) {
    const name = String(row.name ?? row['姓名'] ?? '').trim();
    const courseValue = row.courses ?? row['报名课程'] ?? row['课程'] ?? '';
    const rawCourses = Array.isArray(courseValue) ? courseValue.map(String) : splitRawCourses(courseValue);
    let courses = rawCourses.map(canonicalCourseName).filter(Boolean);
    courses = inferGenericMath(rawCourses, courses);
    courses = [...new Set(courses)];
    const signupTime = cleanSignupTime(row.signupTime ?? row['报名时间'] ?? row['报名月份'] ?? row['报名月'] ?? '');
    const requirement = String(row.requirement ?? row['线下要求'] ?? row['上课方式'] ?? '').trim() || '未填写';
    const status = String(row.status ?? row['报名状态'] ?? row['状态'] ?? '').trim() || '已报名';
    const note = String(row.note ?? row['备注'] ?? '').trim();
    return name && courses.length ? { name, courses, signupTime, requirement, status, note } : null;
  }

  function loadRecords() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        for (const key of LEGACY_KEYS) {
          raw = localStorage.getItem(key);
          if (raw) break;
        }
      }
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const records = Array.isArray(parsed) ? parsed.map(cleanRecord).filter(Boolean) : [];
      if (records.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return records;
    } catch (_) {
      return [];
    }
  }

  const state = {
    records: loadRecords(),
    view: 'course',
    selectedCourse: '',
    query: '',
    requirement: 'all',
    statusScope: 'active',
    month: 'all',
    activeCourseKey: ''
  };

  function saveRecords() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records)); } catch (_) {}
  }

  function isCompleted(record) { return /结课|已完课|修了|结束/.test(record.status); }
  function isWithdrawn(record) { return /退课|取消|无效|退出/.test(record.status); }
  function isHistorical(record) { return isCompleted(record) || isWithdrawn(record); }
  function isActive(record) { return !isHistorical(record); }
  function isPending(record) { return /待|暂定|未确认/.test(record.status) || record.courses.includes('数学（待确认）'); }
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

  function allRelations() {
    const deduped = new Map();
    state.records.forEach((record, rowIndex) => {
      record.courses.forEach(course => {
        const relation = { ...record, course, rowIndex };
        const key = `${normalize(record.name)}|||${normalize(course)}|||${normalize(record.status)}|||${record.signupTime}`;
        if (!deduped.has(key)) deduped.set(key, relation);
      });
    });
    return [...deduped.values()];
  }

  function currentRelations() {
    return allRelations().filter(isActive);
  }

  function relationScope() {
    if (state.statusScope === 'history') return allRelations().filter(isHistorical);
    if (state.statusScope === 'all') return allRelations();
    return currentRelations();
  }

  function studentProfiles(relations = relationScope()) {
    const grouped = new Map();
    relations.forEach(relation => {
      const key = normalize(relation.name);
      if (!grouped.has(key)) grouped.set(key, { name: relation.name, relations: [], courses: [] });
      const profile = grouped.get(key);
      profile.relations.push(relation);
      profile.courses.push(relation.course);
    });

    return [...grouped.values()].map(profile => {
      const strongest = [...profile.relations].sort((a, b) => requirementRank(b) - requirementRank(a))[0];
      const newest = [...profile.relations].sort((a, b) => monthSortKey(b.signupTime) - monthSortKey(a.signupTime))[0];
      return {
        name: profile.name,
        courses: [...new Set(profile.courses)],
        signupTime: newest?.signupTime || '',
        requirement: strongest?.requirement || '未填写',
        status: profile.relations.some(isPending) ? '待确认' : profile.relations.some(isActive) ? '已报名' : (profile.relations[0]?.status || '—'),
        note: [...new Set(profile.relations.map(item => item.note).filter(Boolean))].join('；'),
        relations: profile.relations
      };
    });
  }

  function currentCourseMap() {
    const map = new Map();
    currentRelations().forEach(relation => {
      if (!map.has(relation.course)) map.set(relation.course, []);
      map.get(relation.course).push(relation);
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
    return [record.name, record.requirement, record.status, record.note, record.signupTime, ...(record.courses || []), record.course, course]
      .filter(Boolean)
      .some(value => normalize(value).includes(query));
  }

  function matchesRequirement(record) {
    return state.requirement === 'all' || requirementGroup(record) === state.requirement;
  }

  function matchesMonth(record) {
    return state.month === 'all' || record.signupTime === state.month;
  }

  function filteredRelations(relations, course = '') {
    return relations.filter(record => matchesSearch(record, course) && matchesRequirement(record) && matchesMonth(record));
  }

  function refreshMonthFilter() {
    if (!monthFilter) return;
    const current = state.month;
    const months = [...new Set(state.records.map(record => record.signupTime).filter(Boolean))]
      .sort((a, b) => monthSortKey(b) - monthSortKey(a));
    monthFilter.innerHTML = '<option value="all">全部报名时间</option>' + months.map(month => `<option value="${escapeHtml(month)}">${escapeHtml(month)}</option>`).join('');
    monthFilter.value = months.includes(current) ? current : 'all';
    state.month = monthFilter.value;
  }

  function updateMetrics() {
    const current = currentRelations();
    const currentStudents = new Set(current.map(relation => normalize(relation.name)));
    const currentCourses = currentCourseMap();
    const offlineStudents = new Set(current.filter(isOfflineRequired).map(relation => normalize(relation.name)));
    const pendingStudents = new Set(current.filter(isPending).map(relation => normalize(relation.name)));
    metrics.students.textContent = String(currentStudents.size);
    metrics.links.textContent = String(current.length);
    metrics.offline.textContent = String(offlineStudents.size);
    metrics.pending.textContent = String(pendingStudents.size);
    metrics.unscheduled.textContent = String([...currentCourses.keys()].filter(course => !isScheduledCourse(course)).length);

    const historyCount = allRelations().filter(isHistorical).length;
    sourceLabel.innerHTML = state.records.length
      ? `<strong>本地报名数据</strong> · 当前 ${currentStudents.size} 名学生 / ${current.length} 条报名${historyCount ? ` · 历史 ${historyCount} 条` : ''} · 仅保存在本浏览器`
      : '<strong>尚未载入报名数据</strong> · 可导入 CSV';
    exportButton.disabled = !state.records.length;
    clearButton.disabled = !state.records.length;
  }

  function renderEmpty(message = '') {
    content.innerHTML = `<div class="enrollment-empty"><div><strong>${message || '还没有报名数据'}</strong><p>${state.records.length ? '当前筛选条件下没有符合的报名记录。' : '可直接导入 CSV。建议保留“姓名、报名课程、报名时间、线下要求、报名状态、备注”六列；系统会自动统一常见课程名称。'}</p></div></div>`;
  }

  function courseListEntries() {
    const map = new Map();
    relationScope().forEach(relation => {
      if (!map.has(relation.course)) map.set(relation.course, []);
      map.get(relation.course).push(relation);
    });
    return [...map.entries()].sort((a, b) => {
      const aCurrent = a[1].some(isActive), bCurrent = b[1].some(isActive);
      if (aCurrent !== bCurrent) return Number(bCurrent) - Number(aCurrent);
      if (isScheduledCourse(a[0]) !== isScheduledCourse(b[0])) return Number(isScheduledCourse(b[0])) - Number(isScheduledCourse(a[0]));
      return b[1].length - a[1].length || a[0].localeCompare(b[0], 'zh-CN');
    });
  }

  function renderCourseView() {
    const entries = courseListEntries();
    if (!entries.length) return renderEmpty('没有符合条件的课程');
    const map = new Map(entries);
    if (!state.selectedCourse || !map.has(state.selectedCourse)) {
      const preferred = state.activeCourseKey ? COURSE_NAME_BY_KEY.get(state.activeCourseKey) : '';
      state.selectedCourse = preferred && map.has(preferred) ? preferred : entries[0][0];
    }

    const buttons = entries.map(([course, relations]) => {
      const activeCount = relations.filter(isActive).length;
      const required = relations.filter(isOfflineRequired).length;
      const pending = relations.filter(isPending).length;
      const statusText = activeCount ? (isScheduledCourse(course) ? '已排入日历' : '时间未定') : '历史课程';
      const detail = [required ? `${required} 人必须线下` : '', pending ? `${pending} 条待确认` : '', statusText].filter(Boolean).join(' · ');
      return `<button type="button" class="enrollment-course-btn${course === state.selectedCourse ? ' active' : ''}" data-enrollment-course="${escapeHtml(course)}"><strong>${escapeHtml(course)}</strong><span>${activeCount || relations.length}</span><small>${escapeHtml(detail)}</small></button>`;
    }).join('');

    const all = map.get(state.selectedCourse) || [];
    const records = filteredRelations(all, state.selectedCourse).sort((a, b) => monthSortKey(b.signupTime) - monthSortKey(a.signupTime) || a.name.localeCompare(b.name, 'zh-CN'));
    const rows = records.length ? records.map(record => {
      const statusClass = isHistorical(record) ? ' history' : isPending(record) ? ' pending' : '';
      return `<tr><td><strong>${escapeHtml(record.name)}</strong></td><td>${escapeHtml(record.signupTime || '—')}</td><td><span class="enrollment-chip${isOfflineRequired(record) ? ' offline' : ''}">${escapeHtml(record.requirement)}</span></td><td><span class="enrollment-status-text${statusClass}">${escapeHtml(record.status)}</span></td><td>${escapeHtml(record.note || '—')}</td></tr>`;
    }).join('') : '<tr><td colspan="5" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';

    const currentCount = all.filter(isActive).length;
    const historicalCount = all.filter(isHistorical).length;
    const meta = [currentCount ? `当前 ${currentCount} 人` : '', historicalCount ? `历史 ${historicalCount} 条` : '', all.filter(isOfflineRequired).length ? `${all.filter(isOfflineRequired).length} 人必须线下` : ''].filter(Boolean).join(' · ');

    content.innerHTML = `<div class="enrollment-course-view"><aside class="enrollment-course-list"><div class="enrollment-course-list-head">课程 <span>当前人数</span></div>${buttons}</aside><section class="enrollment-detail"><header class="enrollment-detail-head"><div><h3>${escapeHtml(state.selectedCourse)}</h3><small>${isScheduledCourse(state.selectedCourse) ? '已排入课程日历' : currentCount ? '尚未排入课程日历' : '历史课程'}</small></div><span>${escapeHtml(meta || '—')}</span></header><table class="enrollment-table"><thead><tr><th style="width:17%">姓名</th><th style="width:16%">报名时间</th><th style="width:20%">线下要求</th><th style="width:15%">状态</th><th>备注</th></tr></thead><tbody>${rows}</tbody></table></section></div>`;
  }

  function renderStudentView() {
    const relations = filteredRelations(relationScope());
    const profiles = studentProfiles(relations)
      .filter(profile => matchesSearch(profile) && matchesRequirement(profile) && matchesMonth(profile))
      .sort((a, b) => monthSortKey(b.signupTime) - monthSortKey(a.signupTime) || a.name.localeCompare(b.name, 'zh-CN'));

    const rows = profiles.length ? profiles.map(profile => {
      const courseHtml = profile.relations
        .sort((a, b) => Number(isHistorical(a)) - Number(isHistorical(b)) || a.course.localeCompare(b.course, 'zh-CN'))
        .map(relation => `<span class="course-pill${isHistorical(relation) ? ' historical' : ''}">${escapeHtml(relation.course)}${isHistorical(relation) ? ` · ${escapeHtml(relation.status)}` : ''}</span>`)
        .join('');
      return `<tr><td><strong>${escapeHtml(profile.name)}</strong></td><td class="course-cell">${courseHtml}</td><td>${escapeHtml(profile.signupTime || '—')}</td><td><span class="enrollment-chip${isOfflineRequired(profile) ? ' offline' : ''}">${escapeHtml(profile.requirement)}</span></td><td><span class="enrollment-status-text${profile.status === '待确认' ? ' pending' : ''}">${escapeHtml(profile.status)}</span></td><td>${escapeHtml(profile.note || '—')}</td></tr>`;
    }).join('') : '<tr><td colspan="6" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';

    content.innerHTML = `<div class="enrollment-student-view"><table class="enrollment-table"><thead><tr><th style="width:13%">姓名</th><th style="width:31%">报名课程</th><th style="width:14%">报名时间</th><th style="width:15%">线下要求</th><th style="width:12%">状态</th><th>备注</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function groupFor(course) { return COURSE_GROUPS.get(course) || '其他'; }

  function overlapPairs() {
    const studentCourses = new Map();
    currentRelations().forEach(relation => {
      const key = normalize(relation.name);
      if (!studentCourses.has(key)) studentCourses.set(key, { name: relation.name, courses: new Set() });
      studentCourses.get(key).courses.add(relation.course);
    });

    const counts = new Map();
    const names = new Map();
    studentCourses.forEach(profile => {
      const courses = [...profile.courses].sort((a, b) => a.localeCompare(b, 'zh-CN'));
      for (let i = 0; i < courses.length; i++) for (let j = i + 1; j < courses.length; j++) {
        const key = `${courses[i]}|||${courses[j]}`;
        counts.set(key, (counts.get(key) || 0) + 1);
        if (!names.has(key)) names.set(key, []);
        names.get(key).push(profile.name);
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
    return [...currentCourseMap().entries()].map(([course, relations]) => ({
      course,
      group: groupFor(course),
      total: new Set(relations.map(relation => normalize(relation.name))).size,
      required: new Set(relations.filter(isOfflineRequired).map(relation => normalize(relation.name))).size,
      preferred: new Set(relations.filter(relation => requirementGroup(relation) === 'offline-preferred').map(relation => normalize(relation.name))).size,
      flexible: new Set(relations.filter(relation => requirementGroup(relation) === 'online-ok').map(relation => normalize(relation.name))).size,
      unspecified: new Set(relations.filter(relation => requirementGroup(relation) === 'unspecified').map(relation => normalize(relation.name))).size,
      pending: new Set(relations.filter(isPending).map(relation => normalize(relation.name))).size,
      scheduled: isScheduledCourse(course)
    })).sort((a, b) => Number(a.scheduled) - Number(b.scheduled) || b.total - a.total || b.required - a.required || a.course.localeCompare(b.course, 'zh-CN'));
  }

  function registrationTimeline() {
    const months = new Map();
    currentRelations().forEach(relation => {
      const month = relation.signupTime || '未填写';
      if (!months.has(month)) months.set(month, new Set());
      months.get(month).add(normalize(relation.name));
    });
    return [...months.entries()]
      .map(([month, names]) => ({ month, count: names.size }))
      .sort((a, b) => monthSortKey(b.month) - monthSortKey(a.month));
  }

  function dataIssues() {
    const issues = [];
    const current = currentRelations();
    const ambiguousMath = current.filter(relation => relation.course === '数学（待确认）');
    if (ambiguousMath.length) issues.push({ level: 'high', title: '数学科目待确认', text: [...new Set(ambiguousMath.map(item => item.name))].join('、') });
    const missingRequirement = current.filter(relation => requirementGroup(relation) === 'unspecified');
    const missingStudents = [...new Set(missingRequirement.map(item => item.name))];
    if (missingStudents.length) issues.push({ level: 'medium', title: '线下要求未填写', text: `${missingStudents.length} 名：${missingStudents.slice(0, 6).join('、')}${missingStudents.length > 6 ? '…' : ''}` });
    const missingTime = current.filter(relation => !relation.signupTime);
    const missingTimeStudents = [...new Set(missingTime.map(item => item.name))];
    if (missingTimeStudents.length) issues.push({ level: 'normal', title: '报名时间未填写', text: `${missingTimeStudents.length} 名` });
    return issues;
  }

  function renderPlanningView() {
    const demand = planningRows();
    if (!demand.length) return renderEmpty('暂无当前报名数据');

    const unscheduled = demand.filter(item => !item.scheduled);
    const totalCurrentStudents = new Set(currentRelations().map(item => normalize(item.name))).size;
    const missingOffline = new Set(currentRelations().filter(item => requirementGroup(item) === 'unspecified').map(item => normalize(item.name))).size;
    const pendingCount = new Set(currentRelations().filter(isPending).map(item => normalize(item.name))).size;

    const demandRows = demand.map(item => `<tr><td><strong>${escapeHtml(item.course)}</strong><small class="course-group">${escapeHtml(item.group)}</small></td><td class="number-cell">${item.total}</td><td class="number-cell${item.required ? ' danger-number' : ''}">${item.required}</td><td class="number-cell">${item.preferred}</td><td class="number-cell">${item.flexible}</td><td class="number-cell${item.unspecified ? ' warn-number' : ''}">${item.unspecified}</td><td><span class="schedule-state ${item.scheduled ? 'scheduled' : 'unscheduled'}">${item.scheduled ? '已排' : '时间未定'}</span></td></tr>`).join('');

    const overlaps = overlapPairs();
    const conflictRows = overlaps.length ? overlaps.slice(0, 16).map(pair => `<tr><td><strong>${escapeHtml(pair.a)}</strong><span class="pair-arrow">×</span><strong>${escapeHtml(pair.b)}</strong></td><td class="number-cell"><b>${pair.count}</b> 人</td><td><span class="conflict-level ${pair.level}">${pair.level === 'high' ? `${escapeHtml(groupFor(pair.a))}原则上错开` : pair.level === 'medium' ? '涉及数学，优先错开' : '有实际重合'}</span></td><td class="student-sample">${escapeHtml(pair.students.slice(0, 5).join('、'))}${pair.students.length > 5 ? ` 等${pair.students.length}人` : ''}</td></tr>`).join('') : '<tr><td colspan="4" class="enrollment-no-results">当前没有学生同时报名两门以上课程。</td></tr>';

    const timeline = registrationTimeline();
    const timelineRows = timeline.length ? timeline.map(item => `<tr><td>${escapeHtml(item.month)}</td><td class="number-cell">${item.count}</td></tr>`).join('') : '<tr><td colspan="2" class="enrollment-no-results">暂无报名时间数据。</td></tr>';

    const issues = dataIssues();
    const issueRows = issues.length ? issues.map(issue => `<div class="planning-issue ${issue.level}"><strong>${escapeHtml(issue.title)}</strong><span>${escapeHtml(issue.text)}</span></div>`).join('') : '<p class="planning-muted">当前没有明显的数据完整性问题。</p>';

    const unscheduledRows = unscheduled.length ? unscheduled.map(item => `<div class="planning-line"><strong>${escapeHtml(item.course)}</strong><span>${item.total} 人${item.required ? ` · ${item.required} 人必须线下` : ''}</span></div>`).join('') : '<p class="planning-muted">当前有报名的课程均已进入日历。</p>';

    content.innerHTML = `<div class="enrollment-planning-view">
      <section class="planning-summary" aria-label="排课摘要">
        <div><span>当前学生</span><strong>${totalCurrentStudents}</strong></div>
        <div><span>时间未定</span><strong>${unscheduled.length}</strong></div>
        <div><span>线下要求未填</span><strong>${missingOffline}</strong></div>
        <div><span>待确认</span><strong>${pendingCount}</strong></div>
      </section>

      <div class="planning-lead-grid">
        <section class="planning-plain-section"><header><h3>优先处理</h3><p>先补齐影响排课决策的信息，再冻结时间与教室。</p></header><div class="planning-issues">${issueRows}</div></section>
        <section class="planning-plain-section"><header><h3>尚未排课</h3><p>有当前报名，但尚未进入课程日历。</p></header><div class="planning-lines">${unscheduledRows}</div></section>
        <section class="planning-plain-section timeline-section"><header><h3>报名时间</h3><p>按学生首次进入当前报名数据统计。</p></header><table class="planning-mini-table"><thead><tr><th>月份</th><th>学生</th></tr></thead><tbody>${timelineRows}</tbody></table></section>
      </div>

      <section class="planning-section"><header><div><h3>课程需求</h3><p>把报名规模、线下需求和排课状态放在同一张表中，决定是否开班与使用哪类教室。</p></div></header><div class="planning-table-wrap"><table class="enrollment-table planning-table"><thead><tr><th>课程</th><th>报名</th><th>必须线下</th><th>优先线下</th><th>可线上/同步</th><th>未填写</th><th>排课状态</th></tr></thead><tbody>${demandRows}</tbody></table></div></section>

      <section class="planning-section"><header><div><h3>学生选科重合</h3><p>只统计当前有效报名；理科之间、文科之间默认优先错开，数学与其他科目也优先避免冲突。</p></div></header><div class="planning-table-wrap"><table class="enrollment-table planning-table conflict-table"><thead><tr><th>课程组合</th><th>重合</th><th>排课提示</th><th>学生</th></tr></thead><tbody>${conflictRows}</tbody></table></div></section>
    </div>`;
  }

  function render() {
    updateMetrics();
    refreshMonthFilter();
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.enrollmentView === state.view));

    const planning = state.view === 'planning';
    searchInput.disabled = planning;
    requirementFilter.disabled = planning;
    statusFilter.disabled = planning;
    monthFilter.disabled = planning;

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
      state.statusScope = 'active';
      if (statusFilter) statusFilter.value = 'active';
    }
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    render();
    if (state.view !== 'planning') window.setTimeout(() => searchInput?.focus(), 40);
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
        const records = parseCsv(String(reader.result || '')).map(cleanRecord).filter(Boolean);
        if (!records.length) {
          alert('没有读取到有效报名数据。请确认至少包含“姓名”和“报名课程”两列。');
          return;
        }
        state.records = records;
        saveRecords();
        state.selectedCourse = '';
        state.view = 'course';
        state.statusScope = 'active';
        state.month = 'all';
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

  function downloadText(filename, text) {
    const blob = new Blob(['\ufeff', text], { type: 'text/csv;charset=utf-8' });
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
    const lines = [
      '姓名,报名课程,报名时间,线下要求,报名状态,备注',
      '示例学生,"物理、数学2BC",2026年8月,必须线下,已报名,',
      '示例学生2,"公共、国语、地理",2026年8月,均可,已报名,',
      '示例学生3,雅思一对一,2026年4月,,已结课,历史课程示例'
    ];
    downloadText('旅人教育_课程报名信息模板.csv', lines.join('\n'));
  }

  function exportCsv() {
    if (!state.records.length) return;
    const lines = ['姓名,报名课程,报名时间,线下要求,报名状态,备注'];
    state.records.forEach(record => lines.push([
      record.name,
      record.courses.join('、'),
      record.signupTime,
      record.requirement,
      record.status,
      record.note
    ].map(csvEscape).join(',')));
    downloadText('旅人教育_课程报名信息_导出.csv', lines.join('\n'));
  }

  function clearData() {
    if (!state.records.length || !confirm('清除当前浏览器中保存的报名数据？此操作不会影响任何外部文件。')) return;
    state.records = [];
    state.selectedCourse = '';
    [STORAGE_KEY, ...LEGACY_KEYS].forEach(key => localStorage.removeItem(key));
    render();
  }

  function subjectKeyFromNode(node) {
    return [...COURSE_NAME_BY_KEY.keys()].find(key => node.classList.contains(key)) || '';
  }

  function studentCountForCourseName(course) {
    const canonical = canonicalCourseName(course);
    return new Set((currentCourseMap().get(canonical) || []).map(relation => normalize(relation.name))).size;
  }

  function decorateCalendarCounts() {
    document.querySelectorAll('.event[data-event-id], .month-event[data-event-id], .mobile-event[data-event-id]').forEach(node => {
      const existing = node.querySelector('.enrollment-count-badge');
      if (!state.records.length || node.classList.contains('cancelled')) {
        existing?.remove();
        return;
      }
      const course = COURSE_NAME_BY_KEY.get(subjectKeyFromNode(node));
      const count = course ? studentCountForCourseName(course) : 0;
      if (!count) {
        existing?.remove();
        return;
      }
      if (existing) {
        existing.textContent = `${count}人`;
        return;
      }
      const badge = document.createElement('span');
      badge.className = 'enrollment-count-badge';
      badge.textContent = `${count}人`;
      (node.querySelector('.event-name, .month-event-top strong, strong') || node).append(badge);
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
      const dialog = document.getElementById('eventDialog');
      if (dialog) dialog.hidden = true;
      openDrawer(subject);
    });
    card.append(button);
  }

  function updateDialogEnrollmentCount() {
    const node = document.getElementById('dialogEnrollmentCount');
    if (!node) return;
    const subject = document.getElementById('dialogSubject')?.textContent?.trim() || '';
    node.textContent = state.records.length ? `${studentCountForCourseName(subject)} 人` : '未载入';
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
  statusFilter?.addEventListener('change', event => { state.statusScope = event.target.value; state.selectedCourse = ''; render(); });
  monthFilter?.addEventListener('change', event => { state.month = event.target.value; render(); });
  tabs.forEach(tab => tab.addEventListener('click', () => { state.view = tab.dataset.enrollmentView; render(); }));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !drawer.hidden) closeDrawer();
  });

  document.addEventListener('click', event => {
    const eventNode = event.target.closest('[data-event-id]');
    if (!eventNode) return;
    state.activeCourseKey = subjectKeyFromNode(eventNode);
    window.setTimeout(updateDialogEnrollmentCount, 0);
  });

  let observerQueued = false;
  const observer = new MutationObserver(() => {
    if (observerQueued) return;
    observerQueued = true;
    requestAnimationFrame(() => {
      observerQueued = false;
      decorateCalendarCounts();
      installDialogEnrollmentButton();
      updateDialogEnrollmentCount();
    });
  });

  const calendar = document.querySelector('.office-calendar');
  if (calendar) observer.observe(calendar, { childList: true, subtree: true });
  const dialog = document.getElementById('eventDialog');
  if (dialog) observer.observe(dialog, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });

  installDialogEnrollmentButton();
  refreshMonthFilter();
  render();
})();
