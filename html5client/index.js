/**
 * Created by maenu on 23/02/2015.
 */


var SehenswuerdigkeitenPanel = (function () {

    var compiledTemplate = _.template(
        '<h1><%- name %></h1>' +
        '<img src="<%- imageSrc %>">' +
        '<p><%- content %></p>' +
        '<a href="<%- link %>"><%- link %></a>' +
        '<p />' +
        '<a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-" href="#">Directions</a>' +
        '<a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-" href="#">Add to agenda</a>');

    return {
        getHtml: getHtml
    };

    function getHtml(sehenswuerdigkeitData){
        return compiledTemplate(sehenswuerdigkeitData);
    }

})();