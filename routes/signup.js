var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
//var popupS = require('popups');

//var connection = require('../connection');

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Register' });
});

router.post('/', function(req, res, next) {
	
    
console.log("body ",req.body)
    bcrypt.hash(req.body.password, 8)
 .then(newpassword => {
     console.log(newpassword)
  bcrypt.compare(req.body.password, newpassword)
    .then(isEqual => {
      console.log(isEqual); // true
  

	connection.query("INSERT INTO users(Name, Contact, Email, Password, userType) VALUES ('"+req.body.name+"','"+req.body.phone+"','"+req.body.email+"','"+newpassword+"','"+req.body.type+"')", function (error, results, fields) {
		
        if (error) {
            console.log(error)
		res.json({
                    status:false,
                    message:'error'
                })
        }
        
        else
        { 
                res.json({
                    status:true,
                    message:'Registered'
                })

        }

	});


 });
});

});
module.exports = router;
