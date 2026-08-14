const defaultSiteText = {
  updateStrip: '课程资料将按授课进度持续更新。请以课堂通知和课程卡片的开放状态为准。',
  noticeTitle: '课程资料更新',
  noticeText: '第七回作业答案中弹簧惯性力题已修正，最新版中日答案已上传；此前的课程表变动通知仍可在这里查看。'
};

const defaultConfigVersion = '2026-08-14-course-series-v2';

const defaultCourses = [
  {
    no: 1,
    unit: '力学',
    title: '物体的运动',
    date: '2026-04-20',
    summary: '位移、速度、加速度、相对运动、匀加速度直线运动、落体运动、平抛与斜抛。',
    topics: ['运动学', '基础概念', '抛体运动'],
    note: 'course-notes/mechanics-01.pdf',
    video: 'https://meeting.tencent.com/crm/l5YJQAdp39',
    homework: 'assignments/mechanics-hw01.pdf',
    answerCn: 'assignments/mechanics-hw01-answer-cn.pdf',
    answerJp: 'assignments/mechanics-hw01-answer-jp.pdf'
  },
  {
    no: 2,
    unit: '力学',
    title: '力与刚体平衡',
    date: '2026-04-27',
    summary: '重力、弹力、摩擦力、浮力、牛顿运动定律、力矩、刚体平衡和受力分析。',
    topics: ['受力分析', '牛顿定律', '刚体平衡'],
    note: 'course-notes/mechanics-02.pdf',
    video: 'https://meeting.tencent.com/crm/2BYPWx74d8',
    homework: 'assignments/mechanics-hw02.pdf',
    answerCn: 'assignments/mechanics-hw02-answer-cn.pdf',
    answerJp: 'assignments/mechanics-hw02-answer-jp.pdf'
  },
  {
    no: 3,
    unit: '力学',
    title: '刚体、重心与机械能',
    date: '2026-05-04',
    summary: '刚体翻转、重心、功与功率、动能与势能、机械能守恒，并连接动量与碰撞的基本概念。',
    topics: ['刚体', '重心', '机械能'],
    note: 'course-notes/mechanics-03.pdf',
    video: 'https://meeting.tencent.com/crm/2YjMOAy393',
    homework: 'assignments/mechanics-hw03.pdf',
    answerCn: 'assignments/mechanics-hw03-answer-cn.pdf',
    answerJp: 'assignments/mechanics-hw03-answer-jp.pdf'
  },
  {
    no: 4,
    unit: '力学',
    title: '弹性势能、动量与碰撞',
    date: '2026-05-14',
    summary: '弹性势能、动量、冲量、动量守恒、碰撞与反发系数。',
    topics: ['弹性势能', '动量', '碰撞'],
    note: 'course-notes/mechanics-04.pdf',
    video: 'https://meeting.tencent.com/crm/K0qMvRXG71',
    homework: 'assignments/mechanics-hw04.pdf',
    answerCn: 'assignments/mechanics-hw04-answer-cn.pdf',
    answerJp: 'assignments/mechanics-hw04-answer-jp.pdf'
  },
  {
    no: 5,
    unit: '力学',
    title: '圆周运动和天体运动',
    date: '2026-05-22',
    summary: '圆周运动、向心力、万有引力、开普勒定律与天体轨道问题。',
    topics: ['圆周运动', '万有引力', '天体运动'],
    note: 'course-notes/mechanics-05.pdf',
    video: 'https://meeting.tencent.com/crm/K0qW5Aqb57',
    homework: 'assignments/mechanics-hw05.pdf',
    answerCn: 'assignments/mechanics-hw05-answer-cn.pdf',
    answerJp: 'assignments/mechanics-hw05-answer-jp.pdf'
  },
  {
    no: 6,
    unit: '力学',
    title: '简谐振动、相对运动与惯性力',
    date: '2026-05-23',
    summary: '弹簧振子、单摆、简谐振动、相对运动以及非惯性系中的惯性力。',
    topics: ['简谐振动', '相对运动', '惯性力'],
    note: 'course-notes/mechanics-06.pdf',
    video: 'https://meeting.tencent.com/crm/2pOaWE3Z7f',
    homework: 'assignments/mechanics-hw06.pdf',
    answerCn: 'assignments/mechanics-hw06-answer-cn.pdf',
    answerJp: 'assignments/mechanics-hw06-answer-jp.pdf'
  },
  {
    no: 7,
    unit: '力学・波动',
    title: '力学复习，波动入门',
    date: '2026-05-30',
    summary: '力学综合复习，以及波的基本性质、波形、振幅、周期、频率、波长和波速。',
    topics: ['力学复习', '波动', '波的基本性质'],
    note: 'course-notes/wave-01.pdf',
    video: 'https://meeting.tencent.com/crm/Nox0MxBbae',
    homework: 'assignments/wave-hw07.pdf',
    answerCn: 'assignments/wave-hw07-answer-cn.pdf',
    answerJp: 'assignments/wave-hw07-answer-jp.pdf'
  },
  {
    no: 8,
    unit: '波动',
    title: '波动2：正弦波图像与相位',
    date: '2026-06-06',
    summary: '通过正弦波的 y-x 图像和 y-t 图像，读取振幅、周期、波长、波速，并判断波形平移、相位差和时间延迟。',
    topics: ['正弦波图像', 'y-x / y-t 图像', '相位差'],
    note: 'course-notes/wave-02.pdf',
    video: 'https://meeting.tencent.com/crm/NL9zGx7B4c',
    homework: 'assignments/wave-hw08.pdf',
    answerCn: 'assignments/wave-hw08-answer-cn.pdf',
    answerJp: 'assignments/wave-hw08-answer-jp.pdf'
  },
  {
    no: 9,
    unit: '波动',
    title: '波动3：音',
    date: '2026-06-11',
    summary: '声波的传播、音速、反射、拍、弦与气柱的共振、音阶以及多普勒效应。',
    topics: ['音波', 'うなり', '共振', '多普勒效应'],
    note: 'course-notes/wave-03.pdf',
    video: 'https://meeting.tencent.com/crm/NxDMDoPY7a',
    homework: 'assignments/wave-hw09.pdf',
    answerCn: 'assignments/wave-hw09-answer-cn.pdf',
    answerJp: 'assignments/wave-hw09-answer-jp.pdf'
  },
  {
    no: 10,
    unit: '波动',
    title: '波动4：光',
    date: '2026-06-13',
    summary: '光的反射、折射、全反射、透镜、球面镜、偏振、杨氏实验、薄膜干涉和回折格子。',
    topics: ['几何光学', '光的干涉', '回折格子'],
    note: 'course-notes/wave-04.pdf',
    video: 'https://meeting.tencent.com/crm/2jEek77Be4',
    homework: 'assignments/wave-hw10.pdf',
    answerCn: 'assignments/wave-hw10-answer-cn.pdf',
    answerJp: 'assignments/wave-hw10-answer-jp.pdf'
  },
  {
    no: 11,
    unit: '波动・热力学',
    title: '波动5・热力学1',
    date: '2026-06-18',
    summary: '波动部分收束与热力学入门，连接光学复习、热现象、内能和状态变化的基本概念。',
    topics: ['波动复习', '热力学入门', '内能', '状态变化'],
    note: 'course-notes/wave-05-thermo-01.pdf',
    video: 'https://meeting.tencent.com/crm/NL9ZLWdpec',
    homework: 'assignments/wave-hw11.pdf',
    answerCn: 'assignments/wave-hw11-answer-cn.pdf',
    answerJp: 'assignments/wave-hw11-answer-jp.pdf'
  },
  {
    no: 12,
    unit: '热力学',
    title: '内能、热力学第一定律',
    date: '2026-06-20',
    summary: '内能、热量、气体做功、热力学第一定律及相关能量转化。',
    topics: ['内能', '热量', '热力学第一定律'],
    note: 'course-notes/thermo-02.pdf',
    video: 'https://meeting.tencent.com/crm/ldA8kBWd38',
    homework: 'assignments/thermo-hw12.pdf',
    answerCn: 'assignments/thermo-hw12-answer-cn.pdf',
    answerJp: 'assignments/thermo-hw12-answer-jp.pdf'
  },
  {
    no: 13,
    unit: '热力学',
    title: '热力学3：分子运动论、热力学复习',
    date: '2026-06-25',
    summary: '分子运动论、气体分子运动、热力学核心公式与综合复习。',
    topics: ['分子运动论', '热力学复习', '综合整理'],
    note: 'course-notes/thermo-03.pdf',
    video: 'https://meeting.tencent.com/crm/2pQ4x53B0b',
    homework: 'assignments/thermo-hw13.pdf',
    answerCn: 'assignments/thermo-hw13-answer-cn.pdf',
    answerJp: 'assignments/thermo-hw13-answer-jp.pdf'
  },
  {
    no: 14,
    unit: '电磁学',
    title: '电磁学1：电场与电位',
    date: '2026-07-04',
    summary: '库仑定律、电场、电力线、电势、电势能、导体、静电诱导、介电极化。',
    topics: ['电场', '电位', '静电诱导'],
    note: 'course-notes/electromagnetism-01.pdf',
    video: 'https://meeting.tencent.com/crm/KEJbnWDO03',
    homework: 'assignments/electromagnetism-hw14.pdf',
    answerCn: 'assignments/electromagnetism-hw14-answer-cn.pdf',
    answerJp: 'assignments/electromagnetism-hw14-answer-jp.pdf'
  },
  {
    no: 15,
    unit: '电磁学',
    title: '电磁学2：电位、电容器',
    date: '2026-07-09',
    summary: '电位、电势能、等势面、电容器、电容器连接与静电能。',
    topics: ['电位', '电容器', '静电能'],
    note: 'course-notes/electromagnetism-02.pdf',
    video: 'https://meeting.tencent.com/crm/KnnDOnJn7e',
    homework: 'assignments/electromagnetism-hw15.pdf',
    answerJp: 'assignments/electromagnetism-hw15-answer-jp.pdf'
  },
  {
    no: 16,
    unit: '电磁学',
    title: '电磁学3：电容器',
    date: '2026-07-11',
    summary: '电容器的基本关系、串并联、静电能以及电容器相关综合题。',
    topics: ['电容器', '串并联', '静电能'],
    note: 'course-notes/electromagnetism-03.pdf',
    video: 'https://meeting.tencent.com/crm/2Vbj8Pe4ce',
    homework: 'assignments/electromagnetism-hw16.pdf',
    answerJp: 'assignments/electromagnetism-hw16-answer-jp.pdf'
  },
  {
    no: 17,
    unit: '电磁学',
    title: '电磁学4：电路、半导体、磁场',
    date: '2026-07-16',
    summary: '复杂电路、半导体基础，以及磁场、磁通密度和电流受力的入门。',
    topics: ['复杂电路', '半导体', '磁场'],
    note: 'course-notes/electromagnetism-04.pdf',
    video: 'https://meeting.tencent.com/crm/l5ZaybpV12',
    homework: 'assignments/electromagnetism-hw17.pdf',
    answerJp: 'assignments/electromagnetism-hw17-answer-jp.pdf'
  },
  {
    no: 18,
    unit: '电磁学',
    title: '电磁学5：电流与磁场、洛伦兹力',
    date: '2026-07-18',
    summary: '电流产生的磁场、磁通密度、安培力、洛伦兹力以及带电粒子在电磁场中的运动。',
    topics: ['电流与磁场', '洛伦兹力', '带电粒子运动'],
    note: 'course-notes/electromagnetism-05.pdf',
    video: 'https://meeting.tencent.com/crm/NgnJ8m9648',
    homework: 'assignments/electromagnetism-hw18.pdf',
    answerJp: 'assignments/electromagnetism-hw18-answer-jp.pdf'
  },
  {
    no: 19,
    unit: '电磁学',
    title: '电磁学6：电磁感应',
    date: '2026-07-23',
    summary: '电磁感应、楞次定律、导体棒切割磁感线以及感应电动势的基本关系。',
    topics: ['电磁感应', '楞次定律', '导体棒'],
    note: 'course-notes/electromagnetism-06.pdf',
    video: 'https://meeting.tencent.com/crm/2Zy5MbEG44',
    homework: 'assignments/electromagnetism-hw19.pdf',
    answerCn: 'assignments/electromagnetism-hw19-answer-cn.pdf',
    answerJp: 'assignments/electromagnetism-hw19-answer-jp.pdf'
  },
  {
    no: 20,
    unit: '原子',
    title: '原子结构、原子核与核反应',
    summary: '原子模型、能级、光谱、原子核、放射线、半衰期、核反应、核能和基本粒子。',
    topics: ['原子模型', '放射线', '核反应']
  }
];

