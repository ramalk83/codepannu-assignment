
// create a rolling file logger based on date/time that fires process events
// const opts = {
//   errorEventName:'error',
//   logDirectory:'/Users/kumaran/Documents/HM/hm-api/logs/', // NOTE: folder must exist and be writable...
//   fileNamePattern:'roll-<DATE>.log',
//   dateFormat:'YYYY.MM.DD'
// };
//const log = require('simple-node-logger').createRollingFileLogger(opts);

//let log = require('simple-node-logger').createSimpleLogger('project.log');

let log = require('simple-node-logger').createSimpleLogger();

log.setLevel('debug');

module.exports = log;
