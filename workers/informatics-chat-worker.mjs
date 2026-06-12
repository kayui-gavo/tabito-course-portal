const MAX_QUESTION_LENGTH = 500;
const MAX_CONTEXT_LENGTH = 12000;

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(data, status = 200, env = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(env),
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

function extractOutputText(data) {
  if (data.output_text) return data.output_text;
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.text) parts.push(content.text);
    }
  }
  return parts.join('\n').trim();
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(env) });
    const url = new URL(request.url);
    if (request.method !== 'POST' || !['/chat', '/api/informatics-chat'].includes(url.pathname)) {
      return json({ error: 'Not found' }, 404, env);
    }

    if (!env.OPENAI_API_KEY) return json({ error: 'AI接続が未設定です。' }, 503, env);

    const body = await request.json().catch(() => ({}));
    const question = String(body.question || '').trim().slice(0, MAX_QUESTION_LENGTH);
    const context = String(body.context || '').trim().slice(0, MAX_CONTEXT_LENGTH);
    const pageTitle = String(body.pageTitle || '').trim().slice(0, 120);
    const pagePath = String(body.pagePath || '').trim().slice(0, 200);

    if (!question) return json({ error: '質問を入力してください。' }, 400, env);

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || 'gpt-5.2',
        max_output_tokens: 700,
        instructions: [
          'あなたは旅人教育の情報Ⅰ講座を補助する日本語の学習サポーターです。',
          '高校生が理解できるように、短く、やさしく、段階的に説明してください。',
          '回答は原則として渡された教材コンテキストと情報Ⅰの範囲に限定してください。',
          '範囲外、個人情報、学校や生徒の特定につながる内容、宿題の丸写し依頼には慎重に対応してください。',
          '計算やプログラム読解では、途中の考え方を示し、最後に短いまとめを書いてください。',
          '日本語で回答してください。'
        ].join('\n'),
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: [
                  `現在のページ: ${pageTitle}`,
                  `パス: ${pagePath}`,
                  '教材コンテキスト:',
                  context || '該当する教材コンテキストはありません。',
                  '',
                  `生徒の質問: ${question}`
                ].join('\n')
              }
            ]
          }
        ]
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) return json({ error: data.error?.message || 'AI回答を作れませんでした。' }, response.status, env);
    return json({ answer: extractOutputText(data) || 'すみません。回答を作れませんでした。' }, 200, env);
  }
};
