(function(io, angular){
	var socket = io();

	var app = angular.module('HeartbeatApp', ['ngAnimate']);
	app.controller('HeartbeatController', ['$scope', function($scope) {
		var vm = this;
		vm.stats = {};
		vm.events = [];

		activate();
		return vm;

		function activate () {
			clean_stats();
			subscribe(flux_event);

			function flux_event (event) {
				console && console.log(event);
				var data = intercept(prepare(event));
				vm.events.push(data);
			}
		}

		function clean_stats () {
			vm.stats.time = new Date();
			vm.stats.total = 0;
			vm.stats.success = 0;
			vm.stats.fault = 0;
			vm.events.length = 0;
		}

		function subscribe (callback) {
			return socket.on('flux', function (event) {
				$scope.$apply(function(){
					callback(event);
				})
			});
		}

		function prepare (event) {
			var payload = event.payload;

			return {
				highlight: highlight(event),
				action: event.action,
				type: payload.type,
				payload: payload.result || payload.payload || payload
			};

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
		}

		function intercept (data) {
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
			return data;
		}

	}]);

})(io, angular);
