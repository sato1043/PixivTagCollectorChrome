module.exports = function(grunt) {

	'use strict';

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		pkg: pkg,
		
		jshint: {
			all: ['Gruntfile.js', '../PixivTagCollector/**/*.js'],
			options: {
				ignores: ['../PixivTagCollector/**/js/*.js'],
				globalstrict: true,
				smarttabs:true,
				laxcomma:true,
				laxbreak:true,
				globals:{
					$: false,
					jQuery: false,
					localStorage: false,
					chrome: false,
					document: false,
					window:false,
					unsafeWindow: false,
					XPathResult: false,
					close: false,
					JSON: false
				}
			}
		},
		
		watch: {
			files: ['../PixivTagCollector/**/*.js'],
			tasks: ['jshint']
		}
	});

	var taskName;
	for(taskName in pkg.devDependencies) {
		if(taskName.substring(0, 6) == 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}

	grunt.registerTask('default', ['watch']);

};
