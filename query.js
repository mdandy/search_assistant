class Query {
	
	constructor(keyword, target) {
		this.keyword = keyword;
		this.target = target;
	}

	execute() {
		console.log(`Executing query '${this.keyword}' on '${this.target}'`);

		var encodedKeyword = encodeURI(this.keyword);
		var url;
		switch(this.target) {
			case "yelp":
				url = `https://www.yelp.com/search?find_desc=${encodedKeyword}`;
				break;
			case "giphy":
				url = `https://giphy.com/search/${encodedKeyword}`;
				break;
			case "youtube":
				url = `https://www.youtube.com/results?search_query=${encodedKeyword}`;
				break;
			case "google":
				url = `https://www.google.com/search?q=${encodedKeyword}`;
				break;
			default:
				throw new Error("Unsupported operation " + this.target);
		}

		if (url) {
			this._open(url);
		}
	}

	_open(url) {
		var win = window.open(url, '_blank');
		win.focus();
	}
}