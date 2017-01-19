(function (angular) {
    'use strict';

    angular
    .module('ibs.cloud', [
        'ui.bootstrap',
        'ibs.notifications',
        'semantic-ui',
        'googlechart',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'odata.ui.grid',
        'ui.grid.edit',
        'ui.grid.rowEdit',
		'ui.grid.cellNav'
    ])
    .config(config);
    
    config.$inject = [
        'NotificationsProvider',
        '$httpProvider',
        '$compileProvider'
    ];

    function config(
        NotificationsProvider,
        $httpProvider,
        $compileProvider
    ) {
        // to improve performance. (this removes the jquery .data() binding
        //      of angular data
        $compileProvider.debugInfoEnabled(false);

        // This is the amount of time in milliseconds that a notification will remain in-memory 
        // and viewable(unless autoClose: false on the notification or globally below)
        NotificationsProvider.setNotificationTimeoutMs(3500);
        
        // should "fade", applies a .fade-out style to the notification element.
        NotificationsProvider.setFadeDefault(true);
        
        // should match your CSS rule for fade, could be calculated from the rule itself and passed in here...
        NotificationsProvider.setFadeDuration(1500);
        
        // global behavior for automatically closing notifications. 
        // This can be overridden when emitting an notification.
        NotificationsProvider.autoClose(true);

        //$httpProvider.interceptors.push('server405Interceptor');
        //$httpProvider.interceptors.push('serverMetaDataInterceptor');
    }

})(window.angular);
(function () {
    'use strict';
    
    angular
    .module('ibs.cloud')
    .constant('CustomUIGridConstants', {

		debounceDelay : 400,
		headerCellTemplate : 'template/ui-grid-search-header/ui-grid-search-header.html',
		filterHeaderTemplate : 'template/ui-grid-filter/ui-grid-filter.html',
        cellTemplate : 'template/ui-grid-centered-cell/ui-grid-centered-cell.html'
    });

})();
(function () {
    'use strict';
    
    angular
        .module('ibs.cloud')
        .constant('CHART_COLORS', ['#2b542c', '#34495e']);

})();
(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .constant('DATE_ONLY_FORMAT', 'YYYY-MM-DD')
        .constant('TIME_UNIX_HOUR_MULTIPLIER', 3600)
        .constant('TIME_UNIX_MINUTE_MULTIPLIER', 60);

})();
(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .directive('barChart', barChart);
    
    barChart.$inject = [];
    
    function barChart() {
        // Usage:
        //     <bar-chart></bar-chart>
        // Creates:
        // 
        var directive = {
            link: link,
            controller: Controller,
            controllerAs: 'bc',
            templateUrl: 'scripts/components/bar-chart/bar-chart.html',
            restrict: 'EA',
            bindToController: true,
            scope: {
                dataCall: '&bcDataCall'
            }
        };
        
        function link(scope, element, attrs) {
        }
        
        return directive;
    }
    
    Controller.$inject = [
        'CHART_COLORS'
    ];
    
    function Controller(
        CHART_COLORS
    ) {
        // #region Properties

        var vm = this;
               
        // #endregion

        // #region Function Calls

        init();

        // #region

        // #region Function Declarations

        function init(){
            vm.dataCall().then(function (data) {
                // chart object construction is done here to prevent error messages from being displayed.
                vm.chart = {
                    data: [['Category', 'amount', { role: 'annotation' }]].concat(data),
                    type: 'BarChart',
                    options: {
                        legend: 'none',
                        colors: CHART_COLORS,
                        hAxis : {
                            textPosition: 'none',
                            gridlines: {
                                color: 'transparent'
                            }
                        }
                    }
                };
            });
        }

        // #endregion
    }

})();
(function () {
    'use strict';
    
    angular
        .module('ibs.cloud')
        .directive('pieChart', pieChart);
    
    pieChart.$inject = [];
    
    function pieChart() {
        // Usage:
        //     <pie-chart></pie-chart>
        // Creates:
        // 
        var directive = {
            link: link,
            controller: Controller,
            controllerAs: 'pc',
            templateUrl: 'scripts/components/pie-chart/pie-chart.html',
            restrict: 'EA',
            bindToController: true,
            scope: {
                dataCall: '&pcDataCall'
            }
        };
        
        function link(scope, element, attrs) {
        }
        
        return directive;
    }
    
    Controller.$inject = [
        'CHART_COLORS'
    ];
    
    function Controller(
        CHART_COLORS
    ) {
        // #region Properties

        var vm = this;
                     
        // #endregion
        
        // #region Function Calls
        
        init();
        
        // #region
        
        // #region Function Declarations
        
        function init() {
            vm.dataCall().then(function (data) {
                // chart object construction is done here to prevent error messages from being displayed.
                vm.chart = {
                    type: 'PieChart',
                    data: [['Category', 'number']].concat(data),
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
            });
        }

        // #endregion
    }

})();
(function() {
    'use strict';

    angular
        .module('ibs.cloud')
        .directive('note', note);

    note.$inject = [];
    
    function note () {
        var directive = {
            restrict: 'E',
            requires: '^ngModel',
            controller: Controller,
            bindToController: true,
            controllerAs: '$ctrl',
            scope: {
                note: '=ngModel',
                header: '=header'
            },
            templateUrl: 'scripts/components/note/note.html'
        };
        return directive;
    }

    Controller.$inject = [];
    // ReSharper disable once InconsistentNaming
    function Controller() {
        /* jshint validthis:true */
        var vm = this;

        vm.header = 'Note Details';
    }
})();
(function () {
    'use strict';
    
    angular
    .module('ibs.cloud')
    .directive('partialLoadingIndicator', partialLoadingIndicator);
    
	partialLoadingIndicator.$inject = [];
    
    function partialLoadingIndicator() {
        
        var directive = {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'pli',
            templateUrl: 'scripts/components/partial-loading-indicator/partial-loading-indicator.html',
            bindToController: true,
            scope: {
				message : '@pliMessage',
				disableParentClasses : '@pliNoParentClass'
            }
        };
        
        return directive;
    }
    
	Controller.$inject = [ '$element'
	];
    
	function Controller($element) {

        var vm = this;			

		$element.addClass('hidden');
		
		// we need ui segment classes to show spinner
		// for grids the layout says we don't need them
		if (!angular.isDefined(vm.disableParentClasses)) {
			$element.parent().addClass('ui');
			$element.parent().addClass('segment');	    
		}

    }


})();

(function () {
	'use strict';
	
	angular
        .module('ibs.cloud')
        .directive('validateServerMessages', validateServerMessages);
	
	validateServerMessages.$inject = [];
	
	function validateServerMessages() {
		// Usage:
		//     <validate-server-messages vms-model="your-model-name-goes-here"></validate-server-messages>
		// Creates:
		//
		var directive = {
			link: link,
			restrict: 'E',
			controller: Controller,
			controllerAs: 'vsm',
			templateUrl: 'scripts/components/validate-server-messages/validate-server-messages.html',
			scope: {
				modelName: '@vsmModel',
				wholeForm : '@vsmWholeFormErrors'
			},
			bindToController: true
		};
		return directive;
		
		function link(scope, element, attrs) {
		}

	}
	
	Controller.$inject = [
		'serverValidation',
		'$element',
		'$timeout'
	];
	
	function Controller(
        serverValidation,
		$element,
		$timeout
	) {
		
		var vm = this;
		var formName;

		vm.getErrors = getErrors;
		vm.hasErrors = hasErrors;
		vm.clearAllErrors = clearAllErrors;	
		
		init();
		
		function init() {
			
			$timeout(function () {
								
				var $parentForm = $element.closest('[data-form-id]');
				if ($parentForm.length) {
					formName = $parentForm.attr('data-form-id');
				}
				
				if (!formName) {
					throw new Error('validateServerMessages : Please provide form id');
				}

			});
		}		

		function isWholeFormErrors() { 
			return angular.isDefined(vm.wholeForm);
		}

		function getErrors() {
			
			var errors = [];

			if (isWholeFormErrors()) {
				errors = serverValidation.getAllFormErrors(formName);
			} else { 
				errors = serverValidation.getErrorsForKey(formName, vm.modelName);	
			}

			// we want to have only unique error messages, duplicates are not good
			return _.uniq(errors);
		}
		
		function hasErrors() {
						
			if (isWholeFormErrors()) {
				return serverValidation.hasErrorsForForm(formName);
			}
				
			return serverValidation.hasErrorsForKey(formName, vm.modelName);
		}

		function clearAllErrors() { 
			serverValidation.clearAllFormErrors(formName);
		}

	}
	
})();

(function () {
	'use strict';
	
	var invalidInputClass = 'error';
	
	angular.module('ibs.cloud')
        .directive('validateServerModel', 		
		[	
		'serverValidation',	
		'$timeout',		
		function (
			serverValidation,
			$timeout
) {
			return {
				link: function (scope, element, attrs, ctrl) {
					
					$timeout(function () {
						
						var modelName = attrs.validateServerModel;
						var formName = null;
						
						var $parentForm = $(element).closest('[data-form-id]');
						if ($parentForm.length) {
							formName = $parentForm.attr('data-form-id');
						}
						
						// we need formId
						if (!formName) {
							throw new Error('validateServerModel : Please provide form id');
						}
						
						// need to init our form obj to support watch,
						// we can implement subscriber maybe, but it's a bit of work, for now I guess it would be ok
						if (!serverValidation.errors[formName]) {
							serverValidation.clearAllFormErrors(formName);
						}
						
						// choose validateServerModel or just ngModel 
						var modelStateKey = modelName || attrs.ngModel;
						
						if (!modelStateKey) {
							throw new Error('validateServerModel : Please provide field name');
						}
						
						// for dealing with arrays
						modelStateKey = modelStateKey.replace('$index', scope.$index);
						
						scope.$watch(function () {
							
							return serverValidation.errors[formName][modelStateKey];
					
						}, function () {
							
							$(element).parent().removeClass(invalidInputClass);
							
							if (serverValidation.hasErrorsForKey(formName, modelStateKey)) {
								$(element).parent().addClass(invalidInputClass);
							}

						});
						
						// clear server-side validation classes and ngModel state when the input value changes
						element.parent().bind('click', function (evt) {
							
							scope.$apply(function () {
								serverValidation.clearErrorsForKey(formName, modelStateKey);
							});

						});

					});
				}
			};
		}
	]);
})();
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
(function () {
    /*jshint bitwise:false*/
    'use strict';

    angular
        .module('ibs.cloud')
        .factory('Enum', enumFactory);

    enumFactory.$inject = [];
    
    /**
     * Example usage:
     * 
     * var json = { 'unknown':0, 'view': 1, 'canCreatePlayer': 2, etc... };
     * var TeeTimesSecurityFeature = new Enum(json);
     * // enum values are directly accessible as TeeTimesSecurityFeature.view
     * var value = new TeeTimesSecurityFeature(5);
     * console.log(value.hasFlag(TeeTimesSecurityFeature.view)); // true
     * 
     * var mask = TeeTimesSecurityFeature.view | TeeTimesSecurityFeature.canCreateReservation
     * var value = new TeeTimesSecurityFeature(mask);
     * console.log(value.hasFlag(TeeTimesSecurityFeature.canCreateReservation)); // true
     * 
     * @returns {} 
     */
    function enumFactory() {
        // ReSharper disable InconsistentNaming
        /**
         * Enum factory/builder
         * 
         * @param {} map The key-value pairs defining this enum
         * @returns {function} EnumConstructor constructs an instance of the defined enum
         */
        function EnumDefinition(map) {
            // ReSharper restore InconsistentNaming
            var definition = EnumConstructor;

            // ReSharper disable InconsistentNaming
            /**
             * A constructor instance of the defined enum.
             * 
             * @constructor 
             * @param {number} value The value of this enum instance
             * @returns {object} instance of enum
             */
            function EnumConstructor(value) {
                // ReSharper restore InconsistentNaming
                if (!Number.isInteger(value) || value < 0) {
                    throw new Error('Invalid Enum constructor value.');
                }

                var words = getWords(value);
                
                this.hasFlag = function hasFlag(input) {
                    var current;
                    if (angular.isString(input)) {
                        var x = definition[input];
                        if (!angular.isDefined(x)) {
                            return false;
                        } else {
                            current = x;
                        }
                    } else if (Number.isInteger(input)) {
                        current = input;
                    }
                    
                    // ReSharper disable once UsageOfPossiblyUnassignedValue
                    if (angular.isUndefined(current)) {
                        return null;
                    }

                    var currentWords = getWords(current);
                    
                    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
                    // Here, you're checking that the high words are contained and the low words are contained
                    // e.g. using 4bit words to more easily demonstrate:
                    //   0101    1111  Enum value
                    //  &0010    1111  Test value
                    //   ----    ----
                    //   0000    1111  // Fails because Test doesn't exist in enum, as shown by 0000
                    //
                    //   0101    1101  Enum value
                    //  &0100    1101  Test value
                    //   ----    ----
                    //   0100    1101  // Wins because Test DOES exist in enum in both tested words
                    return !!( (words[0] & currentWords[0]) === currentWords[0] && (words[1] & currentWords[1]) === currentWords[1] );
                };
            }
            
            /**
             * Determines whether or not a key or value is explicitly defined on the enum.
             * 
             * @param {string|number} input 
             * @returns {boolean} true if the input value exists on the enum
             */
            EnumConstructor.isDefined = function isDefined(input) {
                return input in definition;
            };
            
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    // This immediate function prevents oddities in 
                    // creating properties in an iteration
                    (function (target, key, value) {
                        // Don't allow changing this property
                        // example: 'View': 2
                        Object.defineProperty(target, key, {
                            configurable: false,
                            writable: false,
                            value: value
                        });
                        
                        // Don't allow changing/enumerating this property
                        // example: 2: 'View'
                        Object.defineProperty(target, value, {
                            configurable: false,
                            writable: false,
                            value: key
                        });
                    })(definition, key, map[key]);
                }
            }
            
            // This is a factory factory lol
            // srsly, tho. You probably don't know this works like this.
            // A constructor function that returns nothing just returns an 
            // instance of that function. A constructor function can also return 
            // the object definition. (See revealing module pattern).
            // In our case, the object definition is a constructor of the defined enum.
            return EnumConstructor;
        }

        return EnumDefinition;
    }
    
    // see http://stackoverflow.com/a/28824541 for the following pattern and explanation
    function getWords(value) {
        if (value < 0) {
            throw new Error('Invalid value provided for bitwise words');
        }

        // here's the fun part. JavaScript bitwise operations only 
        // work on 32-bit integers and we have 64-bit enums.
        // So, work some magic.
        var binary = value.toString(2); // string containing 1's and 0's

        // left-pad to 64 bits
        var original = binary.length; // DO NOT put this into the for terminator.
        for (var i = 0; i < 64 - original; i++) {
            binary = '0'+binary;
        }

        if (binary.length !== 64) {
            throw new Error('We have a problem with the 64bit conversion for enums.');
        }

        var highWord = parseInt(binary.substring(32), 2); // radix of 2 is important here.
        var lowWord = parseInt(binary.substring(0, 32), 2); // radix of 2 is improtant here.
        
        // e.g. a tuple of 32bit high value and 32bit low value (little-endian)
        return [highWord, lowWord];
    }
})();
/*jshint maxcomplexity:12 */
(function () {
    'use strict';
    
    angular
        .module('ibs.cloud')
        .factory('Time', timeFactory);
    
    timeFactory.$inject = [
        'copier',
        'TIME_UNIX_HOUR_MULTIPLIER',
        'TIME_UNIX_MINUTE_MULTIPLIER'
    ];
    
    function timeFactory(
        copier,
        TIME_UNIX_HOUR_MULTIPLIER,
        TIME_UNIX_MINUTE_MULTIPLIER
    ) {
        var properties = [
            'hour',
            'minute',
            'second'
        ];
        
        /**
         * View model for a time object
         * @constructor
         * @param {} newTime
         * @returns Time 
         */
        function Time(newTime) {
            var hour = null,
                minute = null,
                second = null;

            Object.defineProperty(this, 'hour', {
                enumerable: true,
                configurable: false,
                get: function () {
                    return hour;
                },
                set: function (value) {
                    var hourNumber = getNumber(value);

                    if (hourNumber < 0 || hourNumber > 23) {
                        throw new Error('hour was set to an invalid number.');
                    }

                    hour = hourNumber;
                }
            });

            Object.defineProperty(this, 'minute', {
                enumerable: true,
                configurable: false,
                get: function () {
                    return minute;
                },
                set: function (value) {
                    var minuteNumber = getNumber(value);
                    
                    if (minuteNumber < 0 || minuteNumber > 59) {
                        throw new Error('minute was set to an invalid number.');
                    }
                    
                    minute = minuteNumber;
                }
            });

            Object.defineProperty(this, 'second', {
                enumerable: true,
                configurable: false,
                get: function () {
                    return second;
                },
                set: function (value) {
                    if (!value) {
                        second = 0;
                    } else {
                        var secondNumber = getNumber(value);
                        
                        if (secondNumber < 0 || secondNumber > 59) {
                            throw new Error('second was set to an invalid number.');
                        }
                        
                        second = secondNumber;
                    }
                }
            });
            
            if (typeof newTime === 'string') {
                var splittedTime = newTime.split(':');
                if ((splittedTime.length === 2 || splittedTime.length === 3) && 
				!isNaN(splittedTime[0]) &&
				!isNaN(splittedTime[1])) {
                    
                    this.hour = parseInt(splittedTime[0], 10);
                    this.minute = parseInt(splittedTime[1], 10);
                    this.second = !Number.isNaN(splittedTime[2]) ? parseInt(splittedTime[2], 10) : 0;
                }
            } else if (moment.isMoment(newTime)) {
                this.hour = newTime.hour();
                this.minute = newTime.minute();
                this.second = newTime.second();
            } else if (angular.isDate(newTime)) {
                // This ignores the facility's timezone.
                this.hour = newTime.getHours();
                this.minute = newTime.getMinutes();
                this.second = newTime.getSeconds();
            } else if (typeof newTime === 'number') {
                // Convert from UNIX time.
				this.hour = Math.floor(newTime / TIME_UNIX_HOUR_MULTIPLIER);
                this.minute = (newTime % TIME_UNIX_HOUR_MULTIPLIER) / TIME_UNIX_MINUTE_MULTIPLIER;
                this.second = (newTime % TIME_UNIX_HOUR_MULTIPLIER) % TIME_UNIX_MINUTE_MULTIPLIER;
            } else if (typeof newTime === 'object') {
                copier(this, newTime, properties);
            }
        }
        
        /**
         * Gets the time object in a json parsable format
         * @returns String - HH:mm:ss
         */
        Time.prototype.toLongTime = function () {
            return getTimeAsMoment(this).format('HH:mm:ss');
        };
        
        /**
         * Gets the time object as a string without the seconds
         * @returns String - HH:mm:ss
         */
        Time.prototype.toShortTime = function () {
            return getTimeAsMoment(this).format('HH:mm');
        };
        
        Time.prototype.toTeeSheetTime = function () {
            var timeString = this.toShortMeridiemTime();
        
            return timeString.substring(0, timeString.length - 1);
        };
        
        Time.prototype.toShortMeridiemTime = function () {
            return getTimeAsMoment(this).format('h:mma');
        };
        
        Time.prototype.isAfter = function (time) {
            return getTimeAsMoment(this).isAfter(getTimeAsMoment(time));
        };
        
        Time.prototype.isBetweenOrEqual = function (start, end) {
            return getTimeAsMoment(this).isBetween(getTimeAsMoment(start), getTimeAsMoment(end), null, '[]');
        };
        
        Time.prototype.isBefore = function (time) {
            return getTimeAsMoment(this).isBefore(getTimeAsMoment(time));
        };
        
        Time.prototype.equals = function (time) {
            if (!isTimeObject(time)) {
                return false;
            }
            
            return this.hour === time.hour &&
                   this.minute === time.minute &&
                   this.second === time.second;
        };
        
        Time.prototype.getTimeAsMoment = function () { 
            return getTimeAsMoment(this);
        };
        
        function getTimeAsMoment(time) {
            if (!isTimeObject(time)) {
                return null;
            }
            
            return moment()
                .hour(time.hour)
                .minute(time.minute)
                .second(time.second);
        }
        
        function isTimeObject(object){
            return object !== null && 
                typeof object === 'object' &&
                typeof object.hour === 'number' &&
                typeof object.minute === 'number' &&
                typeof object.second === 'number';
        }
        
        function getNumber(number){
            if (!isNaN(number)) {
                return parseInt(number);
            } else {
                throw new Error('Time factory: expected a number but did not receive one.');
            }
        }

        return Time;
    }
})();
(function () {
    'use strict';
    
    angular
        .module('ibs.cloud')
        .filter('ibsTime', timeFilter);

    timeFilter.$inject = ['Time'];

    function timeFilter(Time) {
        return function (input) {
            if (!input) { return null; }
            
            var out = new Time(input);
            return out.toShortMeridiemTime();
        };
    }
})();
(function () {
    'use strict';
    /* jshint quotmark:false, bitwise:false */

    var fadeDuration = 400; // 400ms default. Can be overridden in .config phase (Please override there and not here).

    /**
     * Creates a new notification object
     * @param type The notification type (e.g. error, info, warn)
     * @param message The message to display for the notification
     * @param [options] An object containing custom options for the notification object
     * @param [options.fade] Whether or not the notification should fade
     * @param [options.timeout] The amount of time to pass before closing the notification (in milliseconds)
     * @param [options.autoClose] Whether or not the notification should automatically close
     * @constructor
     */
    function Notification(type, message, options) {
        if (!angular.isDefined(type)) {
            throw new Error("Notification requires type to be defined");
        }

        if (!angular.isDefined(message)) {
            throw new Error("Notification requires message to be defined");
        }

        if (-1 === "error|info|success|warning".indexOf(type)) {
            throw new Error("Notification type must be one of: error|info|success|warning");
        }

        Object.defineProperty(this, 'type', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: type
        });

        Object.defineProperty(this, 'message', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: message
        });

        var opt = options || { fade: true };

        Object.defineProperty(this, 'fade', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: (true === opt.fade)
        });

        Object.defineProperty(this, 'timeout', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: opt.timeout
        });

        Object.defineProperty(this, 'autoClose', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: opt.autoClose
        });
    }

    /**
     * Notifications uses a provider instead of a service or factory so we can set configuration values in the .config phase of the app.
     * Example:
     *
     *      angular.module('myApp').config('NotificationsProvider', function(NotificationsProvider) {
     *          NotificationsProvider.setNotificationTimeoutMs(200);
     *          NotificationsProvider.setFadeDefault(true);
     *      });
     */
    var module = angular.module('ibs.notifications', []);

    module.provider('Notifications', function () {
        var notificationTimeoutMs = 3000; // 3 seconds default. Can be overridden in .config phase (Please override there and not here).
        var fadeDefault = false;
        var autoCloseDefault = true;

        /**
         * Sets the default notification timeout in milliseconds
         *
         * @param {Number} milliseconds The number of milliseconds before the notification times out (closes)
         */
        this.setNotificationTimeoutMs = function (milliseconds) {
            notificationTimeoutMs = milliseconds | 0;
        };

        /**
         * Sets whether or not notifications should "fade"
         *
         * @param {Boolean} fade Whether or not a notification should be 'faded' visually
         */
        this.setFadeDefault = function (fade) {
            fadeDefault = !!fade;
        };

        /**
         * Sets the expected length of time for a fade duration to occur. Value should be equal to the duration in a stylesheet rule. If the 
         * rule removes or otherwise makes the element not display (height/opacity/etc), you could get away with a slightly greater duration.
         * 
         * Be aware this is considered a global value. Meaning all notification types must respect this value in the stylesheet rules you apply.
         *
         * @param {Boolean} durationInMilliseconds Whether or not a notification should be 'faded' visually
         */
        this.setFadeDuration = function (durationInMilliseconds) {
            fadeDuration = durationInMilliseconds;
        };

        /**
         * Sets whether or not notifications should automatically close. This can be overridden when the notification is emitted.
         *
         * @param {Boolean} autoClose Whether or not the notification should automatically close by default.
         */
        this.autoClose = function (autoClose) {
            autoCloseDefault = autoClose;
        };

        // This is the actual service implementation. The array is the injector array
        this.$get = [
            '$timeout',
            function notificationService($timeout) {
                var listeners = [];

                var service = {};

                /**
                 * Bind a function to listen for new notifications to arrive. NOTE: There is no notification caching.
                 *
                 * @param $scope The angular scope of the caller
                 * @param {Function} listener The function that should execute when a new notification is emitted
                 */
                service.onNotification = function ($scope, listener) {
                    // only add new listeners.
                    if (-1 === listeners.indexOf(listener)) {
                        listeners.push(listener);

                        // This automatically de-registers the listener when the scope is destroyed.
                        // Usually it's bad form to pass scope into a service, but we'd rather not have memory leaks if someone forgets to
                        // remove a listener.
                        // This also allows us to define functions inline whenever this onNotification function is called.
                        $scope.$on('$destroy', function () {
                            var idx = listeners.indexOf(listener);
                            listeners.splice(idx, 1);
                        });
                    }
                };

                /**
                 * Emit a new notification. NOTE: There is no notification caching.
                 *
                 * @param {String|Object} type The type of notification to be displayed. Accepts an object of form {Key:'',Value:''}.
                 * @param {String} message The message of the notification
                 * @param {Boolean} autoClose Whether or not the notification automatically closes
                 */
                service.emit = function (type, message, autoClose, timeoutOverride) {
                    if (arguments.length === 1 && angular.isObject(type) && "Key" in type && "Value" in type) {
                        var data = type;
                        type = data.Key;
                        message = data.Value;
                    }

                    if (!angular.isDefined(autoClose)) {
                        autoClose = autoCloseDefault;
                    }

                    var notification = new Notification(type, message, {
                        fade: fadeDefault,
                        timeout: timeoutOverride || notificationTimeoutMs,
                        autoClose: !!autoClose
                    });

                    $timeout(function () {
                        angular.forEach(listeners, function (listener) {
                            $timeout(function () {
                                listener.call(null, notification);
                            });
                        });
                    });
                };

                return service;
            }
        ];
    });

    // Defining our NotificationListController on the module in this way allows for consumers to override or proxy what this controller does.
    module.controller('NotificationListController', ['$scope', '$sce', '$timeout', 'Notifications', function ($scope, $sce, $timeout, Notifications) {
        $scope.notifications = [];

        $scope.closeNotification = function (clickedEvent, notification, clicked) {
            if (clickedEvent != null && clickedEvent.target != null && clickedEvent.target.nodeName === "A") {
                var anchorTag = angular.element(clickedEvent.target);

                $scope[anchorTag.attr("data-invoke")](anchorTag.attr("data-invoke-args"));
            }

            if (clicked) {
                $timeout.cancel(notification.closeTimeoutId);
                notification.isFading = true;

                $timeout(function () {
                    $scope.closeNotification(clickedEvent, notification, false);
                }, fadeDuration);
            } else {
                var idx = $scope.notifications.indexOf(notification);
                if (-1 !== idx) {
                    $scope.notifications.splice(idx, 1);
                }
            }
        };

        Notifications.onNotification($scope, function (notification) {
            // Notification's message property is immutable.
            // This wraps the n.message text in a structure that tells an angular view to render as HTML instead of TEXT (the default).
            notification.$messageHTML = $sce.trustAs($sce.HTML, notification.message || "");

            $scope.notifications.push(notification);
            if (notification.autoClose) {
                notification.closeTimeoutId = $timeout(function () {
                    $scope.closeNotification(null, notification);
                }, notification.timeout);
            }
        });
    }]);

    module.directive('notificationList', [
        function () {
            return {
                // This directive can be either an element or an attribute
                restrict: 'AE',

                // Provides controller accountability for all notification events.
                controller: 'NotificationListController',

                // Referencing a template this way allows us to define a default within the template cache in the module.run.
                // This template can then be overridden by consuming applications simply by updating the templateCache.
                templateUrl: 'templates/notification-list.html',

                link: function(scope, elem, attr) {
                    scope.$on('$destroy', function() {
                        // Remove all events bound within this directive so elements and functions can be garbage collected
                        elem.off();
                    });
                }
            };
        }
    ]);

    module.directive('notificationCompileHtml', ['$parse', '$compile',
        function ($parse, $compile) {
            return {
                restrict: "A",
                link: function(scope, element, attributes) {

                    var parsed = $parse(attributes.ngBindHtml);

                    function getStringValue() { return (parsed(scope) || '').toString(); }

                    scope.$watch(getStringValue, function() {
                        $compile(element, null, -9999)(scope.$parent.$parent || scope.$parent); //The -9999 makes it skip directives so that we do not recompile ourselves
                    });
                }
            };
        }
    ]);
    /* jshint ignore:start */
    // We can also provide templates inline. See http://jsfiddle.net/pkozlowski_opensource/qSBHE/2/
    module.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/notification-list.html', [
            '<div class="notification-list">',
            '   <div ng-repeat="notification in notifications" class="notification notify-{{notification.type}}" ng-class="{\'fade-out\': notification.isFading }" ng-click="closeNotification($event, notification, true)" >' +
            '       <span class="img {{notification.type}}"></span>' +
            '       <span notification-compile-html ng-bind-html="notification.$messageHTML" class="message"></span> ' +
            '       <span ng-click="closeNotification($event, notification, true)" class="close-notification" style="cursor: pointer">\u2718</span>' +
            '   </div>',
            '</div>'
            ].join(''));
    }]);
    /* jshint ignore:end */
})();

