/**
 * Created by maenu on 23/02/2015.
 */


var AgendaListView = (function () {

    var domContainer;
    var data = {};
    var listViewTemplate = _.template(
        '<ul id="agendaListView" data-role="listview" data-inset="true">' +
        '<% _.each(items, function(item){ %>' +
        '<li><a href="<%- item.href %>"><%- item.title %></a></li>' +
        '<% }); %>' +
        '</ul>'
    );

    return {
        render: render,
        addItem: addItem,
        removeItem: removeItem,
        init: init
    };

    function init(domElt){
        data.items = [];
        domContainer = domElt;
    }

    function render(){
        domContainer.html(_getHtml());
        domContainer.trigger("create");
        $("#agendaListView").listview("refresh");
    }

    function addItem(item){
        data.items.push(item);
    }

    function removeItem(item){
        // remove all items that have the same title as the item to remove
        data.items = data.items.filter(function(listElt){
            return listElt.title !== item.title;
        });
    }

    function _getHtml(){
        return listViewTemplate(data);
    }

})();
