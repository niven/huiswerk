dependencies.push(
	"fractions/util.js",
	"fractions/smallest_fraction.js",
	"fractions/different_fraction.js",
	"fractions/biggest_fraction_picture.js"
);


modules.push( 

	{
		"title": "Kleinste van 3 Breuken",
		"description": "Kleinste breuk, geen plaatjes",
		"icon": "fractions/icon_smallestfraction.png",
		"get_level": function() {
			return Smallest_Fraction(3);
		}
	},
	
	{
		"title": "Welke breuk is anders?",
		"description": "Kies de breuk die anders is",
		"icon": "fractions/icon_differentfraction.png",
		"get_level": function() {
			return Different_Fraction();
		}
	},
	
	{
		"title": "Grootste breuk",
		"description": "Grootste breuk van 2, met plaatjes",
		"icon": "fractions/icon_biggestfraction.png",
		"get_level": function() {
			return Biggest_Fraction_Picture();
		}
	}

);
