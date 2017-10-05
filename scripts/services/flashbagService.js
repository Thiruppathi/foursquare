/**
 * Service to display alerts in the app. Requires jQuery as a dependecy.
 */
var flashbagService = ((function($) {
	var flashbag = "<div style='cursor: pointer;' onclick='$(this).remove();' class='alert fixed-top' role='alert'></div>",
		flashbagTypeClass = {
			"error": "alert-danger",
			"warn": "alert-warning",
			"success": "alert-success"
		};

	return {
		get: function(type, message) {
			var flashbagElement = $(flashbag);
			if (flashbagTypeClass[type]) {
				flashbagElement.addClass(flashbagTypeClass[type]);
			} else {
				flashbagElement.addClass("alert-info");
			}

			flashbagElement.text(message);
			$("body").append(flashbagElement);
		}
	}
}($)));