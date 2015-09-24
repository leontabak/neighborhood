// JavaScript for Project 5: Neighborhood
// Leon Tabak
// 07 September 2015

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
        result.marker = null;

	//        result.choose = function() { 
        //    console.log( "look at this face: " + result.person.fullName );
        //    if( result.marker.getAnimation() != null ) {
        //        result.marker.setAnimation( null );
	//    } // if
	//    else {
        //        result.marker.setAnimation( google.maps.Animation.BOUNCE );
	//    } // else
        //}; // choose()

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
    } // compareDates()

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
        }; // switch

        var result = monthName + " " + date.getUTCDate() + "," + date.getFullYear();
        return result;
    } // dateToString()

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
var view = function( vm ) {
    var that = {};

    // Place the initial (default) range of years
    // in the search bar.
    var loYear = 1846; // year that Iowa became a state
    var hiYear = (new Date()).getFullYear();

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
            var schools;
            while( schools = re.exec( almaMater ) ) {
               var oneSchool = schools[0];
               oneSchool = oneSchool.replace( "[[", "" );
               oneSchool = oneSchool.replace( "]]", "" );
               result = result + "<br>" + oneSchool;
            } // while

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

        // Use a JQuery function to read data from an on-line service.
        $.ajax( wikipediaURL, ajaxSettings );
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

    var neighborhoodMap = null;

    that.getNeighborhoodMap = function() {
        return neighborhoodMap;
    }; // getNeighborhoodMap()

    var initializeMap = function() {

      // Create the map.
      neighborhoodMap=new google.maps.Map(document.getElementById("neighborhood"),mapSpecification);

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
          var marker = markers[i];
          var iw = informationWindows[i];
          var fun =  function() {
              console.log( "listening" ); 
              iw.open( that.getNeighborhoodMap(), marker );
              if( marker.getAnimation() != null ) {
                  marker.setAnimation( null );
              } // if
              else {
                  marker.setAnimation( google.maps.Animation.BOUNCE );
              } // else
          };
          google.maps.event.addListener( marker, 'click', fun );
      }; // funMaker

      // Associated the function that responds to mouse
      // clicks with the marker that listens (waits) for 
      // mouse clicks.
      for( var i = 0; i < markers.length; i++ ) {
          addClickListener(i);
      } // for

      // Adjust the size of the map to allow for some
      // space around all of the places of birth.
      // (All places of birth will be visible, with space
      // between the place and the map's boundary.)
      neighborhoodMap.fitBounds( bounds );
    } // initializeMap()

    google.maps.event.addDomListener(window, 'load', initializeMap);

    return that;
}; // view()

// Define the function that will build the model, viewModel, and view.
var go = function() {
    var ourModel = model();
    var ourViewModel = viewModel( ourModel );
    var ourView = view( ourViewModel );

    var toggleMarker = function( index ) { 
        var result = function() {
            var marker = ourView.getMarker( index );
            if( marker.getAnimation() != null ) {
                marker.setAnimation( null );
	    } // if
	    else {
                marker.setAnimation( google.maps.Animation.BOUNCE );
	    } // else
        }; // result()
	return result;
    }; // toggleMarker()


    var openInformationWindow = function( index ) {
        var result = function() {
            var informationWindow = ourView.getInformationWindow( index );
            var marker = ourView.getMarker( index );
            var map = ourView.getNeighborhoodMap();
            informationWindow.open( map, marker );
        }; // result()
        return result;
    }; // openInformationWindow()

    var closeInformationWindow = function( index ) {
        var result = function() {
            var informationWindow = ourView.getInformationWindow( index );
            var marker = ourView.getMarker( index );
            var map = ourView.getNeighborhoodMap();
            informationWindow.close( map, marker );
        }; // result()
        return result;
    }; // closeInformationWindow()


    var toggleMarkerAndWindow = function( index ) {
        var result = function() {
            var map = ourView.getNeighborhoodMap();
            var marker = ourView.getMarker( index );
            var informationWindow = ourView.getInformationWindow( index );
            if( marker.getAnimation() != null ) {
                marker.setAnimation( null );
                informationWindow.close( map, marker );
	    } // if
	    else {
                marker.setAnimation( google.maps.Animation.BOUNCE );
                informationWindow.open( map, marker );
	    } // else
        }; // result()
	return result;
    }; // toggleMarkerAndWindow()

    var myViewModel = function() {
        var that = this;
        // Tell Knockout framework where to find the model
        // that contains the data to be displayed on the page.
        that.places = ko.observableArray();
	for( var i = 0; i < ourViewModel.getNumberOfPlaces(); i++ ) {
            var place = ourViewModel.getPlace(i);
            place.choose = toggleMarkerAndWindow( i );
            place.visible = ko.observable(true);
            that.places.push( place );
	} // for

        // Define the function that will respond to input
        // in the search field.
        that.filter = function( formElement) { 
            // Read the years that were entered in the search box.
            var ly = $("#loYear").val();
            var hy = $("#hiYear").val();

            // validate inputs
            var isFourDigitPositiveInteger = function( n ) {
                return /^[1-9]\d\d\d$/.test( n );
            }; 

            var warningMessage = "";

            if( !isFourDigitPositiveInteger(ly) ) {
                ly = 1846;
                formElement.elements["loYear"].value = ly;
                warningMessage += "The first year must be a four digit positive integer.\n";
            } // if

            if( !isFourDigitPositiveInteger(hy) ) {
                hy = (new Date()).getFullYear();
                formElement.elements["hiYear"].value = hy; 
                warningMessage += "The second year must be a four digit positive integer.\n";
            } // if

            if( (warningMessage === "") && (ly > hy) ) {
                ly = 1846;
                formElement.elements["loYear"].value = ly;
                hy = (new Date()).getFullYear();
                formElement.elements["hiYear"].value = hy; 
                warningMessage += "The first year must be less than or equal to the second year.";
            } // if

            if( warningMessage != "" ) {
                alert( warningMessage );
            } // if
            // end validation of inputs

	    var neighborhoodMap = ourView.getNeighborhoodMap();

            // Make visible all markers that identify the places of birth
            // of people whose dates of birth lie within the
            // specified range of years.
            // Similarly, make visible all buttons that identify persons
            // whose dates of birth lie within the specified range.
            // Make all other markers and buttons invisible.
            for( var i = 0; i < that.places().length; i++ ) {
                var place = that.places()[i];
                var year = place.birthday.getFullYear();
                if( (ly < year) && (year < hy) ) {
                    place.visible(true);
                    ourView.getMarker(i).setMap( neighborhoodMap );
                } // if
                else {
                    place.visible(false);
                    ourView.getMarker(i).setMap( null );
                } // else
            } // for
        }; // filter()

    }; // myViewModel()

    // Use Knockout framework to connect data in model
    // with data displayed on HTML page.
    ko.applyBindings(new myViewModel() );
}; // go()






