'use strict';

var async = require('async'),
    fs    = require('fs');

require('sugar');

/**
 * Парсинг файла
 *
 * @param fileName
 */
var parseLog = function (fileName) {

  /**
   * Вычисляет максимальную длину последовательности значений value
   *
   * @this {String}
   * @param value {String}
   * @returns {number}
   */
  function getSequenceMaxLength(value) {
    var regExp     = new RegExp(value + '(?=' + value + ')', 'ig'),
        maxLength  = 0,
        currLength = 0,
        endPos     = -1,
        tmp;

    while (tmp = regExp.exec(this)) {
      if (endPos != tmp.index) {
        if (currLength > maxLength) {
          maxLength = currLength;
        }
        currLength = 2;
      } else {
        currLength++;
      }
      endPos = regExp.lastIndex;
    }
    if (currLength > maxLength) {
      maxLength = currLength;
    }

    return maxLength;
  }

  /**
   * Получение и обработка статистики
   *
   * @param data {String} данные
   */
  function getStats(data) {
    var commonCnt = data.length,
        winCnt    = data.each('1').length,
        failCnt   = data.each('0').length;

    if (winCnt === 0 && failCnt === 0) {
      console.log('Error data.'.error);
    } else {
      var winPercent            = winCnt * 100 / commonCnt,
          failPercent           = 100 - winPercent,
          winSequenceMaxLength  = getSequenceMaxLength.call(data, 1),
          failSequenceMaxLength = getSequenceMaxLength.call(data, 0);

      winSequenceMaxLength  = (winSequenceMaxLength === 0) ? winCnt : winSequenceMaxLength;
      failSequenceMaxLength = (failSequenceMaxLength === 0) ? failCnt : failSequenceMaxLength;

      console.log(
        (
          'Data: ' + data.lines() +
          '\nCommon counts: ' + commonCnt +
          '\nWin count: ' + winCnt + ' (' + Math.round(winPercent) + '%)' +
          '\nFail count: ' + failCnt + ' (' + Math.round(failPercent) + '%)' +
          '\nMax length of win sequence: ' + winSequenceMaxLength +
          '\nMax length of fail sequence: ' + failSequenceMaxLength
        ).info
      );
    }
  }

  async.waterfall([
      function (callback) {
        fs.stat(fileName, callback);
      },
      function (stat, callback) {
        if (!stat.isFile()) {
          throw new Error;
        } else {
          fs.readFile(fileName, callback);
        }
      },
      function (data, callback) {
        console.log('\n\nStatistic'.head);
        getStats(data.toString());
      }
    ], function (err, result) { // Общий обработчик
      if (err) throw err;
      console.log('all ok!');
    }
  );
};

module.exports    = parseLog;
module.exports.fs = fs;