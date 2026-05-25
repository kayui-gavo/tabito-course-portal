# 旅人教育课程门户

面向旅人教育内部学生的课程资料门户。网站用于集中查看各科课程入口、课程板书、录播、作业题、答案解析、通知和补充资料。

## 本地查看

```bash
cd /Users/ryukayuiii/Documents/physics-class-site
python3 -m http.server 8000
```

浏览器访问：

```text
http://localhost:8000/login.html
```

## 登录

默认账号见 `login.html` 中：

```javascript
const VALID_USERNAME = 'tabito';
const VALID_PASSWORD = 'butsuri';
```

## 目录结构

```text
assets/images/       图片资源
assignments/         作业题与答案 PDF
course-notes/        课堂板书 PDF
notices/             通知 PDF
resources/           网站内资料页面
index.html           课程门户主页
login.html           登录页
DEPLOYMENT.md        GitHub Pages 部署说明
```

## 发布到 GitHub Pages

详见 [DEPLOYMENT.md](./DEPLOYMENT.md)。
