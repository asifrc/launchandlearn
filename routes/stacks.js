var AWS = require('aws-sdk');
var router = require('express').Router();

var template = require('../templates/chefwindows.json');

var cfConfig = {
  region: "us-west-2"
};

var appName = "LaunchAndLearn";
var stackName = appName + "Test";

var cloudformation = new AWS.CloudFormation(cfConfig);

var respond = function(res, result) {
    res.contentType('application/json');
      res.send(JSON.stringify(result));
};


var createStack = function(req, res) {
  var params = {
    "StackName": stackName,
    "TemplateBody": JSON.stringify(template),
    "Tags": [
      {
        "Key": "source",
        "Value": appName
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

var deleteStack = function(req, res) {
  var params = {
    "StackName": stackName,
  };
  cloudformation.deleteStack(params, function(err, data) {
    if (err) {
      respond(res.status(502), err);
    }
    else {
      respond(res.status(202), data);
    }
  });
};

var describeStack = function(req, res) {
  var params = {
    "StackName": stackName,
  };
  cloudformation.describeStacks(params, function(err, data) {
    if (err) {
      respond(res.status(200), "DOES_NOT_EXIST");
    }
    else {
      respond(res.status(200), data["Stacks"][0]["StackStatus"]);
    }
  });
};

router.post('/', createStack);
router.delete('/', deleteStack);
router.get('/', describeStack);

module.exports = router;