let savedConfig = null;
try {
  savedConfig = JSON.parse(localStorage.getItem('physicsSiteConfig') || 'null');
} catch (error) {
  localStorage.removeItem('physicsSiteConfig');
}

const canUseSavedConfig = savedConfig?.version === defaultConfigVersion;
const siteText = canUseSavedConfig ? savedConfig.siteText : { ...defaultSiteText };
let courses = canUseSavedConfig ? savedConfig.courses : defaultCourses;

const resourceLabels = [
  ['note', '板书', true],
  ['video', '录播', false],
  ['homework', '作业', false],
  ['answerCn', '中文答案', false],
  ['answerJp', '日文答案', false]
];

const courseGrid = document.getElementById('courseGrid');
const searchInput = document.getElementById('searchInput');
const unitFilter = document.getElementById('unitFilter');
const emptyState = document.getElementById('emptyState');

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function applySiteText() {
  const strip = document.getElementById('updateStripText');
  const title = document.getElementById('noticeTitle');
  const text = document.getElementById('noticeText');
  if (strip) strip.textContent = siteText.updateStrip || defaultSiteText.updateStrip;
  if (title) title.textContent = siteText.noticeTitle || defaultSiteText.noticeTitle;
  if (text) text.textContent = siteText.noticeText || defaultSiteText.noticeText;
}

