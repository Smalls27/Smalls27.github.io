require('dotenv').config({ path: './.env'});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const authenticate = require('./authenticate');
const playerRouter = require('./routes/playerRouter'); 
const loginRouter = require('./routes/loginRouter');
const accountRouter = require('./routes/accountRouter');
const credentialRouter = require('./routes/retrieveCredentials');
const checkoutRouter = require('./routes/checkoutRouter');
const uploadRouter = require('./routes/uploadRouter');
const downloadRouter = require('./routes/download');


mongoose.connect('process.env.mongo', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database safely.'), err => console.log(err));

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use(session({
	secret: process.env.session_id,
	resave: false,
	saveUninitialized: true,
  cookie: {
    sameSite: 'lax',
  }
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
app.use('/musicPlayer', playerRouter);
app.use('/checkout', checkoutRouter);
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
app.use(express.static(path.join(__dirname, 'public')));


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
  res.render('error', { err: res.locals.message });
});

module.exports = app;
