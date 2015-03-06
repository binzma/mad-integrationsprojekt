/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};

/**
 * Module for the map
 */
bernApp.Map = (function () {

    var markers, map;

    return {
        init: init
    };

    /**
     * Inits the map
     */
    function init(){
        _getPOIData().done(function(myLocationData){
            _initMap(myLocationData);
            _centerMap();
            bernApp.Utils.maximizeHeight('#mapContentContainer', 150);
        });
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
     * Initializes the map
     *
     * @private
     */
    function _initMap(myLocationData) {

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


        map = new google.maps.Map(document.getElementById('mapCanvas'), {
            zoom: 10,
            center: new google.maps.LatLng(46.946643, 7.443965),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            panControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        });

        markers = new Array();

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
    }

    /**
     * Centers the map
     *
     * @private
     */
    function _centerMap() {
        //  Create a new viewpoint bound
        var bounds = new google.maps.LatLngBounds();

        //  Go through each...
        $.each(markers, function (index, marker) {
            bounds.extend(marker.position);
        });
        //  Fit these bounds to the map
        map.fitBounds(bounds);
    }

})();