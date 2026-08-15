/* 情報Ⅰ v12 — v11高精細図版にもv12と同じ「図を見て考える」を付与 */
(() => {
  const baseRender=window.renderStudyLesson;
  const prompts={
    'b3-4':['標本化周波数や量子化bit数を上げると、なぜ元の音を細かく表せる一方でデータ量も増えるのですか。','1秒あたりの標本数や1標本あたりのbit数が増えるため。時間方向・振幅方向の情報が細かくなる代わりに、保存するbit数も増える。'],
    'b5-1':['メモリとストレージを「容量が大きい/小さい」だけでなく、CPUとの関係と用途で説明できますか。','メモリはCPUが処理中の命令・データを置く主記憶、ストレージは大容量データを長期保存する補助記憶。役割が異なる。'],
    'b5-3':['2進数1桁の加算で、1+1のときC=1、S=0になる理由を説明できますか。','1+1=10₂なので、下位bitの和Sは0、上位桁への桁上りCarry Outが1になる。'],
    'b6-1':['フローチャート・アクティビティ図・状態遷移図を、見た目ではなく「何を表す図か」で区別できますか。','フローチャートは単一処理の流れ、アクティビティ図は並行して行われる処理、状態遷移図は状態と遷移条件を表す。'],
    'b8-1':['家庭や学校のLANからインターネットへ出るとき、ハブ・アクセスポイント・ルータ・ISPの役割を順に説明できますか。','ハブ/APはLAN内端末を接続し、ルータが異なるネットワーク間を中継し、ISPの接続サービスを通じてインターネットへつながる。'],
    'b8-2':['TCP/IPの4階層で、HTTP・TCP・IP・無線LANをそれぞれどの層へ置くか説明できますか。','HTTPはアプリケーション層、TCPはトランスポート層、IPはインターネット層、無線LANはネットワークインタフェース層。'],
    'b8-3':['Web閲覧とメール送信で、DNS・HTTP/HTTPS・SMTP・POP/IMAPはどの場面で使われますか。','DNSは名前解決、HTTP/HTTPSはWebの送受信、SMTPはメール送信・サーバ間転送、POP/IMAPは受信側でメールを利用する。'],
    'b8-5':['公開鍵暗号とデジタル署名で「誰の公開鍵/秘密鍵を使うか」が逆向きになる理由を目的から説明できますか。','秘密通信では受信者だけが読めるよう受信者の公開鍵で暗号化し受信者の秘密鍵で復号する。署名では送信者本人を確認するため送信者の秘密鍵で署名し公開鍵で検証する。'],
    'b8-7':['データベースの選択・射影・結合を、行・列・複数テーブルのどれを操作するかで説明できますか。','選択は条件に合う行、射影は必要な列、結合は関連する複数テーブルをキーなどでつないで1つの結果にする。'],
    'b9-4':['回帰直線がデータ点をすべて通らないのに予測に使えるのはなぜですか。また残差とは何ですか。','回帰直線は全体の傾向を表す近似直線で、各点との差が残差。最小二乗法では残差の二乗和が小さくなる直線を求める。']
  };
  function bridge(){const id=new URLSearchParams(location.search).get('id')||'',qa=prompts[id],fig=document.querySelector('.scientific-figure-v11');if(!qa||!fig||fig.querySelector('.scientific-question-v12'))return;const d=document.createElement('details');d.className='scientific-question-v12';d.innerHTML=`<summary>図を見て考える</summary><p>${qa[0]}</p><div class="scientific-question-answer-v12" hidden>${qa[1]}</div><button type="button" data-v12-answer>考えた後に答えを見る</button>`;fig.appendChild(d);d.querySelector('[data-v12-answer]').addEventListener('click',e=>{const ans=d.querySelector('.scientific-question-answer-v12');ans.hidden=!ans.hidden;e.currentTarget.textContent=ans.hidden?'考えた後に答えを見る':'答えを閉じる';});}
  window.renderStudyLesson=function renderV11QuestionBridgeV12(){baseRender();bridge();};
})();