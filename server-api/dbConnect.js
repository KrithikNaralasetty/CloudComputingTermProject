const mysql = require("mysql2");

const pool = mysql.createPool({
        connectionLimit : 10,
        host    : '0.0.0.0',
        port    :   5000,
        database: 'coen241',
        password: '12345',
        user    : 'root'
    });

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};
