var fetchResultService =  (function($) {
	var apiUrl = "https://api.foursquare.com/v2/venues/explore?v=20170920";
	
	function prepareApiUrlPath(params) {
		var path = "";
		for (param in params) {
			if (params.hasOwnProperty(param)) {
				path += "&" + param + "=" + params[param];
			}
		}

		return path;
	}

	return {
		get: function(params, preRequestFn, postRequestFn) {
			preRequestFn();
			$.ajax({
				url: apiUrl + prepareApiUrlPath(params)
			}).done(function(data) {
				postRequestFn(data.response);
			});
		}
	};
})($);