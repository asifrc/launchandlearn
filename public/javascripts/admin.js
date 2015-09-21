var app = {
  message: "",
  messageSpinner: false,
};

var project = {
  name: "",
  templateUrl: "",
  password: "",
  reset: function() {
    this.name = "";
    this.templateUrl = "";
  }
};

var createProject = function() {
  $.post('/projects', project).done(function(){
    project.reset();
  }).fail(function(error) {
    alert(error.responseJSON.message);
  });
};

var rivetBindings = function() {
  rivets.bind($('#app'), {app: app, project: project});
};

$(function() {
  rivetBindings();
  $('#btnCreate').on('click', createProject);
});

