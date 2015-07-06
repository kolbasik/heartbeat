var plugins = require('require-dir')();
var config = require('../../config');

if (config.env !== 'test' && config.plugins) {
	Object.keys(config.plugins).forEach(function(plugin){
		var options = config.plugins[plugin];
		options && plugins[plugin].start(options);
	});
}
module.exports = plugins;
