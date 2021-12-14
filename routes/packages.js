var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addpackage', { title: 'Add package' });
});


router.post('/', function(req, res, next) {
console.log("body" , req.body)

    connection.query("INSERT INTO packages(PackageName, Description, ServicesIncluded, Validity,Cost ) VALUES ('"+req.body.name+"','"+req.body.description+"','"+req.body.serviceinclude+"','"+req.body.validity+"','"+req.body.cost+"')", function (error, results, fields) {
		
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

router.post('/getpackages', function(req, res, next) {

	connection.query('SELECT * from packages', function (error, results, fields) {
		if (error) throw error;
		 res.send(results);
	});
});


router.delete('/delete', function(req, res, next) {
    console.log("body" , req.body)
        connection.query('Delete from packages where Id=?',[req.body.tid], function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
           
    });


module.exports = router;
