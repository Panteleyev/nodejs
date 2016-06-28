'use strict';

/**
 * Метод для проверки пользователя
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login'); // переход на страницу логина
};