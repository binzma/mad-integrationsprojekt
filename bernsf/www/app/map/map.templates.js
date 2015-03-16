/**
 * Created by maenu on 05.03.2015.
 */
var bernApp = bernApp || {};

/**
 * Module that provides templates for the map.
 */
bernApp.MapTemplates = (function () {
    'use strict';

    return {
        poiPanelTemplate: _.template(
            '<div id="poiPanelContents">' +
            '<span class="poi-panel-category">(Category: <%- data.category %>)</span>' +
            '<h1 class="poi-panel-title"><%- data.name %></h1>' +
            '<% if (data.imageSrc) { %>' +
            '<img class="poi-panel-image" src="../poiData/<%- data.imageSrc %>">' +
            '<% }  %>' +
            '<p class="poi-panel-content"><%- data.content %></p>' +
            '<p class="poi-panel-address"><%- data.address %></p>' +
            '<% if (data.link) { %>' +
            '<a href="<%- data.link %>" rel="external" data-ajax="false" class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-action">Visit homepage</a><br>' +
            '<% }  %>' +
            '<% if (data.phone) { %>' +
            '<a href="tel:<%- data.phone %>" class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-phone"><%- data.phone %></a><br>' +
            '<% }  %>' +
            '<% if (data.email) { %>' +
            '<a href="mailto:<%- data.email %>" class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-icon-left ui-icon-mail">Send mail</a><br>' +
            '<% }  %>' +
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

