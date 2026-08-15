/* 情報Ⅰ＜プログラミング編＞ v9 — advanced source-alignment fixes */
(() => {
  const a=window.PROGRAM_ADVANCED_V9||{};
  if(a.p44){
    a.p44.title='バブルソートと選択ソートを「何が確定するか」で比較する';
    a.p44.conditions=['バブルソートは隣接要素を比較・交換する','選択ソートは未確定部分から最小値を探す','各周回後にどの位置が確定したかを確認する'];
    a.p44.code=`# バブルソート\nA = [5,2,4,1]\nfor end in range(len(A)-1,0,-1):\n    for i in range(end):\n        if A[i] > A[i+1]:\n            A[i], A[i+1] = A[i+1], A[i]\nprint(A)\n\n# 選択ソート\nB = [5,2,4,1]\nfor i in range(len(B)-1):\n    min_index = i\n    for j in range(i+1,len(B)):\n        if B[j] < B[min_index]:\n            min_index = j\n    B[i], B[min_index] = B[min_index], B[i]\nprint(B)`;
    a.p44.focus='バブルソートでは右側の最大値、選択ソートでは左側の最小値が、1周ごとに確定していく点を比べる。';
    a.p44.check='どちらも [1,2,4,5] になるが、「隣接比較」と「最小値選択」という処理の違いを途中配列で説明できる。';
  }
  if(a.p45){
    a.p45.title='友人関係を2次元配列から取り出す';
    a.p45.conditions=['友人でない関係を0、友人関係を1で表す','Human.index(name)で調べたい人の行番号を得る','その行で1の列に対応する人をFriendsへ追加する'];
    a.p45.code=`Data = [\n [0,1,1,0],\n [1,0,1,1],\n [1,1,0,0],\n [0,1,0,0]\n]\nHuman = ['A','B','C','D']\nFriends = []\nname = 'B'\nname_index = Human.index(name)\nfor i in range(len(Data)):\n    if Data[name_index][i] == 1:\n        Friends.append(Human[i])\nprint(Friends)`;
    a.p45.focus='Data[name_index][i] は「調べたい人の行」を左から見る。教材の友人関係は相互的なので行列は対称になる。';
    a.p45.check='Bの行 [1,0,1,1] から、友人は A・C・D と読み取れる。';
  }
})();