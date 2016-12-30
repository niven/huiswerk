dependencies.push(
	"lezen/util.js",
	"lezen/short_words_pictures.js",
	"lezen/letters_listen.js",
	"lezen/letters.js",
	"lezen/two_letter_words.js"
);

// these show up on the selection screen
modules.push( 

	
	{
		"title": "2 Letter Woorden",
		"description": "Simpele woorden van 2 letters",
		"icon": "lezen/icon_2letterwords.jpg",
		"get_level": function() {
			return new Two_Letter_Words();
		}
	},
	
	{
		"title": "1 dier 3 woorden",
		"description": "Zoek het woord bij het plaatje",
		"icon": "lezen/icon_1animal3words.jpg",
		"get_level": function() {
			return new Words_And_Picture( 3, ["kat", "vos", "kip", "vis", "haas", "das", "bij", "uil", "aap", "beer", "haai", "rog", "hond", "koe"]);
		}
	},

	{
		"title": "1 dier 2 woorden",
		"icon": "lezen/icon_1animal2words.jpg",
		"description": "Zoek het woord bij het plaatje",
		"get_level": function() {
			return new Words_And_Picture( 2, ["kat", "vos", "kip", "vis", "haas", "das", "bij", "uil", "aap", "beer", "haai", "rog", "hond", "koe"]);
		}
	},

	{
		"title": "Letters Luisteren",
		"description": "Kies de letter die je hoort",
		"icon": "lezen/sound.svg",
		"get_level": function() {
			return new Letters_Listen();
		}
	},

	{
		"title": "Letters Leren",
		"description": "Leer alle letters van het alfabet zeggen",
		"icon": "lezen/icon_alphabet.jpg",
		"get_level": function() {
			return new Letters_Leren();
		}
	}


);

