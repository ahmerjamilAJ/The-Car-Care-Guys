var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
//var connection = require('../connection');
const bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

let userarray=[];
router.post('/', function(req, res, next) {
  
  var email = req.body.email;
  var password = req.body.password;
  console.log("body", req.body)
 connection.query(
    'SELECT * FROM users WHERE Email = ?',
    [email],
    function(error, results, fields) {
      if (error) {
        console.log('error');
      } else {
        if (results.length > 0) {console.log("result", results[0].Password)
          bcrypt.compare(req.body.password, results[0].Password).then(isEqual => {console.log("hered0", isEqual)
            if (isEqual) {console.log("here")
              connection.query(
                'SELECT Id,Name,Email,userType FROM users WHERE Email = ?',
                [email],
                function(error, results, fields) {
                  console.log("ress" , results[0])
                  var temp = JSON.stringify(results[0].Id);
                   var name = results[0].Name;
                  var utype = results[0].userType;
 
                  req.session.loggedin = true;
                  req.session.temp = temp;
                  req.session.name = name; 
                  req.session.email = email;
                  req.session.utype = utype;
               
           
                  res.json({
                    status:true,
                    message:'Successfully authenticated',
                    temp,
                    utype,
                    
                })
                }
              );
            } else {
               res.json({
                    status:false,
                    message:'Incorrect email or password'
                })
            }
          });
        } else {
          res.json({
                    status:false,
                    message:'Email doesnot exist'
                })
        }
      }
    }
  );
});


router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/signin');
        //res.send("Logged out")
      }
    });
  }
});

router.get('/logoutworker', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/signinworker');
        //res.send("Logged out")
      }
    });
  }
});
module.exports = router;
