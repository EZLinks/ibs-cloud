(function () {
    'use strict';
    
    describe('Service: odataService', function () {
        
        // load the service's module
        beforeEach(module('ibs.cloud'));

        var odataService;
		
		function getOdataMocked(isError) { 
			return {
				
				odata : function () {
					return new OdataMocked(isError);
				}

			};
		}

		function OdataMocked(isError) {
			this.shouldError = isError;
		}
		
		OdataMocked.prototype.query = function (scb, ecb) { 
		
			if (this.shouldError) {
				ecb({ data : null });
			} else { 
				scb();
			}
			
		};

        beforeEach(inject(function (_odataService_) {
			odataService = _odataService_;
        }));

        
        it('should check wrappedOdataQuery success call', function (done) {
			
			var exampleOdata = getOdataMocked(false);
			
			var beforeCalled = false;
			var successCalled1 = false;
			var successCalled2 = false;

			var mocked = odataService.wrappedOdataQuery(
				exampleOdata,
				beforeCallback,
				finallyCallback,
				successCallback,
				errorCallback);
			
			mocked.odata().query(function success() {
				
				assert.isTrue(beforeCalled);
				successCalled1 = true;
			}, 
			function error() { assert.fail(); });

			function beforeCallback() { beforeCalled = true; }
			function successCallback() {
				
				assert.isTrue(beforeCalled);
				assert.isTrue(successCalled1);
				successCalled2 = true;
			}
			function errorCallback() { assert.fail();}

			function finallyCallback() { 
			
				assert.isTrue(beforeCalled);
				assert.isTrue(successCalled1);
				assert.isTrue(successCalled2);
				
				done();	
			}

		});

		it('should check wrappedOdataQuery error call', function (done) {
			
			var exampleOdata = getOdataMocked(true);
			
			var beforeCalled = false;
			var errorCalled1 = false;
			var errorCalled2 = false;
			
			var mocked = odataService.wrappedOdataQuery(
				exampleOdata,
				beforeCallback,
				finallyCallback,
				successCallback,
				errorCallback);
			
			mocked.odata().query(function success() {
				
				assert.fail()
				
			}, 
			function error() {
				assert.isTrue(beforeCalled);
				errorCalled1 = true;
			});
			
			function beforeCallback() { beforeCalled = true; }
			function successCallback() {
				
				assert.fail(); 	
				
			}
			function errorCallback() { 

				assert.isTrue(beforeCalled);
				assert.isTrue(errorCalled1);
				errorCalled2 = true;	
			}
			
			function finallyCallback() {
				
				assert.isTrue(beforeCalled);
				assert.isTrue(errorCalled1);
				assert.isTrue(errorCalled2);
				
				done();
			}

		});


		it('should check wrappedOdataQuery exception', function (done) {
						
			expect(function () {
				odataService.wrappedOdataQuery({});
			}).to.throw(Error);
			
			done();

		});

    });
})();
