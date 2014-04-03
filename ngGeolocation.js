'use strict';

angular
    .module('ngGeolocation', [])
    .factory('$geolocation', ['$rootScope', '$window', '$q', function($rootScope, $window, $q) {

        function supported() {
            return 'geolocation' in $window.navigator;
        }

        var retVal = {
            getCurrentPosition: function(options) {
                var deferred = $q.defer();
                if(supported()) {
                    $window.navigator.geolocation.getCurrentPosition(
                        function(position) {
                            $rootScope.$apply(function() {
                                deferred.resolve(position);
                            });
                        },
                        function(error) {
                            $rootScope.$apply(function() {
                                deferred.reject({error: error});
                            });
                        }, options);
                } else {
                    deferred.reject({error: {
                        code: 2,
                        message: 'This web browser does not support HTML5 Geolocation'
                    }});
                }
                return deferred.promise;
            },

            watchPosition: function(options) {
                if(supported()) {
                    if(!this.watchId) {
                        this.watchId = $window.navigator.geolocation.watchPosition(
                            function(position) {
                                $rootScope.$apply(function() {
                                    retVal.position = position;
                                    $rootScope.$broadcast('$geolocation.position.changed', position);
                                });
                            },
                            function(error) {
                                $rootScope.$apply(function() {
                                    retVal.position = {error: error};
                                    $rootScope.$broadcast('$geolocation.position.error', error);
                                });
                            }, options);
                    }
                } else {
                    retVal.position = {
                        error: {
                            code: 2,
                            message: 'This web browser does not support HTML5 Geolocation'
                        }
                    };
                }
            },

            clearWatch: function() {
                if(this.watchId) {
                    $window.navigator.geolocation.clearWatch(this.watchId);
                    delete this.watchId;
                }
            },

            position: undefined
        };

        return retVal;
    }]);