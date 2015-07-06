var request = require('request');

module.exports = function http (options, callback) {
	var started = Date.now();

	request(options, function (error, response) {
		var result = {};

		if (error) {
			result.message = error.toString();
		}
		else if (response && response.statusCode){
			result.statusCode = response.statusCode;
		}

		var now = Date.now(), payload = {
			at: now,
			time: now - started,
			success: !error && response.statusCode == 200,
			request: options,
			response: result
		};

		callback(null, payload);
	});
};
