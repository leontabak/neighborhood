// JavaScript for Project 5: Neighborhood
// Leon Tabak
// 07 September 2015


var compareDates = function( a, b ) {
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

    var makePerson = function( firstName, middleName, lastName ) {
	var result = {};
	result.firstName = firstName;
	result.middleName = middleName;
	result.lastName = lastName;
        result.toString = firstName + " " + middleName + " " + lastName;
	return result;
    }; // makePerson()

    var makePlace = function( latitude, longitude, firstName, middleName, lastName, city, state, birthday ) {
    return {
	latitude: latitude,
	longitude: longitude,
	person: makePerson( firstName, middleName, lastName ),
        city: city,
        state: state,
	birthday: birthday };
}; // makePlace()

var dateToString = function( date ) {

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

var makeInformationWindow = function( place ) {
    var today = new Date();
    var birthday = place.birthday;
    var verb = " was born in ";

    if( compareDates( birthday, today ) > 0 ) {
	verb = " will be born in ";
    } // if

    var content = place.person.toString + verb + place.city + ", " +
    place.state + " on " + dateToString( place.birthday );

    return new google.maps.InfoWindow({content: content});
}; // makeInformationWindow()


// Burlington, IA 40.808, -91.115
// Cedar Falls, IA 42.534, -92.445
// Decorah, IA 43.303, -91.785
// Mount Pleasant, IA 40.971, -91.548
// Riverside, IA 41.479, -91.581
// Solon, IA 41.807, -91.494
// West Branch, IA 41.671, -91.346


var places = [];
places.push( makePlace( 42.534, -92.445,
			"Marc", "", "Andreessen", "Cedar Falls", "Iowa", new Date( 1971, 6, 9 ) ));
places.push( makePlace( 41.807, -91.494,
			"Leo", "", "Beranek", "Solon", "Iowa", new Date( 1914, 8, 15 ) ));
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


var informationWindows = [];

for( var i = 0; i < places.length; i++ ) {
      informationWindows[i] = makeInformationWindow( places[i] );
} // for

function initializeMap() {

  // Find extrema and means of latitude and longitude.
  var meanLatitude = 0;
  var meanLongitude = 0;
  var minimumLatitude = places[0].latitude;
  var maximumLatitude = places[0].latitude;
  var minimumLongitude = places[0].longitude;
  var maximumLongitude = places[0].longitude;

  for( var i = 1; i < places.length; i++ ) {
      meanLatitude = places[i].latitude;
      meanLongitude = places[i].longitude;

      if( places[i].latitude < minimumLatitude ) {
	  minimumLatitude = places[i].latitude;
      } // if
      if( places[i].latitude > maximumLatitude ) {
	  maximumLatitude = places[i].latitude;
      } // if

      if( places[i].longitude < minimumLongitude ) {
	  minimumLongitude = places[i].longitude;
      } // if
      if( places[i].longitude < maximumLongitude ) {
	  maximumLongitude = places[i].longitude;
      } // if
  } // for

  if( places.length > 0 ) {
      meanLatitude = meanLatitude / places.length;
      meanLongitude = meanLongitude / places.length;
  } // if

  var mapSpecification = {
      center:new google.maps.LatLng(meanLatitude, meanLongitude),
    zoom:8,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  var neighborhoodMap=new google.maps.Map(document.getElementById("neighborhood"),mapSpecification);

  var markers = [];


  for( var i = 0; i < places.length; i++ ) {
      var marker = new google.maps.Marker({
	      map: neighborhoodMap,
              position: { lat: places[i].latitude, lng: places[i].longitude },
	      title: places[i].person.toString,
	      id: i
	      });
      
      markers.push( marker );
  } // for


  var addClickListener = function(i) {
      var marker = markers[i];
      var iw = informationWindows[i];
      var fun =  function() { iw.open( neighborhoodMap, marker ); };
      google.maps.event.addListener( marker, 'click', fun );
  }; // funMaker


  for( var i = 0; i < markers.length; i++ ) {
      addClickListener(i);
  } // for



  var margin = 0.5;
  var southwest = new google.maps.LatLng( minimumLatitude - margin, minimumLongitude - margin );
  var northeast = new google.maps.LatLng( maximumLatitude + margin, maximumLongitude + margin );

  var bounds = new google.maps.LatLngBounds( southwest, northeast );

  neighborhoodMap.fitBounds( bounds );
} // initializeMap()


google.maps.event.addDomListener(window, 'load', initializeMap);

var makeListOfBirthplaces = function() {
   var listOfBirthplaces = $("#origins");
    for( var i = 0; i < places.length; i++ ) {
        var listItem = "<li>" + places[i].person.toString + "</li>";
        $("#origins").append( listItem );
    } // for
};

$(document).ready( makeListOfBirthplaces );






