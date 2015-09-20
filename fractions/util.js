
var WIDTH = 300;
var HEIGHT = WIDTH;
var Y_OFFSET = HEIGHT/4;

// ensure a/b where a<b
function Rational() {
	
	var denominator = 1 + Math.ceil(Math.random()*19);
	var numerator = Math.ceil(Math.random()*(denominator-1));
	
	return {
		num: numerator,
		den: denominator
	};
}

function Cmp( fraction_a, fraction_b ) {
	
	var val_a = fraction_a.num * fraction_b.den;
	var val_b = fraction_b.num * fraction_a.den;
	
	if( val_a > val_b ) {
		return 1;
	}
	if( val_b > val_a ) {
		return -1;
	}
	
	return 0;
	
}

function add_fraction_canvas( parent_element, id, onclick_handler ) {
	
	var canvas = document.getElementById( id );
	
	if( canvas == null ) {
		
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", id);
		canvas.setAttribute("class", "fraction");
		canvas.onclick = onclick_handler;
		document.getElementById( parent_element ).appendChild( canvas );
	}
	
}

function draw_fraction_as_circle( canvas, rational, show_as_text ) {
	
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	
	var ctx = canvas.getContext("2d");
	
	var mid = {
		x: WIDTH/2,
		y: (HEIGHT - Y_OFFSET)/2
	};
	var radius = WIDTH/3;
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	var distance = (Math.PI * 2) / rational.den;
	
	ctx.fillStyle = "orange";
	ctx.lineWidth = 3;
	for( var i=0; i<rational.den; i++ ) {
		// draw a pie slice
		ctx.lineTo( mid.x, mid.y );
		ctx.arc( mid.x, mid.y, radius, 0, (i+1)*distance, false);
		ctx.lineTo( mid.x, mid.y );
		if( i < rational.num ) {
			ctx.fill();
		}
		ctx.stroke();	
	}

	if( show_as_text ) {
		print_fraction( ctx, rational );
	}
	
}

function print_fraction( ctx, rational ) {
	
	var font_size_px = Math.ceil(HEIGHT / 10);
	ctx.font = font_size_px + "px monospace";
	ctx.fillStyle = "black";
	ctx.lineWidth = 3;
	
	var n_width = ctx.measureText("" + rational.num).width;
	var d_width = ctx.measureText("" + rational.den).width;
	var bar_width = n_width > d_width ? n_width : d_width;

	
	var x_start = WIDTH/2 - (bar_width/2);
	ctx.moveTo( x_start, HEIGHT - font_size_px + ctx.lineWidth);
	ctx.lineTo( x_start+bar_width, HEIGHT - font_size_px + ctx.lineWidth);
	ctx.stroke();

	ctx.fillText("" + rational.num, WIDTH/2 - n_width/2, HEIGHT - font_size_px - ctx.lineWidth);
	ctx.fillText("" + rational.den, WIDTH/2 - d_width/2, HEIGHT - ctx.lineWidth);
	
}

function clear_element( id ) {
	
	var el = document.getElementById( id );
	while( el.hasChildNodes() ) {
		el.removeChild( el.firstChild );
	}
	
}

function show_next_level_panel() {
	
	// clear the main div
	clear_element( "main" );
	
	var caption = levels.length > 0 ? "Volgende level:<br>" + levels[0].data().name : "Alle levels gedaan!";	
	
	var panel = document.createElement("div");
	panel.setAttribute("class", "panel");
	panel.innerHTML = caption;
	panel.onclick = function() {
		clear_element("main");
		start_level();
	}
	document.getElementById("main").appendChild( panel );
	
}



