# ngGeolocation

AngularJS support for HTML5 Geolocation

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
        /*
         * getCurrentPosition works in the same way as HTML5 navigator.getCurrentPosition.
         * Takes an optional options object and returns a promise
         */
         $scope.myPosition = $geolocation.getCurrentPosition({
            timeout: 60000
         });
    }]);
```

## Development

This project uses Grunt for tooling. The toolbelt dependencies are managed by Grunt and the production code dependencies are managed by Bower. Fork the code and clone it into your workspace, then...

```
npm install
cd src
bower install --dev
```

Tests can be run manually with `grunt test` or automatically on changes with `grunt`.

If you wish to submit a pull request or an issue please include a test that demonstrates your addition.
