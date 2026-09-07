(() => {
  'use strict';

  function refineRoomCopy() {
    const roomFilter = document.getElementById('roomFilter');
    if (!roomFilter) return;
    const pending = roomFilter.querySelector('option[value="pending"]');
    if (pending && pending.textContent !== '待分配') pending.textContent = '待分配';
  }

  function keepDialogRoomHint() {
    const dialog = document.getElementById('eventDialog');
    const room = document.getElementById('dialogRoom');
    if (!dialog || !room || dialog.hidden) return;
    room.classList.toggle('dialog-room-pending', room.textContent.trim() === '待分配');
    room.classList.toggle('dialog-room-online', room.textContent.trim() === '无需教室');
  }

  refineRoomCopy();
  keepDialogRoomHint();

  const dialog = document.getElementById('eventDialog');
  if (dialog && 'MutationObserver' in window) {
    new MutationObserver(keepDialogRoomHint).observe(dialog, { attributes: true, attributeFilter: ['hidden'] });
  }
})();