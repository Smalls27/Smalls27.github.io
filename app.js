if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const stripe = require('stripe')('sk_test_51GmWr7CPUry3AfVarVGcvo0bYT03cHo1m79Z1IO2bkaE8qyd9iUeV4SaixjNClOVIlg2ADFoduTprMGesbcpN2Er00a50BBSg0');
const paymentIntent = stripe.paymentIntent.create({
  amount: 129,
  currency: 'usd',
  metadata: {integration_check: 'accept_a_payment'}
});
const authenticate = require('./authenticate');
const playerRouter = require('./routes/playerRouter');
const loginRouter = require('./routes/loginRouter');
const accountRouter = require('./routes/accountRouter');
const credentialRouter = require('./routes/retrieveCredentials');


mongoose.connect('mongodb://localhost:27017/rgmregistry', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database safely.'), err => console.log(err));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
	secret: process.env.session_id,
	resave: false,
	saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticate.initialize);
app.use(authenticate.session);

app.use('/', loginRouter);
app.use('/account', accountRouter);
app.use('/credentials', credentialRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/musicPlayer', playerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