(function (window) {
    'use strict';

    /**
	 * Builds a new adapter bound to a target element that's been bootstrapped to an angular app.
	 * @property {NodeElement} a dom element bootstrapped with angular
	 */
    function adapterBuilder(e) {
        var el,
			listenerScopes = [];

        /**
		 * @prop {NodeElement} element the element to which Angular is applied 
	 	 * @constructor
		 */
        function Adapter(element) {
            el = element;
        }

        /**
		 * Emits a notification to the angular module
		 *  
         * @param {String|Object} type The type of notification to be displayed. Accepts an object of form {Key:'',Value:''}.
         * @param {String} message The message of the notification
         * @param {Boolean} autoClose Whether or not the notification automatically closes
		 */
        Adapter.prototype.emit = function (type, message, autoClose, timeoutOverride) {
            var injector = angular.element(el).injector(),
				notificationService = injector.get('Notifications');

            notificationService.emit(type, message, autoClose, timeoutOverride);
        };

        /**
		 * Adds a listener for notification events. Listen will receive a single Notification object,
		 * with the structure { type: string, message: string, fade: boolean, timeout: number, autoClose: boolean }
		 */
        Adapter.prototype.addListener = function (listener) {
            var scope = angular.element(el).scope().$new();

            // Because the angular notification service uses scopes to auto-unbind
            // we need to create a scope, then invoke $destroy later to get the 
            // listener removed from the internal private array of the Notification service.
            // NOTE: This results in two arrays holding a reference to the listener, but they get cleaned up
            // 		 so... no harm, no foul.
            listenerScopes.push({
                scope: scope,
                listener: listener
            });
        };

        /**
		 * Removes a listener that was bound for notification events.
		 * NOTE: listener must be the same function instance that was passed to addListener.
		 */
        Adapter.prototype.removeListener = function (listener) {
            for (var index = 0; index < listenerScopes.length; index++) {
                var element = listenerScopes[index];
                if (element.listener === listener) {
                    element.scope.$destroy();
                    break;
                }
            }
        };

        return new Adapter(e);
    }

    /**
     * IbsNotifications builds an adapter into our angular services for applications that *ARE NOT* using angular.
     * 
     * usage:
     * (HTML)
     * <div id="notifications">
     *      <notification-list/>
     * </div>
     * 
     * (JavaScript Setup)
     * (function(){
     *      var target = document.getElementById("notifications");
     *      angular.module('myApp', ['ibs.notifications']);
     *      angular.element(target).ready(function() {
     *          angular.bootstrap(target, ['myApp']);
     *      });
     * })();
     * 
     * (JavaScript Usage)
     * var adapter = new IbsNotifications(document.getElementById("notifications"));
     * adapter.emit('info', "Info Message");
     * adapter.emit('warning', "<i>Warning</i> Message");
     * adapter.emit('success', "Success Message (autoClose: false)<br/>Click to close.", false);
     * adapter.emit('error', "<b>Error</b> Message (timeout: 5000)", true, 5000);
     * 
     * NOTE: Angular must be included before this file and before the example code above (unless it is bound to DOMContentReady event).
     */
    window.IbsNotifications = adapterBuilder;
})(window);
(function () {
	'use strict';
	
	// notifications goes here please
	// we can warn for cancelled request here, 
	// notify with just request details
	// or notify all request error messages here
	
	angular.module('ibs.cloud')
		.service('errorNotificationService', ErrorNotificationService);
	
	ErrorNotificationService.$inject = [
		'Notifications', 
		'$log', 
		'$q'
	];
	
	function ErrorNotificationService(
		Notifications, 
		$log, 
		$q
	) {
		var service = this;
		service.notify = notify;
		
		function notify(rejection) {
			// request cancelled
			if (rejection.status === -1) {
				if (rejection.config && rejection.config.url && rejection.config.method) {
					$log.warn('Request ' + rejection.config.method + ' ' + rejection.config.url + ' was cancelled.');
				}
			} else {
				if (rejection.data) {
					Notifications.emit('error', rejection.data.detail ? rejection.data.detail : 'An error occurred.');
				}
			}
		}
		
		return service;
	}
})();


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

