/**
 * Created by maenu on 23/02/2015.
 */


var SehenswuerdigkeitenPanel = (function () {

    var compiledTemplate = _.template(
        '<h1><%- data.name %></h1>' +
        '<img src="<%- data.imageSrc %>">' +
        '<p><%- data.content %></p>' +
        '<a href="<%- data.link %>"><%- data.link %></a>' +
        '<p />' +
        '<a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-" href="#">Directions</a>' +
        '<a class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-" href="javascript: AgendaDatabase.addEntry(<%- json %>);">Add to agenda</a>');

    return {
        getHtml: getHtml
    };

    function getHtml(sehenswuerdigkeitData){
        return compiledTemplate({"data": sehenswuerdigkeitData, "json": JSON.stringify(sehenswuerdigkeitData)});
    }

})();