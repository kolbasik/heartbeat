module.exports = {
	start: function start () {
		var started = Date.now();

		return {
			stop: function stop () {
				var now = Date.now();

				return {
					at: now,
					time: now - started
				};
			}
		};
	}
};