/*
 * This service provides a reset function to fix an issue with the 
 * tab indexes set on an angular ui grid. The service first removes 
 * the tab indexes from the column header labels, then adds tab
 * indexes to the column header inputs, in order.
 * 
 * There is an existing issue on Github for this to be fixed in 
 * v4.0 of angular ui grid.
 * https://github.com/angular-ui/ui-grid/issues/4951
 * 
 */

(function () {
    'use strict';

    // #region defaults

    var defaultRowsCount = 10;
    var defaultRowHeight = 30;
    var defaultHeaderHeight = 62;
    var defaultFooterHeight = 45;

    // #endregion defaults

    angular
        .module('ibs.cloud')
        .service('uiGridService', UIGridService);

    UIGridService.$inject = [];

    function UIGridService() {
        var service = this;

        service.resetTabIndex = resetTabIndex;
        service.getTableHeight = getTableHeight;
        service.hasSelectedRow = hasSelectedRow;
        service.getSelectedRow = getSelectedRow;
        service.unSelectRows = unSelectRows;
		service.initFilterRequest = initFilterRequest;
		service.mergeFilterRequest = mergeFilterRequest;
		service.filterChanged = filterChanged;
		service.responseHasNoItems = responseHasNoItems;

        // #region pulbic methods
		
		/**
         * checks if response has no items(response must have no items and grid should contain no filters)
	     * @param {Object} gridApi - gridApi main object
	     * @param {Object[]} data - any array with information
	     * @returns {Boolean} true if has no items and no filter, otherwise false
	     */
		function responseHasNoItems(gridApi, data) {
					
			if (data && data.length === 0) {
				
				var hasFilter = _.some(gridApi.grid.columns, function (col) {
					return col.filter.term && col.filter.term.trim() !== '';
				});
				
				if (!hasFilter) {
					return true;
				}

			}

			return false;
		}
		
		/**
         * inits filter request object for ui-grid
	     * @param {Object} gridOptions - grid options object
	     * @returns {Object} filter request Obj
	     */
		function initFilterRequest(gridOptions) { 
		
			return {
				pageSize : gridOptions.paginationPageSize,
				page : 1,
				sort: null,
				filters : []
			};
		}
		
		/**
         * copies data from filterRequestPart to filterRequest 
	     * @param {Object} filterRequest - base filter request Object
	     * @param {Object} filterRequestPart - filter part object
	     */
		function mergeFilterRequest(filterRequest, filterRequestPart) { 
		
			var properties = ['sort', 'page', 'pageSize', 'filters'];
			
			for (var i = 0; i < properties.length; i++) {
    
				var propName = properties[i];

				if (angular.isDefined(filterRequestPart[propName])) {
					filterRequest[propName] = filterRequestPart[propName];
				}

			}

		}
		
		/**
         * handles callback invocation when ui-grid paging/filtering/sorting changed
		 * provides part of the filter that changed in the callback
	     * @param {Object} $scope - app scope
	     * @param {Object} gridApi - grid api object
	     * @param {Function} callback - to call on successful grid events change
	     */
		function filterChanged($scope, gridApi, callback) {
			
			gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
				
				var filterRequest = {};

				if (sortColumns.length === 0) {
					filterRequest.sort = null;
				} else {
					filterRequest.sort = {
						direction : sortColumns[0].sort.direction,
						memberName : sortColumns[0].field 
					};
				}

				if (angular.isFunction(callback)) {
					callback(filterRequest);
				}
			});

			gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
				
				var filterRequest = {};

				filterRequest.page = newPage;
				filterRequest.pageSize = pageSize;

				if (angular.isFunction(callback)) {
					callback(filterRequest);
				}
			});


			gridApi.core.on.filterChanged($scope, function () {
				
				var filters = [];
				var filterRequest = { filters : filters, page : 1 };

				gridApi.grid.columns.forEach(function (column) {
					if (column.filters && column.filters.length > 0 && column.filters[0].term && column.filters[0].condition) {
						filters.push({
							memberName: column.field, 
							value: column.filters[0].term,
							condition : column.filters[0].condition
						});
					}
				});

				if (angular.isFunction(callback)) {
					gridApi.pagination.seek(1);
					callback(filterRequest);
				}
			});

		}

		/**
         * removes all selected rows
         */	
		function unSelectRows(gridApi) {
			if (gridApi) {
				gridApi.selection.clearSelectedRows();
			}
		}
		
		/**
         * gets selected row from grid
	     * @param {Object} gridApi - object of the grid api
  	     * @returns {Object} selected row object or null
         */
		function getSelectedRow(gridApi) { 
		
			if (hasSelectedRow(gridApi)) {
				return gridApi.selection.getSelectedRows()[0];
			}
			
			return null;
		}

		/**
         * checks if grid has the row selected
	     * @param {Object} gridApi - object of the grid api
  	     * @returns {Boolean} has selected row or not
         */
		function hasSelectedRow(gridApi) { 
		
			var hasSelection = false;

			if (gridApi) {
				hasSelection = !!(gridApi.selection.getSelectedRows()[0]);
			}

			return hasSelection;
		}


        /**
         * resets tab index in ui grid
         */
        function resetTabIndex()
        {
            removeLabelAttributes();
            updateInputIndexes();
        }

        /**
        * calculates grid height to match rows height
	    * @param {Number} dataLength - length of all data in grid
	    * @param {Number} rowsCount - count of rows that should be shown
	    * @param {Number} rowHeight - height of one row
	    * @param {Number} headerHeight - height of the grid's header
	    * @returns {Object} height style object
        */
        function getTableHeight(dataLength, rowsCount, rowHeight, headerHeight)
        {

            // set defaults if not defined
            if (!angular.isDefined(rowHeight)) {
                rowHeight = defaultRowHeight;
            }

            if (!angular.isDefined(headerHeight)) {
                headerHeight = defaultHeaderHeight;
            }
            // end set defaults

            // protection from guys who want to pass here some stupid values..
            if (!angular.isNumber(dataLength) || !angular.isNumber(rowsCount) ||
				!angular.isNumber(rowHeight) || !angular.isNumber(headerHeight)) {
                return {
                    height: (defaultRowsCount * defaultRowHeight + defaultHeaderHeight + defaultFooterHeight) + 'px'
                };
            }

            var rowsToShow = dataLength >= rowsCount ? rowsCount : dataLength;

            return {
                height: (rowsToShow * rowHeight + headerHeight + defaultFooterHeight) + 'px'
            };

        }

        // #endregion


        // #region private methods

        function removeLabelAttributes() {
            var labels = document.querySelectorAll('div.ui-grid-cell-contents', 'div.ui-grid-header-cell-primary-focus');

            _.forEach(labels, function (label) {
                label.removeAttribute('tabindex');
            });
        }

        function updateInputIndexes() {
            var inputs = document.querySelectorAll('input.ui-grid-filter-input-0');

            for (var i = 0; i < inputs.length; i++) {
                inputs[i].tabIndex = i + 1;
            }
        }

        // #endregion

        return service;
    }
})();
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


