levels.push( new Level_smallest_as_text( 2 ) );
levels.push( new Level_smallest_as_text( 3 ) );

function Level_smallest_as_text( num_fractions ) {
	
	return {
		"data": function() {
			return {
				"name": "Kies de kleinste bruek",
				"manual": "Je ziet steeds " + num_fractions + " breuken, kies de breuk die het kleinst is.",
				"correct_to_pass": 20,
				"fail_extra": 3,
				"num_fractions": 2,
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
			var hnd = check_answer.bind( this );
			var onclick_handler = function( event ) {
				hnd( event.target, state );
			}
	
			for( var i=0; i<state.num_fractions; i++ ) {
				add_fraction_canvas( state.stage, "fraction_" + i, 200, onclick_handler );
			}
		},

		"make": function( state ) {
			
			state.fractions = unique_rationals_array( state.num_fractions, 10 );

			state.mapping = {};	
			for( var i=0; i<state.num_fractions; i++ ) {
				draw_fraction_as_text( document.getElementById('fraction_' + i), state.fractions[i], true );
				state.mapping[ 'fraction_' + i ] = state.fractions[i];
			}

			// do the sort after, since it sorts the fractions in place and we don't want the smallest one
			// to always be the leftmost one
			state.smallest = state.fractions.sort( rational_compare )[0];
		},

		"result": function( element, state ) {
			
			console.log(state.mapping, state.fractions);
			
			var result = {};
			
			result.is_correct = state.mapping[element.id] == state.smallest;
			result.correct_answer = state.smallest;
			
			return result;
		},

	};
}
