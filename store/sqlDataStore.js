const logger = require('../config/Logger');
const mscf = require('./mySQLConnectionFactory');


exports.getAssignments = function () {
  logger.debug("################### Entered SQLDataStore ################################");
  var assignments = [];
  var SQL = "SELECT * FROM codePannu.assignments WHERE corrected_on IS NULL ORDER BY answer1 desc";

  return new Promise(function (resolve, reject) {
    mscf.pool.getConnection(function (err, con) {
      if (err) {
        logger.error('Error:- ' + err.stack);
        reject(new Error('Ooops, something broke!'));
      } else {
        con.query(SQL, function (err, result, fields) {
          logger.debug("################### Entered SQL ################################");
          if (err) {
            logger.error('Error:- ' + err.stack);
            reject(new Error('Ooops, something broke!'));
          } else {
            var data = [];
            Object.keys(result).forEach(function (key) {
              var row = result[key];
              var dataRow = {};
              var studentDetails= 'Name: '.concat(row.name,'; Email: ',row.email,'; Level: ',row.level, '; Day: ', row.day)
              dataRow['details'] = studentDetails.split(";").join("<br />")
              answer = row.answer1.replace(/^/gm, '#')
              dataRow['answer']=answer
              dataRow['id']=row.assignment_id
              // logger.debug(dataRow)
              data.push(dataRow);
            })
            logger.debug("################### Exited SQLDataStore ################################");
            resolve(data)
          }
        });
      }
    });
  });
};


exports.updateAssignment = function (assignmentObj) {
  logger.debug("################### Entered SQLDataStore ################################");
  logger.debug(assignmentObj.id, assignmentObj.comment,assignmentObj.rate)
  let SQL = "UPDATE codepannu.assignments SET comments=?, rating=?, corrected_on=? WHERE assignment_id=?";
  let DATA = [[String(assignmentObj.comment)], [String(assignmentObj.rate)], [new Date()], [assignmentObj.id]];

  return new Promise(function (resolve, reject) {
    mscf.pool.getConnection(function (err, con) {
      if (err) {
        logger.error('Error:- ' + err.stack);
        reject(new Error('Ooops, something broke!'));
      } else {
        var x = con.query(SQL, DATA, function (err, result, fields) {
          logger.debug("################### Entered SQL ################################");
          logger.debug(x.sql);
          if (err) {
            logger.error('Error:- ' + err.stack);
            reject(new Error('There is an error'));
          } else {
            logger.debug(result.affectedRows);
            logger.debug("################### Exited SQLDataStore ################################");
            resolve(true);
          }
        });
      }
    });
  });
};