(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .service('smModalService', SmModalService);

    SmModalService.$inject = ['$timeout'];

    function SmModalService($timeout) {
        var service = this;

        service.removeModal = removeModal;
        service.hideModal = hideModal;
        service.refreshModal = refreshModal;

        // #region pulbic methods
		
		/**
         * hides modal dialog with animation
         */
        function hideModal() {
			$('.ui.modal').modal('hide');
		}

        /**
         * removes the modal from dom
         */
        function removeModal() {
            // jshint validthis:true
            $(this).remove();
        }

        /**
         * refreshes the modal window. This is used to get the correct size for the window
         * after angular has loaded the content.
         */
        function refreshModal() {
            $timeout(function () {
                // jshint validthis:true
                $('.ui.modal').modal('refresh');
            });
        }

        // #endregion

        return service;
    }
})();
(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .service('processing', Processing);

    Processing.$inject = [];

    /**
     * A service responsible for indicating processing of operations on pages (not refreshing data).
     * 
     * @returns {Object} 
     */
    // ReSharper disable once InconsistentNaming
    function Processing() {
        var service = this,
            showOverlay = false;

        service.showOverlayIndicator = showOverlayIndicator;
        service.hideOverlayIndicator = hideOverlayIndicator;

        service.showPartialLoadingIndicator = showPartialLoadingIndicator;
        service.hidePartialLoadingIndicator = hidePartialLoadingIndicator;

        /**
         * @property {String} text The text to display
         * @property {Boolean} show Whether or not to show the text of the overlay
         */
        service.overlay = {
            text: null
        };

        // Ensure overlay is not overwritten with a different variable so the show property works as designed.
        Object.defineProperty(service, 'overlay', {
            configurable: false,
            writable: false
        });

        // If show is set to null empty out the text field.
        Object.defineProperty(service.overlay, 'show', {
            get: function () { return showOverlay; },
            set: function (val) {
                showOverlay = val;
                if (showOverlay === false) {
                    this.text = null;
                }
            },
            enumerable: true,
            configurable: true
        });

        /**
         * Displays a message for the application's loading indicator
         * 
         * @param {String} message The user-friendly text to display below the loading indicator
         * @returns {} 
         */
        function showOverlayIndicator(message) {
            service.overlay.text = message;
            service.overlay.show = true;
        }

       /**
        * Hides the application's loading indicator
        * 
        * @returns {} 
        */
        function hideOverlayIndicator() {
            service.overlay.show = false;
        }
		
		
		// NOTE : those functions here because it is the most fast way to get loading 
		// indicator and it does not init scope digest or something

		function showPartialLoadingIndicator(id) { 
			$('#' + id).removeClass('hidden');
		}
		
		function hidePartialLoadingIndicator(id) {
			$('#' + id).addClass('hidden');
		}
		
		//************************

        return service;
    }
})();
(function () {
	'use strict';
	
	angular
        .module('ibs.cloud')
        .service('serverValidation', ServerValidation);
	
	ServerValidation.$inject = [
	];
	
	function ServerValidation() {
		
		var service = this, 
			errors = {};
		
		service.validate = validate;
		service.getErrorsForKey = getErrorsForKey;
		service.hasErrorsForKey = hasErrorsForKey;
		service.hasErrorsForForm = hasErrorsForForm;
		service.clearErrorsForKey = clearErrorsForKey;
		service.clearAllFormErrors = clearAllFormErrors;
		service.getAllFormErrors = getAllFormErrors;
		
		Object.defineProperty(service, 'errors', {
			get: function () {
				return errors;
			},
			enumerable: true,
			configurable: false
		});
		
		function clearErrorsForKey(formName, key) {
			if (hasErrorsForKey(formName, key)) {
				delete errors[formName][key];
			}
		}
		
		function hasErrorsForKey(formName, key) {
			return !!errors[formName] && !!errors[formName][key] && !!errors[formName][key].length;
		}
		
		function hasErrorsForForm(formName) {
			return !!errors[formName] && !!Object.keys(errors[formName]).length;
		}
		
		function getErrorsForKey(formName, key) {
			
			if (hasErrorsForKey(formName, key)) {
				return errors[formName][key];
			}
			
			return [];
		}
		
		function getAllFormErrors(formName) {
			
			if (hasErrorsForForm(formName)) {
				
				var allErrs = [];

				Object.keys(errors[formName]).forEach(function (key) {
					if (angular.isArray(errors[formName][key])) {
						for (var i = 0; i < errors[formName][key].length; i++) {
							allErrs.push(errors[formName][key][i]);
						}
					}
				});
				
				return allErrs;
			}		

		}
		
		function validate(formName, respData) {
			
			clearAllFormErrors(formName);
			if (respData.hasServerValidationErrors === true) {
				
				errors[formName] = respData.errors;
			}

		}
		
		function clearAllFormErrors(formName) {
			errors[formName] = {};
		}
		
		return service;
	}
})();
angular.module('ibs.cloud').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/ui-grid-centered-cell/ui-grid-centered-cell.html',
    "<div class=\"ui-grid-cell-contents\" style=\"line-height:{{ grid.options.rowHeight - 10 }}px\" title=\"TOOLTIP\" ng-bind=\"COL_FIELD CUSTOM_FILTERS\"></div>"
  );


  $templateCache.put('template/ui-grid-filter/ui-grid-filter.html',
    "<div class=\"ui-grid-filter-container\"\r" +
    "\n" +
    "    ng-repeat=\"colFilter in col.filters\"\r" +
    "\n" +
    "    ng-class=\"{'ui-grid-filter-cancel-button-hidden' : colFilter.disableCancelFilterButton === true }\">\r" +
    "\n" +
    "    <div ng-if=\"colFilter.type !== 'select'\">\r" +
    "\n" +
    "        <div class=\"ui small icon input ui-grid-filter-input\">\r" +
    "\n" +
    "            <input type=\"text\"\r" +
    "\n" +
    "                class=\"ui-grid-filter-input-{{$index}}\"\r" +
    "\n" +
    "                ng-model=\"colFilter.term\"\r" +
    "\n" +
    "                ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\"\r" +
    "\n" +
    "                aria-label=\"{{colFilter.ariaLabel || aria.defaultFilterLabel}}\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <i class=\"search icon\"></i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div role=\"button\"\r" +
    "\n" +
    "            class=\"ui-grid-filter-button\"\r" +
    "\n" +
    "            ng-click=\"removeFilter(colFilter, $index)\"\r" +
    "\n" +
    "            ng-if=\"!colFilter.disableCancelFilterButton\"\r" +
    "\n" +
    "            ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\"\r" +
    "\n" +
    "            ng-show=\"colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== ''\">\r" +
    "\n" +
    "            <i class=\"ui-grid-icon-cancel\"\r" +
    "\n" +
    "                ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;\r" +
    "\n" +
    "            </i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-if=\"colFilter.type === 'select'\">\r" +
    "\n" +
    "        <select class=\"ui-grid-filter-select ui-grid-filter-input-{{$index}}\"\r" +
    "\n" +
    "            ng-model=\"colFilter.term\"\r" +
    "\n" +
    "            aria-label=\"{{colFilter.ariaLabel || ''}}\"\r" +
    "\n" +
    "            ng-options=\"option.value as option.label for option in colFilter.selectOptions\">\r" +
    "\n" +
    "            <option value=\"\" disabled selected ng-bind=\"colFilter.placeholder || 'Select an option'\"></option>\r" +
    "\n" +
    "        </select>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div role=\"button\"\r" +
    "\n" +
    "            class=\"ui-grid-filter-button-select\"\r" +
    "\n" +
    "            ng-click=\"removeFilter(colFilter, $index)\"\r" +
    "\n" +
    "            ng-if=\"!colFilter.disableCancelFilterButton\"\r" +
    "\n" +
    "            ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\"\r" +
    "\n" +
    "            ng-show=\"colFilter.term !== undefined && colFilter.term != null\">\r" +
    "\n" +
    "            <i class=\"ui-grid-icon-cancel\"\r" +
    "\n" +
    "                ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;\r" +
    "\n" +
    "            </i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('template/ui-grid-search-header/ui-grid-search-header.html',
    "<style>\r" +
    "\n" +
    "    .ui-grid-filter-input {\r" +
    "\n" +
    "        display: inline-block;\r" +
    "\n" +
    "        position: relative;\r" +
    "\n" +
    "        height: 25px !important;\r" +
    "\n" +
    "        width: 0 auto;\r" +
    "\n" +
    "        min-width: 75% !important;\r" +
    "\n" +
    "        max-width: 90%;\r" +
    "\n" +
    "        padding: 0px;\r" +
    "\n" +
    "    }\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-class=\"{ 'sortable': sortable }\">\r" +
    "\n" +
    "    <!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> -->\r" +
    "\n" +
    "    <div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\" title=\"TOOLTIP\">\r" +
    "\n" +
    "        <span ng-bind=\"col.displayName CUSTOM_FILTERS\"></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">\r" +
    "\n" +
    "            &nbsp;\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\">\r" +
    "\n" +
    "        <i class=\"ui-grid-icon-angle-down\">&nbsp;</i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ui-grid-filter=\"\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('scripts/components/bar-chart/bar-chart.example.html',
    "<script type=\"text/javascript\">\r" +
    "\n" +
    "    app.cp.register('BarChartTestController', ['$scope', '$q', function ($scope, $q) {\r" +
    "\n" +
    "        var vm = this;\r" +
    "\n" +
    "\r" +
    "\n" +
    "        vm.data = function () {\r" +
    "\n" +
    "            var deferred = $q.defer();\r" +
    "\n" +
    "\r" +
    "\n" +
    "            deferred.resolve([\r" +
    "\n" +
    "                ['Walk On', 80, 80],\r" +
    "\n" +
    "                ['Advanced', 20, 20]\r" +
    "\n" +
    "            ]);\r" +
    "\n" +
    "\r" +
    "\n" +
    "            return deferred.promise;\r" +
    "\n" +
    "        };\r" +
    "\n" +
    "    }]);\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<div ng-controller=\"BarChartTestController as controller\">\r" +
    "\n" +
    "    <bar-chart bc-data-call=\"controller.data()\"></bar-chart>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('scripts/components/bar-chart/bar-chart.html',
    "<div google-chart chart=\"bc.chart\" agc-on-ready=\"bc.chartLoaded()\">\r" +
    "\n" +
    "    <div class=\"ui active inverted dimmer\">\r" +
    "\n" +
    "        <div class=\"ui large text loader\">Loading</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('scripts/components/note/note.html',
    "<div ng-if=\"$ctrl.note\" class=\"ui basic icon button\" ng-click=\"$ctrl.show=true\">\r" +
    "\n" +
    "    <i class=\"tag small icon\"><span></span></i>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <sm-modal settings=\"{transition: 'fade', detachable: false}\" style=\"min-width: 250px;font-size:1.2em\" visible=\"$ctrl.show\" sm-modal-show-dimmer=\"true\">\r" +
    "\n" +
    "        <div class=\"header\" ng-bind=\"$ctrl.header\"></div>\r" +
    "\n" +
    "        <div class=\"content\" ng-bind=\"$ctrl.note\"></div>\r" +
    "\n" +
    "        <div class=\"actions\">\r" +
    "\n" +
    "            <div class=\"ui basic black button\" ng-click=\"$ctrl.show=false\">OK</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </sm-modal>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('scripts/components/partial-loading-indicator/partial-loading-indicator.html',
    "<div class=\"ui active inverted dimmer part-loader\">\r" +
    "\n" +
    "        <div class=\"ui large text loader\"><span ng-bind=\"pli.message\"></span></div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('scripts/components/pie-chart/pie-chart.example.html',
    "<script type=\"text/javascript\">\r" +
    "\n" +
    "    app.cp.register('PieChartTestController', ['$scope', '$q', function ($scope, $q) {\r" +
    "\n" +
    "        var vm = this;\r" +
    "\n" +
    "\r" +
    "\n" +
    "        vm.data = function () {\r" +
    "\n" +
    "            var deferred = $q.defer();\r" +
    "\n" +
    "\r" +
    "\n" +
    "            deferred.resolve([\r" +
    "\n" +
    "                ['Capacity - 744', 744],\r" +
    "\n" +
    "                ['Reserved - 298', 298]\r" +
    "\n" +
    "            ]);\r" +
    "\n" +
    "\r" +
    "\n" +
    "            return deferred.promise;\r" +
    "\n" +
    "        };\r" +
    "\n" +
    "    }]);\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<div ng-controller=\"PieChartTestController as controller\">\r" +
    "\n" +
    "    <pie-chart pc-data-call=\"controller.data()\"></pie-chart>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('scripts/components/pie-chart/pie-chart.html',
    "<div google-chart chart=\"pc.chart\" agc-on-ready=\"pc.chartLoaded()\">\r" +
    "\n" +
    "    <div class=\"ui active inverted dimmer\">\r" +
    "\n" +
    "        <div class=\"ui large text loader\">Loading</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('scripts/components/validate-server-messages/validate-server-messages.example.html',
    "<script type=\"text/javascript\">\r" +
    "\n" +
    "    app.cp.register('ValidateServerMessagesTestController', function ($log, serverValidation) {\r" +
    "\n" +
    "\r" +
    "\n" +
    "        var vm = this;\r" +
    "\n" +
    "        vm.myModel = 'test text';\r" +
    "\n" +
    "        vm.myFormId = 'myTestFormId2';\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        serverValidation.validate(vm.myFormId, {\r" +
    "\n" +
    "\r" +
    "\n" +
    "            hasServerValidationErrors: true,\r" +
    "\n" +
    "            errors: {\r" +
    "\n" +
    "                'your-model-name': ['This is first error', 'This is second error'],\r" +
    "\n" +
    "                'your-model-name1': ['This is 3rd error', 'This is 4th error']\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        });\r" +
    "\n" +
    "        \r" +
    "\n" +
    "\r" +
    "\n" +
    "        // todo : don't forget to clear errors on destroy\r" +
    "\n" +
    "\r" +
    "\n" +
    "    });\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<div ng-controller=\"ValidateServerMessagesTestController as controller\" data-form-id=\"{{::controller.myFormId}}\">\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    Error messages for your-model-name only :\r" +
    "\n" +
    "    <validate-server-messages vsm-model=\"your-model-name\"></validate-server-messages>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    Whole error messages in form:\r" +
    "\n" +
    "    <validate-server-messages vsm-whole-form-errors></validate-server-messages>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('scripts/components/validate-server-messages/validate-server-messages.html',
    "<div data-ng-if=\"vsm.hasErrors()\" class=\"ui error message\" style=\"display:block!important\">\r" +
    "\n" +
    "    <i data-ng-click=\"vsm.clearAllErrors()\" class=\"close icon\"></i>\r" +
    "\n" +
    "    <div class=\"header\">\r" +
    "\n" +
    "        There was an error with your submission\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <ul class=\"list\">\r" +
    "\n" +
    "        <li data-ng-repeat=\"error in vsm.getErrors() track by $index\"><span ng-bind=\"error\"></span></li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('scripts/components/validate-server-model/validate-server-model.example.html',
    "<script type=\"text/javascript\">\r" +
    "\n" +
    "    app.cp.register('ValidateServerModelTestController', function ($log, serverValidation) {\r" +
    "\n" +
    "\r" +
    "\n" +
    "        var vm = this;\r" +
    "\n" +
    "        vm.myModel = 'myModel';\r" +
    "\n" +
    "        vm.myFormId = 'myTestFormId1';\r" +
    "\n" +
    "\r" +
    "\n" +
    "        serverValidation.validate(vm.myFormId, {\r" +
    "\n" +
    "\r" +
    "\n" +
    "            hasServerValidationErrors: true,\r" +
    "\n" +
    "            errors: {\r" +
    "\n" +
    "                'your-model-name': ['This is first error', 'This is second error']\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        });\r" +
    "\n" +
    "\r" +
    "\n" +
    "    });\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "<div ng-controller=\"ValidateServerModelTestController as controller\" data-form-id=\"{{::controller.myFormId}}\">\r" +
    "\n" +
    "    <input type=\"text\" ng-model=\"controller.myModel\"  validate-server-model=\"your-model-name\">\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('uib/template/datepicker/datepicker.html',
    "<div class=\"uib-datepicker\" ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\">\r" +
    "\n" +
    "  <div uib-daypicker ng-switch-when=\"day\" tabindex=\"0\"></div>\r" +
    "\n" +
    "  <div uib-monthpicker ng-switch-when=\"month\" tabindex=\"0\"></div>\r" +
    "\n" +
    "  <div uib-yearpicker ng-switch-when=\"year\" tabindex=\"0\"></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('uib/template/datepicker/day.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\r" +
    "\n" +
    "  <thead>\r" +
    "\n" +
    "    <tr>\r" +
    "\n" +
    "      <th><button type=\"button\" class=\"ui button small pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"icon chevron left\"></i></button></th>\r" +
    "\n" +
    "      <th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"ui button small\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong><span ng-bind=\"title\"></span></strong></button></th>\r" +
    "\n" +
    "      <th><button type=\"button\" class=\"ui button small pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"icon chevron right\"></i></button></th>\r" +
    "\n" +
    "    </tr>\r" +
    "\n" +
    "    <tr>\r" +
    "\n" +
    "      <th ng-if=\"showWeeks\" class=\"text-center\"></th>\r" +
    "\n" +
    "      <th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\"><span ng-bind=\"label.abbr\"></span></small></th>\r" +
    "\n" +
    "    </tr>\r" +
    "\n" +
    "  </thead>\r" +
    "\n" +
    "  <tbody>\r" +
    "\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\r" +
    "\n" +
    "      <td ng-if=\"showWeeks\" class=\"text-center\"><em><span ng-bind=\"weekNumbers[$index]\"></span></em></td>\r" +
    "\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\">\r" +
    "\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"ui button small\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt), today: dt.current, 'text-muted': dt.secondary }\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\" ng-bind=\"dt.label\"></span></button>\r" +
    "\n" +
    "      </td>\r" +
    "\n" +
    "    </tr>\r" +
    "\n" +
    "  </tbody>\r" +
    "\n" +
    "</table>\r" +
    "\n"
  );


  $templateCache.put('uib/template/datepicker/month.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\r" +
    "\n" +
    "  <thead style=\"padding-bottom:1px;\">\r" +
    "\n" +
    "    <tr>\r" +
    "\n" +
    "      <th><button type=\"button\" class=\"ui button small\" ng-click=\"move(-1)\" tabindex=\"-1\" style=\"width:100%\"><i class=\"icon chevron left\"></i></button></th>\r" +
    "\n" +
    "      <th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"ui button small\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%\"><strong><span ng-bind=\"title\"></span></strong></button></th>\r" +
    "\n" +
    "      <th><button type=\"button\" class=\"ui button small\" ng-click=\"move(1)\" tabindex=\"-1\" style=\"width:100%\"><i class=\"icon chevron right\"></i></button></th>\r" +
    "\n" +
    "    </tr>\r" +
    "\n" +
    "  </thead>\r" +
    "\n" +
    "  <tbody>\r" +
    "\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\r" +
    "\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\">\r" +
    "\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"ui button small\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\" ng-bind=\"dt.label\"></span></button>\r" +
    "\n" +
    "      </td>\r" +
    "\n" +
    "    </tr>\r" +
    "\n" +
    "  </tbody>\r" +
    "\n" +
    "</table>\r" +
    "\n"
  );


  $templateCache.put('uib/template/datepicker/popup.html',
    "<div>\r" +
    "\n" +
    "  <ul class=\"uib-datepicker-popup dropdown-menu ui uib-position-measure clearing segment\" dropdown-nested ng-if=\"isOpen\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\" style=\"display:block;z-index:1000;margin-top:1rem!important;margin-left: -18px!important;\">\r" +
    "\n" +
    "    <li ng-transclude></li>\r" +
    "\n" +
    "    <li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\r" +
    "\n" +
    "      <span class=\"pull-left\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"ui primaryButton button primary\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\"><span ng-bind=\"getText('current')\"></span></button>               \r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "      <button type=\"button\" class=\"ui secondaryButton button pull-right\" ng-click=\"close($event)\"><span ng-bind=\"getText('close')\"></span></button>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "  </ul>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('uib/template/datepicker/year.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\r" +
    "\n" +
    "  <thead>\r" +
    "\n" +
    "    <tr>\r" +
    "\n" +
    "      <th><button type=\"button\" class=\"ui button pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"icon chevron left\"></i></button></th>\r" +
    "\n" +
    "      <th colspan=\"3\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"ui button\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong><span ng-bind=\"title\"></span></strong></button></th>\r" +
    "\n" +
    "      <th><button type=\"button\" class=\"ui button pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"icon chevron right\"></i></button></th>\r" +
    "\n" +
    "    </tr>\r" +
    "\n" +
    "  </thead>\r" +
    "\n" +
    "  <tbody>\r" +
    "\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\r" +
    "\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\">\r" +
    "\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"ui button\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\" ng-bind=\"dt.label\"></span></button>\r" +
    "\n" +
    "      </td>\r" +
    "\n" +
    "    </tr>\r" +
    "\n" +
    "  </tbody>\r" +
    "\n" +
    "</table>\r" +
    "\n"
  );


  $templateCache.put('uib/template/datepickerPopup/popup.html',
    "<ul class=\"uib-datepicker-popup dropdown-menu ui uib-position-measure clearing segment\" dropdown-nested ng-if=\"isOpen\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\r" +
    "\n" +
    "    <li ng-transclude></li>\r" +
    "\n" +
    "    <li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\r" +
    "\n" +
    "        <span class=\"pull-left\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"ui primaryButton button primary\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\"><span ng-bind=\"getText('current')\"></span></button>\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "        <button type=\"button\" class=\"ui secondaryButton button pull-right\" ng-click=\"close($event)\"><span ng-bind=\"getText('close')\"></span></button>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "</ul>"
  );


  $templateCache.put('uib/template/timepicker/timepicker.html',
    "<table class=\"ui basic collapsing borderless table timepicker\">\r" +
    "\n" +
    "    <tbody class=\"center aligned\">\r" +
    "\n" +
    "        <tr ng-show=\"::showSpinners\" class=\"buttonRow\">\r" +
    "\n" +
    "            <td class=\"collapsing\"><button ng-click=\"incrementHours()\" ng-class=\"{disabled: noIncrementHours()}\" class=\"ui basic icon button\"><i class=\"angle up icon\"></i></button></td>\r" +
    "\n" +
    "            <td class=\"borderless\"></td>\r" +
    "\n" +
    "            <td class=\"collapsing\"><button ng-click=\"incrementMinutes()\" ng-class=\"{disabled: noIncrementMinutes()}\" class=\"ui basic icon button\"><i class=\"angle up icon\"></i></button></td>\r" +
    "\n" +
    "            <td class=\"collapsing\" ng-show=\"showMeridian\"></td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <tr class=\"ui form buttonRow\">\r" +
    "\n" +
    "            <td class=\"borderless field\" ng-class=\"{'has-error': invalidHours}\">\r" +
    "\n" +
    "                <input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"center aligned\" ng-readonly=\"::readonlyInput\" maxlength=\"2\">\r" +
    "\n" +
    "            </td>\r" +
    "\n" +
    "            <td class=\"borderless\">:</td>\r" +
    "\n" +
    "            <td class=\"borderless field\" ng-class=\"{'has-error': invalidMinutes}\">\r" +
    "\n" +
    "                <input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"center aligned\" ng-readonly=\"::readonlyInput\" maxlength=\"2\">\r" +
    "\n" +
    "            </td>\r" +
    "\n" +
    "            <td class=\"borderless\" ng-show=\"showMeridian\"><button type=\"button\" ng-class=\"{disabled: noToggleMeridian()}\" class=\"ui basic button center aligned\" ng-click=\"toggleMeridian()\"><span ng-bind=\"meridian\"></span></button></td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <tr ng-show=\"::showSpinners\" class=\"buttonRow\">\r" +
    "\n" +
    "            <td class=\"borderless\"><button ng-click=\"decrementHours()\" ng-class=\"{disabled: noDecrementHours()}\" class=\"ui basic icon button\"><i class=\"angle down icon\"></i></button></td>\r" +
    "\n" +
    "            <td class=\"borderless\"></td>\r" +
    "\n" +
    "            <td class=\"borderless\"><button ng-click=\"decrementMinutes()\" ng-class=\"{disabled: noDecrementMinutes()}\" class=\"ui basic icon button\"><i class=\"angle down icon\"></i></button></td>\r" +
    "\n" +
    "            <td class=\"borderless\" ng-show=\"showMeridian\"></td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "    </tbody>\r" +
    "\n" +
    "</table>"
  );

}]);
