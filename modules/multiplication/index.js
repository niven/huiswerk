dependencies.push(
	"multiplication/util.js",
	"multiplication/basic.js"
);


modules.push( 


	{
		"title": "Vermenigvuldigen 3x3",
		"description": "Vermenigvuldigen met getallen van 100-999",
		"get_level": function() {
			return new Basic_Multiplication( 3 );
		}
	},

	{
		"title": "Vermenigvuldigen 2x2",
		"description": "Vermenigvuldigen met getallen van 10-99",
		"get_level": function() {
			return new Basic_Multiplication( 2 );
		}
	}

);

