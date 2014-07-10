'use strict';

angular
    .module('ngGeolocation', [])
    .factory('$geolocation', ['$rootScope','$window','$q',
                      function($rootScope,  $window,  $q)
    {
        if (!$window.navigator || !$window.navigator.geolocation) {
            return {
                supported: false,
                getCurrentPosition: function() {
                    var deferred = $q.defer();
                    deferred.reject(this.position);
                    return deferred.promise;
                },
                watchPosition: angular.noop,
                clearWatch: angular.noop,
                position: {
                    error: {
                        code: 2,
                        message: 'This web browser does not support HTML5 Geolocation'
                    }
                }
            };
        }

        var watchId = null;
        var retVal = {
            supported: true,

            getCurrentPosition: function(options) {
                var deferred = $q.defer();
                $window.navigator.geolocation.getCurrentPosition(
                    function(position) {
                        angular.copy(position, retVal.position);
                        deferred.resolve(position);
                    },
                    function(error) {
                        deferred.reject({error: error});
                    }, options);
                return deferred.promise;
            },

            watchPosition: function(options) {
                if (watchId) {
                    return false;
                }

                watchId = $window.navigator.geolocation.watchPosition(
                    function(position) {
                        $rootScope.$apply(function() {
                            angular.copy(position, retVal.position);
                            $rootScope.$broadcast('$geolocation.position.changed', position);
                        });
                    },
                    function(error) {
                        $rootScope.$apply(function() {
                            angular.copy({error: error}, retVal.position);
                            $rootScope.$broadcast('$geolocation.position.error', error);
                        });
                    }, options);

                return true;
            },

            clearWatch: function() {
                if (watchId) {
                    $window.navigator.geolocation.clearWatch(watchId);
                    watchId = null;
                }
            },

            position: {}
        };
        return retVal;
    }]);
