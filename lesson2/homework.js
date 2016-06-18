'use strict';

/**
 * Консольная игра "Орёл или решка", принимающая в качестве аргумента имя файла для логирования и сбора статистики
 * Пример запуска:
 *
 * node homework.js log.txt
 */

var parseLog = require('./parse-log'),
    ansi     = require('ansi'),
    colors   = require('colors');

var game = new Game();
game.run();

/**
 * Функция игры "Орёл или решка"
 *
 * @constructor
 */
function Game() {
  var cursor = ansi(process.stdout);

  var bgColor = 'bgBlack';

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

  var fileName = process.argv[2];

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
        parseLog.fs.appendFile('./' + fileName, (result) ? 1 : 0, function (err) {
          if (err)  throw err;
        });
        parseLog(fileName);
      }
      rl.close();
    });
  };
}
