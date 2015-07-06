module.exports = {
	env: process.env.NODE_ENV || 'dev',

	interval: 10000,

	plugins: {
		console: true,
		server: true
	},

	monitor: {
		http: [
			{
				url: 'https://www.google.com.ua'
			},
			{
				url: 'http://www.yandex.ru'
			}
		],

		ping: [
			{
				ip: '127.0.0.1'
			}
		],

		dns: [
			{
				dns: 'www.google.com.ua'
			}
		]
	}
};
