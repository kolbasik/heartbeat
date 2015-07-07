module.exports = {
	env: process.env.NODE_ENV || 'dev',

	interval: 5000,

	plugins: {
		console: true,
		server: {
			port: process.env.PORT || 1337
		}
	},

	monitor: {
		ping: [
			{ ip: '127.0.0.1' }
		],
		dns: [
			{ dns: 'localhost' }
		],
		http: [
			{
				url: 'http://localhost:1337/'
			}
		]
	}
};
