/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};

/**
 * Utilities module
 */
bernApp.Utils = (function () {

    return {
        maximizeHeight: maximizeHeight,
        getQueryParameter: getQueryParameter,
        createLocation: createLocation,
        createLocationFromStr: createLocationFromStr
    };

    /**
     * Creates a google API location from an string containing lat and long, separated by comma.
     *
     * @param latLng
     * @returns {google.maps.LatLng}
     */
    function createLocationFromStr(latLng){
        var parts = latLng.split(",");
        if(parts.length < 2){
            return;
        }
        return createLocation({lat: parts[0], lng: parts[1]});
    }

    /**
     * Creates a google API location from an object containing lat and long.
     *
     * @param latLng
     * @returns {google.maps.LatLng}
     */
    function createLocation(latLng){
        return new google.maps.LatLng(latLng.lat, latLng.lng);
    }


    /**
     * Sets the height of the element matched by selector to the page height
     * minus bordersHeight.
     *
     * @param selector
     */
    function maximizeHeight(selector, bordersHeight){
        $(selector).height(($(window).height() - (bordersHeight || 0)) + 'px');
    }

    /**
     * Reads a query parameter from the url.
     *
     * @param pageId
     * @param paramName
     */
    function getQueryParameter(paramName){

        var d = $.Deferred();

        var urlArr = window.location.href.split('?');

        if(urlArr.length < 2){
            // param not found
            d.reject();
        }

        // remove first part
        urlArr.shift();

        _.each(urlArr, function(paramStr){
            var paramArr = paramStr.split('=');
            if(paramArr.length < 2){
                return;
            }
            if(paramArr[0] === paramName){
                // we found our param, resolve value
                d.resolve(paramArr[1]);
            }
        });

        return d;

    }


})();
