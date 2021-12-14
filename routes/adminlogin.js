var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
//var connection = require('../connection');
const bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  res.render('adminlogin', { title: 'Login' });
});

let userarray=[];
router.post('/', function(req, res, next) {
  
  var email = req.body.email;
  var password = req.body.password;
  console.log("body", req.body)

  if(email == "admin@gmail.com" && password == "qwerty000"){
    req.session.loggedin = true;
    req.session.temp = 1;
    req.session.name = "admin"; 
    req.session.email = "admin@gmail.com";
    req.session.utype = "admin";

    let id = 1;
    let name = "admin";
    let email = "admin@gmail.com";
    let utype = "admin"
    res.json({
        status:true,
        message:'Successfully authenticated',
        id,
        name,
        email,
        utype
    })
  }
  else{
    res.json({
        status:false,
        message:'Incorrect email or password'
    })
  }
});
module.exports = router;
