'use strict';

/**
 * Веб-сервис с HTML-интерфейсом на японском языке для динамической загрузки новостей с одного выбранного из нескольких
 * сайтов. В форме имеется возможность выбора сайта, указания количества выводимых новостей. Кнопка отправки расположена
 * в правой части формы. Веб-сервис использует cookie для запоминания текущих настроек. Если нет данных в cookie,
 * то применяются настройки по умолчанию.
 * Формат запуска:
 *
 * nodemon homework.js
 *
 * URL веб-сервиса:
 *
 * http://localhost:8000/
 *
 */

var lib          = require('./resources/lib'),
    serverLib    = require('./resources/server-lib'),
    express      = require('express'),
    template     = require('consolidate').handlebars,
    bodyParser   = require('body-parser'),
    app          = express(),
    cookieParser = require('cookie-parser'),
    request      = require('request'),
    cheerio      = require('cheerio'),

    PORT         = 8000,
    sites        = [
      {
        title:        'ソニー',
        origNameSite: 'SONY',
        value:        'sony',
        uri:          'http://www.sony.co.jp/SonyInfo/News/ServiceArea/',
        charset:      'auto'
      },
      {
        title:        'パナソニック (松下)',
        origNameSite: 'Panasonic (Matsushita)',
        value:        'panasonic',
        uri:          'http://news.panasonic.com/jp/press/',
        charset:      'auto'
      }, {
        title:        '三和 meteor',
        origNameSite: 'SANWA meter',
        value:        'sanwa_meter',
        uri:          'http://www.sanwa-meter.co.jp/japan/info/news.php',
        charset:      'auto'
      }, {
        title:        '三和 comp',
        origNameSite: 'SANWA comp',
        value:        'sanwa_comp',
        uri:          'https://www.sanwa-comp.co.jp/',
        charset:      'auto'
      }, {
        title:        '三和 supply',
        origNameSite: 'SANWA supply',
        value:        'sanwa_supply',
        uri:          'http://www.sanwa.co.jp/top_news/back_number2015.html',
        charset:      'shift_jis'
      }
    ],

    server       = app.listen(PORT, function () {
      var host = server.address().address,
          port = server.address().port;
      console.log('Server was running on\nhost: ', host, '\nport: ', port);
    });

app.engine('hbs', template);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function (req, res) {
  var data, siteName, newsCount;
  if (req.cookies.site_name) {
    siteName  = req.cookies.site_name;
    newsCount = req.cookies.news_count;
  } else if (req.query.site_name !== undefined && req.query.news_count !== undefined) {
    siteName  = req.query.site_name;
    newsCount = req.query.news_count;
  } else {
    siteName  = sites[1].value;
    newsCount = 15;
  }

  data = getInfo(siteName);
  reDraw(data, newsCount, res);
});

app.post('/', function (req, res) {
  var siteName  = req.body.site_name,
      newsCount = req.body.news_count,
      data      = getInfo(siteName);

  reDraw(data, newsCount, res);
  res.cookie('site_name', siteName);
  res.cookie('news_count', newsCount);
});

/**
 * Загрузка данных и перерисовка
 *
 * @param data {*[]}
 * @param newsCount
 * @param res
 */
function reDraw(data, newsCount, res) {
  getNews(data[2], data[3], newsCount, function (result) {
    var now = new Date();

    now = now.getFullYear() + '.' + lib.pad(now.getMonth(), 99) + '.' + lib.pad(now.getDate(), 99) + ' ' + lib.pad(now.getHours(), 99) + ':' + lib.pad(now.getMinutes(), 99);

    res.render('homework', {
      title:     data[0],
      options:   data[1],
      now:       now,
      countNews: lib.pad(newsCount, 99),
      news:      result
    });
  });
}

/**
 * Геттер новостей
 *
 * @param url {String}
 * @param charset {String}
 * @param newsCount {Number}
 * @param callback(Function)
 */
function getNews(url, charset, newsCount, callback) {
  request(url, function (error, response, html) {
    if (error) {
      //      throw error;
      callback([{date: '', title: 'Error: ' + error}]);
    } else if (response.statusCode !== 200) {
      callback([{date: '', title: 'Incorrect statusCode: ' + response.statusCode}]);
    } else {

      var $;
      if (charset == 'auto') {
        $ = cheerio.load(html);
      } else {
        $ = cheerio.load(serverLib.convert(charset, html));
      }

      var dates, titles;
      if (url === 'http://www.sanwa-meter.co.jp/japan/info/news.php') {
        dates  = parseData($, '#info_news_list > li > .info_news_date', newsCount);
        titles = parseData($, '#info_news_list > li > .info_news_title > a', newsCount);
      } else if (url === 'http://www.sanwa.co.jp/top_news/back_number2015.html') {
        dates  = parseData($, '#wrap-container .backno-list > dl > dt', newsCount);
        titles = parseData($, '#wrap-container .backno-list > dl > dd > a', newsCount);
      } else if (url === 'https://www.sanwa-comp.co.jp/') {
        dates  = parseData($, '#topFreeArea > table > tbody > tr:nth-child(2) div > table > tbody > tr > td:nth-child(1)', newsCount);
        titles = parseData($, '#topFreeArea > table > tbody > tr:nth-child(2) div > table > tbody > tr > td:nth-child(2) > a', newsCount);
      } else if (url === 'http://news.panasonic.com/jp/press/') {
        dates  = parseData($, '.pnr_release_list > li > .date', newsCount);
        titles = parseData($, '.pnr_release_list > li > .link > h2 > a', newsCount);
      } else if (url === 'http://www.sony.co.jp/SonyInfo/News/ServiceArea/') {
        dates  = [];
        titles = parseData($, '.news > li > a', newsCount);
      }

      var i, date, results = [];
      for (i = 0; i < titles.length; i++) {
        if (titles[i] === '') continue;
        //if (i + 1 > newsCount) break;
        date = (dates[i]) ? dates[i] : '';
        results.push({date: date, title: titles[i]});
      }
      if (results.length === 0) {
        callback([{date: '', title: '---'}]);
      } else {
        callback(results);
      }
    }
  });
}

/**
 * Парсинг данных
 *
 * @param $
 * @param path {string}
 * @param maxCount {number}
 * @returns {JQuery|*|jQuery}
 */
function parseData($, path, maxCount) {
  return $(path).map(
    function (i, element) {
      return (i + 1 > maxCount) ? null : $(element).text().trim();
    }
  );
}

/**
 * Геттер HTML опций
 *
 * @param siteNameSelected
 * @returns {*[]}
 */
function getInfo(siteNameSelected) {
  var i, title, htmlOptions = '', selected = '', uri = '', charset = '';
  for (i = 0; i < sites.length; i++) {
    selected = '';
    if (sites[i].value == siteNameSelected) {
      selected = 'selected';
      title    = sites[i].title;
      uri      = sites[i].uri;
      charset  = sites[i].charset;
    }
    htmlOptions += '<option value="' + sites[i].value + '"' + selected + '>' + sites[i].origNameSite + '</option>';
  }
  return [title, htmlOptions, uri, charset];
}