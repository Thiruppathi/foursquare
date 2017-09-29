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
	
	function appendTableRow(data) {
		var html = "<tr> <th>" + data.id + "</th>";
		if (data.url) {
			html += "<td><a target='_blank' href='" + data.url + "'>" + data.name + "</a></td>";
		} else {
			html += "<td>" + data.name + "</td>";
		}
		html += "<td>" + data.rating + "</td>";
		html += "<td>" + prepareAddressForGoogleMaps(data.location) + "</td>";
		html += "</tr>";

		return html;
	}

	function prepareAddressForGoogleMaps(location) {
		if (location.lat && location.lng) {
			return "<a target='_blank' href='https://google.com/maps/?q=" + location.lat + "," + location.lng + "'>" + location.address + "</a>";
		}

		return location.address;
	}

	function appendEmptyRowMessage() {
		var html = "<tr class='alert-dark text-center'> <td colspan='4'> No results found </td> </tr>";

		return html;
	}

	function getResultText(totalNo) {
		if (totalNo > appConfig.urlParams.limit) {
			return "Showing " + appConfig.urlParams.limit + " results of " + totalNo;
		} else {
			return "Showing " + totalNo + " results of " + totalNo;
		}
	}

	function handleResponseAndPrepareUI(response) {
		var groups = response.groups;
		$(selectors.resultsTableBody).empty();
		if (response.totalResults === 0) {
			$(selectors.resultsTableBody).append(appendEmptyRowMessage());
		} else {
			$(selectors.resultsCardHeader).text(getResultText(response.totalResults));
			// Lets assume groups 0 is recommended places.
			var rec_places = groups[0].items,
			count = 1;
			rec_places.forEach(function(place) {
				try {
					var venue = place.venue;
					$(selectors.resultsTableBody).append(
						appendTableRow({
							id: count++,
							name: venue.name,
							rating: venue.rating,
							location: venue.location,
							url: venue.url
						})
					);
				} catch(error) {
					console.warn(error);
				}
			});
		}
		$(selectors.resultsContainer).show();
	}

	function fetchVenues() {
		fetchResultService.get(appConfig.urlParams, function() {
			$(selectors.progressBar).show();
		}, function(response) {
			$(selectors.progressBar).hide();
			handleResponseAndPrepareUI(response);
		});
	}

	function configureApp() {
		configureProgressBar();
		configureSlider();
		$(selectors.formContainer).show();
		$(selectors.btnExploreVenues).click(fetchVenues);
		$(selectors.openNowOpt).change(function() {
			appConfig.urlParams.openNow = Number(this.checked);
		});
		$(selectors.distanceOpt).change(function() {
			appConfig.urlParams.sortByDistance = Number(this.checked);
		});
		$(selectors.savedOpt).change(function() {
			appConfig.urlParams.saved = Number(this.checked);
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