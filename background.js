//First code called when extension is launched
chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		id:"PhysGraphID",
		outerBounds: {
			width: 600,
			height: 500,
			left: 100,
			top: 100
		}//,
		//state: "fullscreen"
	});
});