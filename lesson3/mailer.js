// Отправка почтовых сообщенй, используя модуль nodemailer

var settings = require('./settings-mailer');

var nodeMailer = require('nodemailer');

// Создаем транспорт, через который будем отправлять сообщение (opens pool of SMTP connections)
var smtpTransport = nodeMailer.createTransport({
  service: 'Yandex',
  auth:    {
    user: settings.login,
    pass: settings.pass
  }
});

// Определяем настройки письма
var mailOptions = {
  from:    'Most friendly guys <' + settings.login + '>',
  to:      settings.to, // list of receivers
  subject: 'Message', // Subject line
  text:    'Hello from nodemailer!', // plaintext body
  html:    '<b>Hello from nodemailer!</b>' //html body
};

// Отправляем сообщение
smtpTransport.sendMail(mailOptions, function (error, info) {
  if (error) {
//    return console.error(error);
    throw error;
  }

  console.log('Message info: ', info.response);
  console.log('Full info: ', info);

  // shut down the connection pool, no more messages
  //smtpTransport.lose();
});