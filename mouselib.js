var mouseX;
var mouseY;

function startMouse(canvas) {
	canvas.addEventListener("mousemove", function(event) {
		mouseX = translateMouse(canvas, event).x;
		mouseY = translateMouse(canvas, event).y;
	});
}

function translateMouse(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top 
	}
}

function MouseBox(x, y, text) {
	this.x = x;
	this.y = y;
	this.text = text;
}