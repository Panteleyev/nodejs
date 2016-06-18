'use strict';

/**
 * Консольная программа, которая выводит в консоль разными цветами и издавать звук(и) с помощью модуля Colors.
 *
 * Формат запуска:
 *
 * node index.js
 */

// Подключение модулей. Вызов встроенных методов

var outSweetModule = require('./tmp/module.js');
outSweetModule.sayYes();

var ansi      = require('ansi');
var cursor    = ansi(process.stdout);
var colorTest = require('colors'),
    color     = 'grey',
    bgColor   = 'bgCyan',
    txtHello  = 'Hello, world!\nWe are ready to beep!',
    txtInfo   = '\n* This is test.';

console.log(txtHello.rainbow);
cursor.beep();
console.log(outSweetModule.sayYes().random);

colorTest.setTheme({
  info: [color, bgColor]
});
console.log(txtInfo.info);