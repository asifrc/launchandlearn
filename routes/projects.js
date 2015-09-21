var router = require('express').Router();

var Project = require('../models/project');

var config = require('../config');

var respond = function(res, result) {
    res.contentType('application/json');
      res.send(JSON.stringify(result));
};


var createProject = function(req, res) {
  if (req.body.password !== config["ADMIN_PASSWORD"]) {
    respond(res.status(403), { message: "Invalid Password" });
  }
  else {
    Project.create(req.body, function(err) {
      if (err) {
        respond(res.status(400), err);
      }
      else {
        respond(res.status(201), {
          message: "Project " + req.body.name + " created"
        });
      }
    });
  }
};

router.post('/', createProject);

module.exports = router;
