require('./plugins');

var async = require('async');
var beats = require('./beats');
var flux = require('./utils/flux');


function heart(type, options) {
	var beat = beats[type];

	if (!beat) {
		throw new Error('missing beat type for: ' + type);
	}

	return function (callback) {
		flux.notify('start', { type: type, payload: options });

		beat.call(beats, options, function(error, payload) {
			flux.notify('done', { type: type, result: error || payload });

			callback(error, payload);
		});
	};
}

function job(type, array) {
	var hearts = array.map(function (options) {
		return heart(type, options);
	});

	return function (callback) {
		async.parallel(hearts, function (error, results) {
			if (error) {
				return callback(error);
			}
			callback(null, results);
		});
	};
}

function heartbeat(config) {
	if (!config) {
		throw new Error('config is missing');
	}

	if (!config.monitor) {
		throw new Error('config.monitor section is missing');
	}

	var jobs = Object.keys(config.monitor).map(function (type) {
		return job(type, config.monitor[type]);
	});

	return {
		start: function () {
			var interval = config.interval || 60000;

			(function digest() {
				flux.notify('begin', { type: 'digest', payload: { time: Date.now() } } );
				async.parallel(jobs, function() {
					var message = 'heartbeat interval over, restarting after ' + interval + ' msec.';
					flux.notify('end', { type: 'digest', result: { message: message } } );
					setTimeout(digest, interval);
				});
			})();
		}
	};
}

module.exports = heartbeat;
