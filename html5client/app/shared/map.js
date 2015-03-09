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
        initDirections: initDirections,
        initDirectionsForAgenda: initDirectionsForAgenda
    };


    /**
     * Inits the map with the poi's
     *
     * @param categoryFilter
     * @returns promise
     */
    function initPoi(categoryFilter){

        var d = $.Deferred();

        _initMap();

        _getPOIData(categoryFilter).done(function(myLocationData){
            _drawPOIs(myLocationData);
            _createCategoryDropdown(myLocationData);
            d.resolve();
        });

        return d;
    }


    /**
     * Updates the poi's on the map
     *
     * @param categoryFilter
     * @returns promise
     */
    function _updatePoi(categoryFilter){
        var d = $.Deferred();

        _initMap();

        _getPOIData(categoryFilter).done(function(myLocationData){
            _drawPOIs(myLocationData);
            d.resolve();
        });

        return d;
    }

    /**
     * Creates the select dropdown for the category filter
     *
     * @param myLocationData
     * @private
     */
    function _createCategoryDropdown(myLocationData){
        $("#poiCategoryFilterDropdown").html(bernApp.MapTemplates.categoryDropdownTemplate({'categories': myLocationData}))
            .trigger("create")
            .change(function(event) {
                _updatePoi($('#categoryDropdownSelect option:selected').val());
            });
    }

    /**
     * Inits the map with directions from current location to one poi
     */
    function initDirections(targetLocation){

        var d = $.Deferred();

        _initMap();

        _getCurrentLocation().done(function(location){
            // draw route from current location
            _drawDirections([location, targetLocation]);
        }).fail(function(){
            // failed to get current location,
            // draw route from home location..
            _drawDirections([bernApp.Constants.homeLocation, targetLocation]);
        });

        return d;
    }

    /**
     * Inits the map with directions for all agenda poi's
     */
    function initDirectionsForAgenda(){

        var d = $.Deferred();

        _initMap();

        _getCurrentLocation().done(function(location){
            // draw route from current location
            _drawAgendaDirections(location);
        }).fail(function(){
            // failed to get current location,
            // draw route from home location..
            _drawAgendaDirections(bernApp.Constants.homeLocation);
        });

        return d;
    }

    /**
     * Inits the map with directions for all agenda poi's
     *
     * @private
     */
    function _drawAgendaDirections(startLocation){

        bernApp.AgendaDatabase.init().done(function(){

            // get poi locations
            bernApp.AgendaDatabase.fetchEntryItems().done(function(items){
                var waypoints = [startLocation];
                _.each(items, function(item){
                    waypoints.push(bernApp.Utils.createLocation(item.lat, item.long));
                });
                _drawDirections(waypoints);
            });

            // if agenda is empty, display message dialog and navigate home
            // bernApp.Navigation.home();

        });

    }

    /**
     * Draw directions for two or more waypoints.
     *
     * @param waypoints
     * @returns promise
     * @private
     */
    function _drawDirections(waypoints){

        var d = $.Deferred();
        var wayptsForRequest, srcLocation, tarLocation;

        if(waypoints.length < 2){
            d.reject();
            return d;
        }

        srcLocation = waypoints.shift();
        tarLocation = waypoints.pop();
        wayptsForRequest = [];
        _.each(waypoints, function(waypoint){
            wayptsForRequest.push({
                location: waypoint,
                stopover: false
            });
        });

        var request = {
            origin:srcLocation,
            destination:tarLocation,
            waypoints: wayptsForRequest,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };

        var directionsService = new google.maps.DirectionsService();

        directionsService.route(request, function(response, status){
            if (status === google.maps.DirectionsStatus.OK){
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
     * @param categoryFilter
     * @returns promise
     * @private
     */
    function _getPOIData(categoryFilter){

        var d = $.Deferred();

        $.getJSON("../poiData/pointsOfInterest.json").done(function(result){
            if(categoryFilter){
                // only keep results that have category.typ equals categoryFilter
                result = result.filter(function(category){
                    return category.typ === categoryFilter;
                });
            }
            d.resolve(result);
        });

        return d;
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
                        $("#poiPanel").html(bernApp.MapTemplates.poiPanelTemplate({
                            "data": myLocation,
                            "json": JSON.stringify(myLocation)
                        }));
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
