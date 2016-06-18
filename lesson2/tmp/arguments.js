// process - корневой объект в node.js
console.log('process object is: ', process);

var args;

// Обработка аргументов скрипта стандартными средствами
args = process.argv;
console.log('args is: ', args);

// Использование модуля minimist
args = require('minimist')(process.argv.slice(2));
console.log('args is: ', args);
