/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};


bernApp.PointOfInterestPanel = (function () {

    return {
        getHtml: getHtml
    };

    function getHtml(pointOfInterestData){
        return bernApp.MapTemplates.poiPanelTemplate({"data": pointOfInterestData, "json": JSON.stringify(pointOfInterestData)});
    }

})();