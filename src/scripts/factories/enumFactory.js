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