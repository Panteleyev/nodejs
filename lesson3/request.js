// Модуль request

var request = require('request'); // обёртка модуля http

// Отправка POST формы
request({
  method: 'post',
  uri:    'http://google.com',
  form:   {
    key: 'value'
  }
}, function (error, response, body) {
  if (error) {
//    return console.error(error);
    throw error;
  }

  console.log('status code is: ', response.statusCode);
  console.log(body);
});

//// Отправка GET-запроса
//request({
//  method: 'get',
//  uri:    'http://lj.ru/'
//}, function (error, response, body) {
////  if (error) {
//////    return console.error(error);
////    throw error;
////  }
////  console.log('status code is: ', response.statusCode);
////  console.log(body);
//
//  if (!error && response.statusCode == 200) {
//    console.log(body); // Print the google web page
//  }
//});