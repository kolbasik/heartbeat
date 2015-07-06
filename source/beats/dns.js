var async = require('async');
var dns = require('dns');
var tcpping = require('tcp-ping');

module.exports = function resolve4 (options, callback) {
	var started = new Date();

	dns.resolve4(options.dns, function (error, addresses) {
		if (error) {
			var now = Date.now(), payload = {
				at: now,
				time: now - started,
				success: false,
				request: options,
				response: {
					message: 'failed resolved ip by name'
				}
			};
			return callback(null, payload);
		}

		async.map(addresses, function (address, callback) {
			tcpping.probe(address, 80, function (error, resolved) {
				var now = Date.now(), payload = {
					time: now - started,
					success: !error && resolved,
					request: {
						address: address
					}
				};

				return callback(null, payload);
			});
		}, function (error, data) {
			var now = Date.now(), payload = {
				at: now,
				time: now - started,
				success: data.every(function(e) { return e.success }),
				request: options,
				response: data
			};

			return callback(null, payload);
		});
	});
};
