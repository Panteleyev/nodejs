// Пример создания модуля

function sayNo() {
  return 'No!';
}

function sayYes() {
  return 'Yes!';
}

module.exports.sayNo  = sayNo;
module.exports.sayYes = sayYes;