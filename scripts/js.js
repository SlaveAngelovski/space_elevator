// GLOBAL VARIABLES
document.addEventListener("scroll", function() {
  window.scrlValue = window.scrollY;
  window.screenHeight = window.innerHeight;
  window.screenWidth = window.innerWidth;
  window.scrlPositionBottom = window.scrlValue + window.screenHeight;
});

// GLOBAL FUNCTIONS
// shorten document.querySelector
function query(className) {
 return document.querySelector(className);
}
function id(idName) {
 return document.getElementById(idName);
}
function addClass(fromClass, addClass) {
  document.querySelectorAll("." + fromClass)[window.indexNumber].classList.add(addClass);//select from query list with "window.indexNumber" variable.. see line 129
}
function removeClass(fromClass, removeClass) {//remove class from list
  document.querySelectorAll("." + fromClass).forEach(function(element) {
    element.classList.remove(removeClass);
  });
}
// shorten .offset().top
function getOffsetTop(className) {
 return query(className).getBoundingClientRect().top + document.documentElement.scrollTop; // get element position relative to document
}
function enableScroll() {
  document.body.classList.remove("disable-scroll");
}
function disableScroll() {
  document.body.classList.add("disable-scroll");
}
//automate show and hide classes for ".info", ".info-arrow", "info-h2" and info-button on mobile versions
function hideExcept() {
 removeClass("info", "visible");// see line 20
 removeClass("info-arrow", "visible");
 removeClass("info-h2", "visible");
 addClass("info", "visible");//see line 16
 if (screenWidth < 780) {//show mobile version of h2 see line 20 index.html
  addClass("info-h2", "visible");//see line 16
 }
 document.querySelectorAll(".info-arrow")[window.index2Number].classList.add("visible");// "window.index2Number" and "window.indexNumber" are declared on line 137
 if (window.indexNumber >= 2 && window.indexNumber < 8) { // because ".info-arrow" class doesent have the same structure as ".info"
  window.index2Number = window.indexNumber;
 }
 else if (window.indexNumber === 8) {
  window.index2Number = 0;
 }
 else if (window.indexNumber > 8){
  window.index2Number = window.indexNumber - 1;
 }
  query(".info-btn").addEventListener('click', function() {//show info button for mobile versions
    disableScroll();
    query(".exit-btn").classList.add("info-visible"); //show close button
    addClass("info", "info-visible"); //show info text
    query(".exit-btn").addEventListener('click', function() {
      enableScroll();
      removeClass("info", "info-visible"); //hide info text
      query(".exit-btn").classList.remove("info-visible"); //hide close button
    });
  });
}
// //effects to add on page load
document.addEventListener("DOMContentLoaded", function(event) {
  //preload images..for mobile version
  var images = new Array();
  function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
    }
  }
  preload (
    "images/mouse_up.gif",
    "images/arrow.png",
    "images/aurora_bg1.png",
    "images/aurora_bg2.png",
    "images/aurora_front1.png",
    "images/aurora_front2.png",
    "images/baloon.png",
    "images/bird.gif",
    "images/clouds1.png",
    "images/clouds2.png",
    "images/elevator.png",
    "images/elevator-icon.png",
    "images/ground_station.png",
    "images/headline.png",
    "images/infobox.png",
    "images/iss.png",
    "images/meteor.gif",
    "images/phone.png",
    "images/satellite.png",
    "images/side_info.png",
    "images/space_station.png",
    "images/spy_plane.gif",
    "images/spy_satellite.png",
    "images/stars.png",
    "images/stars1.png",
    "images/sun.png",
    "images/sun_reflection.png",
    "images/sun2.png"
  );
  // reload page on mobile orientation change
    window.onorientationchange = function() { 
        var orientation = window.orientation; 
            switch(orientation) { 
                case 0:
                case 90:
                case -90: window.location.reload(); 
                break; } 
    };
  //scroll to bottom of the page
    window.scrollTo(0, 12000); // I couldnt make it to work otherwise on chrome
  disableScroll();
  document.getElementById("modal1btn").addEventListener('click', function() {
    query(".modal1-container").classList.remove("visible");
    enableScroll();
    query(".header").classList.remove("hide-header"); //show header display index.html line 13
    query(".headline-img").classList.add("show-head-img"); // show h2 line
    query(".side-info-container").classList.add("show-side"); // show side display
  });
});
//effects for header and content in the main div
function mainFx() {
  // ground station
  if (scrlPositionBottom > getOffsetTop(".ocean")){ //when viewport is bellow the top of the div...getOffsetTop see line 24
    window.indexNumber = 0;// index variable for .info class see line 31
    window.index2Number = 1;// index variable for .info-arrow class see line 57
    hideExcept(); // see line 34
  }
  // elevator
  else if ((scrlPositionBottom < getOffsetTop(".ocean")) && (scrlPositionBottom > getOffsetTop(".elevator-trigger1"))){ //when viewport is bellow the top of the ".ocean" div
    window.indexNumber = 1;
    window.index2Number = 0;
    hideExcept();
  }
  //bird
  else if ((scrlPositionBottom < getOffsetTop(".elevator-trigger1")) && (scrlPositionBottom > getOffsetTop(".bird-container"))){
    window.indexNumber = 2;
    hideExcept();
  }
  //plane
  else if ((scrlPositionBottom < getOffsetTop(".bird-container")) && (scrlPositionBottom > getOffsetTop(".plane-container"))){
    window.indexNumber = 3;
    hideExcept();
  }
  //baloon
  else if ((scrlPositionBottom < getOffsetTop(".plane-container")) && (scrlPositionBottom > getOffsetTop(".baloon-container"))){
    window.indexNumber = 4;
    hideExcept();
  }
  //meteor
  else if ((scrlPositionBottom < getOffsetTop(".baloon-container")) && (scrlPositionBottom > getOffsetTop(".aurora-trigger"))){
    window.indexNumber = 5;
    hideExcept();
  }
  //aurora
  else if ((scrlPositionBottom < getOffsetTop(".aurora-trigger")) && (scrlPositionBottom > getOffsetTop(".iss-trigger"))){
    window.indexNumber = 6;
    hideExcept();
  }
  //iss
  else if ((scrlPositionBottom < getOffsetTop(".iss-trigger")) && (scrlPositionBottom > getOffsetTop(".iss-container"))){
    window.indexNumber = 7;
    hideExcept();
  }
  //elevator2
  else if ((scrlPositionBottom < getOffsetTop(".iss-container")) && (scrlPositionBottom > getOffsetTop(".sat-trigger"))){
    window.indexNumber = 8;
    hideExcept();
  }
  //satellite
  else if ((scrlPositionBottom < getOffsetTop(".sat-trigger")) && (scrlPositionBottom > getOffsetTop(".spy-sat-trigger"))){
    window.indexNumber = 9;
    hideExcept();
  }
  //spy-sat
  else if ((scrlPositionBottom < getOffsetTop(".spy-sat-trigger")) && (scrlPositionBottom > getOffsetTop(".space"))){
    window.indexNumber = 10;
    hideExcept();
  }
  //space station
  else if (scrlPositionBottom < getOffsetTop(".space")){
    window.indexNumber = 11;
    hideExcept();
  }
}; 
//space elevator icon on right screen effect
function elevatorFx() {
  function showAndHideElevator() { //automate hide and show classes see header.scss line 218
    query(".elev-icon-container").classList.remove("pos1","pos2","pos3","pos4","pos5","pos6");
    query(".elev-icon-container").classList.add("pos" + window.elevatorIndex);
  }
  if (scrlPositionBottom > getOffsetTop(".troposphere")){ //when viewport is higher than ..
    window.elevatorIndex = 0;
    showAndHideElevator();
  }
  else if ((scrlPositionBottom < getOffsetTop(".troposphere")) && (scrlPositionBottom > getOffsetTop(".stratosphere"))){
    window.elevatorIndex = 1;
    showAndHideElevator();
  }
  else if ((scrlPositionBottom < getOffsetTop(".stratosphere")) && (scrlPositionBottom > getOffsetTop(".mesosphere"))){
    window.elevatorIndex = 2;
    showAndHideElevator();
  }
  else if ((scrlPositionBottom < getOffsetTop(".mesosphere")) && (scrlPositionBottom > getOffsetTop(".thermosphere"))){
    window.elevatorIndex = 3;
    showAndHideElevator();
  }
  else if ((scrlPositionBottom < getOffsetTop(".thermosphere")) && (scrlPositionBottom > getOffsetTop(".exosphere"))){
    window.elevatorIndex = 4;
    showAndHideElevator();
  }
  else if (scrlPositionBottom < getOffsetTop(".exosphere")){
    window.elevatorIndex = 5;
    showAndHideElevator();
  }
};
//the sun change effect
function sunFx() {
  if (scrlPositionBottom > getOffsetTop(".plane-container")){
    id("sun2").setAttribute("style","opacity: 0");
    id("sun").setAttribute("style","opacity: 1");
  }
  else if ((scrlPositionBottom < getOffsetTop(".plane-container")) && (scrlPositionBottom > getOffsetTop(".baloon-container"))){
    id("sun2").setAttribute("style","opacity: 0.2");
    id("sun").setAttribute("style","opacity: 0.8");
  }
  else if ((scrlPositionBottom < getOffsetTop(".baloon-container")) && (scrlPositionBottom > getOffsetTop(".aurora-trigger"))){
    id("sun2").setAttribute("style","opacity: 0.4");
    id("sun").setAttribute("style","opacity: 0.6");
  }
  else if ((scrlPositionBottom < getOffsetTop(".aurora-trigger")) && (scrlPositionBottom > getOffsetTop(".mesosphere"))){
    id("sun2").setAttribute("style","opacity: 0.6");
    id("sun").setAttribute("style","opacity: 0.4");
  }
  else if ((scrlPositionBottom < getOffsetTop(".mesosphere")) && (scrlPositionBottom > getOffsetTop(".iss-trigger"))){
    id("sun2").setAttribute("style","opacity: 0.8");
    id("sun").setAttribute("style","opacity: 0.2");
  }
  else if (scrlPositionBottom < getOffsetTop(".iss-trigger")){
    id("sun2").setAttribute("style","opacity: 1");
    id("sun").setAttribute("style","opacity: 0");
  }
};
//the temperature, elevation and ATM layer text effect see index.html line 93
function infoFx() {
   if (scrlPositionBottom > getOffsetTop(".troposphere")){
    query(".rad").innerHTML =  "";
    query(".temp").innerHTML =  "temperature: ~15C";
    query(".elev").innerHTML =  "elevation: 12km";
    query(".atm").innerHTML =  "ATM layer: Troposphere";
  }
  else if ((scrlPositionBottom < getOffsetTop(".troposphere")) && (scrlPositionBottom > getOffsetTop(".stratosphere"))){
    query(".rad").innerHTML =  "";
    query(".temp").innerHTML =  "temperature: -30C";
    query(".elev").innerHTML =  "elevation: 50km";
    query(".atm").innerHTML =  "ATM layer: Stratosphere";
  }
  else if ((scrlPositionBottom < getOffsetTop(".stratosphere")) && (scrlPositionBottom > getOffsetTop(".mesosphere"))){
    query(".rad").innerHTML =  "";
    query(".temp").innerHTML =  "temperature: -90C";
    query(".elev").innerHTML =  "elevation: 85km";
    query(".atm").innerHTML =  "ATM layer: Mesosphere";
  }
  else if ((scrlPositionBottom < getOffsetTop(".mesosphere")) && (scrlPositionBottom > getOffsetTop(".thermosphere"))){
    query(".rad").innerHTML =  "";
    query(".temp").innerHTML =  "temperature: 500C to 2000C";
    query(".elev").innerHTML =  "elevation: 690km";
    query(".atm").innerHTML =  "ATM layer: Thermosphere";
  }
  else if ((scrlPositionBottom < getOffsetTop(".thermosphere")) && (scrlPositionBottom > getOffsetTop(".exosphere"))){
    query(".rad").innerHTML =  "";
    query(".temp").innerHTML =  "temperature: 0C to 1500C";
    query(".elev").innerHTML =  "elevation: 1000km";
    query(".atm").innerHTML =  "ATM layer: Exosphere";
  }
  else if ((scrlPositionBottom < getOffsetTop(".exosphere")) && (scrlPositionBottom > getOffsetTop(".space"))){
    query(".rad").innerHTML =  "";
    query(".temp").innerHTML =  "temperature: 10C";
    query(".elev").innerHTML =  "elevation: 10000+ km";
    query(".atm").innerHTML =  "ATM layer: Space";
  }
  else if ((scrlPositionBottom < getOffsetTop(".space")) && (scrlPositionBottom > getOffsetTop(".geo-orbit"))){
    query(".rad").innerHTML =  "";
    query(".temp").innerHTML =  "temperature: -160C to 200C";
    query(".elev").innerHTML =  "elevation: 35.786km";
    query(".atm").innerHTML =  "ATM layer: Geo orbit";
  }
};
// to call the throttle effect on the scroll listener
window.addEventListener('scroll', function(){
  timeoutID = window.setTimeout(mainFx, 300);
  timeoutID = window.setTimeout(elevatorFx, 350);
  timeoutID = window.setTimeout(sunFx, 450);
  timeoutID = window.setTimeout(infoFx, 450);
});