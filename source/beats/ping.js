var tcpping = require('tcp-ping');

module.exports = function ping (options, callback) {
	var started = new Date();

	tcpping.probe(options.ip, options.port || 80, function (error, resolved) {
		var now = Date.now(), payload = {
			at: now,
			time: now - started,
			success: !error && resolved,
			request: options,
			response: {
				resolved: resolved
			}
		};

		callback(null, payload);
	});
};
