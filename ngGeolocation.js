'use strict';

angular
    .module('ngGeolocation', [])
    .factory('$geolocation', ['$rootScope', '$window', '$q', function($rootScope, $window, $q) {

        var retVal = {
            getCurrentPosition: function(options) {
                var deferred = $q.defer();
                $window.navigator.geolocation.getCurrentPosition(
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
        }

        return retVal;
    }]);