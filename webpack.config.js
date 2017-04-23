const path = require('path');
const argv = require('yargs').argv;
const moment = require('moment');
const webpack = require('webpack');
const clean = require('clean-webpack-plugin');
const html = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');
const define = webpack.DefinePlugin;
const provide = webpack.ProvidePlugin;
const packageJSON = require('./package.json');

const sources = [
	path.resolve('./src'),
	path.resolve('./test')
];

const config = {
	target: 'web',
	resolve: {
		root: path.join(__dirname, ''),
		modulesDirectories: ['node_modules'],
		alias: {
			'picker': 'pickadate/lib/compressed/picker.js',
		}
	},
	entry: {
		'content_script.js': './src/content_script.js',
		'background.js': './src/background.js',
		'options.js': './src/options.js',
		'popup.js': './src/popup.js',
	},
	output: {
		filename: '[name]',
		path: './PixivTagCollector',
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel', query: {presets: ['es2015', 'stage-2'], plugins: ["transform-object-assign"]}, include: sources},
			{test: /\.json$/, loader: 'json'},
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=32768'},
			{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
			{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
		],
		preLoaders: [{test: /\.js$/, loader: 'eslint', include: sources}],
		noParse: [/\.min\.js/, /\.min\.css/]
	},
	plugins: [
		new clean(['PixivTagCollector', 'coverage/*'], {
			root: path.join(__dirname, ''),
			verbose: true,
			dry: false,
		}),
		new html({template: 'src/options.html', filename: 'options.html', inject: false}),
		new html({template: 'src/popup.html', filename: 'popup.html', inject: false}),
		new copy([
			{ from: 'src/manifest.json', to: 'manifest.json' },
			{ from: 'src/img', to: 'img' },
		]),
		new provide({
			_: 'lodash',
			$: 'jquery', "window.$": 'jquery',
			jQuery: 'jquery', "window.jQuery": 'jquery',
			jquery: 'jquery', "window.jquery": 'jquery',
		}),
		new define({
			__APP_NAME__: JSON.stringify(packageJSON.name),
			__APP_VERS__: JSON.stringify(packageJSON.version),
			__APP_DESC__: JSON.stringify(packageJSON.description),
			__BUILD_DATE__: JSON.stringify(moment().format('YYYYMMDD')),
			__DEBUG_LOG_MASK__: JSON.stringify('*,-engine.io-client:*,-socket.io-client:*,-socket.io-client,-socket.io-parser'),
		}),
	],
	bail: true,
	profile: false,
	debug: true,
	devtool: '#inline-source-map',
	cache: false,
	eslint: {configFile: 'src/.eslintrc'}
};


if (process.env.NODE_ENV === 'production') {
	config.debug = false;
	config.devtool = '#source-map'; // false;
	config.plugins = config.plugins.concat([
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			output: {comments: false},
			compress: {warnings: false, screw_ie8: true}
		}),
		new webpack.DefinePlugin({
			__DEBUG_LOG_MASK__: JSON.stringify(''),
			'process.env': {NODE_ENV: JSON.stringify('production')},
		})
	]);
}
if (process.env.NODE_ENV === 'development') {
	config.plugins = config.plugins.concat([
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('development')}
		})
	]);
}
if (process.env.NODE_ENV === 'test') {
	config.plugins = config.plugins.concat([
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('test')}
		})
	]);
	if (argv.coverage) {
		config.module.preLoaders = [
			{test: /_spec\.js$/, loader: 'babel', query: {presets: ['es2015', 'stage-2']}, include: sources},
			{test: /\.js$/, loader: 'isparta', include: sources, exclude: /_spec\.js$/}
		].concat(config.module.preLoaders);
	}
}

module.exports = config;
