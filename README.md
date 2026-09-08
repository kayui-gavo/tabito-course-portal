# 旅人教育｜教务排课系统（独立包）

这是从 `tabito-course-portal` 中单独抽出的教务排课前端，可直接复制到其他静态网站或工程中使用。

## 包含功能

- 紧凑周历 / 比例时间轴 / 月历
- 科目、老师、授课方式、教室状态筛选
- 课程详情、教室分配、讲师 / 教室冲突检查与授课台账
- 报名学生查询（按课程 / 按学生 / 排课参考）
- 报名 CSV 导入、导出与模板下载
- `报名编号` 前 8 位自动解析为精确报名日期
- 当前课程需求、选科重合与授课方式等排课参考
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
  schedule-refine.css
  schedule-calendar-compact.css
  schedule.js
  schedule-overview.js
  schedule-office.js
  schedule-runtime-polish.js
  schedule-delivery-policy.js
  schedule-enrollment-v4.js
  schedule-rooms.js
  schedule-calendar-compact.js
  images/
    tabito-logo.jpg
```

如果目标工程已有自己的导航栏或 Logo，可以修改 `schedule.html` 顶部导航；日历核心逻辑不依赖课程资料库页面。

## 报名数据

报名学生信息不会写入公开仓库，CSV 导入后仅存储在当前浏览器的 `localStorage` 中。

推荐字段：

```text
姓名,报名课程,报名编号,报名日期,线下要求,报名状态,备注
```

也支持事务部常用表头 `氏名`、`申込科目`。如果存在 `报名编号`，系统优先读取其中前 8 位 `YYYYMMDD` 作为报名日期；例如 `2026090301A` 会解析为 `2026/9/3`。没有报名编号时才读取显式的 `报名日期`。

包内提供 `报名信息模板.csv`。请勿把包含真实学生姓名的 CSV 直接提交到公开仓库。

## 当前授课方式口径

当前默认规则为：

- 国语、地理、物理：线下
- 其他课程：线上

这里的“物理”包括当前物理共通考试冲刺课程与物理一对一。线下课需要分配教室；线上课自动显示“无需教室”。

## 主要修改位置

- 既有课程与日期：`assets/schedule.js`
- 数学 IA / 化学 / 生物及当前运行时课表补充：`assets/schedule-runtime-polish.js`
- 当前线上 / 线下教务口径：`assets/schedule-delivery-policy.js`
- 教务筛选、教室与冲突统计：`assets/schedule-office.js`、`assets/schedule-rooms.js`
- 报名查询、报名日期与排课参考：`assets/schedule-enrollment-v4.js`
- 报名 UI：`assets/schedule-enrollment.css`
- 排课参考 UI：`assets/schedule-enrollment-planning.css`
- 紧凑周历布局：`assets/schedule-calendar-compact.css`、`assets/schedule-calendar-compact.js`

## 注意

这个独立包是一个可复制的静态前端快照。主工程后续继续更新时，独立分支不会自动同步，需要重新打包或手动同步对应文件。