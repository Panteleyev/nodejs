// Модуль url

// Входящие GET запросы с параметрами (http)
var url = require('url');

// Разбираем URL адреса на части
var params = url.parse(
  'http://user:pass@host,com:8080/p/a/t/h?query=string#hash',
  true
);

console.log('params is: ', params);

// Изменяем параметры нашего адреса
params.hash = '#anotherHash';
params.port = 80;
params.host = 'host.com:80';

// Приводим обратно к URL строке
console.log(url.format(params));

// Требует дополнительного изучения
//// Входящие POST запросы с данными (http)
//function onRequestPost(request, response) {
//  var postData = '';
//  var pathName = url.parse(request.url).pathname;
//  console.log('Request for ' + pathName + ' received.');
//
//  request.setEncoding('utf8');
//
//  request.addListener('data', function (chunk) {
//    pathName += chunk;
//    console.log('POST data chunk \'' + chunk + '\'');
//  });
//
//  request.addListener('end', function () {
//    route(handle, pathName, response, postData);
//  });
//}