/**
 * Created by maenu on 23/02/2015.
 */


var SehenswuerdigkeitenPanel = (function () {

    var compiledTemplate = _.template('<h1><%- name %></h1><p><%- beschreibung %></p><a href="<%- link %>"><%- link %></a>');

    return {
        getHtml: getHtml
    };

    function getHtml(sehenswuerdigkeitData){
        return compiledTemplate(sehenswuerdigkeitData);
    }

})();