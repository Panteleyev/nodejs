// Модуль url

var url = require('url');

// Разбираем строку адоеса
var params = url.parse(
  'http://user:pass@host,com:8080/p/a/t/h?query=string#hash',
  true
);

console.log('params is: ', params);

// Изменяем параметры нашего адреса
params.hash = '#anotherHash';
params.port = 80;
params.host = 'host.com:80';

// Приводим обратно к строке
console.log(url.format(params));