var express = require('express');
var playerRouter = express.Router();

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
}


/* GET home page. */
playerRouter.route('/')
.get(isLoggedIn, (req, res) => {
  res.render('musicPlayer');
});

playerRouter.route('/logout')
.get((req, res) => {
	req.logout();
	res.redirect('/');
})

module.exports = playerRouter;
