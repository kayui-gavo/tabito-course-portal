const SOURCE_LECTURES = [
  {
    no: 1,
    title: '情報社会と問題解決',
    focus: '情報社会の成り立ちから、情報・メディア、知的財産権、個人情報、情報セキュリティ、問題解決までをまとめて学ぶ。',
    terms: ['情報社会', 'メディア', '知的財産権', '個人情報', '情報セキュリティ', 'PDCA'],
    parts: [
      '社会の進展と情報技術',
      '情報とメディア',
      '知的財産権',
      '個人情報とプライバシー',
      '情報セキュリティ',
      '問題の発見と解決'
    ],
    links: [
      ['情報とメディア', 'lessons/information.html'],
      ['メディアリテラシー', 'lessons/media-literacy.html'],
      ['知的財産権', 'lessons/intellectual-property.html'],
      ['個人情報とプライバシー', 'lessons/privacy.html'],
      ['情報セキュリティ', 'lessons/security.html'],
      ['問題の発見と解決', 'lessons/problem-solving-flow.html']
    ]
  },
  {
    no: 2,
    title: 'メディアとコミュニケーション',
    focus: 'コミュニケーション手段の変化と、インターネット上で情報をやり取りするときの特徴を学ぶ。',
    terms: ['コミュニケーション', '同期・非同期', 'マスメディア', 'ソーシャルメディア', '偽情報', '誤情報'],
    parts: [
      'コミュニケーション手段の変化と影響',
      'インターネットとコミュニケーション'
    ],
    links: [
      ['メディアリテラシー', 'lessons/media-literacy.html'],
      ['情報とメディア', 'lessons/information.html']
    ]
  },
  {
    no: 3,
    title: '情報のデジタル化',
    focus: '2進法を出発点に、文字・音・画像・動画がどのようにデジタル表現され、圧縮されるかを学ぶ。',
    terms: ['2進法', '16進法', '標本化', '量子化', 'RGB', 'fps', '圧縮'],
    parts: [
      'デジタル化と2進法',
      '2進法による表現と計算',
      '文字のデジタル表現と16進法',
      '音のデジタル表現',
      '画像のデジタル化と光の三原色',
      'デジタル画像の構成と色の三原色',
      '動画のデジタル表現と圧縮技術',
      '【発展】ファイルの種類と拡張子，圧縮と解凍'
    ],
    links: [
      ['ビットとバイト', 'lessons/bit-byte.html'],
      ['2進数', 'lessons/binary.html'],
      ['文字のデジタル表現', 'lessons/text-digital.html'],
      ['16進数', 'lessons/hexadecimal.html'],
      ['音のデジタル表現', 'lessons/sound-digital.html'],
      ['画像のデジタル化', 'lessons/image-digital.html'],
      ['データ形式と圧縮', 'lessons/data-format.html']
    ]
  },
  {
    no: 4,
    title: '情報デザイン',
    focus: '情報を分かりやすく伝えるための情報デザイン、機能と論理のデザイン、ユニバーサルデザインを学ぶ。',
    terms: ['情報デザイン', '機能', '論理', 'バリアフリー', 'ユニバーサルデザイン', 'Webページ'],
    parts: [
      '情報デザイン',
      '機能と論理のデザイン',
      'バリアフリーとユニバーサルデザイン',
      '【発展】Webページと情報デザイン'
    ],
    links: [
      ['情報デザイン', 'lessons/information-design.html'],
      ['情報の可視化', 'lessons/visualization.html']
    ]
  },
  {
    no: 5,
    title: 'ハードウェアとソフトウェア',
    focus: '五大装置、CPU・メモリ・ストレージ、ソフトウェア、論理回路、補数と計算誤差を学ぶ。',
    terms: ['五大装置', 'CPU', 'メモリ', 'ストレージ', 'OS', '論理回路', '補数'],
    parts: [
      'コンピュータの構成要素',
      'ソフトウェア',
      '演算の仕組みと論理回路',
      '【発展】補数の計算',
      '【発展】コンピュータの限界'
    ],
    links: [
      ['コンピュータの構成要素', 'lessons/computer-structure.html'],
      ['入力・処理・出力', 'lessons/input-process-output.html']
    ]
  },
  {
    no: 6,
    title: 'アルゴリズムとプログラミング',
    focus: 'アルゴリズムの表現から、変数・分岐・反復・配列・関数、モジュール、外部データの利用までを学ぶ。',
    terms: ['アルゴリズム', '変数', 'for文', 'if文', '配列', '関数', 'Web API'],
    parts: [
      'アルゴリズムの表現方法',
      'プログラミングの基本',
      'ネットワークを利用したプログラミング',
      '変数の型と関数',
      'モジュールとfor文・if文',
      '配列と反復処理',
      '論理演算子と関数',
      '【発展】Web APIや外部データの活用'
    ],
    links: [
      ['アルゴリズム', 'lessons/algorithm.html'],
      ['フローチャート', 'lessons/flowchart.html'],
      ['疑似コード', 'lessons/pseudocode.html'],
      ['変数', 'lessons/variable.html'],
      ['条件分岐', 'lessons/branch.html'],
      ['繰り返し', 'lessons/loop.html'],
      ['配列', 'lessons/array.html'],
      ['関数', 'lessons/function.html'],
      ['Web API', 'lessons/api.html']
    ]
  },
  {
    no: 7,
    title: 'モデル化とシミュレーション',
    focus: '現実の現象をモデル化し、プログラミングや表計算を使ってシミュレーションする方法を学ぶ。',
    terms: ['モデル化', 'シミュレーション', '乱数', 'Python', '表計算', 'グラフ'],
    parts: [
      'モデル化とシミュレーション',
      'シミュレーション（プログラミング）',
      'シミュレーション（表計算）'
    ],
    links: [
      ['モデル化とシミュレーション', 'lessons/simulation.html'],
      ['乱数', 'lessons/random.html'],
      ['確定的モデルと確率的モデル', 'lessons/deterministic-random-model.html']
    ]
  },
  {
    no: 8,
    title: '情報通信ネットワーク',
    focus: 'ネットワーク、プロトコル、WWWとメール、暗号化、デジタル署名、情報システムとデータベースを学ぶ。',
    terms: ['ネットワーク', 'プロトコル', 'WWW', 'メール', '暗号化', 'デジタル署名', 'データベース'],
    parts: [
      'ネットワーク',
      'プロトコル',
      'WWWとメール',
      '情報セキュリティ',
      '暗号化とデジタル署名',
      '情報システムとデータベース',
      'データベース管理システム'
    ],
    links: [
      ['ネットワーク', 'lessons/network-build.html'],
      ['パケット', 'lessons/packet.html'],
      ['IPアドレス', 'lessons/ip-address.html'],
      ['プロトコル', 'lessons/protocol.html'],
      ['暗号化とデジタル署名', 'lessons/encryption-signature.html'],
      ['データベース', 'lessons/database.html']
    ]
  },
  {
    no: 9,
    title: 'データの活用',
    focus: 'データを収集・整理し、代表値や散布図などを用いて分析し、結果を適切に解釈する方法を学ぶ。',
    terms: ['データ収集', '代表値', '分散', '標準偏差', '箱ひげ図', '散布図', '相関'],
    parts: [
      'データの収集と整理',
      'データの分析',
      'データの解釈1',
      'データの解釈2'
    ],
    links: [
      ['質的データと量的データ', 'lessons/qualitative-data.html'],
      ['代表値・分散・標準偏差', 'lessons/statistics.html'],
      ['外れ値と代表値', 'lessons/outlier-representative.html'],
      ['散布図と相関', 'lessons/scatter-correlation.html'],
      ['情報の可視化', 'lessons/visualization.html']
    ]
  }
];

