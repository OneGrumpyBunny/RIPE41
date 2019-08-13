
function isValid(field1,field2,field3,field4,field5) {
	
	if ((field1 == "" || field2 == "" || field3 == "" || field4 == "" || field5 == "")){
		return false;
	} else {
		console.log("Returning True");
		return true;
	}
}


function saveReg (name,title,org,location,dates) {
	var data = {name: name, title: title, org: org, location: location, dates: dates};
	$.ajax({
	url:"../cfm/saveReg.cfm",
	type: "get",
	data: data,
	success: function() {
	  console.log("updated! " + name + " " + title + " " + org + " " + location + " " + dates);
	}
	});
}

function saveIdea (name,title,org,summary,length) {
	var data = {name: name, title: title, org: org, summary: summary, length: length};
	$.ajax({
	url:"../cfm/saveIdea.cfm",
	type: "get",
	data: data,
	success: function() {
	  console.log("updated! " + name + " " + title + " " + org + " " + summary + " " + length);
	}
	});
}
$(document).ready(function() {
	
	 $("#registerBtn").click(function() {
		// collect form data 
		var name=$("input[name=signUpName]").val();
		var title=$("input[name=signUpTitle").val();
		var org=$("input[name=signUpOrg").val();
		var location=$("input[name=signUpLocation").val();
		var dates=$("input[name=signUpDates]").val();

		if (isValid(name,title,org,location,dates)) {
		 // save form data to database
		 //	saveReg(name,title,org,location,dates);

			// on screen feedback that registration received
			$(".regformfront .form-group").hide();
			$("#registerBtn").hide();
			$(".regReceived").show();
		} else {
			$(".regRequired").show().css("color","#d21616");
		}
	 });

	 $("#ideasBtn").click(function() {
		// collect form data 
		var name=$("input[name=ideasName]").val();
		var title=$("input[name=ideasTitle").val();
		var org=$("input[name=ideasOrg").val();
		var summary=$("textarea[name=ideasSummary").val();
		var length=$("input[name=ideasLength]").val();

		if (isValid(name,title,org,summary,length)) {
			// save form data to database
			// saveIdea(name,title,org,summary,length);

			// on screen feedback that registration received
			$(".ideaformfront .form-group").hide();
			$("#ideasBtn").hide();
			$(".ideaReceived").show();
		}else {
			$(".ideaRequired").show().css("color","#d21616");
		}
	 });

	 $(".ideaReceived p").click(function() {
		$(".ideaReceived").hide();
		$("textarea[name=ideasSummary]").val("");
		$("input[name=ideasLength").val("");
		$(".ideaformfront .form-group").show();
		$("#ideasBtn").show();
	 });

	// clear warnings as user types responses to form questions
	 $("input[type=text]").keyup(function() {
		$(".regRequired").hide();
		$(".ideaRequired").hide();
	 });
	 $("textarea").keyup(function() {
		$(".regRequired").hide();
		$(".ideaRequired").hide();
	 });

	 // Pre populate similar fields in the two forms to prevent having to type it over

	 $("input[name=signUpName").on("change", function() {
		$("input[name=ideasName").val($("input[name=signUpName").val())
	 });

	 $("input[name=signUpTitle").on("change", function() {
		$("input[name=ideasTitle").val($("input[name=signUpTitle").val())
	 });

	 $("input[name=signUpOrg").on("change", function() {
		$("input[name=ideasOrg").val($("input[name=signUpOrg").val())
	 });

	 $("input[name=ideasName").on("change", function() {
		$("input[name=signUpName").val($("input[name=ideasName").val())
	 });

	 $("input[name=ideasTitle").on("change", function() {
		$("input[name=signUpTitle").val($("input[name=ideasTitle").val())
	 });

	 $("input[name=ideasOrg").on("change", function() {
		$("input[name=signUpOrg").val($("input[name=ideasOrg").val())
	 });
	
});

;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#offcanvas, .js-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="offcanvas" />');
		$('#page').prepend('<a href="#" class="js-nav-toggle nav-toggle nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#offcanvas').append(clone2);

		$('#offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".loader").fadeOut("slow");
	};

	/*var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};*/

	/*var counterWayPoint = function() {
		if ($('#counter').length > 0 ) {
			$('#counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};*/

	/*var sliderMain = function() {
		
	  	$('#hero .flexslider').flexslider({
			animation: "slide",

			easing: "swing",
			direction: "vertical",

			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	// $('#hero .flexslider .slides > li').css('height', $(window).height());	
	  	// $(window).resize(function(){
	  	// 	$('#hero .flexslider .slides > li').css('height', $(window).height());	
	  	// });

	}; */

	/*var parallax = function() {

		if ( !isMobile.any() ) {
			$(window).stellar({
				horizontalScrolling: false,
				hideDistantElements: false, 
				responsive: true

			});
		}
	};*/

	/*var testimonialCarousel = function(){
		
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true
		});

	};*/

	
	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		/*counterWayPoint();
		counter();
		parallax();
		sliderMain();
		testimonialCarousel();*/
	});


}());