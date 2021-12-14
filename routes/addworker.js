var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addworker', { title: 'Add Workers' });
});


router.post('/', function(req, res, next) {
console.log("body" , req.body)
let type = "Worker";
let rating = 5
    connection.query("INSERT INTO workers(Name, Email, Password,Contact,UserType,Speciality, Shift, WorkingHours, GrossSalary, Rating) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"','"+req.body.contact+"','"+type+"','"+req.body.speciality+"','"+req.body.shift+"', '"+req.body.hours+"' ,'"+req.body.salary+"','"+rating+"')", function (error, results, fields) {
		
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
                    message:'Task added'
                })

        }

	
    });

});

module.exports = router;
