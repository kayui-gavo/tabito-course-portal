# 旅人教育课程门户

面向旅人教育内部学生的课程资料门户。网站用于集中查看各科课程入口、课程板书、录播、作业题、答案解析、通知和补充资料。

## 登录

默认账号由各科老师提供。

## 目录结构

```text
assets/images/       图片资源
assignments/         作业题与答案 PDF
course-notes/        课堂板书 PDF
notices/             通知 PDF
resources/           网站内资料页面
resources/informatics-room/  情報Ⅰ 静态教材站原型
index.html           课程门户主页
login.html           登录页
DEPLOYMENT.md        GitHub Pages 部署说明
```

## 情報Ⅰ 教材站原型

`resources/informatics-room/` 是「わかりやすい高校情報Ⅰの部屋」风格的静态教材站原型。它不是考试攻略站，而是帮助学生理解情報Ⅰ基础概念的教材站。

- 目的：把「情報Ⅰ」拆成小知识点，用日语、图解、生活例、常见误解和确认问题帮助学生理解。
- 官方顺序：目录按文部科学省「高等学校情報科『情報Ⅰ』教員研修用教材」本编顺序排列：第1章 情報社会の問題解決、第2章 コミュニケーションと情報デザイン、第3章 コンピュータとプログラミング、第4章 情報通信ネットワークとデータの活用。
- 当前优先：第3章「コンピュータとプログラミング」。已经重点整理アルゴリズム、入力・処理・出力、変数、代入、条件分岐、繰り返し、配列、探索、並べ替え等页面，但首页主目录不把第3章提前。
- 风格参考：朴素的教材目录站体验、清楚的链接、图解驱动的讲解节奏。UI 走现代旅人教育教材风，不做 SaaS / landing page，也不做考试攻略页。没有复制外部网站的 HTML/CSS/图片/文案。
- 内容文件：`content.js` 管理官方章节 content map、lesson、状态、用语和确认问题；`figures.js` 管理自制 SVG 图解；`site.js` 负责渲染页面。
- 增加内容：在 `content.js` 中新增 lesson 数据，再添加一个 `lessons/*.html` 壳页面调用 `renderLesson('id')`。
- 增加图解：在 `figures.js` 里新增 SVG 函数，并在 lesson 的 `figure` 字段中引用对应名称。图解必须自制，带 `figcaption`，不要外链图片。
- 参考资料：官方 PDF 和抽取文本保存在 `reference/mext-informatics/`，该目录被 `.gitignore` 排除，不发布到网站。官方资料只用于确认范围、顺序和知识点结构，页面正文需用自己的语言重写。
- 著作权注意：不要直接复制外部网站或文部科学省教材的长段原文、图片、HTML、CSS。

### 开发检查

```bash
npm run build
npm run lint
```

当前没有引入前端框架，`build` / `lint` 会执行静态 JS 语法和内部链接校验。

## 发布到 GitHub Pages

详见 [DEPLOYMENT.md](./DEPLOYMENT.md)。
