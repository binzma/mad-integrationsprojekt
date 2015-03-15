/**
 * Created by maenu on 02.03.2015.
 */
var bernApp = bernApp || {};

/**
 * Module that abstracts the database for the agenda using WebSQL.
 */
bernApp.AgendaDatabase = (function () {
    'use strict';

    var db;

    return {
        fetchEntryItems: fetchEntryItems,
        addEntry: addEntry,
        removeEntry: removeEntry,
        incrementSortIndex: incrementSortIndex,
        decrementSortIndex: decrementSortIndex,
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
        db = bernApp.Database.open();
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
                //console.log("Droped tables");
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
                    'link TEXT, ' +
                    'sortIndex INTEGER, ' +
                    'dateAdded TEXT, ' +
                    'tel TEXT, ' +
                    'email TEXT ' +
                    ')'
                );
            },
            function (error) {
                console.log("Transaction Error: " + error.message);
                d.reject();
            },
            function () {
                //console.log("Created tables if not exists");
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

            tx.executeSql('SELECT * FROM entries ORDER BY sortIndex ASC', [], function (tx, results) {
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
    function addEntry(item){

        var d = $.Deferred();

        // set dateAdded
        item.dateAdded = $.now();

        db.transaction(function (tx) {

                tx.executeSql('SELECT sortIndex FROM entries ORDER BY sortIndex DESC LIMIT 1', [], function (tx, results) {
                        // fetch greatest sortIndex and increase it by one
                        item.sortIndex = results.rows.length ? parseInt(results.rows.item(0).sortIndex) + 1 : 0;

                        tx.executeSql('INSERT INTO entries (name, content, lat, long, imageSrc, link, sortIndex ,dateAdded, tel, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                                item.name,
                                item.content,
                                item.lat,
                                item.long,
                                item.imageSrc,
                                item.link,
                                item.sortIndex,
                                item.dateAdded,
                                item.tel,
                                item.email
                            ],
                            function (tx, result) {
                                console.log("Added entry " + item.name +" to db.");

                                tx.executeSql('SELECT last_insert_rowid() AS rowid FROM entries LIMIT 1', [], function (tx, results) {
                                    item.id = results.rows.item(0).rowid;
                                    d.resolve(item);
                                });

                            },
                            function (tx, error) {
                                console.log("Query Error: " + error.message);
                                d.reject();
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
                //console.log("Transaction Success");
            }
        );

        return d;
    }


    /**
     * Swaps the sortIndex with the next lesserEntry.
     *
     * @return promise
     */
    function decrementSortIndex(entry){

        var d = $.Deferred();

        db.transaction(function (tx) {
                // fetch sortIndex of the current entry
                tx.executeSql('SELECT sortIndex FROM entries WHERE id = ? ', [entry.id], function (tx, entryResults) {
                    if (!entryResults.rows.length) {
                        // no sortIndex for current entry
                        d.reject();
                        return;
                    }
                    entry.sortIndex = entryResults.rows.item(0).sortIndex;

                    // fetch id and sortIndex of the next lesserEntry
                    tx.executeSql('SELECT id, sortIndex FROM entries WHERE sortIndex < ? ORDER BY sortIndex DESC LIMIT 1', [entry.sortIndex], function (tx, results) {
                        if(!results.rows.length){
                            // no lesserEntry
                            d.reject();
                            return;
                        }
                        // set sortIndex of the entry to the one of the lesserEntry
                        tx.executeSql('UPDATE entries SET sortIndex = ? WHERE id = ?', [results.rows.item(0).sortIndex, entry.id]);
                        // set sortIndex of the lesserEntry to the one of the entry
                        tx.executeSql('UPDATE entries SET sortIndex = ? WHERE id = ?', [entry.sortIndex, results.rows.item(0).id]);
                    })

                })

            },
            function (error) {
                console.log("Transaction Error: " + error.message);
                d.reject();
            },
            function () {
                d.resolve();
            });

        return d;
    }


    /**
     * Swaps the sortIndex with the next greaterEntry.
     *
     * @return promise
     */
    function incrementSortIndex(entry){

        var d = $.Deferred();

        db.transaction(function (tx) {

                // fetch sortIndex of the current entry
                tx.executeSql('SELECT sortIndex FROM entries WHERE id = ? ', [entry.id], function (tx, entryResults) {
                    if (!entryResults.rows.length) {
                        // no sortIndex for current entry
                        d.reject();
                        return;
                    }
                    entry.sortIndex = entryResults.rows.item(0).sortIndex;

                    // fetch id and sortIndex of the next greaterEntry
                    tx.executeSql('SELECT id, sortIndex FROM entries WHERE sortIndex > ?  ORDER BY sortIndex ASC LIMIT 1', [entry.sortIndex], function (tx, results) {
                        if(!results.rows.length){
                            // no greaterEntry
                            d.reject();
                            return;
                        }
                        // set sortIndex of the entry to the one of the greaterEntry
                        tx.executeSql('UPDATE entries SET sortIndex = ? WHERE id = ?', [results.rows.item(0).sortIndex, entry.id]);
                        // set sortIndex of the greaterEntry to the one of the entry
                        tx.executeSql('UPDATE entries SET sortIndex = ? WHERE id = ?', [entry.sortIndex, results.rows.item(0).id]);
                    })

                })

            },
            function (error) {
                console.log("Transaction Error: " + error.message);
                d.reject();
            },
            function () {
                d.resolve();
            });

        return d;
    }


    /**
     * Removes an item from the database by its id property.
     * All other properties are optional.
     *
     * @param item
     * @return promise
     */
    function removeEntry(item){
        var d = $.Deferred();

        db.transaction(function (tx) {
                tx.executeSql('DELETE FROM entries WHERE id=?', [item.id]);
            },
            function (error) {
                console.log("Transaction Error: " + error.message);
                d.reject();
            },
            function () {
                //console.log("Removed item with id " + item.id);
                d.resolve();
            });

        return d;
    }

})();
