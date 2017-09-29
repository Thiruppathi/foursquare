/**
 * Service to fetch the resulting venues from the foursquare API.
 * Requires Jquery for the execution of the ajax request.
 */
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
		get: function(params) {
			
			return $.ajax({
				url: apiUrl + prepareApiUrlPath(params)
			});
		}
	};
}($));