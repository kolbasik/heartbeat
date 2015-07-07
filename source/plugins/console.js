module.exports = {
	start: start
};

function start (options) {
	var logger = require('../utils/logger');

	return function (args) {
		switch (args.action) {

			case 'start':
			{
				logger.info(args.payload);
				break;
			}

			case 'done':
			{
				var result = args.payload.result;
				if (result.success) {
					logger.success(args.payload);
				} else {
					logger.error(args.payload);
				}
				break;
			}

			default:
			{
				logger.warning(args);
				break;
			}
		}
	};
}
