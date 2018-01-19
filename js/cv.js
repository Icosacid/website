// Globals
let CV = {};

/**
 * Fills the DOM with cv.xml
 * @param {Function} extraCallback Function called after the DOM is filled
 */
CV.loadCV = (extraCallback) => {

	jQuery
	.get("cv.xml", {})
	.done(function(data) {
		
		let tempo = 0;
		let enable = 0;
		
		// 1 - Intro
		//// Intro lines, one after the other
		tempo += 2000;// fadeOut time + 500ms
		jQuery('.cvcore .intro p').each(function() {
			////// Fade in
			tempo += 300;
			let self = this;
			setTimeout(function() {
				jQuery(self).css('display', 'inherit').animate({
					opacity: 1
				}, 2000);
			}, tempo * enable);
		});
		
		// 2 - Enjoy
		tempo += 2500;
		setTimeout(function() {
			jQuery('.cvcore .enjoy').css('display', 'inherit').animate({
				opacity: 1
			}, 1000);
		}, tempo * enable);
		
		// 3 - Abroad
		tempo += 2000;
		setTimeout(function() {
			jQuery('.cvcore .abroad').css('display', 'inherit').animate({
				opacity: 1
			}, 1000);
		}, tempo * enable);
		
		// 4 - Schools
		tempo += 4000;
		setTimeout(function() {
			jQuery('.cvcore .schools').css('display', 'inherit').animate({
				opacity: 1
			}, 1000);
		}, tempo * enable);
		
		// 5 - Webskills
		tempo += 1500;
		setTimeout(function() {
			jQuery('.cvcore .webskills').css('display', 'inherit').animate({
				opacity: 1
			}, 1000);
		}, tempo * enable);
		
		// 6 - CV title
		tempo += 5000;
		setTimeout(function() {
			jQuery('.cvcore .cake').css('display', 'flex').animate({
				opacity: 1
			}, 1000);
		}, tempo * enable);
		
		// 7 - CV slices (from XHR) one after the other
		tempo += 0;
		jQuery(data).find('slice').each(function() {
		
			tempo += 700;
			
			let sliceHTML = "";
			let title = jQuery(this).find('title').text();
			let institution = jQuery(this).find('institution').text();
			let place = jQuery(this).find('place').text();
			let when = jQuery(this).find('when').text();
			let year = jQuery(this).find('year').text();
			let what = jQuery(this).find('what').text();
			let skill = jQuery(this).find('skill').text();
			
			sliceHTML += "<div class='slice'>";
			sliceHTML +=   "<div class='left-side'>";
			sliceHTML +=     "<p class='year'>" + year + "</p>";
			sliceHTML +=     "<p class='skill'>" + skill + "</p>";
			sliceHTML +=   "</div>";
			sliceHTML +=   "<div class='right-side'>";
			sliceHTML +=     "<h5>" + title + "</h5>";
			let sliceBit = institution;
			sliceBit += (place !== "" && when !== "" ? " - " + place + " (" + when + ")" : "");
			sliceHTML +=     "<p class='institution'>" + sliceBit + "</p>";
			sliceHTML +=     "<p class='what'>" + what + "</p>";
			sliceHTML +=   "</div>";
			sliceHTML += "</div>";
			
			setTimeout(function() {
				// DOM fill
				jQuery('.cvcore .cake').append(sliceHTML);
				// Fade in
				jQuery('.cvcore .slice').last().css('display', 'flex').animate({
					opacity: 1
				}, 1000);
			}, tempo * enable);
			
		});
		
		// 8 - Recommendations
		tempo += 4000;
		setTimeout(function() {
			jQuery('.cvcore .recom').css('display', 'inherit').animate({
				opacity: 1
			}, 1000);
		}, tempo * enable);
		
		extraCallback();
	});
};

/**
 * Submit handler to the form showing CV
 */
CV.keyCheckForCV = () => {
	jQuery("form.showcv").submit(function(event) {

		// Stop form from submitting normally
		event.preventDefault();
		// Now we're talking.
		
		// Define regex for key validation. Yeah that's where you can hack into my code to see my CV, derp.
		// Actually no, regex suck.
		let input = jQuery('#cv .password input').val();
		let shallPass = (input.charAt(input.length - 1) == 3);
		
		// Loading icon start
		let randomTimeout = 500 + 500 * Math.random();
		let jShow = jQuery('#cv .show');
		let button = "<input type='submit' value='Show CV'>";
		let loadDiv = "<div class='load'></div>";
		
		// Loading icon will start to whirl in both cases
		jShow.html(loadDiv);
		
		if (shallPass) {
			// Loading
			// Artificially boost timeout
			randomTimeout += 1000;
			setTimeout(function() {
				// Empty DOM nodes for password entering
				jQuery('form.showcv, p#invalid').fadeOut(500, function() {
					// Fill DOM with CV
					loadCV();
				});
				
			}, randomTimeout);
		} else {
			setTimeout(function() {
				// Restore form button
				jShow.html(button);
				
				// Feedback message of invalid key
				invalidKeyAnimation();
				
			}, randomTimeout);
		}
	});
};

/**
 * Submit handler to the form showing CV, without any password
 */
CV.showCVwithoutKey = () => {
	jQuery("form.showcv").submit(function(event) {

		// Stop form from submitting normally
		event.preventDefault();
		// Now we're talking.
		
		// Loading icon start
		let randomTimeout = 500 + 500 * Math.random();
		let jShow = jQuery('#cv .show');
		let button = "<input type='submit' value='Show CV'>";
		let loadDiv = "<div class='load'></div>";
		
		// Loading icon will start to whirl in both cases
		jShow.html(loadDiv);
		
		// Loading
		setTimeout(function() {
			// Empty DOM nodes for CV show (here, button only)
			jQuery('form.showcv').fadeOut(500, function() {
				// Fill DOM with CV
				loadCV();
			});
		}, randomTimeout);
	});
};

/**
 * User feedback that the entered key is wrong
 */
CV.invalidKeyAnimation = () => {
	// Insert feedback
	jQuery('form.showcv').after("<p id='invalid'>Invalid key, please try again.</p>");
	
	// Remove feedback after a while
	setTimeout(function() {
		// Fade out
		jQuery('p#invalid').fadeOut(3000, function() {
			// Then take out
			jQuery(this).remove();
		});
	}, 1500);
	
};

/**
 * Initializer
 */
CV.go = () => {
    CV.loadCV(() => {
		Projects.showCVwithoutKey();
	});
};
