const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Constants = require('./config/Constants');
const logger = require('./config/Logger');
const sqlDS = require('./store/sqlDataStore');
const email=require('./utils/emailDispatch');
const app = express();
var path = require('path')
// const PORT = 3000;
// const sampleRoutes = require('./routes/sampleRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
  logger.debug("******************* Entered Routes ********************************")
  try {
    sqlDS.getAssignments().then(
      function (data) {
        logger.debug("******************* Exited Routes Successfully ********************************");
        res.render(__dirname + "/views/assignmentsTable", {data});
      }
    ).catch(function (err) {
      logger.debug("Promise rejection error: " + err.stack);
      logger.debug("******************* Exited Routes With Failure ********************************");
      res.status(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
    }
    );
  } catch (e) {
    console.log(e)
    res.status(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
  }
});


app.post('/update-assignment', function (req, res) {
// logger.debug(req.body)
assignmentObj=req.body
  logger.debug("******************* Entered Routes ********************************")
  try {
    sqlDS.updateAssignment(assignmentObj).then(
      function () {
        logger.debug("******************* Exited Routes Successfully ********************************");
        return (res.json({'status':200, 'url':'/'}))
      }
    ).catch(function (err) {
      logger.debug("Promise rejection error: " + err.stack);
      logger.debug("******************* Exited Routes With Failure ********************************");
      res.status(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
    }
    );
  } catch (e) {
    console.log(e)
    res.status(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
  }
});


app.get('/email', function (req, res) {
  logger.debug("******************* Entered Routes ********************************")
  try {
    email.dispatchEmail().then(
      function() {
        logger.debug("******************* Exited Routes Successfully ********************************");
        res.status(Constants.Response.CODE_SUCCESS).send(Constants.Response.CODE_SUCCESS);
      }
    ).catch(function (err) {
      logger.debug("Promise rejection error: " + err.stack);
      logger.debug("******************* Exited Routes With Failure ********************************");
      res.status(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
    }
    );
  } catch (e) {
    console.log(e)
    res.status(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
  }
});

app.listen(Constants.Server.PORT, () => {
  console.log("Node Server started at " + Constants.Server.PORT + ", waiting for requests....");


});
