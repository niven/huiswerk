// TODO: avoid loading files we've already loaded
function load_js( path, callback ) {
	
	console.log("Loading " + path );

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

// Fisher-Yates
function shuffle( array ) {
	
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


function array_subset( array, count, exclude ) {
	
	var result;
	do {
		array = shuffle(array);
		result = array.slice(0, count);
	} while( result.includes(exclude) );
	
	return result;
}
