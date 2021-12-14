var express = require('express');
const { post, put } = require('.');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'User' });
});

router.delete('/delete', function(req, res, next) {
  console.log("body" , req.body)
      connection.query('Delete from users where Id=?',[req.body.tid], function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
         
  });

module.exports = router;
