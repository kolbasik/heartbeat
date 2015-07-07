var async = require('async');
var dns = require('dns');
var tcpping = require('tcp-ping');
var stopwatch = require('../utils/stopwatch');

module.exports = function resolve4 (options, callback) {
	var timer = stopwatch.start();

	dns.resolve4(options.dns, function (error, addresses) {
		if (error) {
			var payload = timer.stop();
			payload.success = false;
			payload.request = options;
			payload.response = {
				message: 'failed resolved ip by name'
			};
			return callback(null, payload);
		}

		async.map(addresses, function (address, callback) {
			tcpping.probe(address, 80, function (error, resolved) {
				var payload = timer.stop();
				payload.success = !error && resolved;
				payload.request = {
					address: address
				};
				return callback(null, payload);
			});
		}, function (error, array) {
			var payload = timer.stop();
			payload.success = array.every(function(e) { return e.success });
			payload.request = options;
			payload.response = array;
			return callback(null, payload);
		});
	});
};
