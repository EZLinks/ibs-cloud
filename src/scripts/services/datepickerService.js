(function () {
	'use strict';
	
	angular.module('ibs.cloud')
		.service('datepickerService', DatepickerService);
	
	DatepickerService.$inject = [];
	
	function DatepickerService() {
		var service = this;
		service.watchDatesChange = watchDatesChange;
		service.unwatch = unwatch;
		
		/**
         * makes watches on given dates,
		 * if startDate becomes > endDate or endDate becomes less than startDate, it equilizes them
	     * @param {Object} $scope - the scope of the component
	     * @param {function} getStartDateFunction - must return start date
	     * @param {function} getEndDateFunction - must return end date
	     * @param {function} setStartDateFunction - sets start date
	     * @param {function} setEndDateFunction - sets end date
	     * @returns {function[]} array of callbacks - unwatch functions
	     */
		function watchDatesChange($scope, getStartDateFunction, getEndDateFunction,
			setStartDateFunction, setEndDateFunction) {
			
			var watches = [];
			
			var watchStartDate = $scope.$watch(getStartDateFunction,
			 function (newValue, oldValue) {				
				var endDate = getEndDateFunction();
				if (newValue && endDate && newValue > endDate) {
					setEndDateFunction(new Date(newValue.getTime()));
				}
			});
			
			var watchEndDate = $scope.$watch(getEndDateFunction, 
			function (newValue, oldValue) {
				var startDate = getStartDateFunction();
				if (newValue && startDate && newValue < startDate) {
					setStartDateFunction(new Date(newValue.getTime()));
				}
			});
			
			watches.push(watchStartDate);
			watches.push(watchEndDate);
			
			return watches;
		}		
		
		/**
         * unwatches watch on a given array of functions
	     * @param {function[]} dateWatches - array of callbacks - unwatch functions
	     */
		function unwatch(dateWatches) {
			if (dateWatches && dateWatches.length) {
				for (var i = 0; i < dateWatches.length; i++) {
					var unwatchCallback = dateWatches[i];
					if (angular.isFunction(unwatchCallback)) {
						unwatchCallback();
					}
				}
			}
		}
		
		return service;
	}
})();

