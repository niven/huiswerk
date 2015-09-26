/*
This is the code that runs the show. It knows about levels and the "stage".
It manages the UI and runs every level in turn, giving it access to the stage.

Generally:
prep
take a level and let it do setup
let the level run an activity
update the UI etc
repeat until level is over
do the next one etc.

This means that this is not a controller: control is handed off betweent the level and the runner.
To make this work State is passed around.

Note: since this holds some global vars and the Levels array the levels add themselves into, this must be loaded first

*/

var levels = [];
var level_number = 0;
var current_level = null;
var current_data = null;

var clock =  null;
var intervalID;

var count = 0;

function init() {

	clock = Clock( document.getElementById("clock") );
	clock.pause();
	intervalID = window.setInterval( function() { clock.display(); }, 100 );

	update_progress( 0, 1 );

	next_level();
}

function next_level() {

	current_level = levels.shift();
	current_data = current_level.data();

	show_modal("Level " + level_number  + ": " + current_data.name, current_data.manual, start_level );

	set_level( level_number++ );
}

function start_level() {

	set_title( current_data.name );
	
	current_level.setup( current_data, document.getElementById("main") );
	
	run_level( current_data );
	clock.start();
}

function step_done( state ) {
	
	update_score( state.points_earned );
	
	update_progress( state.correct, state.correct_to_pass + (state.fail_extra * state.fail) );
	
	run_level( state );	
}

function run_level( state ) {
	
	if( current_level.done( state ) ) {
		
		clock.pause();
		next_level();
		
	} else {
		current_level.make( state );
	}
	
}