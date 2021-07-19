const express = require('express');
const accountRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schemas/userSchema');
;

accountRouter.route('/')
    .get((req, res) => {
        res.render('account');
    })
    .post(async (req, res, next) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            username: req.body.username,
            password: hashedPassword,
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