function VenueTableRowComponent(venueDetails) {
	
	function prepareAddress() {
		var location = venueDetails.location;

		return (location.lat && location.lng) ? location.lat + "," + location.lng : location.address;
	}

	this.getRow = function() {
		return "<tr>" +
					"<th>" + venueDetails.id + "</th>" +
					"<td>" + 
						"<a name='venueNameLink' target='_blank' href='" + (venueDetails.url ? venueDetails.url : '#')  + "'>" + venueDetails.name + "</a>" +
					"</td>" +
					"<td>" + venueDetails.rating + "</td>" +
					"<td> <a target='_blank' href='https://google.com/maps/?q=" + prepareAddress() + "'>" + venueDetails.location.address + "</td>" +
				"</tr>";
	}
}