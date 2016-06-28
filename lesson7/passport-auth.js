'use strict';

/**
 * Модуль авторизации с помощью PassportJS
 *
 */

const passport      = require('passport'),
      LocalStrategy = require('passport-local');//.Strategy;

module.exports = {

  /**
   * Авторизация пользователя с PassportJS
   *
   * @param app
   * @returns {express.Handler}
   */
  auth: (app) => {

    /**
     * Настройка стратегии авторизации
     */
    passport.use(new LocalStrategy(function (login, password, done) {
      if (login !== 'admin' || password !== 'admin') {
        return done(null, false, {message: 'Incorrect login or password'});
      }
      return done(null, {login: login});
    }));

    /**
     * Метод сохранения данных пользователя в сессии
     *
     * user - идентификатор для поиска в сессии
     * возврат в done
     */
    passport.serializeUser(function (user, done) {
      done(null, user.login);
    });

    /**
     * Поиск из БД по username и возврат в done
     */
    passport.deserializeUser(function (id, done) {
      done(null, {login: id});
    });

    return passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    });
  }
};

