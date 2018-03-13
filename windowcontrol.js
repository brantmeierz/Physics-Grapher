//Called when the window has loaded
function load() {
	
	//console.log(chrome.identity);
	
	//Initialize data table with empty rows
	for (var i = 0; i < startingRows; i++) {
		additionalRow();	
	}
	
	//Initialize row titles
	document.getElementById("xlabel").value = xLabel;
	document.getElementById("ylabel").value = yLabel;
	document.getElementById("titlelabel").value = titleLabel;
	if (showTitleOnStart) {
		document.getElementById("titlelabel").value = titleLabel;	
	} else {
		document.getElementById("titlelabel").style.visibility = "hidden";
		document.getElementById("titlelabel").style.display = "none";
	}
	document.getElementById("namelabel").value = nameLabel;
	
	//Access individual buttons/items and add functionality
	//Data view
	document.getElementById("addrow").addEventListener("click", additionalRow);
	document.getElementById("deleterow").addEventListener("click", removeRow);
	document.getElementById("cleardata").addEventListener("click", clearTable);
	document.getElementById("thirdcolumn").addEventListener("click", toggleColumm);
	
	document.getElementById("xlabel").addEventListener("focusout", tryGenerateTitle);
	document.getElementById("xlabel").addEventListener("focusout", tryResetLabels);
	document.getElementById("ylabel").addEventListener("focusout", tryGenerateTitle);
	document.getElementById("ylabel").addEventListener("focusout", tryResetLabels);
	
	document.getElementById("titlelabel").addEventListener("focusout", tryResetLabels);
	document.getElementById("namelabel").addEventListener("focusout", tryResetLabels);
	
	//Graph view
	document.getElementById("savegraph").addEventListener("click", saveImage);
	//document.getElementById("printgraph").addEventListener("click", printImage);
	document.getElementById("toggleconnectingline").addEventListener("click", toggleConnectingLine);
	document.getElementById("togglelinreg").addEventListener("click", toggleLinReg);
	document.getElementById("togglequadreg").addEventListener("click", toggleQuadReg);
	document.getElementById("areaundercurve").addEventListener("click", toggleAreaUnderCurve);
	document.getElementById("toggleunits").addEventListener("click", toggleUnits);
	document.getElementById("gridlines").addEventListener("click", toggleGridLines);
	document.getElementById("togglex").addEventListener("click", toggleLockXZero);
	document.getElementById("toggley").addEventListener("click", toggleLockYZero);
	
	document.getElementById("advancedmode").addEventListener("change", toggleAdvancedMode);
	
	//Access button groups and add functionality
	var toGraph = document.getElementsByClassName("viewgraph");
	var toHelp = document.getElementsByClassName("viewhelp");
	var toData = document.getElementsByClassName("viewdata");
	
	for (var i = 0; i < toGraph.length; i++) {
		toGraph[i].addEventListener("click", loadGraphView);	
	}
	
	for (var i = 0; i < toHelp.length; i++) {
		toHelp[i].addEventListener("click", loadHelpView);
	}
	
	for (var i = 0; i < toData.length; i++) {
		toData[i].addEventListener("click", loadDataView);	
	}
	
	clearGraph(document.getElementById("graphcanvas"));
	
}

//Switch into the data table view
function loadDataView() {
	
	document.getElementById("graphview").style.visibility = "hidden";
	document.getElementById("helpview").style.visibility = "hidden";
	document.getElementById("dataview").style.visibility = "visible";
	
	document.getElementById("graphview").style.display = "none";
	document.getElementById("helpview").style.display = "none";
	document.getElementById("dataview").style.display = "block";
	
}

//Switch into the graph view
function loadGraphView() {
	
	document.getElementById("graphview").style.visibility = "visible";
	document.getElementById("helpview").style.visibility = "hidden";
	document.getElementById("dataview").style.visibility = "hidden";
	
	document.getElementById("graphview").style.display = "block";
	document.getElementById("helpview").style.display = "none";
	document.getElementById("dataview").style.display = "none";
	
	drawGraph();
	
}

//Switch into the help view
function loadHelpView() {
	
	document.getElementById("graphview").style.visibility = "hidden";
	document.getElementById("helpview").style.visibility = "visible";
	document.getElementById("dataview").style.visibility = "hidden";
	
	document.getElementById("graphview").style.display = "none";
	document.getElementById("helpview").style.display = "block";
	document.getElementById("dataview").style.display = "none";
	
}

