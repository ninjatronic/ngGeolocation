module.exports = function(config) {
    config.set({
        singleRun: true,
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'ngGeolocation.js',
            'ngGeolocation.test.js'
        ]
    });
};
