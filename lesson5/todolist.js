var config         = require('./config'),
    mysql          = require('mysql'),
    connectionPool = mysql.createPool(config),
    todoList       = {
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

      // Получение всех задач
      list: function (callback) {
        this.executeQuery(
          'SELECT * FROM todos ORDER BY ??',
          ['id'],
          callback
        );
      },

      // Добавить задачу
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

      // Изменить описание задачи
      change: function (id, data, callback) {
        this.executeQuery(
          'UPDATE todos SET ? WHERE ??=?',
          [{text: data.title}, 'id', id],
          callback
        );
      },

      // Отметить задачу как сделанную
      complete: function (id, callback) {
        this.executeQuery(
          'UPDATE todos SET ? WHERE ??=?',
          [{completed: 'true'}, 'id', id],
          callback
        );
      },

      // Удаление задачи
      delete: function (id, callback) {
        this.executeQuery(
          'DELETE FROM todos WHERE ??=?',
          ['id', id],
          callback
        );
      }
    };

//todoList.list();
module.exports = todoList;