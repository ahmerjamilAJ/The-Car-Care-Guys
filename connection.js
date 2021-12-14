var mysql = require('mysql');

var pool = mysql.createPool({
    host:'us-cdbr-east-04.cleardb.com',
    user:'b080989610da46',
    password:'eb1e0f74',
    database:'heroku_678b68b3c4ffbc5',
    connectTimeout: 30000,
    acquireTimeout: 30000,
    connectionLimit: 16000

  });
    
  
   
var connection = function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            throw(err,null);
        }else{
            conn.query(sql,function(err,results){
                //callback(err,results);
                res.send(results)
            });
            conn.release();
        }
    });
};

module.exports = connection;