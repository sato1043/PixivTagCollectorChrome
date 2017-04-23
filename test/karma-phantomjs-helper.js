//
// ```karma.conf.js:
//  :
// onCallback: function(data){
//   if (data.type === "render") {
//     // this function will not have the scope of karma.conf.js so we must define any global variable inside it
//     if (window.renderId === undefined) { window.renderId = 0; }
//     page.render(data.fname || ("screenshot_" + (window.renderId++) + ".png"));
//   } else if (data.type === "resize") {
//     if (!data.viewportSize.width) data.viewportSize.width = page.viewportSize.width;
//     if (!data.viewportSize.height) data.viewportSize.height = page.viewportSize.height;
//     page.viewportSize.width = data.viewportSize.width;
//     page.viewportSize.height = data.viewportSize.height;
//   }
// }
//  :
// ```
//
// ```in your code
// require('karma-phantomjs-helper.js');
// setViewportSize({height: 500});
// takeScreenshot();
// ```

// Take screenshot from Karma while running tests in PhantomJS 2?
// http://stackoverflow.com/questions/34694765/take-screenshot-from-karma-while-running-tests-in-phantomjs-2/34695107#34695107
// With this function you can take screenshots in PhantomJS!
// by default, screenshots will be saved in .tmp/screenshots/ folder with a progressive name (n.png)
//
// takeScreenshot();
//
let renderId = 0;
function takeScreenshot(file) {
	// check if we are in PhantomJS
	if (typeof window.top.callPhantom === 'undefined') { return }

	// if the file argument is defined, we'll save the file in the path defined eg: `fname: '/tmp/myscreen.png'
	// otherwise we'll save it in the default directory with a progressive name
	// this calls the onCallback function of PhantomJS, the type: 'render' will trigger the screenshot script
	window.top.callPhantom({
		type: 'render',
		fname: file || '.tmp/screenshots/' + (renderId++) + '.png',
	});
}

window.takeScreenshot = takeScreenshot;

// change phantomjs's browser window size (aka. viewport).
// viewportSize is object that has property width and height.
// Either width or height can omit. Both can not.
//
// require('karma-phantomjs-helper.js');
// setViewportSize({height: 500});
//
// This function is good to use in every beforeEach().
//
function setViewportSize(viewportSize) {
	if (typeof window.top.callPhantom === 'undefined') { return }
	if (!viewportSize) { return }
	window.top.callPhantom({type: 'resize', viewportSize});
}

window.setViewportSize = setViewportSize;
