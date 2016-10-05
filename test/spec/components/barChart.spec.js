(function () {
	'use strict';

	describe('Component: barChart', function () {

		var component = '<bar-chart bc-data-call="dataCall()"></bar-chart>';

		// load the component's module
		beforeEach(module('ibs.cloud'));

		var element,
            location,
            scope,
			$q,
            CHART_COLORS;
		
		beforeEach(inject(function ($rootScope, $compile, _$q_, _CHART_COLORS_) {
			CHART_COLORS = _CHART_COLORS_;

			scope = $rootScope.$new();

			$q = _$q_;

			scope.dataCall = function () {
				var deferred = $q.defer();

				deferred.resolve([
					['Walk On', 80, 80],
					['Advanced', 20, 20]
				]);

				return deferred.promise;
			}
			
			element = $compile(component)(scope);

			scope.$digest();
		}));

		it('should initialize chart variables', function (done) {
			var controllerScope = scope.$$childHead.bc;

			// Placing a repeat of the function in here to ensure the test is run with known data and other tests do not break this one.
			scope.dataCall = function () {
				var deferred = $q.defer();

				deferred.resolve([
					['Walk On', 80, 80],
					['Advanced', 20, 20]
				]);

				return deferred.promise;
			}

			scope.$digest();

			var expectedChart = {
				data: [
					['Category', 'amount', { role: 'annotation' }],
					['Walk On', 80, 80],
					['Advanced', 20, 20]
				],
				type: 'BarChart',
				options: {
					legend: 'none',
					colors: CHART_COLORS,
					hAxis: {
						textPosition: 'none',
						gridlines: {
							color: 'transparent'
						}
					}
				}
			};

			assert.deepEqual(controllerScope.chart, expectedChart);

			done();
		});
	});

})();