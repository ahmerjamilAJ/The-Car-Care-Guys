var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
//var connection = require('../connection');
const bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  res.render('signinworker', { title: 'Login Worker' });
});

let userarray=[];
router.post('/', function(req, res, next) {
  
  var email = req.body.email;
  var password = req.body.password;
  console.log("body", req.body)
 connection.query(
    'SELECT * FROM workers WHERE Email = ?',
    [email],
    function(error, results, fields) {
      if (error) {
        console.log('error');
      } else {
        if (results.length > 0) {
            if (req.body.password == results[0].Password) {console.log("pass match")
              connection.query(
                'SELECT WorkerId,Name,Email,UserType FROM workers WHERE Email = ?',
                [email],
                function(error, results, fields) {
                  console.log("ress" , results[0])
                  var temp = JSON.stringify(results[0].WorkerId);
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
         // });
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
module.exports = router;
