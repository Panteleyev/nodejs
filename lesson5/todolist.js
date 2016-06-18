var config         = require('./config'),
    mysql          = require('mysql'),
    connectionPool = mysql.createPool(config),
    todoList       = {

      /**
       * Выполнение запроса
       *
       * @param query {string} - SQL запрос
       * @param params {*[]} - параметры для SQL запроса
       * @param callback
       */
      executeQuery: function (query, params, callback) {
        connectionPool.getConnection(function (err, connection) {
          if (err) throw err;

          query = connection.format(query, params);
          console.log('SQL: [' + query + ']');

          connection.query(query, function (err, rows) {
            if (err) throw err;

            callback(rows);
            connection.release();
          });
        });
      },

      /**
       * Получение списка всех задач из БД
       *
       * @param callback
       */
      list: function (callback) {
        this.executeQuery(
          'SELECT * FROM todos ORDER BY ??',
          ['id'],
          callback
        );
      },

      /**
       * Добавление новой задачи
       *
       * @param data {string} - описание задачи
       * @param callback
       */
      add: function (data, callback) {
        if (data.title !== '') {
          this.executeQuery(
            'INSERT INTO todos SET ?',
            [{
              text:      data.title,
              completed: data.status
            }],
            callback
          );
        } else callback();
      },

      /**
       * Изменение описания выбранной задачи
       *
       * @param id {number} - выбранная задача
       * @param data {string} - отредактированное описание задачи
       * @param callback
       */
      change: function (id, data, callback) {
        this.executeQuery(
          'UPDATE todos SET ? WHERE ??=?',
          [{text: data.title}, 'id', id],
          callback
        );
      },

      /**
       * Отметка выбранной задачи, как сделанная
       *
       * @param id {number} - выбранная задача
       * @param callback
       */
      complete: function (id, callback) {
        this.executeQuery(
          'UPDATE todos SET ? WHERE ??=?',
          [{completed: 'true'}, 'id', id],
          callback
        );
      },

      /**
       * Удаление выбранной задачи
       *
       * @param id {number} - выбранная задача
       * @param callback
       */
      delete: function (id, callback) {
        this.executeQuery(
          'DELETE FROM todos WHERE ??=?',
          ['id', id],
          callback
        );
      }
    };

/**
 * Объект, содержащий список функций для манипулирования БД ToDo List
 *
 * @type {{executeQuery: todoList.executeQuery, list: todoList.list, add: todoList.add, change: todoList.change, complete: todoList.complete, delete: todoList.delete}}
 */
module.exports = todoList;