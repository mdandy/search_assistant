var Parser = {

	parse: function(str) {
		console.log(`Parsing '${str}'`);
		var raw = str.toLowerCase();

		// rule: search for {{keyword}} on {{target}}
		var keyword_regex = /search for (.*?) on/;
		var keyword = raw.match(keyword_regex)[1];

		var target_regex = /on.*/;
		var target = raw.match(target_regex)[0].substring(2).trim();

		return new Query(keyword, target);
	}

}