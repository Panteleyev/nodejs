// Парсинг данных внешнего ресурса, используя модуль cheerio

var request = require('request'),
    cheerio = require('cheerio');

//// Запрос ресурса
//request('https://www.gismeteo.ru/city/daily/4720/', function (error, response, html){
//  if (error){
////    return console.error('error is: ', error);
//    throw error;
//  }
//
//  // Корректный ли ответ сервера?
//  if (response.statusCode !== 200){
//    return console.log('incorrect statusCode: ', response.statusCode);
//  }
//
//  // Загрузка данных в модуль cheerio
//  var $ = cheerio.load(html);
//
//  // Извлекаем нужные нам данные
//  var temp = $('#tbwdaily1 > tr:nth-of-type(3) > td.temp > span:first-child')
//    .text()
//    .trim();
//
//  console.log('temp is: ', temp);
//});

request('http://www.rbc.ru/', function (error, response, html) {
  if (error) {
//    return console.error('error is: ', error);
    throw error;
  }

  if (response.statusCode !== 200) {
    return console.log('incorrect statusCode: ', response.statusCode);
  }

  var $ = cheerio.load(html);

  $('.indicators_vert__ticker__td').each(function (i, element) {
    console.log($(element).text().trim());
  });

//  if (!error && response.statusCode == 200){
//    var $ = cheerio.load(html);
//    $('#js-rateContainer tr').each(function (i, element){
//      var cols = $(this).find('td');
//      console.dir(
//        cols.eq(0).text() +
//        ' ' + cols.eq(1).text() +
//        ' ' + cols.eq(2).text()
//      );
//    });
//  }
});