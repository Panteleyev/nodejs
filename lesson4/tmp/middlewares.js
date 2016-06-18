// Создание промежуточной логики в ExpressJS

var express = require('express'),
    app     = express(),

    PORT    = 8000;

// Общий middleware для всех запросов
app.use(function middleware(req, res, next) {
  // Забираем данные с базы
  res.myData = {
    score: 46
  };

  next();
});

app.get('/', function (req, res/*, next*/) {
  res.send('Your score is: ' + res.myData.score);

  //next();
});

app.get('/player', saveScoreInConsole, function (req, res) {
  res.send('Player score is: ' + res.myData.score);
});

app.use(function (req, res) {
  res.send('Ooooups! The page is not exist');
});

// Запускаем сервер
app.listen(PORT, function () {
  console.log('Server was running on: ', PORT);
});

//Функция-middleware
function saveScoreInConsole(req, res, next) {
  console.log('player score is: ', res.myData.score);

  next();
}