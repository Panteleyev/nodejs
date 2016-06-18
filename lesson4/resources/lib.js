'use strict';

/**
 * Библиотека функций
 */

/**
 * Дополняет число нулями слева, учитывая максимальное число. Используется при выводе нумерованного списка
 *
 * @param number {number} число
 * @param maxNumber {number} максимальное число
 * @returns {string}
 * @private
 */
function pad(number, maxNumber) {
  var result = number + '',
      length = (maxNumber + '').length;
  while (result.length < length) result = '0' + result;
  return result;
}

module.exports.pad = pad;