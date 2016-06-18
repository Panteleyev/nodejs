'use strict';

/**
 * Обновление значения подписи слайдера
 *
 * @param labelTxt
 * @param rangeID
 * @param labelID
 */
function onInputCount(labelTxt, rangeID, labelID) {
  document.getElementById(labelID).innerHTML = labelTxt + ': ' + pad(document.getElementById(rangeID).value, 99);
}