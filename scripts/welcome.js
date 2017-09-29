$(document).ready(function() {
	function prepareRegisterLink(appConfig) {
		return appConfig.registerUrl + "&client_id=" + appConfig.clientId + "&redirect_uri=" + window.location.origin + appConfig.redirectUrlPath;
	}

	fetchConfigService.get().done(function(appConfig) {	
		$("#registerLink").attr("href", prepareRegisterLink(appConfig));    
	});
});