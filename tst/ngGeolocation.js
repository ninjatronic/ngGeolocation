describe('$geolocation', function() {
    var $geolocation;
    var $rootScope;

    beforeEach(function() {
        angular.module('test',[]);
        module('ngGeolocation', 'test');
        inject(function($injector) {
            $geolocation = $injector.get('$geolocation');
            $rootScope = $injector.get('$rootScope');
        });
    });

    it('should be defined', function() {
        expect($geolocation).toBeDefined();
    });

    describe('getCurrentPosition', function() {

        it('should be defined', function() {
            expect($geolocation.getCurrentPosition).toBeDefined();
        });

        it('should pass along the options object', function() {
            var result = null;
            var expected = {
                badger: 'goat'
            };

            spyOn(navigator.geolocation, 'getCurrentPosition')
                .andCallFake(function(success, error, options) {
                    result = options;
                });

            $geolocation.getCurrentPosition(expected);

            expect(result).toBe(expected);
        });

        it('should resolve the promise upon success', function() {
            var callback = null;
            var result = null;
            var expected = {
                coords: {},
                timestamp: {}
            };

            spyOn(navigator.geolocation, 'getCurrentPosition')
                .andCallFake(function(success, error, options) {
                    callback = success;
                });

            $geolocation
                .getCurrentPosition()
                .then(function(position) {
                    result = position;
                });

            callback(expected);
            $rootScope.$apply();

            expect(result).toBe(expected);
        });

        it('should reject the promise upon error', function() {
            var callback = null;
            var result = null;
            var expected = {
                code: {},
                message: {}
            };

            spyOn(navigator.geolocation, 'getCurrentPosition')
                .andCallFake(function(success, error, options) {
                    callback = error;
                });

            $geolocation
                .getCurrentPosition()
                .then(function() {}, function(error) {
                    result = error;
                });

            callback(expected);
            $rootScope.$apply();

            expect(result).toBe(expected);
        });
    });
});