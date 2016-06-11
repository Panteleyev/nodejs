// Работа с файловой системой
var fs = require('fs');

//// Получение информации о файле
fs.stat('./env.js', function (err, file) {
  if (err)
    throw err;

  console.log('file as: ', file);
  console.log('.isFile() as: ', file.isFile);

  // Для сравнения с async-examples.js // START
//  fs.readFile('./fileWorks.js', function (err, data) {
//    if (err)
//      throw err;
//
//    console.log('data as: ', data.toString());
//
//    fs.appendFile('./test-file.txt', 'Secret\n', function (err) {
//      if (err)
//        throw err;
//
//      // Do staff!!!
//    });
//  });
  // Для сравнения с async-examples.js // END
});

//////Чтение файла
//fs.readFile('./fileWorks.js', function (err, data) {
//  if (err)
//    throw err;
//
//  console.log('data as: ', data.toString());
//});

////Добавление данных к файлу
//fs.appendFile('./test-file.txt', 'Secret\n', function (err) {
//  if (err)
//    throw err;
//
//  console.log('Operation completed! ' + Date.now());
//});
//console.log('Just after code block! ' + Date.now());

console.log('Operation started!' + Date.now());
fs.appendFileSync('./test-file.txt', 'Secret\n');
console.log('Just after code block!' + Date.now());

////Запись в файл
//fs.writeFile('./test-file.txt', 'tss...', function (err) {
//  if (err)
//    throw err;
//
////  fs.appendFile('another info', function (err) {});
//});

//ls test-file.txt
//ls -l test-file.txt
//chmod 700 test-file.txt
//node fileWorks.js
//ls -l test-file.txt
//
//chmod 500 test-file.txt
//ls -l test-file.txt
//
//chmod 755 test-file.txt
//ls -l test-file.txt

//cat test-file.txt