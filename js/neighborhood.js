// neighborhood.js
// Leon Tabak
// 01 February 2016

/**
    @member {Object} m is reference to the model.
*/
var m;

/**
    @member {Object} vm is a reference to the view model.
*/
var vm;

/**
    The initial range of years is 1846 to 2228.

    @member {number} YEAR_OF_IOWA_STATEHOOD is the lower bound.
*/
var YEAR_OF_IOWA_STATEHOOD = 1846;

/**
    The initial range of years is 1846 to 2228.

    @member {number} YEAR_OF_CAPT_KIRKS_BIRTH is the upper bound.
*/
var YEAR_OF_CAPT_KIRKS_BIRTH = 2228;

/**
    The program hides controls after users select
    a person/location on a device with a small screen.

    @member {number} WIDTH_OF_SMALL_SCREEN is the threshold for this action.
*/
var WIDTH_OF_SMALL_SCREEN = 800;

/**
    This application requires communication with both the
    Google Maps server and the Wikipedia server. If either
    or both of these servers fails to respond to the application's
    effort to connect, the application will publish a notice, but
    will publish the advice (e.g., "check your network connection") that
    is common to both sources of error just once.

    @member {boolean} serverErrorHasBeenReported prevents the application from publishing a message twice.
*/
var serverErrorHasBeenReported = false;

/**
    This function publishes a notice when the
    application's efforts to communicate with
    a server are unsuccessful.

    @function reportServerIsNotResponding
    @author Leon Tabak [<l.tabak@ieee.org>]
    @version 01 February 2016
*/
var reportServerIsNotResponding = function() {

    var markup = "<div class='serverError'>";
    markup += "<p>";
    markup += "This application requires communication with";
    markup += "the Google Maps server and the Wikipedia server.";
    markup += "</p>";
    markup += "<p class='mapsError'>The Google Maps server is not responding.</p>";
    markup += "<p class='wikiError'>The Wikipedia server is not responding.</p>";
    markup += "<p>Check your network connection.</p>";
    markup += "</div>";

    $("body").html(markup);
}; // reportServerIsNotResponding()

/**
    This function publishes a notice that
    the application is unable to communicate
    with the Google Map server.

    @function reportGoogleMapsIsNotResponding
    @author Leon Tabak [<l.tabak@ieee.org>]
    @version 01 February 2016
*/
var reportGoogleMapsIsNotResponding = function() {
    if( !serverErrorHasBeenReported ) {
        reportServerIsNotResponding();
        serverErrorHasBeenReported = true;
    } // if

    $(".mapsError").css( "display", "block" );
}; // reportGoogleMapsIsNotResponding()

/**
    This function publishes a notice that
    the application is unable to communicate
    with the Wikipedia server.

    @function reportWikipediaIsNotResponding
    @author Leon Tabak [<l.tabak@ieee.org>]
    @version 01 February 2016
*/
var reportWikipediaIsNotResponding = function() {
    if( !serverErrorHasBeenReported ) {
        reportServerIsNotResponding();
        serverErrorHasBeenReported = true;
    } // if

    $(".wikiError").css( "display", "block" );
}; // reportWikipediaIsNotResponding()


