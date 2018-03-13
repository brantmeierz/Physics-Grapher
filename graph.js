//Enables and disables a visible connecting line when a button is pressed
function toggleConnectingLine() {
	
	showConnectingLine = !showConnectingLine;
	drawGraph();
	
}

//Enables and disables a linear regression display when a button is pressed
function toggleLinReg() {

	showLinReg = !showLinReg;
	drawGraph();
	
}

//Enables and disables a quadratic regression display when a button is pressed
function toggleQuadReg() {

	showQuadReg = !showQuadReg;
	drawGraph();
}

//Enables a disables an area under the curve calculation for the data set
function toggleAreaUnderCurve() {

	showAreaUnderCurve = !showAreaUnderCurve;
	drawGraph();
	
}

//Enables and disables units being displayed on regressions and area under curve
function toggleUnits() {

	showUnits = !showUnits;
	drawGraph();
	
}

//Enables and disables visible grid lines on the graph
function toggleGridLines() {
	
	showGridLines = !showGridLines;
	drawGraph();
	
}

//Locks the X axis to start at 0
function toggleLockXZero() {
	
	lockXZero = !lockXZero;
	drawGraph();
	
}

//Locks the Y axis to start at 0
function toggleLockYZero() {
	
	lockYZero = !lockYZero;
	drawGraph();
	
}

//Blanks the graph
function clearGraph(canv) {
	
	var ctx = canv.getContext("2d");
	ctx.fillStyle = color.background;
	ctx.fillRect(0, 0, canv.width, canv.height);
	
}

//Checks for special unit combinations
function checkMultiply(val1, val2, unit1, unit2) {
	
	return (val1 == unit1 && val2 == unit2 || val1 == unit2 && val2 == unit1);
	
}

//Cuts off a number the given digits after the decimal point
function cutDecimal(num, digits) {
	
	return (Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits));
	
}

//Formats a string representation of a linear equation
function formatLinear(m, b) {
	
	var mtext = "";
	var btext = "";
	if (m == 0) {
		mtext = "";	
	} else if (m == 1) {
		mtext = "x";	
	}  else if (m == -1) {
		mtext = "-x";	
	} else {
		mtext = m + "x";	
	}
	
	if (b == 0) {
		btext = "";
	} else if (b < 0) {
		btext = "-" + Math.abs(b);
	} else if (mtext == "") {
		btext = b;	
	} else {
		btext = "+" + b;
	}
	
	return "y=" + mtext + btext;
	
}

//Formats a string representation of a quadratic equation
function formatQuadratic(a, b, c) {
	
	var atext = "";
	var btext = "";
	var ctext = "";
	if (a == 0) {
		atext = "";
	} else if (a == 1) {
		atext = "x" + String.fromCharCode(178);
	} else {
		atext = a + "x" + String.fromCharCode(178);
	}
	
	if (b == 0) {
		btext = "";
	} else if (b == 1) {
		if (a == 0) {
			btext = "x";
		} else {
			btext = "+x";
		}
	} else if (b < 0) {
		btext = "-" + Math.abs(b) + "x";
	} else {
		if (a == 0) {
			btext = b + "x";
		} else {
			btext = "+" + b + "x";
		}
	}
	
	if (c == 0) {
		ctext = "";	
	} else if (c < 0) {
		ctext = "-" + Math.abs(c);
	} else {
		if (a == 0 && b == 0 && c !== 0) {
			ctext = c;
		} else {
			ctext = "+" + c;
		}
	}
	
	if (a == 0 && b == 0 && c == 0) {
		return "0";
	}
	
	return "y=" + atext + btext + ctext;
			   
}

//Calculates the value of a linear function at a given x value
function calculateLinear(m, b, x) {
	
	return m * x + b;
	
}

//Calculates the value of a quadratic function at a given x value
function calculateQuadratic(a, b, c, x) {
	
	return a * x * x + b * x + c;
	
}

//Maps a value between a new range with consistent proportions
function map(value, min1, max1, min2, max2) {
		
	return Math.floor((value - min1) / (max1 - min1) * (min2 - max2) + max2);
		
}

