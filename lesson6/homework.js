'use strict';

/**
 * ToDo List. Программа манипулирования заданиями с возможностью изменения статуса выполнения (выполнено/ не выполнено).
 *
 * Формат запуска:
 *
 * nodemon homework.js
 *
 */

var express     = require('express'),
    consolidate = require('consolidate'),
    handlebars  = require('handlebars'),
    bodyParser  = require('body-parser'),
    controlTodo = require('./todolist'),
    app         = express(),
    PORT        = 8000,

    server      = app.listen(PORT, function () {
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
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
//app.use(cookieParser());

app.post('/', function (req, res) {
  var command = req.body.command,
      status, title, id;

  /**
   * Добавить задачу
   */
  if (command == 'add') {
    status = (req.body.status === undefined) ? 'false' : 'true';
    title  = req.body.title;
    controlTodo.add({title: title, status: status}, function (result) {
      getList(res);
    });

    /**
     * Редактировать описание вбранной задачи
     */
  } else if (command == 'change') {
    id    = req.body.id;
    title = req.body.title;
    controlTodo.change(id, {title: title}, function (result) {
      getList(res);
    });

    /**
     * Отметить задачу как сделанную
     */
  } else if (command == 'complete') {
    id = req.body.id;
    controlTodo.complete(id, function (result) {
      getList(res);
    });

    /**
     * Удалить выбранную задачу
     */
  } else if (command == 'delete') {
    id = req.body.id;
    controlTodo.delete(id, function (result) {
      getList(res);
    });
  }
});

/**
 * Загрузка страницы в обычном режиме
 */
app.get('/', function (req, res) {
  getList(res);
});

/**
 * Геттер отрендированной страницы, отображающей все задачи из БД
 *
 * @param res
 */
function getList(res) {
  controlTodo.list(function (data) {
    res.render('homework', {
      todo_list: data
    });
  });
}