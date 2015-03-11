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
            '<a href="<%- data.link %>" rel="external" data-ajax="false" class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-action">Visit homepage</a><br>' +
            //'<a href="#" onClick="navigator.app.loadUrl(\'<%- data.link %>\', { openExternal:true });return false;" class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-action">Visit homepage</a><br>' +
            '<a href="tel:<%- data.telNbr %>" class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-phone">Call</a><br>' +
            '<a href="mailto:<%- data.email %>" class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-mail">Send mail</a><br>' +
            '<a href="#" data-ajax="false" onclick="bernApp.Navigation.getDirections(<%- json %>);"  class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-navigation">Get directions</a><br>' +
            '<a href="#" data-ajax="false" onclick="bernApp.Navigation.addPOI(<%- json %>);"  class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-plus">Add to agenda</a><br>' +
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

