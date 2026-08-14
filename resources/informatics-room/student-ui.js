(() => {
  const body = document.body;
  body.classList.add('student-learning-ui');

  const PAGE_KEY = 'tabito-informatics-progress-v2';

  function readProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(PAGE_KEY) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch (_) {
      return {};
    }
  }

  function writeProgress(progress) {
    try { localStorage.setItem(PAGE_KEY, JSON.stringify(progress)); } catch (_) {}
  }

  function lessonLinks() {
    return [...document.querySelectorAll('a[href*="lessons/"]')]
      .filter(a => !a.getAttribute('href').startsWith('#'));
  }

  function normalizeHref(href) {
    try {
      const url = new URL(href, window.location.href);
      return url.pathname.replace(/.*\/resources\/informatics-room\//, '');
    } catch (_) {
      return href;
    }
  }

  function registerLearningClicks() {
    lessonLinks().forEach(link => {
      link.addEventListener('click', () => {
        const progress = readProgress();
        const href = normalizeHref(link.getAttribute('href'));
        progress[href] = {
          title: link.textContent.trim(),
          href,
          visitedAt: Date.now()
        };
        progress.__last = href;
        writeProgress(progress);
      });
    });
  }

  function uniqueAvailableLessons() {
    const seen = new Map();
    lessonLinks().forEach(link => {
      const href = normalizeHref(link.getAttribute('href'));
      if (!href || seen.has(href)) return;
      seen.set(href, {
        href,
        title: link.textContent.trim() || href
      });
    });
    return [...seen.values()];
  }

  function dashboard() {
    const hero = document.querySelector('.source-hero');
    if (!hero || document.querySelector('.learn-dashboard')) return;

    const available = uniqueAvailableLessons();
    const progress = readProgress();
    const completed = available.filter(item => progress[item.href]).length;
    const percent = available.length ? Math.round(completed / available.length * 100) : 0;
    const lastHref = progress.__last;
    const last = lastHref && progress[lastHref] ? progress[lastHref] : null;
    const first = available[0];
    const resume = last || first;

    const section = document.createElement('section');
    section.className = 'learn-dashboard';
    section.setAttribute('aria-label', '学習ナビゲーション');
    section.innerHTML = `
      <div class="learn-dashboard-main">
        <p class="learn-dashboard-label">LEARNING NAVIGATOR</p>
        <h2>${last ? '前回の続きから学ぶ' : 'ここから学習を始める'}</h2>
        <p>${last ? `前回開いた「${escapeHtml(last.title)}」から再開できます。` : '初めて学ぶ場合は第1講から。気になる単元から始めても構いません。'}</p>
        <div class="learn-dashboard-actions">
          ${resume ? `<a class="source-primary-link" href="${escapeAttribute(resume.href)}">${last ? '学習を続ける' : '第1講から始める'}</a>` : ''}
          <a href="#curriculum-title">学習目次を見る</a>
        </div>
      </div>
      <div class="learn-dashboard-side">
        <div class="learn-progress-row"><strong>閲覧した詳説</strong><span>${completed} / ${available.length}</span></div>
        <div class="learn-progress-track" aria-label="学習進捗 ${percent}%"><div class="learn-progress-bar" style="width:${percent}%"></div></div>
        <p>この端末で開いた詳説ページを記録します。成績評価ではなく、自習の目安です。</p>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
  }

  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = String(value || '');
    return div.innerHTML;
  }

  function escapeAttribute(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  }

  function lectureNumber(element, index) {
    const match = element.id && element.id.match(/lecture-(\d+)/);
    return match ? Number(match[1]) : index + 1;
  }

  function enhanceLectures() {
    const lectureNodes = [...document.querySelectorAll('[id^="lecture-"]')]
      .filter(node => /^lecture-\d+$/.test(node.id));

    lectureNodes.forEach((lecture, index) => {
      const no = lectureNumber(lecture, index);
      lecture.dataset.learnNo = String(no).padStart(2, '0');
      if (lecture.querySelector('.learn-lecture-toggle')) return;

      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'learn-lecture-toggle';
      toggle.textContent = no === 1 ? '内容を閉じる' : '内容を見る';
      toggle.setAttribute('aria-expanded', no === 1 ? 'true' : 'false');
      toggle.setAttribute('aria-controls', lecture.id);

      if (no !== 1) lecture.classList.add('learn-collapsed');
      toggle.addEventListener('click', () => {
        const collapsed = lecture.classList.toggle('learn-collapsed');
        toggle.textContent = collapsed ? '内容を見る' : '内容を閉じる';
        toggle.setAttribute('aria-expanded', String(!collapsed));
        if (!collapsed && window.innerWidth < 760) {
          setTimeout(() => lecture.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20);
        }
      });
      lecture.appendChild(toggle);
    });
  }

  function enhanceProgramming() {
    const syllabus = document.querySelector('#programming-syllabus');
    if (!syllabus || document.querySelector('.learn-level-nav')) return;

    const groups = [...syllabus.querySelectorAll('.source-programming-group')];
    if (!groups.length) return;

    const nav = document.createElement('nav');
    nav.className = 'learn-level-nav';
    nav.setAttribute('aria-label', '難易度を選ぶ');

    const names = ['初級編', '中級編', '上級編'];
    groups.forEach((group, i) => {
      if (!group.id) group.id = `programming-level-${i + 1}`;
      const heading = group.querySelector('h2, h3, strong');
      const label = heading ? heading.textContent.trim() : names[i] || `レベル${i + 1}`;
      const link = document.createElement('a');
      link.href = `#${group.id}`;
      link.textContent = label;
      nav.appendChild(link);
    });
    syllabus.insertAdjacentElement('beforebegin', nav);
  }

  function shortenHeroCopy() {
    const hero = document.querySelector('.source-hero');
    if (!hero) return;
    const lead = hero.querySelector('.source-hero-lead');
    if (!lead) return;
    const isProgramming = document.querySelector('#programming-syllabus');
    if (isProgramming) {
      lead.textContent = '基礎命令から、複数の処理を組み合わせる問題、長い問題文をプログラムへ落とし込む練習まで。自分の段階に合ったところから始められます。';
    } else {
      lead.textContent = '情報Ⅰを初めて学ぶ人のための自習ライブラリ。教材の9講・47PARTに沿って、理解 → 問題演習 → 確認の順で学べます。';
    }
  }

  function improveStudyFlowCopy() {
    const flow = document.querySelector('.source-study-flow');
    if (!flow) return;
    const heading = flow.querySelector('h2');
    if (heading && heading.textContent.includes('教材と同じ')) heading.textContent = '1つのPARTをこう学ぶ';
    const description = flow.querySelector('.source-section-heading > p');
    if (description && !document.querySelector('#programming-syllabus')) {
      description.textContent = '読むだけで終わらず、「理解する → 使う → 自力で確認する」を1セットにします。';
    }
  }

  function addSearchShortcut() {
    const search = document.querySelector('#sourceCourseSearch');
    if (!search) return;
    document.addEventListener('keydown', event => {
      if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        event.preventDefault();
        search.focus();
      }
    });
    search.setAttribute('aria-keyshortcuts', '/');
    search.placeholder = '用語・講を検索　/';
  }

  function init() {
    shortenHeroCopy();
    improveStudyFlowCopy();
    registerLearningClicks();
    dashboard();
    enhanceLectures();
    enhanceProgramming();
    addSearchShortcut();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
