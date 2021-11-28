const mysql = require("mysql2");

const pool = mysql.createPool({
        connectionLimit : 10,
        host    : 'localhost',
        port    :   5000,
        database: 'coen241',
        password: '12345',
        user    : 'root'
    });

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback("Duck" + err);
    }
    callback(err, conn);
  });
};