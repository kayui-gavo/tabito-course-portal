# 旅人教育｜教务排课系统（独立包）

这是从 `tabito-course-portal` 中单独抽出的教务排课前端，可直接复制到其他静态网站或工程中使用。

## 包含功能

- 周 / 月课程日历
- 科目、老师、授课方式、教室状态筛选
- 课程详情与授课台账
- 报名学生查询（按课程 / 按学生）
- 报名 CSV 导入、导出与模板下载
- 当前课程需求、选科重合、线下需求等排课参考
- 数学 IA、数学 IIBC、物理、地理、国语、公共政治经济、化学、生物等当前已录入课表

## 直接使用

1. 保持本目录结构不变。
2. 浏览器打开 `schedule.html`，或把整个目录放进任意静态网站目录。
3. 推荐通过本地静态服务器预览，例如 VS Code Live Server、`python -m http.server`、Vite / nginx / GitHub Pages 等。

本系统没有 npm 依赖，也没有构建步骤，使用原生 HTML / CSS / JavaScript。

## 复制进其他工程

至少保留以下结构：

```text
schedule.html
assets/
  schedule.css
  schedule-overview.css
  schedule-office.css
  schedule-enrollment.css
  schedule-enrollment-planning.css
  schedule.js
  schedule-overview.js
  schedule-office.js
  schedule-rooms.js
  schedule-enrollment.js
  schedule-runtime-polish.js
  images/
    tabito-logo.jpg
```

如果目标工程已有自己的导航栏或 Logo，可以修改 `schedule.html` 顶部导航；日历核心逻辑不依赖课程资料库页面。

## 报名数据

报名学生信息不会写入公开仓库，CSV 导入后仅存储在当前浏览器的 `localStorage` 中。

CSV 推荐字段：

```text
姓名,报名课程,报名时间,线下要求,报名状态,备注
```

包内提供 `报名信息模板.csv`。请勿把包含真实学生姓名的 CSV 直接提交到公开仓库。

## 主要修改位置

- 既有课程与日期：`assets/schedule.js`
- 数学 IA / 化学 / 生物及当前运行时课表补充：`assets/schedule-runtime-polish.js`
- 教务筛选、教室与冲突统计：`assets/schedule-office.js`
- 报名查询与排课参考：`assets/schedule-enrollment.js`
- 报名 UI：`assets/schedule-enrollment.css`
- 排课参考 UI：`assets/schedule-enrollment-planning.css`

## 注意

这个独立包复制的是 2026-09-08 当前版本。后续主工程继续更新时，独立分支不会自动同步，需要重新打包或手动同步对应文件。
