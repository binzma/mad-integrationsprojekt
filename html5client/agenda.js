/**
 * Created by maenu on 23/02/2015.
 */

/**
 * Module that provides functionality for the agenda list view.
 */
var AgendaListView = (function () {

    var domContainer;
    var data = {};
    var listViewTemplate = _.template(
        '<ul id="agendaListView" data-role="listview" data-inset="true">' +
        '<% _.each(items, function(item){ %>' +

        '<li>' +
            '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width: 80px;">' +
                    '<div data-role="fieldcontain">' +
                        '<a href="#popupImg<%- item.id %>" data-rel="popup" data-position-to="window" data-transition="fade">' +
                            '<img style="height: 70px; width: 70px;" src="<%- item.imageSrc %>">' +
                        '</a>' +
                        '<div data-role="popup" id="popupImg<%- item.id %>" data-overlay-theme="b" data-theme="b" data-corners="false">' +
                            '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img class="popphoto" src="<%- item.imageSrc %>" style="max-height:512px;">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="ui-block-b" style="width: 60%;">' +
                    '<div data-role="fieldcontain">' +
                        '<h4><%- item.name %></h4>' +
                        '<p><%- item.content %></p>' +
                    '</div>' +
                '</div>' +
                '<div style="clear: both; float: right;">'+
                //'<div class="ui-block-c" style="width: 6%; padding-top: 5px; float: right;">' +
                    //'<div style="float: right; margin-right: 7px;">' +
                        '<div data-role="controlgroup" data-type="horizontal">' +
                            '<a href="index.html" data-role="button" data-icon="navigation" data-iconpos="notext">Route</a>' +
                            '<a href="#popupDialog<%- item.id %>" data-rel="popup" data-position-to="window" data-transition="pop" data-role="button" data-icon="delete" data-iconpos="notext">Delete</a>' +
                            '<a href="#" onclick="AgendaListView.moveItemUp({\'id\': <%- item.id %>, \'sortIndex\': <%- item.sortIndex %>});" data-role="button" data-icon="arrow-u" data-iconpos="notext">Up</a>' +
                            '<a href="#" onclick="AgendaListView.moveItemDown({\'id\': <%- item.id %>, \'sortIndex\': <%- item.sortIndex %>});" data-role="button" data-icon="arrow-d" data-iconpos="notext">Down</a>' +
                        '</div>' +
                        '<div data-role="popup" id="popupDialog<%- item.id %>" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:400px;">' +
                            '<div data-role="header" data-theme="a">' +
                                '<h1>Delete entry?</h1>' +
                            '</div>' +
                            '<div role="main" class="ui-content">' +
                                '<h3 class="ui-title">Are you sure you want to delete this entry from the agenda?</h3>' +
                                '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Cancel</a>' +
                                '<a href="#" onclick="AgendaListView.removeItem({\'id\': <%- item.id %>});" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back" data-transition="flow">Delete</a>' +
                            '</div>' +
                        '</div>' +
                    //'</div>' +
                //'</div>' +
                '</div>' +
            '</div>' +
        '</li>' +

        '<% }); %>' +
        '</ul>'
    );

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

        AgendaDatabase.init().done(function(){
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
        AgendaDatabase.fetchEntryItems().done(function(items){
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
        AgendaDatabase.clear().done(function(){
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
        AgendaDatabase.addEntry(item).done(function(persistedItem){
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
        AgendaDatabase.removeEntry(item).done(function(){
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
        AgendaDatabase.decrementSortIndex(item).done(function(){
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
        AgendaDatabase.incrementSortIndex(item).done(function(){
            loadItemsFromDatabase().done(function(){
                render();
            });
        });
    }

    /**
     * Generatesthe listview html contents by using the preparsed template and
     * the items data.
     *
     * @return html string
     */
    function _getHtml(){
        return listViewTemplate(data);
    }

})();

