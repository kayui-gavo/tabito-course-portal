(() => {
  document.body.classList.add('student-learning-ui');

  const COLLAPSE_KEY = 'tabito-info-open-groups-v1';

  function readOpenGroups() {
    try { return JSON.parse(localStorage.getItem(COLLAPSE_KEY) || '{}'); }
    catch (_) { return {}; }
  }
  function saveOpenGroups(value) {
    try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(value)); } catch (_) {}
  }

  function enhanceCurriculum() {
    const list = document.querySelector('.curriculum-list');
    if (!list) return;

    const groups = [...list.querySelectorAll('.curriculum-lecture')];
    if (!groups.length) return;

    const pageKey = location.pathname.includes('programming') ? 'programming' : 'main';
    const stored = readOpenGroups();
    const storedForPage = stored[pageKey] || [];
    const firstIncomplete = list.querySelector('.curriculum-row:not(.is-done)')?.closest('.curriculum-lecture');

    groups.forEach((group, index) => {
      const heading = group.querySelector('.lecture-heading');
      const rows = [...group.querySelectorAll('.curriculum-row')];
      if (!heading || !rows.length) return;

      if (rows.every(row => row.classList.contains('is-done'))) group.classList.add('is-complete');

      const groupId = `${pageKey}-${index}`;
      group.dataset.groupId = groupId;
      const shouldOpen = storedForPage.length
        ? storedForPage.includes(groupId)
        : group === firstIncomplete || (!firstIncomplete && index === 0);
      group.classList.toggle('is-collapsed', !shouldOpen);

      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'lecture-toggle';
      toggle.textContent = '⌄';
      toggle.setAttribute('aria-label', 'この範囲を開閉');
      toggle.setAttribute('aria-expanded', String(shouldOpen));
      heading.appendChild(toggle);

      const setOpen = (open, persist = true) => {
        group.classList.toggle('is-collapsed', !open);
        toggle.setAttribute('aria-expanded', String(open));
        if (!persist) return;
        const state = readOpenGroups();
        const openIds = groups
          .filter(item => !item.classList.contains('is-collapsed'))
          .map(item => item.dataset.groupId);
        state[pageKey] = openIds;
        saveOpenGroups(state);
      };

      heading.addEventListener('click', event => {
        if (event.target.closest('a')) return;
        setOpen(group.classList.contains('is-collapsed'));
      });
      toggle.addEventListener('click', event => event.stopPropagation());
      toggle.addEventListener('click', () => setOpen(group.classList.contains('is-collapsed')));
    });

    const search = document.querySelector('#curriculumSearch');
    if (search) {
      search.setAttribute('aria-keyshortcuts', '/');
      search.addEventListener('input', () => {
        const searching = search.value.trim().length > 0;
        groups.forEach(group => {
          if (searching && !group.hidden) group.classList.remove('is-collapsed');
        });
      });
      document.addEventListener('keydown', event => {
        if (event.key !== '/' || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) return;
        event.preventDefault();
        search.focus();
      });
    }
  }

  function enhanceSidebar() {
    const sidebar = document.querySelector('.lesson-sidebar');
    if (!sidebar) return;

    [...sidebar.querySelectorAll('.sidebar-group')].forEach(group => {
      const title = group.querySelector('.sidebar-group-title');
      const hasCurrent = !!group.querySelector('.sidebar-link.is-current');
      if (!title) return;
      group.classList.toggle('is-collapsed', !hasCurrent);
      title.setAttribute('role', 'button');
      title.setAttribute('tabindex', '0');
      title.setAttribute('aria-expanded', String(hasCurrent));
      const toggle = () => {
        const collapsed = group.classList.toggle('is-collapsed');
        title.setAttribute('aria-expanded', String(!collapsed));
      };
      title.addEventListener('click', toggle);
      title.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle();
        }
      });
    });

    const current = sidebar.querySelector('.sidebar-link.is-current');
    if (current) setTimeout(() => current.scrollIntoView({ block: 'center' }), 20);
  }

  function labelOf(section) {
    return section.querySelector('.lesson-section-label')?.textContent.trim().toUpperCase() || '';
  }

  function enhanceLessonRoute() {
    const paper = document.querySelector('.lesson-paper');
    if (!paper) return;

    const sections = [...paper.querySelectorAll('.lesson-section')];
    const key = sections.find(s => labelOf(s) === 'KEY POINTS');
    const example = sections.find(s => labelOf(s) === 'EXAMPLE');
    const check = sections.find(s => labelOf(s) === 'CHECK');
    const complete = paper.querySelector('.lesson-complete');

    if (key) key.id = key.id || 'learn-keypoints';
    if (example) example.id = example.id || 'learn-example';
    if (check) check.id = check.id || 'check';
    if (complete) complete.id = 'learn-complete';

    const route = document.createElement('nav');
    route.className = 'lesson-route';
    route.setAttribute('aria-label', 'このページの学習順序');
    const items = [
      [key, 'learn-keypoints', '1', '要点'],
      [example, 'learn-example', '2', example ? '例を追う' : '要点確認'],
      [check, 'check', '3', '1問解く'],
      [complete, 'learn-complete', '4', '完了']
    ];
    route.innerHTML = items.map(([element, id, no, text]) => {
      const fallback = element ? id : (key ? 'learn-keypoints' : 'learn-complete');
      return `<a href="#${fallback}"><b>${no}</b><span>${text}</span></a>`;
    }).join('');

    const goals = paper.querySelector('.lesson-goals');
    (goals || paper.querySelector('.lesson-lead'))?.insertAdjacentElement('afterend', route);
  }

  function enhanceQuizRetry() {
    const quiz = document.querySelector('.quiz-box');
    if (!quiz) return;
    const feedback = quiz.querySelector('.quiz-feedback');
    if (!feedback) return;

    const observer = new MutationObserver(() => {
      if (!feedback.classList.contains('is-visible')) return;
      if (!quiz.querySelector('.quiz-choice.is-wrong')) return;
      if (feedback.querySelector('.quiz-retry')) return;

      const retry = document.createElement('button');
      retry.type = 'button';
      retry.className = 'quiz-retry';
      retry.textContent = 'もう一度解く';
      retry.style.cssText = 'margin-top:10px;padding:7px 10px;border:1px solid #cbd8df;border-radius:7px;background:#fff;color:#31566f;font:inherit;font-size:11px;font-weight:700;';
      feedback.append(document.createElement('br'), retry);
      retry.addEventListener('click', () => {
        quiz.querySelectorAll('.quiz-choice').forEach(button => {
          button.disabled = false;
          button.classList.remove('is-correct', 'is-wrong');
        });
        feedback.classList.remove('is-visible');
        feedback.textContent = '';
      });
    });
    observer.observe(feedback, { childList: true, subtree: true, attributes: true });
  }

  function readingProgress() {
    const paper = document.querySelector('.lesson-paper');
    if (!paper) return;
    const bar = document.createElement('div');
    bar.className = 'lesson-reading-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<i></i>';
    document.body.appendChild(bar);
    const fill = bar.querySelector('i');
    const update = () => {
      const rect = paper.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const total = Math.max(1, paper.offsetHeight - window.innerHeight * .65);
      const value = Math.min(1, Math.max(0, (window.scrollY - start + 80) / total));
      fill.style.width = `${Math.round(value * 100)}%`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  function reviseStudentFacingCopy() {
    const homeTitle = document.querySelector('.index-intro:not(.compact) h1');
    const homeLead = document.querySelector('.index-intro:not(.compact) .index-lead');
    if (homeTitle) homeTitle.textContent = '情報Ⅰを、わかる順番で。';
    if (homeLead) homeLead.textContent = '初めて学ぶ人も、もう一度整理したい人も。教材の9講・47PARTに沿って、要点を理解し、例で確かめ、最後に自分で1問解くところまで進めます。';

    const guide = document.querySelector('.study-guide:not(.programming-guide)');
    if (guide) {
      const strong = guide.querySelector('strong');
      const spans = guide.querySelectorAll('span');
      if (strong) strong.textContent = '1 PART の学び方';
      const copy = ['目標を確認', '要点を理解', '1問で確認', '学習済みにする'];
      spans.forEach((span, i) => { if (copy[i]) span.textContent = copy[i]; });
    }

    const programTitle = document.querySelector('.index-intro.compact h1');
    if (programTitle) programTitle.textContent = 'プログラムは、手で追うとわかる。';
  }

  function init() {
    document.body.classList.add('student-learning-ui');
    reviseStudentFacingCopy();
    enhanceCurriculum();
    enhanceSidebar();
    enhanceLessonRoute();
    enhanceQuizRetry();
    readingProgress();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
