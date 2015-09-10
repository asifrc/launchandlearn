var mongoose = require('mongoose');

var config = require('../config');

mongoose.connect(config.MONGO_URL);

var Project = mongoose.model('Project', {
  name: String,
  templateUrl: String
});

var createProject = function(params, cb) {
  var project = new Project({
    name: params.name,
    templateUrl: params.templateUrl
  });
  project.save(cb);
};

var findProject = function(query, cb) {
  console.log("query", query);
  Project.findOne(query, cb);
};

module.exports = {
  Model: Project,
  create: createProject,
  find: findProject
};
