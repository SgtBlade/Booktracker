# social-network-SgtBlade

**BELANGRIJK!!!** Aangezien ik met een localstore werk heb ik de seedfunctie (staat in js/hooks/context) uitgezet. Indien jullie het willen opvullen kunnen jullie het daar aanzetten.


//Mijn goodreads link om rating op te halen  \
https://www.goodreads.com/book/review_counts.json?key={AFvXH4mMHn2j5AaxF76Pbw}&isbns=0596009208, 0596009208  \
https://www.goodreads.com/search/index.xml?key=AFvXH4mMHn2j5AaxF76Pbw&q=9781635574043 (betere link maar xml) \
      -> google versie

Andere shortcuts die ik kan gebruiken: \
https://www.amazon.com/s?k=--ISBNNUMMER--&ref=nb_sb_noss \
https://www.google.be/search?tbm=bks&hl=en&q=--ISBNNUMMER-- \
https://www.goodreads.com/search?q=--ISBNNUMMER-- \
https://www.bookfinder.com/search/?author=&title=&lang=en&isbn=--ISBNNUMMER--&new_used=*&destination=be&currency=EUR&mode=basic&st=sr&ac=qr

--------------

Mijn social media project zal gaan over aankomende boeken die zullen gereleased worden

De een bookPost object zal volgende data bevatten: \
-Titel boek \
-Release datum boek \
-ISBN nummer boek -> Bijna sommige velden kunnen ook ingesteld worden aan de hand van dit (titel, release) \
-Owned \
-Comments op boek \
-imageLink (indien het niet lukt via google) \
--comments -> commentNr -> schrijver \
--comments -> commentNr -> comment tekst \
--comments -> commentNr -> rating (optioneel) \
--comments -> commentNr -> upvotes \
--comments -> commentNr -> downvotes

Normaal zou ik dingen zoals imageLink kunnen doen aan de hand van de isbn maar ik heb nog geen manier gevonden om meerdere searches te doen met de goodreads api en ik mag maar 1 request per second sturen.
Via google kan dit wel maar goodreads wordt meer gebruikt door lezers, misschien zal ik voor de ratings de goodreads api gebruiken en voor overige info google.

Ik ben nog aan het kijken of ik extra data nodig zou hebben maar voor vorlopig lijkt dit genoeg. Aan de hand van het isbn nummer kan ik veel data ophalen van externe sites zoals goodreads. Ik zou aan de hand van dit ook links opmaken.

--------------

/ASIGNMENT

//WHATTODO
➔Zie rode draad, eerste 5 weken➔Elke week 'indienen' \
    ◆Elke week evaluatie => deeltje van de punten \
➔Deadline telkens tegen start volgende theorieles \
➔Via Github, aanmaken via: https://classroom.github.com/a/HsSp3EsB➔Per week een aparte branch \
    ◆week01 \
    ◆week02 \
    ◆...  \
    ◆exacte naamgeving aub (kleine letters) \
➔hulp/consult via issues

//WHATITIS \
➔Denk aan posts, feed, likes, up/down-vote, comments, re-post, share, threads, profiles, following, collections... \
➔Niet de bedoeling om de wereld te veroveren \
    ◆Vooral om jouw dev4-skills op te krikken \
➔Focus op 'data' \
    ◆Dus geen ar/instagram filters, image bewerking... \
➔Development opdracht \
    ◆Maar maak dat het er Devine-worthy uit ziet


//WEEK1 \
➔Maak jouw belangrijkste model & datastore \
    ◆1 Domeinobject + 1 Datastore is voldoende \
➔Voorzie tests hiervoor \
➔Concept uitleggen in readme.md


//WEEK2
➔Combineer jouw Model + Store met een React frontend \
➔Uiteraard met MobX \
➔Mag nog allemaal in 1 component \
➔Aanmaken/updaten...

//WEEK3
➔Splits jouw app op in verschillende components \
➔PropTypes voorzien \
➔Store doorgeven via props \
➔Store opsplitsen in DataStore & UiStore

//WEEK4
➔ Implementeer React Router
    ◆ Minstens
        ● Switch
        ● list / add / detail (dus: via parameters)
➔ Maak gebruik van css modules
    ◆ Elk component zijn eigen stylesheet
➔ Store(s) via context

//WEEK5
➔Afwerken
    ◆Geen onnodige components/functies/variabelen meer
    ◆Correcte naamgeving: 'message' is eigenlijk een post...
➔Meer dan 1 datamodel
    ◆Relaties
➔Alle datamodels & stores getest
    ◆> 90% coverage
    ◆Plaats de extra jest config in de package.json
➔Routes in een apart ROUTES object
➔Correct seeden (indien nodig)
    ◆En alleen de seed gebruiken op de correcte plaats
➔Go for it!


TODO:
Have some fun adding features
Testing