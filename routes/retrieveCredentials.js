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
    }

    User.findOne({email: getEmail.email})
    .then(user => {
        if (!user) {
            res.render('nicknameError');
        } else {
           res.send(`<html>
                        <body>
                            <h1>Email: ${user.email}</h1>\n<h1>Password: ${user.password}</h1>\n<button onclick=${"backToLoginPage()"}>Go back to login page</button>
                            ${'<script src="/javascripts/script.js"></script>'}
                        </body>
                    </html>`);
        }


    })
})

module.exports = credentialRouter;