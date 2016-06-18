// Простой сервер-заглушка

var http = require('http');
var PORT = 8000; // Порт открытия сервера

/**
Свойства request описаны в API http.IncomingMessage:
• method
• url
• headers

Свойства и методы response описаны в API http.ServerResponse:
• writeHead - для отправки статуса и заголовков
• statusCode - для установки статуса ответа
• setHeader - для установки заголовка
• write - для отправки данных
• end - для завершения запроса
*/

//function onRequestHtml(request, response) {
//  // Тело ответа
////    var answer = `<b>Hello world!</b>`;
//  var answer = '<b>Hello world!</b>';
//
//  // Заголовки ответа
//  response.writeHead(200, {
//    'Content-Type':   'text/html',
//    'Content-length': answer.length
//  });
//
//  // Пишет тело ответа
//  response.write(answer);
//
//  // Закрываем запрос, отправляем ответ
//  response.end();
//}
//http.createServer(onRequestHtml)
//    .listen(PORT, function () {
//      console.log('Let\'s get started: ', PORT);
//    });

function onRequestPlain(request, response) {
  // Тело ответа
  var answer = 'Hello world!';

  // Заголовки ответа
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // Пишет тело ответа
  response.write(answer);

  // Закрываем запрос, отправляем ответ
  response.end();
}
http.createServer(onRequestPlain).listen(PORT);
console.log('Server started.');

// ttp://localhost:8000/