const PROGRAMMING_LEVELS_SOURCE = [
  {
    id: 'beginner',
    name: '初級編',
    lead: 'プログラミングを0から学ぶための基礎知識。',
    lessons: [
      'print関数', '四則演算', '累乗・商・余り', '比較演算子', '配列', '乱数', 'len関数',
      'range関数', 'for文', 'if文', 'if-else文', 'if-elif-else文', 'while文', '論理演算子'
    ]
  },
  {
    id: 'intermediate',
    name: '中級編',
    lead: '基礎知識を組み合わせて、少し複雑な処理を読み書きする。',
    lessons: [
      '関数', '配列と乱数', '2次元配列', 'inputとrandom.choice', '引数が配列の関数',
      '1からnまでの和', '○以上○以下の判定', '2つの数字の並べ替え', '合計と平均',
      'for文の入れ子', 'for文とif文の入れ子', '最大値と最小値', 'カウントダウン',
      'while文とif文の入れ子', '10進法から2進法への変換', 'ソート（並べ替え）',
      '配列への要素の追加', '2次元配列の応用', '辞書型'
    ]
  },
  {
    id: 'advanced',
    name: '上級編',
    lead: '複数の視点を組み合わせ、構造の複雑な問題をプログラムに落とし込む。',
    lessons: [
      'コインの枚数', '駐車料金の判定', '割引のある料金', 'テストの集計', 'じゃんけん',
      'サイコロの出目', '中央値の判定', '素数判定', '素因数分解', '倍数の判定・FizzBuzz',
      'バブルソート・選択ソート', 'グラフ理論', '待ち行列', 'パリティチェック', 'すごろくゲーム'
    ]
  }
];

