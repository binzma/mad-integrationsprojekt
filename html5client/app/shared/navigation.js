/**
 * Created by maenu on 06.03.2015.
 */

var bernApp = bernApp || {};

/**
 * Module for navigation stuff that needs more than one line..
 */
bernApp.Navigation = (function () {

    return{
        addPOI: addPOI,
        agendaUp: agendaUp,
        agendaDown: agendaDown,
        agendaDelete: agendaDelete,
        getDirections: getDirections
    };

    /**
     * Adds a point of interest and navigates to the agenda.
     *
     * @param poiJson
     */
    function addPOI(poiJson){
        bernApp.AgendaDatabase.addEntry(poiJson);
        window.location = "../agenda/agenda.html";
    }

    /**
     * Moves an item up in the AgendaListView.
     *
     * @param item
     */
    function agendaUp(item){
        bernApp.AgendaListView.moveItemUp(item);
        $('#actionsDialog' + item.id).popup('close');
    }

    /**
     * Moves an item down in the AgendaListView.
     *
     * @param item
     */
    function agendaDown(item){
        bernApp.AgendaListView.moveItemDown(item);
        $('#actionsDialog' + item.id).popup('close');
    }

    /**
     * Deletes an item in the AgendaListView.
     *
     * @param item
     */
    function agendaDelete(item){
        $('#actionsDialog' + item.id).popup('close');
        // for some reason, popup('open') does not work immediately after closing one.
        setTimeout(function(){
            $('#deleteDialog' + item.id).popup('open');
        }, 250);
    }

    /**
     * Creates direction to a POI and navigates to the directions view
     *
     * @param item
     */
    function getDirections(item){



       // bernApp.RoutesDatabase.addRoute();

       // window.location = "../map/map.html";

         var directionsDisplay;
         var directionsService = new google.maps.DirectionsService();
         var current_Location;
         var routeArray = [ ];
         var agenda_Route = []; // This are the route in the agenda
         var bern = new google.maps.LatLng(46.946643, 7.443965);
         var browserSupportFlag =  new Boolean();
         /// Get Current location

         if(navigator.geolocation) {
         browserSupportFlag = true;
         navigator.geolocation.getCurrentPosition(function(position) {
         current_Location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
         map.setCenter(current_Location);
         }, function() {
         handleNoGeolocation(browserSupportFlag);
         });
         }
         // Browser doesn't support Geolocation
         else {
         browserSupportFlag = false;
         handleNoGeolocation(browserSupportFlag);
         }

         function handleNoGeolocation(errorFlag) {
         if (errorFlag == true) {
         alert("Geolocation service failed.");
         initialLocation = bern;
         }
         map.setCenter(initialLocation);
         }


         function calcRoute()
         {
         var start = current_Location;
         var end = agenda_Route[agenda_Route.length-1].value;



         for (var i = 0; i < agenda_Route.length; i++)  // for every route in the agenda
         {
         routeArray.push({                          // push it to Route Array
         location:routeArray[i].value,
         stopover:true});
         }

         var request = {
         origin: start,
         destination: end,
         waypoints: routeArray,
         optimizeWaypoints: true,
         travelMode: google.maps.TravelMode.DRIVING
         };

         directionsService.route(request, function(response, status) {
         if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
         var route = response.routes[0];

         }
         });



         }

    }


})();