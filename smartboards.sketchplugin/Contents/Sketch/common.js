var artboardPrefixRegex = /^[A-Z]{1,2}\d{2,3}\_/;
var artboardPrefixOnly = /^[A-Z]{1,2}\d{2,3}$/;

var renameArtboard = function(artboardObject, finalName) {

  [artboardObject setName:finalName];
}

var align = function(context, shouldRename) {

// Organize artboards by row and column and rename for alphabetical sort.

var doc = context.document;

// options
var PADDING = 100;

// Get all the artboards on the current page.
var artboards = [[doc currentPage] artboards];
var page = [doc currentPage];

// Variables to figure out the names (letter for row, number for column).
var currentRow = -1;
var currentColumn = -1;
var lastTop = -10000000000000000000;
var rowHeight = 0;
var lastWidth = 0;
var lastX = 0;
var lastY = 0;

// Set up the artboards object.
var artboardsMeta = [];

// Add artboard data to the object.
for (var i = 0; i < artboards.count(); i++) {
  var artboard = artboards[i];
  var frame = artboard.frame();
  var artboardName = artboard.name();
  // run the name through the regex.  If it matches, split and replace name with split result

  if(artboardPrefixRegex.test(artboardName)){
    artboardName = artboardName.split(artboardPrefixRegex)[1]
  };

  artboardsMeta.push({
    artboard: artboard,
    name: artboardName,
    width: frame.width(),
    height: frame.height(),
    left: frame.x(),
    top: frame.y()
  });
}

// Sort artboards by x and y position (grouping).
artboardsMeta.sort(function(a, b) {
  if (a.top != b.top) {
    return a.top - b.top;
  }
  return a.left - b.left;
});

// artboard object with
var artboardRows = [];

// Align artboards to grid, assign names.
for (var i = 0; i < artboardsMeta.length; ++i) {
  var obj = artboardsMeta[i];
  var artboard = obj.artboard;
  var height = obj.height;
  var width = obj.width;
  var name = obj.name;
  var newRow = 0;
  var oLeft = obj.left;
  var oTop = obj.top;
  
  var artboard = artboardsMeta[i];
  if (artboard.top > lastTop) {
    ++currentRow;
    currentColumn = 0;
    lastTop = artboard.top;
	newRow = 1;
  }

  if(shouldRename) {
    // Get the letter for the row
    if(currentRow <= 25) {
      var charCode = String.fromCharCode(65 + currentRow);
    }

    if(currentRow > 25) {
      var charCode = 'A' + String.fromCharCode(65 + parseInt(currentRow - 26));
    }

    // Get the zero based number for the column
    var formattedRow = currentColumn < 10 ? '0' + currentColumn : currentColumn;


    // Assemble the new artboard name -- test if name matches a generated prefix
	if(artboardPrefixOnly.test(name)){
		//if it does, just overwrite
		var finalName = charCode + formattedRow;
	} else {
		//otherwise add prefix to current name
		var finalName = charCode + formattedRow + '_' + name;
	};

//	finalName = lastY + "_" + rowHeight;
    
    artboardObject = artboard.artboard;
    renameArtboard(artboardObject, finalName);
  }

  //
  // LAYER POSITIONING
  //

  var artboardInternal = artboard.artboard;
  var frame = [artboardInternal frame];
  [frame setX: (currentColumn ? lastX + lastWidth + PADDING : 0)];
  [frame setY: (currentRow ? (newRow ? lastY + rowHeight + PADDING : lastY):0)];

  if ((height>rowHeight) || (newRow)) {
	  rowHeight = height;
  }

  lastWidth = width;
  lastX = artboardInternal.frame().x();
  lastY = artboardInternal.frame().y();

  ++currentColumn;
}

//
// LAYER ORDERING
//

// Sort artboards in the Layers List.
var layersList = [];
for (var i = 0; i < artboards.count(); i++) {
  var artboard = artboards[i];
  var name = artboard.name();
  layersList.push({
    artboard: artboard,
    name: name
  });
}

// Sort layers list by name.
layersList.sort(function(a, b){
  if(a.name < b.name) {
    return 1
  }
  if(a.name > b.name) {
    return -1
  }
  return 0
});

// Helper function to add artboards.
function addArtboard(page, artboard) {
  var frame = artboard.frame();
  frame.constrainProportions = false;
  page.addLayers([artboard]);
  return artboard;
};

// Helper function to remove artboards.
function removeArtboardFromPage(page, name) {
  var theArtboard = null;
  var abs = page.artboards().objectEnumerator();

  while (a = abs.nextObject()) {
    if (a.name() == name) {
      page.removeLayer(a)
      break;
    }
  }
}

// Loop through the alphabetized items, remove the old ones and add the new ones.
for (var i = 0; i < layersList.length; i++) {
  var artboard = layersList[i];
  removeArtboardFromPage(page, artboard.name)
  addArtboard(page, artboard.artboard);
}

};
