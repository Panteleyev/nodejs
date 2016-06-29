'use strict';

/**
 * ToDo List. Программа манипулирования заданиями с возможностью аутентификации и изменения статуса выполнения (выполнено/ не выполнено).
 *
 * Формат запуска:
 *
 * nodemon homework.js
 *
 */

const express      = require('express'),
      consolidate  = require('consolidate'),
      handlebars   = require('handlebars'),
      bodyParser   = require('body-parser'),
      controlTodo  = require('./todolist'),
      cookieParser = require('cookie-parser'),
      session      = require('cookie-session'),
      app          = express(),
      passport     = require('passport'), //passportAuth.passport,
      passportAuth = require('./passport-auth'),
      isAuth       = require('./is-auth'),
      github       = require('./github-auth')(app),
      PORT         = 8000,

      server       = app.listen(PORT, function () {
        var host = server.address().address,
            port = server.address().port;
        console.log('Server was running on\nhost: ', host, '\nport: ', port);
      });

consolidate.requires.handlebars = handlebars;

/**
 * Определение условия проверки в handlebars
 *
 * Если значения a и b равны, то возвращает true, иначе false
 */
handlebars.registerHelper('if_eq', function (a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
//app.use(cookieParser());

app.use(cookieParser()); // req.cookies
app.use(session({keys: ['key']}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */

app.post('/', isAuth, function (req, res) {
  var command = req.body.command,
      status, title, id;

  /**
   * Добавить задачу
   */
  if (command == 'add') {
    status = (req.body.status === undefined) ? 'false' : 'true';
    title  = req.body.title;
    controlTodo.add({title: title, status: status}, function (result) {
      getList(res, req);
    });

    /**
     * Редактировать описание вбранной задачи
     */
  } else if (command == 'change') {
    id    = req.body.id;
    title = req.body.title;
    controlTodo.change(id, {title: title}, function (result) {
      getList(res, req);
    });

    /**
     * Отметить задачу как сделанную
     */
  } else if (command == 'complete') {
    id = req.body.id;
    controlTodo.complete(id, function (result) {
      getList(res, req);
    });

    /**
     * Удалить выбранную задачу
     */
  } else if (command == 'delete') {
    console.log('DELETE');
    id = req.body.id;
    controlTodo.delete(id, function (result) {
      getList(res, req);
    });
  }
});

/**
 * Проверка при авторизации
 */
app.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

/**
 * Загрузка страницы в обычном режиме
 */
app.get('/', function (req, res) {
  getList(res, req);
});

/**
 * Проверка режима запоминания
 */
app.use(function (req, res, next) {
  if (req.method == 'POST' && req.url == '/login') {
    if (req.body.rememberme) {
      req.sessionOptions.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
    } /*else {
      req.sessionOptions.expires = false;
    }*/
  }
  next();
});

/**
 * Авторизация
 */
app.post('/login', passportAuth.auth(app));

/**
 * Выход из администрирования
 */
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.all('/user', isAuth);
app.all('/user/*', isAuth);

/**
 * Страница пользователя
 */
app.get('/user', function (req, res) {
  res
    .status(200)
    .render('other', {
      form:    '<form class="auth" action="/user/settings"><input type="submit" class="btn" value=" Settings "></form>',
      legend:  'User page',
      message: 'Hello, ' + req.user.login + '!'
    });
});

/**
 * Страница настройки в стадии бесконечной разработки :)
 */
app.get('/user/settings', function (req, res) {
  res
    .status(200)
    .render('other', {
      legend:  'Settings',
      message: 'This page is in the process of infinite development! :)'
    });
});

/**
 * Иная страница
 */
app.use(function (req, res) {
  //  res
  //    .status(404)
  //    .send('Error 404. Page not found.')
  //
  res
    .status(404)
    .render('404', {
      message: 'Page not found'
    });
});

/**
 * Геттер отрендированной страницы, отображающей все задачи из БД
 *
 * @param res
 * @param req
 */
function getList(res, req) {
  controlTodo.list(function (data) {
    console.log('isAuthenticated? ' + req.isAuthenticated());

    if (req.isAuthenticated()) {
      res.render('admin', {
        todo_list: data,
        user:      req.user
      });
    } else {
      res.render('guest', {
        todo_list: data
      });
    }
  });
}