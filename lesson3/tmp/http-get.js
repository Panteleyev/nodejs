// Простой запрос, исоплзуя http модуль

var http = require('http');

http
  .get('http://www.google.com/index.html', function (res) {
    console.log('response: ', res.statusCode);
    console.log('http headers: ', res.headers);

    // По событию, обрабатываем получаемые данные
    res.on('data', function (chunk) {
      console.log('BODY: ', chunk.toString());
    });

    // Отлавливаем конец данных
    res.on('end', function () {
      console.log('No more data in response.');
    });
  })
  //  .on('error', function (e) {
  //    console.error('Gor error: ', e.message);
  //  });
  .on('error', function (error) {
    throw error;
  });