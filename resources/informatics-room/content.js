const SITE = {
  title: 'わかりやすい高校情報Ⅰの部屋',
  subtitle: '旅人教育 情報Ⅰノート',
  description: '公式教材の章立てに沿って、情報Ⅰの基礎を図と例でゆっくり学ぶ教材です。'
};

const STATUS_LABELS = {
  enhanced: '図解・疑似コード・Pythonあり',
  complete: '完成',
  draft: '初稿',
  stub: '準備中',
  planned: '予定'
};

const FEATURED_LESSONS = [
  'algorithm',
  'variable',
  'branch',
  'loop',
  'array',
  'linear-search',
  'binary-search',
  'selection-sort',
  'bubble-sort'
];

const LESSON_ORDER = [
  'information',
  'bit-byte',
  'binary',
  'image-digital',
  'sound-digital',
  'algorithm',
  'input-process-output',
  'variable',
  'assignment',
  'branch',
  'loop',
  'array',
  'counter-sum',
  'max-min',
  'linear-search',
  'binary-search',
  'sort-intro',
  'selection-sort',
  'bubble-sort',
  'flowchart',
  'pseudocode',
  'debug',
  'simulation',
  'packet',
  'ip-address',
  'database',
  'statistics'
];

const OFFICIAL_CHAPTERS = [
  {
    id: 'social',
    order: 1,
    title: '第1章　情報社会の問題解決',
    sourceTitle: '高等学校情報科「情報Ⅰ」教員研修用教材 第1章　情報社会の問題解決',
    sourceNote: '本単元の学習内容、学習1〜5の構成を参照し、本文は独自に再構成しています。',
    lead: '情報・メディアの特性、情報セキュリティ、法規・モラル、情報社会の変化を、問題解決の流れと結び付けて学びます。',
    sections: [
      {
        id: 'social-problem',
        title: '問題の発見と情報の扱い',
        lessons: [
          { id: 'information', title: '情報やメディアの特性と問題の発見・解決', href: 'lessons/information.html', status: 'draft' },
          { id: 'problem-solving-flow', title: '問題解決の流れ', href: '#', status: 'planned' }
        ]
      },
      {
        id: 'social-rules',
        title: '安全・責任・社会との関わり',
        lessons: [
          { id: 'security', title: '情報セキュリティ', href: '#', status: 'planned' },
          { id: 'law-moral', title: '情報に関する法規、情報モラル', href: '#', status: 'planned' },
          { id: 'communication-merit', title: '情報社会におけるコミュニケーションのメリット・デメリット', href: '#', status: 'planned' },
          { id: 'technology-development', title: '情報技術の発展', href: '#', status: 'planned' }
        ]
      }
    ]
  },
  {
    id: 'design',
    order: 2,
    title: '第2章　コミュニケーションと情報デザイン',
    sourceTitle: '高等学校情報科「情報Ⅰ」教員研修用教材 第2章　コミュニケーションと情報デザイン',
    sourceNote: '学習6〜10の順序を参照し、ディジタル化と情報デザインの基本を配置しています。',
    lead: 'ディジタル化、メディア、コミュニケーション、情報デザインの考え方を学びます。',
    sections: [
      {
        id: 'digital',
        title: 'デジタルにするということ',
        lessons: [
          { id: 'bit-byte', title: 'ビットとバイト', href: 'lessons/bit-byte.html', status: 'draft' },
          { id: 'binary', title: '2進数', href: 'lessons/binary.html', status: 'draft' },
          { id: 'image-digital', title: '画像のディジタル化', href: 'lessons/image-digital.html', status: 'draft' },
          { id: 'sound-digital', title: '音のディジタル化', href: 'lessons/sound-digital.html', status: 'draft' }
        ]
      },
      {
        id: 'communication-design',
        title: 'コミュニケーションと情報デザイン',
        lessons: [
          { id: 'communication-model', title: 'コミュニケーションを成立させるもの', href: '#', status: 'planned' },
          { id: 'media-tools', title: 'メディアとコミュニケーション、そのツール', href: '#', status: 'planned' },
          { id: 'design-meaning', title: '情報をデザインすることの意味', href: '#', status: 'planned' },
          { id: 'design-process', title: 'デザインするための一連の進め方', href: '#', status: 'planned' }
        ]
      }
    ]
  },
  {
    id: 'programming',
    order: 3,
    title: '第3章　コンピュータとプログラミング',
    sourceTitle: '高等学校情報科「情報Ⅰ」教員研修用教材 第3章　コンピュータとプログラミング',
    sourceNote: '学習11〜17の順序を参照し、現在は基本的プログラムとアルゴリズムの比較を重点的に整備しています。',
    lead: 'コンピュータの仕組み、外部装置、基本的・応用的プログラム、アルゴリズムの比較、モデル化とシミュレーションを学びます。',
    sections: [
      {
        id: 'computer-basics',
        title: 'コンピュータの仕組み',
        lessons: [
          { id: 'computer-structure', title: 'コンピュータの仕組み', href: '#', status: 'planned' },
          { id: 'input-process-output', title: '入力・処理・出力', href: 'lessons/input-process-output.html', status: 'complete' }
        ]
      },
      {
        id: 'external-device',
        title: '外部装置との接続',
        lessons: [
          { id: 'external-devices', title: '外部装置との接続', href: '#', status: 'planned' }
        ]
      },
      {
        id: 'basic-program',
        title: '基本的プログラム',
        lessons: [
          { id: 'algorithm', title: 'アルゴリズムとは', href: 'lessons/algorithm.html', status: 'enhanced' },
          { id: 'flowchart', title: 'フローチャート', href: 'lessons/flowchart.html', status: 'complete' },
          { id: 'pseudocode', title: '疑似コード', href: 'lessons/pseudocode.html', status: 'complete' },
          { id: 'variable', title: '変数', href: 'lessons/variable.html', status: 'enhanced' },
          { id: 'assignment', title: '代入', href: 'lessons/assignment.html', status: 'complete' },
          { id: 'branch', title: '条件分岐', href: 'lessons/branch.html', status: 'enhanced' },
          { id: 'loop', title: '繰り返し', href: 'lessons/loop.html', status: 'enhanced' },
          { id: 'debug', title: 'プログラムの誤りとデバッグ', href: 'lessons/debug.html', status: 'complete' }
        ]
      },
      {
        id: 'applied-program',
        title: '応用的プログラム',
        lessons: [
          { id: 'array', title: '配列', href: 'lessons/array.html', status: 'enhanced' },
          { id: 'counter-sum', title: 'カウンタと合計', href: 'lessons/counter-sum.html', status: 'enhanced' },
          { id: 'max-min', title: '最大値・最小値を求める', href: 'lessons/max-min.html', status: 'complete' }
        ]
      },
      {
        id: 'algorithm-comparison',
        title: 'アルゴリズムの比較',
        lessons: [
          { id: 'linear-search', title: '線形探索', href: 'lessons/linear-search.html', status: 'enhanced' },
          { id: 'binary-search', title: '二分探索', href: 'lessons/binary-search.html', status: 'enhanced' },
          { id: 'sort-intro', title: '並べ替えとは', href: 'lessons/sort-intro.html', status: 'complete' },
          { id: 'selection-sort', title: '選択ソート', href: 'lessons/selection-sort.html', status: 'enhanced' },
          { id: 'bubble-sort', title: 'バブルソート', href: 'lessons/bubble-sort.html', status: 'enhanced' }
        ]
      },
      {
        id: 'model-simulation',
        title: 'モデル化とシミュレーション',
        lessons: [
          { id: 'simulation', title: 'シミュレーションとは', href: 'lessons/simulation.html', status: 'complete' },
          { id: 'deterministic-random-model', title: '確定モデルと確率モデル', href: '#', status: 'planned' },
          { id: 'natural-modeling', title: '自然現象のモデル化とシミュレーション', href: '#', status: 'planned' }
        ]
      }
    ]
  },
  {
    id: 'network',
    order: 4,
    title: '第4章　情報通信ネットワークとデータの活用',
    sourceTitle: '高等学校情報科「情報Ⅰ」教員研修用教材 第4章　情報通信ネットワークとデータの活用',
    sourceNote: '学習18〜24の順序を参照し、ネットワークとデータ活用の基礎を配置しています。',
    lead: 'ネットワークの仕組み、情報システム、データの形式、量的・質的データの分析、可視化を学びます。',
    sections: [
      {
        id: 'network-basics',
        title: '情報通信ネットワーク',
        lessons: [
          { id: 'packet', title: 'パケット通信', href: 'lessons/packet.html', status: 'draft' },
          { id: 'ip-address', title: 'IPアドレス', href: 'lessons/ip-address.html', status: 'draft' },
          { id: 'network-build', title: '情報通信ネットワークの構築', href: '#', status: 'planned' }
        ]
      },
      {
        id: 'system-data',
        title: '情報システムとデータ活用',
        lessons: [
          { id: 'database', title: 'データベースとは', href: 'lessons/database.html', status: 'draft' },
          { id: 'data-format', title: 'さまざまな形式のデータとその表現形式', href: '#', status: 'planned' },
          { id: 'statistics', title: '平均値・中央値・最頻値', href: 'lessons/statistics.html', status: 'draft' },
          { id: 'qualitative-data', title: '質的データの分析', href: '#', status: 'planned' },
          { id: 'visualization', title: 'データの形式と可視化', href: '#', status: 'planned' }
        ]
      }
    ]
  }
];

