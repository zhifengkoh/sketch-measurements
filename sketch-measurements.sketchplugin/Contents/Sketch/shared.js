var MEASUREMENT_COLOR = "#F46260";
var FONT_COLOR = "#FFFFFF";

var BAR_THICKNESS = 2; //Default thickness of the measurement bar
var GAP = 5; //Default offset distance between the element and the measurement bar

var LABEL = {

};

/*
 * Measurement Functions
 * ----------------------
 * Works on MSArtboardGroup, MSLayerGroup, MSLayer, and MSTextLayer
 */
function drawWidthMeasurement(layer) {

}

function drawHeightMeasurement(layer) {

}

function drawMeasurementBar(layer) {
  var artboard = getParentArtboard(layer);
  var bar = artboard.addLayerOfType("rectangle");
  bar.setName("$$" + layer.name() + "-width-bar");

  var fill = bar.style().fills().addNewStylePart();
  fill.color = MSColor.colorWithSVGString(MEASUREMENT_COLOR);

  setLayerWidth(bar, getLayerWidth(layer));
  setLayerHeight(bar, BAR_THICKNESS);
  setLayerOrigin(bar, getLayerX(layer), getLayerY(layer) + getLayerHeight(layer) + GAP);
}

function drawMeasurementLabel(layer) {

}

function addFillStyle(layer) {

}
//Adds an MSStyle to the layer if none exists
function checkForStyle(layer) {

}


/*
 * Layer rect() Functions
 * ----------------------
 * Works on MSArtboardGroup, MSLayerGroup, MSLayer, and MSTextLayer
 */
function getLayerWidth(layer) {
  return layer.rect().size.width;
}
function getLayerHeight(layer) {
  return layer.rect().size.height;
}
function getLayerX(layer) {
  return layer.rect().origin.x;
}
function getLayerY(layer) {
  return layer.rect().origin.y;
}
function setLayerWidth(layer, width) {
  var r = layer.rect();
  r.size.width = width;
  layer.setRect(r);
}
function setLayerHeight(layer, height) {
  var r = layer.rect();
  r.size.height = height;
  layer.setRect(r);
}
function setLayerX(layer, x) {
  var r = layer.rect();
  r.origin.x = x;
  layer.setRect(r);
}
function setLayerY(layer, y) {
  var r = layer.rect();
  r.origin.y = y;
  layer.setRect(r);
}
function setLayerOrigin(layer, x, y) {
  var r = layer.rect();
  r.origin.x = x;
  r.origin.y = y;
  layer.setRect(r);
}
function translate(layer, x_delta, y_delta) {
  var r = layer.rect();
  r.origin.x += x_delta;
  r.origin.y += y_delta;
  layer.setRect(r);
}

/*
 * getParentArtboard(layer)
 * ------------------------
 * @param layer An MSLayer object
 *
 * @return Returns an MSArtboardGroup or null;
 *
 * Assumes that the input is well-formed and IS an MSLayer object.
 */
function getParentArtboard(layer) {
  // Check if any layers were passed in to the function
  if (layer == undefined) {
		return null;
	}

  var currentLayer = layer;

  while (true) {
    var className = currentLayer.className();
    if (className == 'MSPage') {
      //If it's an MSPage, then there was no artboard selected to begin with
      return null;
      break;
    } else if (className == 'MSArtboardGroup') {
      //If it's an MSArtboardGroup, we've found it and we can just return the currentLayer.
      break;
    } else {
      //Otherwise, we're still nested deep inside an artboard
      currentLayer = currentLayer.parentGroup();
    }
  }
  return currentLayer;
}
