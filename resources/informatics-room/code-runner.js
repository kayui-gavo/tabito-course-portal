const PYTHON_RUN_TIMEOUT_MS = 3000;

const codeRunnerScriptUrl = document.currentScript ? document.currentScript.src : window.location.href;
const pythonWorkerUrl = new URL('python-worker.js', codeRunnerScriptUrl).href;

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderCodeExercise(lessonId) {
  const exercise = window.CODE_EXERCISES ? window.CODE_EXERCISES[lessonId] : null;
  if (!exercise) return '';
  const hints = exercise.hints && exercise.hints.length
    ? `<details class="exercise-details"><summary>ヒント</summary><ul>${exercise.hints.map(hint => `<li>${escapeHtml(hint)}</li>`).join('')}</ul></details>`
    : '';
  const solution = exercise.solutionCode
    ? `<details class="exercise-details"><summary>解答例</summary><pre class="code-block">${escapeHtml(exercise.solutionCode)}</pre>${exercise.explanation ? `<p>${escapeHtml(exercise.explanation)}</p>` : ''}</details>`
    : '';

  return `<section class="code-exercise" data-lesson-id="${lessonId}">
    <div class="exercise-head">
      <p class="eyebrow">コード練習</p>
      <h2>${escapeHtml(exercise.title)}</h2>
    </div>
    <p>${escapeHtml(exercise.description)}</p>
    <p class="note">ここまでの考え方を使って、実際に Python のコードを書いてみましょう。最初は空欄を少し埋めるだけで大丈夫です。</p>
    <label class="editor-label" for="exercise-editor-${lessonId}">Pythonコード</label>
    <textarea id="exercise-editor-${lessonId}" class="code-editor" spellcheck="false">${escapeHtml(exercise.initialCode)}</textarea>
    <div class="exercise-actions">
      <button type="button" class="run-code">実行する</button>
      <button type="button" class="reset-code secondary-button">最初のコードに戻す</button>
      <span class="runtime-label" aria-live="polite">実行時間：-- ms</span>
    </div>
    <div class="exercise-message" aria-live="polite"></div>
    <div class="result-grid">
      <section class="result-panel">
        <h3>標準出力</h3>
        <pre class="result-output stdout">(まだ実行していません)</pre>
      </section>
      <section class="result-panel">
        <h3>エラー</h3>
        <pre class="result-output stderr">(エラーはありません)</pre>
      </section>
    </div>
    <section class="judgment-panel">
      <h3>判定</h3>
      <div class="judgment-text">コードを書いて、実行してみましょう。</div>
      <div class="test-results"></div>
      <p class="small-note">実行時間はブラウザ上で測ったおおよその目安です。</p>
    </section>
    ${hints}
    ${solution}
  </section>`;
}

class PythonExerciseClient {
  constructor() {
    this.worker = null;
    this.readyPromise = null;
    this.pending = new Map();
    this.nextId = 1;
  }

  ensureWorker() {
    if (this.worker && this.readyPromise) return this.readyPromise;
    this.worker = new Worker(pythonWorkerUrl);
    this.readyPromise = new Promise((resolve, reject) => {
      this.worker.addEventListener('message', (event) => {
        const message = event.data || {};
        if (message.type === 'ready') {
          resolve();
          return;
        }
        if (message.type === 'load-error') {
          reject(new Error(message.error || '実行環境を準備できませんでした。'));
          this.disposeWorker();
          return;
        }
        if (message.type === 'result') {
          const pending = this.pending.get(message.id);
          if (!pending) return;
          clearTimeout(pending.timer);
          this.pending.delete(message.id);
          pending.resolve(message.result);
        }
        if (message.type === 'run-error') {
          const pending = this.pending.get(message.id);
          if (!pending) return;
          clearTimeout(pending.timer);
          this.pending.delete(message.id);
          pending.reject(new Error(message.error || 'エラーが発生しました。'));
        }
      });
      this.worker.addEventListener('error', () => {
        reject(new Error('実行環境を準備できませんでした。'));
        for (const pending of this.pending.values()) {
          clearTimeout(pending.timer);
          pending.reject(new Error('エラーが発生しました。'));
        }
        this.pending.clear();
        this.disposeWorker();
      });
    });
    return this.readyPromise;
  }

  disposeWorker() {
    if (this.worker) this.worker.terminate();
    this.worker = null;
    this.readyPromise = null;
  }

