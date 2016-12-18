// a module is a self contained group of levels around some topic (fractions, topology, etc)
// every level.js file in a a modules directory defines a level.

load_js("modules/lezen/util.js");

levels.push( new Letters_Leren() );

function Letters_Leren() {
	
	return {
		"data": function() {
			return {
				"name": "Letters Leren",
				"manual": "Noem de letter die je op het scherm ziet voordat die verdwijnt!",
				"correct_to_pass": 26,
				"fail_extra": 0,
			}
		},

		// Is the level over?
		"done": function( state ) {
			
			return state.correct >= state.correct_to_pass + state.extras;
		},

		// setup any additional state values and create any HTML needed for display on the Stage (which is the subarea where you display stuff)
		"setup": function( state, stage_element ) {
	
			state.correct = 0;
			state.fail = 0;
			state.extras = 0;
			state.stage = stage_element; // this is where we run the level (some HTML element (most likely a div))

			var letterbox = document.createElement("p");
			letterbox.setAttribute("id", "lezen_letterbox")
			// binding the checker to this object, and then later calling it after user clicks on something
			var hnd = runner_check_answer.bind( this );
			var process_result_handler = function( event ) {
				hnd( event.target, state );
			}
			letterbox.onclick = process_result_handler;
			state.stage.appendChild( letterbox );

		},

		// runs in every iteration to create a question/sum
		"make": function( state ) {

			// avoid the same letter twice in a row
			var next_letter = state.letter;
			while( next_letter == state.letter ) {
				next_letter = get_letter_dutch();
			}
			state.letter = next_letter;
			
			document.getElementById("lezen_letterbox").innerHTML = state.letter;
		},

		// the runner check answer function calls this to figure out if the answer is correct
		// here also put some stuff in the state like the correct answer.
		// element: usually the element clicked on, or an input field. This allows answering by clicking on something. (just store extra data in the element)
		// OUT: result => { is_correct: true|false, other_optional_stuff_you_want_to_keep_track_of: ?? }
		"result": function( element, state ) {
			
			var result = {};
			
			result.is_correct = true;
			result.correct_answer = state.letter;
			
			return result;
		},

		// return an HTML element that gives feedback when a wrong anser was given.
		// e.g., <span>2+3 = 5, not 16!</span> 
		"create_correction": function( state ) {
			
			return null;
		},

	};
}
