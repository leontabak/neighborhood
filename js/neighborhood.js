// JavaScript for Project 5: Neighborhood
// Leon Tabak
// 08 January 2016

// Burlington, IA 40.808, -91.115
// Cedar Falls, IA 42.534, -92.445
// Clinton, IA 41.844, -90.188
// Cresco, IA 43.381, -92.114
// Decorah, IA 43.303, -91.785
// Gladbrook, IA 42.187, -92.715
// Mount Pleasant, IA 40.971, -91.548
// Riverside, IA 41.479, -91.581
// Solon, IA 41.807, -91.494
// West Branch, IA 41.671, -91.346

// Define a function that will create an object
// that describes Iowans who have contributed to
// the development of science and technology.
var model = function() {
    var that = {};

    // Define an array of objects, each of which describes a
    // person together with that person's date of birth and
    // place of birth.
    var places = [];

    // Define a function that will create an object
    // that describes a person (first, middle, and last name).
    var makePerson = function( firstName, middleName, lastName ) {
	var result = {};

	result.firstName = firstName;
	result.middleName = middleName;
	result.lastName = lastName;
	result.fullName = firstName + " " + middleName + " " + lastName;

	return result;
    }; // makePerson()

    // Define a function that will create an object
    // that describes a person together with that person's
    // date of birth and place of birth.
    var makePlace = function( latitude, longitude,
            firstName, middleName, lastName,
            city, state, birthday ) {

	var result = {};

	result.latitude = latitude;
	result.longitude = longitude;
	result.person = makePerson( firstName, middleName, lastName );
        result.city = city;
        result.state = state;
	result.birthday = birthday;
        //result.marker = null;

        return result;
    }; // makePlace()

    // Create the objects and store them in the array.
    places.push( makePlace( 42.534, -92.445,
			"Marc", "", "Andreessen", "Cedar Falls", "Iowa", new Date( 1971, 6, 9 ) ));
    places.push( makePlace( 41.807, -91.494,
			"Leo", "", "Beranek", "Solon", "Iowa", new Date( 1914, 8, 15 ) ));
    places.push( makePlace( 42.187, -92.715,
			    "Clifford", "", "Berry", "Gladbrook", "Iowa", new Date( 1918, 3, 19 ) ));
    places.push( makePlace( 43.381, -92.114,
		        "Norman", "", "Borlaug", "Cresco", "Iowa", new Date( 1914, 2, 25 ) ));
    places.push( makePlace( 41.844, -90.188,
			 "Donald", "", "Campbell", "Clinton", "Iowa", new Date( 1904, 7, 5 ) ));
    places.push( makePlace( 40.808, -91.115,
			"Wallace", "", "Carothers", "Burlington", "Iowa", new Date( 1896, 3, 27 ) ));
    places.push( makePlace( 41.671, -91.346,
			"Herbert", "",  "Hoover", "West Branch", "Iowa", new Date( 1874, 7, 10 ) ));
    places.push( makePlace( 41.479, -91.581,
			"James", "Tiberius", "Kirk", "Riverside", "Iowa", new Date( 2228, 2, 28 ) ));
    places.push( makePlace( 40.808, -91.115,
			"Robert", "", "Noyce", "Burlington", "Iowa", new Date( 1927, 11, 12 ) ));
    places.push( makePlace( 40.971, -91.548,
			"James", "", "Van Allen", "Mount Pleasant", "Iowa", new Date( 1914, 8, 7 ) ));
    places.push( makePlace( 43.303, -91.785,
			"Oswald", "", "Veblen", "Decorah", "Iowa", new Date( 1880, 5, 24 ) ));

    that.places = places;

    return that;
}; // model()

