/**
 * test context 実行
 */
require('babel-polyfill');
require('./karma-phantomjs-helper');
require('./mock-chrome');
window.any = jasmine.any;
window.objectContaining = jasmine.objectContaining;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
require('debug').useColors = () => false;
const testsContext = require.context('.', true, /_spec\.js$/);
testsContext.keys().forEach(testsContext);