const CHAPTERS = OFFICIAL_CHAPTERS;

function L(id, title, figure, oneLine, example, explanation, misconception, question, answer, code = '') {
  return {
    id,
    title,
    chapter: '第3章　コンピュータとプログラミング',
    sourceChapter: '情報Ⅰ (3) コンピュータとプログラミング',
    figure,
    oneLine,
    example,
    explanation,
    misconception,
    question,
    answer,
    code,
    status: 'enhanced',
    terms: []
  };
}

const LESSONS = {
  algorithm: L(
    'algorithm',
    'アルゴリズムとは',
    'algorithmPath',
    'アルゴリズムとは、問題を解くための手順のことです。',
    '料理のレシピを考えてみましょう。「卵を割る」「混ぜる」「焼く」の順番を変えると、同じ材料でも結果が変わります。駅までの道案内や、自動販売機がお金を受け取って商品を出す流れも、手順として考えることができます。',
    '情報Ⅰで大切なのは、コンピュータは「なんとなくよい感じにやる」ことができない、という点です。人間なら空気を読んで省略できることでも、コンピュータには一つずつ順番に指示する必要があります。アルゴリズムは、その指示を考える前段階です。同じ目的でも、手順が分かりやすいもの、速いもの、間違いにくいものがあります。たとえばカードを小さい順に並べるとき、全部を見比べて最小を選ぶ方法もあれば、隣同士を比べて少しずつ入れ替える方法もあります。どちらも「並べる」という目的は同じですが、手順や効率は違います。',
    '「アルゴリズム = プログラム」ではありません。プログラムは、アルゴリズムをコンピュータが実行できる言葉で書いたものです。まず手順を考え、そのあとでプログラムにします。',
    '料理のレシピがアルゴリズムの例と言える理由を、1文で説明しなさい。',
    '目的を達成するための手順が順番に書かれているからです。',
    `目的：カードを小さい順に並べる\n手順：\n1. まだ並んでいないカードを見る\n2. いちばん小さいカードを選ぶ\n3. 左から順に置く\n4. 残りがなくなるまで続ける`
  ),
  'input-process-output': L(
    'input-process-output',
    '入力・処理・出力',
    'inputProcessOutput',
    '入力・処理・出力は、コンピュータの働きを三つに分けて見る考え方です。',
    '電卓では、数字と演算記号を押すことが入力です。足し算や掛け算を行うことが処理です。画面に答えが出ることが出力です。検索サイトでは、検索語を入れることが入力、関連するページを探すことが処理、検索結果の一覧が出力です。',
    'プログラムを考えるとき、いきなり細かい命令を書こうとすると混乱します。まず「何を受け取るのか」「それをどう変えるのか」「最後に何を出すのか」に分けると、処理の骨組みが見えます。成績判定なら、入力は点数、処理は80点以上かどうかの判定、出力は「合格」または「再挑戦」です。この三つを分けると、どこで条件分岐が必要か、どの変数を用意すべきかも考えやすくなります。',
    '出力は画面表示だけではありません。ファイルに保存する、音を鳴らす、ロボットを動かす、別のシステムへ送ることも出力です。',
    '自動販売機の入力・処理・出力をそれぞれ答えなさい。',
    '入力はお金や商品ボタン、処理は金額確認と商品選択、出力は商品やおつりです。',
    `入力：点数\n処理：80点以上かどうかを調べる\n出力：合格 / 再挑戦`
  ),
  variable: L(
    'variable',
    '変数',
    'variableBox',
    '変数とは、値を入れておくための名前つきの箱のようなものです。',
    'ゲームの得点を考えます。score という箱に 0 を入れておき、敵を倒したら score の中身を 10 増やします。このとき score は変数です。箱の名前が score、箱の中身が現在の得点です。',
    '変数を使うと、あとから値を取り出したり、書き換えたりできます。プログラムでは、同じ値を何度も使ったり、途中で変化する値を扱ったりする場面が多くあります。たとえば合計点、人数、現在見ている配列の位置、最大値の候補などは、すべて変数として考えることができます。大切なのは、変数名と中に入っている値を分けて考えることです。変数名は箱についたラベルであり、値そのものではありません。',
    '変数名を見ただけで値が決まるわけではありません。score という名前でも、中身が 0 のときもあれば、120 のときもあります。',
    '変数名と値の違いを、箱の例を使って説明しなさい。',
    '変数名は箱のラベルで、値は箱の中に入っている中身です。',
    `score ← 0\nscore ← score + 10\n表示する(score)`
  ),
  assignment: L(
    'assignment',
    '代入',
    'assignmentChange',
    '代入とは、変数に値を入れることです。',
    'x ← 3 と書くと、x という箱の中に 3 を入れる、という意味になります。x ← x + 1 は少し不思議に見えますが、「今の x に 1 を足した値を、もう一度 x に入れる」という意味です。',
    '数学の等号は、左と右が等しいことを表します。しかしプログラムの代入は、右側を先に計算して、その結果を左側の変数に入れる操作です。だから x ← x + 1 は矛盾ではありません。古い x の値を読み取り、1を足し、新しい値で上書きします。カウンタを1増やす、合計に新しい値を足す、最大値候補を更新するなど、代入は多くのアルゴリズムで中心になります。',
    '代入を数学の等号と同じだと思うと、x = x + 1 がありえない式に見えてしまいます。プログラムでは「更新」として考えます。',
    'x が 3 のとき、x ← x + 1 を実行した後の x はいくつですか。',
    '4です。古い x の 3 に 1 を足し、その結果を x に入れ直します。',
    `x ← 3\nx ← x + 1\n表示する(x)  // 4`
  ),
  branch: L(
    'branch',
    '条件分岐',
    'branchFlow',
    '条件分岐とは、条件によって処理の流れを変えるしくみです。',
    '雨が降っていたら傘を持つ。降っていなければ、そのまま出る。これは日常生活の条件分岐です。点数が80点以上なら「合格」、そうでなければ「再挑戦」と表示する処理も同じです。',
    '条件分岐では、まず条件を調べます。条件が成り立つ場合を真、成り立たない場合を偽といいます。if は「もし〜ならば」という意味です。else は「それ以外の場合」です。複数の条件を書くときは、上から順に判定されることに注意します。たとえば「90点以上ならA、80点以上ならB」としたいとき、80点以上の条件を先に書くと、95点もそこで止まってしまいます。',
    '= と == を混同しないことが大切です。多くのプログラミング言語では、= は代入、== は等しいかどうかの比較を表します。',
    '点数が80点以上なら「合格」、そうでなければ「再挑戦」と表示する処理を、言葉で説明しなさい。',
    '点数を調べ、80点以上なら合格と表示し、それ以外なら再挑戦と表示します。',
    `if 点数 >= 80:\n  表示する("合格")\nelse:\n  表示する("再挑戦")`
  ),
  loop: L(
    'loop',
    '繰り返し',
    'loopFlow',
    '繰り返しとは、同じ処理を何度も実行するしくみです。',
    '1から10までの数を足すとき、人間なら式を見てまとめて計算できます。しかしコンピュータには「1を足す」「2を足す」...のように、手順として伝えます。このように、形が同じ処理を何度も行うときに繰り返しを使います。',
    '繰り返しには、回数が決まっているものと、条件を満たすまで続けるものがあります。たとえば「10回くり返す」は回数指定型です。「合計が100を超えるまで続ける」は条件指定型です。繰り返しでは、初期値、続ける条件、更新の三つを必ず確認します。どれか一つでもずれると、1回多い、1回少ない、終わらない、というミスにつながります。',
    '無限ループに注意します。条件がいつまでも真のままだと、処理が終わりません。ループの中で値が変化しているか確認します。',
    '1から5まで足す処理で、合計の初期値を0にする理由を説明しなさい。',
    'まだ何も足していない状態から始めるためです。初期値がずれると最終結果もずれます。',
    `合計 ← 0\ni を 1 から 5 まで 1 ずつ増やす:\n  合計 ← 合計 + i\n表示する(合計)`
  ),
  array: L(
    'array',
    '配列',
    'arrayIndex',
    '配列とは、複数のデータを順番に並べて入れておくしくみです。',
    '5人分の点数を扱うとき、score1, score2, score3 ... と別々の変数を作るより、scores という配列にまとめると扱いやすくなります。scores[0], scores[1] のように、位置を指定して値を取り出します。',
    '配列では、各データの位置をインデックスといいます。ここで注意しなければならないのは、プログラミング言語や問題文によって、最初の位置を0番目と呼ぶ場合と1番目と呼ぶ場合があることです。情報Ⅰの問題では、どちらで数えるかが問題文に示されることがあります。配列を使うと、同じ処理をすべてのデータに順番に行いやすくなります。合計、平均、最大値、探索、整列は、配列と繰り返しを組み合わせて考えることが多いです。',
    'インデックスと値を混同しないようにします。scores[2] の 2 は位置を表し、中に入っている点数そのものではありません。',
    '配列 [60, 75, 90] で、0番目から数えると 1番目の値はいくつですか。',
    '75です。0番目が60、1番目が75、2番目が90です。',
    `点数 ← [60, 75, 90]\n表示する(点数[1])  // 0番目から数えるなら75`
  ),
  'counter-sum': L(
    'counter-sum',
    'カウンタと合計',
    'counterSum',
    'カウンタは数を数える変数、合計は値をためていく変数です。',
    'アンケートで「はい」と答えた人数を数えるとき、条件に合うたびに count を 1 増やします。テスト点の合計を求めるときは、sum に点数を次々と足していきます。',
    'カウンタと合計は、繰り返しと一緒によく使います。最初は count ← 0、sum ← 0 のように初期化します。その後、データを一つずつ見ながら、必要なら count を増やしたり、sum に値を足したりします。これは丸暗記するより、表を使って追いかけるとわかりやすいです。i がどこを見ているのか、count と sum がいつ変わるのかを行ごとに書くと、処理の流れが見えます。',
    '初期値を忘れると、前の計算結果が残っているような状態になります。プログラムでは、使う前に値を決めておくことが大切です。',
    '60点以上の人数を数えるとき、count はいつ増やしますか。',
    '現在見ている点数が60点以上だったときだけ、count を1増やします。',
    `count ← 0\nsum ← 0\n各 点数 について:\n  sum ← sum + 点数\n  もし 点数 >= 60 ならば:\n    count ← count + 1`
  ),
  'max-min': L(
    'max-min',
    '最大値・最小値を求める',
    'maxMinCards',
    '最大値・最小値は、暫定の候補を持ちながら一つずつ比べて求めます。',
    'カードが何枚か並んでいるとします。最初のカードを「今の最大」として持っておき、次のカードを見るたびに、今の最大より大きいかどうかを比べます。大きければ最大を更新します。',
    '最大値を求めるとき、いきなり max ← 0 と置いてよいとは限りません。データがすべて負の数なら、0はデータの中にないのに最大値のようになってしまいます。そこで、最初のデータを暫定最大値にする方法がよく使われます。そのあと配列を先頭から順に見て、より大きい値が見つかれば max を更新します。最小値も同じ考え方で、より小さい値が見つかれば min を更新します。',
    '最初の候補をどう置くかが大切です。データの範囲を勝手に決めつけると、正しくない答えになることがあります。',
    '最大値を求めるとき、最初のデータを max に入れてから始める利点を説明しなさい。',
    'データが負の数だけの場合などでも、実際のデータの中から候補を始められるためです。',
    `max ← データ[0]\ni を 1 から 最後 まで増やす:\n  もし データ[i] > max ならば:\n    max ← データ[i]`
  ),
  'linear-search': L(
    'linear-search',
    '線形探索',
    'linearSearch',
    '線形探索とは、先頭から一つずつ順番に調べる探索方法です。',
    '本棚から目的の本を探すとき、左端から1冊ずつタイトルを見ていく方法を考えます。目的の本が見つかればそこで分かります。最後まで見てもなければ、その本は棚にないと判断します。',
    '線形探索は、とても単純で分かりやすい方法です。データが並んでいなくても使えます。ただし、データが多いと時間がかかります。最初に見つかる場合はすぐ終わりますが、最後にある場合や存在しない場合は、すべてのデータを調べる必要があります。プログラムでは、現在見ている位置、目的の値、見つかったかどうかを表す変数を使って追いかけます。',
    '見つかったあとに続けるか止めるかで、結果が変わることがあります。同じ値が複数ある場合、最初の位置を知りたいのか、最後の位置を知りたいのかを確認します。',
    '線形探索が、並んでいないデータにも使える理由を説明しなさい。',
    '順序を利用せず、先頭から一つずつ直接比べる方法だからです。',
    `見つかった ← 偽\ni を 0 から 最後 まで増やす:\n  もし データ[i] == 目標 ならば:\n    見つかった ← 真`
  ),
  'binary-search': L(
    'binary-search',
    '二分探索',
    'binarySearch',
    '二分探索とは、整列済みのデータで中央を見ながら探索範囲を半分にしていく方法です。',
    '辞書で単語を探すとき、最初のページから1ページずつ見ることはあまりしません。だいたい中央を開き、目的の単語が前にあるか後ろにあるかを判断し、探す範囲を狭めます。二分探索もこの考え方に近いです。',
    '二分探索では、左端 left、右端 right、中央 mid を使います。中央の値が目的と一致すれば見つかります。目的の値が中央より小さければ右半分を捨て、左側だけを探します。大きければ左半分を捨て、右側だけを探します。1回調べるたびに範囲がほぼ半分になるので、データが多いときに強い方法です。ただし、前提としてデータが小さい順などに整列されていなければなりません。',
    '二分探索は、いつでも線形探索よりよいわけではありません。並んでいないデータには、そのまま使えません。まず整列が必要な場合、その手間も考えます。',
    '二分探索を使うために、データにはどんな前提が必要ですか。',
    'データが小さい順など、探索に使える順序で整列されている必要があります。',
    `left ← 0\nright ← 最後\nleft <= right の間:\n  mid ← (left + right) の中央\n  もし データ[mid] == 目標 ならば 見つかった\n  目標 < データ[mid] なら right を mid-1 にする\n  そうでなければ left を mid+1 にする`
  ),
  'sort-intro': L(
    'sort-intro',
    '並べ替えとは',
    'sortIntro',
    '並べ替えとは、データを決められた規則にしたがって順番に並べ直すことです。',
    'テストの点数を高い順に並べる、名前を五十音順に並べる、商品の価格を安い順に並べる、といった場面で並べ替えが使われます。',
    '並べ替えをすると、データを探しやすくなったり、全体の傾向を見やすくなったりします。たとえば点数を小さい順に並べると、中央値が見つけやすくなります。名前順に並べると、名簿から人を探しやすくなります。並べ替えにはいろいろな方法があります。選択ソートは最小値を選んで前に置く方法、バブルソートは隣同士を比べて交換する方法です。情報Ⅰでは、方法を暗記するよりも、比較と交換がどのように行われるかを図や表で追うことが大切です。',
    '一度比べただけで全部がきれいに並ぶわけではありません。多くの並べ替えでは、比較と交換を何度も繰り返します。',
    '並べ替えをすると、なぜデータを探しやすくなることがあるのですか。',
    '順序が決まることで、見るべき範囲を絞ったり、目的の位置を予想したりしやすくなるからです。',
    `並べ替え前：[5, 2, 8, 1]\n小さい順：[1, 2, 5, 8]\n大きい順：[8, 5, 2, 1]`
  ),
  'selection-sort': L(
    'selection-sort',
    '選択ソート',
    'selectionSort',
    '選択ソートは、未整列の部分から最小値を選び、先頭と交換する方法です。',
    'カードが何枚か並んでいるとき、まず全部を見て一番小さいカードを探し、それを一番左に置きます。次に残りのカードから一番小さいものを探し、左から2番目に置きます。',
    '選択ソートでは、左側から順に「ここは確定」と決めていきます。各回で、まだ整列していない部分を全部調べて最小値の位置を見つけます。その最小値を、未整列部分の先頭と交換します。手順は分かりやすいですが、毎回残りを広く探すので、データが多いと比較回数が増えます。',
    '最小値を見つけただけでは整列は終わりません。見つけた最小値を、未整列部分の先頭と交換して、確定範囲を広げます。',
    '選択ソートで、1回目の操作のあと何が確定しますか。',
    '全体の最小値が先頭に置かれ、先頭の位置が確定します。',
    `i を 0 から n-2 まで:\n  minIndex ← i\n  j を i+1 から n-1 まで:\n    もし データ[j] < データ[minIndex] ならば:\n      minIndex ← j\n  データ[i] と データ[minIndex] を交換`
  ),
  'bubble-sort': L(
    'bubble-sort',
    'バブルソート',
    'bubbleSort',
    'バブルソートは、隣同士を比べ、必要なら交換することを繰り返す方法です。',
    '左から順に隣同士を見て、左の方が大きければ交換します。これを右端まで続けると、大きい値が少しずつ右へ移動していきます。泡が上へ浮かぶ様子にたとえて、バブルソートと呼ばれます。',
    'バブルソートでは、1回の通過で最大の値が右端に移動します。しかし、それだけで全体が整列するとは限りません。右端が確定したら、次はその手前までを同じように比べます。比較と交換の様子が見やすいので、並べ替えの基本を理解するのに向いています。一方、データが多い場合は効率がよい方法とは言えません。',
    '一回左から右へ見ただけで全部が整列する、と思い込まないようにします。確定するのは基本的に端の一つずつです。',
    'バブルソートで1回目の通過後、どの値が右端に来ますか。',
    '未整列部分の中で最大の値が右端に来ます。',
    `i を 0 から n-2 まで:\n  j を 0 から n-2-i まで:\n    もし データ[j] > データ[j+1] ならば:\n      データ[j] と データ[j+1] を交換`
  ),
  flowchart: L('flowchart', 'フローチャート', 'flowchartSymbols', 'フローチャートは、処理の流れを図で表す方法です。', '料理の手順を矢印で並べると、どこで判断し、どこへ進むかが見やすくなります。', '開始・終了、処理、判断、入力出力などの記号を使って、アルゴリズムを目で追える形にします。図を書くこと自体が目的ではなく、処理の流れを整理するために使います。', 'きれいな図を作ることに集中しすぎて、条件や処理の意味を見失わないようにします。', '判断を表す記号では何を書くことが多いですか。', 'はい/いいえで分かれる条件を書きます。'),
  pseudocode: L('pseudocode', '疑似コード', 'pseudoCode', '疑似コードは、特定の言語に依存しすぎずに手順を書く方法です。', '日本語の説明と本物のプログラムの中間のような書き方です。', '疑似コードを使うと、細かい文法よりも処理の流れに集中できます。情報Ⅰでは、問題文で独自の書き方が示されることがあります。まず表記の意味を読み取りましょう。', '疑似コードは完全にそのまま実行できるとは限りません。手順を伝えるための表現です。', '疑似コードを使う利点を一つ答えなさい。', '特定のプログラミング言語の細かい文法に縛られず、手順を考えられることです。'),
  debug: L('debug', 'プログラムの誤りとデバッグ', 'debugFlow', 'デバッグとは、プログラムの誤りを見つけて直すことです。', '計算結果が予想と違うとき、どの変数がどこで変わったかを一つずつ確認します。', '誤りには、文法エラーと論理エラーがあります。文法エラーは書き方の間違い、論理エラーは動くけれど考えた通りではない間違いです。小さな入力で試し、途中の値を表示しながら確認します。', '動いたから正しい、とは限りません。たまたま一つの例で合っただけかもしれません。', '論理エラーとは何ですか。', 'プログラムは動くが、考えていた処理や結果になっていない誤りです。'),
  simulation: L('simulation', 'シミュレーションとは', 'simulationModel', 'シミュレーションとは、現実の現象を簡単なモデルでまねることです。', '感染の広がり、店の待ち行列、在庫の増減などを、変数とルールで簡単に表して試すことができます。', '現実をそのまますべて再現することはできません。そこで重要な要素を選び、モデルを作ります。入力する条件やルールを変えると結果も変わります。結果を見るときは、モデルが何を省略しているかも考えます。', 'モデルが雑なら、結果も信用しすぎてはいけません。シミュレーションは予言ではなく、仮定のもとでの試行です。', 'シミュレーション結果を見るとき、モデルについて何を確認すべきですか。', 'どんな仮定を置き、何を省略しているかを確認します。'),
  information: {
    id: 'information', title: '情報とは', chapter: '第1章　情報社会の問題解決', sourceChapter: '情報Ⅰ (1) 情報社会の問題解決', figure: 'dataInfoDecision', oneLine: '情報とは、意味をもって判断に使えるようになったデータです。', example: '「25」だけでは弱いですが、「気温25℃」なら服装の判断に使えます。', explanation: 'データは材料、情報は文脈がついた材料、知識はそれを使って判断できる形に整理したものです。', misconception: '数字や文字があるだけで必ず情報になるわけではありません。', question: '「25」と「気温25℃」の違いを説明しなさい。', answer: '後者は何を表す数値かという文脈があり、判断に使えるためです。', terms: []
  },
  'bit-byte': {
    id: 'bit-byte', title: 'ビットとバイト', chapter: '第2章　コミュニケーションと情報デザイン', sourceChapter: '情報Ⅰ (2) 情報のディジタル化', figure: 'bitPatterns', oneLine: 'bit は0/1の最小単位、byte は8bitをまとめた単位です。', example: '1bitは2通り、2bitは4通り、3bitは8通りを表せます。', explanation: 'bit数が1つ増えるたびに、表せる状態の数は2倍になります。データ量を考えるときは、bitとbyteを区別します。', misconception: '1byteが必ず1文字を表すとは限りません。', question: '3bitで何通り表せますか。', answer: '2^3 = 8通りです。', terms: []
  },
  binary: {
    id: 'binary', title: '2進数', chapter: '第2章　コミュニケーションと情報デザイン', sourceChapter: '情報Ⅰ (2) 二進法による表現', figure: 'binaryPlace', oneLine: '2進数は、0と1だけで数を表す方法です。', example: '1011₂ = 8 + 0 + 2 + 1 = 11₁₀ です。', explanation: '右から1,2,4,8...と位の重みが2倍になります。1が立っている位の重みを足します。', misconception: '1011₂を千十一と読まないようにします。', question: '1011₂を10進数に直しなさい。', answer: '11です。', terms: [], demo: 'binary'
  },
  'image-digital': {
    id: 'image-digital', title: '画像のディジタル化', chapter: '第2章　コミュニケーションと情報デザイン', sourceChapter: '情報Ⅰ (2) 静止画のディジタル化', figure: 'pixelGrid', oneLine: 'ディジタル画像は、画素という小さな点の集まりです。', example: '白黒画像なら各画素を0/1、カラー画像ならRGBの強さで表せます。', explanation: '解像度が上がると画素数が増え、細かく表せますがデータ量も増えます。', misconception: 'ディジタル画像は連続した絵そのものではなく、点の集まりです。', question: '解像度を上げるとデータ量はどうなりやすいですか。', answer: '一般に増えます。', terms: []
  },
  'sound-digital': {
    id: 'sound-digital', title: '音のディジタル化', chapter: '第2章　コミュニケーションと情報デザイン', sourceChapter: '情報Ⅰ (2) 標本化・量子化・符号化', figure: 'soundSampling', oneLine: '音のディジタル化は、波を測って数値にすることです。', example: '標本化で時間ごとに測り、量子化で段階に丸め、符号化でビット列にします。', explanation: '標本化周波数や量子化の段階を細かくすると音質はよくなりやすいですが、データ量も増えます。', misconception: '標本化周波数を高くすれば無限によくなるわけではありません。', question: '標本化とは何ですか。', answer: '時間を細かく区切って信号の値を測ることです。', terms: []
  },
  packet: {
    id: 'packet', title: 'パケット通信', chapter: '第4章　情報通信ネットワークとデータの活用', sourceChapter: '情報Ⅰ (4) 情報通信ネットワーク', figure: 'packetFlow', oneLine: 'パケット通信は、大きなデータを小さく分けて送るしくみです。', example: '大きな荷物を複数の箱に分け、届いたあと番号順に戻すイメージです。', explanation: '各パケットには宛先や順番などの情報が付きます。違う経路を通っても、受信側で並べ直せます。', misconception: 'すべてのパケットが同じ道を通るとは限りません。', question: 'パケットに番号が必要な理由を説明しなさい。', answer: '届く順番が入れ替わることがあるためです。', terms: [], demo: 'packet'
  },
  'ip-address': {
    id: 'ip-address', title: 'IPアドレス', chapter: '第4章　情報通信ネットワークとデータの活用', sourceChapter: '情報Ⅰ (4) 情報通信ネットワーク', figure: 'ipHomeNetwork', oneLine: 'IPアドレスは、ネットワーク上で機器を識別する番号です。', example: '192.168.1.10 のような形はIPv4アドレスの例です。', explanation: '家庭内のプライベートIPと、外から見えるグローバルIPを分けて考えます。', misconception: 'IPアドレスだけで常に個人を一意に特定できるわけではありません。', question: 'IPアドレスを住所にたとえるときの注意点を答えなさい。', answer: '現実の住所と完全に同じではなく、共有や変化があり得ることです。', terms: []
  },
  database: {
    id: 'database', title: 'データベースとは', chapter: '第4章　情報通信ネットワークとデータの活用', sourceChapter: '情報Ⅰ (4) データベース', figure: 'databaseTable', oneLine: 'データベースは、たくさんのデータを探しやすく管理するしくみです。', example: '生徒表では、1行が1人分のデータ、列が名前や点数などの項目です。', explanation: '主キーを使うと、同姓同名がいても1件のデータを区別できます。検索、並べ替え、条件抽出にも使われます。', misconception: '表計算ソフトの表と似ていますが、目的や管理方法は同じではありません。', question: '主キーの役割を説明しなさい。', answer: 'それぞれの行を一意に区別することです。', terms: []
  },
  statistics: {
    id: 'statistics', title: '平均値・中央値・最頻値', chapter: '第4章　情報通信ネットワークとデータの活用', sourceChapter: '情報Ⅰ (4) データの分析', figure: 'statsCompare', oneLine: '代表値は、データ全体の特徴を短く表す値です。', example: '10,12,12,13,50 では平均値は19.4、中央値は12、最頻値は12です。', explanation: '外れ値があると平均値は引っ張られます。中央値や最頻値も合わせて見ると判断しやすくなります。', misconception: '平均値だけで「ふつう」を決めつけないようにします。', question: '外れ値があると平均値はどうなりやすいですか。', answer: '外れ値の方向に引っ張られやすいです。', terms: [], demo: 'stats'
  }
};