  async run(exercise, code) {
    await this.ensureWorker();
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        this.disposeWorker();
        reject(new Error('実行時間が長すぎたため、処理を停止しました。無限ループになっていないか確認しましょう。'));
      }, PYTHON_RUN_TIMEOUT_MS);
      this.pending.set(id, { resolve, reject, timer });
      this.worker.postMessage({ type: 'run', id, exercise, code });
    });
  }
}

const pythonExerciseClient = new PythonExerciseClient();

function textOrPlaceholder(value, placeholder) {
  return value && value.length ? value : placeholder;
}

function renderTestResults(results) {
  if (!results || !results.length) return '';
  return `<ul class="test-list">${results.map(result => {
    const status = result.passed ? '正解' : 'もう一度確認';
    const detail = result.passed
      ? '期待した結果になりました。'
      : `期待：${escapeHtml(result.expected)} / 実際：${escapeHtml(result.actual)}`;
    return `<li class="${result.passed ? 'test-pass' : 'test-check'}"><strong>${escapeHtml(result.name)}：${status}</strong><span>${detail}</span></li>`;
  }).join('')}</ul>`;
}

function updateResult(container, result) {
  container.querySelector('.stdout').textContent = textOrPlaceholder(result.stdout, '(出力はありません)');
  container.querySelector('.stderr').textContent = textOrPlaceholder(result.stderr || result.error, '(エラーはありません)');
  container.querySelector('.runtime-label').textContent = `実行時間：${result.runtimeMs} ms`;
  const judgment = container.querySelector('.judgment-text');
  const message = container.querySelector('.exercise-message');
  container.classList.remove('exercise-correct', 'exercise-check');

  if (result.truncated) {
    message.textContent = '出力が長すぎるため、一部だけ表示しています。';
  } else {
    message.textContent = '';
  }

  if (result.status === 'error') {
    container.classList.add('exercise-check');
    judgment.textContent = 'エラーが発生しました';
  } else if (result.passed) {
    container.classList.add('exercise-correct');
    judgment.textContent = result.tests && result.tests.length
      ? 'すべての確認を通過しました'
      : '正解です。期待した出力になりました。';
  } else {
    container.classList.add('exercise-check');
    judgment.textContent = result.message || 'もう一度確認してみましょう';
  }

  container.querySelector('.test-results').innerHTML = renderTestResults(result.tests);
}

function initCodeExercise(lessonId) {
  const exercise = window.CODE_EXERCISES ? window.CODE_EXERCISES[lessonId] : null;
  const container = document.querySelector(`.code-exercise[data-lesson-id="${lessonId}"]`);
  if (!exercise || !container) return;

  const editor = container.querySelector('.code-editor');
  const runButton = container.querySelector('.run-code');
  const resetButton = container.querySelector('.reset-code');
  const message = container.querySelector('.exercise-message');

  editor.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = `${editor.value.slice(0, start)}    ${editor.value.slice(end)}`;
    editor.selectionStart = editor.selectionEnd = start + 4;
  });

  resetButton.addEventListener('click', () => {
    editor.value = exercise.initialCode;
    container.querySelector('.stdout').textContent = '(まだ実行していません)';
    container.querySelector('.stderr').textContent = '(エラーはありません)';
    container.querySelector('.runtime-label').textContent = '実行時間：-- ms';
    container.querySelector('.judgment-text').textContent = 'コードを書いて、実行してみましょう。';
    container.querySelector('.test-results').innerHTML = '';
    message.textContent = '';
    container.classList.remove('exercise-correct', 'exercise-check');
  });

  runButton.addEventListener('click', async () => {
    runButton.disabled = true;
    runButton.textContent = '実行中...';
    message.textContent = '実行環境を準備しています。少し時間がかかることがあります。';
    try {
      await pythonExerciseClient.ensureWorker();
      message.textContent = '実行環境の準備ができました。コードを実行しています。';
      const result = await pythonExerciseClient.run(exercise, editor.value);
      updateResult(container, result);
    } catch (error) {
      updateResult(container, {
        status: 'error',
        passed: false,
        stdout: '',
        stderr: error.message,
        error: error.message,
        runtimeMs: 0,
        tests: []
      });
    } finally {
      runButton.disabled = false;
      runButton.textContent = '実行する';
    }
  });
}
