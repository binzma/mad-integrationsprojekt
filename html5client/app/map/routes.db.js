/**
 * Created by maenu on 02.03.2015.
 */
var bernApp = bernApp || {};

/**
 * Module that abstracts the database for the routes using WebSQL.
 */
bernApp.RoutesDatabase = (function () {

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
     * Inits the routes database:
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
     * Creates all tables, that are used by the routes.
     *
     * @return promise
     */
    function _createTables(){
        // TODO
    }

    /**
     * Clears the routes database.
     *
     * @return promise
     */
    function clear(){
        // TODO
    }

    /**
     * Drops all tables, that are used by the routes.
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
        console.log('adding route... ');
    }

    /**
     *
     *
     * @return promise
     */
    function removeRoute(){
        // TODO
        console.log('removing route... ');
    }

    /**
     *
     *
     * @return promise
     */
    function addPOI(){
        // TODO
        console.log('adding POI... ');
    }

    /**
     *
     *
     * @return promise
     */
    function removePOI(){
        // TODO
        console.log('removing POI... ');
    }


})();
