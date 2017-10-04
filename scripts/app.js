/** 
 * 
 * @param {*} appConfig Config object for the class and its functions.
 * @param {*} $ Jquery object.
 * @param {*} selectors Object containing selectors for DOM manipulation.
 */
function FoursquareApp(appConfig, $, selectors) {
	this.registerationSuccess = function(token) {
		appConfig.urlParams.oauth_token = token;
		getUserLocation();
		configureApp();
	};

	function getUserLocation() {
		if ("geolocation" in navigator) {
			/* geolocation is available */
			navigator.geolocation.getCurrentPosition(function(position) {
				appConfig.urlParams.ll = position.coords.latitude + "," + position.coords.longitude;
				$(selectors.btnExploreVenues).show();
			});
		} else {
			/* geolocation IS NOT available */
			console.error("Browser is so outdated");
		}
	}
	
	function configureProgressBar() {
		$(selectors.progressBar).progressbar({
			value: false
		});
	}

	function configureSlider() {
		$(selectors.slider).slider({
			animate: "fast",
			min: 10,
			max: 2000,
			values: [50],
			slide: function(event, ui) {
				// Add debouncing here.
				appConfig.urlParams.radius = ui.value;
				$("#rangeInput").val(ui.value);
			}
		});
	}

	function getResultHtml(totalNo) {
		if (totalNo > appConfig.urlParams.limit) {
			return "Showing " + appConfig.urlParams.limit + " results of " + totalNo;
		}
		
		return "Showing " + totalNo + " results of " + totalNo;
	}

	/**
	 * Prepare the table of results from the response.
	 * 
	 * @param {Object} response API response object. 
	 */
	function handleSuccessfulResponseAndPrepareUI(response) {
		var groups = response.groups;
		if (response.totalResults === 0) {
			$(selectors.resultsTableBody).append(new VenueTableRowComponent().getErrorRow());
		} else {
			$(selectors.resultsCardHeader).html(getResultHtml(response.totalResults));
			// Lets assume groups 0 is recommended places.
			var rec_places = groups[0].items,
			count = 1;
			rec_places.forEach(function(place) {
				try {
					var venue = place.venue;
					$(selectors.resultsTableBody).append(
						new VenueTableRowComponent({
							id: count++,
							name: venue.name,
							rating: venue.rating,
							location: venue.location,
							url: venue.url
						}).getRow()
					);
				} catch(error) {
					console.warn(error);
				}
			});
		}
	}

	function fetchVenues() {
		$(selectors.progressBar).show();
		$(selectors.resultsTableBody).empty();
		fetchResultService.get(appConfig.urlParams).done(function(data) {
			handleSuccessfulResponseAndPrepareUI(data.response);
		}).fail(function(jqXhr, textStatus, errorThrown) {
			$(selectors.resultsTableBody).append(new VenueTableRowComponent().getErrorRow(true));
		}).always(function (data) {
			$(selectors.progressBar).hide();
			$(selectors.resultsContainer).show();
		});
	}

	function configureApp() {
		configureProgressBar();
		configureSlider();
		registerEventHandlers();
	}

	/**
	 * Registering all necessary event handlers for the app
	 * to work.
	 */
	function registerEventHandlers() {
		$(selectors.formContainer).show();
		$(selectors.btnExploreVenues).click(fetchVenues);
		$(selectors.openNowOpt).change(function() {
			appConfig.urlParams.openNow = this.checked | 0;
		});
		$(selectors.distanceOpt).change(function() {
			appConfig.urlParams.sortByDistance = this.checked | 0;
		});
		$(selectors.savedOpt).change(function() {
			appConfig.urlParams.saved = this.checked | 0;
		});
		appConfig.categories.forEach(function(category) {
			$(selectors.sectionOpt).append("<option class='text-capitalize' value='" + category + "'>" + category + "</option>");
		});
		$(selectors.sectionOpt).change(function() {
			if ("all" !== this.value) {
				appConfig.urlParams.section = this.value;
			}
		});
		$(selectors.limitResultsOpt).change(function() {
			appConfig.urlParams.limit = this.value;
		});
	}
}