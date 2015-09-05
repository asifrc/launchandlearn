var displayStatus = function(message) {
  $('#dvStatus').html(message);
};

var createStack = function() {
  displayStatus("Requesting New VM..");
  $request = $.post('/stacks');
  $request.done(function(data) {
    asif = data;
    console.log(data);
    displayStatus("Creating New VM...");
  });
  $request.fail(function(error) {
    asif = error;
    console.log(error);
   displayStatus("Fail :(" + error.responseText);
  });
};

var deleteStack = function() {
  displayStatus("Requesting to Delete VM..");
  $request = $.ajax({url: '/stacks', type: 'DELETE'});
  $request.done(function(data) {
    asif = data;
    console.log(data);
    displayStatus("Deleting VM...");
  });
  $request.fail(function(error) {
    asif = error;
    console.log(error);
   displayStatus("Fail :(" + error.responseText);
  });
};

$(function() {
  $('#btnCreate').on('click', createStack);
  $('#btnDelete').on('click', deleteStack);
});

