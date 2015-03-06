/**
 * Created by U114902 on 05.03.2015.
 */
var bernApp = bernApp || {};

/**
 * Module that provides templates for the map.
 */
bernApp.MapTemplates = (function () {

    return {
        poiPanelTemplate: _.template(
            '<h1><%- data.name %></h1>' +
            '<img class="mapPanelImg" src="../poiData/<%- data.imageSrc %>">' +
            '<p><%- data.content %></p>' +
            '<a href="<%- data.link %>"><%- data.link %></a>' +
            '<p />' +
            '<a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-" href="#">Directions</a>' +
            '<a href="#" data-ajax="false" onclick="bernApp.Navigation.addPOI(<%- json %>);" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-" >Add to agenda</a>'
        )
    };

})();
