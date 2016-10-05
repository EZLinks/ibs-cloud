(function () {
    'use strict';
    
    angular
        .module('ibs.cloud')
        .factory('DateTime', dateTimeFactory);
    
    dateTimeFactory.$inject = [];
    
    function dateTimeFactory() {			
		// #region ctor

        /**
         * View model for a datetime object
         * @constructor
         * @param {String|Date} dateTime - string or Date object
         */
        function DateTime(dateTime) {
			var newDateTime = new Date(dateTime);

			if (!dateTime || !moment(newDateTime).isValid()) {
				throw new Error('dateTimeFactory : Invalid Date provided!');
			}

			this.dateObject = newDateTime; 
        }
		// #endregion
		
		// #region public methods

        /**
         * Converts given Date object to UTC offset
         * @returns {Date} Date object
         */
        DateTime.prototype.toUTCDate = function () {
			return new Date(this.dateObject.getTime() + this.dateObject.getTimezoneOffset() * 60000);
        };
		
        /**
         * Formats current date object to string
         * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
         * NOTE : .toISOString converts date to UTC that is why we are not using it here
         * @returns {String} Date string in 'yyyy-mm-dd' format
         */
        DateTime.prototype.format = function () {
		    return this.dateObject.getFullYear() +
                '-' + pad(this.dateObject.getMonth() + 1) +
                '-' + pad(this.dateObject.getDate());
		};
        // #endregion

        // #region private functions
        
        /**
         * Adds zeroes before characters of dates if needed
         * @param {Number} number - number of month/day
         * @returns {String} - date part
         */
        function pad(number) {
			var stringNumber = number.toString(); 
            if (number < 10) {
                return '0'.concat(stringNumber);
            }
            return stringNumber;
        }
        // #endregion

        return DateTime;
    }
})();