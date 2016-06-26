// Cookies и сессии пользователя

var app          = require('express')(),
    cookieParser = require('cookie-parser'),
    session      = require('cookie-session');

app.use(cookieParser());
app.use(session({
  keys: ['secret']
}));

app.get('/', function (req, res) {
  // Доступ к настройкам кук можно получить через sessionOptions
  req.sessionOptions.maxAge = 5000;

  //https://www.npmjs.com/package/cookie-session#cookie-options
  // httpOnly, expires
  var count = req.session.views || 0; // 0 - по-умолчанию

  // время жизни (доп)
  //  res.cookie('count', count, {maxAge: 36000000});

  req.session.views = ++count; // увеличиваем значение и сохраняем в сессию

  res.end(count + ' показ(ов)');
});

app.listen(8000, function () {
  console.log('The application was launched on 8000');
});