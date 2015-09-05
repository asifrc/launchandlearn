var router = require('express').Router();

var AWS = require('aws-sdk');

var cloudformation = new AWS.CloudFormation();

var respond = function(res, result) {
    res.contentType('application/json');
      res.send(JSON.stringify(result));
};


var createStack = function(req, res) {
  var params = {};
  cloudformation.createStack(params, function(err, data) {
    if (err) {
      respond(res.status(502), err);
    }
    else {
      respond(res.status(202), data);
    }
  });
};


router.post('/', createStack);

module.exports = router;
