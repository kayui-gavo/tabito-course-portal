/* 情報Ⅰ v18 — 第6講 原教材準拠図版 */
(() => {
  const K = window.SCIENTIFIC_V12;
  if (!K) return;
  const C = K.C;

  K.register('b6-1', {
    title: 'アルゴリズムの表現：3つの制御構造と3種類の図',
    height: 1020,
    caption: '原教材の整理どおり，順次・反復・分岐と，フローチャート・アクティビティ図・状態遷移図の役割を分けて読む。',
    question: '並行して進む複数主体の処理を表すのに教材が適するとしている図は何ですか。',
    answer: 'アクティビティ図。フローチャートは単一処理，状態遷移図は状態の移り変わりに適する。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head } = k;
      head(ctx, 'アルゴリズムの表現方法', 'アルゴリズム＝コンピュータに意図した行動をさせるための処理手順。図式化すると処理の特徴を視覚的に整理できる。');

      text(ctx, 'A　3つの制御構造', 45, 120, 15, C.navy, 700);
      box(ctx, 45, 155, 325, 125, '順次構造', '処理1 → 処理2\n順番通りに処理する', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 425, 155, 325, 125, '反復構造', '条件を満たす間\n同じ処理を繰り返す', { fill: '#f8fafb' });
      box(ctx, 805, 155, 330, 125, '分岐構造', '条件のYes / Noで\n処理が分かれる', { fill: '#fff8f0', stroke: '#e3d2bf' });

      text(ctx, 'B　フローチャート：単一の処理の流れ', 45, 340, 15, C.navy, 700);
      rr(ctx, 45, 375, 1090, 215, '#fff', '#d8e1e6', 10);
      rr(ctx, 90, 408, 145, 42, '#f8fafb', '#aebbc3', 21); text(ctx, '開始', 162, 429, 11, C.dark, 700, 'center', 'middle');
      arrow(ctx, 235, 429, 305, 429, C.blue, 2);
      rr(ctx, 305, 400, 170, 58, '#eef6fa', '#bfd1db', 6); text(ctx, '処理1', 390, 429, 12, C.navy, 700, 'center', 'middle');
      arrow(ctx, 475, 429, 545, 429, C.blue, 2);
      ctx.beginPath(); ctx.moveTo(625,392); ctx.lineTo(710,429); ctx.lineTo(625,466); ctx.lineTo(540,429); ctx.closePath(); ctx.fillStyle='#fff8f0'; ctx.fill(); ctx.strokeStyle='#d8c8b8'; ctx.stroke();
      text(ctx, '条件', 625, 429, 11, C.orange, 700, 'center', 'middle');
      arrow(ctx, 710, 429, 810, 429, C.orange, 2); text(ctx, 'Yes', 758, 415, 9, C.gray, 600, 'center');
      rr(ctx, 810, 400, 165, 58, '#f4f9f7', '#cfe1d7', 6); text(ctx, '処理2', 892, 429, 12, C.navy, 700, 'center', 'middle');
      arrow(ctx, 975, 429, 1045, 429, C.blue, 2);
      rr(ctx, 1045, 408, 70, 42, '#f8fafb', '#aebbc3', 21); text(ctx, '終了', 1080, 429, 10, C.dark, 700, 'center', 'middle');
      line(ctx, 625, 466, 625, 525, C.gray, 1.5); line(ctx, 625, 525, 390, 525, C.gray, 1.5); arrow(ctx, 390, 525, 390, 458, C.gray, 1.5); text(ctx, 'No', 640, 495, 9, C.gray, 600);
      wrap(ctx, '教材の主な記号：端子（開始・終了）／処理／条件分岐／繰り返し／データ／表示／線', 85, 548, 970, 18, 10.5, C.gray, 600);

      text(ctx, 'C　図の使い分け', 45, 650, 15, C.navy, 700);
      box(ctx, 45, 685, 330, 245, 'フローチャート', '単一の処理の流れ\n\n例：野菜炒め\n「切る→30回炒める→味を判定→盛り付け」', { fill: '#eef6fa', stroke: '#bfd1db', bs: 10.5 });
      box(ctx, 425, 685, 330, 245, 'アクティビティ図', '並行して行われる処理\n\n例：画面ロック解除\n「自分」と「スマホ」の処理を分ける', { fill: '#f8fafb', bs: 10.5 });
      box(ctx, 805, 685, 330, 245, '状態遷移図', '状態の移り変わり\n\n例：自動開閉マスク\n検知条件で「開く／閉じる」が遷移', { fill: '#fff8f0', stroke: '#e3d2bf', bs: 10.5 });
      rr(ctx, 45, 960, 1090, 38, '#f5f9fb', '#d5e2e8', 8);
      text(ctx, '判断の軸：単一の流れ？　複数主体の並行処理？　状態の遷移？', 590, 979, 10.5, C.gray, 700, 'center', 'middle');
    }
  });

  K.register('b6-2', {
    title: 'プログラミングの基本：実行環境・3つの基本処理・変数',
    height: 1000,
    caption: 'MakeCodeとGoogle Colaboratoryを入口に，micro:bitの教材例で順次・反復・分岐と変数を対応づける。',
    question: '0〜2へ値を変えながら同じ表示・音処理を行うカウンターは，どの基本処理ですか。',
    answer: '反復処理。値を保持して変化させるために変数iも使う。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head } = k;
      head(ctx, 'プログラミングの基本', 'プログラミング言語でプログラムを作成し，対話型実行環境で動かしながら順次・反復・分岐を学ぶ。');

      text(ctx, 'A　教材の対話型実行環境', 45, 120, 15, C.navy, 700);
      box(ctx, 45, 155, 510, 125, 'Microsoft MakeCode', 'micro:bitを視覚的にプログラミング\nデバッグモードを備え，入門に適する', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 625, 155, 510, 125, 'Google Colaboratory', 'PythonなどをWebブラウザ上で実行\nライブラリを使った処理にもつながる', { fill: '#f8fafb' });

      text(ctx, 'B　3つの基本処理', 45, 345, 15, C.navy, 700);
      box(ctx, 45, 380, 330, 225, '順次処理', 'Aボタンを押す\n↓\nハートを表示\n↓\n「ピコーン！」音\n\n上から順番に実行', { fill: '#eef6fa', stroke: '#bfd1db', bs: 10.5 });
      box(ctx, 425, 380, 330, 225, '反復処理', 'i = 0,1,2 と変化\n↓\niを表示\n↓\n音を鳴らす\n↓\n繰り返し\n\n変数iを使う', { fill: '#f8fafb', bs: 10.5 });
      box(ctx, 805, 380, 330, 225, '分岐処理', '0または1の乱数\n↓\n条件を判定\n↙　　　↘\n○を表示　×を表示\n\n条件で処理を分ける', { fill: '#fff8f0', stroke: '#e3d2bf', bs: 10.5 });

      text(ctx, 'C　変数', 45, 665, 15, C.navy, 700);
      rr(ctx, 45, 700, 1090, 175, '#fff', '#d8e1e6', 10);
      box(ctx, 85, 735, 270, 100, '変数 i', 'データを記憶する\nメモリ領域', { fill: '#eef6fa', stroke: '#bfd1db' });
      arrow(ctx, 355, 785, 470, 785, C.blue, 2);
      box(ctx, 470, 735, 270, 100, '値を代入', '0 → 1 → 2\n数値や文字列を保持できる', { fill: '#f8fafb' });
      arrow(ctx, 740, 785, 855, 785, C.teal, 2);
      box(ctx, 855, 735, 240, 100, '処理で利用', '表示・比較・計算など', { fill: '#f4f9f7', stroke: '#cfe1d7' });
      rr(ctx, 45, 915, 1090, 56, '#f5f9fb', '#d5e2e8', 8);
      wrap(ctx, 'PART1の「順次構造・反復構造・分岐構造」と，PART2の「順次処理・反復処理・分岐処理」を対応づけて理解する。', 85, 930, 1010, 18, 10.5, C.gray, 600);
    }
  });

  K.register('b6-3', {
    title: 'ネットワークを利用したプログラミング：グループ番号と個体識別',
    height: 930,
    caption: '原教材の玄関チャイムと店員呼び出しベルを使い，同じグループ番号と個体識別番号の役割を区別する。',
    question: '同じ無線グループ内に複数の端末があるとき，通信相手を区別するには何を追加しますか。',
    answer: 'テーブル番号のような個体識別番号。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head } = k;
      head(ctx, 'ネットワークを利用したプログラミング', '送信機と受信機で同じ無線グループ番号を設定し，複数端末では個体識別番号も使って通信相手を区別する。');

      text(ctx, 'A　玄関の呼び出しチャイム', 45, 120, 15, C.navy, 700);
      box(ctx, 45, 165, 300, 145, '玄関 micro:bit', 'グループ番号：192\nAボタンを押す\n→ 呼び出しデータを送信', { fill: '#eef6fa', stroke: '#bfd1db' });
      arrow(ctx, 345, 237, 765, 237, C.blue, 3);
      text(ctx, '同じ無線グループ内で送信', 555, 218, 11, C.blue, 700, 'center');
      box(ctx, 765, 165, 370, 145, 'リビング micro:bit', 'グループ番号：192\n受信→チャイム＋♡表示\nBボタン→表示を消す', { fill: '#f4f9f7', stroke: '#cfe1d7' });
      rr(ctx, 45, 335, 1090, 48, '#f5f9fb', '#d5e2e8', 8);
      text(ctx, '教材の補足：無線グループ番号は 0〜255 を指定できる。', 590, 359, 10.5, C.gray, 600, 'center', 'middle');

      text(ctx, 'B　複数端末の双方向通信', 45, 450, 15, C.navy, 700);
      const senders = [['テーブル1','ID=1'],['テーブル2','ID=2'],['テーブル3','ID=3']];
      senders.forEach((a,i)=>box(ctx,45,495+i*105,245,78,a[0],a[1]+'\nAボタンでIDを送信',{fill:'#fff'}));
      box(ctx, 790, 550, 345, 145, '受信機', '受信したIDから\nテーブル番号を表示\nメロディを鳴らす', { fill: '#eef6fa', stroke: '#bfd1db' });
      senders.forEach((a,i)=>arrow(ctx,290,534+i*105,790,595+i*20,C.blue,1.8));
      arrow(ctx,790,675,290,745,C.orange,2);
      text(ctx, 'PLEASE WAIT を返信', 555, 725, 10.5, C.orange, 700, 'center');
      box(ctx, 365, 805, 770, 80, '個体識別番号', '同じグループ番号の中でも，端末ごとのIDを使うと通信相手を識別し，目的の端末だけに応答できる。', { fill: '#fff8f0', stroke: '#e3d2bf', bs: 10.5 });
    }
  });

  K.register('b6-4', {
    title: '変数の型と関数：型・表示・型変換・算術演算子',
    height: 1020,
    caption: 'int / float / str / bool，print，+の型依存，int・str・floatによる変換，//・%・**を原教材の順で整理する。',
    question: "'03' を数値3として計算に使うには，教材のどの関数を使いますか。",
    answer: 'int()。小数文字列ならfloat()を使う。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head, table } = k;
      head(ctx, '変数の型と関数', 'Pythonでは値を最初に代入するときに型が決まる。型が違えば，メモリ内での扱いも演算の意味も変わる。');

      text(ctx, 'A　教材の4つの型', 45, 120, 15, C.navy, 700);
      table(ctx, 45, 155, 1090, 165, ['型', 'Python表記', '例'], [
        ['整数型', 'int', '100'],
        ['浮動小数点数型', 'float', '3.14'],
        ['文字列型', 'str', "'tokyo'"],
        ['論理型', 'bool', 'True / False']
      ], { fs: 10.5, headFill: '#eff5f8' });

      text(ctx, 'B　= は代入，# はコメント，print() は表示', 45, 375, 15, C.navy, 700);
      box(ctx, 45, 410, 340, 115, 'a = 100', '= は「等しい」ではなく\n変数aへ100を代入', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 425, 410, 340, 115, '# コメント', '# 以降にコード中の\nメモを書ける', { fill: '#f8fafb' });
      box(ctx, 805, 410, 330, 115, 'print(a)', '変数・文字列・\n計算結果などを表示', { fill: '#f4f9f7', stroke: '#cfe1d7' });

      text(ctx, 'C　+ は型で意味が変わる', 45, 585, 15, C.navy, 700);
      box(ctx, 45, 620, 330, 95, '100 + 3.14', '数値＋数値 → 103.14', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 425, 620, 330, 95, "'tokyo' + '03'", '文字列＋文字列 → tokyo03', { fill: '#f8fafb' });
      box(ctx, 805, 620, 330, 95, "100 + 'tokyo'", 'int＋str → TypeError', { fill: '#fff4f2', stroke: '#e3c8c4', tc: C.red });
      box(ctx, 45, 745, 520, 110, '型変換', "int('03') → 3\nstr(100) → '100'\nfloat('3.14') → 3.14", { fill: '#fff8f0', stroke: '#e3d2bf' });
      box(ctx, 615, 745, 520, 110, '算術演算子', '/：割り算　//：商　%：余り\n**：累乗　　+ - *：四則演算', { fill: '#f8fafb' });
      rr(ctx, 45, 900, 1090, 82, '#f5f9fb', '#d5e2e8', 9);
      text(ctx, '浮動小数点数の誤差', 70, 928, 11.5, C.orange, 700);
      wrap(ctx, "教材例では 3.14 + int('03') が 6.140000000000001 と表示される。2進法で10進小数を正確に表せない場合があるため。", 235, 915, 855, 18, 10.5, C.gray, 500);
    }
  });

  K.register('b6-5', {
    title: 'モジュールとfor文・if文：import・比較・range・分岐',
    height: 1120,
    caption: '教材に登場するモジュール，True/Falseを返す比較演算子，rangeの3形式，forとif/else/elifを1枚で整理する。',
    question: 'Pythonで「等しいか」を比較するとき，= と == のどちらを使いますか。',
    answer: '==。= は代入。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head, table } = k;
      head(ctx, 'モジュールと for 文・if 文', 'importで機能を取り込み，比較結果True/Falseを使って反復と分岐を記述する。');

      text(ctx, 'A　import命令と教材のモジュール', 45, 120, 15, C.navy, 700);
      table(ctx, 45, 155, 1090, 210, ['モジュール', '主な機能', '教材例'], [
        ['random', '乱数', 'random.randint(1,10)'],
        ['math', '数学の計算', 'math.pi / math.sqrt(3)'],
        ['requests / json', 'HTTP通信 / JSON操作', 'requests.get / json.loads'],
        ['pandas / matplotlib.pyplot', 'データ処理・視覚化 / グラフ', 'read_csv / plt']
      ], { fs: 9.8, headFill: '#eff5f8' });

      text(ctx, 'B　比較演算子', 45, 420, 15, C.navy, 700);
      table(ctx, 45, 455, 500, 170, ['演算子', '意味'], [
        ['==', '等しい'], ['!=', '等しくない'], ['>', 'より大きい'], ['<', 'より小さい'], ['>= / <=', '以上 / 以下']
      ], { fs: 10, headFill: '#eff5f8' });
      box(ctx, 620, 455, 515, 170, '= と == を区別', '= は代入\n== は比較\n\n比較の結果は True または False', { fill: '#fff8f0', stroke: '#e3d2bf' });

      text(ctx, 'C　for文とrange関数', 45, 680, 15, C.navy, 700);
      box(ctx, 45, 715, 330, 125, 'range(5)', '0, 1, 2, 3, 4\n終了値5は含まない', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 425, 715, 330, 125, 'range(1,5)', '1, 2, 3, 4\n開始値を指定', { fill: '#f8fafb' });
      box(ctx, 805, 715, 330, 125, 'range(1,10,2)', '1, 3, 5, 7, 9\n間隔値を指定', { fill: '#fff8f0', stroke: '#e3d2bf' });
      rr(ctx, 45, 865, 1090, 48, '#f5f9fb', '#d5e2e8', 8);
      text(ctx, '負の間隔値なら減少列も生成できる。教材例 range(10,1,-2) → 10,8,6,4,2', 590, 889, 10.3, C.gray, 600, 'center', 'middle');

      text(ctx, 'D　if / else / elif', 45, 960, 15, C.navy, 700);
      box(ctx, 45, 995, 330, 92, 'if age <= 12', '条件がTrue → 小学生', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 425, 995, 330, 92, 'elif age <= 15', '最初がFalseなら追加判定\n→ 中学生', { fill: '#f8fafb' });
      box(ctx, 805, 995, 330, 92, 'else', 'どの条件もFalse\n→ 高校生', { fill: '#fff8f0', stroke: '#e3d2bf' });
      text(ctx, 'Pythonではインデントが処理のまとまりを表す。', 590, 1102, 10.5, C.gray, 700, 'center');
    }
  });

  K.register('b6-6', {
    title: '配列と反復処理：添え字・len・for・while',
    height: 1080,
    caption: '配列の0始まり，lenとfor，whileの終了条件，探索と基数変換を教材例で整理する。',
    question: '繰り返す回数を事前に予測できず，条件が成り立つ間続けたい場合，教材はforとwhileのどちらを勧めていますか。',
    answer: 'while文。回数を予測できる場合はfor文。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head, cell } = k;
      head(ctx, '配列と反復処理', '配列は複数データを添え字で扱う。Pythonでは添え字が0から始まり，forとwhileを目的に応じて使い分ける。');

      text(ctx, 'A　配列と添え字', 45, 120, 15, C.navy, 700);
      const vals=['6','1','8','3','5'];
      vals.forEach((v,i)=>{cell(ctx,160+i*150,160,130,60,v,{fill:i===2?'#fff8f0':'#eef6fa',fs:17});text(ctx,`A[${i}]`,225+i*150,245,11,i===2?C.orange:C.gray,700,'center');});
      text(ctx, 'A = [6, 1, 8, 3, 5]　　先頭は A[0]　　len(A) = 5', 590, 295, 12, C.navy, 700, 'center');

      text(ctx, 'B　配列をforで処理する2つの書き方', 45, 365, 15, C.navy, 700);
      box(ctx, 45, 400, 500, 145, '添え字で処理', 'n = len(A)\nfor i in range(n):\n　print(A[i])\n\n位置iが必要なときに使う', { fill: '#eef6fa', stroke: '#bfd1db', bs: 10.5 });
      box(ctx, 635, 400, 500, 145, '要素を直接処理', 'for i in A:\n　print(i)\n\n要素そのものだけが必要なら短く書ける', { fill: '#f8fafb', bs: 10.5 });

      text(ctx, 'C　for文とwhile文の使い分け', 45, 610, 15, C.navy, 700);
      box(ctx, 45, 645, 500, 120, 'for文', '繰り返し回数が予測できる場合\n例：range(5)で5回処理', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 635, 645, 500, 120, 'while文', '回数が予測できず\n条件を満たす間続ける場合', { fill: '#fff8f0', stroke: '#e3d2bf' });

      text(ctx, 'D　whileを使う教材例', 45, 825, 15, C.navy, 700);
      box(ctx, 45, 860, 500, 155, '配列内の7を検索', 'A=[6,1,8,3,5,2,7,4,9,0]\ni=0\nwhile A[i] != 7:\n　i=i+1\n→ i=6', { fill: '#f8fafb', bs: 10.2 });
      box(ctx, 635, 860, 500, 155, '11を2で繰り返し割る', 'q=11\nwhile q != 0:\n　r=q%2　#余り\n　q=q//2　#商\n→ 余りを 1,1,0,1 と順に表示', { fill: '#f4f9f7', stroke: '#cfe1d7', bs: 10.2 });
      rr(ctx, 45, 1030, 1090, 34, '#f5f9fb', '#d5e2e8', 7);
      text(ctx, 'ポイント：配列の範囲・whileの終了条件・更新式を同時に追う。', 590, 1047, 10.2, C.gray, 700, 'center', 'middle');
    }
  });

  K.register('b6-7', {
    title: '論理演算子と関数：and / or / not・引数・return・バブルソート',
    height: 1110,
    caption: 'True/Falseの組み合わせから関数定義，倍数判定，配列を返す関数，隣接比較によるバブルソートへつなぐ。',
    question: '3と5の両方で割り切れる条件は，orではなくandを使うのはなぜですか。',
    answer: '両方の比較式がTrueである必要があるため。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head, table } = k;
      head(ctx, '論理演算子と関数', '比較結果のTrue/Falseをand・or・notで組み合わせ，defで処理を関数としてまとめる。');

      text(ctx, 'A　論理演算子', 45, 120, 15, C.navy, 700);
      table(ctx, 45, 155, 1090, 150, ['演算子', '意味', 'Trueになる条件'], [
        ['and', '論理積', '前後の両方がTrue'],
        ['or', '論理和', 'どちらか片方でもTrue'],
        ['not', '否定', 'True / Falseを反転']
      ], { fs: 10.5, headFill: '#eff5f8' });

      text(ctx, 'B　関数の入口と出口', 45, 365, 15, C.navy, 700);
      box(ctx, 45, 400, 310, 160, 'def baisu3(x):', 'x が引数\n\ny = x % 3 == 0\nreturn y', { fill: '#eef6fa', stroke: '#bfd1db', bs: 11 });
      arrow(ctx, 355, 480, 500, 480, C.blue, 2);
      box(ctx, 500, 400, 260, 160, '関数内の処理', '%で余り\n==0で比較\nTrue / Falseを得る', { fill: '#f8fafb', bs: 10.5 });
      arrow(ctx, 760, 480, 900, 480, C.teal, 2);
      box(ctx, 900, 400, 235, 160, '戻り値', 'returnで\n呼び出し元へ返す', { fill: '#f4f9f7', stroke: '#cfe1d7' });

      text(ctx, 'C　複数条件と配列', 45, 620, 15, C.navy, 700);
      box(ctx, 45, 655, 510, 130, '3と5の両方の倍数', 'x % 3 == 0 and x % 5 == 0\n\n2つの比較が両方TrueならTrue', { fill: '#fff8f0', stroke: '#e3d2bf' });
      box(ctx, 625, 655, 510, 130, '配列を関数へ渡す', 'len(X) → forで全要素を処理\n各要素をTrue / Falseへ更新\nreturn X', { fill: '#f8fafb' });

      text(ctx, 'D　バブルソート：隣接要素を比較して交換', 45, 845, 15, C.navy, 700);
      const nums=[6,1,8,3,5];
      nums.forEach((v,i)=>{rr(ctx,55+i*125,885,100,62,i<2?'#fff8f0':'#eef6fa','#d8e1e6',7);text(ctx,String(v),105+i*125,916,18,i<2?C.orange:C.navy,700,'center','middle');});
      text(ctx, '比較：6 > 1 → 交換', 680, 916, 12, C.orange, 700);
      arrow(ctx, 155, 960, 180, 960, C.orange, 2); arrow(ctx, 180, 980, 155, 980, C.orange, 2);
      nums.splice(0,2,1,6);
      nums.forEach((v,i)=>{rr(ctx,55+i*125,990,100,62,i<2?'#f4f9f7':'#eef6fa','#d8e1e6',7);text(ctx,String(v),105+i*125,1021,18,i<2?C.teal:C.navy,700,'center','middle');});
      box(ctx, 700, 870, 435, 180, '教材コードの構造', 'for i in range(n):\n　for j in range(n-i-1):\n　　if X[j] > X[j+1]:\n　　　tempを使って交換\n\n→ [1,3,5,6,8]', { fill: '#f8fafb', bs: 10.2 });
      rr(ctx, 45, 1065, 1090, 30, '#f5f9fb', '#d5e2e8', 7);
      text(ctx, '関数は「引数で受け取る → 処理する → returnで返す」という流れで追う。', 590, 1080, 10.2, C.gray, 700, 'center', 'middle');
    }
  });

  K.register('b6-8', {
    title: '【発展】Web API・JSON・CSV：外部データをPythonで利用する流れ',
    height: 1120,
    caption: 'Web API→JSON→辞書型→キーと，CSV→pandas→DataFrame→ラベル名の2経路を原教材どおり分けて整理する。',
    question: 'CSV形式のデータを教材でDataFrameへ変換するために使う関数は何ですか。',
    answer: 'pandas.read_csv()。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head } = k;
      head(ctx, '【発展】Web APIや外部データの活用', '外部データは「取得方法」「データ形式」「Python内の型」「値の取り出し方」を順に分けて追う。');

      text(ctx, 'A　Web APIからJSONを取得する', 45, 120, 15, C.navy, 700);
      box(ctx, 45, 155, 250, 115, 'クライアント', "zipcode='1310045'\nrequests.get(...) を実行", { fill: '#eef6fa', stroke: '#bfd1db', bs: 10.2 });
      arrow(ctx, 295, 212, 470, 212, C.blue, 2);
      text(ctx, 'HTTP通信', 382, 195, 10, C.blue, 700, 'center');
      box(ctx, 470, 155, 250, 115, 'Web API', '郵便番号から\n住所データを返す', { fill: '#f8fafb' });
      arrow(ctx, 720, 212, 895, 212, C.orange, 2);
      text(ctx, 'JSON形式', 807, 195, 10, C.orange, 700, 'center');
      box(ctx, 895, 155, 240, 115, 'res.text', 'JSON形式の\n文字列を受け取る', { fill: '#fff8f0', stroke: '#e3d2bf' });

      text(ctx, 'B　JSON → 辞書型 → キーで取り出す', 45, 330, 15, C.navy, 700);
      box(ctx, 45, 365, 260, 120, 'JSON文字列', '{ address1,\n address2, address3 ... }', { fill: '#fff8f0', stroke: '#e3d2bf' });
      arrow(ctx, 305, 425, 455, 425, C.orange, 2);
      text(ctx, 'json.loads()', 380, 405, 10.5, C.orange, 700, 'center');
      box(ctx, 455, 365, 320, 120, '辞書型', "address = response['results'][0]\n{ 'address1':'東京都', ... }", { fill: '#eef6fa', stroke: '#bfd1db', bs: 9.8 });
      arrow(ctx, 775, 425, 915, 425, C.teal, 2);
      box(ctx, 915, 365, 220, 120, 'キーでアクセス', "address['address3']\n→ 押上", { fill: '#f4f9f7', stroke: '#cfe1d7', bs: 10.2 });

      text(ctx, 'C　CSV → pandas → DataFrame → ラベル名', 45, 555, 15, C.navy, 700);
      box(ctx, 45, 590, 245, 120, 'CSV形式', 'カンマで区切った\nテキストファイル\n教材例：気象庁データ', { fill: '#fff' });
      arrow(ctx, 290, 650, 430, 650, C.blue, 2);
      text(ctx, 'pandas.read_csv()', 360, 630, 10, C.blue, 700, 'center');
      box(ctx, 430, 590, 280, 120, 'DataFrame', '表形式データとして扱う\n列名・行名などをもつ', { fill: '#eef6fa', stroke: '#bfd1db' });
      arrow(ctx, 710, 650, 850, 650, C.teal, 2);
      box(ctx, 850, 590, 285, 120, 'ラベル名で取り出す', "df['地点']\ndf['今日の最高気温(℃)']", { fill: '#f4f9f7', stroke: '#cfe1d7', bs: 9.8 });

      text(ctx, 'D　読み込んだデータをグラフへ', 45, 780, 15, C.navy, 700);
      rr(ctx, 45, 815, 1090, 170, '#fff', '#d8e1e6', 10);
      box(ctx, 85, 850, 300, 100, 'matplotlib.pyplot', 'import matplotlib.pyplot as plt', { fill: '#f8fafb', bs: 10.2 });
      arrow(ctx, 385, 900, 520, 900, C.blue, 2);
      box(ctx, 520, 850, 565, 100, '散布図', "plt.scatter(df['観測所番号'],\n　　　　　df['今日の最高気温(℃)'])", { fill: '#eef6fa', stroke: '#bfd1db', bs: 10.2 });
      rr(ctx, 45, 1025, 1090, 62, '#f5f9fb', '#d5e2e8', 9);
      wrap(ctx, '整理：Web API経路＝requests → JSON → json.loads → 辞書型 → キー。CSV経路＝read_csv → DataFrame → ラベル名。', 80, 1043, 1020, 18, 10.5, C.gray, 700);
    }
  });
})();