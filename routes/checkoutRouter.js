const express = require('express');
const zip = require('express-zip');
const checkoutRouter = express.Router();
const User = require('../schemas/userSchema');

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
}

checkoutRouter.route('/')
    .get(isLoggedIn, (req, res) => {
        let paymentIntent;
        res.render('checkout', { clientSecret: paymentIntent });
    })
    .post(async (req, res) => {
        const { downloadItems } = req.body;
        await User.findOneAndUpdate({ _id: req.user._id }, { $set: { paid: true }});
        console.log(downloadItems)
        if (req.user.paid) {
            res.download(`public/songs/${downloadItems}.mp3`);
        } else {
            res.send('You must pay for items.')
        }

    });
 
module.exports = checkoutRouter;