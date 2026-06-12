const CODE_EXERCISES = {
  branch: {
    id: 'branch-score',
    mode: 'output',
    title: '点数で表示を変える',
    description: '点数 score が 80 以上なら「合格」、そうでなければ「再挑戦」と表示しましょう。score を 65 に変えたときも試してみると、条件分岐の流れが確認できます。',
    initialCode: `score = 82

# ここに条件分岐を書きましょう
`,
    expectedOutput: '合格',
    hints: [
      '条件は score >= 80 と書けます。',
      '条件を満たさない場合の処理は else の下に書きます。'
    ],
    solutionCode: `score = 82

if score >= 80:
    print("合格")
else:
    print("再挑戦")
`,
    explanation: 'if の条件が成り立つと上の処理、成り立たないと else の処理が実行されます。'
  },
  loop: {
    id: 'loop-total',
    mode: 'output',
    title: '1から10までを合計する',
    description: '1 から 10 までの整数を順番に足して、合計を表示しましょう。total = total + i は「今までの合計に、今回の i を足して、もう一度 total に入れる」という意味です。',
    initialCode: `total = 0

for i in range(1, 11):
    # ここに処理を書きましょう
    pass

print(total)
`,
    expectedOutput: '55',
    hints: [
      '繰り返しの中で total を更新します。',
      'pass は何もしない命令なので、必要な処理に置き換えます。'
    ],
    solutionCode: `total = 0

for i in range(1, 11):
    total = total + i

print(total)
`,
    explanation: '繰り返しでは、変数の値が1回ごとにどう変わるかを追うと理解しやすくなります。'
  },
  array: {
    id: 'array-third-score',
    mode: 'output',
    title: '3番目の点数を取り出す',
    description: 'scores の中から、3番目の点数を表示しましょう。Python のリストでは、最初の要素を 0 番目として数えます。',
    initialCode: `scores = [72, 85, 90, 66]

# ここにコードを書きましょう
`,
    expectedOutput: '90',
    hints: [
      '1番目は scores[0]、2番目は scores[1] です。',
      '3番目は何番のインデックスになるでしょうか。'
    ],
    solutionCode: `scores = [72, 85, 90, 66]

print(scores[2])
`,
    explanation: '人が数える「3番目」と、Python のインデックス「2」を対応させることが大切です。'
  },
  'counter-sum': {
    id: 'counter-and-total',
    mode: 'output',
    title: '個数と合計を求める',
    description: 'scores に入っている点数の個数と合計を求めましょう。count は個数、total は合計という役割をもつ変数です。',
    initialCode: `scores = [72, 85, 90, 66]
count = 0
total = 0

for score in scores:
    # count と total を更新しましょう
    pass

print(count)
print(total)
`,
    expectedOutput: `4
313`,
    hints: [
      '点数を1つ見るたびに count を 1 増やします。',
      'total には、今見ている score を足していきます。'
    ],
    solutionCode: `scores = [72, 85, 90, 66]
count = 0
total = 0

for score in scores:
    count = count + 1
    total = total + score

print(count)
print(total)
`,
    explanation: 'カウンタと合計は、繰り返しの中で少しずつ値を更新していく代表的な処理です。'
  },
  'max-min': {
    id: 'find-max',
    mode: 'function',
    title: '最大値を返す関数',
    description: '点数のリストから最大値を返す関数 find_max を作りましょう。最初の値を仮の最大値にして、1つずつ比べます。',
    initialCode: `def find_max(scores):
    max_score = scores[0]

    for score in scores:
        # ここに処理を書きましょう
        pass

    return max_score
`,
    tests: [
      { name: '基本の点数', functionName: 'find_max', args: [[72, 85, 90, 66]], expectedReturn: 90, visible: true },
      { name: '別の点数', functionName: 'find_max', args: [[40, 38, 55]], expectedReturn: 55, visible: true },
      { name: '負の数だけのデータ', functionName: 'find_max', args: [[-5, -2, -9]], expectedReturn: -2, visible: true }
    ],
    hints: [
      'score が max_score より大きいとき、max_score を更新します。',
      '0 から始めると、負の数だけのデータで正しく求められないことがあります。'
    ],
    solutionCode: `def find_max(scores):
    max_score = scores[0]

    for score in scores:
        if score > max_score:
            max_score = score

    return max_score
`,
    explanation: '暫定の答えを持ち、よりよい値を見つけたら更新する考え方は、探索や整列にもつながります。'
  },
  'linear-search': {
    id: 'linear-search-names',
    mode: 'function',
    title: '名前を一つずつ探す',
    description: 'names の中に target があれば True、なければ False を返す関数 linear_search を作りましょう。',
    initialCode: `def linear_search(names, target):
    for name in names:
        # ここに条件を書きましょう
        pass

    return False
`,
    tests: [
      { name: '見つかる場合', functionName: 'linear_search', args: [['Aki', 'Ben', 'Chika', 'Dai'], 'Chika'], expectedReturn: true, visible: true },
      { name: '見つからない場合', functionName: 'linear_search', args: [['Aki', 'Ben', 'Chika', 'Dai'], 'Emi'], expectedReturn: false, visible: true }
    ],
    hints: [
      'name と target が等しいかを調べます。',
      '見つかった時点で return True してかまいません。'
    ],
    solutionCode: `def linear_search(names, target):
    for name in names:
        if name == target:
            return True

    return False
`,
    explanation: '線形探索では、先頭から順に調べます。途中で見つかったら、その時点で処理を終えてよいです。'
  },
  'binary-search': {
    id: 'binary-search-numbers',
    mode: 'function',
    title: '並んだ数から半分ずつ探す',
    description: '並んでいる数のリスト numbers から target を探します。見つかれば True、見つからなければ False を返しましょう。',
    initialCode: `def binary_search(numbers, target):
    left = 0
    right = len(numbers) - 1

    while left <= right:
        mid = (left + right) // 2

        if numbers[mid] == target:
            return True
        elif numbers[mid] < target:
            # 探す範囲を右側にします
            pass
        else:
            # 探す範囲を左側にします
            pass

    return False
`,
    tests: [
      { name: '中央より右にある値', functionName: 'binary_search', args: [[3, 8, 12, 18, 25, 31, 40], 25], expectedReturn: true, visible: true },
      { name: '含まれていない値', functionName: 'binary_search', args: [[3, 8, 12, 18, 25, 31, 40], 4], expectedReturn: false, visible: true },
      { name: '左端の値', functionName: 'binary_search', args: [[1, 2, 3, 4, 5], 1], expectedReturn: true, visible: true }
    ],
    hints: [
      'numbers[mid] が target より小さいなら、left を mid + 1 にします。',
      'numbers[mid] が target より大きいなら、right を mid - 1 にします。',
      '二分探索は、データが小さい順に並んでいることが前提です。'
    ],
    solutionCode: `def binary_search(numbers, target):
    left = 0
    right = len(numbers) - 1

    while left <= right:
        mid = (left + right) // 2

        if numbers[mid] == target:
            return True
        elif numbers[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return False
`,
    explanation: '調べる範囲を半分ずつ狭くするため、データが多いときに線形探索との違いが見えやすくなります。'
  },
  'selection-sort': {
    id: 'selection-sort-numbers',
    mode: 'function',
    title: '最小値を選んで並べ替える',
    description: 'numbers を小さい順に並べ替えて返す関数 selection_sort を作りましょう。',
    initialCode: `def selection_sort(numbers):
    numbers = numbers[:]

    for i in range(len(numbers)):
        min_index = i

        for j in range(i + 1, len(numbers)):
            # 最小値の位置を更新しましょう
            pass

        numbers[i], numbers[min_index] = numbers[min_index], numbers[i]

    return numbers
`,
    tests: [
      { name: '4つの数', functionName: 'selection_sort', args: [[5, 3, 8, 1]], expectedReturn: [1, 3, 5, 8], visible: true },
      { name: '同じ値を含む数', functionName: 'selection_sort', args: [[4, 4, 2]], expectedReturn: [2, 4, 4], visible: true }
    ],
    hints: [
      'numbers[j] と numbers[min_index] を比べます。',
      'より小さい値を見つけたら min_index を j にします。'
    ],
    solutionCode: `def selection_sort(numbers):
    numbers = numbers[:]

    for i in range(len(numbers)):
        min_index = i

        for j in range(i + 1, len(numbers)):
            if numbers[j] < numbers[min_index]:
                min_index = j

        numbers[i], numbers[min_index] = numbers[min_index], numbers[i]

    return numbers
`,
    explanation: 'numbers = numbers[:] は、元のリストを直接変えずに練習できるようにするためのコピーです。'
  },
  'bubble-sort': {
    id: 'bubble-sort-numbers',
    mode: 'function',
    title: '隣同士を比べて並べ替える',
    description: 'numbers を小さい順に並べ替えて返す関数 bubble_sort を作りましょう。',
    initialCode: `def bubble_sort(numbers):
    numbers = numbers[:]

    for i in range(len(numbers)):
        for j in range(0, len(numbers) - 1 - i):
            # 隣同士を比べて、必要なら交換しましょう
            pass

    return numbers
`,
    tests: [
      { name: '4つの数', functionName: 'bubble_sort', args: [[5, 3, 8, 1]], expectedReturn: [1, 3, 5, 8], visible: true },
      { name: 'ほぼ並んでいる数', functionName: 'bubble_sort', args: [[2, 1, 3]], expectedReturn: [1, 2, 3], visible: true }
    ],
    hints: [
      '左の値が右の値より大きいとき、2つを交換します。',
      'j の位置と j + 1 の位置を比べます。'
    ],
    solutionCode: `def bubble_sort(numbers):
    numbers = numbers[:]

    for i in range(len(numbers)):
        for j in range(0, len(numbers) - 1 - i):
            if numbers[j] > numbers[j + 1]:
                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]

    return numbers
`,
    explanation: '1回の通過ごとに大きい値が右側へ移動していく様子を追うと、処理の意味が見えやすくなります。'
  },
  debug: {
    id: 'debug-total',
    mode: 'output',
    title: '合計のプログラムを直す',
    description: '1 から 5 までの合計を求めるプログラムを直しましょう。このままだと total に i を入れ直しているだけなので、最後の 5 だけが残ります。',
    initialCode: `total = 0

for i in range(1, 6):
    total = i

print(total)
`,
    expectedOutput: '15',
    hints: [
      '合計するには、前の total を残したまま i を足します。',
      'total = total + i の形を使います。'
    ],
    solutionCode: `total = 0

for i in range(1, 6):
    total = total + i

print(total)
`,
    explanation: '代入は、右辺を計算してから左辺の変数に入れる操作です。途中の total を表で追うと、誤りに気づきやすくなります。'
  },
  random: {
    id: 'random-dice-count',
    mode: 'function',
    title: 'サイコロで6が出た回数を数える',
    description: 'rolls に入っているサイコロの結果から、6 が出た回数を返す関数 count_six を作りましょう。乱数で作った結果を分析するときも、まずは条件に合う回数を数えることが大切です。',
    initialCode: `def count_six(rolls):
    count = 0

    for roll in rolls:
        # 6 が出たら count を増やしましょう
        pass

    return count
`,
    tests: [
      { name: '6が2回', functionName: 'count_six', args: [[1, 6, 3, 6, 2]], expectedReturn: 2, visible: true },
      { name: '6が出ない', functionName: 'count_six', args: [[1, 2, 3, 4, 5]], expectedReturn: 0, visible: true },
      { name: 'すべて6', functionName: 'count_six', args: [[6, 6, 6]], expectedReturn: 3, visible: true }
    ],
    hints: [
      'roll == 6 という条件を使います。',
      '条件を満たしたときだけ count = count + 1 とします。'
    ],
    solutionCode: `def count_six(rolls):
    count = 0

    for roll in rolls:
        if roll == 6:
            count = count + 1

    return count
`,
    explanation: '乱数そのものを覚えるのではなく、条件に合う回数や割合を集計して傾向を見ます。'
  },
  'deterministic-random-model': {
    id: 'model-dice-count',
    mode: 'function',
    title: '100回分の結果から6の回数を数える',
    description: 'サイコロの結果 rolls から、6 が出た回数を返す関数 count_six を作りましょう。確率モデルでは、1回の結果ではなく、何回も試した結果を集計して傾向を見ます。',
    initialCode: `def count_six(rolls):
    count = 0

    for roll in rolls:
        # 6 が出たら count を増やしましょう
        pass

    return count
`,
    tests: [
      { name: '6が2回', functionName: 'count_six', args: [[1, 6, 3, 6, 2]], expectedReturn: 2, visible: true },
      { name: '6が出ない', functionName: 'count_six', args: [[1, 2, 3, 4, 5]], expectedReturn: 0, visible: true },
      { name: 'すべて6', functionName: 'count_six', args: [[6, 6, 6]], expectedReturn: 3, visible: true }
    ],
    hints: [
      'roll == 6 という条件を使います。',
      '条件を満たしたときだけ count = count + 1 とします。'
    ],
    solutionCode: `def count_six(rolls):
    count = 0

    for roll in rolls:
        if roll == 6:
            count = count + 1

    return count
`,
    explanation: '複数回の結果を集計すると、偶然を含むモデルの傾向を読み取りやすくなります。'
  },
  function: {
    id: 'function-average',
    mode: 'function',
    title: '平均を返す関数',
    description: '2つの点数 a, b の平均を返す関数 average を作りましょう。print ではなく return を使うと、戻り値を次の計算に使えます。',
    initialCode: `def average(a, b):
    # ここに平均を返す処理を書きましょう
    pass
`,
    tests: [
      { name: '70と90', functionName: 'average', args: [70, 90], expectedReturn: 80, visible: true },
      { name: '60と80', functionName: 'average', args: [60, 80], expectedReturn: 70, visible: true },
      { name: '100と50', functionName: 'average', args: [100, 50], expectedReturn: 75, visible: true }
    ],
    hints: [
      '平均は、合計を個数で割ります。',
      '(a + b) / 2 を return します。'
    ],
    solutionCode: `def average(a, b):
    return (a + b) / 2
`,
    explanation: 'return で返した値は、変数に入れたり、別の計算に使ったりできます。'
  },
  api: {
    id: 'api-weather-read',
    mode: 'function',
    title: '天気データから気温を取り出す',
    description: '天気サービスから返ってきたものとして、辞書 weather_data を使います。実際の通信は行わず、手元のデータから temperature の値を返しましょう。',
    initialCode: `def get_temperature(weather_data):
    # temperature の値を返しましょう
    pass
`,
    tests: [
      { name: '東京', functionName: 'get_temperature', args: [{ place: '東京', weather: '晴れ', temperature: 27 }], expectedReturn: 27, visible: true },
      { name: '大阪', functionName: 'get_temperature', args: [{ place: '大阪', weather: '雨', temperature: 22 }], expectedReturn: 22, visible: true }
    ],
    hints: [
      '辞書では、weather_data["temperature"] のように項目名で値を取り出せます。'
    ],
    solutionCode: `def get_temperature(weather_data):
    return weather_data["temperature"]
`,
    explanation: 'APIのレスポンスも、項目名と値の対応を読むことが大切です。'
  }
};

window.CODE_EXERCISES = CODE_EXERCISES;
