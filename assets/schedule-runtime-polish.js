(() => {
  'use strict';

  const OLD_NAME = '金老师';
  const NEW_NAME = '金龙熙';

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

  let queued = false;
  function queuePolish() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      polishTeacherNames(document);
    });
  }

  polishTeacherNames(document);
  new MutationObserver(queuePolish).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-teacher', 'hidden']
  });
})();
