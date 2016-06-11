// Простой сервер-заглушка

var http = require('http');
var PORT = 8000; // Порт открытия сервера

http
  .createServer(function (request, response) {
    // Тело ответа
//    var answer = `<b>Hello world!</b>`;
    var answer = '<b>Hello world!</b>';

    // Заголовки ответа
    response.writeHead(200, {
      'Content-Type':   'text/html',
      'Content-length': answer.length
    });

    // Пишет тело ответа
    response.write(answer);

    // Закрываем запрос, отправляем ответ
    response.end();
  })
  .listen(PORT, function () {
    console.log('Let\'s get started: ', PORT);
  });

// ttp://localhost:8000/