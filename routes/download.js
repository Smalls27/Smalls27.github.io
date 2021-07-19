const express = require('express');
const downloadRouter = express.Router();
const User = require('../schemas/userSchema');

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
};

const didPay = async (req, res, next) => {
    if (req.user.paid) return next();
    res.redirect('/musicPlayer');
};

downloadRouter.route('/')
    .get(isLoggedIn, didPay, async (req, res) => {
       await User.findOneAndUpdate({ _id: req.user._id }, { $set: { paid: false }})
        res.render('download');
    });

module.exports = downloadRouter;