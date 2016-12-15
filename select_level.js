// every module has an index.js which pushes level descriptions in here
var modules = [];

function select_level_run() {

	// create a fragment for every module-level

	// grab the html fragment and container
	var base = document.getElementById("select_level_fragment");
	var container = document.getElementById("select_screen");
	
	for( var i=0; i<modules.length; i++ ) {
		var level = base.cloneNode( true );
		
		console.log(level.firstChild, modules[i]);
		level.firstChild.textContent = modules[i].title;
		level.setAttribute("module_index", i);
		level.style.visibility = "visible";
		
		container.insertBefore( level, container.firstChild );
	}

	// show the level select screen
	container.style.visibility = "visible";
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
	console.log(selected_levels);
	// error if none were selected
	if( selected_levels.length == 0 ) {
		show_modal("Selecteer levels", "Selecteer eerst de levels om te oefenen", null);
		return;
	}
	
	// hand off to runner

	// hide the level select screen
	document.getElementById("select_screen").style.display = "none";
	
}

function select_level_toggle( element ) {
	var classNames = element.getAttribute("class"); 
	console.log(classNames);
	if( classNames == "level" ) {
		element.setAttribute("class", "level selected");
	} else {
		element.setAttribute("class", "level");
	}
}

