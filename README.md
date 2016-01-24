
Neighborhood Map
================
Illustrious Iowans
==================
Author: Leon Tabak
------------------
Date: 22 January 2016
----------------------

See [an outline of the design of this application] (http://www.eonsahead.com/iowans/docs/index.html)
and then [try out the application] (http://www.eonsahead.com/iowans).
The outline (written with jsdoc) is also in the *docs* folder of the application's
[repository on GitHub] (https://github.com/leontabak/neighborhood).

To use this application:
  * Open index.html in a browser.
  * Do one or more of the following:
    * Click on one of the names in the array of buttons.
    * Click on one of the markers (push pins) on the map.
    * Change (edit) the range of years in the two search boxes.
      A year must be a positive four digit decimal integer.
      The first year must be less than or equal to the second year.
    * Enter the first letters of name in the search box.
    * Click on the HIDE CONTROLS/SHOW CONTROLS button.
      Hiding the controls (the buttons and search fields)
      makes more of the map visible.

To see what happens when the Google Maps server and/or the Wikipedia server fails to respond:
    * Open the application in Google Chrome.
    * Open Google Chrome's Developer Tools by selection View/Developer/Developer Tools.
    * In the Network field, replace the default value of "No throttling" with "Offline."
    * Reload the application. Examine the message that the application publishes.
      This is what happens when the application is neither able to connect to
      the Google Maps server nor to the Wikipedia server.
    * Reconnect to the network ("No throttling").
    * Edit js/neighborhood.js. On line 634 (search for "wikipediaURL = "), remove
      the "a" from "wikipedia" in the string on the right-hand side of the
      assignment statement.
    * Reload the application. Examine the message that the application publishes.
      This is what happens when the application is able to connect to the
      Google Maps server but not to the Wikipedia server.
    * Correct the spelling of "wikipedia" on line 634.
    * Again, edit js/neighborhood.js. On line 647 (search for "lookUpCareerFacts( "),
      insert comment markers ("//") at the beginning of the line.
      This prevents the application from trying to read data from Wikipedia.
    * Take the application offline as before. Reload the application.
      Examine the message that the application publishes.
      This is what happens when the application is unable to connect
      to the Google Maps server but there have been no unsuccessful
      attempts to connect with the Wikipedia server.
    * Remove the comment designation on line 647.

This application draws a map and marks on the map
the places of birth of several Iowans who contributed
to engineering, mathematics, or science.

Just for fun, the list includes James Tiberius Kirk.
The authors of the Star Trek stories identified Iowa
as Captain Kirk's first home port. The town of Riverside,
Iowa claims to be the place where he will be born on
March 28, 2228 and has long sponsored an annual celebration
of the life of its future hometown hero. Many actors who
played in the television programs and motion pictures have
appeared at this festival. My own daughters received an award
for best costumes from the hand of Walter Koenig (Mr. Chekov).

The program makes use of the Google Maps and Wikipedia APIs.
It uses String methods and a regular expression to search
through the text that Wikipedia returns to find the names
of the colleges and universities that a person attended and
other facts related to the person's career. These other details
may include the names of institutions for which the person
worked, awards won, and the person's field of endeavor.

Not all biographical articles on Wikipedia contain all types
of information.
I examined the response from several queries.
I found a pattern: in many articles a keyword
such as "alma_mater," "known_for", or "awards" appears
between vertical bars (pipes) together with values
enclosed in pairs of brackets: "|alma_mater = [[Cornell College]]|".
The program searches for these values.

The program makes use of the Bootstrap, JQuery, Moment, and
Knockout libraries.

The application is responsive.
Readers see a search bar at the top of the page
and a vertical array of buttons on the left side of
the page over a map.

Readers can:
1. click on a marker on the map. One click causes
   the marker to begin bouncing and causes an information
   window to appear. A second click stops the bouncing
   and closes the information window.
2. click on a button that bears the name of an
   illustrious Iowan. One click causes the corresponding
   marker on the map (at the site of the person's place
   of birth) to begin bouncing and causes an information
   window to appear. A second click stops the marker's
   bouncing and closes the information window.
3. enter two positive four digit numbers to indicate
   a closed interval of time. The program responds by showing
   only the buttons and markers for people who were
   born between the two specified years. If one or both
   of the inputs is not a four digit positive integer
   or if the first is greater than the second, then the
   program displays a warning message that describes the
   error.
4. enter the first letters of a name in a search box.
   The program responds by removing from the map all
   of the markers for names that do not have a matching
   prefix and by similarly removing name buttons.
   When the program receives a prefix that matches a name
   uniquely, it makes the corresponding marker to bounce
   and opens the information window.

The program builds:
1. An array of objects that each identify a person together
   with that person's place and date of birth.
   This is the model.

   Each element of the model contains an array of
   schools, and references to a Google Maps Marker
   and a function for responding to clicks on the
   marker.
   When the program first creates the model,
   it makes each array of schools empty and
   the references to the marker and its listener
   null.
2. An object that contains methods for retrieving
   values from the model and assigning values to the
   initially null fields of the model.
   This is the view model.

   The view model also creates a Google Maps InfoWindow
   and a Google Maps Map.
   The InfoWindow is
   linked to a Marker and assigned text that includes a name
   date of birth, and list of schools attended when it
   is opened.
3. A function that creates Knockout Observables.
   An observable is a function that connects text
   displayed on the Web page with variables whose
   values the application may read and write.
   This is the Knockout model.

The application includes an HTML page whose elements
include data-bind attributes that connect text displayed
on the Web page with variables whose values the JavaScript
code may read and write.

The program uses the Knockout framework to construct an array of
buttons automatically from the model.

The program uses the functional features (functions that return
functions, objects that contain functions, and functions that
receive functions as arguments) of JavaScript to construct listeners
and attach those functions to the buttons and markers.

The program validates inputs and uses the alert class of the
Bootstrap framework for reporting errors. It uses the grid layout
features of that framework.

