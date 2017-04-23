const debug = require('debug')(`${__APP_NAME__}:background_spec`);

describe('background.js', () => {
	afterEach(() => {
		delete require.cache[require.resolve('../src/background.js')];
		delete localStorage.options;
	});

	it('should have addListener on chrome.runtine.onMessage', () => {
		spyOn(chrome.runtime.onMessage, 'addListener').and.callThrough();
		// const background = require('../src/background.js');
		expect(chrome.runtime.onMessage.addListener).toHaveBeenCalled();
	});

	it('should define localStorage.options', () => {
		// const background = require('../src/background.js');
		expect(localStorage.options).toBeDefined();
		expect(localStorage.options).toEqual(any(String));
	});

	it('should respond options', (done) => {
		// const background = require('../src/background.js');
		chrome.runtime.sendMessage({action: 'getOptions'}, (response) => {
			expect(response.resultOptions).toBeDefined();
			debug(response.resultOptions);
			done();
		});
	});

	// expect(localStorage.options.default).toBeDefined();
	// expect(localStorage.options.valid).toBeDefined();
});