for (const lesson of Object.values(LESSONS)) {
  if (!lesson.terms) lesson.terms = [];
}

const GLOSSARY = [
  ['アルゴリズム', '問題を解くための手順。プログラムを書く前に、何をどの順に行うかを考える。', 'lessons/algorithm.html'],
  ['入力', 'コンピュータに与える情報。点数、検索語、ボタン操作など。', 'lessons/input-process-output.html'],
  ['処理', '入力をもとに行う作業。計算、判定、検索など。', 'lessons/input-process-output.html'],
  ['出力', '処理の結果として出てくる情報。画面表示、保存、音、動作など。', 'lessons/input-process-output.html'],
  ['変数', '値を入れておく名前つきの箱のようなもの。', 'lessons/variable.html'],
  ['代入', '変数に値を入れること。右側を計算して左側へ入れる。', 'lessons/assignment.html'],
  ['条件分岐', '条件によって処理の流れを変えるしくみ。', 'lessons/branch.html'],
  ['繰り返し', '同じ処理を何度も行うしくみ。', 'lessons/loop.html'],
  ['配列', '複数のデータを順番に並べて扱うしくみ。', 'lessons/array.html'],
  ['インデックス', '配列の位置を表す番号。0番目から始まる場合と1番目から始まる場合がある。', 'lessons/array.html'],
  ['カウンタ', '回数や個数を数えるための変数。', 'lessons/counter-sum.html'],
  ['合計', '値を順に足してためていく変数や結果。', 'lessons/counter-sum.html'],
  ['線形探索', '先頭から一つずつ順番に調べる探索方法。', 'lessons/linear-search.html'],
  ['二分探索', '整列済みデータで中央を見て範囲を半分にする探索方法。', 'lessons/binary-search.html'],
  ['ソート', 'データを規則に従って並べ替えること。', 'lessons/sort-intro.html'],
  ['選択ソート', '未整列部分から最小値を選び、先頭と交換する整列方法。', 'lessons/selection-sort.html'],
  ['バブルソート', '隣同士を比べて必要なら交換することを繰り返す整列方法。', 'lessons/bubble-sort.html'],
  ['フローチャート', '処理の流れを図で表す方法。', 'lessons/flowchart.html'],
  ['疑似コード', '特定の言語に依存しすぎず、手順をコード風に表す方法。', 'lessons/pseudocode.html'],
  ['デバッグ', 'プログラムの誤りを見つけて直すこと。', 'lessons/debug.html'],
  ['シミュレーション', '現実の現象をモデルでまねて試すこと。', 'lessons/simulation.html']
];

