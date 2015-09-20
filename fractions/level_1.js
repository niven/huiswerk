levels.unshift( new Level1() );

function Level1() {
	
	return {
		"data": function() {
			return {
				"name": "Welke breuk is anders?",
				"correct_to_pass": 10,
				"fail_extra": 5,
			}
		},

		"done": function( state ) {
			
			return state.correct >= state.correct_to_pass + state.extras;
		},

		"setup": function( state ) {
	
			state.correct = 0;
			state.fail = 0;
			state.extras = 0;
	
			// can't use 'this' in the onclickhandler definition since it captures a different one when executed
			var check_function = this.check;
			var onclick_handler = function( event ) {
				check_function( event.target, state );
			}
	
			add_fraction_canvas( "main", "fraction_a", 300, onclick_handler );
			add_fraction_canvas( "main", "fraction_b", 300, onclick_handler );

		},

		"make": function( state ) {

			state.fraction_a = state.fraction_b = Rational();
			do {
				state.fraction_b = Rational();
			} while( Cmp( state.fraction_a, state.fraction_b ) == 0 );
	
			state.largest_fraction = ( state.fraction_b.den * state.fraction_a.num ) > ( state.fraction_a.den * state.fraction_b.num ) ? "A" : "B";

			draw_fraction_as_circle( document.getElementById('fraction_a'), state.fraction_a, true );
			draw_fraction_as_circle( document.getElementById('fraction_b'), state.fraction_b, true );
		},

		"check": function( canvas_el, state ) {

			var cmp = Cmp(state.fraction_a, state.fraction_b);
			var correct = (canvas_el.id == "fraction_a" && cmp == 1) || (canvas_el.id == "fraction_b" && cmp == -1);

			state.correct += correct;
			state.fail += 1-correct;
	
			// mistakes mean more sums
			if( !correct ) {
				state.extras += state.fail_extra;
				
				feedback({
					"right_answer": cmp == 1 ? state.fraction_a : state.fraction_b,
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
