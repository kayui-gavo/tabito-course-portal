(function(){
  const langKey='physicsDemoLang';
  const langs={
    ja:{label:'日本語',html:'ja',demo:'Demo 集へ',physics:'物理ページへ戻る'},
    'zh-CN':{label:'简体中文',html:'zh-CN',demo:'返回演示集',physics:'返回物理主页'},
    'zh-TW':{label:'繁體中文',html:'zh-Hant-TW',demo:'返回演示集',physics:'返回物理首頁'},
    en:{label:'English',html:'en',demo:'Demo Library',physics:'Back to Physics'}
  };
  const M={
    '定常波デモ · 旅人教育共通テスト物理':{'zh-CN':'定常波演示 · 旅人教育共通考试物理','zh-TW':'駐波演示 · 旅人教育共通測驗物理',en:'Standing Wave Demo · Tabito Education Common Test Physics'},
    '気柱共鳴デモ · 旅人教育共通テスト物理':{'zh-CN':'气柱共鸣演示 · 旅人教育共通考试物理','zh-TW':'氣柱共鳴演示 · 旅人教育共通測驗物理',en:'Air Column Resonance Demo · Tabito Education Common Test Physics'},
    'ドップラー効果デモ · 旅人教育共通テスト物理':{'zh-CN':'多普勒效应演示 · 旅人教育共通考试物理','zh-TW':'都卜勒效應演示 · 旅人教育共通測驗物理',en:'Doppler Effect Demo · Tabito Education Common Test Physics'},
    '屈折と全反射デモ · 旅人教育共通テスト物理':{'zh-CN':'折射与全反射演示 · 旅人教育共通考试物理','zh-TW':'折射與全反射演示 · 旅人教育共通測驗物理',en:'Refraction and Total Internal Reflection Demo · Tabito Education Common Test Physics'},
    'レンズ・球面鏡の像デモ · 旅人教育共通テスト物理':{'zh-CN':'透镜与球面镜成像演示 · 旅人教育共通考试物理','zh-TW':'透鏡與球面鏡成像演示 · 旅人教育共通測驗物理',en:'Lenses and Spherical Mirrors Demo · Tabito Education Common Test Physics'},
    'ヤングの実験デモ · 旅人教育共通テスト物理':{'zh-CN':'杨氏双缝演示 · 旅人教育共通考试物理','zh-TW':'楊氏雙狹縫演示 · 旅人教育共通測驗物理',en:'Young’s Double Slit Demo · Tabito Education Common Test Physics'},
    'RC回路デモ · 旅人教育共通テスト物理':{'zh-CN':'RC 回路演示 · 旅人教育共通考试物理','zh-TW':'RC 電路演示 · 旅人教育共通測驗物理',en:'RC Circuit Demo · Tabito Education Common Test Physics'},
    'うなりの可視化デモ · 旅人教育共通テスト物理':{'zh-CN':'拍频可视化演示 · 旅人教育共通考试物理','zh-TW':'拍頻視覺化演示 · 旅人教育共通測驗物理',en:'Beats Visualization Demo · Tabito Education Common Test Physics'},
    '旅人教育｜共通テスト物理':{'zh-CN':'旅人教育｜共通考试物理','zh-TW':'旅人教育｜共通測驗物理',en:'Tabito Education | Common Test Physics'},
    '物理デモ集':{'zh-CN':'物理演示集','zh-TW':'物理演示集',en:'Physics Demo Library'},
    '物理ページへ戻る':{'zh-CN':'返回物理主页','zh-TW':'返回物理首頁',en:'Back to Physics'},
    '波動デモ':{'zh-CN':'波动演示','zh-TW':'波動演示',en:'Wave Demo'},
    'うなりを「見る」・「聞く」':{'zh-CN':'“看见”和“听见”拍频','zh-TW':'「看見」和「聽見」拍頻',en:'See and Hear Beats'},
    '振動数が少しだけ違う 2 つの音を同時に鳴らすと，音が強くなったり弱くなったりします。この周期的な強弱が「うなり」です。':{'zh-CN':'同时发出两个频率略有不同的声音时，声音会周期性变强、变弱。这种周期性强弱就是“拍频”。','zh-TW':'同時發出兩個頻率略有不同的聲音時，聲音會週期性變強、變弱。這種週期性強弱就是「拍頻」。',en:'When two sounds with slightly different frequencies are played together, the loudness periodically rises and falls. This periodic change is called beats.'},
    '440 Hz と 444 Hz を重ねると，1 秒間に約 4 回，音の強弱が変化します。':{'zh-CN':'叠加 440 Hz 和 444 Hz 时，声音强弱约每秒变化 4 次。','zh-TW':'疊加 440 Hz 和 444 Hz 時，聲音強弱約每秒變化 4 次。',en:'Combining 440 Hz and 444 Hz makes the loudness change about 4 times per second.'},
    '1. まず 440 Hz だけ聞く':{'zh-CN':'1. 先只听 440 Hz','zh-TW':'1. 先只聽 440 Hz',en:'1. Listen to 440 Hz only'},
    '音の高さも大きさも、ほぼ一定です。':{'zh-CN':'音高和音量几乎保持不变。','zh-TW':'音高和音量幾乎保持不變。',en:'Both pitch and loudness are nearly constant.'},
    '2. 次に 444 Hz だけ聞く':{'zh-CN':'2. 再只听 444 Hz','zh-TW':'2. 再只聽 444 Hz',en:'2. Listen to 444 Hz only'},
    '少しだけ高い音ですが、単独では強弱は目立ちません。':{'zh-CN':'声音稍微高一点，但单独听时强弱变化不明显。','zh-TW':'聲音稍微高一點，但單獨聽時強弱變化不明顯。',en:'It is slightly higher, but no obvious loudness variation appears by itself.'},
    '3. 最後に合成音を聞く':{'zh-CN':'3. 最后听合成音','zh-TW':'3. 最後聽合成音',en:'3. Listen to the combined sound'},
    '強くなったり弱くなったりする 4 Hz のうなりを確認します。':{'zh-CN':'确认每秒 4 次的强弱变化。','zh-TW':'確認每秒 4 次的強弱變化。',en:'Confirm the 4 Hz beat that rises and falls in loudness.'},
    '音声とうなりの比較':{'zh-CN':'声音与拍频比较','zh-TW':'聲音與拍頻比較',en:'Sound and Beats Comparison'},
    '音 A':{'zh-CN':'声音 A','zh-TW':'聲音 A',en:'Sound A'},
    '音 B':{'zh-CN':'声音 B','zh-TW':'聲音 B',en:'Sound B'},
    '合成音':{'zh-CN':'合成音','zh-TW':'合成音',en:'Combined Sound'},
    '440 Hz の純音':{'zh-CN':'440 Hz 纯音','zh-TW':'440 Hz 純音',en:'440 Hz Pure Tone'},
    '444 Hz の純音':{'zh-CN':'444 Hz 纯音','zh-TW':'444 Hz 純音',en:'444 Hz Pure Tone'},
    '440 Hz + 444 Hz':{'zh-CN':'440 Hz + 444 Hz','zh-TW':'440 Hz + 444 Hz',en:'440 Hz + 444 Hz'},
    '振動数':{'zh-CN':'频率','zh-TW':'頻率',en:'Frequency'},
    '聞こえ方':{'zh-CN':'听感','zh-TW':'聽感',en:'Perception'},
    '一定':{'zh-CN':'稳定','zh-TW':'穩定',en:'Steady'},
    'うなり':{'zh-CN':'拍频','zh-TW':'拍頻',en:'Beats'},
    'ワンワン':{'zh-CN':'周期性强弱','zh-TW':'週期性強弱',en:'Wah-wah'},
    '1 つの音だけなので，音量はほぼ一定に聞こえます。':{'zh-CN':'只有一个声音，所以听起来音量几乎恒定。','zh-TW':'只有一個聲音，所以聽起來音量幾乎恆定。',en:'With only one sound, the loudness is heard as almost constant.'},
    '440 Hz より少しだけ高い音です。単独では強弱の変化は目立ちません。':{'zh-CN':'比 440 Hz 略高。单独听时强弱变化不明显。','zh-TW':'比 440 Hz 略高。單獨聽時強弱變化不明顯。',en:'This tone is slightly higher than 440 Hz. Alone, it has no obvious loudness variation.'},
    '2 つの音の山と山が合うと大きく，山と谷が重なると小さく聞こえます。':{'zh-CN':'两个声音的波峰相遇时声音变大，波峰与波谷重叠时声音变小。','zh-TW':'兩個聲音的波峰相遇時聲音變大，波峰與波谷重疊時聲音變小。',en:'When crests align, the sound is louder; when a crest and trough overlap, it is quieter.'},
    '覚え方':{'zh-CN':'记忆方法','zh-TW':'記憶方式',en:'How to Remember'},
    'うなりの振動数は，2 つの振動数の差':{'zh-CN':'拍频频率等于两个频率之差','zh-TW':'拍頻頻率等於兩個頻率之差',en:'Beat frequency is the difference between the two frequencies'},
    '振動数が近い音を重ねたとき，耳には「高さの中間付近の音」が聞こえ，その音量がゆっくり増減します。増減の回数は 2 つの振動数の差で決まります。':{'zh-CN':'叠加频率接近的声音时，耳朵会听到接近中间音高的声音，其音量缓慢增减。增减次数由两个频率之差决定。','zh-TW':'疊加頻率接近的聲音時，耳朵會聽到接近中間音高的聲音，其音量緩慢增減。增減次數由兩個頻率之差決定。',en:'When nearby frequencies overlap, the ear hears a pitch near the middle while the loudness slowly rises and falls. The rate of this change is determined by the frequency difference.'},
    'うなりが聞こえる条件：2 つの振動数が近い。':{'zh-CN':'听到拍频的条件：两个频率接近。','zh-TW':'聽到拍頻的條件：兩個頻率接近。',en:'Condition for beats: the two frequencies are close.'},
    '音の高さは平均付近、音の大きさが周期的に変化する。':{'zh-CN':'音高接近平均值，音量周期性变化。','zh-TW':'音高接近平均值，音量週期性變化。',en:'Pitch is near the average; loudness changes periodically.'},
    '差':{'zh-CN':'差','zh-TW':'差',en:'Difference'},
    '授業で見る順番':{'zh-CN':'课堂观察顺序','zh-TW':'課堂觀察順序',en:'Classroom viewing order'},
    '公式・重要結論':{'zh-CN':'公式・重要结论','zh-TW':'公式・重要結論',en:'Formulas and Key Results'},
    'ポイント：':{'zh-CN':'要点：','zh-TW':'重點：',en:'Key Point: '},
    '式：':{'zh-CN':'公式：','zh-TW':'公式：',en:'Formula: '},
    '見方：':{'zh-CN':'看法：','zh-TW':'觀察方式：',en:'How to Read It: '},
    '波動：重ね合わせ':{'zh-CN':'波动：叠加','zh-TW':'波動：疊加',en:'Waves: Superposition'},
    '定常波と節・腹':{'zh-CN':'定常波与节・腹','zh-TW':'駐波與節・腹',en:'Standing Waves: Nodes and Antinodes'},
    '同じ振動数・同じ振幅の波が反対向きに進むと、合成波はその場で振動する形になります。動かない点が節、大きく動く点が腹です。':{'zh-CN':'频率和振幅相同的两列波反向传播时，合成波会形成原地振动的图形。不动的点是节，振动最大的点是腹。','zh-TW':'頻率和振幅相同的兩列波反向傳播時，合成波會形成原地振動的圖形。不動的點是節，振動最大的點是腹。',en:'When two waves with the same frequency and amplitude travel in opposite directions, the resultant wave vibrates in place. Points that do not move are nodes; points with maximum amplitude are antinodes.'},
    '弦の両端固定：λ = 2L/n':{'zh-CN':'弦两端固定：λ = 2L/n','zh-TW':'弦兩端固定：λ = 2L/n',en:'String fixed at both ends: λ = 2L/n'},
    '1. 青と橙を見る':{'zh-CN':'1. 先看蓝色和橙色','zh-TW':'1. 先看藍色和橙色',en:'1. Watch the blue and orange waves'},
    '右向き・左向きの波はどちらも進んでいます。':{'zh-CN':'向右和向左的波都在传播。','zh-TW':'向右和向左的波都在傳播。',en:'Both the right-moving and left-moving waves are traveling.'},
    '2. 緑の合成波を見る':{'zh-CN':'2. 看绿色合成波','zh-TW':'2. 看綠色合成波',en:'2. Watch the green resultant wave'},
    '節は動かず、腹だけ大きく振動します。':{'zh-CN':'节不动，只有腹大幅振动。','zh-TW':'節不動，只有腹大幅振動。',en:'Nodes do not move, while antinodes vibrate strongly.'},
    '3. n を変える':{'zh-CN':'3. 改变 n','zh-TW':'3. 改變 n',en:'3. Change n'},
    '腹の数が増えると、波長は短くなります。':{'zh-CN':'腹的数量增加时，波长会变短。','zh-TW':'腹的數量增加時，波長會變短。',en:'As the number of antinodes increases, the wavelength becomes shorter.'},
    '参考音 340 Hz':{'zh-CN':'参考音 340 Hz','zh-TW':'參考音 340 Hz',en:'Reference Tone 340 Hz'},
    '弦の定常波を音として聞くと、節と腹そのものは見えないが、決まった振動数だけが強く鳴ります。':{'zh-CN':'把弦的定常波听成声音时，看不见节和腹本身，但特定频率会明显变强。','zh-TW':'把弦的駐波聽成聲音時，看不見節和腹本身，但特定頻率會明顯變強。',en:'When a standing wave on a string is heard as sound, the nodes and antinodes are not visible, but specific frequencies resonate strongly.'},
    '腹の数 n：':{'zh-CN':'腹的数量 n：','zh-TW':'腹的數量 n：',en:'Number of antinodes n: '},
    '時間の進み方：':{'zh-CN':'时间速度：','zh-TW':'時間速度：',en:'Time speed: '},
    '倍':{'zh-CN':'倍','zh-TW':'倍',en:'x'},
    '右向きの波':{'zh-CN':'向右的波','zh-TW':'向右的波',en:'Right-moving wave'},
    '左向きの波':{'zh-CN':'向左的波','zh-TW':'向左的波',en:'Left-moving wave'},
    '合成波':{'zh-CN':'合成波','zh-TW':'合成波',en:'Resultant wave'},
    '節：変位が常に ': {'zh-CN':'节：位移始终为 ','zh-TW':'節：位移始終為 ',en:'Node: displacement is always '},
    '腹：振幅が最大になる点。':{'zh-CN':'腹：振幅最大的点。','zh-TW':'腹：振幅最大的點。',en:'Antinode: a point where the amplitude is maximum.'},
    '両端固定の弦：':{'zh-CN':'两端固定的弦：','zh-TW':'兩端固定的弦：',en:'String fixed at both ends: '},
    '固定端':{'zh-CN':'固定端','zh-TW':'固定端',en:'Fixed end'},
    '節':{'zh-CN':'节','zh-TW':'節',en:'Node'},
    '腹':{'zh-CN':'腹','zh-TW':'腹',en:'Antinode'},
    '波動：気柱共鳴':{'zh-CN':'波动：气柱共鸣','zh-TW':'波動：氣柱共鳴',en:'Waves: Air Column Resonance'},
    '気柱共鳴と開管・閉管':{'zh-CN':'气柱共鸣与开管・闭管','zh-TW':'氣柱共鳴與開管・閉管',en:'Air Column Resonance: Open and Closed Pipes'},
    '管の端では、開いている端が腹、閉じている端が節になります。開管と閉管では許される波長が変わるため、共鳴する振動数も変わります。':{'zh-CN':'在管口边界，开口端为腹，闭口端为节。开管和闭管允许的波长不同，所以共鸣频率也不同。','zh-TW':'在管口邊界，開口端為腹，閉口端為節。開管和閉管允許的波長不同，所以共鳴頻率也不同。',en:'At the pipe boundary, an open end is an antinode and a closed end is a node. Open and closed pipes allow different wavelengths, so their resonant frequencies differ.'},
    '開管：f = n v/2L　閉管：f = (2n - 1)v/4L':{'zh-CN':'开管：f = n v/2L　闭管：f = (2n - 1)v/4L','zh-TW':'開管：f = n v/2L　閉管：f = (2n - 1)v/4L',en:'Open pipe: f = n v/2L   Closed pipe: f = (2n - 1)v/4L'},
    '1. 開管を見る':{'zh-CN':'1. 观察开管','zh-TW':'1. 觀察開管',en:'1. Observe the open pipe'},
    '両端が開いているので、両端が腹になります。':{'zh-CN':'两端都开口，所以两端都是腹。','zh-TW':'兩端都開口，所以兩端都是腹。',en:'Both ends are open, so both ends are antinodes.'},
    '2. 閉管へ切り替える':{'zh-CN':'2. 切换到闭管','zh-TW':'2. 切換到閉管',en:'2. Switch to the closed pipe'},
    '閉じた端は節、開いた端は腹になります。':{'zh-CN':'闭口端是节，开口端是腹。','zh-TW':'閉口端是節，開口端是腹。',en:'The closed end is a node, and the open end is an antinode.'},
    '3. 音を比べる':{'zh-CN':'3. 比较声音','zh-TW':'3. 比較聲音',en:'3. Compare the sounds'},
    '同じ長さでも、閉管の基本音は開管より低くなります。':{'zh-CN':'即使长度相同，闭管的基音也比开管低。','zh-TW':'即使長度相同，閉管的基音也比開管低。',en:'For the same length, the closed pipe has a lower fundamental tone than the open pipe.'},
    '開管 基本音 213 Hz':{'zh-CN':'开管 基音 213 Hz','zh-TW':'開管 基音 213 Hz',en:'Open Pipe Fundamental 213 Hz'},
    '開管 第2音 425 Hz':{'zh-CN':'开管 第 2 音 425 Hz','zh-TW':'開管 第 2 音 425 Hz',en:'Open Pipe Second Harmonic 425 Hz'},
    '閉管 基本音 106 Hz':{'zh-CN':'闭管 基音 106 Hz','zh-TW':'閉管 基音 106 Hz',en:'Closed Pipe Fundamental 106 Hz'},
    '閉管 第3倍音 319 Hz':{'zh-CN':'闭管 第 3 倍音 319 Hz','zh-TW':'閉管 第 3 倍音 319 Hz',en:'Closed Pipe Third Harmonic 319 Hz'},
    '両端が腹。明るい響き。':{'zh-CN':'两端为腹，声音较明亮。','zh-TW':'兩端為腹，聲音較明亮。',en:'Both ends are antinodes; the sound is brighter.'},
    '開管では 2 倍音も共鳴する。':{'zh-CN':'开管也会产生 2 倍音共鸣。','zh-TW':'開管也會產生 2 倍音共鳴。',en:'An open pipe can also resonate at the second harmonic.'},
    '片端が節。低く聞こえる。':{'zh-CN':'一端为节，听起来较低。','zh-TW':'一端為節，聽起來較低。',en:'One end is a node; the sound is lower.'},
    '閉管では偶数倍音が出にくい。':{'zh-CN':'闭管中偶数倍音不容易出现。','zh-TW':'閉管中偶數倍音不容易出現。',en:'Even harmonics are suppressed in a closed pipe.'},
    '開管':{'zh-CN':'开管','zh-TW':'開管',en:'Open pipe'},
    '閉管':{'zh-CN':'闭管','zh-TW':'閉管',en:'Closed pipe'},
    '管の長さ L：':{'zh-CN':'管长 L：','zh-TW':'管長 L：',en:'Pipe length L: '},
    '次数 n：':{'zh-CN':'次数 n：','zh-TW':'次數 n：',en:'Mode n: '},
    '開管：両端が腹。':{'zh-CN':'开管：两端为腹。','zh-TW':'開管：兩端為腹。',en:'Open pipe: both ends are antinodes.'},
    '閉管：閉端が節、開端が腹。':{'zh-CN':'闭管：闭口端为节，开口端为腹。','zh-TW':'閉管：閉口端為節，開口端為腹。',en:'Closed pipe: the closed end is a node and the open end is an antinode.'},
    '閉管では基本振動の波長が ': {'zh-CN':'闭管中基音波长为 ','zh-TW':'閉管中基音波長為 ',en:'For a closed pipe, the fundamental wavelength is '},
    '波動：ドップラー効果':{'zh-CN':'波动：多普勒效应','zh-TW':'波動：都卜勒效應',en:'Waves: Doppler Effect'},
    'ドップラー効果':{'zh-CN':'多普勒效应','zh-TW':'都卜勒效應',en:'Doppler Effect'},
    'このデモは「観測者は静止、音源だけが動く」場合です。音源が観測者へ近づく前方では波面の間隔が狭くなり、高い音に聞こえます。遠ざかる後方では波面の間隔が広がり、低い音に聞こえます。':{'zh-CN':'这个演示对应「观察者静止、只有声源运动」的情况。声源接近观察者的前方，波面间隔变窄，听到的声音变高；远离的后方，波面间隔变宽，听到的声音变低。','zh-TW':'這個演示對應「觀察者靜止、只有聲源運動」的情況。聲源接近觀察者的前方，波面間距變窄，聽到的聲音變高；遠離的後方，波面間距變寬，聽到的聲音變低。',en:'This demo treats the case where the observer is stationary and only the source moves. In front of an approaching source, wavefront spacing becomes shorter and the sound is higher; behind it, spacing becomes longer and the sound is lower.'},
    '静止観測者・運動音源：前方 f\' = f v/(v - vs)　後方 f\' = f v/(v + vs)':{'zh-CN':'静止观察者・运动声源：前方 f\' = f v/(v - vs)　后方 f\' = f v/(v + vs)','zh-TW':'靜止觀察者・運動聲源：前方 f\' = f v/(v - vs)　後方 f\' = f v/(v + vs)',en:'Stationary observer, moving source: front f\' = f v/(v - vs), rear f\' = f v/(v + vs)'},
    '前方で聞こえる音':{'zh-CN':'前方听到的声音','zh-TW':'前方聽到的聲音',en:'Sound heard in front'},
    '後方で聞こえる音':{'zh-CN':'后方听到的声音','zh-TW':'後方聽到的聲音',en:'Sound heard behind'},
    '音源の速さ vs：':{'zh-CN':'声源速度 vs：','zh-TW':'聲源速度 vs：',en:'Source speed vs: '},
    '音源の振動数 f：':{'zh-CN':'声源频率 f：','zh-TW':'聲源頻率 f：',en:'Source frequency f: '},
    '屈折と全反射':{'zh-CN':'折射与全反射','zh-TW':'折射與全反射',en:'Refraction and Total Internal Reflection'},
    '波動：屈折':{'zh-CN':'波动：折射','zh-TW':'波動：折射',en:'Waves: Refraction'},
    '光が境界面を通るとき、n1 sinθ1 = n2 sinθ2 が成り立ちます。密な媒質から疎な媒質へ出るとき、条件によっては全反射が起こります。':{'zh-CN':'光通过介质交界面时，满足 n1 sinθ1 = n2 sinθ2。从折射率较大的介质进入较小的介质时，满足条件会发生全反射。','zh-TW':'光通過介質交界面時，滿足 n1 sinθ1 = n2 sinθ2。從折射率較大的介質進入較小的介質時，滿足條件會發生全反射。',en:'When light crosses a boundary, n1 sinθ1 = n2 sinθ2 holds. Total internal reflection can occur when light goes from a higher-index medium to a lower-index medium.'},
    '入射角 θ1：':{'zh-CN':'入射角 θ1：','zh-TW':'入射角 θ1：',en:'Incident angle θ1: '},
    '上側の屈折率 n1：':{'zh-CN':'上侧折射率 n1：','zh-TW':'上側折射率 n1：',en:'Upper refractive index n1: '},
    '下側の屈折率 n2：':{'zh-CN':'下侧折射率 n2：','zh-TW':'下側折射率 n2：',en:'Lower refractive index n2: '},
    '屈折角 θ2 = ': {'zh-CN':'折射角 θ2 = ','zh-TW':'折射角 θ2 = ',en:'Refracted angle θ2 = '},
    '全反射':{'zh-CN':'全反射','zh-TW':'全反射',en:'Total internal reflection'},
    '屈折率が大きい媒質へ進むので、法線に近づきます。':{'zh-CN':'进入折射率较大的介质，所以光线靠近法线。','zh-TW':'進入折射率較大的介質，所以光線靠近法線。',en:'The ray enters a medium with a higher refractive index, so it bends toward the normal.'},
    '屈折率が小さい媒質へ進むので、法線から遠ざかります。':{'zh-CN':'进入折射率较小的介质，所以光线远离法线。','zh-TW':'進入折射率較小的介質，所以光線遠離法線。',en:'The ray enters a medium with a lower refractive index, so it bends away from the normal.'},
    '波動：レンズ・球面鏡':{'zh-CN':'波动：透镜・球面镜','zh-TW':'波動：透鏡・球面鏡',en:'Waves: Lenses and Spherical Mirrors'},
    '薄いレンズと球面鏡の像':{'zh-CN':'薄透镜与球面镜成像','zh-TW':'薄透鏡與球面鏡成像',en:'Images from Thin Lenses and Spherical Mirrors'},
    '凸レンズ、凹レンズ、凹面鏡、凸面鏡を同じ式で比べます。実像はスクリーンに映せる像、虚像は光線の延長線上に見える像です。':{'zh-CN':'用同一个公式比较凸透镜、凹透镜、凹面镜和凸面镜。实像可以投到屏幕上，虚像出现在光线延长线上。','zh-TW':'用同一個公式比較凸透鏡、凹透鏡、凹面鏡和凸面鏡。實像可以投到螢幕上，虛像出現在光線延長線上。',en:'Compare convex lenses, concave lenses, concave mirrors, and convex mirrors with the same equation. A real image can be projected on a screen; a virtual image appears on extensions of rays.'},
    '光学素子':{'zh-CN':'光学元件','zh-TW':'光學元件',en:'Optical element'},
    '凸レンズ':{'zh-CN':'凸透镜','zh-TW':'凸透鏡',en:'Convex lens'},
    '凹レンズ':{'zh-CN':'凹透镜','zh-TW':'凹透鏡',en:'Concave lens'},
    '凹面鏡':{'zh-CN':'凹面镜','zh-TW':'凹面鏡',en:'Concave mirror'},
    '凸面鏡':{'zh-CN':'凸面镜','zh-TW':'凸面鏡',en:'Convex mirror'},
    '焦点距離 |f|：':{'zh-CN':'焦距 |f|：','zh-TW':'焦距 |f|：',en:'Focal length |f|: '},
    '物体距離 a：':{'zh-CN':'物距 a：','zh-TW':'物距 a：',en:'Object distance a: '},
    '実像':{'zh-CN':'实像','zh-TW':'實像',en:'Real image'},
    '虚像':{'zh-CN':'虚像','zh-TW':'虛像',en:'Virtual image'},
    '物体':{'zh-CN':'物体','zh-TW':'物體',en:'Object'},
    '像':{'zh-CN':'像','zh-TW':'像',en:'Image'},
    'ヤングの二重スリット':{'zh-CN':'杨氏双缝','zh-TW':'楊氏雙狹縫',en:'Young’s Double Slit'},
    '波動：光の干渉':{'zh-CN':'波动：光的干涉','zh-TW':'波動：光的干涉',en:'Waves: Light Interference'},
    '2 つのスリットから出た光が重なると、明線と暗線ができます。明線間隔は、波長とスクリーンまでの距離に比例し、スリット間隔に反比例します。':{'zh-CN':'从两个缝射出的光叠加后，会形成明线和暗线。明线间隔与波长、到屏幕的距离成正比，与缝间距成反比。','zh-TW':'從兩個狹縫射出的光疊加後，會形成亮紋和暗紋。亮紋間距與波長、到螢幕的距離成正比，與狹縫間距成反比。',en:'Light from two slits overlaps to form bright and dark fringes. Fringe spacing is proportional to wavelength and screen distance, and inversely proportional to slit spacing.'},
    '波長 λ：':{'zh-CN':'波长 λ：','zh-TW':'波長 λ：',en:'Wavelength λ: '},
    'スリット間隔 d：':{'zh-CN':'缝间距 d：','zh-TW':'狹縫間距 d：',en:'Slit spacing d: '},
    'スクリーン距離 L：':{'zh-CN':'屏幕距离 L：','zh-TW':'螢幕距離 L：',en:'Screen distance L: '},
    '明線間隔：Δx = Lλ/d':{'zh-CN':'明线间隔：Δx = Lλ/d','zh-TW':'亮紋間距：Δx = Lλ/d',en:'Bright fringe spacing: Δx = Lλ/d'},
    'スクリーン':{'zh-CN':'屏幕','zh-TW':'螢幕',en:'Screen'},
    '中央明線':{'zh-CN':'中央明线','zh-TW':'中央亮紋',en:'Central bright fringe'},
    '参考：電磁気':{'zh-CN':'参考：电磁学','zh-TW':'參考：電磁學',en:'Reference: Electromagnetism'},
    'RC回路の充電・放電':{'zh-CN':'RC 回路充电・放电','zh-TW':'RC 電路充電・放電',en:'RC Circuit Charging and Discharging'},
    'コンデンサーの電圧は一瞬では変わりません。変化の速さは時定数 τ = RC で決まり、τ が大きいほどゆっくり変化します。':{'zh-CN':'电容器电压不会瞬间改变。变化快慢由时定数 τ = RC 决定，τ 越大变化越慢。','zh-TW':'電容器電壓不會瞬間改變。變化快慢由時間常數 τ = RC 決定，τ 越大變化越慢。',en:'Capacitor voltage does not change instantly. The time constant τ = RC determines the rate of change; larger τ means slower change.'},
    '充電':{'zh-CN':'充电','zh-TW':'充電',en:'Charge'},
    '放電':{'zh-CN':'放电','zh-TW':'放電',en:'Discharge'},
    '抵抗 R：':{'zh-CN':'电阻 R：','zh-TW':'電阻 R：',en:'Resistance R: '},
    '静電容量 C：':{'zh-CN':'电容 C：','zh-TW':'電容 C：',en:'Capacitance C: '},
    'ランプの明るさ':{'zh-CN':'灯泡亮度','zh-TW':'燈泡亮度',en:'Lamp brightness'}
  };
  const patterns=[
    [/実像 b = /g,{ 'zh-CN':'实像 b = ','zh-TW':'實像 b = ',en:'Real image b = '}],
    [/虚像 b = /g,{ 'zh-CN':'虚像 b = ','zh-TW':'虛像 b = ',en:'Virtual image b = '}],
    [/像は無限遠へ近づく/g,{ 'zh-CN':'像趋近无穷远','zh-TW':'像趨近無窮遠',en:'Image approaches infinity'}],
    [/前方：高い/g,{ 'zh-CN':'前方：较高','zh-TW':'前方：較高',en:'Front: higher'}],
    [/後方：低い/g,{ 'zh-CN':'后方：较低','zh-TW':'後方：較低',en:'Behind: lower'}],
    [/音源/g,{ 'zh-CN':'声源','zh-TW':'聲源',en:'Source'}],
    [/媒質/g,{ 'zh-CN':'介质','zh-TW':'介質',en:'Medium'}],
    [/入射光/g,{ 'zh-CN':'入射光','zh-TW':'入射光',en:'Incident ray'}],
    [/屈折光/g,{ 'zh-CN':'折射光','zh-TW':'折射光',en:'Refracted ray'}],
    [/時間 t/g,{ 'zh-CN':'时间 t','zh-TW':'時間 t',en:'Time t'}],
    [/電圧・電流/g,{ 'zh-CN':'电压・电流','zh-TW':'電壓・電流',en:'Voltage・current'}],
    [/Vc 充電で増加/g,{ 'zh-CN':'Vc 充电时增加','zh-TW':'Vc 充電時增加',en:'Vc increases while charging'}],
    [/Vc 放電で減少/g,{ 'zh-CN':'Vc 放电时减少','zh-TW':'Vc 放電時減少',en:'Vc decreases while discharging'}],
    [/\|I\| 電流は減少/g,{ 'zh-CN':'|I| 电流减小','zh-TW':'|I| 電流減小',en:'|I| current decreases'}]
  ];
  function lang(){return langs[localStorage.getItem(langKey)]?localStorage.getItem(langKey):'ja'}
  function tr(text){
    const l=lang(); if(l==='ja'||typeof text!=='string') return text;
    if(M[text]&&M[text][l]) return M[text][l];
    let out=text;
    patterns.forEach(([re,dict])=>{out=out.replace(re,dict[l]||dict.en)});
    return out;
  }
  function translateTextNode(node){
    const raw=node.nodeValue, trimmed=raw.trim();
    if(!trimmed) return;
    const translated=tr(trimmed);
    if(translated!==trimmed) node.nodeValue=raw.replace(trimmed,translated);
  }
  function translateTree(root=document.body){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      const p=node.parentElement;
      return p&&/^(SCRIPT|STYLE|CODE)$/.test(p.tagName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
    document.querySelectorAll('title,option').forEach((el)=>{el.textContent=tr(el.textContent.trim())});
  }
  function installCanvasTranslation(){
    if(CanvasRenderingContext2D.prototype.__demoI18n) return;
    const original=CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText=function(text,x,y,maxWidth){
      return original.call(this,tr(String(text)),x,y,maxWidth);
    };
    CanvasRenderingContext2D.prototype.__demoI18n=true;
  }
  function setupTopbar(){
    const inner=document.querySelector('.topbar-inner'); if(!inner) return;
    const existingBtn=inner.querySelector('a.btn[href="../physics.html"]');
    const actions=document.createElement('div');
    actions.className='demo-top-actions';
    const demoLink=document.createElement('a');
    demoLink.className='btn'; demoLink.href='physics-demos.html'; demoLink.textContent=langs[lang()].demo;
    const select=document.createElement('select');
    select.className='demo-lang-select'; select.setAttribute('aria-label','Language');
    Object.entries(langs).forEach(([key,item])=>{const opt=document.createElement('option');opt.value=key;opt.textContent=item.label;select.appendChild(opt)});
    select.value=lang();
    select.addEventListener('change',()=>{localStorage.setItem(langKey,select.value); location.reload()});
    actions.appendChild(demoLink);
    actions.appendChild(select);
    if(existingBtn){existingBtn.textContent=langs[lang()].physics; actions.appendChild(existingBtn)}
    inner.appendChild(actions);
  }
  function injectStyles(){
    const style=document.createElement('style');
    style.textContent='.demo-top-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}.demo-lang-select{min-height:38px;border:1px solid #d9e1ec;border-radius:7px;background:#fff;color:#164a7f;font:inherit;font-size:13px;font-weight:850;padding:7px 10px}@media(max-width:760px){.demo-top-actions{justify-content:flex-start}}';
    document.head.appendChild(style);
  }
  function observe(){
    const observer=new MutationObserver((mutations)=>{
      observer.disconnect();
      mutations.forEach((m)=>{if(m.type==='characterData') translateTextNode(m.target); else m.addedNodes.forEach((n)=>{if(n.nodeType===Node.TEXT_NODE) translateTextNode(n); else if(n.nodeType===Node.ELEMENT_NODE) translateTree(n)})});
      observer.observe(document.body,{childList:true,subtree:true,characterData:true});
    });
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  }
  function init(){
    document.documentElement.lang=langs[lang()].html;
    injectStyles();
    installCanvasTranslation();
    setupTopbar();
    translateTree();
    observe();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