// Define a function that creates an object that
// contains several methods that can be used to
// access data that the model contains.
var viewModel = function( m ) {
    var that = {};

    // Define a function that compares two dates (year, month, day).
    that.compareDates = function( a, b ) {
        var aYear = a.getFullYear();
        var aMonth = a.getMonth();
        var aDate = a.getDate();

        var bYear = b.getFullYear();
        var bMonth = b.getMonth();
        var bDate = b.getDate();

        if( aYear < bYear ) {
	    return -1;
        } // if
        else if( aYear > bYear ) {
	    return +1;
        } // else if
        else {
	    if( aMonth < bMonth ) {
	        return -1;
	    } // if
	    else if( aMonth > bMonth ) {
	        return +1;
	    } // else if
	    else {
	        if( aDate < bDate ) {
		    return -1;
	        } // if
	        else if( aDate > bDate ) {
		    return +1;
	        } // else if
	        else {
		    return 0;
	        } // else
	    } // else
        } // else
    }; // compareDates()

    // Define a function that creates a string
    // that represents a date with the full name
    // of the month.
    that.dateToString = function( date ) {

        var monthName = "";
        switch( date.getUTCMonth() ) {
            case 0: monthName = "January"; break;
            case 1: monthName = "February"; break;
            case 2: monthName = "March"; break;
            case 3: monthName = "April"; break;
            case 4: monthName = "May"; break;
            case 5: monthName = "June"; break;
            case 6: monthName = "July"; break;
            case 7: monthName = "August"; break;
            case 8: monthName = "September"; break;
            case 9: monthName = "October"; break;
            case 10: monthName = "November"; break;
            case 11: monthName = "December"; break;
        } // switch

        var result = monthName + " " + date.getUTCDate() + ", " + date.getFullYear();
        return result;
    }; // dateToString()

    // Define an accessor method that returns
    // the number of place (person, date of birth, place of birth)
    // objects in the model.
    that .getNumberOfPlaces = function() {
        return m.places.length;
    };

    // Define an accessor method that returns a
    // particular place (person, date of birth, and place of birth)
    // that is in the model.
    that.getPlace = function( index ) {
        return m.places[index];
    };

    // Define a method that computes the bounds and center of
    // of region that contains all of the places that are
    // described in the model.
    that.getExtremaAndMeans = function() {
        var result = {};

        // Find extrema and means of latitude and longitude.
        var meanLatitude = m.places[0].latitude;
        var meanLongitude = m.places[0].longitude;
        var minimumLatitude = m.places[0].latitude;
        var maximumLatitude = m.places[0].latitude;
        var minimumLongitude = m.places[0].longitude;
        var maximumLongitude = m.places[0].longitude;

        for( var i = 1; i < m.places.length; i++ ) {
            meanLatitude += m.places[i].latitude;
            meanLongitude += m.places[i].longitude;

            if( m.places[i].latitude < minimumLatitude ) {
    	        minimumLatitude = m.places[i].latitude;
            } // if
            if( m.places[i].latitude > maximumLatitude ) {
    	        maximumLatitude = m.places[i].latitude;
            } // if

            if( m.places[i].longitude < minimumLongitude ) {
    	        minimumLongitude = m.places[i].longitude;
            } // if
            if( m.places[i].longitude < maximumLongitude ) {
    	        maximumLongitude = m.places[i].longitude;
            } // if
        } // for

        if( m.places.length > 0 ) {
            meanLatitude = meanLatitude / m.places.length;
            meanLongitude = meanLongitude / m.places.length;
        } // if

        result.meanLatitude = meanLatitude;
        result.meanLongitude = meanLongitude;

        result.minimumLatitude = minimumLatitude;
        result.maximumLatitude = maximumLatitude;
        result.minimumLongitude = minimumLongitude;
        result.maximumLongitude = maximumLongitude;

        return result;
    }; // getExtremaAndMeans()

    return that;
}; // viewModel()

