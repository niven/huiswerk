levels.push( new Level1() );

function Level1() {
	
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
	
			// can't use 'this' in the onclickhandler definition since it captures a different one when executed
			var check_function = this.check;
			var onclick_handler = function( event ) {
				check_function( event.target, state );
			}
	
			add_fraction_canvas( "main", "fraction_a", 200, onclick_handler );
			add_fraction_canvas( "main", "fraction_b", 200, onclick_handler );
			add_fraction_canvas( "main", "fraction_c", 200, onclick_handler );

		},

		"make": function( state ) {

			state.fraction_a = state.fraction_c = Rational( 10 );
			do {
				state.fraction_c = Rational( 10 );
			} while( Cmp( state.fraction_a, state.fraction_c ) == 0 );

			state.fraction_b = {};
			state.fraction_b.num = state.fraction_a.num;
			state.fraction_b.den = state.fraction_a.den;
			
			// now a==b and c is different
			// now change the base of b (prefer simplification)
			state.fraction_b = Simplify( state.fraction_b );
			if( state.fraction_b.den == state.fraction_a.den ) {
				var factor = 1 + Math.ceil( Math.random() * 3 );
				state.fraction_b.num *= factor;
				state.fraction_b.den *= factor;
			}

			// shuffle locations
			var fractions = ["a", "b", "c"]; 
			fractions = shuffle( fractions  );

			draw_fraction_as_circle( document.getElementById('fraction_' + fractions[0]), state.fraction_a, true );
			draw_fraction_as_circle( document.getElementById('fraction_' + fractions[1]), state.fraction_b, true );
			draw_fraction_as_circle( document.getElementById('fraction_' + fractions[2]), state.fraction_c, true );
			state.correct_answer = 'fraction_' + fractions[2]; // where we put the different one

		},

		"check": function( canvas_el, state ) {

			var correct = canvas_el.id == state.correct_answer;

			state.correct += correct;
			state.fail += 1-correct;
	
			// mistakes mean more sums
			if( !correct ) {
				state.extras += state.fail_extra;
				
				feedback({
					"right_answer": state.fraction_c,
					"title": "Fout",
				});
				
			}

			// just continue running
			run_level( state );
	
		},

		"score": function( state ) {
			
			var remaining = state.correct_to_pass + state.extras - state.correct;
			
			return state.correct + " Goed - " + state.fail + " Fout - " + remaining + " nog te doen";
		}

	};
}
