// Обработка ошибок

// Ловим необработанную ошибку
//process.on('uncaughtException', function (err) {
//  console.error('Are you kidding me??? This is a crazy error! : ', err);
//});

// Ловим необработанную ошибку с возможностью продолжения работы
var d = require('domain').create();
d.on('error', function (er) {
  console.error('Caught error!', er);
});
d.run(function () {
  process.nextTick(function () {
    setTimeout(function () { // simulating async stuff%
      fs.open('non-existent file', 'r', function (er, fd) {
        if (er) throw er;
        // proceed...
      });
    }, 100);
  });
});

// Опасный блок кода
//try {
x.let();
//}
//
//// Обрабатываем ошибку
//catch (err) {
//  console.error('err is: ', err);
//}
//
//// Выполняется в любом случае
//finally {
//  console.log('Any way code...');
//}