// a module is a self contained group of levels around some topic (fractions, topology, etc)
// every level.js file in a a modules directory defines a level.

function Letters_Listen() {
	
	return {
		"data": function() {
			return {
				"name": "Letters Luisteren",
				"manual": "Klik op de letter die voorgelezen wordt.",
				"correct_to_pass": 20,
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
			state.audio = {};
			state.audio_path = "modules/lezen/audio/";

			for( var i=0; i<3; i++ ) {
				var letterbox = document.createElement("p");
				letterbox.setAttribute("id", "letters_listen_" + i);
				letterbox.setAttribute("class", "single_letter");
				// binding the checker to this object, and then later calling it after user clicks on something
				var hnd = runner_check_answer.bind( this );
				var process_result_handler = function( event ) {
					hnd( event.target, state );
				}
				letterbox.onclick = process_result_handler;
				state.stage.appendChild( letterbox );
			}

			load_audio( state.audio, state.audio_path, this["audio_for_letters"] );
			state.letter = 'Q'; // first letter we exclude
		},

		// runs in every iteration to create a question/sum
		"make": function( state ) {

			state.letters = unique_letters_array( 3, state.letter );
			
			// map the element id to the fractions so when clicked we can just easily retrieve it			
			state.mapping = {};	
			for( var i=0; i<state.letters.length; i++ ) {
				document.getElementById('letters_listen_' + i).innerHTML = state.letters[i];
				state.mapping[ 'letters_listen_' + i ] = state.letters[i];
			}
			
			state.letter = state.letters[ Math.floor(Math.random() * 3) ];
			state.audio[state.letter].play();
		},

		// the runner check answer function calls this to figure out if the answer is correct
		// here also put some stuff in the state like the correct answer.
		// element: usually the element clicked on, or an input field. This allows answering by clicking on something. (just store extra data in the element)
		// OUT: result => { is_correct: true|false, other_optional_stuff_you_want_to_keep_track_of: ?? }
		"result": function( element, state ) {
			
			var result = {};
			
			result.is_correct = state.mapping[element.id] == state.letter;
			result.correct_answer = state.letter;
			
			return result;
		},

		// return an HTML element that gives feedback when a wrong anser was given.
		// e.g., <span>2+3 = 5, not 16!</span> 
		"create_correction": function( state ) {

			var result = document.createElement("span");
			result.textContent = " " + state.letter;
			
			return result;
		},
		
		"audio_for_letters": {
			"A": "de_a_van_aap.wav",
			"B": "de_b_van_bal.wav",
			"C": "de_c_van_cel.wav",
			"D": "de_d_van_dop.wav",
			"E": "de_e_van_eend.wav",
			"F": "de_f_van_fik.wav",
			"G": "de_g_van_gat.wav",
			"H": "de_h_van_haas.wav",
			"I": "de_i_van_ik.wav",
			"J": "de_j_van_jas.wav",
			"K": "de_k_van_kip.wav",
			"L": "de_l_van_los.wav",
			"M": "de_m_van_mama.wav",
			"N": "de_n_van_noot.wav",
			"O": "de_o_van_op.wav",
			"P": "de_p_van_papa.wav",
			"Q": "de_q_van_quad.wav",
			"R": "de_r_van_rood.wav",
			"S": "de_s_van_sok.wav",
			"T": "de_t_van_tas.wav",
			"U": "de_u_van_uur.wav",
			"V": "de_v_van_vos.wav",
			"W": "de_w_van_was.wav",
			"X": "de_x_van_xenos.wav",
			"Y": "de_y_van_yak.wav",
			"Z": "de_z_van_zak.wav",
		},

	};
}
