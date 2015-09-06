var POLL_TIMEOUT = 10000;

var app = {
  message: ""
};

var Stack = function() {
  var self = this;
  self.status = "UNKNOWN"
  self.outputs = {};

  self.update = function(data) {
    self.status = data.status;
    $.extend(self.outputs, data.outputs);
  };

  self.clearOutputs = function() {
    $.extend(self.outputs, {
      WorkstationIP: null,
      Username: null,
      Password: null
    });
  };
}
var stack = new Stack();

var displayStatus = function(html) {
  app.message = html;
};

var stackCreated = function(stack) {
  var message = "<p>Stack Created!</p>\n";
  displayStatus(message);
};

var stackDeleted = function(status) {
  stack.clearOutputs();
  displayStatus("Stack Deleted! " + status);
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
  displayStatus("Requesting New VM..");
  $request = $.post('/stacks');
  $request.done(function(data) {
    asif = data;
    displayStatus("Creating New VM...");
    pollForCreation();
  });
  $request.fail(function(error) {
    asif = error;
   displayStatus("Fail :(" + error.responseText);
  });
};

var deleteStack = function() {
  displayStatus("Requesting to Delete VM..");
  $request = $.ajax({url: '/stacks', type: 'DELETE'});
  $request.done(function(data) {
    asif = data;
    displayStatus("Deleting VM...");
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

var rivetBindings = function() {
  rivets.bind($('#dvStatus'), {app: app});
  rivets.bind($('#stackInfo'), {outputs: stack.outputs});
};

$(function() {
  rivetBindings();
  $('#btnCreate').on('click', createStack);
  $('#btnDelete').on('click', deleteStack);
  $('#btnGetInfo').on('click', describeStack);
  describeStack();
});

