var router = require('express').Router();
var stacks = require('./stacks');
var Project = require('../models/project');

router.get('/:project', function(req, res, next) {
  Project.find({name: req.params.project}, function(err, project) {
    if (err || !project) {
      res.status(404);
      next(err);
    }
    else {
      res.render('client', { title: 'Launch & Learn', project: project });
    }
  });
});

module.exports = router;
