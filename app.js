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

var workersRouter = require('./routes/workers');
var addworkersRouter = require('./routes/addworker');
var servicesRouter = require('./routes/services');
var packageRouter = require('./routes/packages');
var reviewRouter = require('./routes/reviews');

var userpanelRouter = require('./routes/userpanel');
var bookingsRouter = require('./routes/bookings');
var userpackageRouter = require('./routes/userpackages');

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
app.use(express.static(path.join(__dirname, 'assets')));


// app.use(function(req,res,next){


//   });
//     res.locals.connection.connect(); 
//     next();

    
// });
// mysql://b080989610da46:eb1e0f74@us-cdbr-east-04.cleardb.com/heroku_678b68b3c4ffbc5?reconnect=true


var dbConfig = {
  host:'us-cdbr-east-04.cleardb.com',
    user:'b080989610da46',
    password:'eb1e0f74',
    database:'heroku_678b68b3c4ffbc5',
    connectTimeout: 30000,
    acquireTimeout: 30000,
    connectionLimit: 16000,
  port: 3306
};

var connection;
function handleDisconnect() {
connection = mysql.createConnection(dbConfig);  // Recreate the connection, since the old one cannot be reused.
connection.connect( function onConnect(err) {   // The server is either down
  if (err) {                                  // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 10000);    // We introduce a delay before attempting to reconnect,
  }  
  global.connection = connection                                         // to avoid a hot loop, and to allow our node script to
});                                             // process asynchronous requests in the meantime.
                                              // If you're also serving http, display a 503 error.
connection.on('error', function onError(err) {
  console.log('db error', err);
  if (err.code == 'PROTOCOL_CONNECTION_LOST') {   // Connection to the MySQL server is usually
      handleDisconnect();    
      global.connection = connection                     // lost due to either server restart, or a
  } else {                                        // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
  }
});
}
handleDisconnect();

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: !true }
    
  })
);


app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/admin', adminsigninRouter);
app.use('/signinworker', signinworkerRouter);

app.use('/workers', workersRouter);
app.use('/addworkers', addworkersRouter);
app.use('/services', servicesRouter);
app.use('/packages', packageRouter);
app.use('/reviews', reviewRouter);

app.use('/userpanel', userpanelRouter);
app.use('/booking', bookingsRouter);
app.use('/userpackage', userpackageRouter);

app.use('/admindashboard', function(req, res, next) {
  res.render('index', { title: 'Type' });
});

app.use('/workerportal', function(req, res, next) {
  res.render('workerportal', { title: 'Worker portal' });
});

app.use('/editworker', function(req, res, next) {
  res.render('editworker', { title: 'Workers' });
});

app.use('/getservices', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

app.use('/getbookings', function(req, res, next) {
  res.render('bookings', { title: 'Bookings' });
});
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
