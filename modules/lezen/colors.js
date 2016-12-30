function Color_Words() {
	
	return {
		// mandatory field that inits the 'state' that is passed around.
		"data": function() {
			return {
				"name": "Kleuren Leren",
				"manual": "Klik op het woord dat bij de kleur hoort die je ziet",
				"correct_to_pass": 10,
				"fail_extra": 1,
			}
		},

		// Is the level over?
		"done": function( state ) {
			
			return state.correct >= state.correct_to_pass + state.extras;
		},

		// setup any additional state values and create any HTML needed for display on the Stage (which is the subarea where you display stuff)
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
			
			var a = document.createElement("div");
			a.setAttribute("class", "vertical_box");
			
			// 1 for the image
			var color_box = document.createElement("div");
			color_box.setAttribute("id","color_box");
			a.appendChild( color_box );
			// 3 spots for words
			var d = document.createElement("div");
			for( var i=0; i<2; i++ ) {
				var word = document.createElement("p");
				word.setAttribute("class", "short_word");
				word.setAttribute("id", "short_word_" + i);
				var hnd = runner_check_answer.bind( this );
				var process_result_handler = function( event ) {
					hnd( event.target, state );
				}
				word.onclick = process_result_handler;
				
				d.appendChild( word );
			}
			d.setAttribute("id", "words_box");
			a.appendChild( d );
			state.stage.appendChild( a );

		},

		// runs in every iteration to create a question/sum
		"make": function( state ) {
			
			console.log(Object.keys(this.colors) );
			state.colors = array_subset( Object.keys(this.colors), 2, state.target );

			// map the element id to the words so when clicked we can just easily retrieve it			
			state.mapping = {};	
			for( var i=0; i<state.colors.length; i++ ) {
				document.getElementById('short_word_' + i).innerHTML = state.colors[i];
				state.mapping[ 'short_word_' + i ] = state.colors[i];
			}
			
			state.target = state.colors[ Math.floor(Math.random() * state.colors.length) ];

			document.getElementById("color_box").style.backgroundColor = this.colors[state.target];
		},

		// the runner check answer function calls this to figure out if the answer is correct
		// here also put some stuff in the state like the correct answer.
		// element: usually the element clicked on, or an input field. This allows answering by clicking on something. (just store extra data in the element)
		// OUT: result => { is_correct: true|false, other_optional_stuff_you_want_to_keep_track_of: ?? }
		"result": function( element, state ) {
			
			var result = {};
			
			result.is_correct = state.mapping[element.id] == state.target;
			result.correct_answer = state.target;
			
			return result;
		},

		// return an HTML element that gives feedback when a wrong anser was given.
		// e.g., <span>2+3 = 5, not 16!</span> 
		"create_correction": function( state ) {

			var s = document.createElement("span");
			s.textContent = state.target;
			return s;
		},

		// map dutch color names to CSS3 colors
		"colors": {
			"geel": "yellow",
			"rood": "red",
			"groen": "seagreen",
			"oranje": "orange",
			"roze": "pink",
			"zwart": "black",
			"wit": "white",
			"blauw": "royalblue",
			"paars": "purple",
			"bruin": "sienna",
			"grijs": "silver"
		}


	};
}
