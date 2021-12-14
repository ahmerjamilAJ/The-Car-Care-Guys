var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addreview', { title: 'Add Review' });
});


router.post('/', function(req, res, next) {
console.log("body" , req.body)

    connection.query("INSERT INTO reviews(UserName, ServiceId, ServiceName, Review ) VALUES ('"+req.session.name+"','"+req.body.serviceid+"','"+req.body.servicename+"','"+req.body.review+"')", function (error, results, fields) {
		
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

router.post('/getreviews', function(req, res, next) {

	connection.query('SELECT * from reviews', function (error, results, fields) {
		if (error) throw error;
		 res.send(results);
	});
});


// router.delete('/delete', function(req, res, next) {
//     console.log("body" , req.body)
//         connection.query('Delete from packages where Id=?',[req.body.tid], function (error, results, fields) {
//             if (error) throw error;
//             res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//         });
           
//     });


module.exports = router;
