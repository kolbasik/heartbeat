console && require('colors');

var util = require('util');
var moment = require('moment');

var logger = {
	info: function (message) {
		console && console.log(format(text(message)));
	},

	success: function (message) {
		console && console.log(format(util.format('SUCCESS: %s', text(message))).green);
	},

	warning: function (message) {
		console && console.log(format(util.format('WARNING: %s', text(message))).yellow);
	},

	error: function (message) {
		console && console.log(format(util.format('ERROR: %s', text(message))).red);
	},

	fatal: function (message) {
		console && console.log(format(util.format('ERROR: %s', text(message))).red);
	}
};

function text (message) {
	return typeof message === 'string' ? message : JSON.stringify(message);
}

function format (message) {
	return util.format('[%s] %s', moment(), message);
}

module.exports = logger;
