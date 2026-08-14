document.addEventListener('DOMContentLoaded', () => {
  const strip = document.getElementById('updateStripText');
  const title = document.getElementById('noticeTitle');
  const text = document.getElementById('noticeText');
  if (strip) strip.textContent = '课程资料会随授课进度更新。请以课堂通知和本页显示为准。';
  if (title) title.textContent = '资料更新';
  if (text) text.textContent = '第七回作业答案中弹簧惯性力题已修正，最新版中日答案已上传。';
});
