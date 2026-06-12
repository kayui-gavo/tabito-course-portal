# 情報Ⅰ教材サイト 参考資料カバレッジ監査

作業日: 2026-06-13

## 確認したローカル資料

- `reference/mext-informatics/course-guideline-info.txt`
- `reference/mext-informatics/teacher-training/00-cover-intro.txt`
- `reference/mext-informatics/teacher-training/01-information-society.txt`
- `reference/mext-informatics/teacher-training/02-communication-design.txt`
- `reference/mext-informatics/teacher-training/03-computer-programming.txt`
- `reference/mext-informatics/teacher-training/04-network-data.txt`

## 範囲確認

第1章 情報社会の問題解決:
- 既存: 情報、セキュリティ、個人情報、メディアリテラシーの一部。
- 今回整備: 知的財産権、問題解決の流れ。
- 未整備: 情報社会の光と影、法規・モラルの体系、技術発展の社会的影響。

第2章 コミュニケーションと情報デザイン:
- 既存: ビット・バイト、2進数、画像、音、情報デザイン。
- 今回整備: 文字のディジタル化、16進数。
- 未整備: 通信モデル、アクセシビリティ、動画、圧縮、デザイン手順の個別ページ。

第3章 コンピュータとプログラミング:
- 既存: 入力処理出力、変数、代入、分岐、反復、配列、探索、整列、関数、API、モデル化。
- 今回強化: 変数、条件分岐、繰り返し、配列、関数、デバッグ、API、疑似コード、フローチャートの説明・例題・追跡表・Python例。
- 未整備: 論理演算、データ構造の発展、外部装置制御の個別ページ。

第4章 情報通信ネットワークとデータの活用:
- 既存: パケット、IPアドレス、ネットワーク構築、データ形式、データベース、統計、可視化、相関、外れ値。
- 今回整備: プロトコル、暗号化とデジタル署名。
- 未整備: DNS、ルーティング詳細、DBMS、クロス集計、回帰分析。

## 今回の実装方針

- 公開ページは「朴素な教材サイト」の読みやすさを維持し、短い導入、図解、詳しい説明、例題、練習問題、共通テスト風確認の順でそろえる。
- 内部資料名や作業指示は公開ページへ出さない。
- 第2章の文字・16進数は、現行サイト構造に合わせて「デジタルにするということ」に配置する。
- 総合問題「学校サイト公開前のチェック」を、権利、個人情報、セキュリティ、プロトコル、暗号化、情報デザインへ横断的に接続する。
