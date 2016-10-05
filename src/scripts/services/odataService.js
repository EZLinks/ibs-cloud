(function () {
	'use strict';
	
	angular
        .module('ibs.cloud')
        .service('odataService', OdataService);
	
	OdataService.$inject = [ 'errorNotificationService' ];
	
	function OdataService(errorNotificationService) {
	    var service = this;		
	    service.wrappedOdataQuery = wrappedOdataQuery;					

	    /**
         * mocks odata call so we can have custom callbacks for 
	     * before query, finally, onsuccess and onerror
	     * here we are creating new object
	     * and overriding prototype query function to our custom function
	     * so every time .query is called, it will call our query function first and then 
	     * the function that was in proto 
	     * @param {Object} odataObj - Odata object
	     * @param {function} beforeCallback - Callback that must be executed always before request
	     * @param {function} finallyCallback - Callback that must be executed always after request
	     * @param {function} successCallback - Success callback
	     * @param {function} errorCallback - Error callback
	     * @param {function} filters - Odata filters
	     * @returns {Object} Odata mocked object 
	     */
	    function wrappedOdataQuery(
            odataObj,
            beforeCallback,
            finallyCallback,
            successCallback,
            errorCallback,
            filters) {
		
			if (!odataObj || !angular.isFunction(odataObj.odata)) {
				throw new Error('odataService : odataObj must be valid Odata Obj');
			}
			
	        return {
	            odata: function () {
                    var odataInstance = odataObj.odata();
                    
                    if (filters) {
                        odataInstance.filter(filters);
                    }

	                // throw error if somehow we already have those properties in object
                    // we cannot override them if they already exist
	                if (odataInstance.customEvents || odataInstance.customQuery) {
	                    throw new Error('wrappedOdataQuery : Cannot override existing property!');
	                }

                    // declare custom functions in odata object for callbacks
	                odataInstance.customEvents = {};
	                odataInstance.customEvents.beforeCallback = beforeCallback;
	                odataInstance.customEvents.successCallback = successCallback;
	                odataInstance.customEvents.errorCallback = errorCallback;
                    odataInstance.customEvents.finallyCallback = finallyCallback;

                    // override query prototype function
	                odataInstance.customQuery = Object.getPrototypeOf(odataInstance).query;
	                odataInstance.query = queryOdataMockCall;

	                return odataInstance;
	            }
	        };

	        /**
	         * mocked call to odata query
	         * @param {function} successCb - Success callback
	         * @param {function} errorCb - Error callback
	         */
	        function queryOdataMockCall(successCb, errorCb) {
	            /*jshint validthis:true */
	            var odata = this;

	            if (angular.isFunction(odata.customEvents.beforeCallback)) {
	                odata.customEvents.beforeCallback();
	            }
				
				odata.customQuery(function (result) {
	                successCb(result);

	                if (angular.isFunction(odata.customEvents.successCallback)) {
	                    odata.customEvents.successCallback(result);
	                }

	                if (angular.isFunction(odata.customEvents.finallyCallback)) {
	                    odata.customEvents.finallyCallback();
	                }
	            }, function (reject) {
					// notify about occured error
					errorNotificationService.notify(reject);
	                errorCb(reject);

	                if (angular.isFunction(odata.customEvents.errorCallback)) {
	                    odata.customEvents.errorCallback(reject);
	                }

	                if (angular.isFunction(odata.customEvents.finallyCallback)) {
	                    odata.customEvents.finallyCallback();
	                }
	            });
	        }
	    }
			   
		return service;
	}
})();