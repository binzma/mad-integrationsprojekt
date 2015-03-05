/**
 * Created by U114902 on 05.03.2015.
 */

/**
 * Module that provides templates for the agenda.
 */
var AgendaTemplates = (function () {

    return {
        listViewTemplate: _.template(
            '<ul data-role="listview" data-split-icon="gear" data-split-theme="a" data-inset="true">' +
            '<% _.each(items, function(item){ %>' +

            '<li>' +
            '<a href="#">' +
            '<img style="height: 70px; width: 70px;" src="<%- item.imageSrc %>">' +
                    '<h2><%- item.name %></h2>' +
                    '<p><%- item.content %></p>' +
            '</a>' +

            '<a href="#actionsDialog<%- item.id %>" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +

            '<div data-role="popup" id="actionsDialog<%- item.id %>" data-theme="b">' +
            '<ul data-role="listview" data-inset="true" style="min-width:210px;">' +
            '<li data-role="list-divider">Choose an action</li>' +
            '<li><a href="#">Route details</a></li>' +
            '<li><a href="#deleteDialog<%- item.id %>">Delete</a></li>' +
            '<li><a href="#" onclick="AgendaListView.moveItemUp({\'id\': <%- item.id %>, \'sortIndex\': <%- item.sortIndex %>});">Up</a></li>' +
            '<li><a href="#" onclick="AgendaListView.moveItemDown({\'id\': <%- item.id %>, \'sortIndex\': <%- item.sortIndex %>});">Down</a></li>' +
            '</ul>' +
            '</div>' +

                '<div data-role="popup" id="deleteDialog<%- item.id %>" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:400px;">' +
                    '<div data-role="header" data-theme="a">' +
                        '<h1>Delete entry?</h1>' +
                    '</div>' +
                    '<div role="main" class="ui-content">' +
                        '<h3 class="ui-title">Are you sure you want to delete this entry from the agenda?</h3>' +
                        '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Cancel</a>' +
                        '<a href="#" onclick="AgendaListView.removeItem({\'id\': <%- item.id %>});" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back" data-transition="flow">Delete</a>' +
                    '</div>' +
                '</div>' +

            '</li>' +

            '<% }); %>' +
            '</ul>'
        )
    };

})();

