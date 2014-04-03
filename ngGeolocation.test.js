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
            expect(result.error).toBe(expected);
        });

        it('should reject the promise if geolocation is unsupported', function() {
            delete $window.navigator.geolocation;
            var result;
            $geolocation
                .getCurrentPosition()
                .then(function() {}, function(error) { result = error; });
            $rootScope.$apply();
            expect(result.error.code).toBe(2);
            expect(result.error.message).toBe('This web browser does not support HTML5 Geolocation');
        });
    });

    describe('watchPosition', function() {
        var successCallback;
        var errorCallback;
        var optionsObj;

        beforeEach(function() {
            $window.navigator.geolocation = {
                watchPosition: function(success, error, options) {}
            }
            spyOn($window.navigator.geolocation, 'watchPosition')
                .andCallFake(function(success, error, options) {
                    successCallback = success;
                    errorCallback = error;
                    optionsObj = options;
                    return 6748678934;
                });
        });

        it('should be defined', function() {
            expect($geolocation.watchPosition).toBeDefined();
        });

        it('should pass along the options object', function() {
            var expected = {badger: 'goat'};
            $geolocation.watchPosition(expected);
            expect(optionsObj).toBe(expected);
        });

        it('should only set up one watch at a time', function() {
            $geolocation.watchPosition();
            $geolocation.watchPosition();
            expect($window.navigator.geolocation.watchPosition.calls.length).toBe(1);
        });

        it('should expose the error on position if an error occurs', function() {
            var expected = {code: 1, message: "badger"};
            $geolocation.watchPosition();
            errorCallback(expected);
            expect($geolocation.position.error.code).toBe(expected.code);
            expect($geolocation.position.error.message).toBe(expected.message);
        });

        it('should expose the error on position if geolocation is unsupported', function() {
            delete $window.navigator.geolocation;
            $geolocation.watchPosition();
            expect($geolocation.position.error.code).toBe(2);
            expect($geolocation.position.error.message).toBe('This web browser does not support HTML5 Geolocation');
        });

        it('should expose the position when updated', function() {
            var expected = {coords: 'badger', timestamp: 'goat'};
            $geolocation.watchPosition();
            successCallback(expected);
            expect($geolocation.position.coords).toBe(expected.coords);
            expect($geolocation.position.timestamp).toBe(expected.timestamp);
        });

        it('should broadcast \'$geolocation.position.changed\' when updated', function() {
            var expected = {
                result: {coords: 'badger', timestamp: 'goat'},
                callback: function() {}
            };
            spyOn(expected, 'callback');
            $rootScope.$on('$geolocation.position.changed', expected.callback);
            $geolocation.watchPosition();
            successCallback(expected.result);
            expect(expected.callback).toHaveBeenCalledWith(jasmine.any(Object), expected.result);
        });

        it('should broadcast \'$geolocation.position.error\' when an error occurs', function() {
            var expected = {
                result: {coords: 'badger', timestamp: 'goat'},
                callback: function() {}
            };
            spyOn(expected, 'callback');
            $rootScope.$on('$geolocation.position.error', expected.callback);
            $geolocation.watchPosition();
            errorCallback(expected.result);
            expect(expected.callback).toHaveBeenCalledWith(jasmine.any(Object), expected.result);
        });
    });

    describe('clearWatch', function() {
        var expected = 648639;

        beforeEach(function() {
            $window.navigator.geolocation = {
                watchPosition: function(success, error, options) {},
                clearWatch: function(watchId) {}
            }
            spyOn($window.navigator.geolocation, 'watchPosition').andReturn(expected);
            spyOn($window.navigator.geolocation, 'clearWatch');
            $geolocation.watchPosition();
        });

        it('should be defined', function() {
            expect($geolocation.clearWatch).toBeDefined();
        });

        it('should cancel the current watch', function() {
            $geolocation.clearWatch();
            expect($window.navigator.geolocation.clearWatch).toHaveBeenCalledWith(expected);
        });

        it('should not cancel if there is no current watch', function() {
            $geolocation.clearWatch();
            $geolocation.clearWatch();
            expect($window.navigator.geolocation.clearWatch.calls.length).toBe(1);
        })
    });
});