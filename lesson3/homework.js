var language = process.argv[2],
    request  = require('request'),
    cheerio  = require('cheerio'),
    jpURI    = 'http://news.panasonic.com/jp/press/',
    enURI    = 'http://news.panasonic.com/global/press/';

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
  request(url, function (error, response, html) {
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

/**
 * Перевод текста с английского на русский через «API Яндекс.Переводчик»
 *
 * @param txt {String} текст на английском
 */
function translate(txt) {
  var queryString = require('querystring');

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
}