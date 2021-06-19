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
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    }
    const duplicateUser =  User.findOne({username: newUser.username})
    if (duplicateUser) {
            res.render('duplicateUsername');
        } else {
            next();
        }
    User.create(newUser)
    .then(() => {
        res.render('createAccountConformation');
    })
    .catch(err => console.log(err))
});

module.exports = accountRouter;