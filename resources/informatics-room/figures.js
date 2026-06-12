function svgWrap(label, inner, viewBox = '0 0 720 260') {
  return `<figure class="figure-box" aria-label="${label}"><svg viewBox="${viewBox}" role="img" aria-label="${label}">${inner}</svg><figcaption>${label}</figcaption></figure>`;
}

const box = (x, y, w, h, text, fill = '#f7fff2') => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#4f6848"/>
  <text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="18">${text}</text>`;
const arrow = (x1, y1, x2, y2) => `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333" stroke-width="2"/>
  <polygon points="${x2},${y2} ${x2 - 9},${y2 - 5} ${x2 - 9},${y2 + 5}" fill="#333"/>`;

const FIGURES = {
  dataInfoDecision: () => svgWrap('データから判断までの流れ',
    `${box(30,90,130,58,'データ','#eef7ff')}${arrow(170,119,230,119)}${box(240,90,160,58,'文脈をつける','#fff8df')}${arrow(410,119,470,119)}${box(480,90,130,58,'情報','#eef7ea')}${arrow(615,119,675,119)}<text x="355" y="190" text-anchor="middle" font-size="17">例：25 → 気温25℃ → 半袖でよさそう</text>`, '0 0 720 230'),
  thermometerContext: () => svgWrap('同じ数字でも文脈で意味が変わる',
    `${box(40,30,130,55,'25','#fff')}${box(220,30,150,55,'25℃','#eef7ea')}${box(420,30,180,55,'25点','#fff3e8')}<text x="105" y="130" text-anchor="middle" font-size="16">数字だけ</text><text x="295" y="130" text-anchor="middle" font-size="16">気温なら情報</text><text x="510" y="130" text-anchor="middle" font-size="16">点数なら別の意味</text>`, '0 0 650 170'),
  bitSwitch: () => svgWrap('1 bit は 0 または 1',
    `<circle cx="150" cy="100" r="42" fill="#fff" stroke="#333"/><text x="150" y="107" text-anchor="middle" font-size="28">0</text><circle cx="340" cy="100" r="42" fill="#fff8df" stroke="#333"/><text x="340" y="107" text-anchor="middle" font-size="28">1</text>${arrow(195,100,295,100)}<text x="245" y="150" text-anchor="middle" font-size="16">2つの状態</text>`, '0 0 500 190'),
  bitPatterns: () => svgWrap('bit数が増えると組み合わせは2倍',
    `${box(35,35,120,42,'1 bit: 2通り')}${box(210,25,160,42,'2 bit: 4通り')}${box(425,15,190,42,'3 bit: 8通り')}<text x="95" y="115" text-anchor="middle" font-size="15">0, 1</text><text x="290" y="115" text-anchor="middle" font-size="15">00, 01, 10, 11</text><text x="520" y="115" text-anchor="middle" font-size="15">000 から 111 まで</text>`, '0 0 660 160'),
  binaryPlace: () => svgWrap('2進数の位取り',
    `<g font-size="17" text-anchor="middle"><rect x="80" y="50" width="560" height="80" fill="#fff" stroke="#333"/><line x1="220" y1="50" x2="220" y2="130" stroke="#333"/><line x1="360" y1="50" x2="360" y2="130" stroke="#333"/><line x1="500" y1="50" x2="500" y2="130" stroke="#333"/><text x="150" y="82">8の位</text><text x="290" y="82">4の位</text><text x="430" y="82">2の位</text><text x="570" y="82">1の位</text><text x="150" y="114">1</text><text x="290" y="114">0</text><text x="430" y="114">1</text><text x="570" y="114">1</text></g><text x="360" y="190" text-anchor="middle" font-size="20">1011₂ = 8 + 0 + 2 + 1 = 11₁₀</text>`),
  decimalToBinary: () => svgWrap('10進数から2進数へ',
    `${box(60,70,120,50,'11')}${arrow(190,95,260,95)}${box(270,50,130,42,'8を使う')}${box(270,105,130,42,'残り3')}${arrow(410,95,480,95)}${box(490,50,140,42,'2を使う')}${box(490,105,140,42,'1を使う')}<text x="360" y="190" text-anchor="middle" font-size="17">8,4,2,1 の順に、使うなら1、使わないなら0</text>`),
  pixelGrid: () => svgWrap('画像は画素の集まり',
    `<g transform="translate(130 35)">${Array.from({length: 6}).map((_, r) => Array.from({length: 8}).map((_, c) => `<rect x="${c*45}" y="${r*32}" width="43" height="30" fill="${(r+c)%3===0?'#333':(r+c)%3===1?'#ddd':'#88b'}" stroke="#fff"/>`).join('')).join('')}</g><text x="360" y="245" text-anchor="middle" font-size="17">一つ一つの小さな点を「画素」といいます。</text>`),
  rgbPixel: () => svgWrap('RGBで色を表す',
    `<rect x="85" y="80" width="90" height="90" fill="rgb(230,30,30)" stroke="#333"/><rect x="225" y="80" width="90" height="90" fill="rgb(30,180,70)" stroke="#333"/><rect x="365" y="80" width="90" height="90" fill="rgb(50,80,230)" stroke="#333"/><rect x="525" y="80" width="90" height="90" fill="rgb(230,180,60)" stroke="#333"/><text x="130" y="200" text-anchor="middle" font-size="16">R</text><text x="270" y="200" text-anchor="middle" font-size="16">G</text><text x="410" y="200" text-anchor="middle" font-size="16">B</text><text x="570" y="200" text-anchor="middle" font-size="16">組合せ</text>`),
  imageSize: () => svgWrap('画素数とデータ量',
    `${box(70,55,150,55,'横 × 縦')}${arrow(230,82,310,82)}${box(320,55,160,55,'画素数')}${arrow(490,82,570,82)}${box(580,55,100,55,'データ量')}<text x="360" y="155" text-anchor="middle" font-size="17">画素が増えるほど、保存する値も増えます。</text>`),
  soundSampling: () => svgWrap('標本化：波を点で測る',
    `<path d="M50 130 C110 40,170 220,230 130 S350 40,410 130 S530 220,590 130 S680 40,710 130" fill="none" stroke="#235f9f" stroke-width="3"/><g fill="#a35e12">${[80,130,180,230,280,330,380,430,480,530,580,630].map((x,i)=>`<circle cx="${x}" cy="${130 + Math.sin(i)*45}" r="5"/>`).join('')}</g><text x="360" y="230" text-anchor="middle" font-size="17">一定間隔で値を測ります。</text>`),
  quantization: () => svgWrap('量子化：値を段階に丸める',
    `<polyline points="70,160 130,160 130,120 190,120 190,80 250,80 250,120 310,120 310,160 370,160 370,120 430,120 430,80 490,80 490,120 550,120 550,160 610,160" fill="none" stroke="#1f7a45" stroke-width="4"/><g stroke="#ddd">${[80,120,160,200].map(y=>`<line x1="60" y1="${y}" x2="630" y2="${y}"/>`).join('')}</g><text x="360" y="230" text-anchor="middle" font-size="17">細かすぎる値を、決められた段階に丸めます。</text>`),
  soundBits: () => svgWrap('符号化：数値をビット列へ',
    `${box(70,80,120,48,'数値')}${arrow(205,104,290,104)}${box(305,80,140,48,'2進数')}${arrow(460,104,545,104)}${box(560,80,120,48,'010101')}<text x="360" y="180" text-anchor="middle" font-size="17">コンピュータが保存できる形にします。</text>`),
  inputProcessOutput: () => svgWrap('入力・処理・出力',
    `${box(60,85,140,58,'入力')}${arrow(210,114,290,114)}${box(305,85,140,58,'処理')}${arrow(455,114,535,114)}${box(550,85,140,58,'出力')}`),
  cardSort: () => svgWrap('カードを並べ替える手順',
    `<g>${[5,2,8,1].map((n,i)=>`<rect x="${80+i*70}" y="55" width="48" height="68" fill="#fff" stroke="#333"/><text x="${104+i*70}" y="97" text-anchor="middle" font-size="24">${n}</text>`).join('')}</g>${arrow(370,90,450,90)}<g>${[1,2,5,8].map((n,i)=>`<rect x="${480+i*50}" y="55" width="42" height="68" fill="#eef7ea" stroke="#333"/><text x="${501+i*50}" y="97" text-anchor="middle" font-size="22">${n}</text>`).join('')}</g><text x="360" y="180" text-anchor="middle" font-size="17">同じ目的でも、手順の良し悪しがあります。</text>`),
  branchFlow: () => svgWrap('条件分岐のフローチャート',
    `<polygon points="360,40 470,100 360,160 250,100" fill="#fff8df" stroke="#333"/><text x="360" y="106" text-anchor="middle" font-size="16">雨？</text>${arrow(250,100,150,100)}${box(25,75,110,50,'傘を持つ','#eef7ea')}${arrow(470,100,570,100)}${box(585,75,110,50,'持たない','#eef7ff')}<text x="195" y="88" font-size="15">はい</text><text x="510" y="88" font-size="15">いいえ</text>`),
  comparisonTable: () => svgWrap('比較演算子',
    `<g font-size="16"><text x="100" y="60">a == b</text><text x="270" y="60">等しい</text><text x="100" y="105">a &gt; b</text><text x="270" y="105">a が大きい</text><text x="100" y="150">a &lt;= b</text><text x="270" y="150">a が b 以下</text></g><rect x="65" y="30" width="520" height="150" fill="none" stroke="#8aa"/>`),
  loopFlow: () => svgWrap('繰り返しの流れ',
    `${box(70,80,110,50,'初期値')}${arrow(190,105,270,105)}${box(285,80,110,50,'処理')}${arrow(405,105,485,105)}<polygon points="560,55 650,105 560,155 470,105" fill="#fff8df" stroke="#333"/><text x="560" y="111" text-anchor="middle" font-size="15">続ける?</text><path d="M560 155 L560 210 L285 210 L285 135" fill="none" stroke="#333" stroke-width="2"/><polygon points="285,135 280,145 290,145" fill="#333"/>`),
  sumTrace: () => svgWrap('1から10まで足す',
    `${box(55,55,100,42,'合計=0')}${arrow(165,76,235,76)}${box(245,55,130,42,'1を足す')}${arrow(385,76,455,76)}${box(465,55,130,42,'2を足す')}<text x="360" y="150" text-anchor="middle" font-size="17">同じ形の処理を、数を変えながら繰り返します。</text>`),
  packetFlow: () => svgWrap('メッセージをパケットに分ける',
    `${box(40,75,150,55,'大きなデータ')}${arrow(200,102,265,102)}${box(280,45,95,42,'packet 1')}${box(390,75,95,42,'packet 2')}${box(500,105,95,42,'packet 3')}${arrow(610,102,675,102)}<text x="360" y="200" text-anchor="middle" font-size="17">小さく分けると、ネットワークで扱いやすくなります。</text>`),
  packetReassemble: () => svgWrap('受信側で並べ直す',
    `${box(70,55,100,42,'3番')}${box(210,100,100,42,'1番')}${box(350,70,100,42,'2番')}${arrow(470,96,545,96)}${box(560,55,120,42,'1,2,3')}`),
  ipHomeNetwork: () => svgWrap('家庭内ネットワークとIPアドレス',
    `${box(45,60,120,50,'スマホ')}${box(45,145,120,50,'PC')}${box(275,100,130,55,'ルータ')}${box(545,100,130,55,'インターネット')}${arrow(170,85,265,118)}${arrow(170,170,265,130)}${arrow(410,128,535,128)}<text x="105" y="225" text-anchor="middle" font-size="15">192.168.1.x</text><text x="610" y="225" text-anchor="middle" font-size="15">外のネットワーク</text>`),
  ipPrivateGlobal: () => svgWrap('プライベートIPとグローバルIP',
    `${box(80,55,190,52,'家の中の住所')}${box(450,55,190,52,'外から見える住所')}${arrow(280,81,440,81)}<text x="175" y="145" text-anchor="middle" font-size="16">プライベートIP</text><text x="545" y="145" text-anchor="middle" font-size="16">グローバルIP</text>`),
  databaseTable: () => svgWrap('表・行・列・主キー',
    `<rect x="80" y="35" width="560" height="150" fill="#fff" stroke="#333"/>${[1,2,3].map(i=>`<line x1="80" y1="${35+i*37}" x2="640" y2="${35+i*37}" stroke="#333"/>`).join('')}${[1,2,3].map(i=>`<line x1="${80+i*140}" y1="35" x2="${80+i*140}" y2="185" stroke="#333"/>`).join('')}<text x="150" y="60" text-anchor="middle">生徒ID</text><text x="290" y="60" text-anchor="middle">名前</text><text x="430" y="60" text-anchor="middle">組</text><text x="570" y="60" text-anchor="middle">点数</text><text x="150" y="98" text-anchor="middle">001</text><text x="290" y="98" text-anchor="middle">田中</text><text x="430" y="98" text-anchor="middle">A</text><text x="570" y="98" text-anchor="middle">82</text>`),
  databaseSearch: () => svgWrap('条件で取り出す',
    `${box(60,80,160,50,'点数 >= 80')}${arrow(235,105,320,105)}${box(335,80,150,50,'検索')}${arrow(500,105,585,105)}${box(600,80,90,50,'結果')}`),
  statsNumberLine: () => svgWrap('数直線上のデータ',
    `<line x1="70" y1="130" x2="650" y2="130" stroke="#333" stroke-width="2"/>${[20,30,40,50,60,90].map(v=>`<circle cx="${70+(v-20)*7.25}" cy="130" r="7" fill="#235f9f"/>`).join('')}<text x="360" y="190" text-anchor="middle" font-size="17">右端の外れ値が平均値を引っ張ることがあります。</text>`),
  statsCompare: () => svgWrap('平均値・中央値・最頻値',
    `${box(60,55,150,52,'平均値')}${box(285,55,150,52,'中央値')}${box(510,55,150,52,'最頻値')}<text x="135" y="145" text-anchor="middle" font-size="15">合計÷個数</text><text x="360" y="145" text-anchor="middle" font-size="15">真ん中</text><text x="585" y="145" text-anchor="middle" font-size="15">最も多い値</text>`)
};
