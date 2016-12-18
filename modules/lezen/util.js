var dutch_letter_frequencies = {
	"E": 1906,
	"N": 991,
	"A": 766,
	"T": 642,
	"I": 629,
	"O": 580,
	"R": 562,
	"D": 541,
	"S": 384,
	"L": 380,
	"H": 312,
	"G": 312,
	"K": 279,
	"M": 256,
	"V": 224,
	"U": 210,
	"J": 182,
	"W": 172,
	"Z": 160,
	"P": 149,
	"B": 136,
	"C": 130,
	"F": 73,
	"Y": 6,
	"X": 5,
	"Q": 1,
};
var dutch_letter_frequency_max = 1906; // 'E'


// returns a letter according to Dutch language frequencies using 
// "Roulette-wheel selection via stochastic acceptance - Adam Lipowski and Dorota Lipowska" (go find and read that paper)
function get_letter_dutch() {

	var letter_num, letter, freq, accept;
	do {
		letter_num = "A".charCodeAt(0) + rand_int( 26 );
		letter = String.fromCharCode( letter_num );
		freq = dutch_letter_frequencies[letter];
		accept = Math.random() > (freq/dutch_letter_frequency_max) ? false : true;
	} while( !accept );
	
	return letter;
}

// code to run to check algorithm
function _recalc_letter_frequencies( freqs ) {
	
	var max = 0;
	var values = Object.values(freqs).sort( function(a,b){ return a<b; } ); // sort large to small
	max = values[0];
	var count = values.reduce( function(acc, cur, idx, arr) {
		return acc + cur;	
	}, 0);
	
	var result = {};
	Object.keys(freqs).forEach( function(el, idx, arr) {
		result[el] = 0;
	});
	
	// now simulate as many calls as the sum of the weights so the numbers compare ok (it'll always be off somewhat)
	for(var i=0; i<count; i++) {
		var letter = get_letter_dutch();
		result[letter]++;
	}
	console.log( result );
	
}

var dutch_two_letter_words = ["in", "en", "op", "de", "af", "is", "om", "zo", "ze", "ga", "ik", "je", "nu", "na", "of", "pa", "ei"];

function get_2_letter_word() {
	
	return dutch_two_letter_words[ rand_int(dutch_two_letter_words.length) ].toUpperCase();
	
}

