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