/**
    Define a function that will create an object
    that describes Iowans who have contributed to
    the development of science and technology.

    @public
    @function model
    @author Leon Tabak [<l.tabak@ieee.org>]
    @version 01 February 2016
    @property {Object} that is the object that this function returns to its caller.
    @property {Array} that.exemplars contains descriptions of people.
    @property {String} that.exemplars.name identifies a person.
    @property {String} that.exemplars.name.firstName.
    @property {String} that.exemplars.name.middleName.
    @property {String} that.exemplars.name.lastName.
    @property {number} that.exemplars.latitude place of birth.
    @property {number} that.exemplars.longitude place of birth.
    @property {String} that.exemplars.city where person was born.
    @property {String} that.exemplars.state where person was born.
    @property {Array} that.exemplars.careerFacts where person studied, worked, and so on..
    @property {google.maps.Marker} that.exemplars.marker a pin on a map.
    @property {Function} that.exemplars.markerResponder what to do when clicked.
    @return {Object}
*/
var model = function() {
    // Define the object that this function will
    // return to its caller.
    // The object is empty initially, This function
    // will add a property to the object later.
    var that = {};

    // Define an array of objects, each of which describes a
    // person together with that person's date of birth and
    // place of birth.
    var exemplars = [];

    // Define a function that will create an object
    // that describes a person (first, middle, and last name).
    var makeName = function( firstName, middleName, lastName ) {
        var result = {};

        result.firstName = firstName;
        result.middleName = middleName;
        result.lastName = lastName;

        return result;
    }; // makeName()

    // Define a function that will create an object
    // that describes a person together with that person's
    // date of birth and place of birth.
    var makeExemplar = function( firstName, middleName, lastName,
            latitude, longitude,
            city, state,
            birthday ) {

        var result = {};

        result.name = makeName( firstName, middleName, lastName );
        result.latitude = latitude;
        result.longitude = longitude;
        result.city = city;
        result.state = state;
        result.birthday = birthday;
        result.careerFacts = [];
        result.marker = null;
        result.markerResponder = null;

        return result;
    }; // makeExemplar()

    // Create the objects and store them in the array.
    exemplars.push( makeExemplar(
                        "Marc", "", "Andreessen",
                        42.534, -92.445,
                        "Cedar Falls", "Iowa",
                        moment( {year: 1971, month: 6, day: 9} ) ));

    exemplars.push( makeExemplar(
                        "Leo", "", "Beranek",
                        41.807, -91.494,
                        "Solon", "Iowa",
                        moment( {year: 1914, month: 8, day: 15} ) ));

    exemplars.push( makeExemplar(
                        "Clifford", "", "Berry",
                        42.187, -92.715,
                        "Gladbrook", "Iowa",
                        moment( {year: 1918, month: 3, day: 19} ) ));

    exemplars.push( makeExemplar(
                        "Norman", "", "Borlaug",
                        43.381, -92.114,
                        "Cresco", "Iowa",
                        moment( {year: 1914, month: 2, day: 25} ) ));

    exemplars.push( makeExemplar(
                        "Donald", "L.", "Campbell",
                        41.844, -90.188,
                        "Clinton", "Iowa",
                        moment( {year: 1904, month: 7, day: 5} ) ));

    exemplars.push( makeExemplar(
                        "Wallace", "", "Carothers",
                        40.808, -91.115,
                        "Burlington", "Iowa",
                        moment( {year: 1896, month: 3, day: 27} ) ));

    exemplars.push( makeExemplar(
                        "Herbert", "",  "Hoover",
                        41.671, -91.346,
                        "West Branch", "Iowa",
                        moment( {year: 1874, month: 7, day: 10} ) ));

    exemplars.push( makeExemplar(
                        "James", "Tiberius", "Kirk",
                        41.479, -91.581,
                        "Riverside", "Iowa",
                        moment( {year: YEAR_OF_CAPT_KIRKS_BIRTH, month: 2, day: 28} ) ));

    exemplars.push( makeExemplar(
                        "Robert", "", "Noyce",
                        40.808, -91.115,
                        "Burlington", "Iowa",
                        moment( {year: 1927, month: 11, day: 12} ) ));

    exemplars.push( makeExemplar(
                        "James", "", "Van Allen",
                        40.971, -91.548,
                        "Mount Pleasant", "Iowa",
                        moment( {year: 1914, month: 8, day: 7} ) ));

    exemplars.push( makeExemplar(
                        "Oswald", "", "Veblen",
                        43.303, -91.785,
                        "Decorah", "Iowa",
                        moment( {year: 1880, month: 5, day: 24} ) ));

    that.exemplars = exemplars;

    return that;
}; // model()

