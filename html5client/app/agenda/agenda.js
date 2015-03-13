/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};

/**
 * Module that provides functionality for the agenda list view.
 */
(function (global) {
    'use strict';

    var self;

    var AgendaListView = function AgendaListView(domContainer){
        self = this;
        self.data = {};
        self.domContainer = domContainer;
    };

    // expose the module to the global namespace
    global.bernApp.AgendaListView = AgendaListView;

    /**
     * Inits the module.
     *
     * @return promise
     */
    AgendaListView.prototype.init = function(){
        var d = $.Deferred();
        bernApp.AgendaDatabase.init().done(function(){
            self.loadItemsFromDatabase().done(function(){
                self.render();
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
    AgendaListView.prototype.loadItemsFromDatabase = function(){
        var d = $.Deferred();
        bernApp.AgendaDatabase.fetchEntryItems().done(function(items){
            // write item cache
            self.data.items = items || [];
            d.resolve();
        });
        return d;
    }

    /**
     * Generates the html contents of the list, triggers "create"
     * and refreshes the jquery listview.
     */
    AgendaListView.prototype.render = function(){
        self.domContainer.html(_getHtml());
        self.domContainer.trigger("create");
        $("#agendaListView").listview("refresh");
    }

    /**
     * Clear the list
     */
    AgendaListView.prototype.clear = function(){
        bernApp.AgendaDatabase.clear().done(function(){
            // also clear cached items
            self.data.items = [];
            self.render();
        });
    }

    /**
     * Adds an item and rerenders the listview.
     *
     * @param item
     */
    AgendaListView.prototype.addItem = function(item){
        bernApp.AgendaDatabase.addEntry(item).done(function(persistedItem){
            // add item to cache
            self.data.items.push(persistedItem);
            self.render();
        });
    }

    /**
     * Removes an item and rerenders the listview.
     *
     * @param item
     */
    AgendaListView.prototype.removeItem = function(item){
        bernApp.AgendaDatabase.removeEntry(item).done(function(){
            // remove all items that have the same title as the item to remove from cache
            self.data.items = self.data.items.filter(function(listElt){
                return listElt.id !== item.id;
            });
            self.render();
        });
    }

    /**
     * Moves the item up in the list.
     *
     * @param item
     */
    AgendaListView.prototype.moveItemUp = function(item){
        bernApp.AgendaDatabase.decrementSortIndex(item).done(function(){
            self.loadItemsFromDatabase().done(function(){
                self.render();
            });
        });
    }

    /**
     * Moves the item down in the list.
     *
     * @param item
     */
    AgendaListView.prototype.moveItemDown = function(item){
        bernApp.AgendaDatabase.incrementSortIndex(item).done(function(){
            self.loadItemsFromDatabase().done(function(){
                self.render();
            });
        });
    }

    /**
     * Generates the listview html contents by using the preparsed template and
     * the items data.
     *
     * @return html string
     * @private
     */
    var _getHtml = function(){
        return bernApp.AgendaTemplates.listViewTemplate(self.data);
    }

})(window);

