'use strict';

var queryString = require('querystring'),
    request     = require('request');

/**
 * Перевод текста с английского на русский через «API Яндекс.Переводчик»
 *
 * @param txt {String} текст на английском
 */
var translate = function (txt) {
  // Кодируем данные в формат form-urlencoded
  var getData = queryString.stringify({
    text: txt
  });

  request('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160611T230327Z.a962e3dd7f6a597c.911984a061c26a032ac78d0be12bb7f7571ac80a&lang=en-ru&' + getData, function (error, response, answer) {
    if (error) {
      throw error;
    }

    if (response.statusCode !== 200) {
      return console.log('incorrect statusCode: ', response.statusCode);
    }

    console.log(JSON.parse(answer).text[0]);
  });
};

module.exports         = translate;
module.exports.request = request;