/**
 * Created by maenu on 02.03.2015.
 */

var bernApp = bernApp || {};

bernApp.Mockdata = (function () {

    return {
        load: load
    };

    function load(callback) {
        bernApp.AgendaDatabase.init().done(function () {

            bernApp.AgendaDatabase.addEntry({
                "name": "infoText",
                "content": "bla2 bla bla bla bla ... ",
                "lat": 46.946584,
                "long": 7.444051,
                "imageSrc": "http://placehold.it/70",
                "link": "http://www.bs.ch",
                "dateAdded": "20.02.2015,15:00"
            }).done(function () {
                bernApp.AgendaDatabase.addEntry({
                    "name": "Natural History Museum",
                    "content": "bla3 bla bla bla bla ... ",
                    "lat": 46.942142,
                    "long": 7.448922,
                    "imageSrc": "http://placehold.it/70",
                    "link": "http://www.bs.ch",
                    "dateAdded": "20.02.2015,16:00"
                }).done(function () {
                    bernApp.AgendaDatabase.removeEntry({
                        "id": "1"
                    }).done(function () {
                        callback();
                    });
                });
            });
        });

    }

})();

