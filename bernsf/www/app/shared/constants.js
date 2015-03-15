/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};

/**
 * Constants module
 */
bernApp.Constants = (function () {
    'use strict';

    return {
        mapDirectionsLatLongParam: 'directionsLatLong',
        homeLocation: new google.maps.LatLng(46.946643, 7.443965) // Bern
    };

})();
