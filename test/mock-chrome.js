/* eslint-disable no-param-reassign, no-undefined, no-undef-init */
const assign = require('lodash/assign');
const debug = require('debug')(`${__APP_NAME__}:mock-chrome`);

/**
 * chrome extentions 用の API mock群
 */

class ChromeRuntimeOnMessage {
	constructor() { this.list = [] }
	addListener(cb) { this.list.push(cb) }
	callListeners(message, sender, sendResponse) {
		this.list.forEach(cb => {
			cb(message, sender, sendResponse);
		});
	}
}

class ChromeRuntime {
	constructor() {
		this.onMessage = new ChromeRuntimeOnMessage();
	}
	sendMessage(extensionId, message, options, responseCallback) {
		if (typeof extensionId !== 'string') {
			responseCallback = options;
			options = message;
			message = extensionId;
			extensionId = undefined;
		}
		if (typeof options !== 'object') {
			responseCallback = options;
			options = undefined;
		}
		if (!!responseCallback) {
			debug('sendMessage call listeners with', responseCallback);
			const response = {};
			this.onMessage.callListeners(message, null, (response_) => {assign(response, response_)});
			responseCallback(response);
		}
	}
}

class Chrome {
	constructor() {
		this.runtime = new ChromeRuntime();
	}
}

window.chrome = new Chrome();

// __END__
