/**
 * Created by maenu on 06.03.2015.
 */

var bernApp = bernApp || {};

/**
 * Module for navigation stuff that needs more than one line..
 */
bernApp.Navigation = (function (global) {
    'use strict';

    return{
        home: home,
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
        bernApp.AgendaDatabase.addEntry(poiJson).done(function(){
            global.location = "../agenda/agenda.html";
        });
    }

    /**
     * Moves an item up in the AgendaListView.
     *
     * @param item
     */
    function agendaUp(agenda, item){
        agenda.moveItemUp(item);
        $('#actionsDialog' + item.id).popup('close');
    }

    /**
     * Moves an item down in the AgendaListView.
     *
     * @param item
     */
    function agendaDown(agenda, item){
        agenda.moveItemDown(item);
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
        global.setTimeout(function(){
            $('#deleteDialog' + item.id).popup('open');
        }, 250);
    }

    /**
     * Creates direction to a POI and navigates to the directions view
     *
     * @param item
     */
    function getDirections(item){
        if(bernApp.Constants.debug){
            console.log('redirecting to directions with: ');
            console.log(item);
        }
        global.location = '../map/directions.html?' +
            bernApp.Constants.mapDirectionsLatLongParam + '=' + item.lat + ',' + item.long;
    }

    /**
     * Navigate to the home screen
     *
     * @param item
     */
    function home(){
        global.location = '../map/poi.html';
    }


})(window);