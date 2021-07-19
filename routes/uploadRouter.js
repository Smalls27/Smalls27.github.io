const express = require('express');
const uploadRouter = express.Router();
const Song = require('../schemas/songSchema');

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
};

const isAdmin = (req, res, next) => {
    if (req.user.admin) return next();
    res.redirect('/musicPlayer');
};

uploadRouter.route('/')
    .get(isLoggedIn, isAdmin, (req, res) => {
        res.render('songUpload');
    })
    .post((req, res) => {
        const newSong = {
            artist: req.body.artist,
            song: req.body.song,
            path: req.body.path,
            price: req.body.price,
            album: req.body.album,
            single: req.body.single
        };

        Song.create(newSong)
        .then(song => {
            if (song) {
                res.redirect('/musicPlayer');
            } else {
                res.render('songUpload');
            }
        }).catch(err => console.log(err));
    });

module.exports = uploadRouter;