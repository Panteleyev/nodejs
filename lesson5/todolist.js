// Пример модуля для обработки задач
var connect = require('./pool-server.js');

var todoList = {
  // Получение всех задач
  list: function (callback) {
    connect.getTasks(function (err, rows) {
      if (err) {
        throw err;
      }

      console.log('rows: ', rows);
    });
  },

  // Добавить задачу
  add: function (text, callback) {
    // Сделать
  },

  // Изменить описание задачи
  change: function (id, newText, callback) {
    // Сделать
  },

  // Отменить задачу как сделанную
  complete: function (id, callback) {
    // Сделать
  },

  // Удаление задачи
  delete: function (id, callback) {
    // Сделать
  }
};

todoList.list();

module.exports = todoList;