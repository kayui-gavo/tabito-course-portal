(() => {
  'use strict';

  // The 2026-10-12 consolidated PDF is the source of truth for winter classes.
  const data = window.TabitoWinter2026;
  if (!data) throw new Error('Missing 2026 winter schedule data');
  const subjects = {
    ...data.subjects,
    english: { name: '共通英语阅读', teacher: '刘淼', mode: '网课' },
    privatePhysics: { name: '魏思远物理一对一', teacher: '刘可惟', mode: '线下' }
  };
  const scheduleEvents = [
    ...data.events,
    { id: 'private-physics-01', subject: 'privatePhysics', date: '2026-08-30', start: '15:00', end: '17:00', title: '个别指导', topic: '魏思远｜物理一对一', status: 'normal' }
  ];

  const pendingCourses = [
    '第1回　基础文型解析', '第2回　复杂句解析', '第3回　特殊文型解析', '第4回　多义动词理解',
    '第5回　听力技巧训练1，长文讲评1', '第6回　听力技巧训练1，长文讲评2', '第7回　听力技巧训练1，长文讲评3',
    '第8回　听力技巧训练1，长文讲评4', '第9回　听力技巧训练1，长文讲评5', '第10回　2020年过去问演练',
    '第11回　2021年过去问演练', '第12回　2022年过去问演练', '第13回　2023年过去问演练',
    '第14回　2024年过去问演练', '第15回　2025年过去问演练'
  ];

  const DAY_MS = 86400000;
  const START_MINUTE = 9 * 60;
  const END_MINUTE = 21 * 60;
  const GRID_HEIGHT = 700;
  const weekdayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const shortWeekdayNames = ['一', '二', '三', '四', '五', '六', '日'];

  installSubjectStyles();

  const initial = getInitialState();
  const state = { view: initial.view, weekStart: initial.weekStart, monthStart: initial.monthStart, range: 'workdays', subject: 'all' };

  const els = {
    weekTitle: document.getElementById('weekTitle'), weekCount: document.getElementById('weekCount'),
    calendarHead: document.getElementById('calendarHead'), timeAxis: document.getElementById('timeAxis'),
    dayGrid: document.getElementById('dayGrid'), calendarMobile: document.getElementById('calendarMobile'),
    weekView: document.getElementById('weekView'), monthView: document.getElementById('monthView'), monthGrid: document.getElementById('monthGrid'),
    rangeSegment: document.getElementById('rangeSegment'), summaryPeriodLabel: document.getElementById('summaryPeriodLabel'),
    summarySessions: document.getElementById('summarySessions'), summaryHours: document.getElementById('summaryHours'),
    summaryCancelled: document.getElementById('summaryCancelled'), subjectFilter: document.getElementById('subjectFilter'),
    pendingList: document.getElementById('pendingList'), pendingCount: document.getElementById('pendingCount'),
    prevLabel: document.getElementById('prevLabel'), todayLabel: document.getElementById('todayLabel'), nextLabel: document.getElementById('nextLabel'),
    dialog: document.getElementById('eventDialog'), dialogSubject: document.getElementById('dialogSubject'), dialogTitle: document.getElementById('dialogTitle'),
    dialogDate: document.getElementById('dialogDate'), dialogTime: document.getElementById('dialogTime'), dialogTeacher: document.getElementById('dialogTeacher'),
    dialogMode: document.getElementById('dialogMode'), dialogStatus: document.getElementById('dialogStatus'), dialogNote: document.getElementById('dialogNote')
  };

  function installSubjectStyles() {
    if (document.getElementById('scheduleSubjectPatch')) return;
    const style = document.createElement('style');
    style.id = 'scheduleSubjectPatch';
    style.textContent = `
      :root {
        --math-iibc:#3d7790; --math-iibc-bg:#edf5f7;
        --math-ia1:#7a5d8e; --math-ia1-bg:#f4f0f7;
        --math-ia2:#566e8a; --math-ia2-bg:#edf2f7;
        --chinese:#aa6845; --chinese-bg:#faf1eb;
        --science-tokyo:#366c72; --science-tokyo-bg:#edf6f5;
        --geography:#8a6a3f; --geography-bg:#f7f1e8;
        --common-physics:#496d8b; --common-physics-bg:#eef4f8;
        --private-physics:#695f8d; --private-physics-bg:#f1eff7;
      }
      .subject-legend.mathIIBC i{background:var(--math-iibc)}
      .subject-legend.mathIA1 i{background:var(--math-ia1)}
      .subject-legend.mathIA2 i{background:var(--math-ia2)}
      .subject-legend.chinese i{background:var(--chinese)}
      .subject-legend.scienceTokyoPhysics i{background:var(--science-tokyo)}
      .subject-legend.geography i{background:var(--geography)}
      .subject-legend.commonPhysics i{background:var(--common-physics)}
      .subject-legend.privatePhysics i{background:var(--private-physics)}
      .event.mathIA1{border-color:#d6cbe0;border-left-color:var(--math-ia1);background:var(--math-ia1-bg)}
      .event.mathIA2{border-color:#c4d2e0;border-left-color:var(--math-ia2);background:var(--math-ia2-bg)}
      .event.chinese{border-color:#e2cabc;border-left-color:var(--chinese);background:var(--chinese-bg)}
      .event.scienceTokyoPhysics{border-color:#bad8d6;border-left-color:var(--science-tokyo);background:var(--science-tokyo-bg)}
      .event.mathIIBC{border-color:#b9d1da;border-left-color:var(--math-iibc);background:var(--math-iibc-bg)}
      .event.geography{border-color:#d9c8af;border-left-color:var(--geography);background:var(--geography-bg)}
      .event.commonPhysics{border-color:#bfd0de;border-left-color:var(--common-physics);background:var(--common-physics-bg)}
      .event.privatePhysics{border-color:#cbc4df;border-left-color:var(--private-physics);background:var(--private-physics-bg)}
      .month-event.mathIA1{border-left-color:var(--math-ia1);background:var(--math-ia1-bg)}
      .month-event.mathIA2{border-left-color:var(--math-ia2);background:var(--math-ia2-bg)}
      .month-event.chinese{border-left-color:var(--chinese);background:var(--chinese-bg)}
      .month-event.scienceTokyoPhysics{border-left-color:var(--science-tokyo);background:var(--science-tokyo-bg)}
      .month-event.mathIIBC{border-left-color:var(--math-iibc);background:var(--math-iibc-bg)}
      .month-event.geography{border-left-color:var(--geography);background:var(--geography-bg)}
      .month-event.commonPhysics{border-left-color:var(--common-physics);background:var(--common-physics-bg)}
      .month-event.privatePhysics{border-left-color:var(--private-physics);background:var(--private-physics-bg)}
      .course-overview-dot.mathIA1{background:var(--math-ia1)}
      .course-overview-dot.mathIA2{background:var(--math-ia2)}
      .course-overview-dot.chinese{background:var(--chinese)}
      .course-overview-dot.scienceTokyoPhysics{background:var(--science-tokyo)}
      .event-meta,.month-event-meta,.mobile-event-meta{color:rgba(24,34,48,.58);font-weight:650}
      .event-meta{display:block;margin-top:2px;font-size:9px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .month-event-meta{display:block;margin-top:2px;font-size:8.5px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .mobile-event-meta{display:block;margin-top:2px;font-size:11px}
    `;
    document.head.append(style);
  }

  function parseDate(value){ const [y,m,d]=value.split('-').map(Number); return new Date(Date.UTC(y,m-1,d)); }
  function formatDate(date){ return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`; }
  function firstOfMonth(date){ return new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),1)); }
  function lastOfMonth(date){ return new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,0)); }
  function addDays(date,days){ return new Date(date.getTime()+days*DAY_MS); }
  function addMonths(date,months){ return new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+months,1)); }
  function startOfWeek(date){ const copy=new Date(date.getTime()); const day=copy.getUTCDay(); copy.setUTCDate(copy.getUTCDate()+(day===0?-6:1-day)); return copy; }
  function minutes(time){ const [h,m]=time.split(':').map(Number); return h*60+m; }
  function durationHours(event){ return Math.max(0,minutes(event.end)-minutes(event.start))/60; }

  function getInitialState(){
    const params=new URLSearchParams(location.search); const requestedView=params.get('view')==='month'?'month':'week';
    const now=new Date(); const today=new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()));
    let weekStart=startOfWeek(today); const queryWeek=params.get('week');
    if(queryWeek&&/^\d{4}-\d{2}-\d{2}$/.test(queryWeek)){ const parsed=parseDate(queryWeek); if(!Number.isNaN(parsed.getTime())) weekStart=startOfWeek(parsed); }
    let monthStart=firstOfMonth(today); const queryMonth=params.get('month');
    if(queryMonth&&/^\d{4}-\d{2}$/.test(queryMonth)){ const parsed=parseDate(`${queryMonth}-01`); if(!Number.isNaN(parsed.getTime())) monthStart=parsed; }
    else if(queryWeek) monthStart=firstOfMonth(weekStart);
    return {view:requestedView,weekStart,monthStart};
  }

  function eventTeacher(event){ return event.teacher ?? subjects[event.subject]?.teacher ?? ''; }
  function eventMode(event){ return event.mode ?? subjects[event.subject]?.mode ?? ''; }
  function eventMeta(event){ return [eventTeacher(event),eventMode(event)].filter(Boolean).join(' · '); }
  function subjectMatches(event){ return state.subject==='all'||event.subject===state.subject; }
  function eventsBetween(start,end){ const a=formatDate(start),b=formatDate(end); return scheduleEvents.filter(e=>e.date>=a&&e.date<=b).filter(subjectMatches).sort((x,y)=>x.date.localeCompare(y.date)||x.start.localeCompare(y.start)); }
  function visibleDates(){ const count=state.range==='fullweek'?7:5; return Array.from({length:count},(_,i)=>addDays(state.weekStart,i)); }
  function visibleWeekEvents(){ const dates=visibleDates(); return eventsBetween(dates[0],dates[dates.length-1]); }
  function visibleMonthEvents(){ return eventsBetween(state.monthStart,lastOfMonth(state.monthStart)); }
  function currentPeriodEvents(){ return state.view==='month'?visibleMonthEvents():visibleWeekEvents(); }

  function dataAttrs(event){
    const teacher=eventTeacher(event).replace(/"/g,'&quot;');
    const mode=eventMode(event).replace(/"/g,'&quot;');
    return `data-teacher="${teacher}" data-mode="${mode}"`;
  }

  function renderTimeAxis(){ const rows=[]; for(let minute=START_MINUTE;minute<=END_MINUTE;minute+=60){ const top=((minute-START_MINUTE)/(END_MINUTE-START_MINUTE))*GRID_HEIGHT; const hour=String(Math.floor(minute/60)).padStart(2,'0'); rows.push(`<span class="${minute===START_MINUTE?'time-label start':'time-label'}" style="top:${top}px">${hour}:00</span>`); } els.timeAxis.innerHTML=rows.join(''); }
  function renderHeader(){ const dates=visibleDates(); els.calendarHead.style.gridTemplateColumns=`68px repeat(${dates.length},minmax(0,1fr))`; const now=new Date(); const todayKey=formatDate(new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))); els.calendarHead.innerHTML=['<div class="corner" aria-hidden="true"></div>',...dates.map((date,index)=>`<div class="day-head${formatDate(date)===todayKey?' today':''}"><span class="weekday">${weekdayNames[index]}</span><span class="date">${date.getUTCMonth()+1}/${date.getUTCDate()}</span></div>`)].join(''); }
  function eventClass(event){ if(event.status==='cancelled')return `${event.subject} cancelled`; if(event.status==='tentative')return `${event.subject} tentative`; return event.subject; }
  function eventStatusLabel(event){ if(event.status==='cancelled')return '休讲'; if(event.status==='tentative')return '拟排（待确认）'; return '正常授课'; }

  function layoutDayEvents(dayEvents){
    const sorted=[...dayEvents].sort((a,b)=>a.start.localeCompare(b.start)||a.end.localeCompare(b.end)); const result=[]; let group=[],groupEnd=-1;
    const flush=()=>{ if(!group.length)return; const columnEnds=[]; const placed=group.map(event=>{ const start=minutes(event.start),end=minutes(event.end); let column=columnEnds.findIndex(v=>v<=start); if(column===-1){column=columnEnds.length;columnEnds.push(end);}else columnEnds[column]=end; return {event,column}; }); const columns=Math.max(1,columnEnds.length); placed.forEach(item=>result.push({...item,columns})); group=[];groupEnd=-1; };
    sorted.forEach(event=>{ const start=minutes(event.start),end=minutes(event.end); if(group.length&&start>=groupEnd)flush(); group.push(event); groupEnd=Math.max(groupEnd,end); }); flush(); return result;
  }

  function eventButton(event,layout={column:0,columns:1}){ const topMinute=Math.max(START_MINUTE,minutes(event.start)),endMinute=Math.min(END_MINUTE,minutes(event.end)); const top=((topMinute-START_MINUTE)/(END_MINUTE-START_MINUTE))*GRID_HEIGHT; const height=Math.max(34,((endMinute-topMinute)/(END_MINUTE-START_MINUTE))*GRID_HEIGHT-5); const subjectName=subjects[event.subject].name; const name=event.status==='cancelled'?`休讲 · ${subjectName}`:`${subjectName} · ${event.title}`; const width=100/layout.columns,left=layout.column*width,meta=eventMeta(event); const style=`top:${top}px;height:${height}px;left:calc(${left}% + 4px);right:auto;width:calc(${width}% - 8px)`; return `<button type="button" class="event ${eventClass(event)}" data-event-id="${event.id}" ${dataAttrs(event)} style="${style}" aria-label="${name} ${event.start}至${event.end}"><span class="event-time">${event.start}–${event.end}</span><span class="event-name">${name}</span><span class="event-topic">${event.topic}</span>${meta?`<span class="event-meta">${meta}</span>`:''}</button>`; }
  function renderGrid(){ const dates=visibleDates(),events=visibleWeekEvents(); els.dayGrid.style.gridTemplateColumns=`repeat(${dates.length},minmax(0,1fr))`; els.dayGrid.innerHTML=dates.map(date=>{ const key=formatDate(date),laidOut=layoutDayEvents(events.filter(e=>e.date===key)); return `<div class="day-column" data-date="${key}">${laidOut.map(item=>eventButton(item.event,item)).join('')}</div>`; }).join(''); }
  function renderMobile(){ const dates=visibleDates(),events=visibleWeekEvents(); els.calendarMobile.innerHTML=dates.map((date,index)=>{ const key=formatDate(date),dayEvents=events.filter(e=>e.date===key); const body=dayEvents.length?dayEvents.map(event=>{ const subjectName=subjects[event.subject].name,line=event.status==='cancelled'?`休讲 · ${subjectName}`:`${subjectName} · ${event.title}`,meta=eventMeta(event); return `<button type="button" class="mobile-event ${eventClass(event)}" data-event-id="${event.id}" ${dataAttrs(event)}><span class="mobile-event-time">${event.start}–${event.end}</span><span><strong>${line}</strong><p>${event.topic}</p>${meta?`<span class="mobile-event-meta">${meta}</span>`:''}</span></button>`; }).join(''):'<p class="mobile-empty">无课程</p>'; return `<section class="mobile-day"><div class="mobile-day-head"><strong>周${shortWeekdayNames[index]} · ${date.getUTCMonth()+1}月${date.getUTCDate()}日</strong><span>${dayEvents.length?`${dayEvents.length} 项`:''}</span></div><div class="mobile-events">${body}</div></section>`; }).join(''); }

  function monthGridDates(){ const first=state.monthStart,last=lastOfMonth(first),gridStart=startOfWeek(first),lastDayIndex=(last.getUTCDay()+6)%7,gridEnd=addDays(last,6-lastDayIndex),count=Math.round((gridEnd-gridStart)/DAY_MS)+1; return Array.from({length:count},(_,i)=>addDays(gridStart,i)); }
  function monthEventButton(event){ const subjectName=subjects[event.subject].name,name=event.status==='cancelled'?`休讲 · ${subjectName}`:`${subjectName} · ${event.title}`,meta=eventMeta(event); return `<button type="button" class="month-event ${eventClass(event)}" data-event-id="${event.id}" ${dataAttrs(event)}><span class="month-event-top"><time>${event.start}</time><strong>${name}</strong></span><p>${event.topic}</p>${meta?`<span class="month-event-meta">${meta}</span>`:''}</button>`; }
  function renderMonth(){ const dates=monthGridDates(),events=eventsBetween(dates[0],dates[dates.length-1]),currentMonth=state.monthStart.getUTCMonth(),now=new Date(),todayKey=formatDate(new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))); els.monthGrid.innerHTML=dates.map(date=>{ const key=formatDate(date),dayEvents=events.filter(e=>e.date===key),outside=date.getUTCMonth()!==currentMonth?' outside':'',isToday=key===todayKey?' today':'',countLabel=dayEvents.length?`<span class="month-day-count">${dayEvents.length} 项</span>`:''; return `<section class="month-day${outside}${isToday}" data-date="${key}"><div class="month-date-row"><span class="month-date">${date.getUTCDate()}</span>${countLabel}</div><div class="month-events">${dayEvents.map(monthEventButton).join('')}</div></section>`; }).join(''); }

  function renderSummary(){ const events=currentPeriodEvents(),teaching=events.filter(e=>e.status!=='cancelled'),cancelled=events.filter(e=>e.status==='cancelled'),hours=teaching.reduce((sum,e)=>sum+durationHours(e),0); els.summarySessions.textContent=`${teaching.length} 节`; els.summaryHours.textContent=`${Number.isInteger(hours)?hours:hours.toFixed(1)} h`; els.summaryCancelled.textContent=String(cancelled.length); els.weekCount.textContent=`${teaching.length} 节授课${cancelled.length?` · ${cancelled.length} 项休讲`:''}`; els.summaryPeriodLabel.textContent=state.view==='month'?'本月':'本周'; }
  function renderPeriodTitle(){ if(state.view==='month'){ els.weekTitle.textContent=`${state.monthStart.getUTCFullYear()}年${state.monthStart.getUTCMonth()+1}月`; return; } const end=addDays(state.weekStart,state.range==='fullweek'?6:4),sameMonth=state.weekStart.getUTCMonth()===end.getUTCMonth(); els.weekTitle.textContent=sameMonth?`${state.weekStart.getUTCFullYear()}年${state.weekStart.getUTCMonth()+1}月${state.weekStart.getUTCDate()}日 – ${end.getUTCDate()}日`:`${state.weekStart.getUTCFullYear()}年${state.weekStart.getUTCMonth()+1}月${state.weekStart.getUTCDate()}日 – ${end.getUTCMonth()+1}月${end.getUTCDate()}日`; }
  function renderPending(){ const showEnglish=state.subject==='all'||state.subject==='english'; els.pendingCount.textContent=showEnglish?String(pendingCourses.length):'0'; if(!showEnglish){ els.pendingList.innerHTML='<p class="pending-more">当前筛选科目没有时间未定课程。</p>'; return; } const preview=pendingCourses.slice(0,5).map(item=>`<div class="pending-item"><strong>共通英语阅读 · 刘淼 · 线下</strong><span>${item}</span></div>`).join(''); els.pendingList.innerHTML=`${preview}<p class="pending-more">另有 ${pendingCourses.length-5} 回，日期与时间确定后将加入日历。</p>`; }
  function renderViewControls(){ const isMonth=state.view==='month'; els.weekView.hidden=isMonth; els.monthView.hidden=!isMonth; els.rangeSegment.hidden=isMonth; els.prevLabel.textContent=isMonth?'上一月':'上一周'; els.todayLabel.textContent=isMonth?'本月':'本周'; els.nextLabel.textContent=isMonth?'下一月':'下一周'; document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===state.view)); }
  function render(){ renderViewControls(); renderPeriodTitle(); if(state.view==='month')renderMonth(); else{renderHeader();renderGrid();renderMobile();} renderSummary();renderPending();updateQuery(); }
  function updateQuery(){ const url=new URL(location.href); url.searchParams.set('view',state.view); if(state.view==='month'){url.searchParams.set('month',`${state.monthStart.getUTCFullYear()}-${String(state.monthStart.getUTCMonth()+1).padStart(2,'0')}`);url.searchParams.delete('week');}else{url.searchParams.set('week',formatDate(state.weekStart));url.searchParams.delete('month');} if(state.subject==='all')url.searchParams.delete('subject');else url.searchParams.set('subject',state.subject); history.replaceState(null,'',url); }

  function openDialog(id){ const event=scheduleEvents.find(item=>item.id===id); if(!event)return; const date=parseDate(event.date),dayIndex=(date.getUTCDay()+6)%7,teacher=eventTeacher(event),mode=eventMode(event); els.dialogSubject.textContent=subjects[event.subject].name; els.dialogTitle.textContent=event.status==='cancelled'?'休讲':event.topic; els.dialogDate.textContent=`${date.getUTCFullYear()}年${date.getUTCMonth()+1}月${date.getUTCDate()}日（${weekdayNames[dayIndex]}）`; els.dialogTime.textContent=`${event.start}–${event.end}`; if(els.dialogTeacher)els.dialogTeacher.textContent=teacher||'—'; if(els.dialogMode)els.dialogMode.textContent=mode||'—'; els.dialogStatus.textContent=eventStatusLabel(event); els.dialogNote.textContent=event.status==='cancelled'?'本次课程休讲。':`${event.title}｜${event.topic}`; els.dialog.hidden=false;document.body.style.overflow='hidden'; }
  function closeDialog(){ els.dialog.hidden=true;document.body.style.overflow=''; }

  document.getElementById('prevWeek').addEventListener('click',()=>{ if(state.view==='month')state.monthStart=addMonths(state.monthStart,-1);else state.weekStart=addDays(state.weekStart,-7);render(); });
  document.getElementById('nextWeek').addEventListener('click',()=>{ if(state.view==='month')state.monthStart=addMonths(state.monthStart,1);else state.weekStart=addDays(state.weekStart,7);render(); });
  document.getElementById('todayWeek').addEventListener('click',()=>{ const now=new Date(),today=new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()));state.weekStart=startOfWeek(today);state.monthStart=firstOfMonth(today);render(); });
  els.subjectFilter.addEventListener('change',event=>{state.subject=event.target.value;render();});
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{const nextView=button.dataset.view;if(nextView===state.view)return;if(nextView==='month')state.monthStart=firstOfMonth(state.weekStart);else state.weekStart=startOfWeek(state.monthStart);state.view=nextView;render();}));
  document.querySelectorAll('[data-range]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-range]').forEach(item=>item.classList.remove('active'));button.classList.add('active');state.range=button.dataset.range;render();}));
  document.addEventListener('click',event=>{const node=event.target.closest('[data-event-id]');if(node)openDialog(node.dataset.eventId);if(event.target.closest('[data-close-dialog]'))closeDialog();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!els.dialog.hidden)closeDialog();});

  const params=new URLSearchParams(location.search),requestedSubject=params.get('subject');
  if(requestedSubject&&subjects[requestedSubject]){state.subject=requestedSubject;els.subjectFilter.value=requestedSubject;}
  renderTimeAxis();render();
})();