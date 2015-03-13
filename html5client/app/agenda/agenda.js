/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};

/**
 * Module that provides functionality for the agenda list view.
 */
bernApp.AgendaListView = (function () {
    'use strict';

    var domContainer;
    var data = {};

    return {
        render: render,
        addItem: addItem,
        removeItem: removeItem,
        moveItemUp: moveItemUp,
        moveItemDown: moveItemDown,
        init: init,
        clear: clear,
        loadItemsFromDatabase: loadItemsFromDatabase
    };

    /**
     * Inits the module.
     *
     * @return promise
     */
    function init(domElt){
        var d = $.Deferred();

        domContainer = domElt;

        bernApp.AgendaDatabase.init().done(function(){
            loadItemsFromDatabase().done(function(){
                render();
                d.resolve();
            });
        });
        return d;
    }

    /**
     * Writes the items from the database into the cache.
     * Existing cache will be overwritten.
     *
     * @return promise
     */
    function loadItemsFromDatabase(){
        var d = $.Deferred();
        bernApp.AgendaDatabase.fetchEntryItems().done(function(items){
            // write item cache
            data.items = items || [];
            d.resolve();
        });
        return d;
    }

    /**
     * Generates the html contents of the list, triggers "create"
     * and refreshes the jquery listview.
     */
    function render(){
        domContainer.html(_getHtml());
        domContainer.trigger("create");
        $("#agendaListView").listview("refresh");
    }

    /**
     * Clear the list
     */
    function clear(){
        bernApp.AgendaDatabase.clear().done(function(){
            // also clear cached items
            data.items = [];
            render();
        });
    }

    /**
     * Adds an item and rerenders the listview.
     *
     * @param item
     */
    function addItem(item){
        bernApp.AgendaDatabase.addEntry(item).done(function(persistedItem){
            // add item to cache
            data.items.push(persistedItem);

            render();
        });
    }

    /**
     * Removes an item and rerenders the listview.
     *
     * @param item
     */
    function removeItem(item){
        bernApp.AgendaDatabase.removeEntry(item).done(function(){
            // remove all items that have the same title as the item to remove from cache
            data.items = data.items.filter(function(listElt){
                return listElt.id !== item.id;
            });

            render();
        });
    }

    /**
     * Moves the item up in the list.
     *
     * @param item
     */
    function moveItemUp(item){
        bernApp.AgendaDatabase.decrementSortIndex(item).done(function(){
            loadItemsFromDatabase().done(function(){
                render();
            });
        });
    }

    /**
     * Moves the item down in the list.
     *
     * @param item
     */
    function moveItemDown(item){
        bernApp.AgendaDatabase.incrementSortIndex(item).done(function(){
            loadItemsFromDatabase().done(function(){
                render();
            });
        });
    }

    /**
     * Generates the listview html contents by using the preparsed template and
     * the items data.
     *
     * @return html string
     */
    function _getHtml(){
        return bernApp.AgendaTemplates.listViewTemplate(data);
    }

})();

