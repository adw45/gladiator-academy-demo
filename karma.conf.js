module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],
    // list of files / patterns to load in the browser
    files: [
      'server/**/*.test.js',
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'server/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map'
    },

    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    reporters: ['mocha'],
    mochaReporter: {
      showDiff: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    plugins: [
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
    ],
    singleRun: false,
    concurrency: Infinity
  })
}
