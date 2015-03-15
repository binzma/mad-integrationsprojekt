# mad-integrationsprojekt


FEATURE-LISTE
-------------

- Kartenansicht:
    - Anzeige aktuelle Position
    - Anzeige von POIs
    - Auswahl/Filter von POIs nach Kategorie
    - Antippen POI : Anzeige Mini-Info -> Detailansicht
                                       -> Routing

- Detailansicht:
    - Anzeige der Informationen spezifisch nach POI-Kategorie <-- TODO
      Mindestens: Name, Adresse/Standort, Bilder
    - Funktion: Besuchen -> Aufnehmen in Agenda
    - Routing (Analog Kartenansicht)
    - Prio 2: Phone-Integration (z.B. Anrufen, etc)

- Agenda:
    - Listenansicht (Sortieren, Loeschen)
    - Da kleine Teamgroesse: Schrittweiser Ausbau (Prio 2)
      - Routeing/Navigation
      - Phone-Integration (z.B. Kalendereintrag)
      - ...

- Allgemeines:
    - Begrenzt auf Bern
    - Test auf Android, ev. Windows-Phone <--- TODO
    - Nur Online
    - POIs direkt in APP integriert ("Lokale DB")


- Abgabe:
    - Code
    - APK fürs handy (unsigniert)


------------------
- Misc features (not requirements)
    - responsiveness trough media queries



------------------
HOWTO SIGN APK
------------------
    - create keystore

        keytool -genkey -v -keystore bernapp.keystore -alias bernapp -keyalg RSA -keysize 2048 -validity 10000

    - sign jar

        jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore bernapp.keystore MainActivity-release-unsigned.apk bernapp

    - repack signed apk

        "E:\Program Files\Android SDK Tools\build-tools\22.0.0\zipalign" -v 4 MainActivity-release-unsigned.apk bernApp.apk



----------------
DEBUG on device
----------------
https://developer.chrome.com/devtools/docs/remote-debugging

http://java.dzone.com/articles/debugging-android