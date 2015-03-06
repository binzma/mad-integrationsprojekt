/**
 * Created by maenu on 05.03.2015.
 */
var bernApp = bernApp || {};

/**
 * Module that provides templates for the agenda.
 */
bernApp.AgendaTemplates = (function () {

    return {
        listViewTemplate: _.template(
            '<ul data-role="listview" data-split-icon="gear" data-split-theme="a" data-inset="true">' +
            '<% _.each(items, function(item){ %>' +

            '<li class="listEntry">' +
            '<a href="#">' +
            '<img class="listEntryImg" src="../poiData/<%- item.imageSrc %>">' +
            '<h2><%- item.name %></h2>' +
            '<p><%- item.content %></p>' +
            '</a>' +

            '<a href="#actionsDialog<%- item.id %>" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +

            '<div data-role="popup" id="actionsDialog<%- item.id %>" data-theme="b">' +
            '<ul data-role="listview" data-inset="true" style="min-width:210px;">' +
            '<li><a href="#" onclick="bernApp.Navigation.getDirections({\'id\': <%- item.id %>});" data-role="button" data-icon="navigation">Get directions</a></li>' +
            '<li><a href="#" onclick="bernApp.Navigation.agendaDelete({\'id\': <%- item.id %>});" data-role="button" data-icon="delete">Delete entry</a></li>' +
            '<li><a href="#" onclick="bernApp.Navigation.agendaUp({\'id\': <%- item.id %>});" data-role="button" data-icon="arrow-u">Move up</a></li>' +
            '<li><a href="#" onclick="bernApp.Navigation.agendaDown({\'id\': <%- item.id %>});" data-role="button" data-icon="arrow-d">Move down</a></li>' +
            '</ul>' +


            '<div data-role="popup" id="deleteDialog<%- item.id %>" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:400px;">' +
            '<div data-role="header" data-theme="a">' +
            '<h1>Delete entry?</h1>' +
            '</div>' +
            '<div role="main" class="ui-content">' +
            '<h3 class="ui-title">Are you sure you want to delete this entry from the agenda?</h3>' +
            '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Cancel</a>' +
            '<a href="#" onclick="bernApp.AgendaListView.removeItem({\'id\': <%- item.id %>});" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back" data-transition="flow">Delete</a>' +
            '</div>' +
            '</div>' +

            '</div>' +


            '</li>' +

            '<% }); %>' +
            '</ul>'
        )
    };

})();

