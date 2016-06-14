// Использование пула соединений
var mysql = require('mysql');

// Настройка пула соединения
var connectionPool = mysql.createPool({
  host:     'localhost',
  user:     'user2',
  password: 'pass2',
  database: 'geek_brains'
});

// Получение соединения из пула
connectionPool.getConnection(function (err, connection) {
  if (err) throw err;
//  if (err) console.error(err);

  // Получение всех задач
  connection.query('SELECT * FROM todos WHERE completed = "false";', function (err, rows) {
    if (err) throw err;

    console.log('rows is: ', rows);

    // Отправка соединения обратноа в пул
    connection.release();
  });
});

// Внешний метод для использования
function getTasks(callback) {
  connectionPool.getConnection(function (err, connection) {
    if (err) throw err;

    connection.query('SELECT * FROM todos WHERE completed = "false";', callback);
    connection.release();
  });
}

// Экспорт мметода для использования
module.exports.getTasks = getTasks;