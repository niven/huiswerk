// TODO: avoid loading files we've already loaded
function load_js( path, callback ) {
	
	console.log( "Loading JS: " + path );
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

