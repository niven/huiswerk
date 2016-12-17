function add_mul_table( parent_element, process_result_handler ) {
	
	var mul_table_str = '\
	<table id="mul_table">\
		<tr><td id="mul_a" class="mul">17</td></tr>\
		<tr><td id="mul_b" class="mul">78</td></tr>\
		<tr><td><hr><td>&times;</td></tr>\
		<tr><td><input id="result_0" type="text"></td></tr>\
		<tr><td><input id="result_1" type="text"></td></tr>\
		<tr><td><hr><td>&plus;</td></tr>\
		<tr><td><input id="result_2" type="text"></td><td><button id="check_button">&rightarrow;</button></td></tr>\
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

function random_2digit() {
	
	return 10 + Math.floor(Math.random() * 90);
	
}