// Одиночное соединение с базой данных
var mysql = require('mysql');

// Настройка соединения
var connection = mysql.createConnection({
  host:     'localhost',
  user:     'user2',
  password: 'pass2',
  database: 'geek_brains'
});

// Установка соединения
connection.connect(function (err) {
  console.log(err);
//  if (err) throw err;
});

// Получение всех задач
connection.query('SELECT * FROM todos WHERE completed != "true";', function (err, rows) {
  if (err) throw err;

  console.log('rows is: ', rows);
});

// Добавление задачи и получение всех задач
connection.query('INSERT INTO todos (text, completed) VALUES ("my important task", "false");', function (err, info) {
  if (err) throw err;

  console.log('info is: ', info);

  // Запрос с получением задач
  connection.query('SELECT * FROM todos;', function (err, rows) {
    if (err) throw err;

    console.log('rows is: ', rows);

    connection.end();
  });
});

// Закрытие соединения после выполнения всех задач
//connection.end();