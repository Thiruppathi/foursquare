$(document).ready(function() {
	fetchConfigService.get().done(function(appConfig) {
		var app = new FoursquareApp(appConfig, $, {
			resultsTableBody: "#resultsTableBody",
			resultsContainer: "#resultsContainer",
			slider: "#slider",
			rangeInput: "#rangeInput",
			progressBar: "#progressBar",
			btnExploreVenues: "#btnExploreVenues",
			registerContainer: "#registerContainer",
			formContainer: "#formContainer",
			videoBackground: "#video-background",
			openNowOpt: "#openNowOpt",
			distanceOpt: "#distanceOpt",
			sectionOpt: "#sectionOpt",
			savedOpt: "#savedOpt",
			limitResultsOpt: "#limitResultsOpt",
			resultsCardHeader: "#resultsCardHeader"
		});

		// Check if the page is loaded with oauthToken in the url.
		var hashBang = window.location.hash.split("#access_token=");
		if (hashBang.length > 1) {
			app.registerationSuccess(hashBang[1]);
		}
	});
});