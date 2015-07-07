var tcpping = require('tcp-ping');
var stopwatch = require('../utils/stopwatch');

module.exports = function ping (options, callback) {
	var timer = stopwatch.start();

	tcpping.probe(options.ip, options.port || 80, function handle (error, resolved) {
		var payload = timer.stop();
		payload.success = !error && resolved;
		payload.request = options;
		payload.response = {
			resolved: !!resolved
		};

		if (error) {
			payload.response.message = error.toString();
		}

		callback(null, payload);
	});
};
