# ngGeolocation

[![Build Status](https://travis-ci.org/ninjatronic/ngGeolocation.png)](https://travis-ci.org/ninjatronic/ngGeolocation)

AngularJS support for [HTML5 Geolocation API](http://www.w3.org/TR/geolocation-API/)

## Installation

### Bower

The bower package name is `ngGeolocation`.

To add it to your `bower.json`...

```javascript
{
    "dependencies": {
        "ngGeolocation": ">=0.0.1"
    }
}
```

To install from the command line...

```
bower install ngGeolocation
```

## Usage

Make sure your app depends on the `ngGeolocation` module. Geolocation methods are available through the `$geolocation` service.

```javascript
angular
    .module('myApp', ['ngGeolocation'])
    .controller('geolocCtrl', ['$geolocation', '$scope', function($geolocation, $scope) {
         $scope.myPosition = $geolocation.getCurrentPosition({
            timeout: 60000
         });
    }]);
```

The `$geolocation` service can expose a property `location` whose value reflects the current position. To enable this feature a watch must be created using `watchPosition`. This method takes a `PositionOptions` object in the same manner as `getCurrentPosition`. There is no return value.

While this watch is active the value of the property `location` is periodically updated with the latest geolocatopm result. If an error has occurred the code and message are available via `$geolocation.position.error`.

The current watch can be cancelled using `clearWatch`.

```javascript
angular
    .module('myApp', ['ngGeolocation'])
    .controller('geolocCtrl', ['$geolocation', '$scope', function($geolocation. $scope) {
        $geolocation.watchPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        };
        $scope.myCoords = $geolocation.position.coords; // this is regularly updated
        $scope.myError = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs
    }]);
```

## API Reference

### $geolocation.getCurrentPosition(options)

Asynchronously attempts to obtain the current location of the device.

#### Parameters

**options** - A [PositionOptions](http://www.w3.org/TR/geolocation-API/#position_options_interface) object

#### Returns

A promise, resolved with a [Position](http://www.w3.org/TR/geolocation-API/#position_interface) object or rejected with a [PositionError](http://www.w3.org/TR/geolocation-API/#position_error_interface) object.

### $geolocation.watchPosition(options)

Asynchronously begins a watch operation which monitors the position of the device and update `$geolocation.position` every time this position changes. If a watch operation is already in progress, this method does nothing.

#### Parameters

**options** - A [PositionOptions](http://www.w3.org/TR/geolocation-API/#position_options_interface) object


### $geolocation.cancelWatch()

Cancels the current watch operation. If there is no current watch operation this method does nothing.

### $geolocation.position

This property is kept up to date if there is a watch operation in progress. If the last update was successful then it is populated with the most recently available [Position](http://www.w3.org/TR/geolocation-API/#position_interface). If the last update was not successfull `$geolocation.position.error` is populated with the relevant [PositionError](http://www.w3.org/TR/geolocation-API/#position_error_interface) object.

## Development

This project uses Grunt for tooling. The toolbelt dependencies are managed by Grunt and the production code dependencies are managed by Bower. Fork the code and clone it into your workspace, then...

```
npm install
bower install --dev
```

Tests can be run manually with `grunt test` or automatically on changes with `grunt`.

If you wish to submit a pull request or an issue please include a test that demonstrates your addition.
