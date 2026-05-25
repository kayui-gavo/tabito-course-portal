# 旅人教育课程门户：GitHub Pages 部署指南

本网站是静态网站，可以直接用 GitHub Pages 免费发布。当前仓库建议命名为 `tabito-course-portal`，对应 GitHub Pages 地址会从旧的物理课程站路径改为课程门户路径。

## 重要提醒

GitHub Pages 发布后，网页会被外部访问。当前登录功能是前端 localStorage 验证，只适合基础访问控制，不适合存放真正机密资料。仓库如果设为 Public，PDF 文件和前端代码也可以被技术用户看到。

## 一、创建 GitHub 仓库

1. 登录 GitHub。
2. 新建仓库，例如：`tabito-course-portal`。
3. 如果使用 GitHub Free，建议设为 Public 后启用 Pages。
4. 不要勾选自动创建 README，避免和本地文件冲突。

## 二、把本地网站推送到 GitHub

在本目录执行：

```bash
cd /Users/ryukayuiii/Documents/physics-class-site
git init
git branch -M main
git add .
git commit -m "Initial course site"
git remote add origin https://github.com/你的用户名/tabito-course-portal.git
git push -u origin main
```

如果 GitHub 仓库已经存在内容，先不要强推；确认远程仓库为空或先备份。

## 三、开启 GitHub Pages

进入 GitHub 仓库页面：

1. 打开 `Settings`。
2. 左侧进入 `Pages`。
3. `Source` 选择 `Deploy from a branch`。
4. Branch 选择 `main`。
5. Folder 选择 `/ (root)`。
6. 点击 `Save`。

几分钟后会生成访问地址，通常是：

```text
https://你的用户名.github.io/tabito-course-portal/
```

学生访问：

```text
https://你的用户名.github.io/tabito-course-portal/login.html
```

## 四、更新网站内容

每次修改文件后执行：

```bash
git add .
git commit -m "Update course site"
git push
```

GitHub Pages 会自动重新发布。一般等待 1 到 10 分钟。

## 五、当前目录用途

```text
assets/images/       图片资源
assignments/         作业题与答案 PDF
course-notes/        课堂板书 PDF
notices/             通知 PDF
resources/           网站内资料页面
index.html           课程门户主页
login.html           登录页
```

## 六、开发者模式

登录后可用：

```text
index.html?dev=tabito
```

或在首页按：

```text
Ctrl + Alt + D
```

开发者模式只在当前浏览器显示，不会出现在学生页面导航里。它可以修改本机显示内容、导入导出配置，并提示文件应放入哪个目录。静态网页不能直接把浏览器上传的文件写回 GitHub，实际文件仍需要放进项目目录后 `git add / commit / push`。

## 七、参考

GitHub Pages 官方文档：

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
