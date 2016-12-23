load_js("modules/fractions/util.js");
levels.push( new Level_smallest_as_text( 3 ) );

function Level_smallest_as_text( num_fractions ) {
	
	return {
		"data": function() {
			return {
				"name": "Kies de kleinste bruek",
				"manual": "Je ziet steeds " + num_fractions + " breuken, kies de breuk die het kleinst is.",
				"correct_to_pass": 20,
				"fail_extra": 3,
				"num_fractions": num_fractions,
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
	
			for( var i=0; i<state.num_fractions; i++ ) {
				var frac = document.createElement("div");
				frac.setAttribute("id", "fraction_text_" + i);
				frac.setAttribute("class", "fraction_text");
				frac.onclick = onclick_handler;
				state.stage.appendChild( frac );
			}
		},

		"make": function( state ) {
			
			state.fractions = unique_rationals_array( state.num_fractions, 10 );

			// map the element id to the fractions so when clicked we can just easily retrieve it			
			state.mapping = {};	
			for( var i=0; i<state.num_fractions; i++ ) {
				document.getElementById('fraction_text_' + i).innerHTML = html_entity_from_fraction( state.fractions[i].num, state.fractions[i].den );
				state.mapping[ 'fraction_text_' + i ] = state.fractions[i];
			}

			// do the sort after, since it sorts the fractions in place and we don't want the smallest one
			// to always be the leftmost one
			state.smallest = state.fractions.sort( rational_compare )[0];
		},

		"result": function( element, state ) {
			
			var result = {};
			
			result.is_correct = state.mapping[element.id] == state.smallest;
			result.correct_answer = state.smallest;
			
			return result;
		},

		"create_correction": function( state ) {
			return create_correction_generic( state.smallest );
		},


	};
}
