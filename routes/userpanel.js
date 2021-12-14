var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
//var connection = require('../connection');

router.get('/', function(req, res, next) {

  if (req.session.loggedin) {
    console.log(req.session);
    res.render('userpanel', { temp: req.session.name});
  } else {
    res.redirect('/signin');
    console.log(error);
  }
});
module.exports = router;