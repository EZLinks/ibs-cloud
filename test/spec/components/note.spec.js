(function () {
	'use strict';
	
	describe('Component: note', function () {

		var component = '<note ng-model="model" header="headerName"></note>';
		
		// load the component's module
		beforeEach(module('ibs.cloud'));
		
		var element,
			scope;
		
		beforeEach(inject(function ($rootScope, $compile) {
			
			scope = $rootScope.$new();						
			element = $compile(component)(scope);			

		}));
		
		it('should check init note function', function (done) {
			
			scope.model = 'This is a test note';
			scope.headerName = 'This is a test note details';

			scope.$digest();
			
			var vm = scope.$$childHead.$ctrl;

			assert.equal(scope.model, vm.note);
			assert.equal(vm.header, 'Note Details');

			done();
		});

	});

})();
