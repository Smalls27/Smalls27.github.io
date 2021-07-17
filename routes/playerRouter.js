require('dotenv').config({ path: './.env'});
const express = require('express');
const playerRouter = express.Router();
const Songs = require('../schemas/songSchema');
const stripe = require('stripe')(process.env.secret_key);


const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
}


/* GET home page. */
playerRouter.route('/')
.get(isLoggedIn, async (req, res) => {
	let errMessage;
	const songs = await Songs.find();
  	res.render('musicPlayer', { songs: songs, message: errMessage });
})
.post(async (req, res) => {
	const { cartItems } = req.body;

	await Songs.find()
	.then(async songs => {
		if (cartItems === undefined) {
			res.redirect('/musicPlayer');
		}

		const calculateTotal = (items, item) => {
			if (Array.isArray(cartItems)) {
				return items.reduce((a, b) => a.price + b.price);
			} else {
				return item[0].price;
			}
		}

		const items = songs.map(song => {
			if (Array.isArray(cartItems)) {
				return song;
			}
		});
		const item = songs.filter(song => song.song === cartItems);
	
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateTotal(items, item),
			currency: 'usd',
			payment_method_types: ['card']
		});
		
		res.render('checkout', { 
								clientSecret: paymentIntent.client_secret,
								cartItems: Array.isArray(cartItems) ? items : item });
	})
	.catch(err => console.log(err));
})

playerRouter.route('/logout')
.get((req, res) => {
	req.logout();
	res.redirect('/');
}) 

module.exports = playerRouter;
