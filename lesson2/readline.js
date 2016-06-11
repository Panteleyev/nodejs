// Пример исопльзования модуля readline
var readlline = require('readline');

var rl = readlline.createInterface({
  input:  process.stdin,
  output: process.stdout
});


//rl.question('What is your favorite food?\n', function (answer) {
//  console.log('Oh, so your favorite food is ' + answer);
//});
//rl.pause(); // Разблокирование ввода

// Выведем информацию в консоль
rl.write('Please, enter a command!\n');

rl.on('line', function (cmd) {
  console.log('"' + cmd + '"? Muhaha!');

  this.close(); // Закрываем обработчик
});