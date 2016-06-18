// Пример приложения на ExpressJS

var express = require('express'),
    app     = express(),

    PORT    = 8000;

////app.use(express.static('./static'));
//app.use(express.static('./files'));
////expressjs.com/en/4x/api.html
////expressjs.com/en/starter/static-files.html
////app.use('/', //обработчик);

// Обработчик корнево системы
app.get('/', function (req, res) {
  res.send('Hello world!');
});

//app.post('/')
//app.put
//app.del
//app.patch

//fs.readFile

// Дополнительная страница /admin
app.get('/admin', function (req, res) {
  res.send('This is an admin panel');
});

// Запускаем сервер
app.listen(PORT, function () {
  console.log('Server is launched on: ', PORT);
});

//npm install -g nodemon
//nodemon app.js