var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors =require ('cors');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var adminsigninRouter = require('./routes/adminlogin');
var signinworkerRouter = require('./routes/signinworker');
var app = express();
var mysql=require("mysql");

app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
  res.locals.connection=mysql.createConnection({
    host:'us-cdbr-east-04.cleardb.com',
    user:'b080989610da46',
    password:'eb1e0f74',
    database:'heroku_678b68b3c4ffbc5',
    connectTimeout: 30000,
    acquireTimeout: 30000,
    connectionLimit: 16000

  });
    res.locals.connection.connect(); 
    next();

    
});
// mysql://b080989610da46:eb1e0f74@us-cdbr-east-04.cleardb.com/heroku_678b68b3c4ffbc5?reconnect=true


app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: !true }
    
  })
);


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
