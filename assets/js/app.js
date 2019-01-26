'use strict';
 // Open offsite navigation.
 $('#nav-expander').on('click', function(e) {
    e.preventDefault();
    $('nav').toggleClass('nav-expanded');
});

// Close offsite navigation.
 $('.menu .close').on('click', function(e) {
    e.preventDefault();
    $('nav').toggleClass('nav-expanded');
});

// Close offsite navigation after user click on an link in navigation.
$('.menu  a').on('click', function(e) {
    e.preventDefault();
    $('nav').removeClass('nav-expanded');
});


//Calculate full with of jumbotron.
 function homeFullScreen() {

    var homeSection = $('.home');
    var windowHeight = $(window).outerHeight();

    if (homeSection.hasClass('home-fullscreen')) {

        $('.home-fullscreen').css('height', windowHeight);
    }
}

 //Load details of single project from portfolio.
 function openProject() {

    var portfolioItem = $('.portfolio-item  a');
    var singleProject = $('#single-project');
    
    portfolioItem.click(function () {

        var link = $(this).attr('href');
        $('html, body').animate({
            scrollTop: singleProject.offset().top - 30
        }, 500);

        singleProject.empty();

        setTimeout(function () {
            singleProject.load(link, function (response, status) {
                if (status === "error") {
                    alert("An error");
                } else {
                    singleProject.slideDown(500);

                    var closeProject = $('#close-project');
                    closeProject.on('click', function () {
                        singleProject.slideUp(500);
                        setTimeout(function () {

                            singleProject.empty();
                        }, 500);
                    });
                }
            });
        }, 500);
        return false;
    });
}
//Initialization
$(window).load(function () {
    openProject();
    homeFullScreen();

    smoothScroll.init();
});


//What happen on window resize
$(window).resize(function () {
    homeFullScreen();
});



//Set langitude and latidute for your location
var lat = -8.827042;
var lng = 13.246121;
var myLangLat = new google.maps.LatLng(lat, lng);

google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
    var map = this;
    var ov = new google.maps.OverlayView();
    ov.onAdd = function() {
        var proj = this.getProjection();
        var aPoint = proj.fromLatLngToContainerPixel(latlng);
        aPoint.x = aPoint.x+offsetX;
        aPoint.y = aPoint.y+offsetY;
        map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
    }; 
    ov.draw = function() {}; 
    ov.setMap(this); 
};

/*
 * This function initialize google map. More info on 
 * https://developers.google.com/maps/documentation/javascript/
 */
 function initializeMap() {

 	var mapOptions = {
 		zoom: 13,
 		zoomControl: false,
 		scaleControl: false,
 		scrollwheel: false,
 		draggable: false,
 		center: myLangLat,
 		mapTypeControlOptions: {
 			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
 		},
 		styles: [
 		{
 			"featureType": "administrative.locality",
 			"elementType": "all",
 			"stylers": [
 			{
 				"hue": "#2c2e33"
 			},
 			{
 				"saturation": 7
 			},
 			{
 				"lightness": 19
 			},
 			{
 				"visibility": "on"
 			}
 			]
 		},
 		{
 			"featureType": "landscape",
 			"elementType": "all",
 			"stylers": [
 			{
 				"hue": "#ffffff"
 			},
 			{
 				"saturation": -100
 			},
 			{
 				"lightness": 100
 			},
 			{
 				"visibility": "simplified"
 			}
 			]
 		},
 		{
 			"featureType": "poi",
 			"elementType": "all",
 			"stylers": [
 			{
 				"hue": "#ffffff"
 			},
 			{
 				"saturation": -100
 			},
 			{
 				"lightness": 100
 			},
 			{
 				"visibility": "off"
 			}
 			]
 		},
 		{
 			"featureType": "road",
 			"elementType": "geometry",
 			"stylers": [
 			{
 				"hue": "#bbc0c4"
 			},
 			{
 				"saturation": -93
 			},
 			{
 				"lightness": 31
 			},
 			{
 				"visibility": "simplified"
 			}
 			]
 		},
 		{
 			"featureType": "road",
 			"elementType": "labels",
 			"stylers": [
 			{
 				"hue": "#bbc0c4"
 			},
 			{
 				"saturation": -93
 			},
 			{
 				"lightness": 31
 			},
 			{
 				"visibility": "on"
 			}
 			]
 		},
 		{
 			"featureType": "road.arterial",
 			"elementType": "labels",
 			"stylers": [
 			{
 				"hue": "#bbc0c4"
 			},
 			{
 				"saturation": -93
 			},
 			{
 				"lightness": -2
 			},
 			{
 				"visibility": "simplified"
 			}
 			]
 		},
 		{
 			"featureType": "road.local",
 			"elementType": "geometry",
 			"stylers": [
 			{
 				"hue": "#e9ebed"
 			},
 			{
 				"saturation": -90
 			},
 			{
 				"lightness": -8
 			},
 			{
 				"visibility": "simplified"
 			}
 			]
 		},
 		{
 			"featureType": "transit",
 			"elementType": "all",
 			"stylers": [
 			{
 				"hue": "#e9ebed"
 			},
 			{
 				"saturation": 10
 			},
 			{
 				"lightness": 69
 			},
 			{
 				"visibility": "on"
 			}
 			]
 		},
 		{
 			"featureType": "water",
 			"elementType": "all",
 			"stylers": [
 			{
 				"hue": "#e9ebed"
 			},
 			{
 				"saturation": -78
 			},
 			{
 				"lightness": 67
 			},
 			{
 				"visibility": "simplified"
 			}
 			]
 		}
 		]
 	};

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setCenterWithOffset(myLangLat, 0, -55);

}
google.maps.event.addDomListener(window, 'load', initializeMap);

google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenterWithOffset(myLangLat, 0, -55);
});