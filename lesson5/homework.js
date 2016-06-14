var express     = require('express'),
    template    = require('consolidate').handlebars,
    bodyParser  = require('body-parser'),
    controlTodo = require('./todolist'),
    app         = express(),
    PORT        = 8000,

    server      = app.listen(PORT, function () {
      var host = server.address().address,
          port = server.address().port;
      console.log('Server was running on\nhost: ', host, '\nport: ', port);
    });

app.engine('hbs', template);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
//app.use(cookieParser());

app.post('/', function (req, res) {
  var command = req.body.command;

  console.log('command: ' + command);
  console.log(req.body);

  var status, title, id;

  if (command == 'add') {
    status = (req.body.status === undefined) ? 'false' : 'true';
    title  = req.body.title;
    controlTodo.add({title: title, status: status}, function (result) {
      getList(res);
    });
  } else if (command == 'change') {
    id    = req.body.id;
    title = req.body.title;
    controlTodo.change(id, {title: title}, function (result) {
      getList(res);
    });
  } else if (command == 'complete') {
    id = req.body.id;
    controlTodo.complete(id, function (result) {
      getList(res);
    });
  } else if (command == 'delete') {
    id = req.body.id;
    controlTodo.delete(id, function (result) {
      getList(res);
    });
  }
});

app.get('/', function (req, res) {
  getList(res);
});

function getList(res) {
  controlTodo.list(function (data) {
    console.log(data);

    res.render('homework', {
      todo_list: data
    });
  });
}