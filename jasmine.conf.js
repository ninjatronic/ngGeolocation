module.exports = function(config) {
    config.set({
        singleRun: true,
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            'src/bower_components/angular/angular.js',
            'src/bower_components/angular-mocks/angular-mocks.js',
            'src/ngGeolocation.js',
            'tst/**/*.js'
        ]
    });
};
