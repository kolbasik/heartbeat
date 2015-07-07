var request = require('request');
var stopwatch = require('../utils/stopwatch');

module.exports = function http (options, callback) {
	var timer = stopwatch.start();

	request(options, function handle (error, response) {
		var payload = timer.stop();
		payload.success = !error && response.statusCode == (options.statusCode || 200);
		payload.request =  options;
		payload.response = {};

		if (error) {
			payload.response.message = error.toString();
		}
		if (response){
			payload.response.statusCode = response.statusCode;
		}

		callback(null, payload);
	});
};
