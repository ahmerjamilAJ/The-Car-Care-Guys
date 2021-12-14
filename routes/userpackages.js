var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('addpackage', { title: 'Add package' });
// });


router.post('/', function(req, res, next) {
console.log("body" , req.body)

    connection.query("INSERT INTO packagebuy(PackageId,PackageName, UserId, UserName, Validity , Cost ) VALUES ('"+req.body.packageid+"','"+req.body.packagename+"','"+req.session.temp+"','"+req.session.name+"' ,'"+req.body.validity+"' ,'"+req.body.cost+"')", function (error, results, fields) {
		
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

router.post('/getuserpackages', function(req, res, next) {

	connection.query('SELECT * from packagebuy where UserId = ?',[req.session.temp], function (error, results, fields) {
		if (error) throw error;
		 res.send(results);
	});
});



module.exports = router;
