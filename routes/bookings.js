var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('userbooking', { title: 'User Booking' });

  if (req.session.loggedin) {
    console.log(req.session);
    res.render('userbooking', { title: 'User Booking' });
  } else {
    res.redirect('/signin');
    console.log(error);
  }
});


router.post('/', function(req, res, next) {
console.log("body" , req.body)
let status = "Pending";
    connection.query("INSERT INTO bookings(UserId, UserName,ServiceId, ServiceName, WorkerId, WorkerName,Cost ,Status ) VALUES ('"+req.session.temp+"','"+req.session.name+"','"+req.body.serviceid+"','"+req.body.servicename+"','"+req.body.workerid+"','"+req.body.workername+"','"+req.body.cost+"','"+status+"')", function (error, results, fields) {
		
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

router.post('/getbookings', function(req, res, next) {

	connection.query('SELECT * from bookings', function (error, results, fields) {
		if (error) throw error;
		 res.send(results);
	});
});

router.post('/getuserbookings', function(req, res, next) {
console.log("sessss" , req.session)
	connection.query('SELECT * from bookings where UserId =?', [req.session.temp], function (error, results, fields) {
		if (error) throw error;
		 res.send(results);
	});
});


router.post('/getbookingbyid', function(req, res, next) {
  console.log("sessss" , req.session)
    connection.query('SELECT * from bookings where Id =?', [req.body.tid], function (error, results, fields) {
      if (error) throw error;
       res.send(results);
    });
  });


  router.post('/edit', function(req, res, next) {	
    console.log(req.body)
    let status = "Completed"
        connection.query('UPDATE bookings set  status ="'+status+'"  Where Id = "'+req.body.id+'"', function (error, results, fields) {
            if (error) throw error;
        
            res.send(JSON.stringify(results));
        
        });
       
    });


    router.post('/getworkerbookings', function(req, res, next) {
      console.log("sessss" , req.session)
        connection.query('SELECT * from bookings where WorkerId =?', [req.session.temp], function (error, results, fields) {
          if (error) throw error;
           res.send(results);
        });
      });
module.exports = router;
