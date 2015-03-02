/**
 * Created by U114902 on 02.03.2015.
 */


/**
 * Module that abstracts the database for the agenda using WebSQL.
 */
var AgendaDatabase = (function () {

    var db;

    return {
        fetchEntryItems: fetchEntryItems,
        addEntryItem: addEntryItem,
        removeEntryItem: removeEntryItem,
        init: init,
        clear: clear
    };

    /**
     * Inits the agenda database:
     *  - creates database if it does not already exist
     *  - creates tables if they do not already exist
     *
     * @return promise
     */
    function init(){
        db = openDatabase('agendaDb', '1.0', 'Database for the agenda.', 2 * 1024 * 1024);
        return _createTables();
    }

    /**
     * Clears the agenda database.
     *
     * @return promise
     */
    function clear(){
        var d = $.Deferred();
        _dropTables().done(function(){
            _createTables().done(function(){
                d.resolve();
            });
        });
        return d;
    }

    /**
     * Drops all tables, that are used by the agenda.
     *
     * @return promise
     */
    function _dropTables(){
        var d = $.Deferred();

        db.transaction(function (tx) {
                tx.executeSql('DROP TABLE entries');
            },
            function (error) {
                console.log("Transaction Error: " + error.message);
                d.reject();
            },
            function () {
                console.log("Droped tables");
                d.resolve();
            });

        return d;
    }

    /**
     * Creates all tables, that are used by the agenda.
     *
     * @return promise
     */
    function _createTables(){
        var d = $.Deferred();

        db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS entries (' +
                        'id INTEGER PRIMARY KEY ASC, ' +
                        'name TEXT, ' +
                        'content TEXT, ' +
                        'lat REAL, ' +
                        'long REAL, ' +
                        'imageSrc TEXT, ' +
                        'link TEXT ' +
                    ')'
                );
            },
            function (error) {
                console.log("Transaction Error: " + error.message);
                d.reject();
            },
            function () {
                console.log("Created tables if not exists");
                d.resolve();
            });

        return d;
    }

    /**
     * Queries all entries from the database and returns a promise that
     * delivers the results.
     *
     * @param item
     * @return promise
     */
    function fetchEntryItems(){

        var d = $.Deferred();

        db.transaction(function (tx) {

            tx.executeSql('SELECT * FROM entries', [], function (tx, results) {
                    var len = results.rows.length, i, items;

                    items = [];

                    for (i = 0; i < len; i++) {
                        items.push(results.rows.item(i));
                    }

                    d.resolve(items);
                },
                function (tx, error) {
                    console.log("Query Error: " + error.message);
                    d.reject();
                });

        });

        return d;
    }

    /**
     * Adds an entry item to the database and returns a promise with the
     * auto increment id as resolve value.
     *
     * @param item
     * @return promise
     */
    function addEntryItem(item){

        var d = $.Deferred();

        db.transaction(function (tx) {
                tx.executeSql('INSERT INTO entries (name, content, lat, long, imageSrc, link) VALUES (?, ?, ?, ?, ?, ?)', [
                        item.name,
                        item.content,
                        item.lat,
                        item.long,
                        item.imageSrc,
                        item.link
                    ],
                    function (tx, result) {
                        console.log("Added entry " + item.name +" to db.");

                        tx.executeSql('SELECT last_insert_rowid() AS rowid FROM entries LIMIT 1', [], function (tx, results) {
                            d.resolve(results.rows.item(0).rowid);
                        });

                    },
                    function (tx, error) {
                        console.log("Query Error: " + error.message);
                        d.reject();
                    });
            },
            function (error) {
                console.log("Transaction Error: " + error.message);
            },
            function () {
                console.log("Transaction Success");
            }
        );

        return d;
    }

    /**
     * Removes an item from the database by its id property.
     * All other properties are optional.
     *
     * @param item
     * @return promise
     */
    function removeEntryItem(item){
        var d = $.Deferred();

        db.transaction(function (tx) {
                tx.executeSql('DELETE FROM entries WHERE id=?', [item.id]);
            },
            function (error) {
                console.log("Transaction Error: " + error.message);
                d.reject();
            },
            function () {
                console.log("Removed item with id " + item.id);
                d.resolve();
            });

        return d;
    }

})();
