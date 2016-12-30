
function Different_Fraction() {
	
	return {
		"data": function() {
			return {
				"name": "Welke breuk is anders?",
				"manual": "Nu krijg je 3 breuken te zien.<br>Er zijn steeds 2 breuken hetzelfde, kies de breuk die anders is.<br>Bijvoorbeeld: 1/2 is hetzelfde als 2/4",
				"correct_to_pass": 15,
				"fail_extra": 3,
			}
		},

		"done": function( state ) {
			
			return state.correct >= state.correct_to_pass + state.extras;
		},

		"setup": function( state, stage_element ) {
	
			state.correct = 0;
			state.fail = 0;
			state.extras = 0;
			state.stage = stage_element;
	
			// binding the checker to this object, and then later calling it after user clicks on something
			var hnd = runner_check_answer.bind( this );
			var onclick_handler = function( event ) {
				hnd( event.target, state );
			}
	
			add_fraction_canvas( state.stage, "fraction_0", 200, onclick_handler );
			add_fraction_canvas( state.stage, "fraction_1", 200, onclick_handler );
			add_fraction_canvas( state.stage, "fraction_2", 200, onclick_handler );

		},

		"make": function( state ) {

			state.fraction_a = state.fraction_c = Rational( 10 );
			do {
				state.fraction_c = Rational( 10 );
			} while( rational_compare( state.fraction_a, state.fraction_c ) == 0 );

			state.fraction_b = {};
			state.fraction_b.num = state.fraction_a.num;
			state.fraction_b.den = state.fraction_a.den;
			
			// now a==b and c is different
			// now change the base of b (prefer simplification)
			state.fraction_b = rational_simplify( state.fraction_b );
			if( state.fraction_b.den == state.fraction_a.den ) {
				var factor = 1 + Math.ceil( Math.random() * 3 );
				state.fraction_b.num *= factor;
				state.fraction_b.den *= factor;
			}

			// shuffle locations
			var fractions = [0, 1, 2]; 
			fractions = shuffle( fractions  );

			draw_fraction_as_circle( document.getElementById('fraction_' + fractions[0]), state.fraction_a, true );
			draw_fraction_as_circle( document.getElementById('fraction_' + fractions[1]), state.fraction_b, true );
			draw_fraction_as_circle( document.getElementById('fraction_' + fractions[2]), state.fraction_c, true );
			state.correct_answer = 'fraction_' + fractions[2]; // where we put the different one

		},

		"result": function( element, state ) {
			
			var result = {};
			
			result.is_correct = element.id == state.correct_answer;
			result.correct_answer = state.fraction_c;
			
			return result;
		},
		
		"create_correction": function( state ) {
			return create_correction_generic( state.fraction_c );
		},
		

	};
}
