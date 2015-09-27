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
	
			add_fraction_canvas( state.stage, "fraction_a", 300, onclick_handler );
			add_fraction_canvas( state.stage, "fraction_b", 300, onclick_handler );

		},

		"make": function( state ) {

			state.fraction_a = state.fraction_b = Rational( 10 );

			do {
				state.fraction_b = Rational( 10 );
			} while( rational_compare( state.fraction_a, state.fraction_b ) == 0 );
	
			state.largest_fraction = ( state.fraction_b.den * state.fraction_a.num ) > ( state.fraction_a.den * state.fraction_b.num ) ? "A" : "B";

			draw_fraction_as_circle( document.getElementById('fraction_a'), state.fraction_a, true );
			draw_fraction_as_circle( document.getElementById('fraction_b'), state.fraction_b, true );
		},

		"result": function( element, state ) {
			
			var result = {};
			
			var cmp = rational_compare(state.fraction_a, state.fraction_b);
			
			result.is_correct = (element.id == "fraction_a" && cmp == 1) || (element.id == "fraction_b" && cmp == -1);
			result.correct_answer = cmp == 1 ? state.fraction_a : state.fraction_b;
			
			return result;
		},

	};
}
