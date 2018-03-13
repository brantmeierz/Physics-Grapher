//Window settings
var startingRows = 8;
var thirdColumn = false;
var xLabel = "X Label";
var yLabel = "Y Label";
var yLabel2 = "Y2 Label";
var xUnit = "";
var yUnit = "";
var titleLabel = "Graph Title";
var nameLabel = "Your name here";
var advancedMode = false;
var showTitleOnStart = true;

//Graph settings
var showConnectingLine = false;
var showLinReg = false;
var showQuadReg = false;
var showAreaUnderCurve = false;
var showUnits = true;
var showGridLines = true;
var lockXZero = true;
var lockYZero = true;
var showName = false;
//var name = "Name";

//Graph properties
var color = {
	areaundercurve: "rgba(200, 200, 255, 0.25)",
	axis: "#000000",
	background: "#FFFFFF",
	connectingLine: "#FFFF00",
	error: "#FF0000",
	grid: "#BBBBBB",
	name: "#000000",
	point: "#FF0000",
	regressionLine: "#00FF00",
	regressionText: "#000000",
	title: "#000000",
};

var empty = {
	name: "",
	title: "",
	x: "X Data",
	y: "Y Data",
};

var font = {
	axis: "15pt serif",
	error: "30pt serif",
	label: "10pt serif",
	name: "12pt serif",
	regressionText: "15pt serif",
	title: "20pt serif",
};

var strokeWidth = {
	axes: 2,
	connectingLine: 2,
	grid: 1,
	regressionLine: 2,
};