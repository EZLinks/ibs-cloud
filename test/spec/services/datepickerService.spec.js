(function () {
    'use strict';
    
    describe('Service: datepickerService', function () {
        
        // load the service's module
        beforeEach(module('ibs.cloud'));

        var datepickerService, scope;

        beforeEach(inject(function (_datepickerService_, $rootScope) {
			datepickerService = _datepickerService_;
			scope = $rootScope.$new();
        }));

        
        it('should check dates change', function (done) {
			
			scope.startDate = new Date();
			scope.endDate = new Date();
			
			scope.dateWatches = datepickerService.watchDatesChange(scope, 
							function () { return scope.startDate; }, function () { return scope.endDate; },
							function (value) { scope.startDate = value; }, function (value) { scope.endDate = value; });
			
			
			scope.startDate = new Date(scope.startDate.setDate(scope.endDate.getDate() + 10));
			scope.$digest();
			assert.equal(scope.startDate.getTime(), scope.endDate.getTime());

			scope.endDate = new Date(scope.endDate.setDate(scope.startDate.getDate() - 10));
			scope.$digest();
			assert.equal(scope.startDate.getTime(), scope.endDate.getTime());

			scope.endDate = new Date(scope.endDate.setDate(scope.endDate.getDate() + 10));
			scope.$digest();
			assert.notEqual(scope.startDate.getTime(), scope.endDate.getTime());
			 
			done();
		});

		
		it('should check unwatch', function (done) {
			
			scope.startDate = new Date();
			scope.endDate = new Date();
			
			scope.dateWatches = datepickerService.watchDatesChange(scope, 
							function () { return scope.startDate; }, function () { return scope.endDate; },
							function (value) { scope.startDate = value; }, function (value) { scope.endDate = value; });
			
			datepickerService.unwatch(scope.dateWatches);

			scope.startDate = new Date(scope.startDate.setDate(scope.endDate.getDate() + 10));
			scope.$digest();
			assert.notEqual(scope.startDate.getTime(), scope.endDate.getTime());
			
			scope.endDate = new Date(scope.endDate.setDate(scope.startDate.getDate() - 10));
			scope.$digest();
			assert.notEqual(scope.startDate.getTime(), scope.endDate.getTime());
			 
			done();
		});

    });
})();
