// import common code
@import "common.js"

var onRun = function(context) {

	function createDialog() {

		var alert = COSAlertWindow.new();

		function createTextFieldWithLabel(label,defaultValue) {
			alert.addTextLabelWithValue(label);
			alert.addTextFieldWithValue(defaultValue);
		}

		alert.setMessageText("Rename Page Artboards");
		alert.setInformativeText("This will replace the existing names for all artboards on this page.");

		// Name
		createTextFieldWithLabel("Name:","");

		// Actions buttons.
		alert.addButtonWithTitle('OK');
		alert.addButtonWithTitle('Cancel');

		return alert;
	}

	var alert = createDialog();
  var result = alert.runModal();
  if (result == 1000) {

		var doc = context.document;
		var artboards = [[doc currentPage] artboards];

		for (var i = 0; i < artboards.count(); i++) {
			var artboardObject = artboards[i];

			var artboardName = artboardObject.name();

			if(artboardPrefixRegex.test(artboardName)){
				var prefix = artboardName.split('_')[0];
				artboardName = prefix + '_' + alert.viewAtIndex(1).stringValue();
			} else {
				artboardName = alert.viewAtIndex(1).stringValue();
			}
			renameArtboard(artboardObject, artboardName);
		}
  } else {
    return;
  }

};
