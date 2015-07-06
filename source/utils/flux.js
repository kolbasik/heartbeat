var flux = require('flux');
var Dispatcher = new flux.Dispatcher();

module.exports = {
	Dispatcher: Dispatcher,

	register: function(){
		return Dispatcher.register.apply(Dispatcher, arguments);
	},

	notify: function (action, payload) {
		return Dispatcher.dispatch({ action: action, payload: payload });
	}
};
