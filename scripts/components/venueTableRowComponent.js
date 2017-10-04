/**
 * Class for creating the table row component containing the venue details.
 * @param {Object} venueDetails Object containing the details of the venue 
 */
function VenueTableRowComponent(venueDetails) {
	var errorMessage = "Something went wrong while fetching results",
		noResultsMessage = "No results found";

	function prepareAddress() {
		var location = venueDetails.location;

		return (location.lat && location.lng) ? location.lat + "," + location.lng : location.address;
	}

	this.getRow = function() {
		return "<tr>" +
					"<th>" + venueDetails.id + "</th>" +
					"<td>" + 
						"<a target='_blank' href='" + (venueDetails.url ? venueDetails.url : '#')  + "'>" + venueDetails.name + "</a>" +
					"</td>" +
					"<td>" + venueDetails.rating + "</td>" +
					"<td> <a target='_blank' href='https://google.com/maps/?q=" + prepareAddress() + "'>" + (venueDetails.location.address ? venueDetails.location.address : "Google maps link") + "</td>" +
				"</tr>";
	};

	this.getErrorRow = function(error) {
		if (error) {
			return "<tr class='alert-danger text-center'><td colspan='4'>" + errorMessage + "</td></tr>";
		}

		return "<tr class='alert-warning text-center'><td colspan='4'>" + noResultsMessage + "</td></tr>";
	};
}