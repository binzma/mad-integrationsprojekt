/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};


bernApp.PointOfInterestPanel = (function () {

    return {
        getHtml: getHtml
    };

    /**
     * Generates the POI panel html contents by using the preparsed template and
     * the items data.
     *
     * @return html string
     */
    function getHtml(pointOfInterestData){
        return bernApp.MapTemplates.poiPanelTemplate({
            "data": pointOfInterestData,
            "json": JSON.stringify(pointOfInterestData)
        });
    }

})();