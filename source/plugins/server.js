module.exports = {
	start: start
};

function start (options) {
	var path = require('path'),
		express = require('express'),
		app = express(),
		server = require('http').Server(app),
		io = require('socket.io')(server);

	var website = path.join(__dirname, 'public');

	app.set('port', options.port || 1337);
	app.set('views', website);
	app.set('view engine', 'jade');
	app.use(express.static(website));

	app.get('/', function (req, res) {
		res.render('app');
	});

	server.listen(app.get('port'), function () {
		var address = server.address();

		console.log('Server:', address);
		console.log('Server is listening at http://%s:%s', address.address, address.port);
	});

	return function(args) {
		io.emit('flux', args);
	};
}
