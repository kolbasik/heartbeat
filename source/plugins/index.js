var plugins = require('require-dir')();
var config = require('../../config');
var flux = require('../utils/flux');

if (config.env !== 'test' && config.plugins) {
	Object.keys(config.plugins).forEach(function create_plugin (plugin) {
		var options = config.plugins[plugin];
		if (options) {
			console.log("plugin: " + plugin, options);
			var observer = plugins[plugin].start(options);
			if (observer instanceof Function) {
				flux.register(observer);
			}
		}
	});
}
module.exports = plugins;
