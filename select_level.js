// every module has an index.js which pushes level descriptions in here
var modules = [];

// some modules have dependencies (like a util.js). The index.js pushes them here to load
var dependencies = [];

var selected_levels = [];

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
		if( modules[i].icon ) {
			var imgs = level.getElementsByTagName("img");
			imgs[0].src = "modules/" + modules[i].icon;
		}
		
		container.insertBefore( level, container.firstChild );
	}

	// show the level select screen
	container.style.visibility = "visible";
}

var num_files_to_load = 0;
function select_level_waitforload() {
	
	num_files_to_load--;
	
	if( num_files_to_load == 0 ) {
	
		// setup the levels
		selected_levels.forEach( function(el, idx, arr) {
			levels.push( modules[el].get_level() );
		});

		// hide the level select screen
		document.getElementById("select_screen").style.display = "none";

		// hand off to runner
		runner_init();
	}
	
}

function select_level_start() {
	
	// gather all selected levels
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
	num_files_to_load = dependencies.length;

	// load all dependencies
	dependencies.forEach( function(el, idx, arr) {
		load_js( "modules/" + el, select_level_waitforload );
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