const PROGRAMMING_RELATED_PAGES = [
  ['アルゴリズム', 'lessons/algorithm.html'],
  ['変数', 'lessons/variable.html'],
  ['代入', 'lessons/assignment.html'],
  ['条件分岐', 'lessons/branch.html'],
  ['繰り返し', 'lessons/loop.html'],
  ['配列', 'lessons/array.html'],
  ['関数', 'lessons/function.html'],
  ['最大値・最小値', 'lessons/max-min.html'],
  ['選択ソート', 'lessons/selection-sort.html'],
  ['バブルソート', 'lessons/bubble-sort.html'],
  ['デバッグ', 'lessons/debug.html']
];

function sourceCourseEscapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function sourceLectureCard(lecture) {
  const searchable = [lecture.title, lecture.focus, ...lecture.terms, ...lecture.parts].join(' ');
  return `<article class="source-lecture" id="lecture-${lecture.no}" data-search="${sourceCourseEscapeHtml(searchable)}">
    <div class="source-lecture-head">
      <div class="source-lecture-no"><span>LECTURE</span><strong>${String(lecture.no).padStart(2, '0')}</strong></div>
      <div class="source-lecture-title">
        <p class="source-kicker">第${lecture.no}講</p>
        <h3>${sourceCourseEscapeHtml(lecture.title)}</h3>
        <p>${sourceCourseEscapeHtml(lecture.focus)}</p>
      </div>
    </div>
    <div class="source-term-row">${lecture.terms.map(term => `<span>${sourceCourseEscapeHtml(term)}</span>`).join('')}</div>
    <details class="source-parts">
      <summary>PART構成 <span>${lecture.parts.length} PART</span></summary>
      <ol>${lecture.parts.map((part, index) => `<li><span>PART${index + 1}</span>${sourceCourseEscapeHtml(part)}</li>`).join('')}</ol>
    </details>
    ${lecture.links.length ? `<div class="source-related"><span class="source-related-label">関連する学習ページ</span><div>${lecture.links.map(([label, href]) => `<a href="${href}">${sourceCourseEscapeHtml(label)}</a>`).join('')}</div></div>` : ''}
  </article>`;
}

