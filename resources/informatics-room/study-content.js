const STUDY_DATA = {
  mainLessons: window.STUDY_MAIN || [],
  programmingLessons: window.STUDY_PROGRAMMING || [],
  lectures: [
    {no:1,title:'情報社会と問題解決',count:6},
    {no:2,title:'メディアとコミュニケーション',count:2},
    {no:3,title:'情報のデジタル化',count:8},
    {no:4,title:'情報デザイン',count:4},
    {no:5,title:'ハードウェアとソフトウェア',count:5},
    {no:6,title:'アルゴリズムとプログラミング',count:8},
    {no:7,title:'モデル化とシミュレーション',count:3},
    {no:8,title:'情報通信ネットワーク',count:7},
    {no:9,title:'データの活用',count:4}
  ],
  programmingLevels:[
    {id:'初級',count:14,range:'第1講〜第14講'},
    {id:'中級',count:19,range:'第15講〜第33講'},
    {id:'上級',count:15,range:'第34講〜第48講'}
  ]
};
const ALL_STUDY_LESSONS=[...STUDY_DATA.mainLessons,...STUDY_DATA.programmingLessons];
function studyLessonById(id){return ALL_STUDY_LESSONS.find(item=>item.id===id);}
function studyLessonIndex(id){return ALL_STUDY_LESSONS.findIndex(item=>item.id===id);}
