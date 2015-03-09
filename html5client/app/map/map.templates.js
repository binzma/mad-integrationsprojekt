/**
 * Created by maenu on 05.03.2015.
 */
var bernApp = bernApp || {};

/**
 * Module that provides templates for the map.
 */
bernApp.MapTemplates = (function () {

    return {
        poiPanelTemplate: _.template(
            '<div id="poiPanelContents">' +
            '<h1><%- data.name %></h1>' +
            '<img class="mapPanelImg" src="../poiData/<%- data.imageSrc %>">' +
            '<p><%- data.content %></p>' +
            '<p />' +

            '<a href="<%- data.link %>" rel="external" data-ajax="false" class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-action">Visit homepage</a>' +
            '<a href="#" data-ajax="false" onclick="bernApp.Navigation.getDirections(<%- json %>);"  class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-navigation">Get directions</a>' +
            '<a href="#" data-ajax="false" onclick="bernApp.Navigation.addPOI(<%- json %>);"  class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-plus">Add to agenda</a>' +

            '</div>'
        ),
        categoryDropdownTemplate: _.template(
            '<select name="categoryDropdownSelect" data-native-menu="false" id="categoryDropdownSelect">' +
            '<option value="choose-one" data-placeholder="true">Filter</option>' +
            '<% _.each(categories, function(category){ %>' +
            '<option value="<%- category.typ %>"><%- category.name %></option>' +
            '<% }); %>' +
            '</select>'
        )
    };

})();

