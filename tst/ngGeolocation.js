describe('$geolocation', function() {
    var $geolocation;

    beforeEach(function() {
        angular.module('test',[]);
        module('ngGeolocation', 'test');
        inject(function($injector) {
            $geolocation = $injector.get('$geolocation');
        });
    });

    it('should be defined', function() {
        expect($geolocation).toBeDefined();
    });
});