/**
    Define a function that completes the construction
    of the database by gathering information from
    Wikipedia, builds a map, and returns methods for
    accessing the database and map.

    @author Leon Tabak l.tabak@ieee.org
    @version 01 February 2016
    @param {Object} model contains names, dates and places of birth (viewModel adds careerFacts and markers later).
    @property {Object} that is the object that this function returns to its caller.
    @property {google.maps.Map} that.neighborhoodMap is a road map.
    @property {google.maps.InfoWindow} that.infoWindow contains a name, birthday, and careerFacts.
    @property {Object} that.ee is an &ldquo;exemplar explorer&rdquo; (my name for this bunch of functions).
    @property {Function} that.ee.getNumberOfExemplars() returns a number.
    @property {Function} that.ee.getFirstName(index) returns a string.
    @property {Function} that.ee.getMiddlename(index) returns a string.
    @property {Function} that.ee.getLastName(index) returns a string.
    @property {Function} that.ee.getFullName(index) returns a string.
    @property {Function} that.ee.getCity(index) returns a string.
    @property {Function} that.ee.getState(index) returns a string.
    @property {Function} that.ee.getCityState(index) returns a formatted string.
    @property {Function} that.ee.getLatitude(index) returns a number.
    @property {Function} that.ee.getLongitude(index) returns a number.
    @property {Function} that.ee.isInRange(index,startDate,endDate) returns a boolean.
    @property {Function} that.ee.getExtremaAndMeans() returns an object.
    @property {Function} that.ee.getBirthday(index) returns a moment.
    @property {Function} that.ee.getBirthdayString(index) returns a formatted date.
    @property {Function} that.ee.getCareerFacts(index) returns an array.
    @property {Function} that.ee.getCareerFactsString(index) returns HTML.
    @property {Function} that.ee.getLabel(index) returns a string.
    @property {Function} that.ee.getInfo(index) returns HTML.
    @property {Function} that.ee.getMarker(index) returns a marker.
    @property {Function} that.ee.getMarkerResponder(index) returns a function.
    @property {Function} that.ee.addCareerFact(index,school) returns void.
    @property {Function} that.ee.setMarker(index,marker) returns void.
    @property {Function} that.ee.setMarkerResponder(index,markerResponder) returns void.
    @return {Object}
*/
var viewModel = function( model ) {
    // Define the object that this function will
    // return to its caller.
    // The object is empty initially, This function
    // will add a property to the object later.
    var that = {};

    that.googleMapsIsResponding = true;

    // Define a set of functions for reading and
    // setting values in the model (our database
    // of names, dates of birth, places of birth,
    // and careerFacts attended).
    var exemplarExplorer = function( model ) {
        var exemplars = model.exemplars;

        // Define the object that this function will
        // return to its caller.
        // The object is empty initially, This function
        // will add properties to the object later.
        var that = {};

        that.getNumberOfExemplars = function() {
            return exemplars.length;
        }; // getNumberOfExemplars()

        // For this method and the methods that
        // follow, 'index' is an integer that
        // identifies one of our illustrious Iowans.
        that.getFirstName = function( index ) {
            return exemplars[index].name.firstName;
        }; // getFirstName()

        that.getMiddleName = function( index ) {
            return exemplars[index].name.middleName;
        }; // getMiddleName()

        that.getLastName = function( index ) {
            return exemplars[index].name.lastName;
        }; // getLastName()

        // Construct a piece of the formatted
        // text that will appear in the information
        // window on the marker on the map at the
        // location of a person's birth.
        that.getFullName = function( index ) {
            return that.getFirstName(index) + " " +
                   that.getMiddleName(index) + " " +
                   that.getLastName(index);
        }; // getFullName()

        that.getCity = function( index ) {
            return exemplars[index].city;
        }; // getCity()

        that.getState = function( index ) {
            return exemplars[index].state;
        }; // getState()

        // Construct a piece of the formatted
        // text that will appear in the information
        // window on the marker on the map at the
        // location of a person's birth.
        that.getCityState = function( index ) {
            return that.getCity(index) + ", " + that.getState(index);
        }; // getCityState()

        that.getLatitude = function( index ) {
            return exemplars[index].latitude;
        }; // getLatitude()

        that.getLongitude = function( index ) {
            return exemplars[index].longitude;
        }; // getLongitude()

        // true or false: was a particular person born
        // between two given dates?
        that.isInRange = function( index, startDate, endDate ) {
            var dob = exemplars[index].birthday;
            return startDate.isSameOrBefore(dob) && dob.isSameOrBefore(endDate);
        }; // isInRange()


        // Define a method that computes the bounds and center of
        // of region that contains all of the places that are
        // described in the model.
        // (Count only places of birth of persons born between
        // the two given dates).
        that.getExtremaAndMeans = function( startDate, endDate ) {
            var result = {};

            // Find extrema and means of latitude and longitude.
            var meanLatitude = 0.0;
            var meanLongitude = 0.0;
            var minimumLatitude = +90.0;
            var maximumLatitude = -90.0;
            var minimumLongitude = +180.0;
            var maximumLongitude = -180.0;

            var numberInRange = 0;
            var numberOfExemplars = that.getNumberOfExemplars();
            for( var i = 0; i < numberOfExemplars; i++ ) {
                if( that.isInRange( i, startDate, endDate ) ) {
                    numberInRange = numberInRange + 1;
                    var latitude = that.getLatitude(i);
                    var longitude = that.getLongitude(i);

                    meanLatitude += latitude;
                    meanLongitude += longitude;

                    if( latitude < minimumLatitude ) {
                        minimumLatitude = latitude;
                    } // if
                    if( latitude > maximumLatitude ) {
                        maximumLatitude = latitude;
                    } // if

                    if( longitude < minimumLongitude ) {
                        minimumLongitude = longitude;
                    } // if
                    if( longitude > maximumLongitude ) {
                        maximumLongitude = longitude;
                    } // if
                } // if
            } // for

            if( numberInRange > 0 ) {
                meanLatitude = meanLatitude / numberInRange;
                meanLongitude = meanLongitude / numberInRange;
            } // if
            else {
                // Define the center and bounds of
                // eastern Iowa.
                // (This is the default value in case
                // no persons were found who were born
                // between the given dates).
                meanLatitude = +42.0;
                meanLongitude = -92.0;
                minimumLatitude = +40.0;
                maximumLatitude = +44.0;
                minimumLongitude = -94.0;
                maximumLongitude = -90.0;
            } // else

            // Construct object that this function
            // returns to its caller.
            result.meanLatitude = meanLatitude;
            result.meanLongitude = meanLongitude;

            result.minimumLatitude = minimumLatitude;
            result.maximumLatitude = maximumLatitude;
            result.minimumLongitude = minimumLongitude;
            result.maximumLongitude = maximumLongitude;

            return result;
        }; // getExtremaAndMeans()

        that.getBirthday = function( index ) {
            return exemplars[index].birthday;
        }; // getBirthday()

        // Construct a piece of the formatted
        // text that will appear in the information
        // window on the marker on the map at the
        // location of a person's birth.
        that.getBirthdayString = function( index ) {
            return that.getBirthday(index).format( "MMM DD, YYYY" );
        }; // getBirthdayString()

        that.getCareerFacts = function( index ) {
            return exemplars[index].careerFacts;
        }; // getCareerFacts()

        // Construct a piece of the formatted
        // text that will appear in the information
        // window on the marker on the map at the
        // location of a person's birth.
        that.getCareerFactsString = function( index ) {
            var listOfCareerFacts = that.getCareerFacts(index);
            var lengthOfList = listOfCareerFacts.length;

            if( lengthOfList === 0 ) {
                return "No career facts found.";
            } // if
            else {
                var result = "";
                for( var i = 0; i < lengthOfList; i++ ) {
                    result += listOfCareerFacts[i] + "<br>";
                } // for
                return result;
            } // else
        }; // getCareerFactsString()

        that.getMarker = function( index ) {
            return exemplars[index].marker;
        }; // getMarker()

        // Return the function that will be called
        // when a user clicks on a marker on the map.
        that.getMarkerResponder = function(index) {
            return exemplars[index].markerResponder;
        }; // getMarkerResponder()

        // Return the name that will appear on a button.
        that.getLabel = function( index ) {
            return that.getLastName(index).toUpperCase();
        }; // getLabel()

        // Return the text that will appear in an
        // information window (on a marker, at the
        // place of a person's birth).
        that.getInfo = function( index ) {
            var result = "";
            result += that.getFullName(index) + "<br>";

            var verbPhrase = "was born on ";
            if( moment().isBefore( that.getBirthday(index) ) ) {
                verbPhrase = "will be born on ";
            } // if

            result += verbPhrase + that.getBirthdayString(index) +
                      " in " + that.getCityState(index) + ".<br>";
            result += that.getCareerFactsString(index);
            return result;
        }; // getInfo()

        that.addCareerFact = function( index, school ) {
            exemplars[index].careerFacts.push( school );
        }; // addCareerFact()

        that.setMarker = function( index, marker ) {
            exemplars[index].marker = marker;
        }; // setMarker()

        that.setMarkerResponder = function( index, markerResponder ) {
            exemplars[index].markerResponder = markerResponder;
        }; // setMarkerResponder()

        return that;
    }; // exemplarExplorer()


    // Program tries to read from Wikipedia more
    // than once. If one attempt fails, the program
    // will publish a warning. There will be just one
    // warning (not many identical warning).
    that.wikipediaDidNotRespond = false;
    var countNoResponses = 0;

    // Define a function that will attempt to find on Wikipedia the names
    // of the colleges and universities that a person attended and append
    // that data to the text in the information windows that is linked to
    // the marker on the map at the place of that person's birth.
    var lookUpCareerFacts = function( index, ee ) {

        var parseHelper = function( wikiText, keyword ) {
            // I will use a regular expression to find that
            // part of the record that contains a list of items
            // in a category named by the keyword.
            // For example, if the keyword is "alma_mater",
            // this function will add to a person's record
            // a list of schools at which the person studied.

            var uptoPipe = "([^\\|]*)\\|";
            var re = new RegExp( keyword + uptoPipe );
            var category = re.exec( wikiText );
            if( (category !== null) &&
                (Object.prototype.toString.call( category) === '[object Array]') &&
                (category.length > 0) ) {
                category = category[1];
            } // if
            else {
                category = "";
            } // else

            // Find names of career factss enclosed in paired
            // square brackets. For example, [[Worcester Polytechnic Institute]].
            // Concatenate the career facts, placing an HTML <br> tag
            // before each fact.
            re = /\[\[[a-zA-Z ]*\]\]/g;
            var careerFacts = re.exec( category );
            while( careerFacts !== null ) {
               var oneFact = careerFacts[0];

               // get rid of enclosing brackets
               oneFact = oneFact.replace( "[[", "" );
               oneFact = oneFact.replace( "]]", "" );

               ee.addCareerFact( index, oneFact );
               careerFacts = re.exec( category );
            } // while
        }; // parseHelper()

        var parse = function( wikiResponse ) {
            var wikiText = JSON.stringify( wikiResponse.query.pages );

            // Find all of the text that lies between the
            // word a keyword, (e.g., "alma_mater") and "|".
            parseHelper( wikiText, "alma_mater" );
            parseHelper( wikiText, "known_for" );
            parseHelper( wikiText, "field" );
            parseHelper( wikiText, "work" );
            parseHelper( wikiText, "award" );
        }; // parse()

        // Program tries to read from Wikipedia more
        // than once. If one attempt fails, the program
        // will publish a warning. There will be just one
        // warning (not many identical warning).
        var reportNoResponseFromWiki = function() {
            if( !that.wikipediaDidNotRespond ) {
                countNoResponses++;
                that.wikipediaDidNotRespond = true;
                reportWikipediaIsNotResponding();
            } // if
            else {
                countNoResponses++;
            } // else
        };

        // Schedule a warning message for the future in case
        // Wikipedia does not respond.
        // (Program will cancel this scheduled message if
        // Wikipedia does respond within the allotted time).
        var alarmClock = setTimeout( reportNoResponseFromWiki, 2000 );

        // Specify the kind of access to the on-line service and
        // the function that will do something with the data that
        // is received.
        var ajaxSettings = {
            dataType: "jsonp",
            crossDomain: true
        }; // ajaxSettings

        var firstName = ee.getFirstName(index);
        var middleName = ee.getMiddleName(index);
        var lastName = ee.getLastName(index);

        // Construct a URL that contains a query.
        // This query searches for a page about a person
        // that it identifies by first and last name.
        var wikipediaURL = "http://en.wikipedia.org/w/api.php?action=query&format=json" +
          "&prop=revisions&rvprop=content&titles=" +
           firstName + "%20" + middleName + "%20" + lastName;

        // Use a JQuery function to read data from an on-line service.
        var successFunction = function(response) {clearTimeout(alarmClock); parse(response);};
        $.ajax( wikipediaURL, ajaxSettings ).done( successFunction );
    }; // lookUpCareerFacts()

    // Build the database.
    that.ee = exemplarExplorer( model );
    var n = that.ee.getNumberOfExemplars();
    for( var i = 0; i < n; i++ ) {
        // Go to Wikipedia to find school(s) that person #i attended.
        lookUpCareerFacts( i, that.ee );
    } // for

    // Specify what should be done when user selects a person
    // by clicking on a marker.
    // This method is also called when a user clicks on a name button.
    var markerResponderMaker = function( index, marker ) {
        var i = index;
        var m = marker;
        var windowOpen = false;

        return function() {

            if( windowOpen ) {
                that.infoWindow.close();
                windowOpen = false;
            } // if

            if( m.getAnimation() !== null ) {
                // stop animation
                m.setAnimation( null );
            } // if
            else {
                // start animation and open window
                m.setAnimation( google.maps.Animation.BOUNCE );
                setTimeout( function() { m.setAnimation( null ); }, 2000 );
                that.infoWindow.setContent( that.ee.getInfo( i ) );

                // just to be sure, make sure that info window
                // is closed before trying to open it.
                // maybe consecutive calls to open() without
                // an intervening call to close() was causing
                // the problem that the reviewer was seeing?
                that.infoWindow.close();

                that.infoWindow.open( that.neighborhoodMap, m );
                windowOpen = true;
            } // else

            // recenter map to put selected marker at the center
            var lat = that.ee.getLatitude(i);
            var lng  = that.ee.getLongitude(i);
            vm.neighborhoodMap.setCenter( {lat: lat, lng: lng} );
            // scroll to put marker near the middle of the window
            $(window).scrollTo( "40%" );
        }; // function()
    }; // markerResponderMaker()

    // Create the markers and methods that will respond
    // to clicks on markers.
    // Store references to these in the model (our database).
    var decorateMap = function() {
        var numberOfExemplars = that.ee.getNumberOfExemplars();
        for( var i = 0; i < numberOfExemplars; i++ ) {
            var latitude = that.ee.getLatitude(i);
            var longitude = that.ee.getLongitude(i);
            var name = that.ee.getFullName(i);

            var marker = new google.maps.Marker({
                    map: that.neighborhoodMap,
                    position: {lat: latitude, lng: longitude },
                    title: name,
                    id: i
                });
            var markerResponder = markerResponderMaker(i,marker);
            marker.addListener( 'click', markerResponder );
            marker.setAnimation( null );
            that.ee.setMarker(i, marker);
            that.ee.setMarkerResponder( i, markerResponder );
        } // for
    }; // decorateMap()

    that.mapInitializer = function() {
        if( typeof google === "undefined" ) {
            // No response from Google Maps.
            that.googleMapsIsResponding = false;
        } // if
        else {
            // Find the mean latitude of all places of birth.
            // Find the mean longitude of all places of birth.
            // Center the map at the mean latitude and longitude.
            var startDate = moment({ year: YEAR_OF_IOWA_STATEHOOD, month: 0, day: 1});
            var endDate = moment({ year: YEAR_OF_CAPT_KIRKS_BIRTH, month: 11, day: 31});
            var em = that.ee.getExtremaAndMeans( startDate, endDate );
            var swLatitude = em.minimumLatitude;
            var swLongitude = em.minimumLongitude;
            var neLatitude = em.maximumLatitude;
            var neLongitude = em.maximumLongitude;

            // Specify how much extra room to leave around
            // the places of birth.
            var margin = 0.1;
            var lat = ((swLatitude - margin) + (neLatitude + margin))/2;
            var lng = ((swLongitude - margin) + (neLongitude + margin))/2;
            var mapSpecification = {
                center:new google.maps.LatLng(lat, lng),
                zoom: 8,
                draggable: false,
                scrollwheel: false,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            }; // mapSpecification

            // Create the map.
            that.neighborhoodMap=new google.maps.Map(document.getElementsByClassName("bigMap")[0],mapSpecification);
            that.infoWindow = new google.maps.InfoWindow( {content: "Placeholder Value"} );
            decorateMap();
        } // else
    }; // mapInitializer()

    return that;
}; // viewModel()

