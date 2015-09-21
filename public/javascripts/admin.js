var app = {
  message: "",
  messageSpinner: false,
};

var project = {
  name: "",
  templateUrl: "",
  reset: function() {
    this.name = "";
    this.templateUrl = "";
  }
};

var createProject = function() {
  $.post('/projects', project, function(data) {
    if (data.error) {
      alert(data.error);
    }
    else {
      project.reset();
    }
  });
};

var rivetBindings = function() {
  rivets.bind($('#app'), {app: app, project: project});
};

$(function() {
  rivetBindings();
  $('#btnCreate').on('click', createProject);
});

