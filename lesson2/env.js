// Посмотрим переменные окружения
console.log('environment variables: ', process.env);

// В Node.js мы используем переменные окружения, чтобы хранить информацию о статусе сервера:
// ['development', 'testing', 'stage', 'productions']
console.log('this is ' + process.env.NODE_ENV + ' server');