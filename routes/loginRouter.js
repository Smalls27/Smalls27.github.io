const express = require('express');
const passport = require('passport');
const loginRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schemas/userSchema');

const isLoggedOut = (req, res, next) => {
	if (!req.isAuthenticated()) return next();
	res.redirect('/musicPlayer');
};

/* GET users listing. */
loginRouter.route('/')
  .get(isLoggedOut, (req, res) => {
    res.render('login');
  })
  .post(passport.authenticate('local', {successRedirect: '/musicPlayer', failureRedirect: '/'}), (req, res) => {
    const login = {
      username: req.body.username,
      password: req.body.password
    };

    User.findOne({username: login.password})
    .then(user => {
      if (!user) {
        res.render('accountError');
      };

      if (login.Password === '') {
        res.render('passwordError');
      };
    
      res.redirect('/musicPlayer');

    })
    .catch(err => console.log(err));

  });

module.exports = loginRouter;
