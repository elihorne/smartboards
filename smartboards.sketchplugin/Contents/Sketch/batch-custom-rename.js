// import common code
@import "common.js"

var onRun = function(context) {
  //var shouldRename = false;
  //align(context, shouldRename);

function createDialog()
{
	var alert = COSAlertWindow.new();

	function createTextFieldWithLavel(label,defaultValue) {
			alert.addTextLabelWithValue(label);
			alert.addTextFieldWithValue(defaultValue);
	}

	alert.setMessageText("Rename Selected Layers");
	alert.setInformativeText("Helpers: \nNumber Sequence: %N or %n \nDimensions: %W %H \nMove Original Layer Name: *");

	// Name
	createTextFieldWithLavel("Name:","");

	// Actions buttons.
	alert.addButtonWithTitle('OK');
	alert.addButtonWithTitle('Cancel');

	return alert;
}

  log('poop');

  var alert = createDialog();
  var result = alert.runModal();
  if (result == 1000) {
    log(alert.viewAtIndex(1).stringValue());
  } else {
    return;
  }


  var doc = context.document;
  //[doc askForUserInput: 'Rename Page Artboards' initialValue:'']
};
