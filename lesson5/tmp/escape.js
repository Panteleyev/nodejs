// Аспекты безопасности
var mysql = require('mysql');

// Попробуем сломать запрос
var todoId = '7 OR 1 = 1';

// Создание пула запросов
var connectionPool = mysql.createPool({
  host:     'localhost',
  user:     'user2',
  password: 'pass2',
  database: 'geek_brains'
});

// Получение соединения из пула
connectionPool.getConnection(function (err, connection) {
  if (err) throw err;

//  // Запрос без фильтрации входных параметров
//  connection.query('SELECT * FROM todos WHERE id = ' + todoId + ';', function (err, rows) {
//    if (err) throw err;
//
//    console.log('rows is: ', rows);
//    connection.release();
//  });

  var query;

//  // Обработка параметров через mysql.escape
//  query = _getEscapeQuery(todoId);

//  // Обработка параметрво через mysql.escapeId
//  query = _getEscapeIdQuery('false', 'id');

  // Обработка параметрво через mysql.format - аналог mysql.escape, но более удобный
  query = _getFormattedQuery(todoId);

  // Выполнение запроса
  connection.query(query, function (err, rows) {
    if (err) throw err;

    console.log('rows is: ', rows);
    connection.release();
  });

//  // Использование массива для замены в запросе
//  connection.query('SELECT * FROM todos WHERE id = ?;', [todoId], function (err, rows) {
//    if (err) throw err;
//
//    console.log('rows is: ', rows);
//    connection.release();
//  });

//  // Объект с данными для запроса
//  var newData = {
//    text:      'my new task',
//    completed: 'true'
//  };
//
//  // Использование объекта для множественной подстановки
//  connection.query('UPDATE todos SET ? WHERE id = ?;', [newData, todoId], function (err, rows) {
//    if (err) throw err;
//
//    console.log('rows is: ', rows);
//    connection.release();
//  });
});

// Метод с mysql.escape - для экранирования спецсимволов
function _getEscapeQuery(todoId) {
  var todoIdEscaped = mysql.escape(todoId);

  return 'SELECT * FROM todos WHERE id = ' + todoIdEscaped;
}

// Метод с mysql.escapeId - для экранирования идентификаторов
function _getEscapeIdQuery(value, field) {
  var valueEscaped = mysql.escape(value),
      fieldEscaped = mysql.escapeId(field);

  return 'SELECT * FROM todos WHERE completed = ' + valueEscaped + ' ORDER BY ' + fieldEscaped + ' DESC';
}

// Метод с mysql.format
function _getFormattedQuery(todoId) {
  var query = 'SELECT * FROM ?? WHERE ?? = ?';

  return mysql.format(query, ['todos', 'id', todoId]);
}