/* 情報Ⅰ v15 — 第3講 PART8 原教材準拠図版 */
(() => {
  const K = window.SCIENTIFIC_V12;
  if (!K) return;
  const C = K.C;

  K.register('b3-8', {
    title: 'ファイル・拡張子・ZIP：階層と形式を読み分ける',
    height: 930,
    caption: 'フォルダの階層、代表的な拡張子、アーカイブファイルを別々の概念として整理し、教材のZIP例まで一枚で確認する。',
    question: '教材の実践問題では、圧縮しない画像に適した拡張子と、テンポや音程を変更する作業に適した音声形式はそれぞれ何ですか。',
    answer: '圧縮しない画像は .bmp、テンポや音程を変更する作業には .mid が適する。',
    draw(ctx, k) {
      const { text, wrap, rr, line, arrow, head, cell } = k;
      head(ctx, 'ファイルの種類と拡張子，圧縮と解凍', 'ファイルはフォルダで階層的に整理し、末尾の拡張子で種類を識別する。ZIPは複数のファイルやフォルダを1つにまとめる代表的なアーカイブ形式。');

      text(ctx, 'A　フォルダは階層を作れる', 45, 120, 15, C.navy, 700);
      rr(ctx, 45, 150, 240, 58, '#eef6fa', '#bfd1db', 8);
      text(ctx, '業務改善プロジェクト', 165, 179, 12, C.navy, 700, 'center', 'middle');

      line(ctx, 285, 179, 325, 179, C.gray, 1.5);
      line(ctx, 325, 179, 325, 322, C.gray, 1.5);
      [178, 250, 322].forEach(y => line(ctx, 325, y, 360, y, C.gray, 1.5));

      const level2 = [
        [360, 150, '会議記録', 'フォルダ'],
        [360, 222, '企画書.docx', 'ファイル'],
        [360, 294, '経費.xlsx', 'ファイル']
      ];
      level2.forEach(([x, y, name, kind], i) => {
        rr(ctx, x, y, 220, 56, i === 0 ? '#f5f9fb' : '#fff', '#d6e1e6', 7);
        text(ctx, name, x + 110, y + 22, 11.5, C.dark, 700, 'center', 'middle');
        text(ctx, kind, x + 110, y + 42, 9.5, C.gray, 400, 'center', 'middle');
      });

      line(ctx, 580, 178, 620, 178, C.gray, 1.5);
      line(ctx, 620, 145, 620, 325, C.gray, 1.5);
      [145, 205, 265, 325].forEach(y => line(ctx, 620, y, 650, y, C.gray, 1.5));
      const nested = [
        ['議事録_1012.docx', 118],
        ['議事録_1013.docx', 178],
        ['プレゼン資料.pptx', 238],
        ['写真.jpg', 298]
      ];
      nested.forEach(([name, y]) => {
        rr(ctx, 650, y, 265, 54, '#fff', '#d9e2e6', 7);
        text(ctx, name, 782.5, y + 27, 10.5, C.dark, 650, 'center', 'middle');
      });
      rr(ctx, 945, 150, 205, 174, '#fffaf4', '#e5d4c2', 8);
      text(ctx, '拡張子', 965, 178, 11.5, C.orange, 700);
      text(ctx, '写真 . jpg', 1048, 212, 15, C.navy, 700, 'center');
      line(ctx, 1013, 222, 1084, 222, C.orange, 1.5);
      text(ctx, '末尾の文字列で種類を識別', 1048, 247, 10, C.gray, 400, 'center');
      wrap(ctx, 'アイコンは環境や利用者の設定で変わるため、ファイルの種類は拡張子で確認する。', 965, 270, 165, 17, 10, C.gray, 400);

      text(ctx, 'B　教材で扱う代表的な拡張子', 45, 380, 15, C.navy, 700);
      const drawTable = (x, y, w, rows) => {
        const rh = 34, catW = 82, extW = 92, descW = w - catW - extW;
        cell(ctx, x, y, catW, rh, '種類', { head: true, fill: '#eff5f8', fs: 10 });
        cell(ctx, x + catW, y, extW, rh, '拡張子', { head: true, fill: '#eff5f8', fs: 10 });
        cell(ctx, x + catW + extW, y, descW, rh, '教材での説明', { head: true, fill: '#eff5f8', fs: 10 });
        rows.forEach((r, i) => {
          const yy = y + rh * (i + 1);
          cell(ctx, x, yy, catW, rh, r[0], { fs: 10 });
          cell(ctx, x + catW, yy, extW, rh, r[1], { fs: 10.5, fill: '#f8fbfc' });
          cell(ctx, x + catW + extW, yy, descW, rh, r[2], { fs: 10 });
        });
      };

      drawTable(45, 410, 535, [
        ['画像', '.bmp', '非圧縮'],
        ['画像', '.png', '可逆圧縮・イラストや図'],
        ['画像', '.jpg', '非可逆圧縮・写真'],
        ['音声', '.wav', '非圧縮'],
        ['音声', '.mp3', '非可逆圧縮'],
        ['音声', '.mid', '音色・音程・音の長さを記録']
      ]);
      drawTable(620, 410, 535, [
        ['動画', '.mp4', '一般的な動画形式'],
        ['文書', '.pdf', '環境に依存しない文書形式'],
        ['データ', '.txt', 'テキスト形式'],
        ['データ', '.csv', 'カンマ区切り・データ分析'],
        ['実行', '.exe', 'Windowsの実行形式'],
        ['Office', '.docx', 'Word'],
        ['Office', '.xlsx', 'Excel'],
        ['Office', '.pptx', 'PowerPoint']
      ]);

      text(ctx, 'C　アーカイブファイル：複数を1つにまとめる', 45, 755, 15, C.navy, 700);
      text(ctx, '圧縮前 8.53MB', 45, 785, 11, C.orange, 700);
      [['オルゴール.wav', 45], ['ドラム.wav', 220], ['バイオリン.wav', 395]].forEach(([name, x]) => {
        rr(ctx, x, 805, 150, 62, '#fff', '#d7e1e6', 7);
        text(ctx, name, x + 75, 836, 10, C.dark, 650, 'center', 'middle');
      });
      arrow(ctx, 565, 836, 790, 836, C.orange, 2);
      text(ctx, 'ZIP形式：まとめる + 圧縮', 678, 817, 10.5, C.orange, 700, 'center');
      rr(ctx, 815, 793, 335, 84, '#eef6fa', '#bfd1db', 9);
      text(ctx, '音楽データ.zip', 982, 820, 13, C.navy, 700, 'center');
      text(ctx, '圧縮後 6.43MB', 982, 847, 11, C.blue, 700, 'center');
      text(ctx, 'ZIPファイルにはパスワードを設定することもできる。', 815, 900, 10, C.gray, 400);
    }
  });
})();