function renderCourses() {
  if (!courseGrid) return;
  const keyword = (searchInput?.value || '').trim().toLowerCase();
  const unit = unitFilter?.value || 'all';
  const filtered = courses.filter((course) => {
    const haystack = [course.no, course.unit, course.title, course.summary, ...(course.topics || [])].join(' ').toLowerCase();
    const unitMatch = unit === 'all' || String(course.unit).includes(unit);
    return unitMatch && (!keyword || haystack.includes(keyword));
  });

  courseGrid.innerHTML = filtered.map((course) => {
    const buttons = resourceLabels.map(([key, label, primary]) => {
      const href = course[key];
      const className = `resource-btn ${primary ? 'primary ' : ''}${href ? 'available' : 'disabled'}`;
      return href
        ? `<a class="${className}" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : `<span class="${className}" aria-disabled="true">${label}待上传</span>`;
    }).join('');

    const topics = (course.topics || []).map((topic) => `<span class="topic">${escapeHtml(topic)}</span>`).join('');
    const date = course.date ? `更新 ${escapeHtml(course.date)}` : '资料继续更新中';
    return `
      <article class="lesson-row">
        <div class="lesson-index"><strong>${String(course.no).padStart(2, '0')}</strong><span>${escapeHtml(course.unit)}</span></div>
        <div class="lesson-copy">
          <h5>第${course.no}讲｜${escapeHtml(course.title)}</h5>
          <p>${escapeHtml(course.summary)}</p>
          <span class="lesson-date">${date}</span>
        </div>
        <div class="lesson-topics">${topics}</div>
        <div class="resource-buttons">${buttons}</div>
      </article>`;
  }).join('');

  if (emptyState) emptyState.style.display = filtered.length ? 'none' : 'block';
}

searchInput?.addEventListener('input', renderCourses);
unitFilter?.addEventListener('change', renderCourses);
applySiteText();
renderCourses();

const progressBar = document.querySelector('.scroll-progress span');
function updateScrollProgress() {
  if (!progressBar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  progressBar.style.transform = `scaleX(${ratio})`;
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

const devFields = {
  updateStrip: document.getElementById('devUpdateStrip'),
  noticeTitle: document.getElementById('devNoticeTitle'),
  noticeText: document.getElementById('devNoticeText')
};

function fillDevPanel() {
  Object.entries(devFields).forEach(([key, input]) => {
    if (input) input.value = siteText[key] || '';
  });
  const json = document.getElementById('devCoursesJson');
  if (json) json.value = JSON.stringify(courses, null, 2);
}

function openDevMode() {
  document.body.classList.add('dev-mode');
  localStorage.setItem('physicsSiteDev', 'true');
  fillDevPanel();
}

function closeDevMode() {
  document.body.classList.remove('dev-mode');
  localStorage.removeItem('physicsSiteDev');
}

function saveDevConfig() {
  Object.entries(devFields).forEach(([key, input]) => {
    if (input) siteText[key] = input.value;
  });
  const json = document.getElementById('devCoursesJson');
  if (json) courses = JSON.parse(json.value);
  localStorage.setItem('physicsSiteConfig', JSON.stringify({ version: defaultConfigVersion, siteText, courses }));
  applySiteText();
  renderCourses();
  fillDevPanel();
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function suggestUploadPath(file) {
  const name = file.name.toLowerCase();
  if (name.includes('notice')) return `notices/${file.name}`;
  if (name.includes('answer') || name.includes('hw')) return `assignments/${file.name}`;
  if (name.includes('mechanics') || name.includes('wave') || name.includes('thermo') || name.includes('electro') || name.includes('note')) return `course-notes/${file.name}`;
  if (file.type.startsWith('image/')) return `assets/images/${file.name}`;
  return `resources/${file.name}`;
}

document.getElementById('devCloseBtn')?.addEventListener('click', closeDevMode);
document.getElementById('devApplyBtn')?.addEventListener('click', () => {
  try { saveDevConfig(); } catch (error) { alert(`课程 JSON 格式有误：${error.message}`); }
});
document.getElementById('devExportBtn')?.addEventListener('click', () => {
  downloadText('physics-site-config.json', JSON.stringify({ version: defaultConfigVersion, siteText, courses }, null, 2));
});
document.getElementById('devImportBtn')?.addEventListener('click', () => document.getElementById('devImportFile')?.click());
document.getElementById('devImportFile')?.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const config = JSON.parse(reader.result);
      localStorage.setItem('physicsSiteConfig', JSON.stringify(config));
      location.reload();
    } catch (error) { alert(`导入失败：${error.message}`); }
  };
  reader.readAsText(file);
});
document.getElementById('devResetBtn')?.addEventListener('click', () => {
  localStorage.removeItem('physicsSiteConfig');
  location.reload();
});
document.getElementById('devFileInput')?.addEventListener('change', (event) => {
  const files = Array.from(event.target.files);
  const list = document.getElementById('devFileList');
  if (list) list.innerHTML = files.length
    ? files.map((file) => `<div>${escapeHtml(file.name)} → 建议放入 <code>${escapeHtml(suggestUploadPath(file))}</code></div>`).join('')
    : '尚未选择文件。';
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'd') {
    event.preventDefault();
    openDevMode();
  }
});

if (new URLSearchParams(window.location.search).get('dev') === 'tabito' || localStorage.getItem('physicsSiteDev') === 'true') {
  openDevMode();
}
