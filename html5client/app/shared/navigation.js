/**
 * Created by U114902 on 06.03.2015.
 */

var bernApp = bernApp || {};

/**
 * Module for more complex navigation functions.
 */
bernApp.Navigation = (function () {

    return{
        addPOIToAgendaAndGoToAgenda: addPOIToAgendaAndGoToAgenda
    }


    function addPOIToAgendaAndGoToAgenda(poiJson){
        bernApp.AgendaDatabase.addEntry(poiJson);
        window.location = "../agenda/agenda.html";
    }

})();