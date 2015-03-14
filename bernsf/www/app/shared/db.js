/**
 * Created by maenu on 02.03.2015.
 */
var bernApp = bernApp || {};

/**
 * Module that abstracts the database for the bernApp using WebSQL.
 */
bernApp.Database = (function () {

    return {
        open: open
    };

    /**
     * Opens the bernApp database:
     *  - creates database if it does not already exist
     */
    function open(){
        return openDatabase('bernAppDb', '1.0', 'Database for the bernApp.', 2 * 1024 * 1024);
    }


})();