const QUESTION_IDS = [
  'algorithm',
  'input-process-output',
  'variable',
  'assignment',
  'branch',
  'loop',
  'array',
  'counter-sum',
  'max-min',
  'linear-search',
  'binary-search',
  'sort-intro',
  'selection-sort',
  'bubble-sort'
];

const QUESTIONS = QUESTION_IDS.map((id) => {
  const l = LESSONS[id];
  return [l.title, l.question, l.answer, `lessons/${id}.html`];
});

const EXTRA_EXPLANATIONS = {
  algorithm: '教員研修用教材の第3章では、アルゴリズムを文章やフローチャートなどで正確に表すこと、そして手順の違いによって結果や効率が変わることが重視されています。したがって、このページでは「手順を作る」「表現する」「実行して確かめる」「よりよい方法を考える」という順番で考えます。プログラムの文法を覚える前に、どの値を使い、どの順に処理し、いつ終わるのかを説明できることが大切です。',
  'input-process-output': '教員研修用教材の「コンピュータの仕組み」では、入力装置、処理を行う部分、出力装置の関係が扱われます。プログラムを読むときも同じで、まず入力、処理、出力に分けると全体像が見えます。特にセンサーや外部装置を扱うプログラムでは、何を測り、どの条件で判断し、どの装置へ出力するのかを分けて考えることが重要です。',
  variable: '教員研修用教材の基本的プログラムでは、変数は順次・分岐・反復を支える基本として扱われます。変数は単なる記号ではなく、処理の途中で変化する値を記録するための場所です。プログラムを追跡するときは、各行の実行後に変数の中身がどう変わったかを表にすると、誤りにも気付きやすくなります。',
  assignment: '代入は、変数の値を更新する操作です。基本的プログラムを理解するには、右辺を先に計算し、その結果で左辺の変数を上書きする、という流れを毎回確認します。合計を求める処理、回数を数える処理、最大値を更新する処理は、すべてこの「古い値を使って新しい値を作る」考え方で読めます。',
  branch: '条件分岐は、教員研修用教材で扱われる基本的プログラムの中心の一つです。条件は真または偽になり、その結果によって実行される処理が変わります。複数の条件があるときは、条件を上から順に調べるのか、すべて独立に調べるのかで結果が変わることがあります。条件式だけでなく、処理の流れも図で確認しましょう。',
  loop: '繰り返しは、反復とも呼ばれ、同じ形の処理を多数のデータに適用するときに使います。教員研修用教材では、順次・分岐・反復を組み合わせて基本的プログラムを作る流れが示されています。繰り返しでは、初期値、続ける条件、1回ごとの更新をそろえて確認することが大切です。',
  array: '教員研修用教材の応用的プログラムでは、配列のように複数のデータをまとめて扱う考え方が重要になります。配列を使うと、同じ処理をデータ全体に繰り返し適用できます。探索や整列では、現在見ている位置と、そこに入っている値を分けて読むことが必要です。',
  'counter-sum': 'カウンタと合計は、変数と繰り返しを組み合わせる典型例です。教材で重視される「プログラムを作成し、実行し、結果を振り返る」流れでは、途中経過を表にして確かめることが有効です。count は条件を満たした個数、total は値の累積というように、変数の役割を言葉で説明できるようにします。',
  'max-min': '最大値・最小値を求める処理は、単純なアルゴリズムの代表例です。教員研修用教材では、平均、最大値、最小値、探索、整列などの典型的なアルゴリズムを扱うことが想定されています。暫定値を持ち、1つずつ比較して必要なら更新する、という流れを表で追うと理解しやすくなります。',
  'linear-search': '線形探索は、探索アルゴリズムの比較で最初に確認したい方法です。並んでいないデータにも使える一方、最悪の場合は最後まで調べます。教材で重視される「アルゴリズムによる効率の違い」を考えるために、見つかる位置やデータ数によって比較回数がどう変わるかを確認します。',
  'binary-search': '二分探索は、線形探索との比較によって効率の違いが見えやすい方法です。ただし、整列済みであることが前提です。1回ごとに探索範囲が半分になるため、データ数が多いほど効果が大きくなります。前処理として整列が必要な場合は、その手間も含めて方法を選ぶことが大切です。',
  'sort-intro': '整列は、データを扱いやすくするための基本的な処理です。教員研修用教材では、探索や整列などの典型的なアルゴリズムを比較し、効率の違いを考えることが示されています。整列後は中央値を見つけやすくなったり、二分探索を使えるようになったりします。',
  'selection-sort': '選択ソートは、比較と交換の役割が見えやすい整列方法です。毎回、未整列部分を調べて最小値を選ぶため、処理の意味を説明しやすい一方、データ数が増えると比較回数が多くなります。教材の観点では、正しく動くことだけでなく、どれくらい手間がかかるかも考えます。',
  'bubble-sort': 'バブルソートは、隣同士の比較と交換を繰り返す整列方法です。各通過で端の値が確定していくため、途中経過を図で追いやすいという利点があります。一方、効率はよいとは限らないため、選択ソートや他の整列方法と比較して考える題材になります。',
  flowchart: 'フローチャートは、アルゴリズムを表現する手段の一つです。教員研修用教材では、文章やフローチャートなどを使ってアルゴリズムを正確に表すことが重視されています。図にすると、分岐や繰り返しの戻り先が見えやすくなります。',
  pseudocode: '疑似コードは、特定のプログラミング言語に寄りすぎず、処理の流れを表すための方法です。情報Ⅰでは、問題文に独自の表記が示されることがあります。表記を暗記するより、代入、条件、繰り返し、配列の意味を読み取ることが大切です。',
  debug: '教員研修用教材では、作成したプログラムを実行し、結果を振り返って改善することも大切にされています。デバッグでは、エラー表示だけを見るのではなく、入力、途中の変数、出力を順に確認します。小さなデータで試すと、どこで考えと違ったかを見つけやすくなります。',
  simulation: 'モデル化とシミュレーションは、第3章の大きな柱の一つです。現実をそのまま扱うのではなく、必要な要素を選んでモデルにし、条件を変えて結果を見ることで問題解決に役立てます。結果を読むときは、モデルの仮定と限界も必ず確認します。'
};

