/**
 * Запуск отправки данных
 *
 * @param id {number} - id выбранной задачи
 * @param command {string} - команда для манипулирования БД. Принимает следующие значения:
 *                           'add'/'change'/'complete'/'delete'
 */
function sendQuery(id, command) {
  document.getElementById('title_').value  = '';
  document.getElementById('status_').value = '';
  if (command === 'complete') {
    document.getElementById('status_').value = 'true';
  } else if (command === 'change') {
    document.getElementById('title_').value = document.getElementById('title' + id).value;
  }
  document.getElementById('id_').value      = id;
  document.getElementById('command_').value = command;
  document.getElementById('controlTask').submit();
}