/**
 * Service to fetch the configuration for the app.
 * Requires Jquery for the execution of the ajax request.
 */
var fetchConfigService =  (function($) {

	return {
		get: function() {
			return $.ajax({ url: "/static/config.json" });
		}
	};
}($));