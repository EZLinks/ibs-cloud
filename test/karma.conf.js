// Karma configuration
// Generated on Tue Aug 02 2016 10:01:07 GMT-0400 (Eastern Daylight Time)

module.exports = function (config) {
	config.set({
		
		// base path, that will be used to resolve files and exclude
		basePath: '../',
		
		
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [
			'mocha',
			'chai'
		],
		
		// list of files / patterns to load in the browser
		files: [
			'src/lib/jquery/dist/jquery.min.js',
			'src/lib/lodash/dist/lodash.min.js',
			'src/lib/moment/moment.js',
			'src/lib/moment-timezone/builds/moment-timezone-with-data.js',
			'src/lib/angular/angular.min.js',
			'src/lib/angular-mocks/angular-mocks.js',
			'src/lib/angular-bootstrap/ui-bootstrap.js',
			'src/lib/semantic/dist/semantic.min.js',
			'src/lib/angular-semantic-ui/angular-semantic-ui.min.js',
			'src/lib/angular-google-chart/ng-google-chart.js',
			'src/lib/angular-ui-grid/ui-grid.js',
			'src/lib/odata-ui-grid/dist/odata-ui-grid.js',
			'src/lib/angular-odata-resources/build/odataresources.js',
			'src/scripts/**/*.js',
			'.tmp/*.js',
			'test/spec/**/*.js'
		],
		
		
		// list of files to exclude
		exclude: [
		],
		
		
		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'src/scripts/**/*.js': 'coverage'
		},
		
		
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: [
			'progress',
			'coverage'
		],
		
		// web server port
		port: 9876,
		
		
		// enable / disable colors in the output (reporters and logs)
		colors: true,
		
		
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		
		
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,
		
		
		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],
		
		
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,
		
		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
}