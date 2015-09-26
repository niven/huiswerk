// show a little box in the feedback panel with some text and nice UX
function show_feedback( type, element ) {
	
	var feedback_panel = document.getElementById("feedback");
	
	var fb = document.createElement("div");
	
	fb.classList.add("feedback_item");
	fb.classList.add("feedback_" + type);
	fb.appendChild( element );
	
	// append at the top
	feedback_panel.insertBefore( fb,	feedback_panel.firstChild );
	// apply the fade after a little so it doesn't skip the transition
	window.setTimeout( function() { fb.classList.add("feedback_fadeout"); }, 100 );
	
	// clean up the item after it has disappeared
	fb.addEventListener("transitionend", function() { feedback_panel.removeChild(fb); }, true);
}

function update_score( points ) {
	
	var pts = document.getElementById("points");
	pts.innerHTML = parseInt(pts.innerHTML) + points;
	
	var points_blip = document.getElementById("points_blip");
	if( points_blip != null ) {
		document.getElementById("score_bliparea").removeChild(points_blip);
	}
	
	points_blip = document.createElement("span");
	points_blip.setAttribute("id", "points_blip");
	document.getElementById("score_bliparea").appendChild( points_blip );
	points_blip.setAttribute("class", "blip");

	if( points < 0 ) {
		points_blip.innerHTML = points;
		points_blip.style.color = "orangered";
	} else {
		points_blip.innerHTML = "+" + points;
		points_blip.style.color = "gold";
	}
	
	// apply the fade after a little so it doesn't skip the transition
	window.setTimeout( function() { points_blip.classList.add("blip_fade"); }, 100 );
	// clean up the item after it has disappeared
	points_blip.addEventListener("transitionend", function() { document.getElementById("score_bliparea").removeChild(points_blip); }, true);
}

function set_level( level ) {
	document.getElementById("level").innerHTML = level;
}

function set_title( text ) {
	document.getElementById("title").innerHTML = text;
}

function update_progress( num_done, total ) {
	
	var bar = document.getElementById("bar");
	num_done = num_done > total ? total : num_done;
	var percentage = 100*num_done/total;
	bar.style.width = percentage + "%";
	
	if( percentage < 40 ) {
		document.getElementById("progressbar_track").setAttribute("class", "red");
	} else if( percentage < 75 ) {
		document.getElementById("progressbar_track").setAttribute("class", "orange");		
	} else {
		document.getElementById("progressbar_track").setAttribute("class", "green");		
	}
	
	if( num_done == total ) {
	   bar.style.borderTopRightRadius = "20px";
	   bar.style.borderBottomRightRadius = "20px";
	}
}

function show_modal( title, text, callback_after_close ) {
	document.getElementById("modal_title").innerHTML = title;
	document.getElementById("modal_text").innerHTML = text;
	document.getElementById("md-close-button").onclick = function() {
		document.getElementById("modal-1").classList.remove("md-show");
		callback_after_close();
	}
	
	document.getElementById("modal-1").classList.add("md-show");
}

