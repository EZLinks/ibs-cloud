(function () {
	'use strict';
	
	// notifications goes here please
	// we can warn for cancelled request here, 
	// notify with just request details
	// or notify all request error messages here
	
	angular.module('ibs.cloud')
		.service('errorNotificationService', ErrorNotificationService);
	
	ErrorNotificationService.$inject = [
		'Notifications', 
		'$log', 
		'$q'
	];
	
	function ErrorNotificationService(
		Notifications, 
		$log, 
		$q
	) {
		var service = this;
		service.notify = notify;
		
		function notify(rejection) {
			// request cancelled
			if (rejection.status === -1) {
				if (rejection.config && rejection.config.url && rejection.config.method) {
					$log.warn('Request ' + rejection.config.method + ' ' + rejection.config.url + ' was cancelled.');
				}
			} else {
				if (rejection.data) {
					Notifications.emit('error', rejection.data.detail ? rejection.data.detail : 'An error occurred.');
				}
			}
		}
		
		return service;
	}
})();

