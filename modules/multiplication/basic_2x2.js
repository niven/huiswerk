load_js("modules/multiplication/util.js");
levels.push( new Basic_Multiplication_2x2() );

function Basic_Multiplication_2x2() {
	
	return {
		"data": function() {
			return {
				"name": "Vermenigvuldigen 2x2",
				"manual": "Klik OK",
//				"manual": "Vermenigvuldig de getallen met de schoolmethode.\nOp de eerste regel de eentallen maal het bovenste getal, op de tweede regel de tientallen maal het bovenste getal. Op de derde regel tel je op voor het uiteindelijke antwoord.",
				"correct_to_pass": 8,
				"fail_extra": 2,
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
			var hnd = runner_check_answer.bind( this );
			var process_result_handler = function( event ) {
				hnd( event.target, state );
			}
			add_mul_table( state.stage, process_result_handler );

		},

		"make": function( state ) {

			state.mul_a = random_2digit();
			state.mul_b = random_2digit();

			document.getElementById("mul_a").textContent = state.mul_a;
			document.getElementById("mul_b").textContent = state.mul_b;
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
