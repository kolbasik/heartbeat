module.exports = {
	start: start
};

function start (options) {
	var path = require('path');
	var express = require('express');
	var app = express();
	var server = require('http').Server(app);
	var io = require('socket.io')(server);

	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/', function (req, res) {
		res.render('index');
	});

	server.listen(app.get('port'), function () {
		var host = server.address().address;
		var port = server.address().port;

		console && console.log('Server is listening at http://%s:%s', host, port);
	});

	var flux = require('../utils/flux');
	return flux.register(function(args) {
		io.emit('flux', args);
	});
}
