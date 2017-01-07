function add_mul_table( parent_element, process_result_handler ) {
	
	var mul_table_str = '\
	<table id="mul_table">\
		<tr id="row_a"><td id="mul_a" class="mul">NUM_A</td><td>&equals;</td></tr>\
		<tr id="row_b"><td id="mul_b" class="mul">NUM_B</td><td>&equals;</td></tr>\
		<tr id="matrix_below"><td colspan="10"><hr><td>&times;</td></tr>\
		<tr id="row_ans_a"><td></td><td></td></tr>\
		<tr id="row_ans_b"><td></td><td></td></tr>\
		<tr><td colspan="10"><hr><td>&plus;</td></tr>\
		<tr id="row_sum"><td></td><td></td></tr>\
		<tr><td colspan="10"><hr><td>&plus;</td>\
		<tr><td id="total_sum_td"><input class="sum_input" id="total_sum"></td><td><button id="check_button">&rightarrow;</button></td></tr>\
	</table>\
	';
	
	parser = new DOMParser();
	htmlDoc = parser.parseFromString(mul_table_str, "text/html");
	var table_el = htmlDoc.getElementById("mul_table");

	htmlDoc.getElementById("total_sum").onkeyup = function( event ) {
		if( event.keyCode == 13 ) { // respond to <enter>
			process_result_handler( event );
		}
	}
	htmlDoc.getElementById("check_button").onclick = process_result_handler;

	parent_element.appendChild( table_el );

}

var current_active_inputs = [];

function activate( input_elements ) {
	
	current_active_inputs.forEach( function(el, idx, arr) {
		var classes = document.getElementById( el ).getAttribute("class");
		document.getElementById( el ).setAttribute("class", classes.replace(/active/, "") );
	});
	
	if( !( input_elements instanceof Array ) ) {
		input_elements = [ input_elements ];
	}
	for( var i=0; i<input_elements.length; i++ ) {
		var classes = document.getElementById( input_elements[i] ).getAttribute("class");
		document.getElementById( input_elements[i] ).setAttribute("class", classes + " active");
		current_active_inputs.push( input_elements[i] );
	}
}


function random_n_digit( digits ) {
	
	var max = Math.pow(10, digits ); // 2 digits -> 100, 3 digits -> 1000
	var min = Math.pow(10, digits-1 ); // 2 digits -> 10, 3 digits -> 100

	return min + Math.floor(Math.random() * (max-min));
}

function make_decompose_row( row, id, digits ) {
	
	var result = [];
	
	var i = digits;
	while( i --> 0 ) {
		var td = document.createElement("td");
		var inp = document.createElement("input");
		var input_id = "decompose_" + id + "_" + i;
		inp.setAttribute("id", input_id );
		inp.setAttribute("number", i );
		// inp.value = input_id;
		result.unshift( input_id );
		td.appendChild( inp );
		row.appendChild( td );
	}
	
	return result;
}



function make_answers_matrix( node_start, digits, decomposed_a, decomposed_b ) {
	
	var result = {};
	
	var table = node_start.parentNode;
	
	var a = digits;
	while( a --> 0 ) {
		var tr = document.createElement("tr");
		// 2 "spaces"
		tr.appendChild( document.createElement("td") );
		tr.appendChild( document.createElement("td") );
		var b = digits;
		while( b --> 0 ) {
			if( !result[b] ) {
				result[b] = [];
			}
			var td = document.createElement("td");
			var inp = document.createElement("input");
			var input_id = "sub_a"+b+"_b"+a;
			result[b][a] = input_id;
			inp.setAttribute("id", input_id);
			inp.setAttribute("a", a);
			inp.setAttribute("b", b);
			// inp.value = input_id;
			inp.onfocus = function(){ 
				
				// swapped so we mirror correctly. it's just location tanslation. this is fine.
				var d_a = document.getElementById(decomposed_a[this.getAttribute("b")]);
				var d_b = document.getElementById(decomposed_b[this.getAttribute("a")]);
				activate( [ decomposed_a[this.getAttribute("b")], decomposed_b[this.getAttribute("a")]] );
			};
			td.appendChild( inp );
			tr.appendChild( td );
		}
		table.insertBefore( tr, node_start.nextSibling );
	}

	return result;
}

function make_mul_inputs( digits ) {

	var row_a = document.getElementById("row_a");
	var row_b = document.getElementById("row_b");

	var decompose_a = make_decompose_row( row_a, "a", digits );
	var decompose_b = make_decompose_row( row_b, "b", digits );

	var columns = make_answers_matrix( document.getElementById("matrix_below"), digits, decompose_a, decompose_b );

	var decompose_sum = make_decompose_row( document.getElementById("row_sum"), "sum", digits );
	decompose_sum.forEach( function(el, id, arr) {
		var inp = document.getElementById(el);
		inp.setAttribute("class", "sum_input");
		inp.onfocus = function() {
			activate( columns[ this.getAttribute("number") ] );
		};
	});

	document.getElementById("total_sum_td").setAttribute("colspan", 2 + digits);
	document.getElementById("total_sum").onfocus = function() {
		activate( decompose_sum );
	};
}
