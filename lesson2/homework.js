'use strict';

/**
 * Консольная игра "Орёл или решка", принимающая в качестве аргумента имя файла для логирования и сбора статистики
 * Пример запуска:
 *
 * node homework.js log.txt
 *
 * @constructor
 */
function Game() {
  var ansi   = require('ansi'),
      cursor = ansi(process.stdout);

  var colors  = require('colors'),
      bgColor = 'bgBlack';

  colors.setTheme({
    head:  ['rainbow', bgColor],
    info:  ['grey', bgColor],
    error: ['red', bgColor],
    fail:  ['black', 'bgRed'],
    win:   ['white', 'bgYellow']
  });

  var readLine = require('readline');
  var rl       = readLine.createInterface({
    input:  process.stdin,
    output: process.stdout
  });

  var async    = require('async'),
      fs       = require('fs'),
      fileName = process.argv[2];
  require('sugar');

  /**
   * Генерирует случайное целое число
   *
   * @param min {number}
   * @param max {number}
   * @returns {number}
   */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Парсинг файла
   *
   * @param fileName
   */
  function parseLog(fileName) {

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
  }

  /**
   * Запуск игры "Орел или решка"
   */
  this.run = function () {
    console.log('Hello! Let\'s to play!'.head);
    rl.question(('Eagle (1) or tail (2)? Type 1 or 2 please.').info, function (answer) {
      var variants    = {1: 'Eagle', 2: 'Tail'},
          randVariant = getRandomInt(1, 3),
          result;

      console.log(('\nRandom variant of system: ').info, variants[randVariant]);
      result = answer == randVariant;
      if (result) {
        console.log((variants[answer] + '? Huh! You win!!').win);
        cursor.beep();
      } else {
        console.log((variants[answer] + '? You lose!! Muahah!').fail);
      }

      if (/^[-_.\w]*\.\w{1,4}$/i.test(fileName)) { // Проверка значения аргумента. Если содержит имя и расширение файла
        fs.appendFile('./' + fileName, (result) ? 1 : 0, function (err) {
          if (err)  throw err;
        });
        parseLog(fileName);
      }
      rl.close();
    });
  };
}

var game = new Game();
game.run();