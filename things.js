function Clock( display_target ) {
	return {
		
		"timer_format": new Intl.DateTimeFormat("en-US", {minute: "numeric", second: "numeric"}), 

		"elapsed_millis": 0,
		"begin_time": Date.now(),
		"state": "running",
		
		"display_target": display_target,
		
		"start": function() {
			this.begin_time = Date.now();
			this.state = "running";
		},
		
		"pause": function() {
			// store the elapsed time
			if( this.state == "running" ) {
				this.elapsed_millis += Date.now() - this.begin_time;
				this.state = "paused";				
			}
		},
		
		"display": function() {
			var interval = this.elapsed_millis;
			if( this.state == "running" ) {
				interval += Date.now() - this.begin_time;			
			}
			var display = this.timer_format.format( interval );
			this.display_target.innerHTML = display;
		}
	}
}

// ensure a/b where a<b
function Rational( max_denominator ) {

	if( max_denominator === undefined ) {
		max_denominator = 20;
	}
	
	// make sure denominator is never 1
	var denominator = 1 + Math.ceil(Math.random() * (max_denominator-1) );
	var numerator = Math.ceil(Math.random()*(denominator-1));
	
	return {
		num: numerator,
		den: denominator
	};
}

