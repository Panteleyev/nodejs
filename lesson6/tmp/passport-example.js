// Авторизация ползователя с PassportJS

var app           = require('express')(),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    session       = require('cookie-session'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local');

app.use(cookieParser()); // req.cookies
app.use(session({keys: ['key']})); // req.session
app.use(passport.initialize());
app.use(passport.session());

// Настройка стратегии авторизации
passport.use(new LocalStrategy(function (username, pass, done) {
  //  Проверяем авторизационные данные
  //  if (username === 'admin' && pass === 'admin') {
  //    return done(null, {username: username});
  //  }
  //  done(null, false);

  if (username !== 'admin' || pass !== 'admin') {
    return done(null, false);
  }
  done(null, {username: username});
}));

/**
 * Метод сохранения данных пользователя в сессии
 *
 * user - идентификатор для поиска в сессии
 * возврат в done
 */
passport.serializeUser(function (user, done) {
  done(null, user.username);
});

/**
 * Поиск из БД по username и возврат в done
 */
passport.deserializeUser(function (username, done) {
  done(null, {username: username});
});

// Главная страница для всех
app.get('/', function (req, res) {
  res
    .status(200)
    .send('Это главная страница!');
});

// Страница логина
app.get('/login', function (req, res) {
  res
    .status(200)
    .send(
      '<form action="/login" method="post">' +
      'Login: ' +
      '<input type="text" name="username" />' +
      '<input type="password" name="password" />' +
      '<input type="submit" />' +
      '</form>'
    );
});

// Обработчик запроса на авторизацию
app.post('/login', bodyParser.urlencoded({extended: false}), passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/login'
}));

// Страница настроек пользователя (нужна авторизация)
app.get('/user/settings', mustBeAuthentificated, function (req, res) {
  res
    .status(200)
    .send('Совершенно секретная часть. Только для тебя, ' + req.user.username);
});

// Кабинет пользователя (нужна авторизация)
app.get('/user', mustBeAuthentificated, function (req, res) {
  res
    .status(200)
    .send('Привет, ' + req.user.username);
});

// Страница выхода
app.get('/logout', function (req, res) {
  req.logout(); // выполняем выход через passportJS
  res.redirect('/'); // переход на главную
});

// Метод для проверки пользователя
function mustBeAuthentificated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login'); // переход на страницу логина
}

app.listen(8000, function () {
  console.log('The application was launched on 8000 port!');
});