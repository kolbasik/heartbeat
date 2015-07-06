(function(io, angular){
	var socket = io();

	var app = angular.module('HeartbeatApp', ['ngAnimate']);
	app.controller('FluxController', ['$scope', function($scope) {
		var vm = this;
		vm.events = [];
		vm.stats = {};

		return activate();

		function activate () {
			clean_stats();
			subscribe(function flux (event) {
				console && console.log(event);
				var data = prepare(event);
				switch (data.action){
					case 'begin': {
						if (data.type == 'digest') {
							clean_stats();
						}
						break;
					}
					case 'start': {
						++vm.stats.total;
						break;
					}
					case 'done': {
						if (data.payload.success) {
							++vm.stats.success;
						}
						else{
							++vm.stats.fault;
						}
						break;
					}
				}
				vm.events.push(data);
			});
		}

		function subscribe (callback) {
			socket.on('flux', function (event) {
				$scope.$apply(function(){
					callback(event);
				})
			});
		}

		function clean_stats () {
			vm.stats.time = Date.now();
			vm.stats.total = 0;
			vm.stats.success = 0;
			vm.stats.fault = 0;
			vm.events.length = 0;
		}

		function prepare (event) {
			var payload = event.payload;
			var data = {
				highlight: highlight(event),
				action: event.action,
				type: payload.type,
				payload: payload.result || payload.payload || payload
			};
			return data;
		}

		function highlight (event) {
			var classes = 'amber';
			switch (event.action) {
				case 'start': {
					classes = 'blue';
					break
				}
				case 'done': {
					var result = event.payload.result;
					if (result.success){
						classes = 'green';
					} else {
						classes = 'red';
					}
					break;
				}
			}
			return classes + ' lighten-1';
		}

	}]);

})(io, angular);
