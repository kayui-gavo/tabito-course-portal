/* 情報Ⅰ＜プログラミング編＞ v9 — 中級19講の追加転移演習 */
(() => {
  const Q=(title,code,q,a,point)=>({title,code,q,a,point});
  window.PROGRAM_MIDDLE_V9={
    p15:Q('引数を変えて関数を追う',`def triple(x):\n    y = 3 * x\n    return y\n\nresult = triple(4)`,'result の値を答え、x と y がどの順で決まるか説明してください。','result=12。呼び出し時に x=4 となり、y=3×4=12、return で12が呼び出し元へ返る。','実引数→仮引数→関数内部→戻り値の順を追う。'),
    p16:Q('乱数を配列の添字へつなぐ',`import random\nJanken = ['グー','チョキ','パー']\nnumber = random.randint(0,2)\nprint(Janken[number])`,'表示され得る値をすべて答え、number が 0〜2 でなければならない理由を説明してください。','グー、チョキ、パーのいずれか。3要素の配列の有効な添字が0,1,2だから。','乱数の範囲と配列の添字範囲を対応させる。'),
    p17:Q('2次元配列を行・列で読む',`Data = [[10,20,30],[40,50,60]]\nprint(Data[1][2])`,'表示値と、[1][2] が表のどこを指すか説明してください。','60。外側の添字1で2行目 [40,50,60]、内側の添字2でその3番目の要素60を選ぶ。','0始まりの行・列を二段階で読む。'),
    p18:Q('入力とコンピュータの選択を分ける',`import random\nHand = ['グー','チョキ','パー']\nuser = input('手:')\ncomputer = random.choice(Hand)`,'user と computer にはそれぞれ何が入り、役割がどう違うか説明してください。','user は利用者が入力した文字列、computer は Hand から random.choice が選んだ1要素。','人の入力と乱数による選択を別変数として追う。'),
    p19:Q('配列を関数へ渡して合計する',`def calculate_sum(Arr):\n    total = 0\n    for num in Arr:\n        total = total + num\n    return total\n\nNumbers = [3,7,10]\nprint(calculate_sum(Numbers))`,'表示値と total の変化を書いてください。','20。total は0→3→10→20と変化し、20がreturnされる。','配列引数と累積変数を同時に追う。'),
    p20:Q('1からnまでを漏れなく足す',`def calculate_sum(n):\n    total = 0\n    for i in range(1,n+1):\n        total = total + i\n    return total\n\nprint(calculate_sum(7))`,'表示値を答え、なぜ range(1,n+1) なのか説明してください。','28。range の終了値は含まれないため、nまで含めるには終了値をn+1にする。','rangeの終端と累積処理を結び付ける。'),
    p21:Q('境界値で条件を検査する',`def check_size(h):\n    if h < 150:\n        return 'S'\n    elif h < 160:\n        return 'M'\n    else:\n        return 'L'`,'h=149,150,159,160 の戻り値を順に答えてください。','S, M, M, L。elif は最初の h<150 がFalseだった場合に h<160 を判定する。','境界値の直前・境界・直後を試す。'),
    p22:Q('一時変数で値を失わず交換する',`a = 9\nb = 4\ntemp = a\na = b\nb = temp`,'最後の a,b を答え、temp が必要な理由を説明してください。','a=4, b=9。最初のa=9をtempへ退避しないと、a=bで9を失ってしまう。','交換を「退避→上書き→復元」の3段階で追う。'),
    p23:Q('合計と平均を分けて求める',`Data = [10,20,30,40]\ntotal = 0\nfor num in Data:\n    total = total + num\naverage = total / len(Data)`,'total と average を答えてください。','total=100、average=25。要素数はlen(Data)=4。','累積値と要素数を混同しない。'),
    p24:Q('入れ子の全組合せを列挙する',`for i in range(2):\n    for j in range(3):\n        print(i,j)`,'出力される (i,j) を順にすべて書いてください。','(0,0),(0,1),(0,2),(1,0),(1,1),(1,2)。外側1回につき内側が3回動く。','入れ子ループは変数の組で追う。'),
    p25:Q('走査しながら条件に合う値だけ足す',`Data = [1,2,3,4,5]\ntotal = 0\nfor x in Data:\n    if x % 2 == 1:\n        total = total + x`,'最後の total と、加算される要素を答えてください。','total=9。1,3,5だけが条件 x%2==1 を満たす。','反復とifを「判定列＋累積列」で追う。'),
    p26:Q('最大候補を更新する',`X = [6,1,8,3,5]\ntemp = X[0]\nfor i in range(1,len(X)):\n    if X[i] > temp:\n        temp = X[i]`,'temp が更新される回と最終値を答えてください。','初期値6。1では更新なし、8でtemp=8、その後3,5では更新なし。最終値8。','候補が変わる回だけを抽出する。'),
    p27:Q('whileの判定と更新順を読む',`count = 4\nwhile count > 1:\n    print(count)\n    count = count - 1`,'表示される値を順に答え、最後に count がいくつで終了するか説明してください。','4,3,2を表示し、更新後count=1で条件 count>1 がFalseとなって終了する。','判定→出力→更新→再判定を循環して追う。'),
    p28:Q('whileの中で条件に合う回数を数える',`n = 1\ncount = 0\nwhile n <= 6:\n    if n % 2 == 0:\n        count = count + 1\n    n = n + 1`,'最後の count と、n の更新をifの外に置く理由を答えてください。','count=3（2,4,6）。nは毎回更新しないと、条件によって同じnのまま反復し続ける可能性がある。','反復を進める更新と分岐処理を分ける。'),
    p29:Q('余りを前へ連結して2進文字列を作る',`num = 19\nbinary = ''\nwhile num > 0:\n    remainder = num % 2\n    binary = str(remainder) + binary\n    num = num // 2`,'最後の binary を答え、余りを前に連結する理由を説明してください。','10011。2で割った余りは下位bitから得られるため、得た余りを文字列の前へ追加する。','商と余り、bitの並ぶ向きを同時に理解する。'),
    p30:Q('比較と交換で並べ替える',`A = [3,1,2]\nif A[0] > A[1]:\n    A[0],A[1] = A[1],A[0]\nif A[1] > A[2]:\n    A[1],A[2] = A[2],A[1]`,'2回の比較後の A を答えてください。完全に昇順になっていますか。','[1,2,3]。この例では2回で昇順になる。一般の長い配列では比較・交換を複数周回繰り返す必要がある。','途中配列を必ず書く。'),
    p31:Q('条件に合う要素を別配列へ追加する',`Data = [2,7,4,9]\nResult = []\nfor x in Data:\n    if x >= 5:\n        Result.append(x)`,'最後の Result を答えてください。','[7,9]。条件を満たした要素だけがappendで末尾へ追加される。','append前後の配列を追う。'),
    p32:Q('2次元配列を二重反復で走査する',`Data = [[1,2],[3,4]]\ntotal = 0\nfor i in range(2):\n    for j in range(2):\n        total = total + Data[i][j]`,'Data[i][j] を読む順番と最後の total を答えてください。','1→2→3→4の順に読み、total=10。外側iが行、内側jが列を進む。','二重反復と2次元添字を対応させる。'),
    p33:Q('キーで値を取り出す',`student = {'name':'A','score':82}\nprint(student['score'])`,'表示値と、配列の添字による参照との違いを説明してください。','82。辞書型は位置番号ではなくキー score を指定して対応する値を取り出す。','「位置で取る配列」と「キーで取る辞書」を区別する。')
  };

  const KEY='tabito-info-middle-draft-v9';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(_){return{};}};
  const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v));}catch(_){}};
  const baseRender=window.renderStudyLesson;
  function current(){const id=new URLSearchParams(location.search).get('id')||'';return {id,lesson:typeof studyLessonById==='function'?studyLessonById(id):null};}
  function html(id,d){const stored=read()[id]||'';return `<section class="program-middle-v9" data-program-middle-v9>
    <header><span>TRANSFER PRACTICE</span><h3>${escapeHTML(d.title)}</h3><p>教材の例題と同じ考え方を、値や場面を変えてもう一度使います。</p></header>
    <pre><code>${escapeHTML(d.code)}</code></pre>
    <p class="program-middle-v9-q">${escapeHTML(d.q)}</p>
    <label><span>自分の答え・途中の値</span><textarea rows="4" data-middle-draft>${escapeHTML(stored)}</textarea><small>この端末に自動保存</small></label>
    <details><summary>解答・考え方を確認する</summary><p>${escapeHTML(d.a)}</p><b>確認する力</b><p>${escapeHTML(d.point)}</p></details>
  </section>`;}
  window.renderStudyLesson=function renderMiddleProgrammingV9(){baseRender();const {id,lesson}=current();const d=(window.PROGRAM_MIDDLE_V9||{})[id];if(!lesson||lesson.track!=='programming'||!d)return;const check=document.querySelector('#check');if(check&&!document.querySelector('[data-program-middle-v9]')){check.insertAdjacentHTML('beforebegin',html(id,d));const ta=document.querySelector('[data-middle-draft]');ta?.addEventListener('input',()=>{const all=read();all[id]=ta.value;save(all);});}};
})();