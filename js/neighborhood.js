// JavaScript for Project 5: Neighborhood
// Leon Tabak
// 07 September 2015

// Burlington, IA 40.808, -91.115
// Cedar Falls, IA 42.534, -92.445
// Decorah, IA 43.303, -91.785
// Mount Pleasant, IA 40.971, -91.548
// Riverside, IA 41.479, -91.581
// Solon, IA 41.807, -91.494
// West Branch, IA 41.671, -91.346

var model = function() {
    var that = {};

    var makePerson = function( firstName, middleName, lastName ) {
	var result = {};

	result.firstName = firstName;
	result.middleName = middleName;
	result.lastName = lastName;
	result.fullName = firstName + " " + middleName + " " + lastName;

	return result;
    }; // makePerson()

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

        result.choose = function() { console.log( "look at this face" ); };

        return result;
    }; // makePlace()


    var places = [];
    places.push( makePlace( 42.534, -92.445,
			"Marc", "", "Andreessen", "Cedar Falls", "Iowa", new Date( 1971, 6, 9 ) ));
    places.push( makePlace( 41.807, -91.494,
			"Leo", "", "Beranek", "Solon", "Iowa", new Date( 1914, 8, 15 ) ));
    places.push( makePlace( 42.187, -92.715,
			    "Clifford", "", "Berry", "Gladbrook", "Iowa", new Date( 1918, 3, 19 ) ));
    places.push( makePlace( 43.381, -92.114,
		        "Norman", "", "Borlaug", "Cresco", "Iowa", new Date( 1914, 2, 25 ) ));
    places.push( makePlace( 40.808, -91.115,
			"Wallace", "", "Carothers", "Burlington", "Iowa", new Date( 1896, 3, 27 ) ));
    places.push( makePlace( 41.844, -90.188,
			 "Donald", "", "Campbell", "Clinton", "Iowa", new Date( 1904, 7, 5 ) ));
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


var viewModel = function( m ) {
    var that = {};

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

    that .getNumberOfPlaces = function() {
        return m.places.length;
    };

    that.getPlace = function( index ) {
        return m.places[index];
    };

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

        result.minimumLatitude = meanLatitude;
        result.maximumLatitude = maximumLatitude;
        result.minimumLongitude = minimumLongitude;
        result.maximumLongitude = maximumLongitude;

        return result;
    }; // getExtremaAndMeans()

    return that;
}; // viewModel()


var view = function( vm ) {
    var that = {};

    var loYear = 1846; // year that Iowa became a state
    var hiYear = (new Date()).getFullYear();

    $("#loYear").attr("value", loYear);
    $("#hiYear").attr("value", hiYear );

    var makeInformationWindow = function( place ) {
        var today = new Date();
        var birthday = place.birthday;
        var verb = " was born in ";

        if( vm.compareDates( birthday, today ) > 0 ) {
            verb = " will be born in ";
        } // if

        var content = place.person.fullName + verb + place.city + ", " +
            place.state + " on " + vm.dateToString( place.birthday );

        return new google.maps.InfoWindow({content: content});
     }; // makeInformationWindow()

     var informationWindows = [];

     for( var i = 0; i < vm.getNumberOfPlaces(); i++ ) {
         informationWindows[i] = makeInformationWindow( vm.getPlace(i) );
     } // for

    var em = vm.getExtremaAndMeans();

    var mapSpecification = {
        center:new google.maps.LatLng(em.meanLatitude, em.meanLongitude),
        zoom:8,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var margin = 0.5;
    var southwest = new google.maps.LatLng( em.minimumLatitude - margin, em.minimumLongitude - margin );
    var northeast = new google.maps.LatLng( em.maximumLatitude + margin, em.maximumLongitude + margin );

    var bounds = new google.maps.LatLngBounds( southwest, northeast );

    that.markers = [];
    that.neighborhoodMap = null;

    function initializeMap() {

      that.neighborhoodMap=new google.maps.Map(document.getElementById("neighborhood"),mapSpecification);

      for( var i = 0; i < vm.getNumberOfPlaces(); i++ ) {
          var marker = new google.maps.Marker({
    	      map: that.neighborhoodMap,
              position: { lat: vm.getPlace(i).latitude, lng: vm.getPlace(i).longitude },
    	      title: vm.getPlace(i).person.fullName,
              id: i
    	      });
      
          that.markers.push( marker );
      } // for

      var addClickListener = function(i) {
          var marker = that.markers[i];
          var iw = informationWindows[i];
          var fun =  function() { iw.open( that.neighborhoodMap, marker ); };
          google.maps.event.addListener( marker, 'click', fun );
      }; // funMaker


      for( var i = 0; i < that.markers.length; i++ ) {
          addClickListener(i);
      } // for

      that.neighborhoodMap.fitBounds( bounds );
    } // initializeMap()

    google.maps.event.addDomListener(window, 'load', initializeMap);

    return that;
}; // view()

var go = function() {
    var ourModel = model();
    var ourViewModel = viewModel( ourModel );
    var ourView = view( ourViewModel );

    var myViewModel = function() {
        var that = this;
        that.places = ko.observableArray( ourModel.places );

        that.filter = function( formElement) { 
            var ly = $("#loYear").val();
            var hy = $("#hiYear").val();

            console.log( ly + "---" + hy  ); 
            console.log( "length of array = "  + ourModel.places.length );
	    that.places.removeAll();
	    ourModel = model();
	    var markers = ourView.markers;
	    var neighborhoodMap = ourView.neighborhoodMap;

	    for( var i = 0; i < markers.length; i++ ) {
		markers[i].setMap(null);
	    } // for

	    for( var i = 0; i < ourModel.places.length; i++ ) {
                var year = ourModel.places[i].birthday.getFullYear();
		if( (ly < year) && (year < hy) ) {
		    that.places.push( ourModel.places[i] );
		    markers[i].setMap( neighborhoodMap );
                    console.log( "add " + year );
		} // if
		else {
		    console.log( "do not add " + year );
		} // else
	    } // for
        }; // filter()

        that.choose = function() { 
            console.log( "button pushed" ); 
            $(".nameButton").removeClass( "nameButtonColor" );
	    $(".nameButton").addClass( "selectedNameColor" ); 
        };
    }; // myViewModel()

    ko.applyBindings(new myViewModel() );
}; // go()






