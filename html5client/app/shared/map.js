/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};

/**
 * Module for the map
 */
bernApp.Map = (function () {

    var map;

    return {
        initPoi: initPoi,
        initDirections: initDirections
    };


    /**
     * Inits the map with the poi's
     */
    function initPoi(){

        var d = $.Deferred();

        _initMap();

        _getPOIData().done(function(myLocationData){
            _drawPOIs(myLocationData);
            d.resolve();
        });

        return d;
    }

    /**
     * Inits the map with directions
     */
    function initDirections(targetLocation){

        var d = $.Deferred();

        _initMap();

        _getCurrentLocation().done(function(location){
            // draw route from current location
            _drawDirections(location, targetLocation);
        }).fail(function(){
            // failed to get current location,
            // draw route from home location..
            _drawDirections(bernApp.Constants.homeLocation, targetLocation);
        });

        return d;
    }

    function _drawDirections(srcLocation, targetLocation){

        var d = $.Deferred();

        var request = {
            origin: srcLocation,
            destination: targetLocation,
            travelMode: google.maps.TravelMode.DRIVING
        };

        var directionsService = new google.maps.DirectionsService();

        directionsService.route(request, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {

                var directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);

                d.resolve();
            }
            else {
                d.reject();
            }
        });

        return d;
    }


    /**
     * Loads the contents of the json file
     *
     * @returns promise
     * @private
     */
    function _getPOIData(){
        return $.getJSON("../poiData/pointsOfInterest.json");
    }


    /**
     *
     * @returns {*}
     */
    function _getCurrentLocation(){

        var d = $.Deferred();

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                d.resolve(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
            }, function() {
                d.reject();
            });
        }
        // Browser doesn't support Geolocation
        else {
            d.reject();
        }

        return d;
    }



    /**
     * Initializes the map
     *
     * @private
     */
    function _drawPOIs(myLocationData) {

        var markers = new Array();

        var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
        var icons = [
            iconURLPrefix + 'red-dot.png'
        ];
        var icons_length = icons.length;
        var shadow = {
            anchor: new google.maps.Point(15, 33),
            url: iconURLPrefix + 'msmarker.shadow.png'
        };
        var iconCounter = 0;

        _.each(myLocationData, function (myLocationCategory) {

            _.each(myLocationCategory.locations, function (myLocation) {

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(myLocation.lat, myLocation.long),
                    map: map,
                    icon: icons[iconCounter],
                    shadow: shadow
                });

                markers.push(marker);
                // Add Event Listener to the Marked Position

                google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        $("#poiPanel").html(bernApp.PointOfInterestPanel.getHtml(myLocation));
                        $("#poiPanel").panel("open");
                    }
                })(marker));

                iconCounter++;
                // We only have a limited number of possible icon colors, so we may have to restart the counter
                if (iconCounter >= icons_length) {
                    iconCounter = 0;
                }

            });

        });

        // center map
        //  Create a new viewpoint bound
        var bounds = new google.maps.LatLngBounds();
        //  Go through each...
        _.each(markers, function(marker) {
            bounds.extend(marker.position);
        });
        //  Fit these bounds to the map
        map.fitBounds(bounds);
    }


    /**
     * Initializes the map
     *
     * @private
     */
    function _initMap() {

        map = new google.maps.Map(document.getElementById('mapCanvas'), {
            zoom: 10,
            center: bernApp.Constants.homeLocation,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            panControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        });
    }


})();