// Define a function that will construct a map, markers,
// and information windows.
var decoratorHelper = function( vm ) {
    var that = {};

    // Place the initial (default) range of years
    // in the search bar.
    var loYear = 1846; // year that Iowa became a state
    var hiYear = 2228; // year of Captain Kirk's birth
    // or make upper bound on range this year: (new Date()).getFullYear();

    $("#loYear").attr("value", loYear);
    $("#hiYear").attr("value", hiYear );


    // Define a function that will attempt to find on Wikipedia the names
    // of the colleges and universities that a person attended and append
    // that data to the text in the information windows that is linked to
    // the marker on the map at the place of that person's birth.
    var getSchoolsAttended = function( firstName, lastName, informationWindow ) {

        var parse = function( dataStructure ) {
            var result = "";

            // Find all of the text that lies between the
            // word "alma_mater" and the character "|".
            var str = JSON.stringify( dataStructure.query.pages );
            var i = str.indexOf( "alma_mater" );
            var j = str.indexOf( "|", i + 9 );
            var almaMater = str.slice( i, j );

            // Find names of schools enclosed in paired
            // square brackets. For example, [[Worcester Polytechnic Institute]].
            // Concatenate the names of the schools, placing an HTML <br> tag
            // before each name.
            var re = /\[\[[a-zA-Z ]*\]\]/g;
            var schools = re.exec( almaMater );
            while( schools !== null ) {
               var oneSchool = schools[0];
               oneSchool = oneSchool.replace( "[[", "" );
               oneSchool = oneSchool.replace( "]]", "" );
               result = result + "<br>" + oneSchool;
               schools = re.exec( almaMater );
            } // while

            if( result === "" ) {
                result = "<br>No schools found.";
            } // if

	    informationWindow.setContent( informationWindow.getContent() + result );
        }; // parse()

        // Specify the kind of access to the on-line service and
        // the function that will do something with the data that
        // is received.
        var ajaxSettings = {
            dataType: "jsonp",
            crossDomain: true,
            success: parse
        }; // ajaxSettings

        // Construct a URL that contains a query.
        // This query searches for a page about a person
        // that it identifies by first and last name.
        var wikipediaURL = "http://en.wikipedia.org/w/api.php?action=query&format=json" +
          "&prop=revisions&rvprop=content&titles=" + firstName + "%20" + lastName;

        var ifWikipediaDoesNotRespond = function() {
            console.alert( "Wikipedia is not responding." );
            informationWindow.setContent( informationWindow.getContent() + "Wikipedia is not responding." );
        };

        // Use a JQuery function to read data from an on-line service.
        $.ajax( wikipediaURL, ajaxSettings ).fail( ifWikipediaDoesNotRespond );
    }; // getSchoolsAttended()

    // Define a function that can be used to create an information
    // window that can be attached to a marker that is placed on a map.
    var makeInformationWindow = function( place ) {
        var today = new Date();
        var birthday = place.birthday;

        // Just for fun, the model includes one (fictional)
        // person whose date of birth is in the future.
        // This makes it necessary to choose between two
        // verb phrases: "was born in" or "will be born in".
        var verb = " was born in ";

        if( vm.compareDates( birthday, today ) > 0 ) {
            verb = " will be born in ";
        } // if

        // The information window will contain the person's name,
        // the city and state in which the person was born, and
        // the date of the person's birth.
        var content = place.person.fullName + verb + place.city + ", " +
            place.state + " on " + vm.dateToString( place.birthday );

        return new google.maps.InfoWindow({content: content});
     }; // makeInformationWindow()

     // Make all an array.
     // Make an information window for each person in the model.
     // Read on Wikipedia the names of schools that person attended
     // and append that list of schools to the text that is already
     // in the information window.
     // Store the information windows in the array.
     var informationWindows = [];
    that.getNumberOfInformationWindows = function() {
        return informationWindows.length;
    }; // getNumberOfInformationWindows()

    that.getInformationWindow = function( index ) {
        return informationWindows[index];
    }; // getInformationWindow()

     for( var i = 0; i < vm.getNumberOfPlaces(); i++ ) {
         var place = vm.getPlace(i);
         var firstName = place.person.firstName;
         var lastName = place.person.lastName;
         informationWindows[i] = makeInformationWindow( vm.getPlace(i) );
         getSchoolsAttended( firstName, lastName, informationWindows[i] );
     } // for

    // Compute the coordinates the center and eastern, western, northern,
    // and southern boundaries of the region that contains all of the
    // places of birth that are recorded in the model.
    var em = vm.getExtremaAndMeans();

    // Describe the location of the center, the scale, and the type
    // of the map that this program will draw.
    var mapSpecification = {
        center:new google.maps.LatLng(em.meanLatitude, em.meanLongitude),
        zoom:8,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }; // mapSpecification

    // Adjust the boundaries to make the map a little bigger.
    // Draw a region that is larger than the smallest region that
    // encloses all of the places of birth.
    var margin = 0.5;
    var southwest = new google.maps.LatLng( em.minimumLatitude - margin, em.minimumLongitude - margin );
    var northeast = new google.maps.LatLng( em.maximumLatitude + margin, em.maximumLongitude + margin );

    var bounds = new google.maps.LatLngBounds( southwest, northeast );

    var markers = [];

    that.getNumberOfMarkers = function() {
        return markers.length;
    }; // getNumberOfMarkers()

    that.getMarker = function( index ) {
        return markers[index];
    }; // getMarker()

    //* var neighborhoodMap = null;

    that.getNeighborhoodMap = function() {
        return neighborhoodMap;
    }; // getNeighborhoodMap()

    // Create a marker for each object in the model and store in an array.
    for( var i = 0; i < vm.getNumberOfPlaces(); i++ ) {
        var place = vm.getPlace(i);
        var marker = new google.maps.Marker({
            map: neighborhoodMap,
            position: { lat: place.latitude, lng: place.longitude },
    	    title: place.person.fullName,
            id: i
    	});

        place.marker = marker;
        markers.push( marker );
    } // for

    // Define a function that will tell a marker
    // what to do when the mouse is clicked.
    // (The marker will display its information window.)
    var addClickListener = function(i) {
        //console.log( "listening for clicks on marker# " + i );

        var marker = markers[i];
        var iw = informationWindows[i];
        var map = that.getNeighborhoodMap(); 

        var fun =  function() {

            var numberOfMarkers = that.getNumberOfMarkers();
            for( var j = 0; j < numberOfMarkers; j++ ) {
		var anotherWindow = informationWindows[j];
                var anotherMarker = markers[j];
                anotherWindow.close( map, anotherMarker );
            } // for

            iw.open( map, marker );
            if( marker.getAnimation() !== null ) {
                marker.setAnimation( null );
            } // if
            else {
                marker.setAnimation( google.maps.Animation.BOUNCE );
                setTimeout( function() { marker.setAnimation(null); }, 2000);
            } // else
        }; // fun()
        google.maps.event.addListener( marker, 'click', fun );
    }; // addClickListener()

    // Associated the function that responds to mouse
    // clicks with the marker that listens (waits) for
    // mouse clicks.
    for( var j = 0; j < markers.length; j++ ) {
        addClickListener(j);
    } // for

    // Adjust the size of the map to allow for some
    // space around all of the places of birth.
    // (All places of birth will be visible, with space
    // between the place and the map's boundary.)
    neighborhoodMap.fitBounds( bounds );

    return that;
}; // decoratorHelper()

