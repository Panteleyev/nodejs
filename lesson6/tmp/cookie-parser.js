// Cookies и сессии пользователя

var app          = require('express')(),
    cookieParser = require('cookie-parser'); // для парсинга

app.use(cookieParser('optional secret string'));

app.get('/', function (req, res) {
  var count = req.cookies.views || 0;

  // Установить cookie легко с помощью стандартных методов объекта res:
  //  res.cookie('views', '0', {domain: '.example.com', path: '/admin'});
  res.cookie('views', ++count, {domain: 'localhost', path: '/', maxAge: 5000});

  if (count >= 10) {
    // Удаление cookie:
    res.clearCookie('views');
  }

  res.end(count + ' показ(ов)');
});

app.use(function (req, res, next) {
  res.end(JSON.stringify(req.cookies));
});

app.listen(8000, function () {
  console.log('The application was launched on 8000');
});