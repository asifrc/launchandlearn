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

$(function() {
  $('#btnCreate').on('click', createStack);
});

