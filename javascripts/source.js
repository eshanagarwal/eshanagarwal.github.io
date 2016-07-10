var colors = ["#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#3498db"];
var skillPercents = ["90%", "70%", "60%", "80%", "35%"];
var colorTransitionTime = 3000;
var timeBetweenTypedText = 2000;
var scrollPosition;
var skillsShowing = false;
var xsSize = false;
var smallSize = false;

function bodyLoad() {
	typeText();
	var totalColorTime = colors.length * colorTransitionTime;
	rotateColors();
	makeSmallonSmall(); //adjust for mobile if necessary
	setInterval( function() { 
		rotateColors(); 
	}, totalColorTime);
}

function rotateColors() {
	console.log("running rotate colors");
	for (var i = 0; i < colors.length; i++) {

		$("#home").animate({
			backgroundColor: colors[i]
		}, colorTransitionTime);

		$(".navButton").animate({
			color: colors[i]
		}, colorTransitionTime);

		$("#name").animate({
			color: colors[i]
		}, colorTransitionTime);

		$(".skillMeters").animate({
			backgroundColor: colors[i]
		}, colorTransitionTime);
	};
}

function typeText() {
      $(".home-title-text").typed({
        strings: [" ^1000 Hey there, I'm Eshan!", " ^1000 Thanks for visiting my site!"],
        typeSpeed: 50,
        backDelay: 2500,
        loop: true
      });
}

function animateSkillsMeters(id, percentage) {
	var meters = document.getElementsByClassName("skillMeters");
	console.log(meters.length);
	for (var i = 0; i < meters.length; i++) {
		$(meters[i]).animate({
			width: skillPercents[i]
		}, {duration: 2000, queue: false});
	};
	
}

//adjust for smaller window sizes
function makeSmallonSmall() {
	var width = $(window).width();
	console.log(width);

	if (width < 990) {
		smallSize = true;
		$(".skillsTitle").css("text-align", "center");
		$(".skillsTitle").css("font-size", "20px");
		$(".meter").css("margin", "0 auto");
	} else {
		if (smallSize == true) {
			$(".skillsTitle").css("text-align", "right");
			$(".meter").css("margin-left", "0px");
			$(".skillsTitle").css("font-size", "1.75vw");
			smallSize = false;
		}
	}

	if (width < 765) {
		console.log("adding css elements");
		xsSize = true;
		$("#image-holder").css("margin-top", "20px").css("text-align", "center");
		$("#title-holder").css("margin-top", "-100px").css("margin-bottom", "25px");
		$(".header").css("visibility","hidden");
	} else {
		if (xsSize == true) {
			console.log("undoing css elements");
			$("#image-holder").css("margin-top", "110px").css("text-align", "right");
			$("#title-holder").css("margin-top", "0px").css("margin-bottom", "0px");
			$(".skillsTitle").css("text-align", "right");
			$(".header").css("visibility","visible");
			xsSize = false;
		}
	}
}

function scrollToLink(id) {
	console.log($("#projects").offset().top);
	var scrollTo = $(id).offset().top - 50;
	$('html, body').animate({
          scrollTop: scrollTo
     }, 700);
}

function animatePictureFrame() {
	if ($(window).width() > 990) { //large window screen
		$("title-holder").css("display", "none");
		$("#image-holder").removeClass("col-md-4").addClass("col-md-12");
		$("#image-holder").css("float", "none");
		$(".hiddenFrame").css("display", "block").css("visibility", "visible").css("float", "none");
	}
}

$(window).scroll(function() {
	scrollPosition = $(window).scrollTop();
	var oValue = scrollPosition / 500;
	$(".header").css({
		opacity: oValue
	});

	var hT = $('.skills-meters').offset().top,
       hH = $('.skills-meters').outerHeight(),
       wH = $(window).height(),
       wS = $(this).scrollTop();
   		if (wS > (hT+hH-wH)){
   			if (skillsShowing == false) {
    			animateSkillsMeters();
    			skillsShowing = true;
    		}
   		}
 
});

$(window).resize(function() {
	makeSmallonSmall();

});




