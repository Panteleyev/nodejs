// Пример создания модуля

function sayNo() {
    console.log('No!');
}

function sayYes() {
    console.log('Yes!');
}

module.exports.sayNo = sayNo;
module.exports.sayYes = sayYes;