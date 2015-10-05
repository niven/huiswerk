levels.push( new Level0() );

function Level0() {
	
	return {
		"data": function() {
			return {
				"name": "Grootste Breuk",
				"manual": "Je ziet steeds 2 breuken, klik op de breuk die het grootst is.<br>Voorbeeld: &frac12; is groter dan &frac14;",
				"correct_to_pass": 10,
				"fail_extra": 5,
			}
		},

		"done": function( state ) {
			
			return state.correct >= state.correct_to_pass + state.extras;
		},

		"setup": function( state, stage_element ) {
	
			state.correct = 0;
			state.fail = 0;
			state.extras = 0;
			state.stage = stage_element; // this is where we run the level (some HTML element (most likely a div))

			// binding the checker to this object, and then later calling it after user clicks on something
			var hnd = check_answer.bind( this );
			var onclick_handler = function( event ) {
				hnd( event.target, state );
			}
	
			add_fraction_canvas( state.stage, "fraction_0", 300, onclick_handler );
			add_fraction_canvas( state.stage, "fraction_1", 300, onclick_handler );

		},

		"make": function( state ) {

			state.fractions = unique_rationals_array( 2, 10 );
			state.largest_fraction = state.fractions.sort( rational_compare )[1];

			state.fractions.forEach( function(f, idx) {
				draw_fraction_as_circle( document.getElementById('fraction_' + idx), f, true );
			});
		},

		"result": function( element, state ) {
			
			var result = {};
			
			var cmp = rational_compare(state.fractions[0], state.fractions[1]);
			
			result.is_correct = (element.id == "fraction_0" && cmp == 1) || (element.id == "fraction_1" && cmp == -1);
			result.correct_answer = cmp == 1 ? state.fractions[0] : state.fractions[1];
			
			return result;
		},

	};
}
