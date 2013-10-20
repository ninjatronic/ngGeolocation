describe('$geolocation', function() {
    var $geolocation;
    var $rootScope;
    var $window;

    beforeEach(function() {
        angular.module('test',[]);
        module('ngGeolocation', 'test');
        inject(function($injector) {
            $geolocation = $injector.get('$geolocation');
            $rootScope = $injector.get('$rootScope');
            $window = $injector.get('$window');
        });
    });

    it('should be defined', function() {
        expect($geolocation).toBeDefined();
    });

    describe('getCurrentPosition', function() {
        var successCallback;
        var errorCallback;
        var optionsObj;

        beforeEach(function() {
            $window.navigator.geolocation = {
                getCurrentPosition: function(success, error, options) {}
            }
            spyOn($window.navigator.geolocation, 'getCurrentPosition')
                .andCallFake(function(success, error, options) {
                    successCallback = success;
                    errorCallback = error;
                    optionsObj = options;
                });
        });

        it('should be defined', function() {
            expect($geolocation.getCurrentPosition).toBeDefined();
        });

        it('should pass along the options object', function() {
            var expected = {badger: 'goat'};
            $geolocation.getCurrentPosition(expected);
            expect(optionsObj).toBe(expected);
        });

        it('should resolve the promise upon success', function() {
            var result = null;
            var expected = {
                coords: {},
                timestamp: {}
            };
            $geolocation
                .getCurrentPosition()
                .then(function(position) { result = position; });
            successCallback(expected);
            $rootScope.$apply();
            expect(result).toBe(expected);
        });

        it('should reject the promise upon error', function() {
            var result = null;
            var expected = {
                code: {},
                message: {}
            };
            $geolocation
                .getCurrentPosition()
                .then(function() {}, function(error) { result = error; });
            errorCallback(expected);
            $rootScope.$apply();
            expect(result).toBe(expected);
        });
    });
});