// POST запрос через http модуль

var queryString = require('querystring');
var http        = require('http');

// Кодируем данные в формат form-urlencoded
var postData = queryString.stringify({
  msg: 'Hello World!'
});

// Определяем настройки запроса
var options = {
  hostname: 'www.google.com',
  post:     80,
  path:     '/secretPage',
  method:   'POST',
  headers:  {
    'Content-Type':   'application/x-www-form-urlencoded',
    'Content-length': postData.length
  }
};

// Устанавливаем запрос
var req = http
  .request(options, function (res) {
    console.log('response: ', res.statusCode);
    console.log('http headers: ', res.headers);

    // Событие получения данных
    res.on('data', function (chunk) {
      console.log('BODY: ', chunk.toString());
    });

    // Событие окончания получения данных
    res.on('end', function () {
      console.log('No more data in response.');
    });
  })
  .on('error', function (e) {
    console.error('problem with request: ', e.message);
  });

// Запись тела запроса
req.write(postData);

// Отправка заспроа
req.end();