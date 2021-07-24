const express = require('express');
const accountRouter = express.Router();
const User = require('../schemas/userSchema');
;

accountRouter.route('/')
    .get((req, res) => {
        res.render('account');
    })
    .post(async (req, res, next) => {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
        User.findOne({username: newUser.username})
        .then(user => {
            if (user) {
                res.render('duplicateUsername');
            } else {
                User.create(newUser)
                .then(() => {
                    res.render('createAccountConformation');
                })
                .catch(err => console.log(err));
            };
        }).catch(err => console.log(err));
    });

module.exports = accountRouter;