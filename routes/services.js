var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addservice', { title: 'Add Service' });
});


router.post('/', function(req, res, next) {
console.log("body" , req.body)

    connection.query("INSERT INTO services(ServiceName, ServiceDescription, EstimatedCost,EstimatedTime,AssignedWorkerId,AssignedWorkerName ) VALUES ('"+req.body.name+"','"+req.body.description+"','"+req.body.cost+"','"+req.body.time+"','"+req.body.workerid+"','"+req.body.workername+"')", function (error, results, fields) {
		
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

router.post('/getservices', function(req, res, next) {

	connection.query('SELECT * from services', function (error, results, fields) {
		if (error) throw error;
		 res.send(results);
	});
});


router.delete('/delete', function(req, res, next) {
    console.log("body" , req.body)
        connection.query('Delete from services where Id=?',[req.body.tid], function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
           
    });


module.exports = router;
