$(document).ready(function() {
    $("#what-content").hide();
    $("#how-content").hide();
    $("#opponents-content").hide();
    $("#opponents-reasons-content").hide();
    $("#proponents-content").hide();
    $("#proponents-reasons-content").hide();

    var fadeAnimation = 1000;

    var showContent = function (index) {
	if(index === 2) { $('#what-content').fadeIn(fadeAnimation); }
	if(index === 3) { $('#how-content').fadeIn(fadeAnimation); }
	if(index === 4) { $('#opponents-content').fadeIn(fadeAnimation); }
	if(index === 5) { $('#opponents-reasons-content').fadeIn(fadeAnimation); }
	if(index === 6) { $('#proponents-content').fadeIn(fadeAnimation); }
	if(index === 7) { $('#proponents-reasons-content').fadeIn(fadeAnimation); }
    };

    var hideContent = function(index) {
	if(index === 2) { $('#what-content').hide(fadeAnimation); }
	if(index === 3) { $('#how-content').hide(fadeAnimation); }
	if(index === 4) { $('#opponents-content').hide(fadeAnimation); }
	if(index === 5) { $('#opponents-reasons-content').hide(fadeAnimation); }
	if(index === 6) { $('#proponents-content').hide(fadeAnimation); }
	if(index === 7) { $('#proponents-reasons-content').hide(fadeAnimation); }
    };
    
    var onEnter = function(index) {
	showContent(index);
    };

    var onLeave = function(index, direction) {
	hideContent(index);
	onEnter(direction);
    };

    $('#fullpage').fullpage({
	css3: true,
	navigation: true,
	onLeave: onLeave
    });

});