function sourceProgrammingGroups({ compact = false } = {}) {
  let start = 1;
  const html = PROGRAMMING_LEVELS_SOURCE.map(level => {
    const first = start;
    const last = start + level.lessons.length - 1;
    start = last + 1;
    return `<section class="programming-level source-level-${level.id}">
      <div class="programming-level-head">
        <div><p class="source-kicker">${first}–${last}</p><h3>${level.name}</h3></div>
        <span>${level.lessons.length}講</span>
      </div>
      <p class="programming-level-lead">${sourceCourseEscapeHtml(level.lead)}</p>
      <ol start="${first}" class="programming-syllabus ${compact ? 'is-compact' : ''}">
        ${level.lessons.map(title => `<li>${sourceCourseEscapeHtml(title)}</li>`).join('')}
      </ol>
    </section>`;
  }).join('');
  return `<div class="programming-level-grid">${html}</div>`;
}

function initSourceCourseFilter() {
  const input = document.querySelector('#sourceCourseSearch');
  const cards = [...document.querySelectorAll('.source-lecture')];
  const result = document.querySelector('#sourceCourseResult');
  if (!input || !cards.length) return;
  const apply = () => {
    const query = input.value.trim().toLocaleLowerCase('ja');
    let visible = 0;
    cards.forEach(card => {
      const text = (card.dataset.search || '').toLocaleLowerCase('ja');
      const show = !query || text.includes(query);
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (result) result.textContent = query ? `${visible}講を表示` : '全9講を表示';
  };
  input.addEventListener('input', apply);
  apply();
}

window.renderTop = function renderSourceAlignedTop() {
  renderChrome('');
  document.querySelector('#app').innerHTML = `<main class="page source-page">
    <section class="source-hero">
      <div class="source-hero-copy">
        <p class="eyebrow">共通テスト対応・情報Ⅰ</p>
        <h1>情報Ⅰ 学習ライブラリ</h1>
        <p class="source-hero-lead">本編9講とプログラミング編48講を、提供教材の学習順序に沿って整理しました。授業後に要点を戻って確認し、対応する学習ページへすぐ移れます。</p>
        <div class="source-hero-actions">
          <a class="source-primary-link" href="#lecture-1">第1講から学ぶ</a>
          <a href="programming.html">プログラミング48講</a>
          <a href="exam.html">共通テスト対策</a>
        </div>
      </div>
      <div class="source-metrics" aria-label="教材構成">
        <div><strong>9</strong><span>本編</span></div>
        <div><strong>47</strong><span>PART</span></div>
        <div><strong>48</strong><span>プログラミング講</span></div>
      </div>
    </section>

    <section class="source-study-flow" aria-labelledby="study-flow-title">
      <div class="source-section-heading">
        <div><p class="source-kicker">STUDY FLOW</p><h2 id="study-flow-title">教材と同じ学習の流れ</h2></div>
        <p>予習は基本不要。授業で学び、確認問題で復習する流れです。</p>
      </div>
      <div class="source-flow-line">
        <div><b>01</b><strong>要点整理</strong><span>基本知識と重要事項を確認</span></div>
        <i aria-hidden="true">→</i>
        <div><b>02</b><strong>実践問題</strong><span>学んだ内容を問題で使う</span></div>
        <i aria-hidden="true">→</i>
        <div><b>03</b><strong>確認</strong><span>自分で解いて定着を確認</span></div>
      </div>
    </section>

    <section class="source-curriculum" aria-labelledby="curriculum-title">
      <div class="source-section-heading source-heading-with-search">
        <div><p class="source-kicker">9 LECTURES / 47 PARTS</p><h2 id="curriculum-title">本編の学習目次</h2></div>
        <label class="source-search"><span>講・用語を探す</span><input id="sourceCourseSearch" type="search" placeholder="例：著作権、2進法、相関" autocomplete="off" /><small id="sourceCourseResult">全9講を表示</small></label>
      </div>
      <div class="source-lecture-grid">${SOURCE_LECTURES.map(sourceLectureCard).join('')}</div>
    </section>

    <section class="source-programming-preview" aria-labelledby="programming-preview-title">
      <div class="source-section-heading">
        <div><p class="source-kicker">PYTHON / 48 LESSONS</p><h2 id="programming-preview-title">プログラミング編</h2></div>
        <p>初級14講・中級19講・上級15講。教材の48講をそのまま一覧化しています。</p>
      </div>
      ${sourceProgrammingGroups({ compact: true })}
      <div class="source-section-actions"><a class="source-primary-link" href="programming.html">プログラミング編を開く</a></div>
    </section>

    <aside class="source-policy">
      <strong>教材準拠</strong>
      <p>このページの講・PART名と学習項目は、提供された「情報Ⅰ」本編および「プログラミング編」の構成・用語に合わせて整理しています。</p>
    </aside>
  </main>`;
  initSourceCourseFilter();
};

window.renderProgramming = function renderSourceAlignedProgramming() {
  renderChrome('');
  document.querySelector('#app').innerHTML = `<main class="page source-page">
    <p class="breadcrumb"><a href="index.html">情報Ⅰ 学習ライブラリ</a> / プログラミング編</p>
    <section class="source-hero source-hero-programming">
      <div class="source-hero-copy">
        <p class="eyebrow">高1・高2・高3 情報Ⅰ</p>
        <h1>プログラミング編 48講</h1>
        <p class="source-hero-lead">Pythonを使い、基本的な命令から、複数の処理を組み合わせる問題、長めの問題をプログラムに落とし込む練習まで段階的に進みます。</p>
        <div class="source-hero-actions">
          <a class="source-primary-link" href="#programming-syllabus">48講の目次を見る</a>
          <a href="index.html#lecture-6">本編 第6講へ戻る</a>
        </div>
      </div>
      <div class="source-metrics" aria-label="プログラミング編構成">
        <div><strong>14</strong><span>初級</span></div>
        <div><strong>19</strong><span>中級</span></div>
        <div><strong>15</strong><span>上級</span></div>
      </div>
    </section>

    <section class="source-study-flow">
      <div class="source-section-heading">
        <div><p class="source-kicker">HOW TO STUDY</p><h2>段階の使い分け</h2></div>
        <p>初級は0から、中級・上級はまず例題を解いてから学ぶ構成です。</p>
      </div>
      <div class="source-level-guide">
        <div><span>初級</span><p>基本的な命令文と制御構文を身につける。</p></div>
        <div><span>中級</span><p>複数の基礎知識を組み合わせて処理を組み立てる。</p></div>
        <div><span>上級</span><p>条件を整理し、構造の複雑な問題をプログラムに落とし込む。</p></div>
      </div>
    </section>

    <section id="programming-syllabus" class="source-programming-full">
      <div class="source-section-heading">
        <div><p class="source-kicker">SYLLABUS</p><h2>全48講</h2></div>
        <p>講題は提供教材の目次に合わせています。</p>
      </div>
      ${sourceProgrammingGroups()}
    </section>

    <section class="source-related-pages">
      <div class="source-section-heading">
        <div><p class="source-kicker">DETAILED PAGES</p><h2>関連する詳説ページ</h2></div>
        <p>現在のライブラリで開ける、プログラミング分野の詳説ページです。</p>
      </div>
      <div class="source-link-index">${PROGRAMMING_RELATED_PAGES.map(([label, href]) => `<a href="${href}">${sourceCourseEscapeHtml(label)}</a>`).join('')}</div>
    </section>

    <aside class="source-policy">
      <strong>教材準拠</strong>
      <p>48講の区分・講題は、提供された「情報Ⅰ＜プログラミング編＞」の初級・中級・上級の構成に合わせています。</p>
    </aside>
  </main>`;
};
