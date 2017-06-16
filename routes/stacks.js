var AWS = require('aws-sdk');
var router = require('express').Router();

var config = require('../config');
var template = require('../templates/chefwindows.json');

var Project = require('../models/project');

var cfConfig = {
  region: config.AWS_DEFAULT_REGION
};
console.log("Using region", cfConfig);

var appName = config.APP_NAME;

var cloudformation = new AWS.CloudFormation(cfConfig);

var respond = function(res, result) {
    res.contentType('application/json');
      res.send(JSON.stringify(result));
};

var getStackName = function(req) {
  return appName + "-" + req.params.project + "-" + req.sessionID;
};

var createStack = function(req, res) {
  Project.find({name: req.params.project}, function(err, project) {
    console.log("projects", err, project);
    if (err) {
      respond(res.status(404), err);
    }
    else {

      var params = {
        "StackName": getStackName(req),
        "TemplateURL": project.templateUrl,
        "Tags": [
          {
            "Key": "source",
            "Value": appName
          },
          {
            "Key": "llproject",
            "Value": project.name
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
    }
  });
};

var deleteStack = function(req, res) {
  var params = {
    "StackName": getStackName(req),
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

var formatOutputs = function(outputs) {
  var formattedOutput = {};
  outputs.forEach(function(output) {
    formattedOutput[output["OutputKey"]] =  output["OutputValue"]
  });
  return formattedOutput;
}

var getStack = function(req, cb) {
  var params = {
    "StackName": getStackName(req),
  };
  cloudformation.describeStacks(params, function(err, data) {
    var stack = {
      status: (err) ? "DOES_NOT_EXIST" : data["Stacks"][0]["StackStatus"],
      outputs: (err) ? [] : formatOutputs(data["Stacks"][0]["Outputs"]),
    };
    cb(stack);
  });
};

var describeStack = function(req, res) {
  getStack(req, function(stack) {
    respond(res.status(200), stack);
  });
};

var getStackRdpFile = function(req, res, next) {
  getStack(req, function(stack) {
    if (stack.status === "DOES_NOT_EXIST") {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    }
    else {
      var filename = stack.outputs["WorkstationIP"] + ".rdp";
      var rdp = "auto connect:i:1\n";
      rdp += "full address:s:" + stack.outputs["WorkstationIP"] + "\n";
      rdp += "username:s:" + stack.outputs["Username"];
      res.setHeader("Content-Type", "application/x-rdp");
      res.setHeader("Content-disposition", "attachment; filename=" + filename);
      res.send(rdp);
    }
  });
};

router.post('/:project', createStack);
router.delete('/:project', deleteStack);
router.get('/:project', describeStack);
router.get('/:project/rdp', getStackRdpFile);
router.get('/:project/asif', function(req, res) {
  res.send("hi");
});

module.exports = router;
