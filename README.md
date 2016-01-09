
Neighborhood Map: Illustrious Iowans  
====================================  
Author: Leon Tabak  
------------------
Date: 08 January 2016
----------------------

To use this application:  
  * Open index.html in a browser.  
  * Do one or more of the following:  
    * Click on one of the names in the array of buttons.   
    * Click on one of the markers (push pins) on the map.  
    * Change the range of years in the search boxes.  
    * Click on the HIDE CONTROLS/SHOW CONTROLS button.
      Hiding the controls (the buttons and search fields)
      makes more of the map visible.

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
of the colleges and universities that a person attended.  

The program makes use of the Bootstrap, JQuery, and 
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

The program builds:
1. An array of objects that each identify a person together
   with that person's place and date of birth.
   This is the model.  
2. An array of Google Maps InfoWindows. Each InfoWindow is
   linked to a Marker and holds text that includes a name
   and date of birth.  
3. An array of Google Maps Markers. Each Marker identifies
   a birthplace.  

The program uses the Knockout framework to construct an
array of buttons automatically from the model.  

The program uses the functional features (functions that return
functions, objects that contain functions, and functions that 
receive functions as arguments) of JavaScript to construct listeners 
and attach those functions to the buttons and markers.  

The program uses the alert class of the Bootstrap framework for
error reporting. It uses the grid layout features of that framework.  

