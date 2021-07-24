const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./schemas/userSchema');


passport.use(new LocalStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		const loginPassword = password;
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });

			return done(null, user);
		});
	});
}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

exports.initialize = passport.initialize()
exports.session = passport.session()
