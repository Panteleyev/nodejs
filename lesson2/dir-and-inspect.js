// Вывод объектов с большой вложнностью

var util = require('util');

var data = {
  1: {
    1: {
      1: {
        obj: {
          string: 'string'
        }
      }
    }
  }
};

console.log('data is: ', data);

// util.inspect позволяет преобразовать объект к ...
// с заданным уровнем вложенности
var output = util.inspect(data, {
//  depth: null
  depth: 0
//  depth: 3
});

console.log('output ', output);

// Метод console.dir позволяет вывести один объект ...
// с заданные уровнем вложенности
console.dir(data, {
  depth: 0
});