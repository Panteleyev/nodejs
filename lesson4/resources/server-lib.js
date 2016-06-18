'use strict';

/**
 * Библиотека функций для сервера
 */

var iconvLite = require('iconv-lite'); //TODO(Panteleev): применить модуль iconv
//iconv     = require('iconv-js'); //TODO(Panteleev): Разобраться с модулью iconv-js

/**
 * Convert to UTF8
 *
 * @param charset {string}
 * @param html {String}
 * @returns {string}
 */
function convert(charset, html) {
  //TODO(Panteleev): Проблема с поддержкой shift_jis. Разобраться с установкой модуля iconv
  var htmlTmp = '';

  //  htmlTmp = iconv.fromSJIS(new Buffer(html, 'binary'));

  htmlTmp = iconvLite.encode(
    iconvLite.decode(
      new Buffer(html, 'binary'),
      charset
    ),
    'utf8'
  );

  return htmlTmp;
}

module.exports.convert = convert;