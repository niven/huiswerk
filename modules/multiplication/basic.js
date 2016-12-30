load_js("modules/multiplication/util.js");
levels.push( new Basic_Multiplication_2x2() );

function Basic_Multiplication_2x2() {
	
	return {
		"data": function() {
			return {
				"name": "Vermenigvuldigen 2x2",
				"manual": "Vermenigvuldig de getallen met de schoolmethode.\nOp de eerste regel de eentallen maal het bovenste getal, op de tweede regel de tientallen maal het bovenste getal. Op de derde regel tel je op voor het uiteindelijke antwoord.",
				"correct_to_pass": 10,
				"fail_extra": 1,
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
			
			// clear the inputs
			for( var i=0; i<3; i++ ) {
				document.getElementById("result_" + i).value = "";
			}
		},

		"result": function( element, state ) {
			
			// don't care about the element, could be <enter> in the input field or click on the button
			var answer = document.getElementById("result_2").value;
			
			var result = {};

			result.correct_answer = state.mul_a * state.mul_b;
			result.is_correct = result.correct_answer == answer;

			return result;
		},

		"create_correction": function( state ) {

			var sum = document.createElement("div");
			sum.style.textAlign = "left";
 			sum.innerHTML = state.mul_b + " &times; " + state.mul_a + " =<br>"
				 				+ (state.mul_b % 10) + "&times;" + state.mul_a + " + "
				 				+ (10 * Math.floor(state.mul_b / 10)) + "&times;" + state.mul_a + " =<br>"
								+ (state.mul_b % 10) * state.mul_a + " + " + (10 * Math.floor(state.mul_b / 10) * state.mul_a) + " =<br>"
								+ (state.mul_a * state.mul_b);
			return sum; 
		},

	};
}
