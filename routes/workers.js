var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('workers', { title: 'Workers' });
});
// router.get('/edit', function(req, res, next) {
//     res.render('editworker', { title: 'Workers' });
//   });

router.post('/', function(req, res, next) {

	connection.query('SELECT * from workers', function (error, results, fields) {
		if (error) throw error;
	
	connection.query('SELECT * from users', function (error, results1, fields) {
		if (error) throw error;
		//console.log("resu" , results , results1)
		 res.send({ results, results1});
	});
	});
});

router.post('/getone', function(req, res, next) {

	connection.query('SELECT * from workers where WorkerId =?',[req.body.tid], function (error, results, fields) {
		if (error) throw error;
        res.send(results);
	});
});


router.delete('/delete', function(req, res, next) {
console.log("body" , req.body)
    connection.query('Delete from workers where WorkerId=?',[req.body.tid], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
       
});


router.post('/edit', function(req, res, next) {	
    console.log(req.body)
    
        connection.query('UPDATE workers set  Name ="'+req.body.name+'",Email ="'+req.body.email+'",Contact ="'+req.body.contact+'", Speciality ="'+req.body.speciality+'" , Shift ="'+req.body.shift+'" , WorkingHours ="'+req.body.hours+'" ,GrossSalary ="'+req.body.salary+'"  Where WorkerId = "'+req.body.id+'"', function (error, results, fields) {
            if (error) throw error;
        
            res.send(JSON.stringify(results));
        
        });
       
    });
module.exports = router;
