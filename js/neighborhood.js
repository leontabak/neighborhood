
// JavaScript for Project 5: Neighborhood
// Leon Tabak
// 14 January 2016

// Define a function that will create an object
// that describes Iowans who have contributed to
// the development of science and technology.
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
        result.schools = [];

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
			"Donald", "", "Campbell",
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
                        moment( {year: 2228, month: 2, day: 28} ) ));

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

var viewModel = function( model ) {
    // Define the object that this function will
    // return to its caller.
    // The object is empty initially, This function
    // will add a property to the object later.
    var that = {};

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

        that.getFirstName = function( index ) {
            return exemplars[index].name.firstName;
        }; // getFirstName()

        that.getMiddleName = function( index ) {
            return exemplars[index].name.middleName;
        }; // getMiddleName()

        that.getLastName = function( index ) {
            return exemplars[index].name.lastName;
        }; // getLastName()

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

        that.getCityState = function( index ) {
            return that.getCity(index) + ", " + that.getState(index);
        }; // getCityState()

        that.getLatitude = function( index ) {
            return exemplars[index].latitude;
        }; // getLatitude()

        that.getLongitude = function( index ) {
            return exemplars[index].longitude;
        }; // getLongitude()

        that.isInRange = function( index, startDate, endDate ) {
            var dob = exemplars[index].birthday;
            return startDate.isSameOrBefore(dob) && dob.isSameOrBefore(endDate);
        }; // isInRange()

        that.getBirthday = function( index ) {
            return exemplars[index].birthday;
        }; // getBirthday()

        that.getBirthdayString = function( index ) {
            return that.getBirthday(index).format( "MMM DD, YYYY" );
        }; // getBirthdayString()

        that.getSchools = function( index ) {
            return exemplars[index].schools;
        }; // getSchools()

        that.getSchoolsString = function( index ) {
            var listOfSchools = that.getSchools(index);
            var lengthOfList = listOfSchools.length;

            if( lengthOfList === 0 ) {
                return "No schools found.";
            } // if
            else {
                var result = "";
                for( var i = 0; i < lengthOfList; i++ ) {
                    result += listOfSchools[i] + "\n";
                } // for
                return result;
            } // else
        }; // getSchoolsString()

        that.getLabel = function( index ) {
            return that.getLastName(index).toUpperCase();
        }; // getLabel()

        that.getInfo = function( index ) {
            var result = "";
            result += that.getFullName(index) + "\n";

            var verbPhrase = "was born on ";
            if( moment().isBefore( that.getBirthday(index) ) ) {
                verbPhrase = "will be born on ";
            } // if

            result += verbPhrase + that.getBirthdayString(index) + 
                      " in " + that.getCityState(index) + ".\n";
            result += that.getSchoolsString(index);
            return result;
        }; // getInfo()

        that.addSchool = function( index, school ) {
            exemplars[index].schools.push( school );
        }; // addSchool()

        return that;
    }; // exemplarExplorer()


    // Define a function that will attempt to find on Wikipedia the names
    // of the colleges and universities that a person attended and append
    // that data to the text in the information windows that is linked to
    // the marker on the map at the place of that person's birth.
    var lookUpSchools = function( index, ee ) {
        //console.log( "looking up schools for " + ee.getFirstName(index) + " " + ee.getLastName(index) );

        var parse = function( wikiResponse ) {
            console.log( "parsing..." ) ;

            // Find all of the text that lies between the
            // word "alma_mater" and the character "|".
            var str = JSON.stringify( wikiResponse.query.pages );

            // Here I am following a suggestion that came from 
            // the last reviewer of my code.
            // I will use a regular expression to find that
            // part of the record that contains a list of schools.
            // I previously searched for the indices of
            // prefix and suffix and then extracted a substring.

            var re = /alma_mater([^\|]*)\|/;
            //var i = str.indexOf( "alma_mater" );
            //var j = str.indexOf( "|", i + 9 );
            //var almaMater = str.slice( i, j );
            var almaMater = re.exec( str );
            if( (almaMater !== null) && 
                (Object.prototype.toString.call( almaMater) === '[object Array]') &&
                (almaMater.length > 0) ) {
                //console.log( "0: " + almaMater[0] );
                //console.log( "1: " + almaMater[1] );
                almaMater = almaMater[1];
	    } // if
            else {
                //console.log( "no alma mater" );
                almaMater = "";
	    } // else

            // Find names of schools enclosed in paired
            // square brackets. For example, [[Worcester Polytechnic Institute]].
            // Concatenate the names of the schools, placing an HTML <br> tag
            // before each name.
            re = /\[\[[a-zA-Z ]*\]\]/g;
            var schools = re.exec( almaMater );
            while( schools !== null ) {
               var oneSchool = schools[0];
               oneSchool = oneSchool.replace( "[[", "" );
               oneSchool = oneSchool.replace( "]]", "" );
               //console.log( oneSchool );
               ee.addSchool( index, oneSchool );
               schools = re.exec( almaMater );
            } // while
        }; // parse()

        var ifWikipediaDoesNotRespond = function() {
            alert( "Wikipedia is not responding." );
        };

        var alarmClock = setTimeout( ifWikipediaDoesNotRespond, 2000 );

        // Specify the kind of access to the on-line service and
        // the function that will do something with the data that
        // is received.
        var ajaxSettings = {
            dataType: "jsonp",
            crossDomain: true,
            success: function(response) { clearTimeout(alarmClock); parse(response); }
        }; // ajaxSettings

	var firstName = ee.getFirstName(index);
        var lastName = ee.getLastName(index);

        // Construct a URL that contains a query.
        // This query searches for a page about a person
        // that it identifies by first and last name.
        var wikipediaURL = "http://en.wikipedia.org/w/api.php?action=query&format=json" +
          "&prop=revisions&rvprop=content&titles=" + firstName + "%20" + lastName;

        // Use a JQuery function to read data from an on-line service.
        $.ajax( wikipediaURL, ajaxSettings );
    }; // lookUpSchools()

    that.mapInitializer = function() {
        if( typeof google === "undefined" ) {
            //alert( "google is undefined" );
            // Display warning message if necessary.
            var warningMessage = "No response from Google Maps. Check network connection.";
            alert( warningMessage );
        } // if
        else {
            //alert( "google is defined" );
            // Display warning message if necessary.

            var mapSpecification = {
                center:new google.maps.LatLng(42.0, -90.0),
                zoom: 8,
                draggable: false,
                scrollwheel: false,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            }; // mapSpecification

            // Create the map.
            neighborhoodMap=new google.maps.Map(document.getElementById("bigMap"),mapSpecification);
            //decorateMap();
        } // else
    }; // mapInitializer()

    // Build the database.
    that.ee = exemplarExplorer( model );
    var n = that.ee.getNumberOfExemplars();
    for( var i = 0; i < n; i++ ) {
        // Go to Wikipedia to find school(s) that person #i attended.
        lookUpSchools( i, that.ee );
    } // for

    return that;
}; // viewModel()

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
    
    
    self.loBound = ko.observable(1846);
    self.hiBound = ko.observable(2228);

    self.toggleVisibility = function() {
        if( self.show() === false ) {
            self.show(true);
        } // if
        else {
            self.show(false);
        } // else
    }; // toggleVisility()

    self.exemplars = ko.observableArray();
    var numberOfExemplars = vm.ee.getNumberOfExemplars();
    for( var i = 0; i < numberOfExemplars; i++ ) {
        var oneExemplar = {};
        oneExemplar.index = i;
        oneExemplar.label = vm.ee.getLabel(i);
        oneExemplar.visible = ko.observable(true);
        self.exemplars.push( oneExemplar );
    } // for

    self.warn = ko.observable(false);
    self.warning = ko.observable("Valid input.");
    self.changeReporter = function() {
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
        var endDate = moment({ year: hy, month: 0, day: 1});
        var numberOfExemplars = vm.ee.getNumberOfExemplars();
        for( var i = 0; i < numberOfExemplars; i++ ) {
            if( vm.ee.isInRange(i, startDate, endDate ) ) {
                self.exemplars()[i].visible(true);
            } // if
            else {
                self.exemplars()[i].visible(false);
            } // else
        } // for

    }; // changeReporter()

}; // koModel()

var m;
var vm;

var go = function() {
    m = model();
    vm = viewModel( m );
    ko.applyBindings( koModel(vm) );
}; // go()

$(document).ready(go);



