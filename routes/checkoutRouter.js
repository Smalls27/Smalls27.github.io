const express = require('express');
const zip = require('express-zip');
const checkoutRouter = express.Router();
const User = require('../schemas/userSchema');

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
};

const didPay = (req, res, next) => {
    if (req.user.paid) return next();
    res.redirect('/musicPlayer');
};

checkoutRouter.route('/')
    .get(isLoggedIn, didPay, (req, res) => {
        let paymentIntent;
        res.render('checkout', { clientSecret: paymentIntent });
    })
    .post(async (req, res) => {
        await User.findOneAndUpdate({ _id: req.user._id }, { $set: { paid: true }});
    });
 
checkoutRouter.route('/paymentSucceed')
    .get(isLoggedIn, (req, res) => {
        res.render('paymentSucceed');
    });

module.exports = checkoutRouter;