//Shows an error message over the graph
function displayError(message, canv) {
	
	clearGraph(canv);
	var ctx = canv.getContext("2d");
	ctx.font = font.error;
	ctx.fillStyle = color.error;
	ctx.fillText(message, canv.width / 2 - (ctx.measureText(message).width / 2), canv.height / 2);
	
}

//Exports the current canvas data as a PNG image
function saveImage() {
	
	var link = document.getElementById("download");
	link.href = document.getElementById("graphcanvas").toDataURL();
	link.download = "GraphExport.png";
	
}

//Prints the current canvas data
function printImage() {
	
	var data = document.getElementById("graphcanvas").toDataURL();
	var popup = window.open();
	var img = popup.document.createElement("img");
	img.src = data;

}

//Draws the basic graph structure and features
function drawGraph() {
	
	//Get canvas data
	var canvas = document.getElementById("graphcanvas");
	var ctx = canvas.getContext("2d");
	var cW = canvas.width;
	var cH = canvas.height;
	
	clearGraph(canvas);
	
	var xcol = document.getElementsByClassName("xdata");
	var ycol = document.getElementsByClassName("ydata");
	
	//Pull X values from data table
	var xdata = [];
	for (var i = 0; i < xcol.length && xcol[i].value !== ""; i++) {
		xdata[i] = parseFloat(xcol[i].value.trim());	
		if (isNaN(xdata[i])) {
			displayError("You have invalid data in your table", canvas);
			return;
		} else if (xdata[i] < 0) {
			displayError("You have negative data in your table", canvas);
			return;
		}
	}
	
	//Pull Y values from data table
	var ydata = [];
	for (var i = 0; i < ycol.length && ycol[i].value !== ""; i++) {
		ydata[i] = parseFloat(ycol[i].value.trim());
		if (isNaN(ydata[i])) {
			displayError("You have invalid data in your table", canvas);
			return;
		} else if (ydata[i] < 0) {
			displayError("You have negative data in your table", canvas);
			return;
		}
	}
	
	//Quit if there are an unequal number of X and Y data items
	if (xdata.length !== ydata.length) {
		displayError("The length of your data columns do not match", canvas);
		return;
	}
	
	//Quit if there are no data items
	if (xdata.length == 0) {
		displayError("You have no data in your table", canvas);
		return;
	}
	
	//Quit if there is a single data item
	if (xdata.length == 1) {
		displayError("You need more data in your table", canvas);
		return;
	}
	
	//Determine the minimum and maximum X values
	var minX = xdata[0];
	var maxX = xdata[0];
	for (var i = 1; i < xdata.length; i++) {
		if (xdata[i] < minX) {
			minX = xdata[i];	
		} else if (xdata[i] > maxX) {
			maxX = xdata[i];	
		}
	}
	
	//Determine the minimum and maximum Y values
	var minY = ydata[0];
	var maxY = ydata[0];
	for (var i = 1; i < ydata.length; i++) {
		if (ydata[i] < minY) {
			minY = ydata[i];	
		} else if (ydata[i] > maxY) {
			maxY = ydata[i];	
		}
	}
	
	var xRange = maxX - minX;
	var nMinX = minX - (xRange * 0.1);
	if (lockXZero) {
		nMinX = 0;	
	}
	var nMaxX = maxX + (xRange * 0.1);
	var nXRange = nMaxX - nMinX;
	
	var yRange = maxY - minY;
	var nMinY = minY - (yRange * 0.1);
	if (lockYZero) {
		nMinY = 0;	
	}
	var nMaxY = maxY + (yRange * 0.1);
	var nYRange = nMaxY - nMinY;
	
	//Display intermediate values and grid lines (X)
	for (var i = 0; i <= 10; i++) {
		//var mapX = map(i * (xRange / 10) + nMinX, nMaxX, nMinX, cW / 10, cW - (cW / 10));
		var mapX = map(i * (nXRange / 10) + nMinX, nMaxX, nMinX, cW / 10, cW - (cW / 10));
		ctx.fillStyle = color.title;
		ctx.font = font.label;
		ctx.fillText(cutDecimal(i * (nXRange / 10) + nMinX, 3), mapX - (ctx.measureText(cutDecimal(i * (nXRange / 10) + nMinX, 3)).width / 2), cH - (cH / 20));
		if (showGridLines) {
			ctx.strokeStyle = color.grid;
			ctx.lineWidth = strokeWidth.grid;
			ctx.beginPath();
			ctx.moveTo(mapX, cH - (cH / 10));
			ctx.lineTo(mapX, cH / 10);
			ctx.stroke();
		}
	}
	
	//Display intermediate values and grid lines (Y)
	for (var i = 0; i <= 10; i++) {
		//var mapY = map(i * (yRange / 10) + nMinY, nMaxY, nMinY, cH - (cH / 10), (cH / 10));
		var mapY = map(i * (nYRange / 10) + nMinY, nMaxY, nMinY, cH - (cH / 10), (cH / 10));
		ctx.fillStyle = color.title;
		ctx.font = font.label;
		ctx.fillText(cutDecimal(i * (nYRange / 10) + nMinY, 3), cW / 12 - ctx.measureText(cutDecimal(i * (nYRange / 10) + nMinY, 3)).width, mapY);
		if (showGridLines) {
			ctx.strokeStyle = color.grid;
			ctx.lineWidth = strokeWidth.grid;
			ctx.beginPath();
			ctx.moveTo(cW / 10, mapY);
			ctx.lineTo(cW - (cW / 10), mapY);
			ctx.stroke();
		}
	}
	
	//Draw gridlines missed during labeling loop
	/*if (showGridLines) {
		ctx.strokeStyle = color.grid;
		ctx.lineWidth = strokeWidth.grid;
		
		ctx.beginPath();
		//Top
		ctx.moveTo(cW / 10, cH / 10);
		ctx.lineTo(cW - (cW / 10), cH / 10);
		
		//Right
		ctx.lineTo(cW - (cW / 10), cH / 10);
		ctx.lineTo(cW - (cW / 10), cH - (cH / 10));
		
		ctx.stroke();
	}*/
	
	//Draw axes
	ctx.strokeStyle = color.axis;
	ctx.lineWidth = strokeWidth.axes;
	ctx.beginPath();
	ctx.moveTo(Math.floor(cW / 10), Math.floor(cH / 10));
	ctx.lineTo(Math.floor(cW / 10), cH - Math.floor(cH / 10));
	ctx.lineTo(cW - Math.floor(cW / 10), cH - Math.floor(cH / 10));
	ctx.stroke();
	
	//Draw title (centered based on width)
	ctx.fillStyle = color.title;
	ctx.font = font.title;
	var displayTitle = "";
	if (document.getElementById("titlelabel").value == titleLabel) {
		displayTitle = empty.title;
	} else {
		displayTitle = document.getElementById("titlelabel").value;
	}
	ctx.fillText(displayTitle, cW / 2 - (ctx.measureText(document.getElementById("titlelabel").value).width / 2), 30);
	
	//Draw name (right justified)
	ctx.fillStyle = color.name;
	ctx.font = font.name;
	var displayName = "";
	if (document.getElementById("namelabel").value == nameLabel) {
		displayName = empty.name;
	} else {
		displayName = document.getElementById("namelabel").value;
	}
	ctx.fillText(displayName, cW * 0.98 - ctx.measureText(document.getElementById("namelabel").value).width, 25);
	
	//Draw axes labels (centered based on width)
	ctx.fillStyle = color.axis;
	ctx.font = font.axis;
	var displayX = "";
	if (document.getElementById("xlabel").value == xLabel) {
		displayX = empty.x;
	} else {
		displayX = document.getElementById("xlabel").value
	}
	ctx.fillText(displayX, cW / 2 - (ctx.measureText(document.getElementById("xlabel").value).width / 2), cH * 0.99);
	
	ctx.save();
	ctx.translate(cW * 0.04, cH / 2);
	ctx.rotate(-Math.PI / 2);
	var displayY = "";
	if (document.getElementById("ylabel").value == yLabel) {
		displayY = empty.y;
	} else {
		displayY = document.getElementById("ylabel").value;
	}
	ctx.fillText(displayY, -(ctx.measureText(document.getElementById("ylabel").value).width / 2), 0);
	ctx.restore();
	
	//Calculate linear and quadratic regressions
	var xsum = 0;
	var ysum = 0;
	var xysum = 0;
	var x2sum = 0;
	var x2ysum = 0;
	var x3sum = 0;
	var x4sum = 0;
	var y2sum = 0;
	for (var i = 0; i < xdata.length; i++) {
		xsum += xdata[i];
		ysum += ydata[i];
		xysum += (xdata[i] * ydata[i]);
		x2sum += (xdata[i] * xdata[i]);
		x2ysum += (xdata[i] * xdata[i] * ydata[i]);
		x3sum += (xdata[i] * xdata[i] * xdata[i]);
		x4sum += (xdata[i] * xdata[i] * xdata[i] * xdata[i]);
		y2sum += (ydata[i] * ydata[i]);
	}
	
	var ml = ((xdata.length * xysum) - (xsum * ysum)) / ((xdata.length * x2sum) - (xsum * xsum));
	var bl = ((x2sum * ysum) - (xsum * xysum)) / ((xdata.length * x2sum) - (xsum * xsum));
	var r2l = Math.pow(xdata.length * xysum - xsum * ysum, 2) / ((xdata.length * x2sum - xsum * xsum) * (xdata.length * y2sum - ysum * ysum));
	
	var sumxx = x2sum - (xsum * xsum / xdata.length);
	var sumxy = xysum - (xsum * ysum / xdata.length);
	var sumxx2 = x3sum - (x2sum * xsum / xdata.length);
	var sumx2y = x2ysum - (x2sum * ysum / xdata.length);
	var sumx2x2 = x4sum - (x2sum * x2sum / xdata.length);
	
	var aq = (sumx2y * sumxx - sumxy * sumxx2) / (sumxx * sumx2x2 - sumxx2 * sumxx2);
	var bq = (sumxy * sumx2x2 - sumx2y * sumxx2) / (sumxx * sumx2x2 - sumxx2 * sumxx2);
	var cq = (ysum / xdata.length) - (bq * (xsum / xdata.length)) - (aq * (x2sum / xdata.length));
	var r2q = ""; //FIND QUADRATIC R^2
	
	//Calculate linear regression
	var y1 = calculateLinear(ml, bl, minX);
	var y2 = calculateLinear(ml, bl, maxX);
	
	//Display points mapped in a range between the minimum and maximum values
	if (showConnectingLine) {
		ctx.beginPath();
		ctx.strokeStyle = color.connectingLine;
		ctx.lineWidth = strokeWidth.connectingLine;
		var lastX = 0;
		var lastY = 0;
	}
	
	for (var i = 0; i < xdata.length; i++) {
		mapX = map(xdata[i], nMaxX, nMinX, cW / 10, cW - (cW / 10));
		mapY = map(ydata[i], nMaxY, nMinY, cH - (cH / 10), (cH / 10));
		
		ctx.fillStyle = color.point;
		ctx.fillRect(mapX - 3, mapY - 3, 7, 7);
		if (showConnectingLine) {
			if (i == 0) {
				ctx.moveTo(mapX, mapY);
			} else {
				ctx.lineWidth = 2;
				ctx.moveTo(lastX, lastY);
				ctx.lineTo(mapX, mapY);
			}
			lastX = mapX;
			lastY = mapY;
		}
	}
	
	if (showConnectingLine) {
		ctx.stroke();
	}
	
	//Display regression data
	ctx.fillStyle = color.regressionText;
	ctx.font = font.regressionText;
	if (showLinReg) {
		if (xUnit != "" && yUnit != "") {
			var fullUnit = "";
			if (yUnit.indexOf("/") > -1 && xUnit.indexOf("/") == -1) {
				fullUnit = "(" + yUnit + ")/" + xUnit;
			} else if (xUnit.indexOf("/") == -1 && xUnit.indexOf("/") > -1) {
				fullUnit = yUnit + "/(" + xUnit + ")";
			} else {
				fullUnit = yUnit + "/" + xUnit;
			}
			var text = "Linear regression: " + formatLinear(cutDecimal(ml, 3), cutDecimal(bl, 3)) + ", r" + String.fromCharCode(178) + "=" + cutDecimal(r2l, 4);
			fullUnit = "(" + fullUnit + ")";
			if (yUnit == "m/s" && xUnit == "s") {
				fullUnit += " or (m/s^2)";	
			}
			if (showUnits) {
				text += ("  [Coefficient unit: " + fullUnit + "]");
			}
			//CHECK INDEX OF / TO EXCLUDE PARENTHESIS
			ctx.fillText(text, 150, 75);
		} else {
			ctx.fillText("Linear regression: " + formatLinear(cutDecimal(ml, 3), cutDecimal(bl, 3)) + ", r" + String.fromCharCode(178) + "=" + cutDecimal(r2l, 4), 150, 75);
		}
		mapX = map(minX, nMaxX, nMinX, cW / 10, cW - (cW / 10));
		mapY = map(y1, nMinY, nMaxY, cH / 10, cH - (cH / 10));
		ctx.strokeStyle = color.regressionLine;
		ctx.lineWidth = strokeWidth.regressionLine;
		ctx.beginPath();
		ctx.moveTo(mapX, mapY);
		mapX = map(maxX, nMaxX, nMinX, cW / 10, cW - (cW / 10));
		mapY = map(y2, nMinY, nMaxY, cH / 10, cH - (cH / 10));
		ctx.lineTo(mapX, mapY);
		ctx.stroke();
		ctx.closePath();
	}
	if (showQuadReg) {
		ctx.fillText("Quadratic regression: " + formatQuadratic(cutDecimal(aq, 3), cutDecimal(bq, 3), cutDecimal(cq, 3)), 150, 125);
		//Calculate R squared
	}
	
	//Display area under curve data
	if (showAreaUnderCurve) {
		//Calculate areas
		var auc = 0.0;
		auc += y1 * (maxX - minX);
		auc += (Math.abs(y2 - y1) * (maxX - minX)) / 2;
		
		//Display result data
		ctx.fillStyle = color.regressionText;
		ctx.font = font.regressionText;
		if (xUnit != "" && yUnit != "") {	
			var text = "Area under linear regression: " + cutDecimal(auc, 3).toFixed(3);
			var fullUnit = "";
			if (yUnit.indexOf("/") > -1 && xUnit.indexOf("/") == -1) {
				fullUnit = "(" + yUnit + ")*" + xUnit;
			} else if (xUnit.indexOf("/") == -1 && xUnit.indexOf("/") > -1) {
				fullUnit = yUnit + "*(" + xUnit + ")";
			} else {
				fullUnit = yUnit + "*" + xUnit;
			}
			fullUnit = "(" + fullUnit + ")";
			if (checkMultiply(xUnit, yUnit, "N", "m")) {
				fullUnit += " or (J)";	
			} else if (checkMultiply(xUnit, yUnit, "m/s", "s")) {
				fullUnit += " or (m)";	
			}
			if (showUnits) {
				text += ("  [Unit: " + fullUnit + "]");
			}
			ctx.fillText(text, 150, 100); //More advanced unit management
		} else {
			ctx.fillText("Area under linear regression: " + cutDecimal(auc, 3).toFixed(3), 150, 100); //More advanced unit management
		}
		//Form shape
		var p1x = map(minX, nMaxX, nMinX, cW / 10, cW - (cW / 10));
		var p1y = map(y1, nMaxY, nMinY, cH - (cH / 10), (cH / 10));
		
		var p2x = map(maxX, nMaxX, nMinX, cW / 10, cW - (cW / 10));
		var p2y = map(y2, nMaxY, nMinY, cH - (cH / 10), (cH / 10));
		
		ctx.beginPath();
		ctx.moveTo(p1x, cH - (cH / 10));
		ctx.lineTo(p1x, p1y);
		ctx.lineTo(p2x, p2y);
		ctx.lineTo(p2x, cH - (cH / 10));
		ctx.lineTo(p1x, cH - (cH / 10));
		ctx.closePath();
		
		//Draw area
		ctx.fillStyle = color.areaundercurve; //SETTINGS
		ctx.fill();
		
		//Draw borders
		//ctx.lineWidth = 1; //SETTINGS
		//ctx.strokeStyle = "#000000"; //SETTINGS
		//ctx.stroke();
	}
	
}