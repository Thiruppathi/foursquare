$(document).ready(function() {
	function prepareRegisterLink(appConfig) {
		var path = window.location.pathname.split("/").slice(1);
		// remove the current name of the page.
		path.pop();
		if (path.length > 0) {
			path = path.join("/");
		}

		return appConfig.registerUrl + "&client_id=" + appConfig.clientId + "&redirect_uri=" + window.location.origin + path + appConfig.redirectUrlPath;
	}

	fetchConfigService.get().done(function(appConfig) {	
		$("#registerLink").attr("href", prepareRegisterLink(appConfig));    
	});
});