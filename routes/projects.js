var router = require('express').Router();

var Project = require('../models/project');

var respond = function(res, result) {
    res.contentType('application/json');
      res.send(JSON.stringify(result));
};


var createProject = function(req, res) {
  console.log("body", req.body);
  Project.create(req.body, function(err) {
    if (err) {
      respond(res.status(400), {});
    }
    else {
      respond(res.status(201), {
        message: "Project " + req.body.name + " created"
      });
    }
  });
};

router.post('/', createProject);

module.exports = router;
