const nodemailer = require('nodemailer')
const Constants = require('../config/Constants')
const logger = require('../config/Logger');
// const fs = require("fs");
const template = '../email_templates/review.ejs';

logger.debug(template)

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  port: 25,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: Constants.Email.USER,
    pass: Constants.Email.PASS,
  },
});



// exports.dispatchEmail = async function () {
  exports.dispatchEmail = function () {
  logger.debug("################### Entering Email Dispatcher ################################");
  // logger.debug(assignmentObj.name, assignmentObj.email, assignmentObj.level, assignmentObj.day, assignmentObj.answer1)

  return new Promise(function (resolve, reject) {
    // name=assignmentObj.name
    // logger.debug(name)

   ejs.renderFile(template, (err, html) => {
    if (err) logger.debug(err); // Handle error

    logger.debug(`HTML: ${html}`)

    const mailOptions = {
      //from: 'codepannu.assignments@gmail.com',   sender address
      to: assignmentObj.email, // list of receivers
      bcc: 'anitha.calibre@gmail.com',
      subject: 'Congratulations from codePannu', // Subject line
      html: html
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        logger.error('Error:- ' + err.stack);
        reject(new Error('Ooops, something broke!'));
      }
      else {
        logger.debug(info);
        logger.debug('************exiting email dispatcher successfully****************');
        resolve(true);
      }
    });
  });
  });
}





