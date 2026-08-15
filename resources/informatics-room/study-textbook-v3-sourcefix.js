/* v3 source-alignment micro patches: keep examples inside the supplied textbook vocabulary. */
(() => {
  const data = window.ELECTRONIC_TEXTBOOK_V3 || {};
  if (data['b5-1']) {
    data['b5-1'].practical = {
      title:'自分の端末の性能表を読む',
      prompt:'ノートPCの仕様に「CPU、メモリ16GB、SSD512GB、USB」と書かれています。それぞれ何を表しているか説明してください。',
      steps:[
        'CPUは演算・制御を担当する。',
        'メモリはCPUと直接データをやり取りする主記憶装置。',
        'SSDは大容量データを長期保存するストレージの一例。',
        'USBは本体と周辺装置を接続する有線インタフェースの例。'
      ],
      answer:'CPUは演算・制御、メモリ16GBは主記憶装置、SSD512GBは補助記憶装置（ストレージ）、USBは周辺装置接続に使う有線インタフェースの例です。'
    };
  }
})();