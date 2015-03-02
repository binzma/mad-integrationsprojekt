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
        '<img src="<%- item.imageSrc %>">' +
        '</div>' +

        '</div>' +
        '<div class="ui-block-b" style="width: 60%;">' +

        '<div data-role="fieldcontain">' +
        '<h4><%- item.name %></h4>' +
        '<p><%- item.content %></p>' +
        '</div>' +

        '</div>' +
        '<div class="ui-block-c" style="width: 6%; padding-top: 5px; float: right;">' +
        '<div style="float: right; margin-right: 7px;">' +
        '<a href="index.html" data-role="button" data-icon="navigation" data-iconpos="notext">Route</a>' +
        '<a href="javascript: AgendaListView.removeItem({\'id\': <%- item.id %>});" data-role="button" data-icon="delete" data-iconpos="notext">Delete</a>' +
        '</div>' +

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
        AgendaDatabase.addEntry(item).done(function(id){
            // add generated id from db
            item.id = id;
            // add item to cache
            data.items.push(item);

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
     * Generatesthe listview html contents by using the preparsed template and
     * the items data.
     *
     * @return html string
     */
    function _getHtml(){
        return listViewTemplate(data);
    }

})();

