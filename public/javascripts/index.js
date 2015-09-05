var POLL_TIMEOUT = 10000;

var displayStatus = function(message) {
  $('#dvStatus').html(message);
};

var stackCreated = function(status) {
  displayStatus("Stack Created! " + status);
};

var stackDeleted = function(status) {
  displayStatus("Stack Deleted! " + status);
};


var pollForCreation = function() {
  $.get('/stacks', function(status) {
    if (status === "CREATE_IN_PROGRESS") {
      setTimeout(pollForCreation, POLL_TIMEOUT);
    }
    else {
      stackCreated(status);
    }
  });
};

var pollForDeletion = function() {
  $.get('/stacks', function(status) {
    if (status === "DOES_NOT_EXIST") {
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
    displayStatus(JSON.stringify(data));
  });
  $request.fail(function(error) {
    asif = error;
   displayStatus("Fail :(" + error.responseText);
  });
};

$(function() {
  $('#btnCreate').on('click', createStack);
  $('#btnDelete').on('click', deleteStack);
  $('#btnGetInfo').on('click', describeStack);
});

