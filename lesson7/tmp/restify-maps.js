// Создание клиента для работы с API
var util    = require('util'),
    restify = require('restify');

// Создаем сервер, определяем точку входа в API
var client = restify.createJsonClient({
  url: 'http://maps.googleapis.com/'
});

// Делаем запрос
client.get(
  '/maps/api/geocode/json?address=Moscow+Red+Square',
  function (err, req, res, obj) {
    if (err)
      console.error(err);
    else
      console.log(util.inspect(obj, {depth: null}));

    var components = obj.results[0].address_components, key;
    for (key in components) {
      if (components[key].types == "postal_code") {
        console.log('ZIP CODE: ');
        return console.log(components[key].short_name);
      }
    }
  }
);