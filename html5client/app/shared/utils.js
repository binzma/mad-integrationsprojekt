/**
 * Created by maenu on 23/02/2015.
 */
var bernApp = bernApp || {};

/**
 * Utilities module
 */
bernApp.Utils = (function () {

    return {
        maximizeHeight: maximizeHeight
    };



    /**
     * Sets the height of the element matched by selector to the page height
     * minus heightOfHeaderAndFooter.
     *
     * @param selector
     */
    function maximizeHeight(selector, bordersHeight){
        $(selector).height(($(window).height() - (bordersHeight || 0)) + 'px');
    }


})();
