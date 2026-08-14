/* 確認問題のフィードバックを、同じPARTの教材準拠本文へ結び付ける。 */
(() => {
  const baseBindQuiz = window.bindQuiz;
  const compact = value => String(value || '').replace(/[\s（）()「」『』・／/：:、。]/g, '').toLowerCase();

  window.bindQuiz = function bindElectronicQuiz(root, lesson) {
    if (!lesson || lesson.track !== 'main') return baseBindQuiz(root, lesson);
    const box = root.querySelector('.quiz-box');
    if (!box) return;
    const feedback = box.querySelector('.quiz-feedback');
    const buttons = [...box.querySelectorAll('.quiz-choice')];
    const q = lesson.quiz;
    const answerLabel = q.choices[q.answer];
    const key = compact(answerLabel);
    const related = (lesson.points || []).find(point => {
      const text = compact(`${point.title} ${point.body}`);
      return key.length > 1 && (text.includes(key) || key.includes(compact(point.title)));
    });

    buttons.forEach(btn => btn.addEventListener('click', () => {
      if (buttons.some(x => x.disabled)) return;
      const choice = Number(btn.dataset.choice);
      buttons.forEach(x => x.disabled = true);
      buttons[q.answer].classList.add('is-correct');
      if (choice !== q.answer) btn.classList.add('is-wrong');

      const result = choice === q.answer ? '正解です。' : `正解は「${answerLabel}」です。`;
      const detail = related?.body || q.explanation || '';
      feedback.textContent = `${result}${detail ? ` ${detail}` : ''}`;
      feedback.classList.add('is-visible');
    }));
  };
})();
