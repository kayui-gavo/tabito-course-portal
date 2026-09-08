(() => {
  'use strict';

  const STORAGE_KEY = 'tabitoEnrollmentV4';
  const LEGACY_KEYS = ['tabitoEnrollmentV3','tabitoEnrollmentV2','tabitoEnrollmentV1'];
  const normalize = value => String(value ?? '').trim().toLowerCase().replace(/[\s・·_／/（）()【】\[\]《》<>「」『』\-–—]+/g,'');
  const esc = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

  const COURSE_GROUPS = new Map([
    ['物理共通考试冲刺课程','理科'],['魏思远物理一对一','理科'],['物理基础','理科'],
    ['化学','理科'],['化学基础','理科'],['生物','理科'],['生物基础','理科'],['地学','理科'],['地学基础','理科'],
    ['国语','文科'],['共通考试地理','文科'],['公共政治经济','文科'],['世界史','文科'],['日本史','文科'],['中国语','文科'],
    ['数学IA','数学'],['共通考试数学IIBC','数学'],['数学（待确认）','数学'],
    ['共通英语阅读','英语'],['英语一对一','英语'],['雅思一对一','英语'],['情报I','其他']
  ]);

  const ALIASES = new Map();
  const addAliases = (canonical, values) => values.forEach(value => ALIASES.set(normalize(value), canonical));
  addAliases('公共政治经济',['公共政治经济','公共政治経済','公共','政治经济','政治経済','政经','公共政经','公民政治经济']);
  addAliases('国语',['国语','国語','国语现代文','现代文','共通国语']);
  addAliases('共通考试地理',['共通考试地理','共通地理','地理']);
  addAliases('共通英语阅读',['共通英语阅读','共通英语','英语阅读']);
  addAliases('英语一对一',['英语一对一','英语1对1','英語1対1','英語一対一','英語（1対1）','英語（1对1）']);
  addAliases('雅思一对一',['雅思一对一','雅思1对1','IELTS一对一','IELTS1对1']);
  addAliases('数学IA',['数学IA','数学1A','数学ⅠA','数学1','数学 1','1A','IA']);
  addAliases('共通考试数学IIBC',['共通考试数学IIBC','数学IIBC','数学ⅡBC','数学2BC','数学2','数学 2','2BC','IIBC']);
  addAliases('物理共通考试冲刺课程',['物理共通考试冲刺课程','物理冲刺','共通物理','物理']);
  addAliases('魏思远物理一对一',['魏思远物理一对一','物理1对1','物理一对一','物理（1対1）','物理（1对1）']);
  addAliases('化学',['化学']);
  addAliases('生物',['生物']);
  addAliases('地学',['地学']);
  addAliases('物理基础',['物理基础']);
  addAliases('化学基础',['化学基础']);
  addAliases('生物基础',['生物基础']);
  addAliases('地学基础',['地学基础']);
  addAliases('中国语',['中国语','中文']);
  addAliases('世界史',['世界史','历史探究世界史']);
  addAliases('日本史',['日本史','历史探究日本史']);
  addAliases('情报I',['情报I','情报1','信息I','信息1']);

  const SCHEDULED_COURSES = new Set([
    '公共政治经济','国语','共通考试地理','数学IA','共通考试数学IIBC',
    '物理共通考试冲刺课程','魏思远物理一对一','化学','生物'
  ]);
  const OFFLINE_COURSES = new Set(['国语','共通考试地理','物理共通考试冲刺课程','魏思远物理一对一','物理基础']);
  const CALENDAR_CLASS_TO_COURSE = new Map([
    ['politics','公共政治经济'],['japanese','国语'],['english','共通英语阅读'],
    ['mathIA','数学IA'],['mathIIBC','共通考试数学IIBC'],['geography','共通考试地理'],
    ['commonPhysics','物理共通考试冲刺课程'],['privatePhysics','魏思远物理一对一'],
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

  function canonicalCourse(value) {
    const raw = String(value ?? '').trim();
    return ALIASES.get(normalize(raw)) || raw;
  }
  function splitCourses(value) {
    return String(value ?? '').split(/[・、，,;；|]+/).map(v => v.trim()).filter(Boolean);
  }
  function validDateParts(y,m,d) {
    const date = new Date(Date.UTC(y,m-1,d));
    return date.getUTCFullYear()===y && date.getUTCMonth()===m-1 && date.getUTCDate()===d;
  }
  function dateFromRegistrationCode(value) {
    const digits = String(value ?? '').replace(/\D/g,'');
    if (digits.length < 8) return '';
    const y = Number(digits.slice(0,4)), m = Number(digits.slice(4,6)), d = Number(digits.slice(6,8));
    return validDateParts(y,m,d) ? `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}` : '';
  }
  function cleanDate(value) {
    const raw = String(value ?? '').trim();
    if (!raw) return '';
    const codeDate = dateFromRegistrationCode(raw);
    if (codeDate && /^\d{8,}/.test(raw.replace(/\D/g,''))) return codeDate;
    let match = raw.match(/(20\d{2})\D{0,3}(\d{1,2})\D{0,3}(\d{1,2})/);
    if (match) {
      const y=Number(match[1]),m=Number(match[2]),d=Number(match[3]);
      if (validDateParts(y,m,d)) return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }
    match = raw.match(/(20\d{2})\D{0,3}(\d{1,2})/);
    if (match) return `${match[1]}-${String(Number(match[2])).padStart(2,'0')}`;
    return raw;
  }
  function displayDate(value) {
    const raw=String(value||'');
    let m=raw.match(/^(20\d{2})-(\d{2})-(\d{2})$/);
    if(m)return `${m[1]}/${Number(m[2])}/${Number(m[3])}`;
    m=raw.match(/^(20\d{2})-(\d{2})$/);
    if(m)return `${m[1]}年${Number(m[2])}月`;
    return raw||'—';
  }
  function monthOf(value) {
    const match=String(value||'').match(/^(20\d{2})-(\d{2})/);
    return match?`${match[1]}-${match[2]}`:'';
  }
  function monthLabel(value) {
    const match=String(value||'').match(/^(20\d{2})-(\d{2})$/);
    return match?`${match[1]}年${Number(match[2])}月`:value;
  }
  function dateKey(value) {
    const digits=String(value||'').replace(/\D/g,'').slice(0,8);
    return Number(digits.padEnd(8,'0'))||0;
  }
  function deliveryFor(course) {
    const c=canonicalCourse(course);
    return OFFLINE_COURSES.has(c)||c.includes('物理')?'线下':'线上';
  }
  function inferMath(rawCourses, canonicalCourses) {
    if (!rawCourses.some(v => normalize(v)==='数学')) return canonicalCourses;
    const rest=canonicalCourses.filter(v => normalize(v)!=='数学');
    const groups=rest.map(v=>COURSE_GROUPS.get(v)).filter(Boolean);
    const inferred=groups.includes('文科')&&!groups.includes('理科')?'数学IA':'数学（待确认）';
    return [...new Set([...rest,inferred])];
  }
  function cleanRecord(row) {
    const name=String(row.name??row['姓名']??row['氏名']??'').trim();
    const rawValue=row.courses??row['报名课程']??row['课程']??row['申込科目']??'';
    const rawCourses=Array.isArray(rawValue)?rawValue.map(String):splitCourses(rawValue);
    let courses=rawCourses.map(canonicalCourse).filter(Boolean);
    courses=inferMath(rawCourses,courses);
    courses=[...new Set(courses)];
    const registrationCode=String(row.registrationCode??row['报名编号']??row['申込番号']??'').trim();
    const explicitDate=row.signupDate??row['报名日期']??row.signupTime??row['报名时间']??row['报名月份']??row['报名月']??'';
    const signupDate=dateFromRegistrationCode(registrationCode)||cleanDate(explicitDate);
    const requirement=String(row.requirement??row['线下要求']??row['上课方式']??'').trim()||'未填写';
    const status=String(row.status??row['报名状态']??row['状态']??'').trim()||'已报名';
    const note=String(row.note??row['备注']??'').trim();
    return name&&courses.length?{name,courses,signupDate,registrationCode,requirement,status,note}:null;
  }

  function loadRecords() {
    try {
      let raw=localStorage.getItem(STORAGE_KEY);
      if(!raw)for(const key of LEGACY_KEYS){raw=localStorage.getItem(key);if(raw)break;}
      if(!raw)return[];
      const parsed=JSON.parse(raw);
      if(!Array.isArray(parsed))return[];
      const rows=parsed.map(cleanRecord).filter(Boolean);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(rows));
      return rows;
    }catch(_){return[];}
  }
  function saveRecords(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state.records));}catch(_){}}

  function installControls() {
    const subtitle=document.querySelector('.enrollment-head p');
    if(subtitle)subtitle.textContent='课程报名、报名日期、选科组合与排课风险统一核对。';
    const privacy=document.querySelector('.enrollment-privacy');
    if(privacy)privacy.innerHTML='<strong>内部信息：</strong>学生姓名与选科不写入公开仓库；报名编号前 8 位按报名日期解析，数据仅保存在本浏览器。';
    const metricLabel=document.querySelector('#enrollmentOfflineCount')?.previousElementSibling;
    if(metricLabel)metricLabel.textContent='线下授课学生';
    const metrics=document.querySelector('.enrollment-metrics');
    if(metrics&&!document.getElementById('enrollmentUnscheduledCount')){
      const item=document.createElement('div');item.className='enrollment-metric unscheduled';item.innerHTML='<span>时间未定科目</span><strong id="enrollmentUnscheduledCount">0</strong>';metrics.append(item);
    }
    const tabs=document.querySelector('.enrollment-tabs');
    if(tabs&&!tabs.querySelector('[data-enrollment-view="planning"]')){
      const button=document.createElement('button');button.type='button';button.className='enrollment-tab';button.dataset.enrollmentView='planning';button.textContent='排课参考';tabs.append(button);
    }
    const toolbar=document.querySelector('.enrollment-toolbar');
    if(toolbar&&!document.getElementById('enrollmentStatus')){
      const select=document.createElement('select');select.id='enrollmentStatus';select.className='enrollment-status';select.setAttribute('aria-label','筛选报名状态');select.innerHTML='<option value="active">当前报名</option><option value="all">全部记录</option><option value="history">已结课 / 已退出</option>';toolbar.append(select);
    }
    if(toolbar&&!document.getElementById('enrollmentMonth')){
      const select=document.createElement('select');select.id='enrollmentMonth';select.className='enrollment-month';select.setAttribute('aria-label','筛选报名月份');select.innerHTML='<option value="all">全部报名月份</option>';toolbar.append(select);
    }
  }
  installControls();

  const statusFilter=document.getElementById('enrollmentStatus');
  const monthFilter=document.getElementById('enrollmentMonth');
  const closeButton=drawer.querySelector('.enrollment-close');
  const metrics={students:document.getElementById('enrollmentStudentCount'),links:document.getElementById('enrollmentLinkCount'),offline:document.getElementById('enrollmentOfflineCount'),pending:document.getElementById('enrollmentPendingCount'),unscheduled:document.getElementById('enrollmentUnscheduledCount')};
  const state={records:loadRecords(),view:'course',selectedCourse:'',query:'',requirement:'all',statusScope:'active',month:'all'};

  const isCompleted=r=>/结课|已完课|修了|结束/.test(r.status);
  const isWithdrawn=r=>/退课|取消|无效|退出/.test(r.status);
  const isHistorical=r=>isCompleted(r)||isWithdrawn(r);
  const isActive=r=>!isHistorical(r);
  const isPending=r=>/待|暂定|未确认/.test(r.status)||r.courses.includes('数学（待确认）');
  const isOfflineRequired=r=>/必须.*线下|仅.*线下|只.*线下/.test(r.requirement);
  function requirementGroup(r){if(isOfflineRequired(r))return'offline-required';if(/优先.*线下|线下.*优先/.test(r.requirement))return'offline-preferred';if(/线上|同步|均可|都可|无所谓|不限/.test(r.requirement))return'online-ok';return'unspecified';}
  const uniqueStudentCount=relations=>new Set(relations.map(r=>normalize(r.name)).filter(Boolean)).size;

  function allRelations(){
    const map=new Map();
    state.records.forEach((record,rowIndex)=>record.courses.forEach(course=>{
      const relation={...record,course,rowIndex};
      const key=`${normalize(record.name)}|||${normalize(course)}|||${normalize(record.status)}|||${record.signupDate}`;
      if(!map.has(key))map.set(key,relation);
    }));
    return [...map.values()];
  }
  const currentRelations=()=>allRelations().filter(isActive);
  function scopeRelations(){if(state.statusScope==='history')return allRelations().filter(isHistorical);if(state.statusScope==='all')return allRelations();return currentRelations();}
  function currentCourseMap(){const map=new Map();currentRelations().forEach(r=>{if(!map.has(r.course))map.set(r.course,[]);map.get(r.course).push(r);});return map;}
  const isScheduledCourse=course=>SCHEDULED_COURSES.has(canonicalCourse(course));
  function matches(r,course=''){
    if(state.requirement!=='all'&&requirementGroup(r)!==state.requirement)return false;
    if(state.month!=='all'&&monthOf(r.signupDate)!==state.month)return false;
    const q=normalize(state.query);if(!q)return true;
    return [r.name,r.requirement,r.status,r.note,r.signupDate,r.registrationCode,r.course,course,...(r.courses||[])].filter(Boolean).some(v=>normalize(v).includes(q));
  }

  function refreshMonthFilter(){
    if(!monthFilter)return;
    const current=state.month;
    const months=[...new Set(state.records.map(r=>monthOf(r.signupDate)).filter(Boolean))].sort().reverse();
    const html='<option value="all">全部报名月份</option>'+months.map(m=>`<option value="${esc(m)}">${esc(monthLabel(m))}</option>`).join('');
    if(monthFilter.innerHTML!==html)monthFilter.innerHTML=html;
    monthFilter.value=months.includes(current)?current:'all';state.month=monthFilter.value;
  }
  function syncControls(){if(searchInput&&searchInput.value!==state.query)searchInput.value=state.query;if(requirementFilter&&requirementFilter.value!==state.requirement)requirementFilter.value=state.requirement;if(statusFilter&&statusFilter.value!==state.statusScope)statusFilter.value=state.statusScope;refreshMonthFilter();if(monthFilter&&monthFilter.value!==state.month)monthFilter.value=state.month;}
  function updateMetrics(){
    const current=currentRelations();const students=new Set(current.map(r=>normalize(r.name)));const courses=currentCourseMap();
    const offlineStudents=new Set(current.filter(r=>deliveryFor(r.course)==='线下').map(r=>normalize(r.name)));
    const pending=new Set(current.filter(isPending).map(r=>normalize(r.name)));
    [[metrics.students,students.size],[metrics.links,current.length],[metrics.offline,offlineStudents.size],[metrics.pending,pending.size],[metrics.unscheduled,[...courses.keys()].filter(c=>!isScheduledCourse(c)).length]].forEach(([node,value])=>{if(node&&node.textContent!==String(value))node.textContent=String(value);});
    const historyCount=allRelations().filter(isHistorical).length;
    const next=state.records.length?`<strong>本地报名数据</strong> · 当前 ${students.size} 名学生 / ${current.length} 条报名${historyCount?` · 历史 ${historyCount} 条`:''} · 报名编号自动解析日期`:'<strong>尚未载入报名数据</strong> · 可导入 CSV';
    if(sourceLabel&&sourceLabel.innerHTML!==next)sourceLabel.innerHTML=next;if(exportButton)exportButton.disabled=!state.records.length;if(clearButton)clearButton.disabled=!state.records.length;
  }
  function renderEmpty(message=''){content.innerHTML=`<div class="enrollment-empty"><div><strong>${esc(message||'还没有报名数据')}</strong><p>${state.records.length?'当前筛选条件下没有符合的报名记录。':'可导入 CSV；支持“姓名 / 氏名、报名课程 / 申込科目、报名编号”。报名编号前 8 位自动作为报名日期。'}</p></div></div>`;}
  function courseEntries(){
    const map=new Map();scopeRelations().forEach(r=>{if(!map.has(r.course))map.set(r.course,[]);map.get(r.course).push(r);});
    let entries=[...map.entries()].sort((a,b)=>Number(isScheduledCourse(b[0]))-Number(isScheduledCourse(a[0]))||uniqueStudentCount(b[1].filter(isActive))-uniqueStudentCount(a[1].filter(isActive))||a[0].localeCompare(b[0],'zh-CN'));
    if(state.selectedCourse&&!map.has(state.selectedCourse))entries=[[state.selectedCourse,[]],...entries];return entries;
  }
  function captureScroll(){return{list:content.querySelector('.enrollment-course-list')?.scrollTop||0,detail:content.querySelector('.enrollment-detail')?.scrollTop||0,student:content.querySelector('.enrollment-student-view')?.scrollTop||0,planning:content.querySelector('.enrollment-planning-view')?.scrollTop||0};}
  function restoreScroll(snapshot,{resetDetail=false}={}){requestAnimationFrame(()=>{const list=content.querySelector('.enrollment-course-list'),detail=content.querySelector('.enrollment-detail'),student=content.querySelector('.enrollment-student-view'),planning=content.querySelector('.enrollment-planning-view');if(list)list.scrollTop=snapshot.list;if(detail)detail.scrollTop=resetDetail?0:snapshot.detail;if(student)student.scrollTop=snapshot.student;if(planning)planning.scrollTop=snapshot.planning;});}

  function renderCourseView(){
    const entries=courseEntries();if(!entries.length)return renderEmpty('没有符合条件的课程');
    const map=new Map(entries);if(!state.selectedCourse||!map.has(state.selectedCourse))state.selectedCourse=entries[0][0];
    const buttons=entries.map(([course,relations])=>{
      const active=uniqueStudentCount(relations.filter(isActive));const total=uniqueStudentCount(relations);const pending=uniqueStudentCount(relations.filter(isPending));
      const mode=deliveryFor(course);const status=relations.length?(active?(isScheduledCourse(course)?'已排入日历':'时间未定'):'历史课程'):(isScheduledCourse(course)?'已排入日历 · 暂无报名':'暂无报名');
      const detail=[mode,pending?`${pending} 人待确认`:'',status].filter(Boolean).join(' · ');
      return `<button type="button" class="enrollment-course-btn${course===state.selectedCourse?' active':''}" data-enrollment-course="${esc(course)}"><strong>${esc(course)}</strong><span>${active||total||0}</span><small>${esc(detail)}</small></button>`;
    }).join('');
    const all=map.get(state.selectedCourse)||[];
    const records=all.filter(r=>matches(r,state.selectedCourse)).sort((a,b)=>dateKey(b.signupDate)-dateKey(a.signupDate)||a.name.localeCompare(b.name,'zh-CN'));
    const rows=records.length?records.map(r=>`<tr><td><strong>${esc(r.name)}</strong></td><td>${esc(displayDate(r.signupDate))}</td><td><span class="enrollment-chip${isOfflineRequired(r)?' offline':''}">${esc(r.requirement)}</span></td><td><span class="enrollment-status-text${isHistorical(r)?' history':isPending(r)?' pending':''}">${esc(r.status)}</span></td><td>${esc(r.note||'—')}</td></tr>`).join(''):'<tr><td colspan="5" class="enrollment-no-results">当前没有符合条件的学生。</td></tr>';
    const current=uniqueStudentCount(all.filter(isActive));const historical=all.filter(isHistorical).length;const mode=deliveryFor(state.selectedCourse);
    const meta=[`当前 ${current} 人`,mode,historical?`历史 ${historical} 条`:''].filter(Boolean).join(' · ');
    const statusText=isScheduledCourse(state.selectedCourse)?(all.length?'已排入课程日历':'已排入课程日历 · 暂无报名'):(current?'尚未排入课程日历':all.length?'历史课程':'暂无排课信息');
    content.innerHTML=`<div class="enrollment-course-view"><aside class="enrollment-course-list"><div class="enrollment-course-list-head">课程 <span>当前人数</span></div>${buttons}</aside><section class="enrollment-detail"><header class="enrollment-detail-head"><div><h3>${esc(state.selectedCourse)}</h3><small>${esc(statusText)}</small></div><span>${esc(meta)}</span></header><table class="enrollment-table"><thead><tr><th style="width:17%">姓名</th><th style="width:16%">报名日期</th><th style="width:20%">个别要求</th><th style="width:15%">状态</th><th>备注</th></tr></thead><tbody>${rows}</tbody></table></section></div>`;
  }
  function studentProfiles(relations){
    const grouped=new Map();relations.forEach(r=>{const key=normalize(r.name);if(!grouped.has(key))grouped.set(key,{name:r.name,relations:[]});grouped.get(key).relations.push(r);});
    return [...grouped.values()].map(profile=>{const ordered=[...profile.relations].sort((a,b)=>dateKey(b.signupDate)-dateKey(a.signupDate));const strongest=profile.relations.find(isOfflineRequired)||profile.relations.find(r=>requirementGroup(r)==='offline-preferred')||profile.relations[0];return{name:profile.name,relations:profile.relations,courses:[...new Set(profile.relations.map(r=>r.course))],signupDate:ordered[0]?.signupDate||'',requirement:strongest?.requirement||'未填写',status:profile.relations.some(isPending)?'待确认':profile.relations.some(isActive)?'已报名':profile.relations[0]?.status||'—',note:[...new Set(profile.relations.map(r=>r.note).filter(Boolean))].join('；')};});
  }
  function renderStudentView(){
    const profiles=studentProfiles(scopeRelations()).filter(p=>matches({...p,courses:p.courses})).sort((a,b)=>dateKey(b.signupDate)-dateKey(a.signupDate)||a.name.localeCompare(b.name,'zh-CN'));
    const rows=profiles.length?profiles.map(p=>{const courses=[...p.relations].sort((a,b)=>Number(isHistorical(a))-Number(isHistorical(b))||a.course.localeCompare(b.course,'zh-CN')).map(r=>`<span class="course-pill${isHistorical(r)?' historical':''}">${esc(r.course)}${isHistorical(r)?` · ${esc(r.status)}`:''}</span>`).join('');return `<tr><td><strong>${esc(p.name)}</strong></td><td class="course-cell">${courses}</td><td>${esc(displayDate(p.signupDate))}</td><td><span class="enrollment-chip${isOfflineRequired(p)?' offline':''}">${esc(p.requirement)}</span></td><td><span class="enrollment-status-text${p.status==='待确认'?' pending':''}">${esc(p.status)}</span></td><td>${esc(p.note||'—')}</td></tr>`;}).join(''):'<tr><td colspan="6" class="enrollment-no-results">当前筛选条件下没有学生。</td></tr>';
    content.innerHTML=`<div class="enrollment-student-view"><table class="enrollment-table"><thead><tr><th style="width:13%">姓名</th><th style="width:31%">报名课程</th><th style="width:14%">报名日期</th><th style="width:15%">个别要求</th><th style="width:12%">状态</th><th>备注</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }
  function overlapPairs(){
    const students=new Map();currentRelations().forEach(r=>{const key=normalize(r.name);if(!students.has(key))students.set(key,{name:r.name,courses:new Set()});students.get(key).courses.add(r.course);});
    const pairs=new Map();students.forEach(profile=>{const courses=[...profile.courses].sort((a,b)=>a.localeCompare(b,'zh-CN'));for(let i=0;i<courses.length;i++)for(let j=i+1;j<courses.length;j++){const key=`${courses[i]}|||${courses[j]}`;if(!pairs.has(key))pairs.set(key,{a:courses[i],b:courses[j],students:[]});pairs.get(key).students.push(profile.name);}});
    return [...pairs.values()].map(pair=>{const ga=COURSE_GROUPS.get(pair.a)||'其他',gb=COURSE_GROUPS.get(pair.b)||'其他';const level=ga===gb&&['理科','文科','数学'].includes(ga)?'high':ga==='数学'||gb==='数学'?'medium':'normal';return{...pair,count:pair.students.length,level};}).sort((a,b)=>b.count-a.count||({high:2,medium:1,normal:0}[b.level]-({high:2,medium:1,normal:0}[a.level])));
  }
  function planningRows(){return [...currentCourseMap().entries()].map(([course,relations])=>({course,group:COURSE_GROUPS.get(course)||'其他',mode:deliveryFor(course),total:uniqueStudentCount(relations),required:uniqueStudentCount(relations.filter(isOfflineRequired)),unspecified:uniqueStudentCount(relations.filter(r=>requirementGroup(r)==='unspecified')),pending:uniqueStudentCount(relations.filter(isPending)),scheduled:isScheduledCourse(course)})).sort((a,b)=>Number(a.scheduled)-Number(b.scheduled)||b.total-a.total||a.course.localeCompare(b.course,'zh-CN'));}
  function dataIssues(){const current=currentRelations(),issues=[];const ambiguous=[...new Set(current.filter(r=>r.course==='数学（待确认）').map(r=>r.name))];if(ambiguous.length)issues.push({level:'high',title:'数学科目待确认',text:ambiguous.join('、')});const missingDate=[...new Set(current.filter(r=>!r.signupDate).map(r=>r.name))];if(missingDate.length)issues.push({level:'normal',title:'报名日期未填写',text:`${missingDate.length} 名`});return issues;}
  function renderPlanningView(){
    const demand=planningRows();if(!demand.length)return renderEmpty('暂无当前报名数据');
    const students=uniqueStudentCount(currentRelations()),unscheduled=demand.filter(d=>!d.scheduled),offlineStudents=uniqueStudentCount(currentRelations().filter(r=>deliveryFor(r.course)==='线下')),issues=dataIssues();
    const issuesHtml=issues.length?`<section class="planning-plain-section planning-attention"><header><h3>需要确认</h3><p>这些信息会直接影响排课。</p></header><div class="planning-issues">${issues.map(issue=>`<div class="planning-issue ${issue.level}"><strong>${esc(issue.title)}</strong><span>${esc(issue.text)}</span></div>`).join('')}</div></section>`:'';
    const demandRows=demand.map(d=>`<tr><td><strong>${esc(d.course)}</strong><small class="course-group">${esc(d.group)}</small></td><td class="number-cell">${d.total}</td><td><span class="schedule-state ${d.mode==='线下'?'scheduled':'unscheduled'}">${d.mode}</span></td><td class="number-cell${d.required?' danger-number':''}">${d.required}</td><td class="number-cell${d.unspecified?' warn-number':''}">${d.unspecified}</td><td><span class="schedule-state ${d.scheduled?'scheduled':'unscheduled'}">${d.scheduled?'已排':'待排'}</span></td></tr>`).join('');
    const overlaps=overlapPairs().filter(p=>p.count>0);const overlapRows=overlaps.length?overlaps.map(p=>`<tr><td><strong>${esc(p.a)}</strong><span class="pair-arrow">×</span><strong>${esc(p.b)}</strong></td><td class="number-cell">${p.count}</td><td><span class="conflict-level ${p.level}">${p.level==='high'?'原则错开':p.level==='medium'?'优先错开':'实际重合'}</span></td><td class="student-sample">${esc(p.students.slice(0,6).join('、'))}${p.students.length>6?'…':''}</td></tr>`).join(''):'<tr><td colspan="4" class="enrollment-no-results">暂无选科重合。</td></tr>';
    content.innerHTML=`<div class="enrollment-planning-view"><div class="planning-summary"><div><span>当前学生</span><strong>${students}</strong></div><div><span>待排科目</span><strong>${unscheduled.length}</strong></div><div><span>线下授课学生</span><strong>${offlineStudents}</strong></div><div><span>固定线下科目</span><strong>${demand.filter(d=>d.mode==='线下').length}</strong></div></div>${issuesHtml}<section class="planning-section"><header><div><h3>课程需求</h3><p>授课方式按当前教务口径：国语、地理、物理线下，其余线上。</p></div></header><div class="planning-table-wrap"><table class="enrollment-table planning-table"><thead><tr><th>课程</th><th>人数</th><th>方式</th><th>个别线下要求</th><th>要求未填</th><th>排课</th></tr></thead><tbody>${demandRows}</tbody></table></div></section><section class="planning-section"><header><div><h3>选科重合</h3><p>理科之间、文科之间原则错开；数学与其他课程优先错开。</p></div></header><div class="planning-table-wrap"><table class="enrollment-table planning-table"><thead><tr><th>课程组合</th><th>共同学生</th><th>建议</th><th>学生</th></tr></thead><tbody>${overlapRows}</tbody></table></div></section></div>`;
  }

  let lastRenderedView='';
  function render(options={}){const sameView=lastRenderedView===state.view,snapshot=sameView?captureScroll():null;document.querySelectorAll('[data-enrollment-view]').forEach(btn=>btn.classList.toggle('active',btn.dataset.enrollmentView===state.view));const planning=state.view==='planning';[searchInput,requirementFilter,statusFilter,monthFilter].forEach(el=>{if(el)el.disabled=planning;});syncControls();updateMetrics();if(!state.records.length)renderEmpty();else if(state.view==='student')renderStudentView();else if(planning)renderPlanningView();else renderCourseView();if(snapshot)restoreScroll(snapshot,options);lastRenderedView=state.view;}
  function resetFiltersForDirectCourse(){state.view='course';state.query='';state.requirement='all';state.statusScope='active';state.month='all';syncControls();}
  function openDrawer(initialCourse=''){if(initialCourse){state.selectedCourse=canonicalCourse(initialCourse);resetFiltersForDirectCourse();}drawer.hidden=false;document.documentElement.classList.add('enrollment-open');document.body.style.overflow='hidden';render();requestAnimationFrame(()=>closeButton?.focus({preventScroll:true}));}
  function closeDrawer(){drawer.hidden=true;document.documentElement.classList.remove('enrollment-open');document.body.style.overflow='';openButton.focus({preventScroll:true});}
  function courseForCalendarNode(node){for(const [cls,course] of CALENDAR_CLASS_TO_COURSE)if(node.classList.contains(cls))return course;return'';}
  function countForCourse(course){const canonical=canonicalCourse(course);return uniqueStudentCount(currentRelations().filter(r=>r.course===canonical));}
  function decorateCalendarCounts(){document.querySelectorAll('.event[data-event-id],.month-event[data-event-id],.mobile-event[data-event-id]').forEach(node=>{const course=courseForCalendarNode(node),existing=node.querySelector('.enrollment-count-badge'),count=course&&!node.classList.contains('cancelled')?countForCourse(course):0;if(!count){if(existing)existing.remove();return;}const next=`${count}人`;if(existing){if(existing.textContent!==next)existing.textContent=next;return;}const badge=document.createElement('span');badge.className='enrollment-count-badge';badge.textContent=next;(node.querySelector('.event-name,.month-event-top strong,.mobile-event strong,strong')||node).append(badge);});}
  function installDialogButton(){const card=document.querySelector('#eventDialog .dialog-card');if(!card)return;let button=document.getElementById('dialogEnrollmentButton');if(!button){button=document.createElement('button');button.type='button';button.id='dialogEnrollmentButton';button.className='dialog-enrollment-btn';button.innerHTML='查看报名学生 <span class="dialog-enrollment-count">未载入</span>';button.addEventListener('click',()=>{const course=document.getElementById('dialogSubject')?.textContent?.trim()||'';const dialog=document.getElementById('eventDialog');if(dialog)dialog.hidden=true;document.body.style.overflow='';openDrawer(course);});card.append(button);}updateDialogCount();}
  function updateDialogCount(){const button=document.getElementById('dialogEnrollmentButton');if(!button)return;let span=button.querySelector('.dialog-enrollment-count');if(!span){span=document.createElement('span');span.className='dialog-enrollment-count';button.append(span);}const course=document.getElementById('dialogSubject')?.textContent?.trim()||'';const next=state.records.length?`${countForCourse(course)} 人`:'未载入';if(span.textContent!==next)span.textContent=next;}

  function parseCsv(text){const rows=[];let row=[],cell='',quote=false;for(let i=0;i<text.length;i++){const ch=text[i],next=text[i+1];if(ch==='"'){if(quote&&next==='"'){cell+='"';i++;}else quote=!quote;}else if(ch===','&&!quote){row.push(cell);cell='';}else if((ch==='\n'||ch==='\r')&&!quote){if(ch==='\r'&&next==='\n')i++;row.push(cell);cell='';if(row.some(v=>v.trim()!==''))rows.push(row);row=[];}else cell+=ch;}row.push(cell);if(row.some(v=>v.trim()!==''))rows.push(row);if(!rows.length)return[];const headers=rows[0].map(v=>v.trim().replace(/^\ufeff/,''));return rows.slice(1).map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));}
  function csvEscape(value){const s=String(value??'');return /[",\n\r]/.test(s)?`"${s.replaceAll('"','""')}"`:s;}
  function download(name,text){const blob=new Blob([text],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);}
  let renderQueued=false;function queueRender(options={}){if(renderQueued)return;renderQueued=true;requestAnimationFrame(()=>{renderQueued=false;render(options);});}

  openButton.addEventListener('click',()=>openDrawer());
  drawer.addEventListener('click',event=>{if(event.target.closest('[data-close-enrollment]'))return closeDrawer();const tab=event.target.closest('[data-enrollment-view]');if(tab){state.view=tab.dataset.enrollmentView;render();return;}const course=event.target.closest('[data-enrollment-course]');if(course){state.selectedCourse=course.dataset.enrollmentCourse;render({resetDetail:true});}});
  searchInput?.addEventListener('input',()=>{state.query=searchInput.value;queueRender();});
  requirementFilter?.addEventListener('change',()=>{state.requirement=requirementFilter.value;render();});
  statusFilter?.addEventListener('change',()=>{state.statusScope=statusFilter.value;render();});
  monthFilter?.addEventListener('change',()=>{state.month=monthFilter.value;render();});
  importButton?.addEventListener('click',()=>fileInput?.click());
  fileInput?.addEventListener('change',async()=>{const file=fileInput.files?.[0];if(!file)return;const rows=parseCsv(await file.text()).map(cleanRecord).filter(Boolean);if(rows.length){state.records=rows;saveRecords();state.month='all';state.selectedCourse='';state.statusScope='active';render();decorateCalendarCounts();updateDialogCount();}fileInput.value='';});
  templateButton?.addEventListener('click',()=>download('旅人教育_报名信息模板.csv','\ufeff姓名,报名课程,报名编号,报名日期,线下要求,报名状态,备注\n示例学生,数学IA、化学,2026090301A,,未填写,已报名,\n'));
  exportButton?.addEventListener('click',()=>{if(!state.records.length)return;const head='姓名,报名课程,报名编号,报名日期,线下要求,报名状态,备注';const lines=state.records.map(r=>[r.name,r.courses.join('、'),r.registrationCode,r.signupDate,r.requirement,r.status,r.note].map(csvEscape).join(','));download('旅人教育_报名信息_导出.csv','\ufeff'+[head,...lines].join('\n'));});
  clearButton?.addEventListener('click',()=>{if(!state.records.length)return;if(!window.confirm('清除本浏览器中的报名数据？'))return;state.records=[];saveRecords();state.selectedCourse='';render();decorateCalendarCounts();updateDialogCount();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!drawer.hidden)closeDrawer();});
  document.addEventListener('click',event=>{if(event.target.closest('[data-event-id]'))setTimeout(updateDialogCount,0);});

  let calendarQueued=false;const calendar=document.querySelector('.office-calendar');
  if(calendar&&'MutationObserver'in window){new MutationObserver(mutations=>{const relevant=mutations.some(mutation=>[...mutation.addedNodes,...mutation.removedNodes].some(node=>node.nodeType===1&&!node.classList?.contains('enrollment-count-badge')));if(!relevant||calendarQueued)return;calendarQueued=true;requestAnimationFrame(()=>{calendarQueued=false;decorateCalendarCounts();});}).observe(calendar,{childList:true,subtree:true});}
  const dialog=document.getElementById('eventDialog');if(dialog&&'MutationObserver'in window){new MutationObserver(()=>requestAnimationFrame(updateDialogCount)).observe(dialog,{attributes:true,attributeFilter:['hidden']});}

  refreshMonthFilter();installDialogButton();render();decorateCalendarCounts();
})();