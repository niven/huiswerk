function add_mul_table( parent_element, process_result_handler ) {
	
	var mul_table_str = '\
	<table id="mul_table">\
		<tr><td id="mem"><input type="text"><input type="text"><input type="text" style="border-right-width: 1px; margin-right: 0.6em;"></td></tr>\
		<tr><td id="mul_a" class="mul">NUM_A</td></tr>\
		<tr><td id="mul_b" class="mul">NUM_B</td></tr>\
		<tr><td><hr><td>&times;</td></tr>\
		<tr><td><input id="result_0" type="text" class="num_input"></td></tr>\
		<tr><td><input id="result_1" type="text" class="num_input"></td></tr>\
		<tr><td><hr><td>&plus;</td></tr>\
		<tr><td><input id="result_2" type="text" class="num_input"></td><td><button id="check_button">&rightarrow;</button></td></tr>\
	</table>\
	';
	
	parser = new DOMParser();
	htmlDoc = parser.parseFromString(mul_table_str, "text/html");
	var table_el = htmlDoc.getElementById("mul_table");


	htmlDoc.getElementById("result_2").onkeyup = function( event ) {
		if( event.keyCode == 13 ) { // respond to <enter>
			process_result_handler( event );
		}
	}
	htmlDoc.getElementById("check_button").onclick = process_result_handler;

	parent_element.appendChild( table_el );

}

function random_n_digit( digits ) {
	
	var max = Math.pow(10, digits ); // 2 digits -> 100, 3 digits -> 1000
	var min = Math.pow(10, digits-1 ); // 2 digits -> 10, 3 digits -> 100

	return min + Math.floor(Math.random() * (max-min));
}