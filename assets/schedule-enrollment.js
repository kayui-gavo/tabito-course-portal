(() => {
  'use strict';

  const STORAGE_KEY = 'tabitoEnrollmentV3';
  const LEGACY_KEYS = ['tabitoEnrollmentV2', 'tabitoEnrollmentV1'];

  const normalize = value => String(value ?? '').trim().toLowerCase().replace(/[\s・·_／/（）()【】\[\]《》<>「」『』\-–—]+/g, '');
  const escapeHtml = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

  const COURSE_GROUPS = new Map([
    ['物理共通考试冲刺课程','理科'],['魏思远物理一对一','理科'],['物理基础','理科'],
    ['化学','理科'],['化学基础','理科'],['生物','理科'],['生物基础','理科'],['地学','理科'],['地学基础','理科'],
    ['国语','文科'],['共通考试地理','文科'],['公共政治经济','文科'],['世界史','文科'],['日本史','文科'],['中国语','文科'],
    ['数学IA','数学'],['共通考试数学IIBC','数学'],['数学（待确认）','数学'],
    ['共通英语阅读','英语'],['雅思一对一','英语'],['情报I','其他']
  ]);

  const ALIASES = new Map();
  const addAliases = (canonical, values) => values.forEach(value => ALIASES.set(normalize(value), canonical));
  addAliases('公共政治经济',['公共政治经济','公共','政治经济','政经','公共政经','公民政治经济']);
  addAliases('国语',['国语','国语现代文','现代文','共通国语']);
  addAliases('共通考试地理',['共通考试地理','共通地理','地理']);
  addAliases('共通英语阅读',['共通英语阅读','共通英语','英语阅读']);
  addAliases('雅思一对一',['雅思一对一','雅思1对1','IELTS一对一','IELTS1对1']);
  addAliases('数学IA',['数学IA','数学1A','数学ⅠA','数学1','1A','IA']);
  addAliases('共通考试数学IIBC',['共通考试数学IIBC','数学IIBC','数学ⅡBC','数学2BC','数学2','2BC','IIBC']);
  addAliases('物理共通考试冲刺课程',['物理共通考试冲刺课程','物理冲刺','共通物理','物理']);
  addAliases('魏思远物理一对一',['魏思远物理一对一','物理1对1','物理一对一']);
  addAliases('化学',['化学']); addAliases('生物',['生物']); addAliases('地学',['地学']);
  addAliases('物理基础',['物理基础']); addAliases('化学基础',['化学基础']); addAliases('生物基础',['生物基础']); addAliases('地学基础',['地学基础']);
  addAliases('中国语',['中国语','中文']); addAliases('世界史',['世界史','历史探究世界史']); addAliases('日本史',['日本史','历史探究日本史']);
  addAliases('情报I',['情报I','情报1','信息I','信息1']);

  const SCHEDULED_COURSES = new Set([
    '公共政治经济','国语','共通考试地理','数学IA','共通考试数学IIBC','物理共通考试冲刺课程','魏思远物理一对一','化学','生物'
  ]);

  const CALENDAR_CLASS_TO_COURSE = new Map([
    ['politics','公共政治经济'],['japanese','国语'],['english','共通英语阅读'],['mathIA','数学IA'],['mathIIBC','共通考试数学IIBC'],
    ['geography','共通考试地理'],['commonPhysics','物理共通考试冲刺课程'],['privatePhysics','魏思远物理一对一'],
    ['chemCurrent','化学'],['biologySummer','生物']
  ]);

  const drawer = document.getElementById('enrollmentDrawer');
  const panel = drawer?.querySelector('.enrollment-panel');
  const openButton = document.getElementById('openEnrollment');
  const content = document.getElementById('enrollmentContent');
  const fileInput = document.getElementById('enrollmentFile');
  const importButton = document.getElementById('enrollmentImport');
  const templateButton = document.getElementById('enrollmentTemplate');
  const exportButton = document.getElementById('enrollmentExport');
  const clearButton = document.getElementById('enrollmentClear');
  const sourceLabel = document.getElementById('enrollmentSource');
  const searchInput = document.getElementById('enrollmentSearch');
  const requirementFilter = document.getElementById('enrollmentRequirement');
  if (!drawer || !panel || !openButton || !content) return;

  function installControls() {
    const subtitle = document.querySelector('.enrollment-head p');
    if (subtitle && subtitle.textContent !== '课程报名、学生选科、线下需求与排课风险统一核对。') subtitle.textContent = '课程报名、学生选科、线下需求与排课风险统一核对。';

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
      button.type = 'button'; button.className = 'enrollment-tab'; button.dataset.enrollmentView = 'planning'; button.textContent = '排课参考';
      tabs.append(button);
    }

    const toolbar = document.querySelector('.enrollment-toolbar');
    if (toolbar && !document.getElementById('enrollmentStatus')) {
      const select = document.createElement('select');
      select.id = 'enrollmentStatus'; select.className = 'enrollment-status'; select.setAttribute('aria-label','筛选报名状态');
      select.innerHTML = '<option value="active">当前报名</option><option value="all">全部记录</option><option value="history">已结课 / 已退出</option>';
      toolbar.append(select);
    }
    if (toolbar && !document.getElementById('enrollmentMonth')) {
      const select = document.createElement('select');
      select.id = 'enrollmentMonth'; select.className = 'enrollment-month'; select.setAttribute('aria-label','筛选报名时间');
      select.innerHTML = '<option value="all">全部报名时间</option>';
      toolbar.append(select);
    }
  }
  installControls();

  const statusFilter = document.getElementById('enrollmentStatus');
  const monthFilter = document.getElementById('enrollmentMonth');
  const metrics = {
    students: document.getElementById('enrollmentStudentCount'), links: document.getElementById('enrollmentLinkCount'),
    offline: document.getElementById('enrollmentOfflineCount'), pending: document.getElementById('enrollmentPendingCount'),
    unscheduled: document.getElementById('enrollmentUnscheduledCount')
  };

  function canonicalCourse(value) {
    const raw = String(value ?? '').trim();
    return ALIASES.get(normalize(raw)) || raw;
  }
  function splitCourses(value) { return String(value ?? '').split(/[、，,;；|]+/).map(v => v.trim()).filter(Boolean); }
  function cleanSignupTime(value) {
    const raw = String(value ?? '').trim(); if (!raw) return '';
    const match = raw.replace(/\s+/g,'').match(/(20\d{2})[年\/\.\-]?(\d{1,2})月?/);
    return match ? `${match[1]}年${Number(match[2])}月` : raw;
  }
  function monthKey(value) { const m = String(value ?? '').match(/(20\d{2})年(\d{1,2})月/); return m ? Number(m[1])*100+Number(m[2]) : 0; }
  function inferMath(rawCourses, canonicalCourses) {
    if (!rawCourses.some(v => normalize(v) === '数学')) return canonicalCourses;
    const rest = canonicalCourses.filter(v => normalize(v) !== '数学');
    const groups = rest.map(v => COURSE_GROUPS.get(v)).filter(Boolean);
    const inferred = groups.includes('文科') && !groups.includes('理科') ? '数学IA' : '数学（待确认）';
    return [...new Set([...rest,inferred])];
  }
  function cleanRecord(row) {
    const name = String(row.name ?? row['姓名'] ?? '').trim();
    const rawValue = row.courses ?? row['报名课程'] ?? row['课程'] ?? '';
    const rawCourses = Array.isArray(rawValue) ? rawValue.map(String) : splitCourses(rawValue);
    let courses = rawCourses.map(canonicalCourse).filter(Boolean); courses = inferMath(rawCourses,courses); courses = [...new Set(courses)];
    const signupTime = cleanSignupTime(row.signupTime ?? row['报名时间'] ?? row['报名月份'] ?? row['报名月'] ?? '');
    const requirement = String(row.requirement ?? row['线下要求'] ?? row['上课方式'] ?? '').trim() || '未填写';
    const status = String(row.status ?? row['报名状态'] ?? row['状态'] ?? '').trim() || '已报名';
    const note = String(row.note ?? row['备注'] ?? '').trim();
    return name && courses.length ? {name,courses,signupTime,requirement,status,note} : null;
  }
  function loadRecords() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) for (const key of LEGACY_KEYS) { raw = localStorage.getItem(key); if (raw) break; }
      if (!raw) return [];
      const parsed = JSON.parse(raw); if (!Array.isArray(parsed)) return [];
      const rows = parsed.map(cleanRecord).filter(Boolean);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(rows));
      return rows;
    } catch (_) { return []; }
  }

  const state = { records:loadRecords(), view:'course', selectedCourse:'', query:'', requirement:'all', statusScope:'active', month:'all' };
  const saveRecords = () => { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state.records)); } catch (_) {} };
  const isCompleted = r => /结课|已完课|修了|结束/.test(r.status);
  const isWithdrawn = r => /退课|取消|无效|退出/.test(r.status);
  const isHistorical = r => isCompleted(r)||isWithdrawn(r);
  const isActive = r => !isHistorical(r);
  const isPending = r => /待|暂定|未确认/.test(r.status)||r.courses.includes('数学（待确认）');
  const isOfflineRequired = r => /必须.*线下|仅.*线下|只.*线下/.test(r.requirement);
  function requirementGroup(r){ if(isOfflineRequired(r))return'offline-required'; if(/优先.*线下|线下.*优先/.test(r.requirement))return'offline-preferred'; if(/线上|同步|均可|都可|无所谓|不限/.test(r.requirement))return'online-ok'; return'unspecified'; }

  function allRelations() {
    const map = new Map();
    state.records.forEach((record,rowIndex)=>record.courses.forEach(course=>{
      const relation={...record,course,rowIndex}; const key=`${normalize(record.name)}|||${normalize(course)}|||${normalize(record.status)}|||${record.signupTime}`;
      if(!map.has(key))map.set(key,relation);
    }));
    return [...map.values()];
  }
  const currentRelations = () => allRelations().filter(isActive);
  function scopeRelations(){ return state.statusScope==='history'?allRelations().filter(isHistorical):state.statusScope==='all'?allRelations():currentRelations(); }
  function currentCourseMap(){ const map=new Map(); currentRelations().forEach(r=>{if(!map.has(r.course))map.set(r.course,[]);map.get(r.course).push(r);}); return map; }
  const isScheduledCourse = course => SCHEDULED_COURSES.has(canonicalCourse(course));
  function matches(r,course='') {
    if (state.requirement!=='all' && requirementGroup(r)!==state.requirement) return false;
    if (state.month!=='all' && r.signupTime!==state.month) return false;
    const q=normalize(state.query); if(!q)return true;
    return [r.name,r.requirement,r.status,r.note,r.signupTime,r.course,course,...(r.courses||[])].filter(Boolean).some(v=>normalize(v).includes(q));
  }

  function refreshMonthFilter(){
    if(!monthFilter)return;const current=state.month;
    const months=[...new Set(state.records.map(r=>r.signupTime).filter(Boolean))].sort((a,b)=>monthKey(b)-monthKey(a));
    const html='<option value="all">全部报名时间</option>'+months.map(m=>`<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join('');
    if(monthFilter.innerHTML!==html)monthFilter.innerHTML=html;
    monthFilter.value=months.includes(current)?current:'all';state.month=monthFilter.value;
  }

  function updateMetrics(){
    const current=currentRelations(),students=new Set(current.map(r=>normalize(r.name))),courses=currentCourseMap();
    const offline=new Set(current.filter(isOfflineRequired).map(r=>normalize(r.name))),pending=new Set(current.filter(isPending).map(r=>normalize(r.name)));
    const values=[[metrics.students,students.size],[metrics.links,current.length],[metrics.offline,offline.size],[metrics.pending,pending.size],[metrics.unscheduled,[...courses.keys()].filter(c=>!isScheduledCourse(c)).length]];
    values.forEach(([node,value])=>{if(node&&node.textContent!==String(value))node.textContent=String(value);});
    const historyCount=allRelations().filter(isHistorical).length;
    const next=state.records.length?`<strong>本地报名数据</strong> · 当前 ${students.size} 名学生 / ${current.length} 条报名${historyCount?` · 历史 ${historyCount} 条`:''} · 仅保存在本浏览器`:'<strong>尚未载入报名数据</strong> · 可导入 CSV';
    if(sourceLabel&&sourceLabel.innerHTML!==next)sourceLabel.innerHTML=next;
    if(exportButton)exportButton.disabled=!state.records.length;if(clearButton)clearButton.disabled=!state.records.length;
  }

  function renderEmpty(message='') { content.innerHTML=`<div class="enrollment-empty"><div><strong>${escapeHtml(message||'还没有报名数据')}</strong><p>${state.records.length?'当前筛选条件下没有符合的报名记录。':'可导入 CSV；建议保留“姓名、报名课程、报名时间、线下要求、报名状态、备注”六列。'}</p></div></div>`; }

  function courseEntries(){
    const map=new Map();scopeRelations().forEach(r=>{if(!map.has(r.course))map.set(r.course,[]);map.get(r.course).push(r);});
    return [...map.entries()].sort((a,b)=>Number(isScheduledCourse(b[0]))-Number(isScheduledCourse(a[0]))||b[1].filter(isActive).length-a[1].filter(isActive).length||a[0].localeCompare(b[0],'zh-CN'));
  }
  function renderCourseView(){
    const entries=courseEntries();if(!entries.length)return renderEmpty('没有符合条件的课程');const map=new Map(entries);
    if(!state.selectedCourse||!map.has(state.selectedCourse))state.selectedCourse=entries[0][0];
    const buttons=entries.map(([course,relations])=>{const active=relations.filter(isActive).length,required=relations.filter(isOfflineRequired).length,pending=relations.filter(isPending).length,status=active?(isScheduledCourse(course)?'已排入日历':'时间未定'):'历史课程';const detail=[required?`${required} 人必须线下`:'',pending?`${pending} 条待确认`:'',status].filter(Boolean).join(' · ');return `<button type="button" class="enrollment-course-btn${course===state.selectedCourse?' active':''}" data-enrollment-course="${escapeHtml(course)}"><strong>${escapeHtml(course)}</strong><span>${active||relations.length}</span><small>${escapeHtml(detail)}</small></button>`;}).join('');
    const all=map.get(state.selectedCourse)||[],records=all.filter(r=>matches(r,state.selectedCourse)).sort((a,b)=>monthKey(b.signupTime)-monthKey(a.signupTime)||a.name.localeCompare(b.name,'zh-CN'));
    const rows=records.length?records.map(r=>`<tr><td><strong>${escapeHtml(r.name)}</strong></td><td>${escapeHtml(r.signupTime||'—')}</td><td><span class="enrollment-chip${isOfflineRequired(r)?' offline':''}">${escapeHtml(r.requirement)}</span></td><td><span class="enrollment-status-text${isHistorical(r)?' history':isPending(r)?' pending':''}">${escapeHtml(r.status)}</span></td><td>${escapeHtml(r.note||'—')}</td></tr>`).join(''):'<tr><td colspan="5" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';
    const current=all.filter(isActive).length,hist=all.filter(isHistorical).length,meta=[current?`当前 ${current} 人`:'',hist?`历史 ${hist} 条`:'',all.filter(isOfflineRequired).length?`${all.filter(isOfflineRequired).length} 人必须线下`:''].filter(Boolean).join(' · ');
    content.innerHTML=`<div class="enrollment-course-view"><aside class="enrollment-course-list"><div class="enrollment-course-list-head">课程 <span>当前人数</span></div>${buttons}</aside><section class="enrollment-detail"><header class="enrollment-detail-head"><div><h3>${escapeHtml(state.selectedCourse)}</h3><small>${isScheduledCourse(state.selectedCourse)?'已排入课程日历':current?'尚未排入课程日历':'历史课程'}</small></div><span>${escapeHtml(meta||'—')}</span></header><table class="enrollment-table"><thead><tr><th style="width:17%">姓名</th><th style="width:16%">报名时间</th><th style="width:20%">线下要求</th><th style="width:15%">状态</th><th>备注</th></tr></thead><tbody>${rows}</tbody></table></section></div>`;
  }

  function studentProfiles(relations){const grouped=new Map();relations.forEach(r=>{const key=normalize(r.name);if(!grouped.has(key))grouped.set(key,{name:r.name,relations:[]});grouped.get(key).relations.push(r);});return [...grouped.values()].map(p=>{const rel=[...p.relations].sort((a,b)=>monthKey(b.signupTime)-monthKey(a.signupTime));return{name:p.name,relations:p.relations,courses:[...new Set(p.relations.map(r=>r.course))],signupTime:rel[0]?.signupTime||'',requirement:p.relations.find(isOfflineRequired)?.requirement||p.relations[0]?.requirement||'未填写',status:p.relations.some(isPending)?'待确认':p.relations.some(isActive)?'已报名':p.relations[0]?.status||'—',note:[...new Set(p.relations.map(r=>r.note).filter(Boolean))].join('；')};});}
  function renderStudentView(){
    const profiles=studentProfiles(scopeRelations()).filter(p=>matches({...p,courses:p.courses})).sort((a,b)=>monthKey(b.signupTime)-monthKey(a.signupTime)||a.name.localeCompare(b.name,'zh-CN'));
    const rows=profiles.length?profiles.map(p=>{const courses=p.relations.sort((a,b)=>Number(isHistorical(a))-Number(isHistorical(b))||a.course.localeCompare(b.course,'zh-CN')).map(r=>`<span class="course-pill${isHistorical(r)?' historical':''}">${escapeHtml(r.course)}${isHistorical(r)?` · ${escapeHtml(r.status)}`:''}</span>`).join('');return `<tr><td><strong>${escapeHtml(p.name)}</strong></td><td class="course-cell">${courses}</td><td>${escapeHtml(p.signupTime||'—')}</td><td><span class="enrollment-chip${/必须.*线下|仅.*线下|只.*线下/.test(p.requirement)?' offline':''}">${escapeHtml(p.requirement)}</span></td><td><span class="enrollment-status-text${p.status==='待确认'?' pending':''}">${escapeHtml(p.status)}</span></td><td>${escapeHtml(p.note||'—')}</td></tr>`;}).join(''):'<tr><td colspan="6" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';
    content.innerHTML=`<div class="enrollment-student-view"><table class="enrollment-table"><thead><tr><th style="width:13%">姓名</th><th style="width:31%">报名课程</th><th style="width:14%">报名时间</th><th style="width:15%">线下要求</th><th style="width:12%">状态</th><th>备注</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function overlapPairs(){const students=new Map();currentRelations().forEach(r=>{const key=normalize(r.name);if(!students.has(key))students.set(key,{name:r.name,courses:new Set()});students.get(key).courses.add(r.course);});const pairs=new Map();students.forEach(p=>{const c=[...p.courses].sort((a,b)=>a.localeCompare(b,'zh-CN'));for(let i=0;i<c.length;i++)for(let j=i+1;j<c.length;j++){const key=`${c[i]}|||${c[j]}`;if(!pairs.has(key))pairs.set(key,{a:c[i],b:c[j],students:[]});pairs.get(key).students.push(p.name);}});return [...pairs.values()].map(p=>{const ga=COURSE_GROUPS.get(p.a)||'其他',gb=COURSE_GROUPS.get(p.b)||'其他';const level=ga===gb&&['理科','文科','数学'].includes(ga)?'high':ga==='数学'||gb==='数学'?'medium':'normal';return{...p,count:p.students.length,level};}).sort((a,b)=>b.count-a.count||({high:2,medium:1,normal:0}[b.level]-({high:2,medium:1,normal:0}[a.level])));}
  function planningRows(){return [...currentCourseMap().entries()].map(([course,relations])=>({course,group:COURSE_GROUPS.get(course)||'其他',total:new Set(relations.map(r=>normalize(r.name))).size,required:new Set(relations.filter(isOfflineRequired).map(r=>normalize(r.name))).size,unspecified:new Set(relations.filter(r=>requirementGroup(r)==='unspecified').map(r=>normalize(r.name))).size,scheduled:isScheduledCourse(course)})).sort((a,b)=>Number(a.scheduled)-Number(b.scheduled)||b.total-a.total||b.required-a.required||a.course.localeCompare(b.course,'zh-CN'));}
  function renderPlanningView(){
    const demand=planningRows();if(!demand.length)return renderEmpty('暂无当前报名数据');
    const students=new Set(currentRelations().map(r=>normalize(r.name))).size,unscheduled=demand.filter(d=>!d.scheduled),required=new Set(currentRelations().filter(isOfflineRequired).map(r=>normalize(r.name))).size,missing=new Set(currentRelations().filter(r=>requirementGroup(r)==='unspecified').map(r=>normalize(r.name))).size;
    const demandRows=demand.map(d=>`<tr><td><strong>${escapeHtml(d.course)}</strong><small class="course-group">${escapeHtml(d.group)}</small></td><td class="number-cell">${d.total}</td><td class="number-cell${d.required?' danger-number':''}">${d.required}</td><td class="number-cell${d.unspecified?' warn-number':''}">${d.unspecified}</td><td><span class="schedule-state ${d.scheduled?'scheduled':'unscheduled'}">${d.scheduled?'已排':'待排'}</span></td></tr>`).join('');
    const overlaps=overlapPairs().filter(p=>p.count>0);const overlapRows=overlaps.length?overlaps.map(p=>`<tr><td><strong>${escapeHtml(p.a)}</strong><span class="pair-arrow">×</span><strong>${escapeHtml(p.b)}</strong></td><td class="number-cell">${p.count}</td><td><span class="conflict-level ${p.level}">${p.level==='high'?'原则错开':p.level==='medium'?'优先错开':'实际重合'}</span></td><td class="student-sample">${escapeHtml(p.students.slice(0,5).join('、'))}${p.students.length>5?'…':''}</td></tr>`).join(''):'<tr><td colspan="4" class="enrollment-no-results">暂无选科重合。</td></tr>';
    content.innerHTML=`<div class="enrollment-planning-view"><div class="planning-summary"><div><span>当前学生</span><strong>${students}</strong></div><div><span>待排科目</span><strong>${unscheduled.length}</strong></div><div><span>必须线下</span><strong>${required}</strong></div><div><span>线下要求未填</span><strong>${missing}</strong></div></div><section class="planning-section"><header><div><h3>课程需求</h3><p>先看是否已经排入日历，再结合人数和线下需求决定时段与教室。</p></div></header><div class="planning-table-wrap"><table class="enrollment-table planning-table"><thead><tr><th>课程</th><th>人数</th><th>必须线下</th><th>未填写</th><th>排课</th></tr></thead><tbody>${demandRows}</tbody></table></div></section><section class="planning-section"><header><div><h3>选科重合</h3><p>理科之间、文科之间原则错开；数学与其他课程优先错开。</p></div></header><div class="planning-table-wrap"><table class="enrollment-table planning-table"><thead><tr><th>课程组合</th><th>共同学生</th><th>建议</th><th>学生</th></tr></thead><tbody>${overlapRows}</tbody></table></div></section></div>`;
  }

  function render(){
    document.querySelectorAll('[data-enrollment-view]').forEach(btn=>btn.classList.toggle('active',btn.dataset.enrollmentView===state.view));
    const planning=state.view==='planning';[searchInput,requirementFilter,statusFilter,monthFilter].forEach(el=>{if(el)el.disabled=planning;});
    updateMetrics();refreshMonthFilter();
    if(!state.records.length)return renderEmpty();
    if(state.view==='student')renderStudentView();else if(planning)renderPlanningView();else renderCourseView();
  }

  function openDrawer(initialCourse='') { state.selectedCourse=canonicalCourse(initialCourse||state.selectedCourse); drawer.hidden=false; document.body.style.overflow='hidden'; render(); panel.scrollTop=0; }
  function closeDrawer(){ drawer.hidden=true; document.body.style.overflow=''; }

  function courseForCalendarNode(node){for(const [cls,course] of CALENDAR_CLASS_TO_COURSE){if(node.classList.contains(cls))return course;}return '';}
  function countForCourse(course){const canonical=canonicalCourse(course);return new Set(currentRelations().filter(r=>r.course===canonical).map(r=>normalize(r.name))).size;}
  function decorateCalendarCounts(){
    document.querySelectorAll('.event[data-event-id],.month-event[data-event-id],.mobile-event[data-event-id]').forEach(node=>{
      const course=courseForCalendarNode(node),existing=node.querySelector('.enrollment-count-badge');
      const count=course&&!node.classList.contains('cancelled')?countForCourse(course):0;
      if(!count){if(existing)existing.remove();return;}
      const next=`${count}人`;
      if(existing){if(existing.textContent!==next)existing.textContent=next;return;}
      const badge=document.createElement('span');badge.className='enrollment-count-badge';badge.textContent=next;(node.querySelector('.event-name,.month-event-top strong,.mobile-event strong,strong')||node).append(badge);
    });
  }

  function installDialogButton(){
    const card=document.querySelector('#eventDialog .dialog-card');if(!card)return;
    let button=document.getElementById('dialogEnrollmentButton');
    if(!button){button=document.createElement('button');button.type='button';button.id='dialogEnrollmentButton';button.className='dialog-enrollment-btn';button.innerHTML='查看报名学生 <span class="dialog-enrollment-count">未载入</span>';button.addEventListener('click',()=>{const course=document.getElementById('dialogSubject')?.textContent?.trim()||'';document.getElementById('eventDialog').hidden=true;openDrawer(course);});card.append(button);}
    updateDialogCount();
  }
  function updateDialogCount(){const button=document.getElementById('dialogEnrollmentButton');if(!button)return;let span=button.querySelector('.dialog-enrollment-count');if(!span){span=document.createElement('span');span.className='dialog-enrollment-count';button.append(span);}const course=document.getElementById('dialogSubject')?.textContent?.trim()||'',next=state.records.length?`${countForCourse(course)} 人`:'未载入';if(span.textContent!==next)span.textContent=next;}

  function parseCsv(text){
    const rows=[];let row=[],cell='',quote=false;
    for(let i=0;i<text.length;i++){const ch=text[i],next=text[i+1];if(ch==='"'){if(quote&&next==='"'){cell+='"';i++;}else quote=!quote;}else if(ch===','&&!quote){row.push(cell);cell='';}else if((ch==='\n'||ch==='\r')&&!quote){if(ch==='\r'&&next==='\n')i++;row.push(cell);cell='';if(row.some(v=>v.trim()!==''))rows.push(row);row=[];}else cell+=ch;}
    row.push(cell);if(row.some(v=>v.trim()!==''))rows.push(row);if(!rows.length)return[];
    const headers=rows[0].map(v=>v.trim().replace(/^\ufeff/,''));
    return rows.slice(1).map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));
  }
  function csvEscape(value){const s=String(value??'');return /[",\n\r]/.test(s)?`"${s.replaceAll('"','""')}"`:s;}
  function download(name,text){const blob=new Blob([text],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);}

  openButton.addEventListener('click',()=>openDrawer());
  drawer.addEventListener('click',event=>{if(event.target.closest('[data-close-enrollment]'))return closeDrawer();const tab=event.target.closest('[data-enrollment-view]');if(tab){state.view=tab.dataset.enrollmentView;render();return;}const course=event.target.closest('[data-enrollment-course]');if(course){state.selectedCourse=course.dataset.enrollmentCourse;render();}});
  searchInput?.addEventListener('input',()=>{state.query=searchInput.value;render();});
  requirementFilter?.addEventListener('change',()=>{state.requirement=requirementFilter.value;render();});
  statusFilter?.addEventListener('change',()=>{state.statusScope=statusFilter.value;render();});
  monthFilter?.addEventListener('change',()=>{state.month=monthFilter.value;render();});
  importButton?.addEventListener('click',()=>fileInput?.click());
  fileInput?.addEventListener('change',async()=>{const file=fileInput.files?.[0];if(!file)return;const rows=parseCsv(await file.text()).map(cleanRecord).filter(Boolean);if(rows.length){state.records=rows;saveRecords();state.month='all';state.selectedCourse='';refreshMonthFilter();render();decorateCalendarCounts();updateDialogCount();}fileInput.value='';});
  templateButton?.addEventListener('click',()=>download('旅人教育_报名信息模板.csv','\ufeff姓名,报名课程,报名时间,线下要求,报名状态,备注\n示例学生,数学IA、化学,2026年9月,未填写,已报名,\n'));
  exportButton?.addEventListener('click',()=>{if(!state.records.length)return;const head='姓名,报名课程,报名时间,线下要求,报名状态,备注';const lines=state.records.map(r=>[r.name,r.courses.join('、'),r.signupTime,r.requirement,r.status,r.note].map(csvEscape).join(','));download('旅人教育_报名信息_导出.csv','\ufeff'+[head,...lines].join('\n'));});
  clearButton?.addEventListener('click',()=>{if(!state.records.length)return;if(!window.confirm('清除本浏览器中的报名数据？'))return;state.records=[];saveRecords();state.selectedCourse='';render();decorateCalendarCounts();updateDialogCount();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!drawer.hidden)closeDrawer();});
  document.addEventListener('click',event=>{const node=event.target.closest('[data-event-id]');if(node)setTimeout(updateDialogCount,0);});

  let calendarQueued=false;
  const calendar=document.querySelector('.office-calendar');
  if(calendar&&'MutationObserver'in window){new MutationObserver(()=>{if(calendarQueued)return;calendarQueued=true;requestAnimationFrame(()=>{calendarQueued=false;decorateCalendarCounts();});}).observe(calendar,{childList:true,subtree:true});}
  const dialog=document.getElementById('eventDialog');
  if(dialog&&'MutationObserver'in window){new MutationObserver(()=>requestAnimationFrame(updateDialogCount)).observe(dialog,{attributes:true,attributeFilter:['hidden']});}

  refreshMonthFilter();installDialogButton();render();decorateCalendarCounts();
})();