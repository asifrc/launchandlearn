var POLL_TIMEOUT = 10000;

var app = {
  message: "",
  messageSpinner: false,
  hideCreate: false,
  showDelete: false
};

var Stack = function() {
  var self = this;
  self.status = "UNKNOWN"
  self.outputs = {};
  self.exists = false;

  self.update = function(data) {
    self.status = data.status;
    self.exists = (data.outputs.WorkstationIP) ? true : false;
    $.extend(self.outputs, data.outputs);
  };

  self.clearOutputs = function() {
    $.extend(self.outputs, {
      WorkstationIP: null,
      Username: null,
      Password: null
    });
    self.exists = false;
  };

  self.clearOutputs();
}
var stack = new Stack();

var displayStatus = function(html, spinner) {
  app.message = html;
  app.messageSpinner = spinner || false;
  app.hideCreate = stack.exists || app.messageSpinner;
  app.showDelete = stack.exists && !app.messageSpinner;
};

var stackCreated = function(stack) {
  displayStatus("");
};

var stackDeleted = function(status) {
  stack.clearOutputs();
  displayStatus("");
};


var pollForCreation = function() {
  $.get('/stacks', function(data) {
    stack.update(data);
    if (stack.status === "CREATE_IN_PROGRESS") {
      setTimeout(pollForCreation, POLL_TIMEOUT);
    }
    else {
      stackCreated(stack);
    }
  });
};

var pollForDeletion = function() {
  $.get('/stacks', function(data) {
    stack.update(data);
    if (stack.status === "DOES_NOT_EXIST") {
      stackDeleted(status);
    }
    else {
      setTimeout(pollForDeletion, POLL_TIMEOUT);
    }
  });
};

var createStack = function() {
  displayStatus("Requesting New VM..", true);
  $request = $.post('/stacks');
  $request.done(function(data) {
    asif = data;
    displayStatus("Creating New VM...", true);
    pollForCreation();
  });
  $request.fail(function(error) {
    asif = error;
   displayStatus("Fail :(" + error.responseText);
  });
};

var deleteStack = function() {
  displayStatus("Requesting to Delete VM..", true);
  $request = $.ajax({url: '/stacks', type: 'DELETE'});
  $request.done(function(data) {
    asif = data;
    displayStatus("Deleting VM...", true);
    pollForDeletion();
  });
  $request.fail(function(error) {
    asif = error;
   displayStatus("Fail :(" + error.responseText);
  });
};

var describeStack = function() {
  displayStatus("Requesting to describe VM..");
  $request = $.get('/stacks');
  $request.done(function(data) {
    asif = data;
    stack.update(data);
    displayStatus("");
  });
  $request.fail(function(error) {
    asif = error;
   displayStatus("Fail :(" + error.responseText);
  });
};

var downloadRDP = function() {
  window.location.href = "/stacks/rdp";
};

var rivetBindings = function() {
  rivets.bind($('#stackActions'), {app: app, stack: stack});
  rivets.bind($('#stackInfo'), {stack: stack});
};

$(function() {
  rivetBindings();
  $('#btnCreate').on('click', createStack);
  $('#btnDelete').on('click', deleteStack);
  $('#btnDownloadRDP').on('click', downloadRDP);
  describeStack();
});

