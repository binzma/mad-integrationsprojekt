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

        /**
         * True for verbose mode, false for production
         */
        debug: true,

        /**
         * Name of the url-param used for directions
         */
        mapDirectionsLatLongParam: 'directionsLatLong',

        /**
         * The home location for the map (poi / directions)
         */
        homeLocation: new google.maps.LatLng(46.946643, 7.443965) // Bern
    };

})();
