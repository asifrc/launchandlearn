var AWS = require('aws-sdk');
var router = require('express').Router();

var template = require('../templates/chefwindows.json');

var cfConfig = {
  region: "us-west-2"
};

var cloudformation = new AWS.CloudFormation(cfConfig);

var respond = function(res, result) {
    res.contentType('application/json');
      res.send(JSON.stringify(result));
};


var createStack = function(req, res) {
  var params = {
    "StackName": "LaunchVMTest",
    "TemplateBody": JSON.stringify(template),
    "Tags": [
      {
        "Key": "source",
        "Value": "LaunchVM"
      }
    ]
  };
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
