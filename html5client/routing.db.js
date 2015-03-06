/**
 * Created by U114902 on 02.03.2015.
 */
var bernApp = bernApp || {};

/**
 * Module that abstracts the database for the routing using WebSQL.
 */
bernApp.RoutingDatabase = (function () {

    var db;

    return {
        addRoute: addRoute,
        removeRoute: removeRoute,
        addPOI: addPOI,
        removePOI: removePOI,
        init: init,
        clear: clear
    };

    /**
     * Inits the routing database:
     *  - creates database if it does not already exist
     *  - creates tables if they do not already exist
     *
     * @return promise
     */
    function init(){
        db = bernApp.Database.open();
        return _createTables();
    }

    /**
     * Creates all tables, that are used by the route.
     *
     * @return promise
     */
    function _createTables(){
        // TODO
    }

    /**
     * Clears the routing database.
     *
     * @return promise
     */
    function clear(){
        // TODO
    }

    /**
     * Drops all tables, that are used by the routing.
     *
     * @return promise
     */
    function _dropTables(){
        // TODO
    }

    /**
     *
     *
     * @return promise
     */
    function addRoute(){
        // TODO
    }

    /**
     *
     *
     * @return promise
     */
    function removeRoute(){
        // TODO
    }

    /**
     *
     *
     * @return promise
     */
    function addPOI(){
        // TODO
    }

    /**
     *
     *
     * @return promise
     */
    function removePOI(){
        // TODO
    }


})();
