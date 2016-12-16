// every module has an index.js which pushes level descriptions in here
var modules = [];

function select_level_run() {

	// create a fragment for every module-level

	// grab the html fragment and container
	var base = document.getElementById("select_level_fragment");
	var container = document.getElementById("select_screen");
	
	for( var i=0; i<modules.length; i++ ) {
		var level = base.cloneNode( true );
		
		level.setAttribute("id", "level_" + i );
		level.firstChild.textContent = modules[i].title;
		level.setAttribute("module_index", i);
		level.style.visibility = "visible";
		
		container.insertBefore( level, container.firstChild );
	}

	// show the level select screen
	container.style.visibility = "visible";
}

var num_levels_to_load = 0;
function select_level_waitforload() {
	
	num_levels_to_load--;
	
	if( num_levels_to_load == 0 ) {
	
		// hide the level select screen
		document.getElementById("select_screen").style.display = "none";

		// hand off to runner
		runner_init();
		
	}
	
}

function select_level_start() {
	
	// gather all selected levels
	var selected_levels = [];
	var select_screen = document.getElementById("select_screen");
	var levels = select_screen.getElementsByTagName("div"); // HTMLCollection
	for( var i=0; i<levels.length; i++ ) {
		if( levels.item(i).getAttribute("class") == "level selected" ) {
			selected_levels.push( levels.item(i).getAttribute("module_index") );
		}
	}	

	// error if none were selected
	if( selected_levels.length == 0 ) {
		show_modal("Selecteer levels", "Selecteer eerst de levels om te oefenen", null);
		return;
	}
	num_levels_to_load = selected_levels.length;

	// load the required levels
	selected_levels.forEach( function(el, idx, arr) {
		console.log( "Loading " + modules[el].title );
		load_js( "modules/" + modules[el].level_file, select_level_waitforload );
	});
	
}

function select_level_toggle( element ) {
	var classNames = element.getAttribute("class"); 

	if( classNames == "level" ) {
		element.setAttribute("class", "level selected");
	} else {
		element.setAttribute("class", "level");
	}
}

