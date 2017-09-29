var appConfig = {
	urlParams: {
		radius: 250,
		openNow: 1,
		sortByDistance: 0,
		limit: 50,
		saved: 0,
		offset: 0
	},
	clientId: "3W5ZMN5ESVIW1CNCDIUQM0V21DUAROGR4JSKVTEVY3QFGHE2",
	registerUrl: "https://foursquare.com/oauth2/authenticate?response_type=token",
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
	savedOpt: "#savedOpt",
	limitResultsOpt: "#limitResultsOpt",
	resultsCardHeader: "#resultsCardHeader"
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