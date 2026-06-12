const PYODIDE_INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
const OUTPUT_LIMIT = 5000;

importScripts(`${PYODIDE_INDEX_URL}pyodide.js`);

let pyodideReady = loadPyodide({ indexURL: PYODIDE_INDEX_URL })
  .then((runtime) => {
    self.postMessage({ type: 'ready' });
    return runtime;
  })
  .catch((error) => {
    self.postMessage({ type: 'load-error', error: error.message || String(error) });
    throw error;
  });

const runnerCode = String.raw`
import builtins
import contextlib
import io
import json
import traceback

exercise = json.loads(EXERCISE_JSON)
user_code = USER_CODE
blocked_modules = {
    "socket", "ssl", "urllib", "http", "requests", "ftplib",
    "subprocess", "multiprocessing", "os", "pathlib", "shutil",
    "js", "pyodide", "pyodide_js", "micropip"
}

if not hasattr(builtins, "_lesson_original_import"):
    builtins._lesson_original_import = builtins.__import__
real_import = builtins._lesson_original_import

def safe_import(name, globals=None, locals=None, fromlist=(), level=0):
    top_level = name.split(".")[0]
    if top_level in blocked_modules:
        raise ImportError("この練習ではネットワークやファイルに関係する機能は使えません。")
    return real_import(name, globals, locals, fromlist, level)

def blocked_open(*args, **kwargs):
    raise PermissionError("この練習ではファイルを開くことはできません。")

builtins.__import__ = safe_import
builtins.open = blocked_open

def normalize_output(text):
    text = str(text).replace("\r\n", "\n").replace("\r", "\n")
    lines = [line.rstrip() for line in text.split("\n")]
    return "\n".join(lines).rstrip()

def safe_repr(value):
    try:
        return repr(value)
    except Exception:
        return str(type(value))

stdout_buffer = io.StringIO()
stderr_buffer = io.StringIO()
namespace = {"__name__": "__main__", "__builtins__": builtins}
result = {
    "status": "ok",
    "passed": False,
    "stdout": "",
    "stderr": "",
    "error": "",
    "tests": [],
    "message": ""
}

try:
    with contextlib.redirect_stdout(stdout_buffer), contextlib.redirect_stderr(stderr_buffer):
        exec(user_code, namespace)

    if exercise.get("mode") == "function":
        tests = exercise.get("tests") or []
        passed_all = True
        for test in tests:
            function_name = test.get("functionName")
            function = namespace.get(function_name)
            if not callable(function):
                actual = f"{function_name} が見つかりません"
                passed = False
            else:
                try:
                    actual_value = function(*(test.get("args") or []))
                    expected_value = test.get("expectedReturn")
                    passed = actual_value == expected_value
                    actual = safe_repr(actual_value)
                except Exception:
                    passed = False
                    actual = traceback.format_exc(limit=4)
            expected = safe_repr(test.get("expectedReturn"))
            passed_all = passed_all and passed
            result["tests"].append({
                "name": test.get("name") or "確認",
                "passed": passed,
                "expected": expected,
                "actual": actual
            })
        result["passed"] = passed_all
        if not passed_all:
            result["message"] = "もう一度確認してみましょう"
    else:
        actual_output = normalize_output(stdout_buffer.getvalue())
        expected_output = normalize_output(exercise.get("expectedOutput") or "")
        result["passed"] = actual_output == expected_output
        if not result["passed"]:
            result["message"] = "出力が期待と異なります"
            result["tests"].append({
                "name": "出力の確認",
                "passed": False,
                "expected": expected_output,
                "actual": actual_output
            })
        else:
            result["tests"].append({
                "name": "出力の確認",
                "passed": True,
                "expected": expected_output,
                "actual": actual_output
            })
except Exception:
    result["status"] = "error"
    result["passed"] = False
    result["error"] = traceback.format_exc(limit=6)

result["stdout"] = stdout_buffer.getvalue()
result["stderr"] = stderr_buffer.getvalue()
json.dumps(result, ensure_ascii=False)
`;

function limitText(value) {
  const text = String(value || '');
  if (text.length <= OUTPUT_LIMIT) return { text, truncated: false };
  return { text: text.slice(0, OUTPUT_LIMIT), truncated: true };
}

self.addEventListener('message', async (event) => {
  const message = event.data || {};
  if (message.type !== 'run') return;
  try {
    const runtime = await pyodideReady;
    runtime.globals.set('USER_CODE', message.code || '');
    runtime.globals.set('EXERCISE_JSON', JSON.stringify(message.exercise || {}));
    const start = performance.now();
    const resultJson = await runtime.runPythonAsync(runnerCode);
    const runtimeMs = Math.round(performance.now() - start);
    const result = JSON.parse(resultJson);
    const stdout = limitText(result.stdout);
    const stderr = limitText(result.stderr || result.error);
    result.stdout = stdout.text;
    result.stderr = stderr.text;
    result.runtimeMs = runtimeMs;
    result.truncated = stdout.truncated || stderr.truncated;
    self.postMessage({ type: 'result', id: message.id, result });
  } catch (error) {
    self.postMessage({
      type: 'run-error',
      id: message.id,
      error: error.message || String(error)
    });
  }
});