/**
    Define knockout observables (these are functions that connect
    text seen on the screen with variables in the code).

    @author Leon Tabak <l.tabak@ieee.org>
    @version 01 February 2016
    @param {Object} vm is the collection of methods for accessing the database and map
    @property {Function} this.show buttons and search bar visible?
    @property {Function} this.hideShowLabel label (HIDE or SHOW) on button
    @property {Function} this.loBound lower bound on range of years
    @property {Function} this.hiBound upper bound on range of years
    @property {Function} this.toggleVisibility how to respond to click on HIDE/SHOW button
    @property {Function} this.exemplars array of records of people
    @property {Function} this.warn show warning message?
    @property {Function} this.warning this is the message to show
    @property {Function} this.changeRange what to do in response to changed range
    @property {Function} this.matchPrefix what to do in response to typed entry
*/
var koModel = function( vm ) {
    var self = this;
    self.show = ko.observable(true);
    self.hideShowLabel = ko.pureComputed(function() {
        if( self.show() ) {
            return "HIDE CONTROLS";
        } // if
        else {
            return "SHOW CONTROLS";
        } // else
        }); // hideShowLabel()


    // loBound and hiBound define a range of years.
    // Initial values set to define a period that
    // includes the dates of birth of all persons
    // in the model.
    self.loBound = ko.observable(YEAR_OF_IOWA_STATEHOOD);
    self.hiBound = ko.observable(YEAR_OF_CAPT_KIRKS_BIRTH);

    self.surname = ko.observable("");

    // make search box and array of name buttons
    // visibile or invisible (hide or show).
    self.toggleVisibility = function() {
        if( self.show() === false ) {
            self.show(true);
        } // if
        else {
            self.show(false);
        } // else
    }; // toggleVisility()


    var buttonResponderMaker = function( index ) {
        var i = index;

        return function() {
            vm.ee.getMarkerResponder(i)();

            // hide controls to make more of
            // the map visible on small devices.
            // (here small means a screen with
            // a width of less than WIDTH_OF_SMALL_SCREEN pixels.)
            if( screen.width < WIDTH_OF_SMALL_SCREEN ) {
                self.show(false);
            } // if
        };
    }; // buttonResponderMaker()

    var recenterMap = function( startDate, endDate ) {
        // Draw a region that is a little larger than the
        // smallest region that encloses all of the places
        // of birth of all of the people born during the
        // specified range of years.

        var em = vm.ee.getExtremaAndMeans( startDate, endDate );
        // Find the mean latitude of all places of birth.
        // Find the mean longitude of all places of birth.
        // Center the map at the mean latitude and longitude.
        var swLatitude = em.minimumLatitude;
        var swLongitude = em.minimumLongitude;
        var neLatitude = em.maximumLatitude;
        var neLongitude = em.maximumLongitude;
        var lat = (swLatitude + neLatitude)/2;
        var lng = (swLongitude + neLongitude)/2;

        vm.neighborhoodMap.setCenter( {lat: lat, lng: lng} );

        // make map cover a region that is
        // a little larger than the region
        // that includes just the selected
        // persons
        var margin = 0.25;
        var bounds = new google.maps.LatLngBounds();
        var swLat = swLatitude - margin;
        var swLng = swLongitude - margin;
        var swCorner = new google.maps.LatLng( swLat, swLng );
        bounds.extend( swCorner );
        var neLat = neLatitude + margin;
        var neLng = neLongitude + margin;
        var neCorner = new google.maps.LatLng( neLat, neLng );
        bounds.extend( neCorner );
        vm.neighborhoodMap.fitBounds( bounds );
    }; // recenterMap()

    // Define a function that will help create
    // buttons that show names of illustrious Iowans.
    self.exemplars = ko.observableArray();
    var numberOfExemplars = vm.ee.getNumberOfExemplars();
    for( var i = 0; i < numberOfExemplars; i++ ) {
        var oneExemplar = {};
        oneExemplar.index = i;
        oneExemplar.label = vm.ee.getLabel(i);
        oneExemplar.visible = ko.observable(true);
        oneExemplar.buttonResponder = buttonResponderMaker(i);
        self.exemplars.push( oneExemplar );
    } // for

    // Define functions that validate inputs.
    self.warn = ko.observable(false);
    self.warning = ko.observable("Valid input.");

    self.changeRange = function() {
        // Clear name field.
        // We are searching by dates now, not by name.
        self.surname( "" );

        var ly = self.loBound();
        var hy = self.hiBound();

        var isFourDigitPositiveInteger = function( n ) {
            return /^[1-9]\d\d\d$/.test( n );
        }; // isFourDigitPositiveInteger()

        var warningMessage = "";

        self.warn(false);

        if( !isFourDigitPositiveInteger(ly) ) {
            warningMessage += "The first year must be a four digit positive integer.\n";
            self.warn(true);
        } // if

        if( !isFourDigitPositiveInteger(hy) ) {
            warningMessage += "The second year must be a four digit positive integer.\n";
            self.warn(true);
        } // if

        if( ly > hy ) {
            warningMessage += "The first year must be less than or equal to the second year.";
            self.warn(true);
        } // if

        self.warning(warningMessage);

        var startDate = moment({ year: ly, month: 0, day: 1});
        var endDate = moment({ year: hy, month: 11, day: 31});
        var numberOfExemplars = vm.ee.getNumberOfExemplars();
        for( var i = 0; i < numberOfExemplars; i++ ) {
            if( vm.ee.isInRange(i, startDate, endDate ) ) {
                self.exemplars()[i].visible(true);
                vm.ee.getMarker(i).setMap( vm.neighborhoodMap );
            } // if
            else {
                self.exemplars()[i].visible(false);
                vm.ee.getMarker(i).setMap( null );
            } // else
        } // for

        recenterMap( startDate, endDate );
    }; // changeRange()

    var previousPrefixLength = 0;
    self.matchPrefix = function() {
        self.surname( self.surname().toUpperCase() );

        var minimumYear; // initially undefined
        var maximumYear; // initially undefined

        var minimumLat; // initially undefined
        var maximumLat; // initially undefined
        var minimumLng; // initially undefined
        var maximumLng; // initially undefined

        var indicesOfMatches = [];
        var numberOfExemplars = vm.ee.getNumberOfExemplars();
        for( var i = 0; i < numberOfExemplars; i++ ) {
            var upperCaseLastName = vm.ee.getLabel(i);
            if( upperCaseLastName.indexOf( self.surname() ) === 0 ) {
                indicesOfMatches.push(i);

                // show markers and name buttons with matching prefixes
                self.exemplars()[i].visible(true);
                vm.ee.getMarker(i).setMap( vm.neighborhoodMap );

                // between which two years were the people whose
                // names begin with these letters born?
                var yearOfBirth = vm.ee.getBirthday(i).year();
                if( (typeof minimumYear === "undefined") ||
                    (yearOfBirth < minimumYear) ) {
                    minimumYear = yearOfBirth;
                } // if
                if( (typeof maximumYear === "undefined") ||
                    (yearOfBirth > maximumYear) ) {
                    maximumYear = yearOfBirth;
                } // if

                // where were people whose names begin
                // with these letters born?
                // (min, max of latitude, longitude define a region)
                var latitude = vm.ee.getLatitude(i);
                if( (typeof minimumLat === "undefined") ||
                    (latitude <= minimumLat) ) {
                    minimumLat = latitude;
                } // if
                if( (typeof maximumLat === "undefined") ||
                    (latitude >= maximumLat) ) {
                    maximumLat = latitude;
                } // if

                var longitude = vm.ee.getLongitude(i);
                if( (typeof minimumLng === "undefined") ||
                    (longitude <= minimumLng) ) {
                    minimumLng = longitude;
                } // if
                if( (typeof maximumLng === "undefined") ||
                    (longitude >= maximumLng) ) {
                    maximumLng = longitude;
                } // if

            } // if
            else {
                // hide markers and name buttons with non-matching prefixes
                self.exemplars()[i].visible(false);
                vm.ee.getMarker(i).setMap( null );
            } // else
        } // for

        // Inform user if prefix that user has entered
        // does not match any name in the database.
        if( indicesOfMatches.length === 0 ) {
            self.warn(true);
            self.warning( "No names begin with the letters " + self.surname() );
        } // if
        else {
            // This warning should not be displayed.
            // "Valid input" is just a placeholder value.
            self.warning( "Valid input." );
            self.warn(false);
        } // else

        // display the years between which people with these
        // names were born
        // (if prefix length > 0 and this function found such people)
        if( (typeof minimumYear !== "undefined") &&
            (typeof maximumYear !== "undefined") &&
            (self.surname().length > 0) ) {
            self.loBound( minimumYear );
            self.hiBound( maximumYear );
        } // if
        else {
            self.loBound(YEAR_OF_IOWA_STATEHOOD);
            self.hiBound(YEAR_OF_CAPT_KIRKS_BIRTH);
        } // else

        // recenter map over selected locations
        if( (typeof minimumLat !== "undefined") &&
            (typeof maximumLat !== "undefined") &&
            (typeof minimumLng !== "undefined") &&
            (typeof maximumLng !== "undefined") ) {

            var lat = (minimumLat + maximumLat)/2;
            var lng = (minimumLng + maximumLng)/2;

            vm.neighborhoodMap.setCenter( {lat: lat, lng: lng} );

            // make map cover a region that is
            // a little larger than the region
            // that includes just the selected
            // persons
            var margin = 0.25;
            var bounds = new google.maps.LatLngBounds();
            var swLat = minimumLat - margin;
            var swLng = minimumLng - margin;
            var swCorner = new google.maps.LatLng( swLat, swLng );
            bounds.extend( swCorner );
            var neLat = maximumLat + margin;
            var neLng = maximumLng + margin;
            var neCorner = new google.maps.LatLng( neLat, neLng );
            bounds.extend( neCorner );
            vm.neighborhoodMap.fitBounds( bounds );
        } // if

        // If the prefix matches only one name, complete
        // the spelling.
        // Make sure that this prefix is longer than the
        // previous prefix before completing the name.
        // This part of the check gives a user the option
        // of using the delete key to back up and try a
        // different spelling.
        var currentPrefixLength = self.surname().length;

        if( (indicesOfMatches.length === 1) && (currentPrefixLength > previousPrefixLength) ) {
            // only found one match, so it is first (and only) entry in array
            var index = indicesOfMatches[0];

            // complete the spelling of the name
            self.surname( vm.ee.getLabel(index) );

            // remember how long this name so that
            // user can backspace (delete characters)
            // and enter a different name
            currentPrefixLength = self.surname().length;

            // do whatever we are supposed to do when
            // single person/location is selection
            // (the definition of the marker responder
            // contains the sequence of actions)
            vm.ee.getMarkerResponder(index)();

            // if user has a small device, hide the
            // controls so that user can see more of
            // the map
            if( screen.width < WIDTH_OF_SMALL_SCREEN ) {
                self.show(false);
            } // if
        } // if
        previousPrefixLength = currentPrefixLength;

    }; // matchPrefix()
}; // koModel()

/**
    Create the model and the view model and bind
    the knockout observables to the program's variables
    when the DOM (Document Object Model&mdash;the data structure
    that describes the organization of a Web page) is ready.

    @author Leon Tabak <l.tabak@ieee.org>
    @version 01 February 2016
*/
var go = function() {
    m = model();
    vm = viewModel( m );
    ko.applyBindings( koModel(vm) );
}; // go()

$(document).ready(go);
