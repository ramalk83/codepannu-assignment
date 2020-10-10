
const Constants = require('../config/Constants');
const logger = require('../config/Logger');
const mySQL = require('mysql');

var con = mySQL.createConnection({
  host: Constants.Sql.MS_HOST,
  user: Constants.Sql.MS_USER,
  password: Constants.Sql.MS_PASS
});

var pool = mySQL.createPool({
  host: Constants.Sql.MS_HOST,
  user: Constants.Sql.MS_USER,
  password: Constants.Sql.MS_PASS,
  database: Constants.Sql.MS_DB_SCHEMA,
  port: Constants.Sql.MS_DB_PORT,
});

exports.getSQLConnection = function (err) {
  //con.connect();
  con.connect(function (err) {
    if (err) {
      logger.error('Error:- ' + err.stack);
      return;
    }
    logger.info('MySQL Connected Id: ' + con.threadId);
  });
  return con;
};

exports.pool = pool;

/*

exports.getSQLConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

exports.mySQLCon = con
exports.mySQLPool = pool;


*/

//module.exports = getConnection;
//module.exports = getSQLConnection;
