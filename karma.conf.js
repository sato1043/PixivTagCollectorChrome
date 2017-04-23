var path = require('path');
var webpackConfig = require('./webpack.config.js');
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		failOnEmptyTestSuite: false,
		files: [
			'test/karma-spec.js',
			{pattern: 'test/fixtures/**/*.html', watched: true, included: false, served: true},
		],
		preprocessors: {'test/karma-spec.js': ['webpack', 'sourcemap']},
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true,
			stats: {
				chunkModules: false,
				colors: true
			}
		},
		webpackServer: {
			noInfo: true //please don't spam the console when running in karma!
		},
		reporters: ['spec', 'coverage', 'html'],
		specReporter: {
			maxLogLines: 5,         // limit number of lines logged per test
			suppressErrorSummary: true,  // do not print error summary
			suppressFailed: false,  // do not print information about failed tests
			suppressPassed: false,  // do not print information about passed tests
			suppressSkipped: true,  // do not print information about skipped tests
			showSpecTiming: false // print the time elapsed for each spec
		},
		coverageReporter: {
			dir: 'coverage/',
			subdir: '.',
			reporters: [
				{type: 'cobertura', file: 'cobertura.xml'},
				{type: 'text', file: 'text.txt'},
				{type: 'text-summary', file: 'text-summary.txt'},
				{type: 'html'}
			]
		},
		htmlReporter: {
			outputDir: 'coverage',
			templatePath: null,
			focusOnFailures: true,
			namedFiles: true,
			pageTitle: 'karma test report',
			urlFriendlyName: false,
			reportName: 'karma-report',
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_DEBUG,
		client: {
			captureConsole: true,
		},
		browserConsoleLogOptions: {
			level: "debug",
			format: "%b %T: %m",
			path:'./coverage/karma.log',
			terminal: false
		},
		autoWatch: false,
		browsers: ['PhantomJS_Desktop'],
		customLaunchers: {
			'PhantomJS_Desktop': {
				base: 'PhantomJS',
				options: {
					viewportSize: {
						width: 1280,
						height: 1000
					},
					onCallback: function(data){
						if (data.type === "render") {
							// this function will not have the scope of karma.conf.js so we must define any global variable inside it
							if (window.renderId === undefined) { window.renderId = 0; }
							page.render(data.fname || ("screenshot_" + (window.renderId++) + ".png"));
						} else if (data.type === "resize") {
							if (!data.viewportSize.width) data.viewportSize.width = page.viewportSize.width;
							if (!data.viewportSize.height) data.viewportSize.height = page.viewportSize.height;
							page.viewportSize = { width: data.viewportSize.width, height: data.viewportSize.height};
						}
					}
				}
			}
		},
		singleRun: true,
		captureTimeout: 10000,
		reportSlowerThan: 300000,
	});
};
