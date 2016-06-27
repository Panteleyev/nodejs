'use strict';

/**
 * Модуль авторизации через GitHub
 *
 */

const passport       = require('passport'),
      GitHubStrategy = require('passport-github2').Strategy;

module.exports = (app) => {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GitHubStrategy({
      clientID:     'b01bb5c65fe85958d55e',
      clientSecret: 'dee2af5bbbaba751ba9661a4c7467f8e0cc2089b',
      callbackURL:  'http://localhost:8000/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));

  /**
   * Метод сохранения данных пользователя в сессии
   *
   * user - идентификатор для поиска в сессии
   * возврат в done
   */
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  /**
   * Поиск из БД по username и возврат в done
   */
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });


  app.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}));

  app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
      console.log('GitHub auth: success! But... ');

      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );
};