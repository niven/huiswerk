// TODO: avoid loading files we've already loaded
function load_js( path, callback ) {
	
	var script = document.createElement("script");
	script.src = path

	if( callback != null ) {
		script.onload = script.onerror = script.onbeforeload = function(ev) {
			callback();
		};		
	}
	
	document.head.appendChild( script );
	
}

function clear_element( id ) {
	
	var el = document.getElementById( id );
	while( el.hasChildNodes() ) {
		el.removeChild( el.firstChild );
	}
	
}

function correction_display( el ) {
	

	var feedback_panel = document.createElement("div");
	feedback_panel.setAttribute("class", "feedback");
	// feedback_panel.appendChild( document.createTextNode( params.title ) );

	feedback_panel.appendChild( document.createTextNode( "Het was:") );
	feedback_panel.appendChild( el );
	
	return feedback_panel;
}

function rand_int( up_to_excluding ) {
	
	return Math.floor( Math.random() * up_to_excluding );
	
}
