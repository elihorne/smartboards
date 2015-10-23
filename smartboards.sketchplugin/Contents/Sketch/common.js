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

// Set up the artboards object.
var artboardsMeta = [];

// Add artboard data to the object.
for (var i = 0; i < artboards.count(); i++) {
  var artboard = artboards[i];
  var frame = artboard.frame();
  artboardsMeta.push({
    artboard: artboard,
    name: artboard.name(),
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

  var artboard = artboardsMeta[i];
  if (artboard.top > lastTop) {
    ++currentRow;
    currentColumn = 0;
    lastTop = artboard.top;
  }


  if(shouldRename) {

  //
  // LAYER NAMING
  //

  // Get the letter for the row
  var charCode = String.fromCharCode(65 + currentRow);

  // Get the zero based number for the column
  var formattedRow = currentColumn < 10 ? '0' + currentColumn : currentColumn;

  // Assemble the new artboard name
  var finalName = charCode + formattedRow;

  artboardObject = artboard.artboard;
  [artboardObject setName:finalName];
  }
  
  //
  // LAYER POSITIONING
  //

  var artboardInternal = artboard.artboard;
  var frame = [artboardInternal frame];
  [frame setX: currentColumn * (artboard.width + PADDING)];
  [frame setY: currentRow * (artboard.height + PADDING)];

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
