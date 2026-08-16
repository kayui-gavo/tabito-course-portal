/* 情報Ⅰ v16 — 第4講 原教材準拠図版 */
(() => {
  const K = window.SCIENTIFIC_V12;
  if (!K) return;
  const C = K.C;

  K.register('b4-1', {
    title: '情報デザイン：目的・3側面・3つの表現手法',
    height: 900,
    caption: '原教材の「デザインとアート」「表現・機能・論理」「抽象化・可視化・構造化」を一枚で分離して整理する。',
    question: '長い文章を「行き先・期間・集合場所・集合時間」に分けて整理することは，主にどの手法ですか。',
    answer: '構造化。要素どうしの関係性を分かりやすく整理し，結び付ける手法。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head } = k;
      head(ctx, '情報デザイン', '情報を整理し，分かりやすく伝えるための設計。PART1では主に「表現」の情報デザインを扱う。');

      text(ctx, 'A　デザインとアートを教材の定義で分ける', 45, 120, 15, C.navy, 700);
      box(ctx, 45, 150, 520, 118, 'デザイン', '目的のために，色や形，構造や機能などを計画する。\n商業的・工業的／問題解決的。', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 610, 150, 545, 118, 'アート', '芸術的・問題提起的。\n人によって情報のとらえ方が違ってもよい。', { fill: '#fff8f0', stroke: '#e3d2bf' });

      text(ctx, 'B　情報デザインの3つの側面', 45, 315, 15, C.navy, 700);
      const aspects = [
        ['表現', '分かりやすい表現で伝える', '#eef6fa', C.blue],
        ['機能', 'アプリのボタンなどの\n操作性を高める', '#f4f9f7', C.teal],
        ['論理', '状態遷移の流れなどを\n整理する', '#fff8f0', C.orange]
      ];
      aspects.forEach((a, i) => box(ctx, 45 + i * 370, 350, 335, 105, a[0], a[1], { fill: a[2], stroke: '#d5e0e5', tc: a[3] }));

      text(ctx, 'C　「表現」の3手法', 45, 505, 15, C.navy, 700);
      rr(ctx, 45, 540, 335, 285, '#eef6fa', '#bfd1db', 12);
      text(ctx, '抽象化', 70, 575, 17, C.blue, 700);
      wrap(ctx, '大量の情報から大事なところだけ抜き出す。', 70, 595, 285, 20, 11, C.gray, 400);
      [['自転車', 95, 670], ['トイレ', 215, 670]].forEach(([s, x, y]) => {
        rr(ctx, x, y, 95, 78, '#fff', '#d4dfe4', 10);
        text(ctx, s, x + 47.5, y + 30, 12, C.navy, 700, 'center', 'middle');
        text(ctx, 'ピクトグラム', x + 47.5, y + 58, 9.5, C.gray, 400, 'center', 'middle');
      });
      rr(ctx, 120, 765, 185, 38, '#fff', '#d4dfe4', 8);
      text(ctx, 'カメラアプリのアイコン', 212.5, 785, 10, C.gray, 600, 'center', 'middle');

      rr(ctx, 410, 540, 335, 285, '#f4f9f7', '#cfe1d7', 12);
      text(ctx, '可視化', 435, 575, 17, C.teal, 700);
      wrap(ctx, '情報を視覚的に表現する。', 435, 595, 285, 20, 11, C.gray, 400);
      const vals = [42, 30, 14, 14];
      const labs = ['サッカー', '野球', 'テニス', 'バレー'];
      vals.forEach((v, i) => {
        const x = 445 + i * 64;
        const h = v * 2.15;
        ctx.fillStyle = i === 0 ? C.teal : '#9cb8b4';
        ctx.fillRect(x, 755 - h, 38, h);
        text(ctx, labs[i], x + 19, 775, 9, C.gray, 400, 'center');
      });
      text(ctx, '表の数値 → グラフ', 577, 810, 10.5, C.teal, 700, 'center');

      rr(ctx, 775, 540, 380, 285, '#fff8f0', '#e3d2bf', 12);
      text(ctx, '構造化', 800, 575, 17, C.orange, 700);
      wrap(ctx, '要素どうしの関係性を分かりやすく整理し，結び付ける。', 800, 595, 325, 20, 11, C.gray, 400);
      box(ctx, 840, 665, 245, 48, '修学旅行', '', { fill: '#fff' });
      const items = [['行き先：沖縄', 800], ['期間：6/10〜6/12', 985], ['集合：羽田空港 8:00', 890]];
      items.forEach(([s, x], i) => {
        const y = i < 2 ? 745 : 800;
        box(ctx, x, y, i < 2 ? 150 : 220, 44, s, '', { fill: '#fff' });
      });
      arrow(ctx, 962, 713, 875, 744, C.orange, 1.5);
      arrow(ctx, 962, 713, 1060, 744, C.orange, 1.5);
      arrow(ctx, 962, 713, 1000, 799, C.orange, 1.5);
    }
  });

  K.register('b4-2', {
    title: '機能と論理のデザイン：UI・シグニファイア・遷移',
    height: 960,
    caption: 'CUI・GUI・VUI，デスクトップメタファ，シグニファイア，ユーザビリティ，フェイルセーフ／フールプルーフを原教材の例で区別する。',
    question: '必須項目が未入力なら登録を完了できず，入力を促す設計は何ですか。',
    answer: 'フールプルーフ。人間はミスをすると考え，ミスができないように配慮した設計。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head } = k;
      head(ctx, '機能と論理のデザイン', '機能では直感的に使えるUI，論理ではミスを想定した流れ（遷移）を設計する。');

      text(ctx, 'A　ユーザインタフェース（UI）', 45, 120, 15, C.navy, 700);
      const ui = [
        ['CUI', 'Character UI', 'キーボードで操作'],
        ['GUI', 'Graphical UI', 'マウスで操作'],
        ['VUI', 'Voice UI', '声で操作']
      ];
      ui.forEach((a, i) => box(ctx, 45 + i * 370, 155, 335, 110, a[0], `${a[1]}\n${a[2]}`, { fill: i === 1 ? '#eef6fa' : '#fff', stroke: i === 1 ? '#bfd1db' : '#d8e1e6' }));
      rr(ctx, 45, 290, 1090, 56, '#f5f9fb', '#d5e2e8', 8);
      text(ctx, 'GUI：デスクトップメタファ', 70, 318, 11.5, C.blue, 700);
      wrap(ctx, '画面上を現実世界の作業机に見立てて表現する。', 300, 304, 800, 19, 11, C.gray, 400);

      text(ctx, 'B　シグニファイア＝人間の行動を誘導する手掛かり', 45, 390, 15, C.navy, 700);
      box(ctx, 45, 425, 250, 105, '投入口の形状', 'ゴミの種類に応じて\n入れる場所を誘導', { fill: '#eef6fa' });
      box(ctx, 320, 425, 250, 105, '扉の取っ手', '「引く」行動を\n誘導する', { fill: '#eef6fa' });
      box(ctx, 595, 425, 250, 105, 'リンクの下線', 'クリックできることを\n示す手掛かり', { fill: '#eef6fa' });
      box(ctx, 870, 425, 265, 105, '影と矢印', '「次に進む」ボタンを\n強調する', { fill: '#eef6fa' });
      rr(ctx, 45, 555, 1090, 58, '#fff8f0', '#e3d2bf', 8);
      text(ctx, '教材注', 70, 584, 11, C.orange, 700);
      wrap(ctx, 'シグニファイアはアフォーダンスの概念をもとにしているが，両者は異なる。', 145, 570, 950, 19, 10.8, C.gray, 400);

      text(ctx, 'C　ユーザビリティと「論理」のデザイン', 45, 660, 15, C.navy, 700);
      box(ctx, 45, 695, 330, 105, 'ユーザビリティ', '利用者が使いやすいか，\n分かりやすいかを示す尺度。', { fill: '#f4f9f7', stroke: '#cfe1d7' });
      box(ctx, 410, 695, 330, 105, '流れ（遷移）', '画面などがどの順序で\n移るかを設計する。', { fill: '#f8fafb' });
      box(ctx, 775, 695, 360, 105, 'ミスを想定する', '人間はミスをすることを前提に，\n遷移を設計する。', { fill: '#fff8f0', stroke: '#e3d2bf' });

      text(ctx, 'D　ミスへの備えを区別', 45, 845, 15, C.navy, 700);
      box(ctx, 45, 875, 520, 68, 'フェイルセーフ', '誤って前ページへ戻っても，再度開くと入力内容が残る。', { fill: '#f4f9f7', stroke: '#cfe1d7', tc: C.teal });
      box(ctx, 610, 875, 545, 68, 'フールプルーフ', '必須項目が未入力なら登録を完了できず，入力を促す。', { fill: '#fff8f0', stroke: '#e3d2bf', tc: C.orange });
    }
  });

  K.register('b4-3', {
    title: '全ての人に伝わるデザイン：アクセシビリティとUD',
    height: 950,
    caption: 'カラーバリアフリー，アクセシビリティ，バリアフリー字幕，スマートフォンの支援機能，ユニバーサルデザインを原教材の関係で整理する。',
    question: '教材では，ユーザビリティとアクセシビリティをどのように区別していますか。',
    answer: 'ユーザビリティは「使いやすさ」の尺度，アクセシビリティは「使えるかどうか」の尺度。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head } = k;
      head(ctx, 'バリアフリーとユニバーサルデザイン', '「自分に分かりやすい」だけでなく，さまざまな立場の人に伝わり，使えるデザインを考える。');

      text(ctx, 'A　カラーバリアフリー：色だけに情報を任せない', 45, 120, 15, C.navy, 700);
      rr(ctx, 45, 155, 520, 190, '#fff', '#d8e1e6', 10);
      text(ctx, '色だけ', 70, 185, 12, C.red, 700);
      ctx.fillStyle = '#8aa96b'; ctx.fillRect(100, 220, 110, 80);
      ctx.fillStyle = '#b46a62'; ctx.fillRect(250, 195, 110, 105);
      text(ctx, '情報を色だけで区別', 305, 325, 10, C.gray, 400, 'center');
      rr(ctx, 610, 155, 545, 190, '#f4f9f7', '#cfe1d7', 10);
      text(ctx, '文字・数字も加える', 635, 185, 12, C.teal, 700);
      ctx.fillStyle = '#8aa96b'; ctx.fillRect(670, 220, 110, 80);
      ctx.fillStyle = '#b46a62'; ctx.fillRect(820, 195, 110, 105);
      text(ctx, '反対 40', 725, 260, 11, '#fff', 700, 'center', 'middle');
      text(ctx, '賛成 60', 875, 245, 11, '#fff', 700, 'center', 'middle');
      text(ctx, '色を識別しにくくても判断しやすい', 882, 325, 10, C.gray, 400, 'center');

      text(ctx, 'B　アクセシビリティとユーザビリティ', 45, 395, 15, C.navy, 700);
      box(ctx, 45, 430, 520, 105, 'アクセシビリティ', '幅広い人が「使えるかどうか」の尺度。\n例：文字を大きくする／音声読み上げに対応。', { fill: '#eef6fa', stroke: '#bfd1db' });
      box(ctx, 610, 430, 545, 105, 'ユーザビリティ', '利用者にとって「使いやすいか・分かりやすいか」の尺度。', { fill: '#f8fafb' });

      text(ctx, 'C　情報面のバリアフリー', 45, 590, 15, C.navy, 700);
      box(ctx, 45, 625, 520, 115, 'バリアフリー字幕', '会話だけでなく，効果音や発話者に関する情報も含む字幕。', { fill: '#fff8f0', stroke: '#e3d2bf' });
      box(ctx, 610, 625, 545, 115, 'スマートフォンの支援機能', '音声読み上げなどのアクセシビリティ機能が標準搭載されている場合が多い。', { fill: '#eef6fa', stroke: '#bfd1db' });

      text(ctx, 'D　バリアフリーとユニバーサルデザインの違い', 45, 795, 15, C.navy, 700);
      box(ctx, 45, 825, 520, 92, 'バリアフリー', '既にある障壁を取り除く。', { fill: '#fff', stroke: '#d8e1e6' });
      box(ctx, 610, 825, 545, 92, 'ユニバーサルデザイン', '最初から障壁がないように設計する。\n例：触れて分かるシャンプー容器／弱い力で閉じられるホチキス。', { fill: '#f4f9f7', stroke: '#cfe1d7', tc: C.teal });
    }
  });

  K.register('b4-4', {
    title: 'Webページと情報デザイン：HTML・alt・CSS・構成ファイル',
    height: 1040,
    caption: 'HTMLをブラウザが解釈する流れ，見出し構造，alt属性，Webサイトの構成ファイル，CSSとカラーコード，Webサーバを原教材の範囲で整理する。',
    question: 'alt属性は教材で何のために使う属性として説明されていますか。',
    answer: '画像の代替テキストを指定するための属性。音声読み上げソフトの読み上げ対象となり，サイトのアクセシビリティを高める。',
    draw(ctx, k) {
      const { text, wrap, rr, box, line, arrow, head } = k;
      head(ctx, 'Webページと情報デザイン', 'HTMLで内容・構造を記述し，CSSでデザインを適用する。Webページ自体も情報デザインの題材になる。');

      text(ctx, 'A　HTMLファイルをWebブラウザが解釈して表示する', 45, 120, 15, C.navy, 700);
      box(ctx, 45, 155, 410, 105, 'HTMLファイル', '<h1>見出し</h1>\n<img src="pen.png" alt="ペンギンの顔写真">', { fill: '#eef6fa', stroke: '#bfd1db' });
      arrow(ctx, 480, 207, 690, 207, C.blue, 2);
      text(ctx, 'ブラウザが解釈', 585, 190, 10.5, C.blue, 700, 'center');
      box(ctx, 715, 155, 440, 105, 'Webブラウザの画面', '見出し・画像などを\n画面に表示する', { fill: '#f8fafb' });

      text(ctx, 'B　見出しとalt属性は「構造」と「伝達」に関わる', 45, 315, 15, C.navy, 700);
      box(ctx, 45, 350, 520, 112, '<h1> 見出し </h1>', '見出しは文書の階層構造を表す。\nhの後の数字が小さいほど大きな見出し。', { fill: '#fff' });
      box(ctx, 610, 350, 545, 112, 'alt属性', '画像の代替テキスト。\n音声読み上げソフトの読み上げ対象となり，アクセシビリティを高める。', { fill: '#eef6fa', stroke: '#bfd1db' });

      text(ctx, 'C　Webサイトの構成要素は1つのフォルダにまとめる', 45, 520, 15, C.navy, 700);
      rr(ctx, 45, 555, 1110, 165, '#fff', '#d8e1e6', 10);
      const files = [
        ['HTML', 80, '#eef6fa'], ['CSS', 280, '#f4f9f7'], ['画像', 480, '#fff8f0'], ['JavaScript', 680, '#f8fafb'], ['動画', 920, '#fff']
      ];
      files.forEach(([s, x, fill]) => box(ctx, x, 600, s === 'JavaScript' ? 190 : 150, 74, s, '', { fill, stroke: '#d4dfe4' }));
      text(ctx, 'HTMLから同じフォルダ内のCSS・画像・JavaScript・動画などを読み込める', 600, 700, 10.5, C.gray, 400, 'center');

      text(ctx, 'D　CSSとカラーコード', 45, 775, 15, C.navy, 700);
      box(ctx, 45, 810, 520, 118, 'CSS', 'HTML文書にデザインを適用する技術。\nHTMLと組み合わせてWebページの分かりやすさを向上させる。', { fill: '#f4f9f7', stroke: '#cfe1d7' });
      rr(ctx, 610, 810, 545, 118, '#fff8f0', '#e3d2bf', 10);
      text(ctx, 'カラーコード', 635, 842, 13, C.orange, 700);
      text(ctx, '# rr gg bb', 875, 872, 22, C.navy, 700, 'center');
      text(ctx, 'red', 790, 905, 10, C.red, 700, 'center');
      text(ctx, 'green', 875, 905, 10, C.teal, 700, 'center');
      text(ctx, 'blue', 960, 905, 10, C.blue, 700, 'center');

      rr(ctx, 45, 970, 1110, 50, '#f5f9fb', '#d5e2e8', 8);
      text(ctx, 'Webサーバに構成要素を置く → 世界からアクセス・閲覧可能。HTML/CSSを直接編集しない視覚的なWebページ作成ソフトもある。', 600, 995, 10.5, C.gray, 600, 'center', 'middle');
    }
  });
})();