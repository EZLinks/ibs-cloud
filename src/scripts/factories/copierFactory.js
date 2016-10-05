(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .factory('copier', copierFactory);

    copierFactory.$inject = [];

    function copierFactory() {
        var has = Object.prototype.hasOwnProperty;
        /**
         * Copies properties from src to target,
         * regardless of whether or not that property already exist.
         * 
         * NOTE: This differs from angular.extend which merges properties
         * NOTE: This differs from angular.copy which copies all properties
	     * @param {Object} target - copy properties to
	     * @param {Object} src - copy properties from
	     * @param {string[]} properties - array of property names need to copy
	     * @param {Object=} settings - additional object with settings
	     * @returns {Object} - target applied object
         */
        return function (target, src, properties, settings) {
			var deepCopy = settings ? settings.deepCopy : false;
			var applyNullValues = settings ? settings.applyNullValues : false;

            if (src && target) {
                _.forEach(properties, function(property) {
					var temp;
					
                    if (has.call(src, property)) {
                        temp = src[property];
						target[property] = deepCopy ? JSON.parse(JSON.stringify(temp)) : temp;
                    }
					
					if (applyNullValues) {
						if (!temp) {
							target[property] = null;	
						}						
					}
                });
            }

			return target;
        };
    }
})();