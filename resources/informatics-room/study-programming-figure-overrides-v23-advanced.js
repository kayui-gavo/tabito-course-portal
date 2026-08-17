/* 情報Ⅰ＜プログラミング編＞ v23 — 上級編の例題/確認問題の役割が混ざりやすい図を教材構造に再整合 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const C=K.C;
  const configs={
    p42:{
      title:'素因数分解：例題の「約数列挙」と確認問題の「素因数分解」を分けて読む',height:820,
      caption:'教材第42講は、例題で36の約数を平方根まで調べてペアで列挙し、確認問題でwhile文による素因数分解へ進む。題名だけで例題コードを素因数分解と読み替えない。',
      question:'例題で i=6 のとき 6 を2回追加しないのはなぜですか。',answer:'36=6×6 ではペアの2つが同じ約数だから。i != pair_yakusuu のときだけペア側を追加する。',
      draw(ctx,k){const {text,wrap,rr,box,arrow,head,table}=k;head(ctx,'素因数分解','教材は「A 例題：36の約数列挙」→「B 確認問題：素因数分解」の順。2つのアルゴリズムを分けて見る。');
        text(ctx,'A　例題：number = 36 の約数を平方根まで探索',45,120,15,C.navy,700);table(ctx,45,155,680,245,['i','36 % i','pair = 36 // i','追加する約数'],[['1','0','36','1, 36'],['2','0','18','2, 18'],['3','0','12','3, 12'],['4','0','9','4, 9'],['5','1','—','なし'],['6','0','6','6だけ']],{fs:9.5,headFill:'#eff5f8'});box(ctx,770,165,365,105,'探索範囲','for i in range(1, int(36 ** 0.5) + 1)\n→ i = 1〜6',{fill:'#eef6fa'});box(ctx,770,300,365,100,'平方数の重複を防ぐ','if i != pair_yakusuu:\n    Yakusuu.append(pair_yakusuu)',{fill:'#fff8f0',stroke:'#e3d2bf'});box(ctx,45,435,1090,65,'sort後','Yakusuu = [1, 2, 3, 4, 6, 9, 12, 18, 36]',{fill:'#f4f9f7',stroke:'#cfe1d7'});
        text(ctx,'B　確認問題：割り切れる間は同じ i で number を小さくする',45,555,15,C.navy,700);box(ctx,45,590,310,100,'割れない','number % i != 0\n→ i = i + 1',{fill:'#f8fafb'});arrow(ctx,355,640,440,640,C.blue);box(ctx,440,590,320,100,'割れる','Factors.append(i)\nnumber = number // i\n※ i は増やさない',{fill:'#fff8f0',stroke:'#e3d2bf'});arrow(ctx,760,640,845,640,C.orange);box(ctx,845,590,290,100,'終了後','number > 1 なら\n最後の因数を追加',{fill:'#eef6fa'});rr(ctx,45,730,1090,50,'#f5f9fb','#d5e2e8',9);wrap(ctx,'例題の目的は「約数一覧」、確認問題の目的は「素因数の積へ分解」。同じ第42講でもコードの役割は異なる。',70,744,1030,20,11,C.gray,400);
      }
    },
    p44:{
      title:'バブルソートと選択ソート：1周で「どこが確定するか」を比較する',height:820,
      caption:'教材例題は交換法（バブルソート）、確認問題は選択法（選択ソート）。同じDataを昇順にするが、比較対象と各周回で確定する位置が異なる。',
      question:'バブルソートの1周目と選択ソートの1周目では、どの位置の値が確定しますか。',answer:'バブルソートでは最大値90が右端へ確定し、選択ソートでは最小値11が左端へ確定する。',
      draw(ctx,k){const {text,rr,box,arrow,head}=k;head(ctx,'バブルソート・選択ソート','同じ最終結果だけでなく、1周の「比較のしかた」と「確定する側」を見比べる。');const start=[64,34,25,12,22,11,90],bubble=[34,25,12,22,11,64,90],select=[11,34,25,12,22,64,90];const row=(y,arr,label,fixed=-1,color=C.blue)=>{text(ctx,label,45,y+28,11,C.gray,700);arr.forEach((v,i)=>{const x=190+i*125,done=i===fixed;rr(ctx,x,y,100,58,done?'#eef6fa':'#fff',done?'#bfd1db':'#d7e1e6',7);text(ctx,String(v),x+50,y+29,15,done?color:C.navy,700,'center','middle');});};
        text(ctx,'共通の開始配列',45,120,15,C.navy,700);row(150,start,'開始');
        text(ctx,'A　例題：交換法（バブルソート）',45,255,15,C.navy,700);box(ctx,45,290,280,92,'比較','隣接する Data[j] と\nData[j+1] を比べる',{fill:'#f8fafb'});arrow(ctx,325,336,405,336,C.blue);box(ctx,405,290,300,92,'交換条件','Data[j] > Data[j+1]\nなら temp で交換',{fill:'#fff8f0'});arrow(ctx,705,336,785,336,C.orange);box(ctx,785,290,350,92,'1周目の意味','大きい値が右へ送られ\n右端の 90 が確定',{fill:'#eef6fa'});row(410,bubble,'1周目後',6,C.blue);
        text(ctx,'B　確認問題：選択法（選択ソート）',45,515,15,C.navy,700);box(ctx,45,550,280,92,'探索','未確定部分から\nmin_index を探す',{fill:'#f8fafb'});arrow(ctx,325,596,405,596,C.blue);box(ctx,405,550,300,92,'更新条件','Data[j] < Data[min_index]\nなら min_index = j',{fill:'#fff8f0'});arrow(ctx,705,596,785,596,C.orange);box(ctx,785,550,350,92,'1周目の意味','最小値を先頭と交換し\n左端の 11 が確定',{fill:'#eef6fa'});row(665,select,'1周目後',0,C.teal);rr(ctx,45,755,1090,38,'#f5f9fb','#d5e2e8',9);text(ctx,'最終結果はいずれも [11,12,22,25,34,64,90]。違いはそこへ至る比較・確定のしかた。',590,774,10.5,C.gray,600,'center','middle');
      }
    },
    p46:{
      title:'待ち行列：ラーメン店の座席状態から交通信号の渋滞状態へ',height:830,
      caption:'教材例題は8席それぞれの残り滞在時間とwaitingを1分ごとに更新し、確認問題は10秒ごとの交通信号でwaitを更新する。どちらも「現在の状態→次の状態」のシミュレーション。',
      question:'ラーメン店で seats[i] > 0 のとき、なぜ seats[i] を1減らすのですか。',answer:'seats[i] はその客が店を出るまでの残り時間を表し、1分進むごとに残り時間が1分減るから。',
      draw(ctx,k){const {text,wrap,rr,box,arrow,head}=k;head(ctx,'待ち行列','A 例題は「席ごとの残り時間」、B 確認問題は「全体の渋滞台数」。時間を1ステップ進める更新式を読む。');
        text(ctx,'A　例題：8席のラーメン店',45,120,15,C.navy,700);box(ctx,45,155,250,105,'到着','arrival = 0〜2\nwaiting += arrival',{fill:'#eef6fa'});arrow(ctx,295,207,365,207,C.blue);box(ctx,365,155,330,105,'使用中の席','if seats[i] > 0:\n    seats[i] = seats[i] - 1',{fill:'#fff8f0',stroke:'#e3d2bf'});arrow(ctx,695,207,765,207,C.orange);box(ctx,765,155,370,105,'空席 + 待ち客あり','elif waiting > 0:\n    seats[i] = 13\n    waiting -= 1',{fill:'#f4f9f7'});text(ctx,'seats の8要素は「あと何分その席が使用中か」',45,300,11,C.gray,600);const vals=[12,7,0,4,0,13,2,0];vals.forEach((v,i)=>{const x=70+i*130;rr(ctx,x,335,105,55,v===0?'#fff':'#eef6fa','#d7e1e6',7);text(ctx,String(v),x+52,362,14,v===0?C.gray:C.blue,700,'center','middle');});
        text(ctx,'B　確認問題：交通信号と渋滞台数',45,445,15,C.navy,700);box(ctx,45,480,250,100,'10秒ごとの到着','arrive = 5〜10台',{fill:'#eef6fa'});arrow(ctx,295,530,365,530,C.blue);box(ctx,365,480,330,100,'信号周期','mod=(t-1)%9+1\nmod<=6 → 青\nそれ以外 → 赤',{fill:'#f8fafb'});arrow(ctx,695,530,765,530,C.blue);box(ctx,765,465,370,115,'青信号','wait = max(wait + arrive - 10, 0)\n最大10台が通過',{fill:'#eef6fa'});box(ctx,765,610,370,95,'赤信号','wait = wait + arrive\n通過できない',{fill:'#fff8f0',stroke:'#e3d2bf'});rr(ctx,45,745,1090,45,'#f5f9fb','#d5e2e8',9);wrap(ctx,'乱数で到着数は変わっても、状態更新の規則は固定。教材の実行結果はその規則による一例として読む。',70,756,1030,18,10.5,C.gray,400);
      }
    },
    p47:{
      title:'パリティチェック：偶数パリティからJANチェックディジットへ',height:830,
      caption:'教材例題は偶数パリティでビット列の誤りを検出し、確認問題はJANコードのチェックディジットを計算する。どちらも教材では誤りをチェックする処理として扱われる。',
      question:'偶数パリティでデータ部1010の末尾へ0を付けるのはなぜですか。',answer:'1010には1が2個あり既に偶数なので、パリティビット0を付けても全体の1の個数が偶数のままだから。',
      draw(ctx,k){const {text,rr,box,arrow,head}=k;head(ctx,'パリティチェック','A 例題：1の個数を偶数にするパリティbit。B 確認問題：JANの12桁から13桁目のcheck digitを求める。');
        text(ctx,'A　例題：偶数パリティ',45,120,15,C.navy,700);box(ctx,45,155,300,100,'データ部 1010','1の個数 = 2（偶数）',{fill:'#f8fafb'});arrow(ctx,345,205,425,205,C.blue);box(ctx,425,155,300,100,'必要な parity_bit','count % 2 == 0\n→ parity_bit = 0',{fill:'#eef6fa'});arrow(ctx,725,205,805,205,C.teal);box(ctx,805,155,330,100,'送るビット列','1010 + 0\n→ 10100',{fill:'#f4f9f7'});box(ctx,45,295,300,100,'データ部 1000','1の個数 = 1（奇数）',{fill:'#f8fafb'});arrow(ctx,345,345,425,345,C.blue);box(ctx,425,295,300,100,'必要な parity_bit','count % 2 != 0\n→ parity_bit = 1',{fill:'#fff8f0'});arrow(ctx,725,345,805,345,C.orange);box(ctx,805,295,330,100,'送るビット列','1000 + 1\n→ 10001',{fill:'#f4f9f7'});
        text(ctx,'B　確認問題：13桁JANコード',45,465,15,C.navy,700);box(ctx,45,500,300,105,'奇数桁の和','1,3,5,…,11桁\n→ odd_sum',{fill:'#fff8f0'});arrow(ctx,345,552,425,552,C.orange);box(ctx,425,500,300,105,'偶数桁の和','2,4,6,…,12桁\n→ even_sum × 3',{fill:'#eef6fa'});arrow(ctx,725,552,805,552,C.blue);box(ctx,805,500,330,105,'重み付き合計','total = odd_sum\n      + even_sum * 3',{fill:'#f8fafb'});box(ctx,250,655,700,90,'チェックディジット','ones_place = total % 10\n1の位が0なら0，それ以外は 10 - ones_place',{fill:'#eef6fa'});rr(ctx,45,775,1090,28,'#f5f9fb','#d5e2e8',9);text(ctx,'JANでは13桁目は計算に入れず、先頭12桁から求めた値と13桁目を比較する。',590,790,10,C.gray,600,'center','middle');
      }
    }
  };
  const baseRender=window.renderStudyLesson;
  function replace(){
    const id=new URLSearchParams(location.search).get('id')||'',lesson=typeof studyLessonById==='function'?studyLessonById(id):null,config=configs[id];
    if(!lesson||lesson.track!=='programming'||!config)return;
    if(document.querySelector(`[data-program-figure-v23="${id}"]`))return;
    const old=document.querySelector(`figure[data-figure-v12="${id}"]`);
    const section=K.makeSection(id,config);section.dataset.programFigureV23=id;
    if(old)old.replaceWith(section);else{const target=document.querySelector('.program-source-v9')||document.querySelector('.program-example-v6')||document.querySelector('#example');if(target)target.insertAdjacentElement('afterend',section);else document.querySelector('.lesson-paper')?.appendChild(section);}
    K.bindSection(section,config);
  }
  window.PROGRAM_FIGURE_V23_ADVANCED_COUNT=Object.keys(configs).length;
  window.renderStudyLesson=function renderProgramFiguresV23Advanced(){baseRender();replace();};
})();