//Adds additional rows to the data table
function additionalRow() {
	
	var xcell = '<input type="text" title="What you type here will be treated as a new x data value by the graph" class="xdata"/>';
	var ycell = '<input type="text" title="What you type here will be treated as a new y data value by the graph" class="ydata"/>';
	var ycell2 = '<input type="text" title="What you type here will be treated as a secondary new y data value by the graph" class="ydata2"/>';
	
	var dataTable = document.getElementById("datatable");
	var row = dataTable.insertRow();
	
	//Add key listeners to newly created cells
	var c1 = row.insertCell();
	c1.innerHTML = xcell;
	c1.onkeyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (key == 13) {
			var class1 = document.getElementsByClassName("xdata");
			//if (document.activeElement == class1[class1.length - 1]) {
			//	class1[0].focus();	
			//}
			if (e.shiftKey) {
				for (var i = 1; i < class1.length; i++) {
					if (class1[i] == document.activeElement) {
						class1[i - 1].focus();
						break;
					}
				}
			} else {
				for (var i = 0; i < class1.length - 1; i++) {
					if (class1[i] == document.activeElement) {
						class1[i + 1].focus();
						break;
					}
				}
			}
		}
	}
	var c2 = row.insertCell();
	c2.innerHTML = ycell;
	c2.onkeyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (key == 13) {
			var class2 = document.getElementsByClassName("ydata");
			//if (document.activeElement == class2[class2.length - 1]) {
			//	class2[0].focus();	
			//}
			if (e.shiftKey) {
				for (var i = 1; i < class2.length; i++) {
					if (class2[i] == document.activeElement) {
						class2[i - 1].focus();
						break;
					}
				}
			} else {
				for (var i = 0; i < class2.length - 1; i++) {
					if (class2[i] == document.activeElement) {
						class2[i + 1].focus();
						break;
					}
				}
			}
		}
	}
	
	var c3 = row.insertCell();
	c3.innerHTML = ycell2;
	c3.onkeyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (key == 13) {
			var class3 = document.getElementsByClassName("ydata2");
			//if (document.activeElement == class2[class2.length - 1]) {
			//	class2[0].focus();	
			//}
			if (e.shiftKey) {
				for (var i = 1; i < class3.length; i++) {
					if (class3[i] == document.activeElement) {
						class3[i - 1].focus();
						break;
					}
				}
			} else {
				for (var i = 0; i < class3.length - 1; i++) {
					if (class3[i] == document.activeElement) {
						class3[i + 1].focus();
						break;
					}
				}
			}
		}
	}
	
}

//Removes the last row from the table if it has 2 or more left
function removeRow() {
	
	var dataTable = document.getElementById("datatable");
	if (!(dataTable.rows.length < 6)) {
		dataTable.deleteRow(-1);
	}
	
}

//Enables or removes a third column for input
function toggleColumn() {
	if (!thirdColumn) {
		document.getElementById("titlehead").colSpan = 3;
		document.getElementById("namehead").colSpan = 3;
		document.getElementById("ylabel2").style.display = "block";
		thirdColumn = true;
	} else {
		document.getElementById("ylabel2").style.display = "none";
		thirdColumn = false;
	}
}

//Clears all of the data values from the current table
function clearTable() {
	
	var xc = document.getElementsByClassName("xdata");
	var yc = document.getElementsByClassName("ydata");
	for (var i = 0; i < xc.length; i++) {
		xc[i].value = "";
	}
	for (var i = 0; i < yc.length; i++) {
		yc[i].value = "";
	}
	
	document.getElementById("namelabel").value = nameLabel;
	document.getElementById("titlelabel").value = titleLabel;
	document.getElementById("xlabel").value = xLabel;
	document.getElementById("ylabel").value = yLabel;
	
}

//Attempts to generate a title for the graph given the label text
function tryGenerateTitle() {
	
	var x = document.getElementById("xlabel").value;
	var y = document.getElementById("ylabel").value;
	var title = document.getElementById("titlelabel");
	var xheader = "[UNASSIGNED]";
	var yheader = "[UNASSIGNED]";
	var xunit = "[UNASSIGNED]";
	var yunit = "[UNASSIGNED]";
	
	if (x !== xLabel && y !== yLabel && title.value == titleLabel) {
		if (x.includes("(") && x.includes(")") && x.indexOf(")") > x.indexOf("(")) {
			if (x.charAt(x.indexOf("(") - 1) == " ") {
				xheader = x.substring(0, x.indexOf("(") - 1);		
			} else {
				xheader = x.substring(0, x.indexOf("("));	
			}
			xunit = x.substring(x.indexOf("(") + 1, x.indexOf(")"));
			if (y.includes(")") && y.includes(")") && y.indexOf(")") > y.indexOf("(")) {
				if (y.charAt(y.indexOf("(") - 1) == " ") {
					yheader = y.substring(0, y.indexOf("(") - 1);
				} else {
					yheader = y.substring(0, y.indexOf("("));	
				}
				yunit = y.substring(y.indexOf("(") + 1, y.indexOf(")"));
				document.getElementById("titlelabel").value = yheader + " v. " + xheader;
				if (!showTitleOnStart) {
					title.style.visibility = "visible";
					title.style.display = "block";
				}
				xUnit = xunit;
				yUnit = yunit;
			}
		}
	}
	
}

//Attempts to refill any empty label fields
function tryResetLabels() {
	
	var x = document.getElementById("xlabel");
	var y = document.getElementById("ylabel");
	var title = document.getElementById("titlelabel");
	var name = document.getElementById("namelabel");
	if (x.value == "")
		x.value = xLabel;
	if (y.value == "")
		y.value = yLabel;
	if (title.value == "")
		title.value = titleLabel;
	if (name.value == "")
		name.value = nameLabel;
	
}

//Enables and disables advanced features
function toggleAdvancedMode() {
	
	advancedMode = !advancedMode;
	
	if (advancedMode) {
		var quadReg = document.getElementById("togglequadreg");
		quadReg.style.visibility = "visible";
		quadReg.style.display = "inline";
	} else {
		var quadReg = document.getElementById("togglequadreg");
		quadReg.style.visibility = "hidden";
		quadReg.style.display = "none";
	}
	
}

//Sets the "load" function to active on window load
window.onload = load;