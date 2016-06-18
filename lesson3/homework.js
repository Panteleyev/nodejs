'use strict';

/**
 * Программа для получения информации о последних новостях с сайта
 * [プレスリリース | Panasonic Newsroom Japan](http://news.panasonic.com/jp/press/) в структурированном виде
 * с возможностью выбора языка. Поддерживаемые языки: японский, английский и русский (автоматический перевод через
 * сервис «API Яндекс.Переводчик»). Для выбора языка нужно в качестве аргумента указать одно из следующих значений:
 *
 *   - japanese
 *   - english
 *   - russian
 *
 *  Если не указать аргумент, то принимается по умолчанию 'japanese'. Регистр не учитывается.
 *   Если указать иное значение аргумента - выводится сообщение об ошибке и выполнение программы прекращается.
 *
 *  Варианты запуска:
 *
 *   - node homework.js
 *   - node homework.js unknown argument
 *   - node homework.js JAPANese
 *   - node homework.js english
 *   - node homework.js RUSsiAn
 */

var language  = process.argv[2],
    translate = require('./translate'),
    cheerio   = require('cheerio'),
    jpURI     = 'http://news.panasonic.com/jp/press/',
    enURI     = 'http://news.panasonic.com/global/press/';

if (language === undefined || language.toLowerCase() == 'japanese') {
  getNews(jpURI, false);
} else if (language.toLowerCase() == 'english') {
  getNews(enURI, false);
} else if (language.toLowerCase() == 'russian') {
  getNews(enURI, true);
} else {
  return console.log('Unknown language. Please type \'japanese\' or \'english\' or \'russian\'.');
}

/**
 * Получения информации о последних новостей по ссылке
 *
 * @param url {String}
 * @param toTranslate {boolean} перевести текст? true - да, false - нет
 */
function getNews(url, toTranslate) {
  translate.request(url, function (error, response, html) {
    if (error) {
      throw error;
    }

    if (response.statusCode !== 200) {
      return console.log('incorrect statusCode: ', response.statusCode);
    }

    var $ = cheerio.load(html);

    var dates        = $('.pnr_release_list > li > .date').map(
      function (i, element) {
        return $(element).text().trim();
      }
    );
    var titles       = $('.pnr_release_list > li > .link > h2 > a').map(
      function (i, element) {
        return $(element).text().trim();
      }
    );
    var descriptions = $('.pnr_release_list > li > .link .text').map(
      function (i, element) {
        return $(element).text().trim();
      }
    );

    var i, description, date, result;

    result = 'Panasonic Newsroom Japan\n最新プレスリリース\n=================\n\n';
    for (i = 0; i < titles.length; i++) {
      description = (descriptions[i]) ? descriptions[i] : '--';
      date        = (dates[i]) ? dates[i] : '----年-月-日';
      if (i > 0) result += '\n\n';
      result += (i + 1) + ': ' + date + '\t\t' + titles[i] + '\n- - - - - - - - - - - - - - - - - - - - -\n' + description;
    }

    if (toTranslate === true) {
      translate(result);
    } else {
      console.log(result);
    }
  });
}
