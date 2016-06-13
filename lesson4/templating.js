// Исопльззование шаблонизатора на примере handlebars
// www.npmjs.com/package/consolidate
// npm install handlebars

var express  = require('express'),
    template = require('consolidate').handlebars,
    app      = express(),

    PORT     = 8000;

// Определяем обработчик шаблонов
app.engine('hbs', template);

// Устанавливаем переменные для обработки шаблонов
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  // Рендеринг шаблона
  res.render('index', {
    moment: new Date(),
    action: ['спать']
  });
});

app.get('/worker', function (req, res) {
  res.render('index', {
    moment: new Date(),
    action: ['вставать', 'написать программу']
  });
});

app.listen(PORT, function () {
  console.log('Server was running on: ', PORT);
});