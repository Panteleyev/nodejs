// Примеры использования Async
var async = require('async');
var fs    = require('fs');

//Имя файла для обработки
var FILE_NAME = 'test-file.txt';

// Описываем дествия одно за другим
async.waterfall([

    function (callback) {
      // Получаем информацию о файле
      fs.stat(FILE_NAME, callback);

//      fs.stat(FILE_NAME, function (err, data){
//        // ...
//      });
    },
    function (stat, callback) {
      // Получаем информацию о файле
      console.log('is it file?', stat.isFile());

      if (!stat.isFile())
        throw new Error;

      // Читаем файл
      fs.readFile(FILE_NAME, callback);
    },

    function (data, callback) {
      console.log('Data from a file: ', data.toString());

      // callback();
      // Добавляемданные в файл
      fs.appendFile(FILE_NAME, 'our sweety string\n', callback);
    }

  ], function (err, result) { // Общий обработчик
    // Ошибки на любом этапе
    if (err)
      throw err;

    // Обработка результата
    console.log('all ok!');
  }
);