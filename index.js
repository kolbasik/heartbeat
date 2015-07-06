var cluster = require('cluster');

cluster.setupMaster({ exec: 'app.js' });
cluster.fork();
cluster.on('exit', function(worker, code, signal) {
	console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
	cluster.fork();
});
