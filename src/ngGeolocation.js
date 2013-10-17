'use strict';

angular
    .module('ngGeolocation', [])
    .factory('$geolocation', ['$rootScope', '$q', function($rootScope, $q) {

        function getCurrentPosition(options) {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $rootScope.$apply(function() {
                        deferred.resolve(position);
                    });
                },
                function(error) {
                    $rootScope.$apply(function() {
                        deferred.reject(error);
                    });
                }, options);
            return deferred.promise;
        }

        return {
            getCurrentPosition: getCurrentPosition
        }

    }]);