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
	
			// can't use 'this' in the onclickhandler definition since it captures a different one when executed
			var check_function = this.check;
			var onclick_handler = function( event ) {
				check_function( event.target, state );
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

		"check": function( canvas_el, state ) {

			var cmp = rational_compare(state.fraction_a, state.fraction_b);
			var correct = (canvas_el.id == "fraction_a" && cmp == 1) || (canvas_el.id == "fraction_b" && cmp == -1);

			state.correct += correct;
			state.fail += 1-correct;
	
			// mistakes mean more sums
			if( correct ) {
				state.points_earned = 25;
				var el = document.createElement("span");
				el.innerHTML = "Goed!";
				show_feedback( "positive", el );
			} else {
				state.points_earned = -10;
				state.extras += state.fail_extra;
				

				var el = create_correction( {
                  "right_answer": cmp == 1 ? state.fraction_a : state.fraction_b,
                  "title": "Fout",
				} );
				show_feedback( "negative", el );
				
			}

			// hand it back over to the showrunner
			step_done( state );
	
		},

	};
}
