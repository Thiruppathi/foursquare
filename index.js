var appConfig = {
	urlParams: {
		radius: 250,
		openNow: 1,
		sortByDistance: 0,
		limit: 50
	},
	clientId: "3W5ZMN5ESVIW1CNCDIUQM0V21DUAROGR4JSKVTEVY3QFGHE2",
	registerUrl: "https://foursquare.com/oauth2/authenticate?response_type=token",
	apiUrl: "https://api.foursquare.com/v2/venues/explore?v=20170920",
	categories: [
		"all",
		"food",
		"drinks",
		"coffee",
		"shops",
		"arts",
		"outdoors",
		"sights",
		"trending",
		"nextVenues",
		"topPicks"
	]
}, app = new FoursquareApp(appConfig, $, {
	resultsTableBody: "#resultsTableBody",
	resultsContainer: "#resultsContainer",
	slider: "#slider",
	progressBar: "#progressBar",
	btnExploreVenues: "#btnExploreVenues",
	registerContainer: "#registerContainer",
	formContainer: "#formContainer",
	registerLink: "#registerLink",
	videoBackground: "#video-background",
	openNowOpt: "#openNowOpt",
	distanceOpt: "#distanceOpt",
	sectionOpt: "#sectionOpt",
	limitResultsOpt: "#limitResultsOpt",
	resultsCardHeader: "#resultsCardHeader",
	btnNextResults: "#btnNextResults"
});

$(document).ready(function() {
	// Check if the page is loaded with oauthToken in the url.
	var hashBang = window.location.hash.split("#access_token=");
	if (hashBang.length > 1) {
		app.registerationSuccess(hashBang[1]);
	} else {
		app.prepareRegisterationLink();
	}
});