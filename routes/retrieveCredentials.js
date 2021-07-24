const express = require('express');
const credentialRouter = express.Router();
const User = require('../schemas/userSchema');

credentialRouter.route('/')
    .get((req, res) => {
        res.render('retrieveCredentials');
    })
    .post((req, res) => {
        const getEmail = {
            email: req.body.email
        };

        User.findOne({email: getEmail.email})
        .then(user => {
            if (!user) {
                res.render('nicknameError');
            } else {
                const email = user.email;
                const password = user.password;
                res.render('credentialInfo', { email: email, password: password})
            };


        });
    });

module.exports = credentialRouter;