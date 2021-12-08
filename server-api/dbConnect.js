const mysql = require("mysql2");

const pool = mysql.createPool({
        connectionLimit : 10,
        host    : '172.17.0.2',
        port    :   3306,
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
