(function () {
    'use strict';
    
    describe('Service: uiGridService', function () {
        
        // load the service's module
        beforeEach(module('ibs.cloud'));
		
		var uiGridService;

        beforeEach(inject(function (_uiGridService_) {
			uiGridService = _uiGridService_;
        }));

        
        it('should check getTableHeight defaults', function (done) {
			
			var obj = uiGridService.getTableHeight(3, 10);
			
			assert.equal(obj.height, '197px');

			done();

		});

	
		it('should check getTableHeight no defaults', function (done) {
			
			var obj = uiGridService.getTableHeight(10, 5, 11, 15);
			
			assert.equal(obj.height, '115px');
			
			done();

		});

		it('should check getTableHeight invalid values', function (done) {
			
			var obj = uiGridService.getTableHeight('invalid');
			
			assert.equal(obj.height, '407px');
			
			done();

		});

    });
})();