// Define the function that will build the model andviewModel.
var go = function() {
    var ourModel = model();
    // The next statement assigns a value to a global variable.
    ourViewModel = viewModel( ourModel );

    // Define the listener for the button that
    // makes the controls (the search box and
    // array of buttons) visible or hidden.
    // The next statement assigns a value to a global variable.
    tc = (function() {
      var that = {};
      var visible = true;
      that.toggleControls = function() {
        if( visible ) {
          $("#toggleButton").text( "SHOW CONTROLS" );
          $("#searchBox").css( "visibility", "hidden" );
          $("#listAndMap").css( "visibility", "hidden" );
          visible = false;
        } // if
        else {
          $("#toggleButton").text( "HIDE CONTROLS" );
          $("#searchBox").css( "visibility", "visible" );
          $("#listAndMap").css( "visibility", "visible" );
          visible = true;
        } // else
      };
      return that;
    })();

}; // go()

var decorateMap = function() {
    var ourDecoratorHelper = decoratorHelper( ourViewModel );

    var toggleMarker = function( index ) {
        var result = function() {
            var marker = ourDecoratorHelper.getMarker( index );
            if( marker.getAnimation() !== null ) {
                marker.setAnimation( null );
	    } // if
	    else {
                console.log( "decorateMap toggleMarker result: marker# " + index );
                marker.setAnimation( google.maps.Animation.BOUNCE );
		//          stopAnimation( marker );
	    } // else
        }; // result()
	return result;
    }; // toggleMarker()

    var toggleMarkerAndWindow = function( index ) {
        var result = function() {
            //console.log( "toggleMarkerAndWindow / result / markerIndex = " + index );
            var map = ourDecoratorHelper.getNeighborhoodMap();
            var marker = ourDecoratorHelper.getMarker( index );
            var informationWindow = ourDecoratorHelper.getInformationWindow( index );
            if( marker.getAnimation() !== null ) {
                marker.setAnimation( null );
                informationWindow.close( map, marker );
	    } // if
	    else {
                marker.setAnimation( google.maps.Animation.BOUNCE );
                setTimeout( function() { marker.setAnimation(null); }, 2000 );
                //console.log( "toggleMarkerWindow / result / else clause / markerIndex = " + index );

          	var numberOfMarkers = ourDecoratorHelper.getNumberOfMarkers();
                for( var markerIndex = 0; markerIndex < numberOfMarkers; markerIndex++ ) {
                    var anotherWindow = ourDecoratorHelper.getInformationWindow( markerIndex );
                    var anotherMarker = ourDecoratorHelper.getMarker( markerIndex );
                    anotherWindow.close( map, anotherMarker );
                } // for

                informationWindow.open( map, marker );
	    } // else
        }; // result()
	return result;
    }; // toggleMarkerAndWindow()

    var myKnockoutHelper = function() {
        var that = this;
        // Tell Knockout framework where to find the model
        // that contains the data to be displayed on the page.
        that.places = ko.observableArray();
	for( var i = 0; i < ourViewModel.getNumberOfPlaces(); i++ ) {
            var place = ourViewModel.getPlace(i);
            place.choose = toggleMarkerAndWindow( i );

            // Apparently, this next statement (call to the
            // button's click handler) is needed.
            // Without it, the first selection of a
            // button requires 2 clicks. Subsequent selections
            // require only 1 click.
            place.choose();
            place.visible = ko.observable(true);
            that.places.push( place );
	} // for

        // Define the function that will respond to input
        // in the search field.
        that.filter = function() { // function( formElement) {
            // Read the years that were entered in the search box.
            var ly = $("#loYear").val();
            var hy = $("#hiYear").val();

            //console.log( "changed! ly = " + ly + " hy = " + hy );

            // validate inputs
            var isFourDigitPositiveInteger = function( n ) {
                return /^[1-9]\d\d\d$/.test( n );
            };

            var warningMessage = "";

            // Check values of years that were entered.
            // Construct a warning message if values are invalid.
            if( !isFourDigitPositiveInteger(ly) ) {
                //ly = 1846; // year that Iowa became a state
                //formElement.elements.loYear.value = ly;
                warningMessage += "The first year must be a four digit positive integer.\n";
            } // if

            if( !isFourDigitPositiveInteger(hy) ) {
                //hy = 2228; // year of Captain Kirk's birth
                // or make this year the upper bound of range: (new Date()).getFullYear();
                //formElement.elements.hiYear.value = hy;
                warningMessage += "The second year must be a four digit positive integer.\n";
            } // if

            if( (warningMessage === "") && (ly > hy) ) {
                //ly = 1846; // year that Iowa became a state
                //formElement.elements.loYear.value = ly;
                //hy = 2228; // year of Captain Kirk's birth
                // or make this year the upper bound of range: (new Date()).getFullYear();
                //formElement.elements.hiYear.value = hy;
                warningMessage += "The first year must be less than or equal to the second year.";
            } // if

            if( warningMessage !== "" ) {
                // Display warning message if necessary.
                $(".alert-warning").html( warningMessage);
                $(".alert-warning").css( "visibility", "visible" );
                // Because the user has not made a valid selection,
                // hide all markers and buttons (none have been selected!).
                for( var i = 0; i < that.places().length; i++ ) {
                    var place = that.places()[i];
                    place.visible( false );
                    ourDecoratorHelper.getMarker(i).setMap( null );
                } // for
            } // if
            else {
                // Otherwise, display no warning message.
                $(".alert-warning").html( "" );
                $(".alert-warning").css( "visibility", "hidden" );

                // Make visible all markers that identify the places of birth
                // of people whose dates of birth lie within the
                // specified range of years.
                // Similarly, make visible all buttons that identify persons
                // whose dates of birth lie within the specified range.
                // Make all other markers and buttons invisible.
                for( var i = 0; i < that.places().length; i++ ) {
                    var place = that.places()[i];
                    var year = place.birthday.getFullYear();
                    if( (ly <= year) && (year <= hy) ) {
                        place.visible(true);
                        ourDecoratorHelper.getMarker(i).setMap( neighborhoodMap );
                    } // if
                    else {
                        place.visible(false);
                        ourDecoratorHelper.getMarker(i).setMap( null );
                    } // else
                } // for
            } // else
        }; // filter()
	that.loBound = ko.observable( $("#loYear").val() );
	that.hiBound = ko.observable( $("#hiYear").val() );

        // that.difference is for debugging purposes only.
        that.difference = ko.pureComputed( function() { console.log( "edit!" ); return that.hiBound() - that.loBound(); }, this );

        that.changeReporter = function() { that.filter(); };
        return that;
    }; // myKnockoutHelper()

    // Use Knockout framework to connect data in model
    // with data displayed on HTML page.
    ko.applyBindings( myKnockoutHelper() );
}; // decorateMap()


var neighborhoodMap = null;
var ourViewModel = null;
var tc = null;

var myInitializer = function() {

    var mapSpecification = {
        center:new google.maps.LatLng(42.0, -90.0),
        zoom: 8,
        draggable: false,
        scrollwheel: false,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }; // mapSpecification

    // Create the map.
    neighborhoodMap=new google.maps.Map(document.getElementById("bigMap"),mapSpecification);
    decorateMap();
}; // myInitializer()


$(document).ready( go );