Object.entries(EXTRA_EXPLANATIONS).forEach(([id, text]) => {
  if (LESSONS[id]) LESSONS[id].explanation += text;
});

const PYTHON_EXAMPLES = {
  algorithm: `data = [5, 2, 8, 1]\nresult = []\n\nwhile data:\n    smallest = min(data)\n    result.append(smallest)\n    data.remove(smallest)\n\nprint(result)`,
  'input-process-output': `score = 82          # 入力\nresult = score >= 80 # 処理\nprint(result)        # 出力`,
  variable: `score = 0\nscore = score + 10\nprint(score)`,
  assignment: `x = 3\nx = x + 1\nprint(x)  # 4`,
  branch: `score = 75\n\nif score >= 80:\n    print("合格")\nelse:\n    print("再挑戦")`,
  loop: `total = 0\n\nfor i in range(1, 6):\n    total = total + i\n\nprint(total)`,
  array: `scores = [60, 75, 90]\nprint(scores[1])  # 75`,
  'counter-sum': `scores = [72, 45, 88, 60]\ncount = 0\ntotal = 0\n\nfor score in scores:\n    total += score\n    if score >= 60:\n        count += 1\n\nprint("合計", total)\nprint("60点以上", count)`,
  'max-min': `data = [42, 78, 24, 91, 56]\nmaximum = data[0]\n\nfor value in data[1:]:\n    if value > maximum:\n        maximum = value\n\nprint(maximum)`,
  'linear-search': `data = [4, 7, 2, 9, 5]\ntarget = 9\nfound_index = -1\n\nfor i, value in enumerate(data):\n    if value == target:\n        found_index = i\n        break\n\nprint(found_index)`,
  'binary-search': `data = [1, 3, 5, 7, 9, 11, 13]\ntarget = 9\nleft = 0\nright = len(data) - 1\nfound_index = -1\n\nwhile left <= right:\n    mid = (left + right) // 2\n    if data[mid] == target:\n        found_index = mid\n        break\n    elif target < data[mid]:\n        right = mid - 1\n    else:\n        left = mid + 1\n\nprint(found_index)`,
  'sort-intro': `data = [5, 2, 8, 1]\nprint(sorted(data))`,
  'selection-sort': `data = [5, 2, 8, 1]\n\nfor i in range(len(data) - 1):\n    min_index = i\n    for j in range(i + 1, len(data)):\n        if data[j] < data[min_index]:\n            min_index = j\n    data[i], data[min_index] = data[min_index], data[i]\n\nprint(data)`,
  'bubble-sort': `data = [5, 2, 8, 1]\n\nfor i in range(len(data) - 1):\n    for j in range(len(data) - 1 - i):\n        if data[j] > data[j + 1]:\n            data[j], data[j + 1] = data[j + 1], data[j]\n\nprint(data)`,
  debug: `def average(scores):\n    total = 0\n    for score in scores:\n        total += score\n        print("途中の合計:", total)\n    return total / len(scores)\n\nprint(average([70, 80, 90]))`,
  simulation: `people = 100\ninfected = 1\nrate = 1.25\n\nfor day in range(1, 8):\n    infected = min(people, infected * rate)\n    print(day, round(infected, 1))`
};

Object.entries(PYTHON_EXAMPLES).forEach(([id, code]) => {
  if (LESSONS[id]) LESSONS[id].python = code;
});
