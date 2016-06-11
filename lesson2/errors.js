// Обработка ошибок

// Ловим необработанную ошибку
process.on('uncaughtException', function (err) {
  console.error('Are you kidding me??? This is a crazy error! : ', err);
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