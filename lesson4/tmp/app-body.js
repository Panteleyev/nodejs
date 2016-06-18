// Обработка форм с помощью ExpressJS

var express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express(),

    PORT       = 8000;

//// Разбираем application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({/*extended: false*/}));
//
//// Разбираем application/json
//app.use(bodyParser.json());

//app.get('/', function (req, res) {
//  res.send(getForm());
//});
//http://localhost:8000

app.get('/', function (req, res) {
  console.log('req.query ', req.query);
  res.send(getForm(req.query.name, req.query.surname));
});
//http://localhost:8000/?name=Vasya&surname=Pupkin

// Обработка POST запроса
app.post('/', function (req, res) {
//  console.log('req is: ', req);
  console.log('req.body is: ', req.body);
  var form = getForm(req.body.name, req.body.surname);

  res.send(form + 'Thank you for your personal data sending!');
});

// Функция для получения разметки формы
var getForm = function (name, surname) {
  return '<form action"/" method="post">' +
    '<input value="' + (name || '') + '" name="name" />' +
    '<input value="' + (surname || '') + '" name="surname" />' +
    '<input type="submit" />' +
    '</form>';
};

app.listen(PORT, function () {
  console.log('Server was running on: ', PORT);
});