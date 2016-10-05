(function () {
	'use strict';

	describe('Component: pieChart', function () {

		var component = '<pie-chart pc-data-call="dataCall()"></pie-chart>';

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
			element = $compile(component)(scope);

			$q = _$q_;

			scope.dataCall = function () {
				var deferred = $q.defer();

				deferred.resolve([
					['Capacity - 744', 744],
					['Reserved - 298', 298]
				]);

				return deferred.promise;
			}

			scope.$digest();
		}));

		it('should initialize chart variables', function (done) {
			var controllerScope = scope.$$childHead.pc;

			// Placing a repeat of the function in here to ensure the test is run with known data and other tests do not break this one.
			scope.dataCall = function () {
				var deferred = $q.defer();

				deferred.resolve([
					['Capacity - 744', 744],
					['Reserved - 298', 298]
				]);

				return deferred.promise;
			}

			scope.$digest();

			var expectedChart = {
				type: 'PieChart',
				data: [
					['Category', 'number'],
					['Capacity - 744', 744],
					['Reserved - 298', 298]
				],
				options: {
					legend: {
						position: 'top',
						alignment: 'center'
					},
					tooltip: {
						trigger: 'none'
					},
                    pieStartAngle: 150,
                    pieSliceText: 'none',
					colors: CHART_COLORS
				}
			};
            
			assert.deepEqual(controllerScope.chart, expectedChart);

			done();
		});
	});

})();