// Исопльззование шаблонизатора на примере handlebars
// www.npmjs.com/package/consolidate
// npm install handlebars

var express  = require('express'),
    template = require('consolidate') // подлючаем поддержку шаблонизатора
      .handlebars,
    app      = express(), // создаем приложение

    PORT     = 8000;

// Определяем обработчик шаблонов
app.engine('hbs', template);

// Устанавливаем переменные для обработки шаблонов
app.set('view engine', 'hbs'); // по умолчанию используем .hbs шаблоны
app.set('views', __dirname + '/views'); // указываем директорию для загрузки шаблонов
app.use(express.static(__dirname + '/')); // путь к статике для отдачи файлов сервером

// обрабатываем запросы к главной странице
app.get('/', function (req, res) {
  // Рендеринг шаблона
  res.render('index', {
    title:  'Ежедненик',
    moment: new Date(),
    action: ['есть', 'мыться', 'спать']
  });
});

app.get('/worker', function (req, res) {
  res.render('index', {
    title:  'Ежедненик программиста',
    moment: new Date(),
    action: ['вставать', 'написать программу']
  });
});

app.listen(PORT, function () {
  console.log('Server was running on: ', PORT);
});