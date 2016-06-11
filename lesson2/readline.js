// Пример исопльзования модуля readline
var readlline = require('readline');

var rl = readlline.createInterface({
  input:  process.stdin,
  output: process.stdout
});

// Выведем информацию в консоль
rl.write('Please, enter a command!\n');

rl.on('line', function (cmd) {
  console.log('"' + cmd + '"? Muhaha!');

  this.close(); // Закрываем обработчик
});